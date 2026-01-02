import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Input } from "./Input";
import { Template, templates, toString } from "./template";

const App = () => {
  const [template, setTemplate] = useState<Template>({
    context: [],
    subject: [],
    place: [],
  });

  const onChangeTemplate = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      void setTemplate(templates[e.target.value]),
    [],
  );

  const onUpdateTemplate = useCallback(
    (type: "context" | "subject" | "place", index: number) =>
      (value: string) => {
        setTemplate((prev) => {
          const newTemplate = { ...prev };
          newTemplate[type][index] = value;
          return newTemplate;
        });
      },
    [],
  );

  return (
    <div>
      <select onChange={onChangeTemplate}>
        {Object.keys(templates).map((template) => (
          <option key={template} value={template}>
            {template}
          </option>
        ))}
      </select>
      <h1>場面</h1>
      <ul>
        {template.context.map((context, i) => (
          <li key={context}>
            <Input value={context} onChange={onUpdateTemplate("context", i)} />
          </li>
        ))}
      </ul>
      <h1>写っているもの・話題の対象</h1>
      <ul>
        {template.subject.map((subject, i) => (
          <li key={subject}>
            <Input value={subject} onChange={onUpdateTemplate("subject", i)} />
          </li>
        ))}
      </ul>
      <h1>場所・地域</h1>
      <ul>
        {template.place.map((place, i) => (
          <li key={place}>
            <Input value={place} onChange={onUpdateTemplate("place", i)} />
          </li>
        ))}
      </ul>
      {toString(template)}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
