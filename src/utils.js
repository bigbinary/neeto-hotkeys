import platform from "platform";
import { toPairs } from "ramda";

import { MAC_TO_WINDOWS_KEYS_MAP, OS, KEY_NAMES } from "./constants";

const isMultipleHotkey = hotkey => Array.isArray(hotkey);

const replaceKeys = (hotkey, keyName, replaceWith) =>
  isMultipleHotkey(hotkey)
    ? hotkey.map(item => item.replaceAll(keyName, replaceWith))
    : hotkey.replaceAll(keyName, replaceWith);

const convertHotKeyToWindows = hotkey => {
  toPairs(MAC_TO_WINDOWS_KEYS_MAP).forEach(([macKey, windowsKey]) => {
    hotkey = replaceKeys(hotkey, macKey, windowsKey);
  });

  return hotkey;
};

export const convertHotkeyToUsersPlatform = hotkey => {
  const platformInfo = platform.parse(navigator.userAgent);
  const isOSX = platformInfo.os?.family?.includes(OS.mac);
  if (isOSX) return replaceKeys(hotkey, KEY_NAMES.delete, KEY_NAMES.backspace);

  return convertHotKeyToWindows(hotkey);
};
