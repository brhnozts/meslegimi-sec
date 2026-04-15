import { injectShell } from "./site-shell.js";
import { renderDashboardPage } from "./dashboard-page.js";
import {
  initUniversityTestPage,
  loadUniversityBundle,
  renderUniversityResultsPage,
  renderUniversityCareersPage
} from "./university-pages.js";
import {
  initLiseTestPage,
  loadLiseBundle,
  renderLiseResultsPage,
  renderLiseCareersPage
} from "./lise-pages.js";

const moduleKey = document.body.dataset.module;
const pageKey = document.body.dataset.page;

if (moduleKey && pageKey) {
  injectShell("#shell", { moduleKey, activePage: pageKey });
}

if (moduleKey === "dashboard") {
  renderDashboardPage();
}

if (moduleKey === "universite") {
  initUniversity();
}

if (moduleKey === "lise") {
  initLise();
}

async function initUniversity() {
  if (pageKey === "home") return;
  const bundle = await loadUniversityBundle();
  if (pageKey === "test") initUniversityTestPage(bundle.careers);
  if (pageKey === "results") renderUniversityResultsPage(bundle.careers);
  if (pageKey === "careers") renderUniversityCareersPage(bundle);
}

async function initLise() {
  if (pageKey === "home") return;
  const bundle = await loadLiseBundle();
  if (pageKey === "test") initLiseTestPage(bundle.careers);
  if (pageKey === "results") renderLiseResultsPage(bundle.careers);
  if (pageKey === "careers") renderLiseCareersPage(bundle);
}
