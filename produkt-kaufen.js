const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.get("id"));

const warenkorbActionsHTML = `<div id="warenkorb-actions" >
      <button id="warenkorb-action-reduce" onclick="removeOneFromCart()">

        <!-- Icon von https://heroicons.com/ -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} height="24" width="24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>



      </button>
      <button id="warenkorb-action-trash" onclick="removeAllFromCart()">

        <!-- Icon von https://heroicons.com/ -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>`;



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

function removeOneFromCart() {
  const existingProductIndex = warenkorb.findIndex(
    (item) => item.id === productId,
  );

  if (existingProductIndex !== -1) {
    if (warenkorb[existingProductIndex].anzahl > 1) {
      warenkorb[existingProductIndex].anzahl--;
    } else {
      warenkorb.splice(existingProductIndex, 1);
    }
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    renderProductPage()
  }
}
function removeAllFromCart() {
  const existingProductIndex = warenkorb.findIndex(
    (item) => item.id === productId,
  );

  if (existingProductIndex !== -1) {
    warenkorb.splice(existingProductIndex, 1);
    localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    renderProductPage()
  }
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

  try { document.getElementById("warenkorb-actions").remove() } catch (error) {  }

  const isInCart = warenkorb.some((item) => item.id === productId);
  if (isInCart) {
    kaufenButton.insertAdjacentHTML("afterend", warenkorbActionsHTML);
  }

  try {
    const produktAnzahl = warenkorb[warenkorb.findIndex((item) => item.id === produkt.id)].anzahl;
  
    kaufenButton.textContent = `In den Warenkorb | ${produktAnzahl}`
    
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
