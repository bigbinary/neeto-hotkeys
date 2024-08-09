import { useEffect, useRef } from "react";

import { mergeLeft } from "ramda";

import { DEFAULT_CONFIG, MODES } from "src/constants";
import {
  bindHotKey,
  convertHotkeyToUsersPlatform,
  unBindHotKey,
} from "src/utils";

const useHotKeys = (hotkey, handler, userConfig, externalDocument) => {
  const ref = useRef(null);
  const memoizedConfig = useMemo(
    () =>
      mergeLeft(
        { enabled: userConfig?.enabled, mode: userConfig?.mode },
        DEFAULT_CONFIG
      ),
    [userConfig?.enabled, userConfig?.mode]
  );

  useEffect(() => {
    if (!memoizedConfig.enabled) return undefined;

    const mousetrapInstance = bindHotKey({
      mode: memoizedConfig.mode,
      hotkey: convertedHotkey,
      handler,
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
  }, [handler, config.mode, convertedHotkey, memoizedConfig]);

  return memoizedConfig.mode === MODES.scoped ? ref : null;
};

export default useHotKeys;
