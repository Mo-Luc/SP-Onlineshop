function getSelectedPaymentMethod() {
  const paymentMethods = document.querySelectorAll(
    'input[name="payment-method"]',
  );
  for (const method of paymentMethods) {
    if (method.checked) {
      return method.value;
    }
  }
}

async function getPriceAndQuantity() {
  const cartItems = JSON.parse(localStorage.getItem("warenkorb")) ?? [];
  const products = await fetch("produkte.json").then((res) => res.json());

  const filteredProducts = cartItems.map((item) => {
    const product = products.find((product) => product.id === item.id);
    const realPrice = product.reduced
      ? product["reduced-price"]
      : product.price;
    return { ...item, price: realPrice };
  });
  const price = filteredProducts.reduce(
    (total, item) => total + item.price * item.anzahl,
    0,
  );
  const amount = filteredProducts.reduce(
    (total, item) => total + item.anzahl,
    0,
  );

  return { price, amount };
}

(async () => {
  const { price, amount } = await getPriceAndQuantity();
  document.getElementById("amount").textContent = `${amount} Produkte`;
  document.getElementById("total-price").textContent =
    `Gesamtpreis: ${price.toFixed(2)} €`;
})();

const radioButtons = document.querySelectorAll('input[name="payment-method"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selectedPaymentMethod = getSelectedPaymentMethod();
    const payButton = document.getElementById("pay-button");
    if (selectedPaymentMethod) {
      payButton.disabled = false;
    } else {
      payButton.disabled = true;
    }

    addInputFields(selectedPaymentMethod);
  });
});

let selectedPaymentMethod = null;

function addInputFields(method) {
  const container = document.getElementById("payment-form");
  container.innerHTML = "";

  selectedPaymentMethod = method;
  if (method === "credit-card") {
    container.innerHTML = `
      <label for="card-number">Kartennummer:</label>
      <input type="text" id="card-number" name="card-number" inputmode="numeric" pattern="[0-9 ]{13,23}" maxlength="23" placeholder="1234 5678 9012 3456" required>
      <label for="expiry-date">Ablaufdatum:</label>
      <input type="text" id="expiry-date" name="expiry-date" inputmode="numeric" pattern="(0[1-9]|1[0-2])\/[0-9]{2}" maxlength="5" placeholder="MM/YY" required>
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" name="cvv" inputmode="numeric" pattern="[0-9]{3,4}" maxlength="4" placeholder="123" required>
    `;
  } else if (method === "paypal-payment") {
    container.innerHTML = `
      <p>Sie werden nach dem Klick auf "Jetzt bezahlen" zu PayPal weitergeleitet.</p>
    `;
  } else if (method === "google-pay") {
    container.innerHTML = `
      <p>Sie werden nach dem Klick auf "Jetzt bezahlen" zu Google Pay weitergeleitet.</p>
    `;
  } else if (method === "stripe-payment") {
    container.innerHTML = `
      <p>Sie werden nach dem Klick auf "Jetzt bezahlen" zu Stripe weitergeleitet.</p>
    `;
  } else if (method === "visa-payment") {
    container.innerHTML = `
      <p>Sie werden nach dem Klick auf "Jetzt bezahlen" zu Visa weitergeleitet.</p>
    `;
  }
}

function handlePayment() {
  let exitFunction = false;

  Array.from(
    document.querySelectorAll(
      "#salutation, #name, #lastname, #email, #email-confirmation, #street, #postal-code, #city",
    ),
  )
    .reverse()
    .forEach((input) => {
      if (!input.value || input.value.trim() === "") {
        showToast(
          input.id === "salutation"
            ? "Bitte wählen Sie eine Anrede aus."
            : input.id === "name"
              ? "Bitte geben Sie Ihren Namen ein."
              : input.id === "lastname"
                ? "Bitte geben Sie Ihren Nachnamen ein."
                : input.id === "email"
                  ? "Bitte geben Sie Ihre E-Mail-Adresse ein."
                  : input.id === "email-confirmation"
                    ? "Bitte bestätigen Sie Ihre E-Mail-Adresse."
                    : input.id === "street"
                      ? "Bitte geben Sie Ihre Straße und Hausnummer ein."
                      :input.id === "phone-number"
                          ? "Bitte geben Sie Ihre Telefonnummer ein."
                          : input.id === "postal-code"
                            ? "Bitte geben Sie Ihre Postleitzahl ein."
                            : input.id === "city"
                             ? "Bitte geben Sie Ihre Stadt ein."
                             : "Bitte füllen Sie alle Felder aus.",
          3000,
          "var(--error-color)",
        );
        exitFunction = true;
      } else if (input.id === "email-confirmation") {
        const email = document.getElementById("email").value;
        const emailConfirmation = input.value;
        if (email !== emailConfirmation) {
          showToast(
            "Die E-Mail-Adressen stimmen nicht überein.",
            3000,
            "var(--error-color)",
          );
          exitFunction = true;
        }
      } else if (checkInputValid().valid === false) {
        showToast(
          "Bitte überprüfen Sie Ihre Kreditkartendaten.",
          3000,
          "var(--error-color)",
        );
      }
    });
  if (exitFunction) return;

  if (selectedPaymentMethod === "credit-card") {
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || !expiryDate || !cvv) {
      showToast(
        "Bitte füllen Sie alle Felder aus.",
        3000,
        "var(--error-color)",
      );
      return;
    } else {
      showToast(
        "Zahlung erfolgreich! Vielen Dank für Ihren Einkauf.",
        3000,
        "var(--success-color)",
      );
      localStorage.removeItem("warenkorb");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    }
  } else {
    showToast(
      `Zahlung über ${selectedPaymentMethod} erfolgreich! Vielen Dank für Ihren Einkauf.`,
      3000,
      "var(--success-color)",
    );
    localStorage.removeItem("warenkorb");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }
}

function checkCreditCardValid() {
  const cardNumber = document.getElementById("card-number").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvv = document.getElementById("cvv").value;

  const cardNumberPattern = /^[0-9 ]{13,23}$/;
  const expiryDatePattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  const cvvPattern = /^[0-9]{3,4}$/;

  if (
    !cardNumberPattern.test(cardNumber) ||
    !expiryDatePattern.test(expiryDate) ||
    !cvvPattern.test(cvv)
  ) {
    return (valid = false);
  }
  return (valid = true);
}
