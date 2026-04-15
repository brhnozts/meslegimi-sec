import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { getUniversityCareers } from "@/lib/project-data";

export default async function UniversityResultsPage() {
  const careers = await getUniversityCareers();
  const topCareers = careers.slice(0, 6);

  return (
    <>
      <SiteNav moduleKey="universite" activePage="results" />
      <section className="section-space">
        <div className="container">
          <div className="page-grid">
            <div className="glass-panel">
              <h1 className="section-title">Örnek Sonuç Görünümü</h1>
              <p className="section-text">
                Bu Next geçişinde sonuç ekranını sade ama canlıya çıkabilir bir hale getirdik. Kişiselleştirilmiş skor kayıtlarını Supabase’e bağlayınca daha gelişmiş olacak.
              </p>
              <div className="soft-block">
                <strong className="d-block mb-2">Şimdilik ne hazır?</strong>
                <ul className="list-clean mb-0">
                  <li>Sonuç ekranı Vercel uyumlu</li>
                  <li>Meslek verisi sunucu tarafında okunuyor</li>
                  <li>Dashboard ile aynı veri omurgasını kullanıyor</li>
                </ul>
              </div>
            </div>
            <div className="glass-panel">
              <h2 className="section-title">Öne Çıkan Meslekler</h2>
              <div className="row g-3">
                {topCareers.map((career) => (
                  <div className="col-md-6" key={career.id}>
                    <div className="result-card h-100">
                      <strong>{career.title}</strong>
                      <div className="muted-text mt-2">
                        {career.group} • {career.subGroup}
                      </div>
                      <p className="muted-text mt-3 mb-3">{career.short}</p>
                      <Link href="/universite/meslekler" className="btn btn-outline-dark btn-sm rounded-pill">
                        Meslek sayfasına git
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
