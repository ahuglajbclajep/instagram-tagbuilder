import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { clsx } from "clsx/lite";
import "./index.css";

import { Header } from "./features/Header";
import { Selector } from "./features/Selector";
import { TemplateSection } from "./features/TemplateSection";
import { Preview } from "./features/Preview";
import { Footer } from "./features/Footer";

import { type Template } from "./features/template";

const App = () => {
  const [template, setTemplate] = useState<Template>({
    context: [],
    subject: [],
    place: [],
  });

  const onUpdateTemplate = useCallback(
    (type: keyof Template, index: number) => (value: string) => {
      setTemplate((prev) => {
        const newTemplate = { ...prev };
        newTemplate[type][index] = value;
        return newTemplate;
      });
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
            onUpdate={(idx, val) => onUpdateTemplate("context", idx)(val)}
            onDelete={() => {}}
          />
          <hr className="border-gray-100" />
          <TemplateSection
            title="写っているもの・対象"
            tags={template.subject}
            onUpdate={(idx, val) => onUpdateTemplate("subject", idx)(val)}
            onDelete={() => {}}
          />
          <hr className="border-gray-100" />
          <TemplateSection
            title="場所・地域"
            tags={template.place}
            onUpdate={(idx, val) => onUpdateTemplate("place", idx)(val)}
            onDelete={() => {}}
          />
          <Preview template={template} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
