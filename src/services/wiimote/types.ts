import { CORE_BUTTONS } from './constants'

export type Wiimote = {
  rumble: boolean
  leds: Leds
  coreButtons: CoreButtons
  sendRumble: (rumble: boolean) => Promise<void>
  sendLeds: (leds: Leds) => Promise<void>
  onDisconnect: (() => void) | null
  onButtonChange: (() => void) | null
  onStatus: (() => void) | null
}

export type CoreButtons = { [Button in CoreButton]: boolean }

export type CoreButton = NonNullable<typeof CORE_BUTTONS[number]>

export type Leds = [boolean, boolean, boolean, boolean]
