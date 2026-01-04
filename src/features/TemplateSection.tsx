import { TrashIcon } from "@heroicons/react/24/outline";

import { Input } from "../components/Input";

import { type Tag } from "./template";

type Props = {
  title: string;
  tags: Tag[];
  onUpdate: (index: number, value: string) => void;
  onDelete: (index: number) => void;
};

export const TemplateSection = ({ title, tags, onUpdate, onDelete }: Props) => {
  return (
    <section className="flex flex-col gap-y-2">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <ul className="flex flex-col gap-y-2">
        {tags.map((tag, i) => (
          <li key={tag} className="flex items-center gap-x-2">
            <Input value={tag} onChange={(val) => onUpdate(i, val)} />
            <button
              className="shrink-0 rounded-full p-2 transition-colors hover:bg-red-50 hover:text-red-500"
              onClick={() => onDelete(i)}
            >
              <TrashIcon className="size-5 text-gray-300" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
