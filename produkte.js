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
let currentSearchTerm = "";
let currentFilterCategory = null;
let currentFilterMaxPrice = null;
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
    currentSearchTerm = event.target.value.trim();
    applyAllFilters(false);
  });

function applyAllFilters(animated = true) {
  let baseList = produkte;
  if (currentSearchTerm && fuse) {
    const results = fuse.search(currentSearchTerm).map((r) => r.item);
    baseList = results;
  }

  filteredProdukte = baseList.filter((produkt) => {
    let matchesCategory = true;
    if (currentFilterCategory) {
      const cat = produkt.category;
      if (Array.isArray(cat)) {
        matchesCategory = cat.some(
          (c) => String(c).toLowerCase().trim() === currentFilterCategory,
        );
      }
    }
    const matchesPrice =
      currentFilterMaxPrice == null
        ? true
        : produkt.price <= currentFilterMaxPrice;
    return matchesCategory && matchesPrice;
  });

  renderProdukte((animated = true));
}

function applyFilter(selectedCategory, maxPrice) {
  currentFilterCategory =
    selectedCategory == null ? null : String(selectedCategory).toLowerCase();
  currentFilterMaxPrice = maxPrice == null ? null : maxPrice;
  applyAllFilters();
}
