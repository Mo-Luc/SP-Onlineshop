async function renderProdukte() {
  const produkteContainer = document.getElementById("produkte-container");

  const response = await fetch("produkte.json");
  const produkte = await response.json();

  produkte.forEach((produkt) => {
    const produktElement = `
        <div class="produkt">
          <img src="${produkt["image-url"]}" alt="${produkt.name}" />
          <h2>${produkt.name}</h2>
          <p>${produkt.description}</p>
          <p>Preis: ${produkt.price.toFixed(2)} €</p>
        </div>
      `;

    produkteContainer.innerHTML += produktElement;
  });
}

renderProdukte();
