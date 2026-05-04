const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.get("id"));

const warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];

function produktKaufen() {
  const existingProductIndex = warenkorb.findIndex(
    (item) => item.id === productId,
  );

  if (existingProductIndex === -1) {
    warenkorb.push({ id: productId, anzahl: 1 });
  } else {
    warenkorb[existingProductIndex].anzahl++;
  }

  localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
  renderProductPage()
}

async function renderProductPage() {
  const response = await fetch("produkte.json");
  const produkte = await response.json();
  const produkt = produkte.find((produkt) => produkt.id == productId);
  const produktNameElement = document.getElementById("produkt-name");
  const produktBeschreibungElement = document.getElementById(
    "produkt-beschreibung",
  );
  const produktBildElement = document.getElementById("produkt-bild");
  const produktPreisElement = document.getElementById("produkt-preis");
  const kaufenButton = document.getElementById("kaufen-button");

  try {
    const produktAnzahl = warenkorb[warenkorb.findIndex((item) => item.id === produkt.id)].anzahl;
  
    kaufenButton.textContent = `In den Warenkorb - ${produktAnzahl}`
    
  } catch (error) {
    kaufenButton.textContent = `In den Warenkorb`
  }

  produktNameElement.textContent = produkt.name;
  produktBeschreibungElement.textContent = produkt.description;
  produktBildElement.src = produkt["image-url"];

  const produktPreis = produkt.reduced
    ? produkt["reduced-price"]
    : produkt.price;
  produktPreisElement.textContent = `${produktPreis.toFixed(2)} €`;
}

renderProductPage();
