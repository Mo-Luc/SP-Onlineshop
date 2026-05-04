// Icon von https://heroicons.com/
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" height="24" width="24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
`;

// Icon von https://heroicons.com/
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" height="24" width="24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>

`;

document.body.insertAdjacentHTML(
  "afterbegin",
  `
        <div class="nav-wrap">
            <nav>
                <button class="leiste" onclick="toggleDarkMode()">
                  <span id="icon-placeholder"></span>
                </button>
                <a class="leiste" href="index.html">Home</a>
                <a class="leiste" href="produkte.html">Produkte</a>
                <a class="leiste" href="kontakt.html">Kontakt</a>
                <a class="leiste" href="#">Gewinnspiele</a>
                <a class="leiste" href="warenkorb.html">

                  <!-- Icon von https://heroicons.com/ -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                
                </a>
            </nav>
        </div>
        <div class="placeholder"></div>
        `,
);

const aktuelleSeite = location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll("a.leiste");
navLinks.forEach((link) => {
  if (link.getAttribute("href") === aktuelleSeite) {
    link.classList.add("aktuelle-seite");
  }
});

localStorage.getItem("darkmode") !== "disabled"
  ? document.body.classList.add("darkmode")
  : null;

function toggleDarkMode() {
  document.body.classList.toggle("darkmode");
  const darkMode = document.body.classList.contains("darkmode");

  localStorage.setItem(
    "darkmode",
    document.body.classList.contains("darkmode") ? "enabled" : "disabled",
  );

  updateIcon();
}

function updateIcon() {
  const iconPlaceholder = document.getElementById("icon-placeholder");
  if (document.body.classList.contains("darkmode")) {
    iconPlaceholder.innerHTML = sunIcon;
  } else {
    iconPlaceholder.innerHTML = moonIcon;
  }
}
updateIcon();
