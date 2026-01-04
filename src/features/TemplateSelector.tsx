import { useCallback } from "react";
import { clsx } from "clsx/lite";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { templates, type Categorized } from "./categorized";

type Props = {
  onChange: (template: Categorized) => void;
};

export const TemplateSelector = ({ onChange }: Props) => {
  const onChangeTemplate = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange(templates[e.target.value]),
    [onChange],
  );

  return (
    <section className="flex flex-col gap-y-2">
      <h2 className="text-xs font-bold text-gray-500">テンプレート</h2>
      <div className="relative">
        <select
          className={clsx(
            "w-full py-2 pr-10 pl-3",
            "cursor-pointer appearance-none bg-gray-50 text-sm font-medium",
            "rounded-lg border border-gray-200 outline-none",
            "transition-colors focus:border-pink-500 focus:bg-white focus:ring-1 focus:ring-pink-500",
          )}
          onChange={onChangeTemplate}
        >
          {Object.keys(templates).map((templateName) => (
            <option key={templateName} value={templateName}>
              {templateName}
            </option>
          ))}
        </select>
        <div
          className={clsx(
            "pointer-events-none absolute top-0 right-3",
            "flex h-full items-center",
          )}
        >
          <ChevronDownIcon className="size-4 text-gray-400" />
        </div>
      </div>
    </section>
  );
};
