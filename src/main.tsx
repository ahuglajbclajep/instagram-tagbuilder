import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { clsx } from "clsx/lite";
import "./index.css";

import { Header } from "./features/Header";
import { Selector } from "./features/Selector";
import { TemplateSection } from "./features/TemplateSection";
import { Preview } from "./features/Preview";
import { Footer } from "./features/Footer";

import { templates, type Template, type Tag } from "./features/template";

const App = () => {
  const [template, setTemplate] = useState<Template>(templates["なし"]);

  const onUpdateTag = useCallback(
    (type: keyof Template) => (index: number) => (value: Tag) => {
      setTemplate((prev) => ({
        ...prev,
        [type]: prev[type]
          .map((tag, i) => (i === index ? value : tag))
          .concat(index + 1 === prev[type].length ? "" : []),
      }));
    },
    [],
  );

  const onDeleteTag = useCallback(
    (type: keyof Template) => (index: number) => () => {
      setTemplate((prev) => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }));
    },
    [],
  );

  return (
    <div
      className={clsx(
        "min-h-screen bg-gray-50 px-4 py-8",
        "font-sans text-neutral-800",
      )}
    >
      <div className="mx-auto flex max-w-md flex-col gap-y-6">
        <div className="flex flex-col gap-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <Header />
          <Selector onChange={setTemplate} />
          <TemplateSection
            title="場面・シチュエーション"
            tags={template.context}
            onUpdate={onUpdateTag("context")}
            onDelete={onDeleteTag("context")}
          />
          <hr className="border-gray-100" />
          <TemplateSection
            title="写っているもの・対象"
            tags={template.subject}
            onUpdate={onUpdateTag("subject")}
            onDelete={onDeleteTag("subject")}
          />
          <hr className="border-gray-100" />
          <TemplateSection
            title="場所・地域"
            tags={template.place}
            onUpdate={onUpdateTag("place")}
            onDelete={onDeleteTag("place")}
          />
          <Preview template={template} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
