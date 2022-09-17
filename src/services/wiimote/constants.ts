export const VENDOR_ID = 0x057e

export const InputReport = {
  CORE_BUTTONS: 0x30,
}

export const CORE_BUTTONS = [
  'dPadLeft',
  'dPadRight',
  'dPadDown',
  'dPadUp',
  'plus',
  null,
  null,
  null,

  'two',
  'one',
  'b',
  'a',
  'minus',
  null,
  null,
  'home',
] as const
