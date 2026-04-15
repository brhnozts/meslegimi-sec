import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { getLiseCareers } from "@/lib/project-data";

export default async function LiseResultsPage() {
  const careers = await getLiseCareers();
  const topCareers = careers.slice(0, 6);

  return (
    <>
      <SiteNav moduleKey="lise" activePage="results" />
      <section className="section-space">
        <div className="container">
          <div className="page-grid">
            <div className="glass-panel">
              <h1 className="section-title">Örnek Sonuç Görünümü</h1>
              <p className="section-text">
                Bu ilk Next sürümü canlı test için optimize edildi. Gelişmiş puanlama ve kullanıcı kaydı Supabase tablolarıyla sonraki adımda bağlanacak.
              </p>
              <div className="soft-block">
                <strong className="d-block mb-2">Hazır olan temel</strong>
                <ul className="list-clean mb-0">
                  <li>Vercel’de build alabilecek App Router sayfaları</li>
                  <li>Sunucudan okunan meslek verisi</li>
                  <li>Dashboard ile ortak veri ve Supabase katmanı</li>
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
                      <Link href="/lise/meslekler" className="btn btn-outline-dark btn-sm rounded-pill">
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
