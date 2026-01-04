import { TrashIcon } from "@heroicons/react/24/outline";

import { Input } from "../components/Input";

import { type Tag } from "./categorized";

type Props = {
  title: string;
  tags: Tag[];
  onUpdate: (index: number) => (value: string) => void;
  onDelete: (index: number) => () => void;
};

export const CategoryEditor = ({ title, tags, onUpdate, onDelete }: Props) => {
  return (
    <section className="flex flex-col gap-y-2">
      <h2 className="font-semibold text-gray-900">{title}</h2>
      <ul className="flex flex-col gap-y-2">
        {tags.concat("").map((tag, i) => (
          <li key={`${i}-${tag}`} className="group flex items-center gap-x-2">
            <Input value={tag} onChange={onUpdate(i)} sanitizer={sanitizer} />
            <button
              className="shrink-0 rounded-full p-2 transition-colors group-last:invisible hover:bg-red-50 hover:text-red-500"
              onClick={onDelete(i)}
            >
              <TrashIcon className="size-5 text-gray-400" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const sanitizer = (value: string) =>
  // 文字、数字、絵文字、_ 以外の文字はタグでは無効
  value.replace(/[^\p{L}\p{N}\p{Extended_Pictographic}_]/gu, "");
