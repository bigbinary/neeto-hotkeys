type ConfigType = {
  mode?: "default" | "global" | "scoped";
  unbindOnUnmount?: boolean;
  enabled?: boolean;
  document?: Document;
};

export default function useHotkeys(
  hotkey: string | string[],
  handler: (event: React.KeyboardEvent) => void,
  config?: ConfigType
): React.MutableRefObject | null;
