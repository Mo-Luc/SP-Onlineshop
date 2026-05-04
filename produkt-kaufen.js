const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

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

  produktNameElement.textContent = produkt.name;
  produktBeschreibungElement.textContent = produkt.description;
  produktBildElement.src = produkt["image-url"];

  const produktPreis = produkt.reduced
    ? produkt["reduced-price"]
    : produkt.price;
  produktPreisElement.textContent = `${produktPreis.toFixed(2)} €`;
}

renderProductPage();
