import { CORE_BUTTONS } from './constants'

export type Wiimote = {
  coreButtons: CoreButtons
  onDisconnect: (() => void) | null
  onButtonChange: (() => void) | null
}

export type CoreButtons = { [Button in CoreButton]: boolean }

export type CoreButton = NonNullable<typeof CORE_BUTTONS[number]>
