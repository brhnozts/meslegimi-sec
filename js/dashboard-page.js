import { loadProjectSnapshot } from "./data-service.js";
import { escapeHtml } from "./security.js";
import { getSupabaseHealth, hasSupabaseConfig } from "./supabase-client.js";

export async function renderDashboardPage() {
  const mount = document.getElementById("dashboardMount");
  if (!mount) return;

  const [snapshot, supabaseHealth] = await Promise.all([
    loadProjectSnapshot(),
    getSupabaseHealth()
  ]);

  mount.innerHTML = `
    <section class="hero-section">
      <div class="container">
        <div class="dashboard-hero">
          <div class="glass-panel">
            <span class="eyebrow mb-3">Kontrol Merkezi</span>
            <h1 class="display-title"><span class="grad-text">Proje yönetimi</span> ve veri takibi için dashboard</h1>
            <p class="lead-text">Bu ekranı Supabase geldiğinde içerik, test sonuçları, kullanıcı akışları ve veri kalite kontrolleri için yönetim paneline çevireceğiz.</p>
          </div>
          <div class="glass-panel">
            <div class="dashboard-status ${supabaseHealth.connected ? "is-good" : "is-warn"}">
              <div class="dashboard-status-label">Supabase Durumu</div>
              <div class="dashboard-status-value">${escapeHtml(supabaseHealth.connected ? "Hazır" : hasSupabaseConfig() ? "Bağlantı Sorunu" : "Anahtar Bekleniyor")}</div>
              <p class="muted-text mb-0">${escapeHtml(supabaseHealth.message)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-space pt-0">
      <div class="container">
        <div class="dashboard-grid">
          <div class="detail-card">
            <div class="dashboard-card-label">Toplam Meslek Kaydı</div>
            <div class="dashboard-metric">${escapeHtml(snapshot.totalCareerCount)}</div>
            <div class="muted-text">İki akıştaki kayıtların toplamı</div>
          </div>
          <div class="detail-card">
            <div class="dashboard-card-label">Üniversite Modülü</div>
            <div class="dashboard-metric">${escapeHtml(snapshot.universityCareerCount)}</div>
            <div class="muted-text">${escapeHtml(snapshot.universityGroupCount)} ana grup, ${escapeHtml(snapshot.universityMetaCount)} meta kayıt</div>
          </div>
          <div class="detail-card">
            <div class="dashboard-card-label">Lise Modülü</div>
            <div class="dashboard-metric">${escapeHtml(snapshot.liseCareerCount)}</div>
            <div class="muted-text">${escapeHtml(snapshot.liseGroupCount)} ana grup, ${escapeHtml(snapshot.liseMetaCount)} meta kayıt</div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-space pt-0">
      <div class="container">
        <div class="page-grid">
          <div class="glass-panel">
            <h2 class="section-title">Hazır Olan Katmanlar</h2>
            <div class="d-grid gap-3">
              ${renderChecklist([
                "Çok sayfalı yapı ve yönetilebilir navigasyon",
                "Dashboard giriş ekranı",
                "Supabase config ve client iskeleti",
                "Yerel veri snapshot servisi",
                "İleride yönetim modüllerine bağlanacak ortak başlatma noktası"
              ])}
            </div>
          </div>
          <div class="glass-panel">
            <h2 class="section-title">Supabase Gelince İlk Bağlayacaklarımız</h2>
            <div class="d-grid gap-3">
              ${renderChecklist([
                "Meslek kayıtlarını veritabanına taşıma",
                "Dashboard üzerinden CRUD ekranları",
                "RLS politikaları ile rol bazlı erişim",
                "Anon/public ve admin kullanımını ayırma",
                "İstatistikler ve test sonucu kayıtları"
              ])}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderChecklist(items) {
  return items
    .map(
      (item) => `
        <div class="soft-block dashboard-list-item">
          <div class="dashboard-list-dot"></div>
          <div>${escapeHtml(item)}</div>
        </div>
      `
    )
    .join("");
}
