(() => {
  "use strict";


  // Light / dark theme toggle. The selected theme is remembered in this browser.
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const themeLabel = document.querySelector(".theme-label");
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("madhumitha-theme"); } catch (error) { savedTheme = null; }
  if (savedTheme === "dark") document.documentElement.dataset.theme = "dark";

  const syncThemeControl = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(dark));
      themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
    if (themeIcon) themeIcon.textContent = dark ? "☀" : "☾";
    if (themeLabel) themeLabel.textContent = dark ? "Light mode" : "Dark mode";
  };
  syncThemeControl();
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const dark = document.documentElement.dataset.theme !== "dark";
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      if (!dark) document.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem("madhumitha-theme", dark ? "dark" : "light"); } catch (error) { /* storage unavailable */ }
      syncThemeControl();
    });
  }

  // Flip interest and family cards on click, Enter or Space.
  document.querySelectorAll(".interest-card[data-back], .family-card[data-back]").forEach((card) => {
    const flip = () => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(flipped));
    };
    card.addEventListener("click", flip);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        flip();
      }
    });
  });

  // "Show more" toggles on the journey timeline.
  document.querySelectorAll(".more-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".timeline-item");
      const open = item.classList.toggle("is-expanded");
      button.setAttribute("aria-expanded", String(open));
      button.textContent = open ? "Show less" : "Show more";
    });
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".site-header");
  const yearElement = document.querySelector("#current-year");
  const hobbyDialog = document.querySelector(".hobby-dialog");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogDescription = document.querySelector("#dialog-description");
  const dialogClose = document.querySelector(".dialog-close");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", isCurrent);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll(".hobby-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (!hobbyDialog || typeof hobbyDialog.showModal !== "function") return;
      dialogTitle.textContent = card.dataset.title || "A little more";
      dialogDescription.textContent = card.dataset.description || "";
      hobbyDialog.showModal();
    });
  });

  if (dialogClose && hobbyDialog) {
    dialogClose.addEventListener("click", () => hobbyDialog.close());
    hobbyDialog.addEventListener("click", (event) => {
      if (event.target === hobbyDialog) hobbyDialog.close();
    });
  }
})();
