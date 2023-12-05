import { useEffect, useRef } from "react";

import "mousetrap-global-bind";
import { mergeLeft } from "ramda";
import { DEFAULT_CONFIG, MODES } from "src/constants";
import {
  bindHotKey,
  convertHotkeyToUsersPlatform,
  unBindHotKey,
} from "src/utils";

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

export default useHotKeys;
