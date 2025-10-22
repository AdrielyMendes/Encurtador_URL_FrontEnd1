import { LinkItem } from "./LinkItem";

export function LinksList({ links, onDelete, onUpdate, apiBase }) {
  if (!links.length) return <p className="text-center text-chocolate/70">Nenhum link criado ainda.</p>;

  return (
    <>
      {links.map((link) => (
        <LinkItem key={link.id} link={link} onDelete={onDelete} onUpdate={onUpdate} apiBase={apiBase} />
      ))}
    </>
  );
}
