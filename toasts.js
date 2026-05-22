const Toast = document.body.appendChild(document.createElement("div"));
Toast.id = "toast";
Toast.classList.add("toast");
Toast.innerHTML = `
  <span id="toast-message"></span>
`;
Toast.style.position = "fixed";
Toast.style.bottom = "20px";
Toast.style.right = "20px";
Toast.style.backgroundColor = "var(--accent-color)";
Toast.style.color = "var(--text-color)";
Toast.style.padding = "10px 20px";
Toast.style.borderRadius = "10px";
Toast.style.opacity = "0";
Toast.style.transform = "translateY(100px)";
Toast.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";

let toastTimeout;
function showToast(message, time = 3000, color = "var(--accent-color)") {
  clearTimeout(toastTimeout);
  Toast.style.opacity = "0";
  Toast.style.transform = "translateY(100px)";

  const toastMessage = document.getElementById("toast-message");
  setTimeout(() => {
    toastMessage.textContent = message;
    Toast.style.backgroundColor = color;
    Toast.style.opacity = "1";
    Toast.style.transform = "translateY(0)";
  }, 100);
  toastTimeout = setTimeout(() => {
    Toast.style.opacity = "0";
    Toast.style.transform = "translateY(100px)";
  }, time);
}
