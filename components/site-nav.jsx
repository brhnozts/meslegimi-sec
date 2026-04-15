import Link from "next/link";

export function SiteNav({ moduleKey, activePage = "home" }) {
  if (moduleKey === "dashboard") {
    return (
      <nav className="navbar navbar-expand-lg sticky-top site-navbar">
        <div className="container">
          <Link className="navbar-brand site-brand" href="/">
            Mesleğimi Seç
          </Link>
          <div className="navbar-nav ms-auto gap-lg-2">
            <Link className={`nav-link site-nav-link ${activePage === "home" ? "active" : ""}`} href="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link site-nav-link" href="/universite">
              Üniversite
            </Link>
            <Link className="nav-link site-nav-link" href="/lise">
              Lise
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const moduleMeta = {
    universite: {
      title: "Üniversite Yolu",
      root: "/universite",
      switchHref: "/lise",
      switchLabel: "Lise Yolu"
    },
    lise: {
      title: "Lise Sonrası Meslek",
      root: "/lise",
      switchHref: "/universite",
      switchLabel: "Üniversite Yolu"
    }
  }[moduleKey];

  return (
    <nav className="navbar navbar-expand-lg sticky-top site-navbar">
      <div className="container">
        <Link className="navbar-brand site-brand" href="/">
          Mesleğimi Seç
        </Link>
        <div className="navbar-nav me-auto">
          <span className="nav-link site-nav-link active">{moduleMeta.title}</span>
        </div>
        <div className="navbar-nav ms-auto gap-lg-2">
          <Link className={`nav-link site-nav-link ${activePage === "home" ? "active" : ""}`} href={moduleMeta.root}>
            Genel Bakış
          </Link>
          <Link className={`nav-link site-nav-link ${activePage === "test" ? "active" : ""}`} href={`${moduleMeta.root}/test`}>
            Test
          </Link>
          <Link className={`nav-link site-nav-link ${activePage === "results" ? "active" : ""}`} href={`${moduleMeta.root}/sonuclar`}>
            Sonuçlar
          </Link>
          <Link className={`nav-link site-nav-link ${activePage === "careers" ? "active" : ""}`} href={`${moduleMeta.root}/meslekler`}>
            Meslekler
          </Link>
          <Link className="nav-link site-nav-link" href={moduleMeta.switchHref}>
            {moduleMeta.switchLabel}
          </Link>
          <Link className="nav-link site-nav-link" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
