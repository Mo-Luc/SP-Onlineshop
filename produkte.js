async function renderProdukte() {
  const produkteContainer = document.getElementById("karten-container");

  const response = await fetch("produkte.json");
  const produkte = await response.json();

  produkte.forEach((produkt, index) => {
    const produktElement = `
        <div class="produkt" id="produkt-${produkt.id}" style="animation-delay: ${index * 0.1}s;" onAnimationEnd="this.style.opacity = '1';" onClick="window.location.href='produkt-kaufen.html?id=${produkt.id}'">
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
