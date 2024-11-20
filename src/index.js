import { useEffect, useMemo, useRef } from "react";

import { mergeLeft } from "ramda";

import { DEFAULT_CONFIG, MODES } from "src/constants";
import {
  bindHotKey,
  convertHotkeyToUsersPlatform,
  unBindHotKey,
} from "src/utils";

const useHotKeys = (hotkey, handler, config) => {
  const ref = useRef(null);
  const handlerRef = useRef(handler);

  handlerRef.current = handler;

  const convertedHotkey = useMemo(
    () => convertHotkeyToUsersPlatform(hotkey),
    [hotkey]
  );

  const memoizedConfig = useMemo(
    () => mergeLeft(config, DEFAULT_CONFIG),
    [config?.enabled, config?.mode, config?.unbindOnUnmount, config?.document]
  );

  useEffect(() => {
    if (!memoizedConfig.enabled) return undefined;

    const mousetrapInstance = bindHotKey({
      mode: memoizedConfig.mode,
      hotkey: convertedHotkey,
      handler: handlerRef.current,
      ref,
      targetDocument: memoizedConfig.document,
    });

    return () => {
      unBindHotKey({
        mousetrapInstance,
        mode: memoizedConfig.mode,
        hotkey: convertedHotkey,
      });
    };
  }, [convertedHotkey, memoizedConfig]);

  return memoizedConfig.mode === MODES.scoped ? ref : null;
};

export default useHotKeys;
