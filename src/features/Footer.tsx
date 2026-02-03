import { MarkGithubIcon } from "@primer/octicons-react";

export const Footer = () => {
  return (
    <footer className="flex justify-center pb-4">
      <a
        href="https://github.com/ahuglajbclajep/instagram-tagbuilder"
        target="_blank"
        rel="noreferrer"
        className="inline-flex gap-2 text-xs font-medium text-text-soft transition-colors hover:text-text-muted"
      >
        <MarkGithubIcon className="size-4" />
        View source on GitHub
      </a>
    </footer>
  );
};
