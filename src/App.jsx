import './App.css';
import { LinkForm } from './componentes/LinkForm';
import { LinksList } from './componentes/LinksList';
import { useLinks } from './hooks/useLinks';

const API_BASE = "http://localhost:3000";

function App() {
  const { links, criarLink, deletarLink, editarLink } = useLinks(API_BASE);

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

        <LinkForm onCreate={criarLink} />
        <LinksList links={links} onDelete={deletarLink} onUpdate={editarLink} apiBase={API_BASE} />
      </div>
    </div>
  );
}

export default App;
