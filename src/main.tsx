import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { clsx } from "clsx/lite";
import "./index.css";

import { Header } from "./features/Header";
import { TemplateSelector } from "./features/TemplateSelector";
import { CategoryEditor } from "./features/CategoryEditor";
import { Preview } from "./features/Preview";
import { Footer } from "./features/Footer";

import { templates, type Categorized, type Tag } from "./features/categorized";

const App = () => {
  const [tags, setTags] = useState<Categorized>(templates["なし"]);

  const onUpdateTag = useCallback(
    (category: keyof Categorized) => (index: number) => (tag: Tag) => {
      setTags((prev) => ({
        ...prev,
        [category]: [
          ...prev[category].slice(0, index),
          tag,
          ...prev[category].slice(index + 1),
        ],
      }));
    },
    [],
  );

  const onDeleteTag = useCallback(
    (category: keyof Categorized) => (index: number) => () => {
      setTags((prev) => ({
        ...prev,
        [category]: prev[category].filter((_, i) => i !== index),
      }));
    },
    [],
  );

  return (
    <div
      className={clsx(
        "min-h-screen bg-bg-light px-4 py-8",
        "font-sans text-sm text-text",
      )}
    >
      <div className="mx-auto flex max-w-md flex-col gap-y-6">
        <div
          className={clsx(
            "flex flex-col gap-y-6 bg-bg p-6",
            "rounded-xl border border-border-light shadow-sm",
          )}
        >
          <Header />
          <TemplateSelector onChange={setTags} />
          <CategoryEditor
            title="場面・シチュエーション"
            tags={tags.context}
            onUpdate={onUpdateTag("context")}
            onDelete={onDeleteTag("context")}
          />
          <hr className="border-border-light" />
          <CategoryEditor
            title="写っているもの・対象"
            tags={tags.subject}
            onUpdate={onUpdateTag("subject")}
            onDelete={onDeleteTag("subject")}
          />
          <hr className="border-border-light" />
          <CategoryEditor
            title="場所・地域"
            tags={tags.place}
            onUpdate={onUpdateTag("place")}
            onDelete={onDeleteTag("place")}
          />
          <Preview tags={tags} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
