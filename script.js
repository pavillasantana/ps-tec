// script.js
import pt from "./pt.js";
import es from "./es.js";
import en from "./en.js";

const translations = { pt, es, en };

function setLanguage(lang) {
  const texts = translations[lang] || translations.pt;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (texts[key]) el.innerHTML = texts[key]; // processa HTML (br, span, etc.)
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (texts[key]) el.placeholder = texts[key];
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  document.documentElement.lang = lang;
}

// Troca de idioma
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const lang = e.currentTarget.getAttribute("data-lang");
    setLanguage(lang);
    localStorage.setItem("userLang", lang);
  });
});

// Modal de sucesso
window.closeModal = () => {
  const modal = document.getElementById("success-modal");
  if (modal) modal.style.display = "none";
};

// Envio do formulário (sem refresh)
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("userLang") || "pt";
  setLanguage(savedLang);

  const form = document.getElementById("my-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Aqui seria a chamada ao backend; nesse exemplo, só simula sucesso:
    try {
      console.log("Dados enviados:", data);
      // setTimeout só para simular envio
      setTimeout(() => {
        document.getElementById("success-modal").style.display = "flex";
        form.reset();
      }, 500);
    } catch (err) {
      alert("Erro ao enviar. Tente novamente.");
    }
  });
});

