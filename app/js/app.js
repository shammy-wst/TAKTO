// TAKTO - Progressive Enhancement JS
(function () {
  // Utility: Add .js class, remove .no-js
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  // Theme toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;
  const logoImg = document.getElementById("takto-logo");
  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-theme");
      if (logoImg && logoImg instanceof HTMLImageElement)
        logoImg.src = "assets/public/TAKTO WHITE.svg";
    } else {
      body.classList.remove("dark-theme");
      if (logoImg && logoImg instanceof HTMLImageElement)
        logoImg.src = "assets/public/TAKTO BLACK.svg";
    }
  }
  function getSavedTheme() {
    return localStorage.getItem("takto-theme") || "light";
  }
  function saveTheme(theme) {
    localStorage.setItem("takto-theme", theme);
  }
  function toggleTheme() {
    const newTheme = body.classList.contains("dark-theme") ? "light" : "dark";
    applyTheme(newTheme);
    saveTheme(newTheme);
    updateThemeBtn();
  }
  function updateThemeBtn() {
    if (!themeBtn) return;
    const isDark = body.classList.contains("dark-theme");
    const icon = document.getElementById("theme-toggle-icon");
    if (icon) icon.textContent = isDark ? "☀️" : "🌙";
    themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
    applyTheme(getSavedTheme());
    updateThemeBtn();
  } else {
    // Fallback: apply theme on load
    applyTheme(getSavedTheme());
  }

  // Logo click always goes to dashboard
  const logoLink = document.querySelector(".logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

  // User Links Management
  let userLinks = [];
  function loadLinks() {
    try {
      const data = JSON.parse(localStorage.getItem("takto-user-links") || "[]");
      if (Array.isArray(data)) {
        userLinks = data.filter(
          (l) => l && l.id && l.name && l.url && l.category
        );
      }
    } catch (e) {
      userLinks = [];
    }
  }
  function saveLinks() {
    localStorage.setItem("takto-user-links", JSON.stringify(userLinks));
  }
  function addLink(name, url, category) {
    const id =
      "link-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    userLinks.push({ id, name, url, category });
    saveLinks();
    renderLinks();
  }
  function deleteLink(linkId) {
    userLinks = userLinks.filter((l) => l.id !== linkId);
    saveLinks();
    renderLinks();
  }

  // Render user links
  function renderLinks(filter = "") {
    const list = document.getElementById("js-links-list");
    if (!list) return;
    let filtered = userLinks;
    if (filter) {
      const f = filter.toLowerCase();
      filtered = userLinks.filter(
        (l) =>
          l.name.toLowerCase().includes(f) ||
          l.url.toLowerCase().includes(f) ||
          l.category.toLowerCase().includes(f)
      );
    }
    // Group by category
    const grouped = {};
    filtered.forEach((l) => {
      if (!grouped[l.category]) grouped[l.category] = [];
      grouped[l.category].push(l);
    });
    let html = "";
    Object.keys(grouped).forEach((cat) => {
      html += `<div class='user-links-group'><h4>${cat}</h4><ul>`;
      grouped[cat].forEach((link) => {
        html += `<li><a href='${link.url}' target='_blank' rel='noopener'>${link.name}</a> <button type='button' class='delete-link-btn' data-id='${link.id}' aria-label='Supprimer ce lien' title='Supprimer'>🗑️</button></li>`;
      });
      html += "</ul></div>";
    });
    if (!html) {
      html = "<p>Aucun lien trouvé ou ajouté pour le moment.</p>";
    }
    list.innerHTML = html;
  }

  // Render JS features UI
  function renderApp() {
    const features = document.getElementById("js-features");
    if (!features) return;
    features.innerHTML = `
      <form id='add-link-form' class='app-section' autocomplete='off'>
        <h3>Ajouter un lien personnel</h3>
        <div class='add-link-row'>
          <label>Nom du lien
            <input type='text' name='name' required maxlength='60' aria-label='Nom du lien'>
          </label>
          <label>URL
            <input type='url' name='url' required pattern='https?://.+' aria-label='URL du lien'>
          </label>
          <label>Catégorie
            <input type='text' name='category' required maxlength='40' aria-label='Catégorie du lien'>
          </label>
        </div>
        <button type='submit'>Ajouter</button>
      </form>
      <div class='app-section'>
        <label for='link-search'>Rechercher dans vos liens</label>
        <input type='search' id='link-search' placeholder='Recherche...' autocomplete='off' />
      </div>
      <div id='js-links-list' class='app-section' aria-live='polite'></div>
    `;
    // Add event listeners
    var addForm = document.getElementById("add-link-form");
    if (addForm) {
      addForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var form = e.target;
        if (!(form instanceof HTMLFormElement)) return;
        var nameInput = form.elements["name"];
        var urlInput = form.elements["url"];
        var categoryInput = form.elements["category"];
        if (
          nameInput instanceof HTMLInputElement &&
          urlInput instanceof HTMLInputElement &&
          categoryInput instanceof HTMLInputElement
        ) {
          var name = nameInput.value.trim();
          var url = urlInput.value.trim();
          var category = categoryInput.value.trim();
          if (name && url && category) {
            addLink(name, url, category);
            form.reset();
          }
        }
      });
    }
    var searchInput = document.getElementById("link-search");
    if (searchInput && searchInput instanceof HTMLInputElement) {
      searchInput.addEventListener("input", function () {
        renderLinks(
          searchInput instanceof HTMLInputElement ? searchInput.value : ""
        );
      });
    }
    var linksList = document.getElementById("js-links-list");
    if (linksList) {
      linksList.addEventListener("click", function (e) {
        var target = e.target;
        if (
          target &&
          target instanceof HTMLElement &&
          target.classList.contains("delete-link-btn")
        ) {
          deleteLink(target.getAttribute("data-id"));
        }
      });
    }
  }

  // Collapsible sidebar categories
  function initCollapsibles() {
    var cats = document.querySelectorAll(".collapsible-category");
    cats.forEach(function (cat) {
      var btn = cat.querySelector(".collapsible-header");
      if (!btn) return;
      // Always start collapsed
      btn.setAttribute("aria-expanded", "false");
      cat.classList.add("collapsed");
      var arrow = btn.querySelector(".arrow");
      if (arrow) arrow.textContent = "▶";
      btn.addEventListener("click", function () {
        if (!btn) return;
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", (!expanded).toString());
        cat.classList.toggle("collapsed");
        var arrow = btn.querySelector(".arrow");
        if (arrow) arrow.textContent = expanded ? "▶" : "▼";
      });
    });
  }

  function collapseCategoriesOnLoad() {
    // Always collapse categories on every page load
    initCollapsibles();
  }

  // Hamburger menu for mobile
  function initHamburger() {
    var hamburger = document.createElement("button");
    hamburger.className = "hamburger js-only";
    hamburger.setAttribute("aria-label", "Ouvrir/fermer le menu");
    hamburger.setAttribute("aria-controls", "header-nav");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = "<span></span><span></span><span></span>";
    var header = document.querySelector(".header-content");
    if (header) header.insertBefore(hamburger, header.firstChild);
    var headerNav = document.querySelector(".header-nav");
    if (headerNav) headerNav.setAttribute("id", "header-nav");
    hamburger.addEventListener("click", function () {
      if (!headerNav) return;
      var isOpen = headerNav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Close nav on ESC
    document.addEventListener("keydown", function (e) {
      if (!headerNav || !hamburger) return;
      if (e.key === "Escape" && headerNav.classList.contains("open")) {
        headerNav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
    // Close nav when clicking outside
    document.addEventListener("click", function (e) {
      if (!headerNav || !hamburger) return;
      var target = e.target;
      if (
        headerNav.classList.contains("open") &&
        !headerNav.contains(target instanceof Node ? target : null) &&
        !hamburger.contains(target instanceof Node ? target : null)
      ) {
        headerNav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("js-features")) {
      renderApp();
      loadLinks();
      renderLinks();
      if (themeBtn) updateThemeBtn();
    }
    // Always apply saved theme
    applyTheme(getSavedTheme());
    // Always collapse categories
    collapseCategoriesOnLoad();
    if (window.innerWidth <= 600) {
      initHamburger();
    }
  });
})();
