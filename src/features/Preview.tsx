import { useState, useCallback, useMemo } from "react";
import { clsx } from "clsx/lite";
import { CopyIcon } from "@primer/octicons-react";

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
        "rounded-lg border border-border bg-bg-light p-4",
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-text-muted">出力されたタグ</h2>
        <button
          className={clsx(
            "flex items-center gap-x-1 px-1.5 py-0.5",
            "rounded-sm text-xs font-medium transition-colors",
            copied
              ? "bg-success-light text-success"
              : "bg-bg text-text-soft hover:bg-bg-muted",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-bg",
          )}
          disabled={!tagText}
          onClick={onCopy}
        >
          <CopyIcon className="size-3" />
          <span>{copied ? "コピーしました" : "コピー"}</span>
        </button>
      </div>
      <code className="font-mono text-sm leading-relaxed wrap-break-word text-blue-600">
        {tagText}
      </code>
    </section>
  );
};
