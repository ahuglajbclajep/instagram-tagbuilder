import { useState, useCallback, useMemo } from "react";
import { clsx } from "clsx/lite";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

import { type Categorized, toString } from "./categorized";

type Props = {
  tags: Categorized;
};

export const Preview = ({ tags }: Props) => {
  const tagText = useMemo(() => toString(tags), [tags]);

  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(() => {
    try {
      void navigator.clipboard.writeText(toString(tags));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  }, [tags]);

  return (
    <section
      className={clsx(
        "flex flex-col gap-y-2",
        "rounded-lg border border-slate-200/60 bg-slate-50 p-4",
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-400">出力されたタグ</h2>
        <button
          className={clsx(
            "flex items-center gap-x-1 px-2 py-1",
            "rounded-md text-xs font-medium transition-colors",
            copied
              ? "bg-green-50 text-green-500"
              : "bg-white text-gray-400 hover:bg-gray-100",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white",
          )}
          disabled={!tagText}
          onClick={onCopy}
        >
          <ClipboardDocumentIcon className="size-4" />
          {copied ? "コピーしました" : "コピー"}
        </button>
      </div>
      <code className="font-mono text-sm leading-relaxed wrap-break-word text-blue-600">
        {tagText}
      </code>
    </section>
  );
};
