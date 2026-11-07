/**
 * Mahmudul Mashrafe — Editorial Portfolio Engine
 * Architecture: Pure Modern Vanilla JavaScript (Zero framework overhead)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Management (Dark / Light)
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;

  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    htmlRoot.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      themeToggleBtn.innerHTML =
        theme === "dark"
          ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
          : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  };

  // Initialize Theme
  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlRoot.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  // Listen to OS-level theme preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  // 2. Header Scroll Effect
  const header = document.querySelector(".header");
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-drawer .nav-link");

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. Project Category Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "All" || cardCat === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 5. Engineering Archive Real-time Search
  const archiveSearchInput = document.getElementById("archive-search");
  const archiveRows = document.querySelectorAll(".archive-table tbody tr");

  if (archiveSearchInput) {
    archiveSearchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      archiveRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
      });
    });
  }

  // 6. Direct Inquiry Modal
  const modalOverlay = document.getElementById("contact-modal");
  const openModalBtns = document.querySelectorAll(".trigger-contact-modal");
  const closeModalBtns = document.querySelectorAll(".close-contact-modal");

  const openModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.add("open");
      modalOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove("open");
      modalOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  openModalBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeModalBtns.forEach((btn) => btn.addEventListener("click", closeModal));

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay?.classList.contains("open")) {
      closeModal();
    }
  });

  // 7. Direct Mail Dispatch Generator
  const inquiryForm = document.getElementById("inquiry-form");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const scope = document.getElementById("inquiry-scope")?.value || "Engineering Collaboration";
      const name = document.getElementById("inquiry-name")?.value || "Client";
      const message = document.getElementById("inquiry-message")?.value || "";

      const subject = encodeURIComponent(`[Inquiry: ${scope}] from ${name}`);
      const body = encodeURIComponent(
        `Hi Mahmudul,\n\nI am contacting you regarding: ${scope}.\n\nDetails:\n${message}\n\nBest regards,\n${name}`
      );
      window.location.href = `mailto:mahmudulmashrafe@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Scope Selector button hook
  const selectScopeBtns = document.querySelectorAll(".select-scope-btn");
  selectScopeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const scopeVal = btn.getAttribute("data-scope");
      const selectElement = document.getElementById("inquiry-scope");
      if (selectElement && scopeVal) {
        selectElement.value = scopeVal;
        document.getElementById("inquiry-section")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 8. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
