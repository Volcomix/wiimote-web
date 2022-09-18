import { CORE_BUTTONS } from './constants'

export type Wiimote = {
  coreButtons: CoreButtons
  leds: Leds
  sendLeds: (leds: Leds) => Promise<void>
  onDisconnect: (() => void) | null
  onButtonChange: (() => void) | null
  onStatus: (() => void) | null
}

export type CoreButtons = { [Button in CoreButton]: boolean }

export type CoreButton = NonNullable<typeof CORE_BUTTONS[number]>

export type Leds = [boolean, boolean, boolean, boolean]
