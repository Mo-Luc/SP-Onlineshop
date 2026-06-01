const popupElement = document.querySelector(".filter-popup");
const filterCategoryElement = document.getElementById("filter-category");
const filterPriceElement = document.getElementById("filter-price");
const applyFilterButton = document.getElementById("apply-filters");

const categories = [
  "Alle",
  "Smartphones",
  "Laptops",
  "Tablets",
  "Zubehör",
  "Kabel",
  "Kameras",
  "Drohnen",
  "Wearables",
  "Spielzeug",
  "Spielekonsolen",
  "Fernseher",
  "Kaffee",
  "Züge",
  "Audio",
];
filterCategoryElement.innerHTML = "";
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  filterCategoryElement.appendChild(option);
});

function getSelectedCategory() {
  return filterCategoryElement.value === "Alle"
    ? null
    : filterCategoryElement.value;
}

function getSelectedPrice() {
  const val = filterPriceElement.value;
  if (!val || val === "" || val === "1000" || Number(val) >= 1000) return null;
  return val;
}

applyFilterButton.addEventListener("click", () => {
  const selectedCategory = getSelectedCategory();
  const selectedPrice = getSelectedPrice();
  applyFilter(selectedCategory, selectedPrice);
  closeFilterPopup();
});

function openFilterPopup() {
  popupElement.classList.add("open");
}
function closeFilterPopup() {
  popupElement.classList.remove("open");
}
