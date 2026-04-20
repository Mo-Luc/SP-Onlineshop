async function renderProdukte() {
  const produkteContainer = document.getElementById("produkte-container");

  const response = await fetch("produkte.json");
  const produkte = await response.json();

  produkte.forEach((produkt) => {
    const produktElement = `
        <div class="produkt">
          <img src="${produkt["image-url"]}" alt="${produkt.name}" />
          <h2 class="produkt-name">${produkt.name}</h2>
          <p class="produkt-description">${produkt.description}</p>
          <p class="produkt-preis">${produkt.price.toFixed(2)} €</p>
        </div>
      `;

    produkteContainer.innerHTML += produktElement;
  });
}

renderProdukte();
