
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("yaman-lang") || "cs";

  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    localStorage.setItem("yaman-lang", lang);
    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-lang-button") === lang);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      button.addEventListener("click", function () {
        setLang(button.getAttribute("data-lang-button"));
      });
    });
    setLang(saved);
  });
})();


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".roster-card").forEach(function (card) {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    function toggleCard(event) {
      if (
        event.target.closest("a") ||
        event.target.closest("summary") ||
        event.target.closest(".socials")
      ) {
        return;
      }

      const details = card.querySelector("details");
      if (details) {
        details.open = !details.open;
      }
    }

    card.addEventListener("click", toggleCard);

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const details = card.querySelector("details");
        if (details) {
          details.open = !details.open;
        }
      }
    });
  });
});
