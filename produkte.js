async function renderProdukte() {
  const produkteContainer =
    document.getElementsByClassName("karten-container")[0];

  const response = await fetch("produkte.json");
  const produkte = await response.json();

  const urlParams = new URLSearchParams(window.location.search);
  const suchbegriff = urlParams.get("search")?.toLowerCase() || "";

  let gefilterte_produkte = produkte;
  if (suchbegriff) {
    gefilterte_produkte = produkte.filter(produkt => 
      produkt.name.toLowerCase().includes(suchbegriff) ||
      produkt.description.toLowerCase().includes(suchbegriff)
    );


    produkteContainer.innerHTML = `<div style="width: 100%; text-align: center; margin-bottom: 20px;"><h2>Suchergebnisse für: "${suchbegriff}"</h2><p>${gefilterte_produkte.length} Produkt(e) gefunden</p></div>`;

    if (gefilterte_produkte.length === 0) {
      produkteContainer.innerHTML += `<p style="text-align: center; font-size: 18px; color: var(--text-color-dimmed);">Keine Produkte gefunden. Bitte versuchen Sie einen anderen Suchbegriff.</p>`;
      return;
    }
  }

  gefilterte_produkte.forEach((produkt, index) => {
    const produktElement = `
        <div class="produkt" id="produkt-${produkt.id}" style="animation-delay: ${index * 0.1}s;" onAnimationEnd="this.style.opacity = '1';" onClick="window.location.href='produkt-kaufen.html?id=${produkt.id}'">
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

renderProdukte();
