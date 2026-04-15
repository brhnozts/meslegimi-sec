import { CareerBrowser } from "@/components/career-browser";
import { SiteNav } from "@/components/site-nav";
import { getUniversityCareers } from "@/lib/project-data";

export default async function UniversityCareersPage() {
  const careers = await getUniversityCareers();

  return (
    <>
      <SiteNav moduleKey="universite" activePage="careers" />
      <CareerBrowser
        careers={careers}
        title="Üniversite Meslekleri"
        description="JSON verileri doğrudan sunucu tarafında okunur ve Next.js sayfasında filtrelenebilir şekilde sunulur."
      />
    </>
  );
}
