import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export default function UniversityHomePage() {
  return (
    <>
      <SiteNav moduleKey="universite" activePage="home" />
      <section className="hero-section">
        <div className="container">
          <div className="page-grid">
            <div className="glass-panel">
              <span className="eyebrow mb-3">Üniversite ve sonrası için rehber</span>
              <h1 className="display-title">
                <span className="grad-text">Üniversite yolunu</span> daha net ekranlarla planla
              </h1>
              <p className="lead-text">
                Bu bölümde test, sonuçlar ve meslek keşfi ayrı sayfalara ayrıldı. Next.js sürümünde önce temel öğrenci akışı hazır; veri yönetimini dashboard’dan büyüteceğiz.
              </p>
              <div className="d-flex gap-2 flex-wrap mt-4">
                <Link href="/universite/test" className="btn btn-dark rounded-pill px-4">
                  Teste Başla
                </Link>
                <Link href="/universite/meslekler" className="btn btn-outline-dark rounded-pill px-4">
                  Meslekleri İncele
                </Link>
              </div>
            </div>
            <div className="glass-panel">
              <div className="d-grid gap-3">
                <div className="module-card">
                  <div className="pill mb-3">1. Test</div>
                  <div className="fw-bold mb-2">İlgi yönünü belirle</div>
                  <p className="muted-text mb-0">Sayısal, sözel, dengeli ve yaratıcı yönleri sade bir akışla toplar.</p>
                </div>
                <div className="module-card">
                  <div className="pill mb-3">2. Sonuçlar</div>
                  <div className="fw-bold mb-2">Odaklı sonuç ekranı</div>
                  <p className="muted-text mb-0">İlk Next sürümünde temel özetler hazır; daha akıllı eşleştirme sonraki iterasyonda büyütülecek.</p>
                </div>
                <div className="module-card">
                  <div className="pill mb-3">3. Meslekler</div>
                  <div className="fw-bold mb-2">Filtrelenebilir kartlar</div>
                  <p className="muted-text mb-0">Tüm JSON kayıtları App Router sayfasında taranabilir.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
