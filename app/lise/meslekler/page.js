import { CareerBrowser } from "@/components/career-browser";
import { SiteNav } from "@/components/site-nav";
import { getLiseCareers } from "@/lib/project-data";

export default async function LiseCareersPage() {
  const careers = await getLiseCareers();

  return (
    <>
      <SiteNav moduleKey="lise" activePage="careers" />
      <CareerBrowser
        careers={careers}
        title="Lise Sonrası Meslekler"
        description="Lise düzeyi meslek kayıtları Next.js tarafında filtrelenebilir bir keşif ekranına taşındı."
      />
    </>
  );
}
