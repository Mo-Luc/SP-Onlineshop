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
  const amount = filteredProducts.reduce((total, item) => total + item.anzahl).anzahl;

  return { price, amount };
}

(async () => console.log(await getPriceAndQuantity()))();