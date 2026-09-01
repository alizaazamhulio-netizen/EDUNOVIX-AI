import { requireAuth, logout, userLabel } from "./auth.js";

const user = await requireAuth();

if (user) {
  document.querySelectorAll("[data-auth-name]").forEach((element) => {
    if ("value" in element) element.value = userLabel(user);
    else element.textContent = userLabel(user);
  });
  document.querySelectorAll("[data-auth-email]").forEach((element) => {
    if ("value" in element) element.value = user.email || "";
    else element.textContent = user.email || "";
  });
  document.querySelectorAll("[data-auth-logout]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      button.disabled = true;
      try {
        await logout();
      } finally {
        button.disabled = false;
      }
    });
  });
}
