export const MODES = {
  default: "default",
  global: "global",
  scoped: "scoped",
};

export const DEFAULT_CONFIG = {
  mode: MODES.default,
  unbindOnUnmount: true,
  enabled: true,
};

export const MAC_TO_WINDOWS_KEYS_MAP = {
  option: "alt",
  command: "ctrl",
  return: "enter",
  delete: "backspace",
};

// eslint-disable-next-line @bigbinary/neeto/hard-coded-strings-should-be-localized
export const OS = { mac: "OS X", windows: "Windows" };

export const KEY_NAMES = { delete: "delete", backspace: "backspace" };
