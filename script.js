document.body.insertAdjacentHTML(
  "afterbegin",
  `
        <div class="nav-wrap">
            <nav>
                <a class="leiste" href="index.html">Home</a>
                <a class="leiste" href="produkte.html">Produkte</a>
                <a class="leiste" href="kontakt.html">Kontakt</a>
                <button class="leiste" onclick="toggleDarkMode()">🌙</button>
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

  localStorage.setItem(
    "darkmode",
    document.body.classList.contains("darkmode") ? "enabled" : "disabled",
  );
}
