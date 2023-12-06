import Mousetrap from "mousetrap";
import "mousetrap-global-bind";
import platform from "platform";
import { toPairs } from "ramda";

import { MAC_TO_WINDOWS_KEYS_MAP, OS, KEY_NAMES, MODES } from "./constants";

const isMultipleHotkey = Array.isArray;

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

export const bindHotKey = ({ mode, hotkey, handler, ref }) => {
  let mousetrapInstance;

  switch (mode) {
    case MODES.global:
      Mousetrap.bindGlobal(hotkey, handler);
      break;
    case MODES.scoped:
      mousetrapInstance = Mousetrap(ref.current).bind(hotkey, handler);
      break;
    default:
      mousetrapInstance = Mousetrap.bind(hotkey, handler);
  }

  return mousetrapInstance;
};

export const unBindHotKey = ({ mousetrapInstance, mode, hotkey }) =>
  mode === MODES.global
    ? Mousetrap.unbindGlobal(hotkey)
    : mousetrapInstance?.unbind(hotkey);
