import { InputReport, VENDOR_ID } from './constants'
import { Wiimote } from './types'

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
  onDisconnect: null,
  onButtonChange: null,
})

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
    wiimote.onButtonChange?.()
  })
}
