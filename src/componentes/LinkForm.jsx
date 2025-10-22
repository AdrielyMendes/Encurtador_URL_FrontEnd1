import { useState } from "react";

export function LinkForm({ onCreate }) {
  const [legenda, setLegenda] = useState("");
  const [url, setUrl] = useState("");

  async function enviarFormulario(e) {
    e.preventDefault();
    if (!legenda || !url) return alert("Preencha todos os campos!");
    await onCreate(legenda, url);
    setLegenda("");
    setUrl("");
  }

  return (
    <form onSubmit={enviarFormulario} className="bg-cocoa text-creme p-6 rounded-2xl shadow-md mb-10">
      <label className="block font-semibold mb-1">Legenda do link</label>
      <input
        type="text"
        value={legenda}
        onChange={(e) => setLegenda(e.target.value)}
        placeholder="Ex: Meu portfólio, Site da empresa..."
        className="w-full mb-4 rounded-lg px-4 py-2 bg-mocha text-creme placeholder-latte focus:ring-2 focus:ring-latte outline-none"
      />

      <label className="block font-semibold mb-1">URL para encurtar</label>
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com/sua-url-muito-longa..."
          className="flex-1 rounded-lg px-4 py-2 bg-mocha text-creme placeholder-latte focus:ring-2 focus:ring-latte outline-none"
        />
        <button type="submit" className="bg-chocolate hover:bg-mocha transition text-creme px-6 py-2 rounded-lg font-semibold shadow-sm">
          Encurtar
        </button>
      </div>
    </form>
  );
}
