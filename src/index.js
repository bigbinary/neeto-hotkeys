import { useEffect, useMemo, useRef } from "react";

import { mergeLeft } from "ramda";

import { DEFAULT_CONFIG, MODES } from "src/constants";
import {
  bindHotKey,
  convertHotkeyToUsersPlatform,
  unBindHotKey,
} from "src/utils";

const useHotKeys = (hotkey, handler, userConfig, externalDocument) => {
  const ref = useRef(null);
  const handlerRef = useRef(handler);

  handlerRef.current = handler;

  const convertedHotkey = useMemo(
    () => convertHotkeyToUsersPlatform(hotkey),
    [hotkey]
  );

  const memoizedConfig = useMemo(
    () => mergeLeft(userConfig, DEFAULT_CONFIG),
    [userConfig?.enabled, userConfig?.mode, userConfig?.unbindOnUnmount]
  );

  useEffect(() => {
    if (!memoizedConfig.enabled) return undefined;

    const mousetrapInstance = bindHotKey({
      mode: memoizedConfig.mode,
      hotkey: convertedHotkey,
      handler: (...args) => handlerRef.current(...args),
      ref,
      externalDocument,
    });

    return () => {
      unBindHotKey({
        mousetrapInstance,
        mode: memoizedConfig.mode,
        hotkey: convertedHotkey,
      });
    };
  }, [convertedHotkey, externalDocument, memoizedConfig]);

  return memoizedConfig.mode === MODES.scoped ? ref : null;
};

export default useHotKeys;
