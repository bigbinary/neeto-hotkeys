import { DEFAULT_CONFIG, MODES } from "constants";

import { useEffect, useRef } from "react";

import Mousetrap from "mousetrap";
import "mousetrap-global-bind";
import { mergeLeft } from "ramda";
import { convertHotkeyToUsersPlatform } from "utils";

const useHotKeys = (hotkey, handler, userConfig) => {
  const ref = useRef(null);
  const convertedHotkey = convertHotkeyToUsersPlatform(hotkey);
  const config = mergeLeft(userConfig, DEFAULT_CONFIG);

  if (!handler) {
    throw new Error("You must provide a handler function to useHotKeys");
  }

  useEffect(() => {
    if (!config.enabled) return undefined;

    const mousetrapInstance = bindHotKey({
      mode: config.mode,
      hotkey: convertedHotkey,
      handler,
      ref,
    });

    return () => {
      unBindHotKey({
        mousetrapInstance,
        mode: config.mode,
        hotkey: convertedHotkey,
      });
    };
  }, [handler, config.mode, convertedHotkey, config]);

  return config.mode === MODES.scoped ? ref : null;
};

const bindHotKey = ({ mode, hotkey, handler, ref }) => {
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

const unBindHotKey = ({ mousetrapInstance, mode, hotkey }) =>
  mode === MODES.global
    ? Mousetrap.unbindGlobal(hotkey)
    : mousetrapInstance?.unbind(hotkey);

export default useHotKeys;
