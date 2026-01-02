import { useCallback } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({ value, onChange }: Props) => {
  const onBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.isComposing || e.key !== "Enter") {
        return;
      }
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  return (
    <input
      type="text"
      defaultValue={value}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};
