import { useState } from "react";

export function LinkItem({ link, onDelete, onUpdate, apiBase }) {
  const [editor, setEditor] = useState(false);
  const [legenda, setLegenda] = useState(link.legenda);
  const [url, setUrl] = useState(link.original_url);
  const [linkCopiado, setLinkCopiado] = useState(false);

  async function salvarEdicao() {
    if (!legenda || !url) return alert("Preencha todos os campos!");
    await onUpdate(link.id, legenda, url);
    setEditor(false);
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(`${apiBase}/r/${link.codigo}`);
      setLinkCopiado(true);
      setTimeout(() => setLinkCopiado(false), 3000);
    } catch {
      alert("Erro ao copiar o link");
    }
  }

  return (
    <div className="bg-cocoa text-creme p-5 rounded-2xl shadow-md mb-4">
      {editor ? (
        <>
          <input value={legenda} onChange={(e) => setLegenda(e.target.value)} className="w-full mb-2 rounded-lg px-3 py-1 text-chocolate" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full mb-2 rounded-lg px-3 py-1 text-chocolate" />
          <div className="flex gap-2 mt-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" onClick={salvarEdicao}>Salvar</button>
            <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setEditor(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{link.legenda}</h3>
          <p className="text-sm mt-1">
            <span className="font-semibold">Link curto: </span>
            <a href={`${apiBase}/r/${link.codigo}`} target="_blank" rel="noreferrer" className="text-latte hover:underline">{`${apiBase}/r/${link.codigo}`}</a>
          </p>
          <p className="text-sm mt-1"><span className="font-semibold">URL original: </span>{link.original_url}</p>
          <p className="text-sm mt-1 text-chocolate/80"><span className="font-semibold">Criado em: </span>{new Date(link.created_at).toLocaleDateString("pt-BR")}</p>

          <div className="flex items-center gap-2 text-sm text-latte mt-1">
            <i className="fa-regular fa-eye"></i> <span>{link.contagem_cliques || 0} cliques</span>
          </div>

          <div className="flex gap-2 mt-2">
            <button onClick={copiarLink} className="bg-mocha hover:bg-chocolate text-creme px-4 py-2 rounded-lg flex items-center gap-2">
              <i className="fa-regular fa-copy"></i> Copiar
            </button>
            <button onClick={() => setEditor(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Editar</button>
            <button onClick={() => onDelete(link.id)} className="bg-mocha hover:bg-chocolate p-2 rounded-lg text-creme">
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>

          {linkCopiado && <div className="mt-2 text-green-600 font-semibold text-center bg-green-100 p-2 rounded-lg shadow-sm">✅ Link copiado para área de transferência!</div>}
        </>
      )}
    </div>
  );
}
