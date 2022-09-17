import { CORE_BUTTONS, InputReport, VENDOR_ID } from './constants'
import { CoreButton, CoreButtons, Wiimote } from './types'

export const connect = async (): Promise<Wiimote | null> => {
  const device = await requestDevice()
  if (!device) {
    return null
  }
  const wiimote = createWiimote()
  addDisconnectListener(device, wiimote)
  addButtonChangeListener(device, wiimote)
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

const createWiimote = (): Wiimote => ({
  coreButtons: createCoreButtons(),
  onDisconnect: null,
  onButtonChange: null,
})

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

const addButtonChangeListener = (device: HIDDevice, wiimote: Wiimote) => {
  device.addEventListener('inputreport', (event: HIDInputReportEvent) => {
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
    wiimote.onButtonChange?.()
  })
}
