type ConfigType = {
  mode?: "default" | "global" | "scoped";
  unbindOnUnmount?: boolean;
  enabled?: boolean;
};

export function useHotKeys(
  hotkey: string | string[],
  handler: (event: React.KeyboardEvent) => void,
  config?: ConfigType
): React.MutableRefObject | null;
