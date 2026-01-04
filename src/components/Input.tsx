import { useCallback } from "react";
import { clsx } from "clsx/lite";
import { PencilIcon } from "@heroicons/react/24/outline";

type Props = {
  value: string;
  onChange: (value: string) => void;
  sanitizer?: (value: string) => string;
};

export const Input = ({ value, onChange, sanitizer = (v) => v }: Props) => {
  const onBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizer(e.currentTarget.value);
      // サニタイズ後の文字列が空になってしまったら、無効な入力として元の値を復元する
      if (sanitized === "") {
        e.currentTarget.value = value;
        return;
      }

      e.currentTarget.value = sanitized;
      onChange(sanitized);
    },
    [onChange, sanitizer, value],
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // 補完以外のタイミングで Enter が押されたら確定とみなす
    if (e.nativeEvent.isComposing || e.key !== "Enter") {
      return;
    }
    e.currentTarget.blur();
  }, []);

  return (
    <div className="group/input relative grow">
      <input
        className={clsx(
          "w-full py-2 pr-3 pl-10",
          "bg-gray-100 text-sm placeholder-gray-500",
          "rounded-lg border border-transparent outline-none",
          "transition-colors focus:border-blue-300 focus:bg-white",
        )}
        type="text"
        defaultValue={value}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <div
        className={clsx(
          "pointer-events-none absolute top-0 left-3",
          "flex h-full items-center",
        )}
      >
        <PencilIcon
          className={clsx(
            "size-4 text-gray-400",
            "transition-colors group-focus-within/input:text-blue-500",
          )}
        />
      </div>
    </div>
  );
};
