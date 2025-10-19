const form = document.getElementById("form-link");
const list = document.getElementById("links-list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("link-title").value;
    const url = document.getElementById("link-url").value;

    if (!title || !url) {
        alert("Preencha todos os campos!");
        return;
    }

    // Exemplo: integração futura com o backend
    // const response = await fetch("http://localhost:3333/links", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ title, url })
    // });
    // const data = await response.json();

    // Render temporário no front
    const card = document.createElement("div");
    card.className = "bg-cocoa text-creme p-5 rounded-2xl shadow-lg mb-4";
    card.innerHTML = `
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold">${title}</h3>
        <a href="${url}" target="_blank" class="text-latte hover:underline text-sm">${url}</a>
      </div>
    </div>
    <div class="flex items-center gap-2 text-sm text-latte mt-2">
      <i class="fa-regular fa-calendar"></i>
      <span>Criado em ${new Date().toLocaleString()}</span>
    </div>
    <div class="flex items-center gap-2 mt-4">
      <button class="bg-mocha hover:bg-chocolate text-creme px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
        <i class="fa-regular fa-copy"></i> Copiar
      </button>
      <button class="bg-mocha hover:bg-chocolate p-2 rounded-lg text-creme">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  `;
    list.prepend(card);

    form.reset();
});