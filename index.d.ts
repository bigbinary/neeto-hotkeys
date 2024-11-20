type ConfigType = {
  mode?: "default" | "global" | "scoped";
  unbindOnUnmount?: boolean;
  enabled?: boolean;
  externalDocument?: Document;
};

export default function useHotkeys(
  hotkey: string | string[],
  handler: (event: React.KeyboardEvent) => void,
  configOrDependencies?: ConfigType | unknown[],
  dependencies?: unknown[]
): React.MutableRefObject | null;
