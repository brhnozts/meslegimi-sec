import Image from "next/image";
import Link from "next/link";
import { getSupabaseHealth } from "@/lib/supabase";

export async function LandingPage() {
  const supabaseHealth = await getSupabaseHealth();

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top site-navbar">
        <div className="container">
          <Link className="navbar-brand site-brand" href="/">
            Mesleğimi Seç
          </Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="container">
          <div className="page-grid">
            <div className="glass-panel">
              <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                <span className="eyebrow">Canlı Önizleme</span>
                <span className={`pill ${supabaseHealth.connected ? "text-success" : "text-warning"}`}>
                  {supabaseHealth.connected ? "Veri bağlantısı açık" : supabaseHealth.configured ? "Veri bağlantısı denetleniyor" : "Veri bağlantısı bekleniyor"}
                </span>
              </div>
              <Image src="/logo1.png" alt="Mesleğimi Seç logosu" width={720} height={720} className="img-fluid rounded-5 mb-4" />
              <h1 className="display-title">
                <span className="grad-text">Mesleğimi</span> daha kısa adımlarla <span className="grad-text">keşfet</span>.
              </h1>
              <p className="lead-text">
                Bu sürüm Next.js tabanlıdır ve Vercel üzerinde canlıya alınmaya hazırdır. Öğrenci akışları korunurken dashboard ve Supabase katmanı da projeye dahil edildi.
              </p>
              <div className="feature-grid mt-4">
                <div className="soft-block text-center">
                  <strong className="d-block fs-4">2</strong>
                  <span className="muted-text">Ana kariyer yolu</span>
                </div>
                <div className="soft-block text-center">
                  <strong className="d-block fs-4">Next</strong>
                  <span className="muted-text">App Router altyapısı</span>
                </div>
                <div className="soft-block text-center">
                  <strong className="d-block fs-4">1</strong>
                  <span className="muted-text">Supabase dashboard omurgası</span>
                </div>
              </div>
              <div className="mt-4 d-flex gap-2 flex-wrap">
                <Link href="/dashboard" className="btn btn-outline-dark rounded-pill px-4">
                  Dashboard'a Git
                </Link>
                <Link href="/universite" className="btn btn-dark rounded-pill px-4">
                  Üniversite Yolu
                </Link>
              </div>
            </div>
            <div className="glass-panel">
              <div className="d-grid gap-3">
                <Link href="/universite" className="module-card text-decoration-none text-reset">
                  <div className="pill mb-3">Üniversite Yolu</div>
                  <div className="fw-bold mb-2 fs-4">Uzmanlaşmak isteyenler için</div>
                  <p className="muted-text mb-3">Test, sonuç ve meslek sayfaları daha yönetilebilir bir yapıda sunulur.</p>
                  <span className="btn btn-dark rounded-pill">Üniversite yoluna git</span>
                </Link>
                <Link href="/lise" className="module-card text-decoration-none text-reset">
                  <div className="pill mb-3">Lise Sonrası Meslek</div>
                  <div className="fw-bold mb-2 fs-4">Doğrudan iş hayatına geçmek isteyenler için</div>
                  <p className="muted-text mb-3">Meslek kartları ve yönlendirme ekranları ayrı modüllere bölündü.</p>
                  <span className="btn btn-outline-dark rounded-pill">Lise yoluna git</span>
                </Link>
                <Link href="/dashboard" className="module-card text-decoration-none text-reset">
                  <div className="pill mb-3">Yönetim ve Dashboard</div>
                  <div className="fw-bold mb-2 fs-4">Canlı veri ve içerik yönetimi için hazır panel</div>
                  <p className="muted-text mb-3">Supabase tabloları bağlandığında içerik yönetimi ve istatistikler burada yaşayacak.</p>
                  <span className="btn btn-outline-dark rounded-pill">Dashboard'u aç</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
