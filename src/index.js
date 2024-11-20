import { useEffect, useMemo, useRef } from "react";

import { mergeLeft, type } from "ramda";

import { DEFAULT_CONFIG, MODES } from "src/constants";
import {
  bindHotKey,
  convertHotkeyToUsersPlatform,
  unBindHotKey,
} from "src/utils";

const useHotKeys = (
  hotkey,
  handler,
  configOrDependencies,
  dependencies = []
) => {
  const ref = useRef(null);
  const handlerRef = useRef(handler);

  handlerRef.current = handler;

  const isConfigObject = type(configOrDependencies) === "Object";
  const config = isConfigObject ? configOrDependencies : {};
  const deps =
    !isConfigObject && Array.isArray(configOrDependencies)
      ? configOrDependencies
      : dependencies;

  const convertedHotkey = useMemo(
    () => convertHotkeyToUsersPlatform(hotkey),
    [hotkey, ...deps]
  );

  const memoizedConfig = useMemo(
    () => mergeLeft(config, DEFAULT_CONFIG),
    [
      config?.enabled,
      config?.mode,
      config?.unbindOnUnmount,
      config?.externalDocument,
    ]
  );

  useEffect(() => {
    if (!memoizedConfig.enabled) return undefined;

    const mousetrapInstance = bindHotKey({
      mode: memoizedConfig.mode,
      hotkey: convertedHotkey,
      handler: handlerRef.current,
      ref,
      externalDocument: memoizedConfig.externalDocument,
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
