async function renderProdukte() {
  const produkteContainer = document.getElementById("karten-container");

  const response = await fetch("produkte.json");
  let produkte = await response.json();
  produkte = produkte
    .concat(produkte)
    .concat(produkte)
    .concat(produkte)
    .concat(produkte)
    .concat(produkte)
    .concat(produkte)
    .concat(produkte)
    .concat(produkte)
    .concat(produkte)
    .concat(produkte);

  produkte.forEach((produkt, index) => {
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
