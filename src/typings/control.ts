export interface ControlProps {
  label: string;
  type: unknown;
  value?: unknown;
  onChange: (value: unknown) => void;
  options?: string[];
  display?: unknown;
  description?: string;
  appendValueToTitle: boolean;
  onAppendValueToTitle: () => void;
  isRequired: boolean;
  defaultValue?: unknown;
}
