import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function LiseHomePage() {
  return (
    <>
      <SiteNav moduleKey="lise" activePage="home" />
      <section className="hero-section">
        <div className="container">
          <div className="page-grid">
            <div className="glass-panel">
              <span className="eyebrow mb-3">Lise sonrası kariyer rehberi</span>
              <h1 className="display-title">
                <span className="grad-text">Lise sonrası yolu</span> daha net ekranlarla ilerlet
              </h1>
              <p className="lead-text">
                Bu bölüm de Next sürümüne taşındı. İlk hedef canlı test olduğu için hafif ama sürdürülebilir bir temel kurduk.
              </p>
              <div className="d-flex gap-2 flex-wrap mt-4">
                <Link href="/lise/test" className="btn btn-dark rounded-pill px-4">
                  Teste Başla
                </Link>
                <Link href="/lise/meslekler" className="btn btn-outline-dark rounded-pill px-4">
                  Meslekleri İncele
                </Link>
              </div>
            </div>
            <div className="glass-panel">
              <div className="d-grid gap-3">
                <div className="module-card">
                  <div className="pill mb-3">1. Test</div>
                  <div className="fw-bold mb-2">Çalışma yönünü bul</div>
                  <p className="muted-text mb-0">Teknik, hizmet, üretim ve ticaret eğilimlerini hızlıca toplar.</p>
                </div>
                <div className="module-card">
                  <div className="pill mb-3">2. Sonuçlar</div>
                  <div className="fw-bold mb-2">Basit sonuç özeti</div>
                  <p className="muted-text mb-0">Canlı demo için hafif sonuç görünümü hazır.</p>
                </div>
                <div className="module-card">
                  <div className="pill mb-3">3. Meslekler</div>
                  <div className="fw-bold mb-2">Keşif ekranı</div>
                  <p className="muted-text mb-0">Lise düzeyi meslek kayıtlarını filtreleyebilirsin.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
