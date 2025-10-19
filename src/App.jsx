import { useState } from "react";
import "./App.css";

function App() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !url) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoLink = {
      id: Date.now(),
      title,
      url,
      data: new Date().toLocaleString(),
    };

    setLinks([novoLink, ...links]);
    setTitle("");
    setUrl("");
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

          <label className="block font-semibold mb-1">
            URL para encurtar
          </label>
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

        <section>
          <h2 className="text-2xl font-bold mb-4 text-chocolate">Meus Links</h2>

          <div id="links-list">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-cocoa text-creme p-5 rounded-2xl shadow-md mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{link.title}</h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-latte hover:underline text-sm"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-latte mt-2">
                  <i className="fa-regular fa-calendar"></i>
                  <span>Criado em {link.data}</span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="bg-mocha hover:bg-chocolate transition text-creme px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
                    onClick={() => navigator.clipboard.writeText(link.url)}
                  >
                    <i className="fa-regular fa-copy"></i> Copiar
                  </button>
                  <button
                    className="bg-mocha hover:bg-chocolate transition p-2 rounded-lg text-creme"
                    onClick={() =>
                      setLinks(links.filter((l) => l.id !== link.id))
                    }
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
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