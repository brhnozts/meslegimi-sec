import { escapeHtml, sanitizeUrl } from "./security.js";

export function injectShell(targetSelector, config) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = renderSiteShell(config);
}

function renderSiteShell({ moduleKey, activePage }) {
  if (moduleKey === "dashboard") {
    return `
      <nav class="navbar navbar-expand-lg sticky-top site-navbar">
        <div class="container">
          <a class="navbar-brand site-brand" href="../index.html">Mesleğimi Seç</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="siteMenu">
            <ul class="navbar-nav ms-auto gap-lg-2">
              <li class="nav-item">
                <a class="nav-link site-nav-link${activePage === "home" ? " active" : ""}" href="../dashboard/index.html">Dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link site-nav-link" href="../meslek_universite/index.html">Üniversite Modülü</a>
              </li>
              <li class="nav-item">
                <a class="nav-link site-nav-link" href="../meslek_lise/index.html">Lise Modülü</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  const modules = {
    universite: {
      label: "Üniversite Yolu",
      path: "meslek_universite",
      switchLabel: "Lise Yolu"
    },
    lise: {
      label: "Lise Sonrası Meslek",
      path: "meslek_lise",
      switchLabel: "Üniversite Yolu"
    }
  };

  const current = modules[moduleKey];
  const otherKey = moduleKey === "universite" ? "lise" : "universite";
  const other = modules[otherKey];

  return `
    <nav class="navbar navbar-expand-lg sticky-top site-navbar">
      <div class="container">
        <a class="navbar-brand site-brand" href="../index.html">Mesleğimi Seç</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="siteMenu">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <span class="nav-link site-nav-link active">${escapeHtml(current.label)}</span>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto gap-lg-2">
            ${buildLink(current.path, "index.html", "Genel Bakış", activePage === "home")}
            ${buildLink(current.path, "test.html", "Test", activePage === "test")}
            ${buildLink(current.path, "sonuclar.html", "Sonuçlar", activePage === "results")}
            ${buildLink(current.path, "meslekler.html", "Meslekler", activePage === "careers")}
            <li class="nav-item">
              <a class="nav-link site-nav-link" href="${sanitizeUrl(`../${other.path}/index.html`)}">${escapeHtml(other.switchLabel)}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

function buildLink(path, fileName, label, active) {
  return `
    <li class="nav-item">
      <a class="nav-link site-nav-link${active ? " active" : ""}" href="${sanitizeUrl(`../${path}/${fileName}`)}">${escapeHtml(label)}</a>
    </li>
  `;
}
