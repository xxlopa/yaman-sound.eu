
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("yaman-lang") || "en";

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

// Newsletter status message from Netlify Function redirect
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("newsletter");
    if (!status) return;

    const form = document.querySelector(".newsletter-form");
    if (!form) return;

    const message = document.createElement("p");
    message.className = "newsletter-status newsletter-status-" + status;

    const isCs = document.documentElement.getAttribute("data-lang") === "cs";
    const texts = {
      success: isCs ? "Hotovo — email byl přidán do YAMAN newsletteru." : "Done — your email was added to the YAMAN newsletter.",
      invalid: isCs ? "Zadej prosím platný email." : "Please enter a valid email address.",
      error: isCs ? "Něco se nepovedlo. Zkus to prosím znovu za chvíli." : "Something went wrong. Please try again in a moment."
    };

    message.textContent = texts[status] || texts.error;
    form.insertAdjacentElement("afterend", message);

    params.delete("newsletter");
    const cleanUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "") + window.location.hash;
    window.history.replaceState({}, "", cleanUrl);
  });
})();
