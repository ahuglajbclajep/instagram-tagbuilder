import { clsx } from "clsx/lite";

import { type Template, toString } from "./template";

type Props = {
  template: Template;
};

export const Preview = ({ template }: Props) => {
  return (
    <section
      className={clsx(
        "rounded-lg border border-slate-200/60 bg-slate-50 p-4",
        "flex flex-col gap-y-2",
      )}
    >
      <h2 className="text-xs font-bold text-gray-400">出力されたタグ</h2>
      <code className="font-mono text-sm leading-relaxed wrap-break-word text-blue-600">
        {toString(template)}
      </code>
    </section>
  );
};
