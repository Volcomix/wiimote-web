import { CORE_BUTTONS, InputReport, OutputReport, VENDOR_ID } from './constants'
import { CoreButton, CoreButtons, Leds, Wiimote } from './types'

export const connect = async (): Promise<Wiimote | null> => {
  const device = await requestDevice()
  if (!device) {
    return null
  }
  const wiimote = createWiimote(device)
  addDisconnectListener(device, wiimote)
  addStatusListener(device, wiimote)
  addCoreButtonChangeListener(device, wiimote)

  await sendStatusRequest(device, wiimote)

  return wiimote
}

const requestDevice = async (): Promise<HIDDevice | null> => {
  const [device] = await navigator.hid.requestDevice({
    filters: [{ vendorId: VENDOR_ID }],
  })
  if (!device) {
    return null
  }
  await device.open()
  return device
}

const createWiimote = (device: HIDDevice): Wiimote => {
  const wiimote: Wiimote = {
    rumble: false,
    leds: [false, false, false, false],
    coreButtons: createCoreButtons(),
    sendRumble: (rumble) => sendRumble(device, wiimote, rumble),
    sendLeds: (leds) => sendLeds(device, wiimote, leds),
    onDisconnect: null,
    onStatus: null,
    onCoreButtonChange: null,
  }
  return wiimote
}

const createCoreButtons = () =>
  CORE_BUTTONS.filter((button): button is CoreButton => !!button).reduce(
    (acc, button) => ({ ...acc, [button]: false }),
    {} as CoreButtons
  )

const addDisconnectListener = (device: HIDDevice, wiimote: Wiimote) => {
  const handleDisconnect = (event: HIDConnectionEvent) => {
    if (event.device !== device) {
      return
    }
    navigator.hid.removeEventListener('disconnect', handleDisconnect)
    wiimote.onDisconnect?.()
  }
  navigator.hid.addEventListener('disconnect', handleDisconnect)
}

const addStatusListener = (device: HIDDevice, wiimote: Wiimote) => {
  device.addEventListener('inputreport', async (event) => {
    if (event.reportId !== InputReport.STATUS) {
      return
    }
    const bits = event.data.getUint8(2)
    for (let led = 0; led < 4; led++) {
      wiimote.leds[led] = !!(bits & (1 << (4 + led)))
    }
    wiimote.onStatus?.()
  })
}

const addCoreButtonChangeListener = (device: HIDDevice, wiimote: Wiimote) => {
  device.addEventListener('inputreport', (event) => {
    if (event.reportId !== InputReport.CORE_BUTTONS) {
      return
    }
    const bits = event.data.getUint16(0, true)
    CORE_BUTTONS.forEach((coreButton, bitIndex) => {
      if (!coreButton) {
        return
      }
      wiimote.coreButtons[coreButton] = !!(bits & (1 << bitIndex))
    })
    wiimote.onCoreButtonChange?.()
  })
}

const sendRumble = async (
  device: HIDDevice,
  wiimote: Wiimote,
  rumble: boolean
) => {
  await device.sendReport(OutputReport.RUMBLE, new Uint8Array([Number(rumble)]))
  wiimote.rumble = rumble
}

const sendLeds = async (device: HIDDevice, wiimote: Wiimote, leds: Leds) => {
  const bits = leds
    .map(Number)
    .reduce(
      (acc, led, bitIndex) => acc | (led << (4 + bitIndex)),
      wiimote.rumble ? 1 : 0
    )

  await device.sendReport(OutputReport.LEDS, new Uint8Array([bits]))

  leds.forEach((isLit, led) => {
    wiimote.leds[led] = isLit
  })
}

const sendStatusRequest = async (device: HIDDevice, wiimote: Wiimote) => {
  await device.sendReport(
    OutputReport.STATUS,
    new Uint8Array([wiimote.rumble ? 1 : 0])
  )
}
