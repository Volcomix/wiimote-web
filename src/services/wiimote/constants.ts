export const VENDOR_ID = 0x057e

export const OutputReport = {
  RUMBLE: 0x10,
  LEDS: 0x11,
  STATUS: 0x15,
}

export const InputReport = {
  STATUS: 0x20,
  CORE_BUTTONS: 0x30,
}

export const CORE_BUTTONS = [
  // First Byte
  'dPadLeft',
  'dPadRight',
  'dPadDown',
  'dPadUp',
  'plus',
  null,
  null,
  null,

  // Second Byte
  'two',
  'one',
  'b',
  'a',
  'minus',
  null,
  null,
  'home',
] as const
