function renderProdukte(animated = true) {
  const produkteContainer =
    document.getElementsByClassName("karten-container")[0];

  produkteContainer.innerHTML = "";

  if (filteredProdukte.length === 0) {
    produkteContainer.innerHTML =
      '<p class="keine-ergebnisse">Keine Produkte gefunden.</p>';
    return;
  }

  filteredProdukte.forEach((produkt, index) => {
    const produktElement = `

    ${
      animated
        ? `<div class="produkt" id="produkt-${produkt.id}" style="animation-delay: ${index * 0.1}s;" onAnimationEnd="this.style.opacity = '1';" onClick="window.location.href='produkt-kaufen.html?id=${produkt.id}'">`
        : `<div class="produkt" id="produkt-${produkt.id}" onClick="window.location.href='produkt-kaufen.html?id=${produkt.id}'" style="opacity: 1; animation: none;">`
    }
    
    <img src="${produkt["image-url"]}" alt="${produkt.name}" />
    <h2 class="produkt-name">${produkt.name}</h2>
    <p class="produkt-description">${produkt.description}</p>
    <p class="produkt-preis" style="text-decoration: ${produkt.reduced ? "line-through" : "none"}; ${produkt.reduced ? "color: red; margin-bottom: 0; " : ""}">
    ${produkt.price.toFixed(2)} €
    </p>
    ${produkt.reduced ? `<p class="produkt-reducedPreis">nur ${produkt["reduced-price"].toFixed(2)} €</p>` : ""}
    </div>
    `;

    produkteContainer.innerHTML += produktElement;
  });
}

let fuse;
let filteredProdukte = [];
let produkte = [];
async function loadProdukte() {
  document.querySelector("#produkte-search-wrap > input").value = "";

  const response = await fetch("produkte.json");
  produkte = await response.json();
  filteredProdukte = produkte;

  fuse = new Fuse(produkte, {
    keys: ["name", "description", "brand", "category"],
    threshold: 0.3,
  });

  renderProdukte();
}
loadProdukte();

document
  .querySelector("#produkte-search-wrap > input")
  .addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim();

    if (searchTerm === "") {
      filteredProdukte = produkte;
    } else {
      const searchResults = fuse
        .search(searchTerm)
        .map((result) => result.item.id);
      filteredProdukte = produkte.filter((produkt) =>
        searchResults.includes(produkt.id),
      );
    }

    renderProdukte((animated = false));
  });
