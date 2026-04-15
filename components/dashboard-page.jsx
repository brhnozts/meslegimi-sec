import { getProjectSnapshot } from "@/lib/project-data";
import { getSupabaseHealth } from "@/lib/supabase";
import { SiteNav } from "./site-nav";

export async function DashboardPage() {
  const [snapshot, supabaseHealth] = await Promise.all([getProjectSnapshot(), getSupabaseHealth()]);

  return (
    <>
      <SiteNav moduleKey="dashboard" activePage="home" />
      <section className="hero-section">
        <div className="container">
          <div className="dashboard-hero">
            <div className="glass-panel">
              <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                <span className="eyebrow">Kontrol Merkezi</span>
                <span className={`pill ${supabaseHealth.connected ? "text-success" : "text-warning"}`}>
                  <span
                    className="d-inline-block rounded-circle"
                    style={{
                      width: "10px",
                      height: "10px",
                      background: supabaseHealth.connected ? "#16a34a" : "#f59e0b"
                    }}
                  />
                  {supabaseHealth.connected ? "Bağlantı aktif" : supabaseHealth.configured ? "Bağlantı kontrol ediliyor" : "Bağlantı bekleniyor"}
                </span>
              </div>
              <h1 className="display-title">
                <span className="grad-text">Proje yönetimi</span> ve veri takibi için dashboard
              </h1>
              <p className="lead-text">
                Yerelde kurulum takılsa bile Vercel build alabilecek şekilde hazırlandı. Supabase bağlantısı ortam değişkenlerinden okunur.
              </p>
            </div>
            <div className="glass-panel">
              <div className={`dashboard-status ${supabaseHealth.connected ? "is-good" : "is-warn"}`}>
                <div className="dashboard-status-label">Supabase Durumu</div>
                <div className="dashboard-status-value">
                  {supabaseHealth.connected ? "Hazır" : supabaseHealth.configured ? "Kontrol Edildi" : "Anahtar Bekleniyor"}
                </div>
                <div className="mb-3">
                  <span className="score-badge">
                    {supabaseHealth.connected ? "Online" : supabaseHealth.configured ? "Kısmi" : "Boş"}
                  </span>
                </div>
                <p className="muted-text mb-0">{supabaseHealth.message}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space pt-0">
        <div className="container">
          <div className="dashboard-grid">
            <MetricCard label="Toplam Meslek Kaydı" value={snapshot.totalCareerCount} text="İki akıştaki tüm kayıtlar" />
            <MetricCard
              label="Üniversite Modülü"
              value={snapshot.universityCareerCount}
              text={`${snapshot.universityGroupCount} ana grup, ${snapshot.universityMetaCount} meta kayıt`}
            />
            <MetricCard
              label="Lise Modülü"
              value={snapshot.liseCareerCount}
              text={`${snapshot.liseGroupCount} ana grup, ${snapshot.liseMetaCount} meta kayıt`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function MetricCard({ label, value, text }) {
  return (
    <div className="detail-card">
      <div className="dashboard-card-label">{label}</div>
      <div className="dashboard-metric">{value}</div>
      <div className="muted-text">{text}</div>
    </div>
  );
}
