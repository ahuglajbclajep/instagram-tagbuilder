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
        "rounded-lg border border-gray-200/60 bg-bg-light p-4",
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-text-muted">出力されたタグ</h2>
        <button
          className={clsx(
            "flex items-center gap-x-1 px-2 py-1",
            "rounded-md text-xs font-medium transition-colors",
            copied
              ? "bg-success-light text-success"
              : "bg-bg text-text-soft hover:bg-bg-muted",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-bg",
          )}
          disabled={!tagText}
          onClick={onCopy}
        >
          <ClipboardDocumentIcon className="size-4" />
          {copied ? "コピーしました" : "コピー"}
        </button>
      </div>
      <code className="font-mono leading-relaxed wrap-break-word text-blue-500">
        {tagText}
      </code>
    </section>
  );
};
