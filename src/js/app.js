// TAKTO - Progressive Enhancement JS
(function () {
  // Utility: Add .js class, remove .no-js
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  // Theme toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;
  const logoImg = document.getElementById("takto-logo");
  function updateFavicon(theme) {
    const link = document.querySelector("link[rel~='icon']");
    if (!link || !(link instanceof HTMLLinkElement)) return;
    link.href = theme === "dark" ? "TAKTO WHITE.svg" : "TAKTO BLACK.svg";
  }
  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-theme");
      if (logoImg && logoImg instanceof HTMLImageElement)
        logoImg.src = "TAKTO WHITE.svg";
      // Variables CSS dark
      document.documentElement.style.setProperty("--bg-color", "#18191a");
      document.documentElement.style.setProperty("--input-bg", "#23272f");
      document.documentElement.style.setProperty("--text-color", "#f7f7f8");
      document.documentElement.style.setProperty("--primary", "#f7f7f8");
      document.documentElement.style.setProperty("--secondary", "#23272f");
      document.documentElement.style.setProperty("--accent", "#35363a");
      document.documentElement.style.setProperty("--border-color", "#5a5b60");
      document.documentElement.style.setProperty(
        "--border-highlight",
        "#6a6b70"
      );
      document.documentElement.style.setProperty(
        "--focus-outline",
        "2.5px solid #bdbdbd"
      );
      document.documentElement.style.setProperty("--skip-link-bg", "#bdbdbd");
      document.documentElement.style.setProperty(
        "--skip-link-color",
        "#23272f"
      );
    } else {
      body.classList.remove("dark-theme");
      if (logoImg && logoImg instanceof HTMLImageElement)
        logoImg.src = "TAKTO BLACK.svg";
      // Variables CSS light
      document.documentElement.style.setProperty("--bg-color", "#f7f7f8");
      document.documentElement.style.setProperty("--input-bg", "#fff");
      document.documentElement.style.setProperty("--text-color", "#18191a");
      document.documentElement.style.setProperty("--primary", "#23272f");
      document.documentElement.style.setProperty("--secondary", "#f3f3f4");
      document.documentElement.style.setProperty("--accent", "#e5e7eb");
      document.documentElement.style.setProperty("--border-color", "#ececec");
      document.documentElement.style.setProperty(
        "--border-highlight",
        "#e0e0e0"
      );
      document.documentElement.style.setProperty(
        "--focus-outline",
        "2.5px solid #23272f"
      );
      document.documentElement.style.setProperty("--skip-link-bg", "#23272f");
      document.documentElement.style.setProperty("--skip-link-color", "#fff");
    }
    document.documentElement.style.colorScheme = theme;
    updateFavicon(theme);
  }
  function getSystemTheme() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  function getSavedTheme() {
    const saved = localStorage.getItem("takto-theme");
    if (saved === "dark" || saved === "light") return saved;
    // Si aucun choix utilisateur, détecter le thème système
    return getSystemTheme();
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
    themeBtn.setAttribute("aria-checked", isDark ? "true" : "false");
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

  // Export/Import de liens
  function exportLinks() {
    const data = JSON.stringify(userLinks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "takto-liens.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
  function importLinksFromFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const result =
          e.target && typeof e.target.result === "string"
            ? e.target.result
            : "";
        const imported = JSON.parse(result);
        if (Array.isArray(imported)) {
          let added = 0;
          imported.forEach((l) => {
            if (l && l.name && l.url && l.category) {
              // Générer un nouvel id unique
              const id =
                "link-" +
                Date.now() +
                "-" +
                Math.random().toString(36).slice(2, 8);
              userLinks.push({
                id,
                name: l.name,
                url: l.url,
                category: l.category,
              });
              added++;
            }
          });
          saveLinks();
          renderLinks();
          alert(added + " liens importés.");
        } else {
          alert("Fichier invalide.");
        }
      } catch (err) {
        alert("Erreur lors de l'import.");
      }
    };
    reader.readAsText(file);
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
      <div class='app-section' style='display: flex; gap: 1rem; align-items: center;'>
        <label for='link-search'>Rechercher dans vos liens</label>
        <input type='search' id='link-search' placeholder='Recherche...' autocomplete='off' />
        <button id='export-links-btn' type='button' title='Exporter vos liens' aria-label='Exporter vos liens'>Exporter</button>
        <label for='import-links-input' style='margin: 0; padding: 0; display: inline;'>
          <button id='import-links-btn' type='button' title='Importer des liens' aria-label='Importer des liens'>Importer</button>
          <input type='file' id='import-links-input' accept='.json,application/json' style='display: none;' />
        </label>
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
    var exportBtn = document.getElementById("export-links-btn");
    if (exportBtn) {
      exportBtn.addEventListener("click", exportLinks);
    }
    var importBtn = document.getElementById("import-links-btn");
    var importInput = document.getElementById("import-links-input");
    if (importBtn && importInput && importInput instanceof HTMLInputElement) {
      importBtn.addEventListener("click", function () {
        if (importInput) importInput.click();
      });
      importInput.addEventListener("change", function (e) {
        const input = e.target;
        if (
          input &&
          input instanceof HTMLInputElement &&
          input.files &&
          input.files[0]
        ) {
          importLinksFromFile(input.files[0]);
          input.value = "";
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
        if (btn instanceof HTMLElement) btn.focus(); // Ensure focus remains on the toggled button
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

  // Sidebar redimensionnable (desktop/tablette uniquement)
  function initSidebarResize() {
    if (window.innerWidth < 600) return; // Pas sur mobile
    var sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;
    var sidebarEl = sidebar instanceof HTMLElement ? sidebar : null;
    if (!sidebarEl) return;
    // Créer la poignée
    var handle = document.createElement("div");
    handle.className = "sidebar-resize-handle";
    handle.setAttribute("tabindex", "0");
    handle.setAttribute("role", "separator");
    handle.setAttribute("aria-orientation", "vertical");
    handle.setAttribute("aria-label", "Redimensionner la barre latérale");
    sidebarEl.appendChild(handle);
    // Appliquer largeur sauvegardée
    var savedWidth = localStorage.getItem("takto-sidebar-width");
    if (savedWidth && !isNaN(Number(savedWidth))) {
      sidebarEl.style.width = savedWidth + "px";
    }
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    handle.addEventListener("mousedown", function (e) {
      if (!sidebarEl) return;
      isResizing = true;
      startX = e.clientX;
      startWidth = sidebarEl.offsetWidth;
      document.body.style.cursor = "col-resize";
      e.preventDefault();
    });
    document.addEventListener("mousemove", function (e) {
      if (!isResizing || !sidebarEl) return;
      let newWidth = startWidth + (e.clientX - startX);
      newWidth = Math.max(180, Math.min(newWidth, 600));
      sidebarEl.style.width = newWidth + "px";
    });
    document.addEventListener("mouseup", function (e) {
      if (isResizing && sidebarEl) {
        isResizing = false;
        document.body.style.cursor = "";
        localStorage.setItem(
          "takto-sidebar-width",
          String(parseInt(sidebarEl.offsetWidth.toString(), 10))
        );
      }
    });
    // Accessibilité clavier
    handle.addEventListener("keydown", function (e) {
      if (!sidebarEl) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        let cur = sidebarEl.offsetWidth;
        let delta = e.key === "ArrowLeft" ? -20 : 20;
        let newWidth = Math.max(180, Math.min(cur + delta, 600));
        sidebarEl.style.width = newWidth + "px";
        localStorage.setItem("takto-sidebar-width", String(newWidth));
        e.preventDefault();
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
    } else {
      initSidebarResize();
    }
    // Enregistrement du service worker (support hors-ligne)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js");
      });
    }
  });
})();
