export const Header = () => {
  return (
    <header className="flex flex-col items-center gap-y-2">
      <h1 className="bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
        Hashtag Builder
      </h1>
      <p className="text-xs font-medium text-gray-400 italic">
        よく使うハッシュタグをメモできるやつ
      </p>
    </header>
  );
};
