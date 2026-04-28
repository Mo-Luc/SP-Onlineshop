async function renderSonderangebote() {
  const produkteContainer = document.getElementById("karten-container");

  const response = await fetch("produkte.json");
  let produkte = await response.json();
  produkte = produkte.filter((produkt) => produkt.reduced === true);

  produkte.forEach((produkt, index) => {
    const produktElement = `
        <div class="produkt" id="produkt-${produkt.id}" style="opacity: 1; animation: none;" onClick="window.location.href='produkt-kaufen.html?id=${produkt.id}'">
          <img src="${produkt["image-url"]}" alt="${produkt.name}" />
          <h2 class="produkt-name">${produkt.name}</h2>
          <p class="produkt-description">${produkt.description}</p>
          <p class="produkt-preis">${produkt.price.toFixed(2)} €</p>
        </div>
      `;

    produkteContainer.innerHTML += produktElement;
  });
}

renderSonderangebote();
