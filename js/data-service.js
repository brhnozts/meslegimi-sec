import { readJsonArray } from "./security.js";

export async function loadProjectSnapshot() {
  const [universityCareers, liseCareers, universityMeta, liseMeta] = await Promise.all([
    readJsonArray("./meslek_universite/meslekler.json"),
    readJsonArray("./meslek_lise/meslekler_lise.json"),
    readJsonArray("./meslek_universite/meslek_universite.json"),
    readJsonArray("./meslek_lise/meslek_lise_meb.json")
  ]);

  const universityGroups = new Set(universityCareers.map((item) => item["Ana Grup"]).filter(Boolean));
  const liseGroups = new Set(liseCareers.map((item) => item["Ana Grup"]).filter(Boolean));

  return {
    universityCareerCount: universityCareers.length,
    liseCareerCount: liseCareers.length,
    universityMetaCount: universityMeta.length,
    liseMetaCount: liseMeta.length,
    universityGroupCount: universityGroups.size,
    liseGroupCount: liseGroups.size,
    totalCareerCount: universityCareers.length + liseCareers.length
  };
}
