import { useState, useEffect } from "react";

export function useLinks(apiBase) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    try {
      const res = await fetch(`${apiBase}/links`);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Erro ao buscar links:", err);
    }
  }

  async function criarLink(legenda, url) {
    const res = await fetch(`${apiBase}/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ legenda, urlOriginal: url }),
    });
    const novoLink = await res.json();
    setLinks([novoLink, ...links]);
  }

  async function deletarLink(id) {
    await fetch(`${apiBase}/links/${id}`, { method: "DELETE" });
    setLinks(links.filter((l) => l.id !== id));
  }

  async function editarLink(id, legenda, urlOriginal) {
    const res = await fetch(`${apiBase}/links/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ legenda, urlOriginal }),
    });
    const updatedLink = await res.json();
    setLinks(links.map((l) => (l.id === id ? updatedLink : l)));
  }

  return { links, criarLink, deletarLink, editarLink, setLinks };
}
