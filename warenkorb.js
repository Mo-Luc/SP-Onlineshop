const warenkorbElement = document.getElementById("warenkorb");


function addOneToWarenkorb(produktId) {
  const warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];
  const produktIndex = warenkorb.findIndex((item) => item.id === produktId);
  warenkorb[produktIndex].anzahl += 1;
  localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
  renderWarenkorb();
}

function removeOneFromWarenkorb(produktId) {
  const warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];
  const produktIndex = warenkorb.findIndex((item) => item.id === produktId);
  warenkorb[produktIndex].anzahl -= 1;
  if (warenkorb[produktIndex].anzahl === 0) {
    warenkorb.splice(produktIndex, 1);
  }
  localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
  renderWarenkorb();
}


async function fetchProduktDetails(warenkorb) {
  const response = await fetch("produkte.json");

  let produkte = await response.json();
  return produkte
    .filter((produkt) => warenkorb.map((item) => item.id).includes(produkt.id))
    .map((produkt) => {
      const anzahl = warenkorb.find((item) => item.id === produkt.id).anzahl;
      return { ...produkt, anzahl };
    });
}

async function renderWarenkorb() {
  /* const warenkorb = [
    { id: 1, anzahl: 4 },
    { id: 2, anzahl: 2 },
    { id: 7, anzahl: 3 },
  ]; */
  const warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];

  console.log(JSON.parse(localStorage.getItem("warenkorb")));
  const alleProdukte = await fetchProduktDetails(warenkorb);

  warenkorbElement.innerHTML = `
    <tr>
      <th>Produkt</th>
      <th>Preis</th>
    </tr>
  `;

  alleProdukte.forEach((produkt) => {
    const row = warenkorbElement.insertRow();
    const cellProdukt = row.insertCell();
    const cellPreis = row.insertCell();
    const cellActions = row.insertCell();

    cellActions.innerHTML = `
    <div id="cart-actions">  
    <button class="cart-action-button" onclick="addOneToWarenkorb(${produkt.id})"> + </button>
      <button class="cart-action-button" onclick="removeOneFromWarenkorb(${produkt.id})"> - </button>
    </div>
    `;

    cellProdukt.innerHTML = `
      <div class="warenkorb-row">
      <img src="${produkt["image-url"]}" alt="${produkt.name}" class="produkt-bild">
      <div class="produkt-text">
      <strong>${produkt.name}</strong>
      <p>${produkt.description}</p>
      </div>
      </div>
      `;

      const realPrice = produkt.reduced ? produkt["reduced-price"] : produkt.price

    cellPreis.textContent = `${produkt.anzahl > 1 ? `${produkt.anzahl} × ` : ""} ${realPrice.toFixed(2)} €`;
  });

  if (alleProdukte.length === 0) {
    warenkorbElement.innerHTML = "";
    const leerElement = document.createElement("p");
    leerElement.textContent = "Dein Warenkorb ist leer.";
    document.body.appendChild(leerElement);
  } else {
    const row = warenkorbElement.insertRow();
    const cellProdukt = row.insertCell();
    const cellPreis = row.insertCell();

    cellProdukt.innerHTML = `<strong>SUMME</strong>`;

    let gesamtAnzahl = 0;
    for (const produkt of alleProdukte) {
      gesamtAnzahl += produkt.anzahl;
    }

    let gesamtPreis = 0;
    for (const produkt of alleProdukte) {
      const realPrice = produkt.reduced ? produkt["reduced-price"] : produkt.price;
      gesamtPreis += realPrice * produkt.anzahl;
    }

    cellPreis.textContent = `${gesamtAnzahl} Artikel | ${gesamtPreis.toFixed(2)} €`;
  }
}

renderWarenkorb();
