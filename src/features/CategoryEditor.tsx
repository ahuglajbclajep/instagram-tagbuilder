import { clsx } from "clsx/lite";
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
      <h3 className="font-semibold text-text-strong">{title}</h3>
      <ul className="flex flex-col gap-y-2">
        {tags.concat("").map((tag, i) => (
          <li key={`${i}-${tag}`} className="group flex items-center gap-x-2">
            <Input value={tag} onChange={onUpdate(i)} sanitizer={sanitizer} />
            <button
              className={clsx(
                "hrink-0 rounded-full p-2 group-last:invisible",
                "transition-colors hover:bg-danger-light hover:text-danger",
              )}
              onClick={onDelete(i)}
            >
              <TrashIcon className="size-5 text-icon" />
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
