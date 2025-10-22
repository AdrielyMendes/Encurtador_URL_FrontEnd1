# 🌐 Encurtador de Links — Front-end
# Link do Vercel - Abaixo! 

# encurtador-url-front-end1-dorvfepk3-adrielys-projects-4460557b.vercel.app
Interface web para o projeto **Encurtador de Links**, construída com **React**, **Vite** e **TailwindCSS**.  
Permite criar, visualizar e acessar links encurtados consumindo a API do back-end (Node.js + Fastify + PostgreSQL - Supabase).

---

## 🚀 Tecnologias Utilizadas

- **React**
- **Vite**
- **TailwindCSS**
- **JavaScript (ESM)**
- **Fetch API** para comunicação com o back-end

---

## 🎯 Objetivos de Aprendizagem

- Integrar front-end com uma API REST.
- Utilizar hooks do React (`useState`, `useEffect`) para controle de estado e renderização.
- Estilizar a aplicação com TailwindCSS.
- Compreender a estrutura básica de um projeto criado com Vite.
- Tratar erros e mensagens de feedback ao usuário.

---

## 📁 Estrutura do Projeto

```
Encurtador_URL_FrontEnd1-main/
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx           # Componente principal com interface e lógica de consumo da API
    ├── App.css           # Estilos customizados adicionais
    └── main.jsx          # Ponto de entrada da aplicação React
```

---

## ⚙️ Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/encurtador-frontend.git
cd encurtador-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` (se necessário) com a URL do back-end:

```
VITE_API_BASE_URL=http://localhost:3000
```

> Essa variável é usada para se comunicar com a API que cria e gerencia os links encurtados.

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧩 Principais Arquivos

### `src/App.jsx`

- Exibe formulário para encurtar URLs.
- Consome o endpoint `POST /links` da API para criar novos links encurtados.
- Lista os links criados e exibe códigos e URLs encurtadas.
- Permite acessar o link encurtado (redirecionamento automático).

### `src/main.jsx`

- Ponto inicial do React com renderização de `<App />` dentro de `index.html`.

### `index.html`

- Estrutura base do app (Vite injeta o bundle aqui).
- Carrega o `<div id="root"></div>` para o React.

---

## 🧪 Testes Manuais

1. **Criar link encurtado**
   - Digite uma URL válida no campo.
   - Clique em “Encurtar”.
   - O link deve aparecer na lista com seu código gerado.

2. **Acessar link encurtado**
   - Clique no link gerado ou copie o código.
   - Abra no navegador `http://localhost:3000/<codigo>` (rota do back-end).
   - Verifique se ocorre redirecionamento e contagem de cliques.

3. **Erros**
   - Caso informe uma URL inválida, o sistema deve exibir uma mensagem de erro.

---

## 💡 Boas Práticas

- Separar lógica de requisições em funções reutilizáveis.
- Usar variáveis de ambiente (`import.meta.env.VITE_API_BASE_URL`) para trocar facilmente entre local e produção.
- Validar URLs antes de enviar à API.
- Tratar erros com `try/catch` e feedback ao usuário.
- Organizar componentes futuros em uma pasta `components/` conforme o projeto crescer.

---

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|--------|----------|
| API não responde | Back-end não iniciado ou URL incorreta | Verifique `VITE_API_BASE_URL` e se o servidor está rodando |
| CORS bloqueando requisição | Falta de configuração no back-end | Adicione `fastify-cors` ou configure CORS manualmente |
| Tela branca | Erro de sintaxe no React ou variáveis incorretas | Verifique console do navegador |

---

## ☁️ Deploy

### Vercel (recomendado)

1. Faça login na [Vercel](https://vercel.com/).
2. Importe o repositório do GitHub.
3. Configure a variável de ambiente:
   ```
   VITE_API_BASE_URL=https://seu-backend.onrender.com
   ```
4. Deploy automático!

### Alternativas
- **Netlify**
- **GitHub Pages** (build estático com `npm run build`)

---

## 🧭 Resumo Rápido

- **Stack:** React + Vite + TailwindCSS  
- **Executar:** `npm run dev`  
- **API Base:** `VITE_API_BASE_URL`  
- **Endpoint principal:** `POST /links`  
- **Deploy:** Vercel ou Netlify  

---