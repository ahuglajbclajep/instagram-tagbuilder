export type Tag = string;

export type Template = {
  context: Tag[];
  subject: Tag[];
  place: Tag[];
};

export const templates: Record<string, Template> = {
  散歩: {
    context: ["散歩", "街歩き", "東京散歩"],
    subject: ["季節の花"],
    place: ["神代植物公園", "調布", "東京"],
  },
  旅行: {
    context: ["旅行", "街歩き", "初詣"],
    subject: ["スイーツ"],
    place: ["伊勢神宮おかげ横丁", "伊勢神宮", "伊勢", "三重"],
  },
  美術館: {
    context: ["美術館", "企画展"],
    subject: ["国宝", "曜変天目茶碗", "曜変天目"],
    place: ["静嘉堂文庫美術館", "丸の内", "東京"],
  },
  キャンプ: {
    context: ["キャンプ"],
    subject: ["キャンプ場", "キャンプ飯", "焚き火"],
    place: ["長瀞", "秩父", "埼玉"],
  },
};

export const toString = (edited: Template) =>
  [...edited.context, ...edited.subject, ...edited.place]
    .map((tag) => `#${tag}`)
    .join(" ");
