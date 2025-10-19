import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const API_BASE = "http://localhost:3000";

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch(`${API_BASE}/links`);
        const data = await res.json();
        setLinks(data);
      } catch (error) {
        console.error("Erro ao buscar links:", error);
      }
    }
    fetchLinks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !url) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ legenda: title, urlOriginal: url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar link");
      }

      const novoLink = await response.json();
      setLinks([novoLink, ...links]);
      setTitle("");
      setUrl("");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API_BASE}/links/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar link");
      setLinks(links.filter((l) => l.id !== id));
    } catch (error) {
      alert(error.message);
    }
  }

  function handleEditInit(link) {
    setEditingId(link.id);
    setEditTitle(link.legenda);
    setEditUrl(link.original_url);
  }

  async function handleEditSave(id) {
    if (!editTitle || !editUrl) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/links/${id}`, {
        method: "PATCH", // ou PUT, dependendo da sua API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ legenda: editTitle, urlOriginal: editUrl }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar link");

      const updatedLink = await res.json();
      setLinks(links.map((l) => (l.id === id ? updatedLink : l)));
      setEditingId(null);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleEditCancel() {
    setEditingId(null);
  }

  return (
    <div className="bg-beige text-chocolate min-h-screen flex flex-col items-center p-6 font-sans">
      <div className="max-w-2xl w-full">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 text-3xl font-extrabold text-chocolate">
            <i className="fa-solid fa-link"></i>
            <h1>Encurtador de Links</h1>
          </div>
          <p className="text-chocolate/80 mt-2">
            Transforme links longos em URLs curtas e fáceis de compartilhar
          </p>
        </header>

        {/* RF-06: Formulário de Criação */}
        <form
          onSubmit={handleSubmit}
          className="bg-cocoa text-creme p-6 rounded-2xl shadow-md mb-10"
        >
          <label className="block font-semibold mb-1">
            Legenda do link
          </label>
          <input
            type="text"
            placeholder="Ex: Meu portfólio, Site da empresa..."
            className="w-full mb-4 rounded-lg px-4 py-2 bg-mocha text-creme placeholder-latte focus:ring-2 focus:ring-latte outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block font-semibold mb-1">URL para encurtar</label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://exemplo.com/sua-url-muito-longa..."
              className="flex-1 rounded-lg px-4 py-2 bg-mocha text-creme placeholder-latte focus:ring-2 focus:ring-latte outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="bg-chocolate hover:bg-mocha transition text-creme px-6 py-2 rounded-lg font-semibold shadow-sm"
            >
              Encurtar
            </button>
          </div>
        </form>

        {/* RF-07: Listagem de Links */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-chocolate">Meus Links</h2>

          <div id="links-list">
            {links.length === 0 && (
              <p className="text-center text-chocolate/70">Nenhum link criado ainda.</p>
            )}

            {links.map((link) => (
              <div
                key={link.id}
                className="bg-cocoa text-creme p-5 rounded-2xl shadow-md mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    {/* RF-08: Card de Link */}
                    {editingId === link.id ? (
                      <>
                        <input
                          type="text"
                          className="w-full mb-2 rounded-lg px-3 py-1 text-chocolate"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <input
                          type="url"
                          className="w-full mb-2 rounded-lg px-3 py-1 text-chocolate"
                          value={editUrl}
                          onChange={(e) => setEditUrl(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold">{link.legenda}</h3>
                        <p className="text-sm mt-1">
                          <span className="font-semibold">Link curto: </span>
                          <a
                            href={`${API_BASE}/${link.codigo}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-latte hover:underline"
                          >
                            {`${API_BASE}/${link.codigo}`}
                          </a>
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-semibold">URL original: </span>
                          {link.original_url}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-latte mt-2">
                  <i className="fa-regular fa-calendar"></i>
                  <span>
                    Criado em {link.created_at ? new Date(link.created_at).toLocaleString() : "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-latte mt-1">
                  <i className="fa-regular fa-eye"></i>
                  <span>{link.cliques || 0} cliques</span>
                </div>

                {/* RF-09: Ações do Card */}
                <div className="flex items-center gap-2 mt-4">
                  {editingId === link.id ? (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                        onClick={() => handleEditSave(link.id)}
                      >
                        Salvar
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium"
                        onClick={handleEditCancel}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-mocha hover:bg-chocolate transition text-creme px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
                        onClick={() =>
                          navigator.clipboard.writeText(`${API_BASE}/${link.codigo}`)
                        }
                      >
                        <i className="fa-regular fa-copy"></i> Copiar
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg font-medium"
                        onClick={() => handleEditInit(link)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i> Editar
                      </button>
                      <button
                        className="bg-mocha hover:bg-chocolate transition p-2 rounded-lg text-creme"
                        onClick={() => handleDelete(link.id)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;