import "server-only";

import { promises as fs } from "fs";
import path from "path";

function splitList(value) {
  if (!value) return [];
  return String(value)
    .split(/\||;|,|•|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(text) {
  return String(text || "")
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function readJson(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function getUniversityCareers() {
  const rows = await readJson(path.join("meslek_universite", "meslekler.json"));
  return rows.map((row, index) => ({
    id: `career-${index}-${slugify(row["Meslek"])}`,
    title: row["Meslek"] || "Meslek",
    group: row["Ana Grup"] || "Belirtilmedi",
    subGroup: row["Alt Grup"] || "Belirtilmedi",
    description: row["Tanım"] || "",
    short: row["Kısa Açıklama"] || "",
    skills: splitList(row["Gerekli Özellikler"]),
    programs: splitList(row["Örnek Bölüm/Program"]),
    universities: splitList(row["Örnek Üniversiteler"]),
    workAreas: splitList(row["Çalışma Alanları"])
  }));
}

export async function getLiseCareers() {
  const rows = await readJson(path.join("meslek_lise", "meslekler_lise.json"));
  return rows.map((row, index) => ({
    id: `career-${index}-${slugify(row["Meslek"])}`,
    title: row["Meslek"] || "Meslek",
    group: row["Ana Grup"] || "Belirtilmedi",
    subGroup: row["Alt Grup"] || "Belirtilmedi",
    description: row["Tanım"] || "",
    short: row["Kısa Açıklama"] || "",
    skills: splitList(row["Gerekli Özellikler"]),
    workAreas: splitList(row["Çalışma Alanları"])
  }));
}

export async function getProjectSnapshot() {
  const [universiteCareers, liseCareers, universiteMeta, liseMeta] = await Promise.all([
    readJson(path.join("meslek_universite", "meslekler.json")),
    readJson(path.join("meslek_lise", "meslekler_lise.json")),
    readJson(path.join("meslek_universite", "meslek_universite.json")),
    readJson(path.join("meslek_lise", "meslek_lise_meb.json"))
  ]);

  return {
    universityCareerCount: universiteCareers.length,
    liseCareerCount: liseCareers.length,
    universityMetaCount: universiteMeta.length,
    liseMetaCount: liseMeta.length,
    totalCareerCount: universiteCareers.length + liseCareers.length,
    universityGroupCount: new Set(universiteCareers.map((item) => item["Ana Grup"]).filter(Boolean)).size,
    liseGroupCount: new Set(liseCareers.map((item) => item["Ana Grup"]).filter(Boolean)).size
  };
}
