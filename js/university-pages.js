import { escapeAttr, escapeHtml, readJsonArray } from "./security.js";

const STORAGE_KEY = "meslegimi-sec-universite-state";

export const universityQuestions = [
  {
    title: "Hangi dersler sana daha eğlenceli geliyor?",
    subtitle: "En çok hoşuna giden alanı seç.",
    options: [
      { label: "Matematik ve fen", icon: "🔢", scores: { sayisal: 3 } },
      { label: "Türkçe ve sosyal dersler", icon: "📚", scores: { sozel: 3 } },
      { label: "Hepsinden biraz", icon: "⚖️", scores: { dengeli: 3 } },
      { label: "Resim, müzik, tasarım", icon: "🎨", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Boş zamanında hangisi sana daha yakın?",
    subtitle: "Doğal olarak yöneldiğin seçeneği düşün.",
    options: [
      { label: "Kod yazmak veya problem çözmek", icon: "💻", scores: { sayisal: 3 } },
      { label: "Yazmak, tartışmak, anlatmak", icon: "🗣️", scores: { sozel: 3 } },
      { label: "Plan yapmak ve düzen kurmak", icon: "🗂️", scores: { dengeli: 3 } },
      { label: "Tasarım yapmak veya üretmek", icon: "✨", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Kendini en güçlü hangi konuda hissediyorsun?",
    subtitle: "Becerine en yakın olanı seç.",
    options: [
      { label: "Analiz ve hesaplama", icon: "📐", scores: { sayisal: 3 } },
      { label: "Konuşma ve ikna", icon: "🎤", scores: { sozel: 3 } },
      { label: "Organizasyon ve denge", icon: "📊", scores: { dengeli: 3 } },
      { label: "Hayal kurma ve tasarım", icon: "🧩", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Nasıl bir çalışma ortamı seni daha çok çeker?",
    subtitle: "Gününün çoğunu geçirmek isteyeceğin yer.",
    options: [
      { label: "Laboratuvar veya teknik ekip", icon: "🧪", scores: { sayisal: 3 } },
      { label: "İnsanlarla sürekli temas", icon: "🤝", scores: { sozel: 3 } },
      { label: "Yönetim, planlama, koordinasyon", icon: "🏢", scores: { dengeli: 3 } },
      { label: "Stüdyo veya yaratıcı ekip", icon: "🖌️", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Bir proje geldiğinde önce neye odaklanırsın?",
    subtitle: "Doğal refleksine yakın olanı seç.",
    options: [
      { label: "Mantığını ve sistemini kurmaya", icon: "⚙️", scores: { sayisal: 3 } },
      { label: "İnsanlara nasıl anlatılacağına", icon: "📝", scores: { sozel: 3 } },
      { label: "Takvime ve iş akışına", icon: "🗓️", scores: { dengeli: 3 } },
      { label: "Görünümüne ve deneyimine", icon: "🌈", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Hangi hedef seni daha çok motive eder?",
    subtitle: "Uzun vadede seni heyecanlandıranı seç.",
    options: [
      { label: "Bir sorunu bilimsel biçimde çözmek", icon: "🔬", scores: { sayisal: 3 } },
      { label: "İnsanlara rehberlik etmek", icon: "🧑‍🏫", scores: { sozel: 3 } },
      { label: "Sistem kurup sonuç almak", icon: "📈", scores: { dengeli: 3 } },
      { label: "Özgün bir iş ortaya koymak", icon: "🎬", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Bir ekipte hangi role daha yakınsın?",
    subtitle: "İnsanların senden beklediği rolü düşün.",
    options: [
      { label: "Teknik çözüm üreten kişi", icon: "🛠️", scores: { sayisal: 3 } },
      { label: "Anlatan ve birleştiren kişi", icon: "🗨️", scores: { sozel: 3 } },
      { label: "Planlayan ve yöneten kişi", icon: "🧭", scores: { dengeli: 3 } },
      { label: "Fikri ve estetiği oluşturan kişi", icon: "🎭", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Hangi alan sana daha anlamlı geliyor?",
    subtitle: "Kendini yakın hissettiğin yönü seç.",
    options: [
      { label: "Teknoloji, sağlık, mühendislik", icon: "🏗️", scores: { sayisal: 3 } },
      { label: "Hukuk, psikoloji, eğitim", icon: "⚖️", scores: { sozel: 3 } },
      { label: "İşletme, ekonomi, yönetim", icon: "💼", scores: { dengeli: 3 } },
      { label: "Mimarlık, medya, tasarım", icon: "🏛️", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Hangi cümle seni daha iyi anlatıyor?",
    subtitle: "Sana en yakın hissedilen seçeneği seç.",
    options: [
      { label: "Zor sorular beni motive eder", icon: "🧠", scores: { sayisal: 3 } },
      { label: "İnsanları anlamayı severim", icon: "💬", scores: { sozel: 3 } },
      { label: "Düzen ve denge beni rahatlatır", icon: "🔄", scores: { dengeli: 3 } },
      { label: "Yeni fikir üretmekten hoşlanırım", icon: "💡", scores: { yaratici: 3 } }
    ]
  },
  {
    title: "Bugün bir yol seçsen hangisine daha yakın hissedersin?",
    subtitle: "Şu anki önceliğini işaretle.",
    options: [
      { label: "Analitik ve teknik bir bölüm", icon: "📡", scores: { sayisal: 3 } },
      { label: "İnsan ve toplum odaklı bir bölüm", icon: "🌍", scores: { sozel: 3 } },
      { label: "Yönetim ve denge isteyen bir bölüm", icon: "📍", scores: { dengeli: 3 } },
      { label: "Yaratıcı üretim isteyen bir bölüm", icon: "🎯", scores: { yaratici: 3 } }
    ]
  }
];

export async function loadUniversityBundle() {
  const [careersRows, universityMeta, liseMeta] = await Promise.all([
    readJsonArray("./meslekler.json"),
    readJsonArray("./meslek_universite.json"),
    readJsonArray("./meslek_lise_resmi.json")
  ]);

  return {
    careers: careersRows.map(normalizeCareerRow),
    universityMeta,
    liseMeta
  };
}

function normalizeCareerRow(row, index) {
  return {
    id: `career-${index}-${slugify(row["Meslek"])}`,
    meslekId: row["ID"] || row["id"] || row["Meslek ID"] || index + 1,
    title: row["Meslek"] || "Meslek",
    group: row["Ana Grup"] || "Belirtilmedi",
    subGroup: row["Alt Grup"] || "Belirtilmedi",
    who: row["Tanım"] || "",
    short: row["Kısa Açıklama"] || "",
    skills: splitList(row["Gerekli Özellikler"]),
    subjects: splitList(row["Örnek Bölüm/Program"]),
    universities: splitList(row["Örnek Üniversiteler"]),
    workAreas: splitList(row["Çalışma Alanları"]),
    accent: getAccent(row["Ana Grup"] || ""),
    icon: getIcon(row["Ana Grup"] || "")
  };
}

function splitList(value) {
  if (!value) return [];
  return String(value).split(/\||;|,|•|\n/).map((item) => item.trim()).filter(Boolean);
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

function getAccent(group) {
  const map = {
    Sayısal: "linear-gradient(135deg, #1d4ed8, #2563eb)",
    Sözel: "linear-gradient(135deg, #0f766e, #14b8a6)",
    "Eşit Ağırlık": "linear-gradient(135deg, #9333ea, #c084fc)",
    Dengeli: "linear-gradient(135deg, #9333ea, #c084fc)",
    Yaratıcı: "linear-gradient(135deg, #ea580c, #f59e0b)"
  };
  return map[group] || "linear-gradient(135deg, #334155, #64748b)";
}

function getIcon(group) {
  const map = {
    Sayısal: "🔬",
    Sözel: "🗣️",
    "Eşit Ağırlık": "📊",
    Dengeli: "📊",
    Yaratıcı: "🎨"
  };
  return map[group] || "✨";
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    answers: Array.isArray(state.answers) ? state.answers : [],
    groups: state.groups || null,
    rankedIds: Array.isArray(state.rankedIds) ? state.rankedIds : []
  }));
}

export function computeUniversityResults(careers, answers) {
  const groups = { sayisal: 0, sozel: 0, dengeli: 0, yaratici: 0 };
  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null || answerIndex === undefined) return;
    const option = universityQuestions[questionIndex].options[answerIndex];
    Object.entries(option.scores || {}).forEach(([key, value]) => {
      groups[key] += value;
    });
  });

  const mainType = getMainType(groups);
  const ranked = careers
    .map((career) => ({
      ...career,
      totalScore: scoreUniversityCareer(career, groups),
      reason: `${mainType.label} eğilimin ile ${career.group} grubunun yakınlığı bu mesleği öne çıkarıyor.`
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return { answers, groups, mainType, ranked };
}

function getMainType(groups) {
  const sorted = Object.entries(groups).sort((a, b) => b[1] - a[1]);
  if (!sorted[0] || sorted[0][1] === 0) {
    return { label: "Henüz oluşmadı", text: "Önce testi tamamlayınca burada ana eğilim görünür." };
  }
  const [topKey, topValue] = sorted[0];
  const secondValue = sorted[1]?.[1] || 0;
  if (topValue - secondValue <= 1) {
    return { label: "Dengeli", text: "Birden fazla alan birlikte öne çıkıyor; bu da sana daha esnek bir bölüm havuzu verir." };
  }
  const map = {
    sayisal: { label: "Sayısal", text: "Analitik, teknik ve bilim odaklı bölümlere daha yakın görünüyorsun." },
    sozel: { label: "Sözel", text: "İnsan, iletişim ve anlatım ağırlıklı alanlar sana daha uygun görünüyor." },
    dengeli: { label: "Dengeli", text: "Planlama, yönetim ve çok yönlü alanlarda güçlüsün." },
    yaratici: { label: "Yaratıcı", text: "Tasarım, medya ve özgün üretim isteyen bölümlerde parlayabilirsin." }
  };
  return map[topKey];
}

function scoreUniversityCareer(career, groups) {
  const groupScores = {
    Sayısal: groups.sayisal,
    Sözel: groups.sozel,
    Dengeli: groups.dengeli,
    "Eşit Ağırlık": groups.dengeli,
    Yaratıcı: groups.yaratici
  };
  return (groupScores[career.group] || 0) * 5;
}

export function initUniversityTestPage(careers) {
  const state = loadState();
  const answers = universityQuestions.map((_, index) => state.answers?.[index] ?? null);
  let currentQuestion = Math.max(0, answers.findIndex((item) => item === null));
  if (currentQuestion === 0 && answers[0] !== null) currentQuestion = universityQuestions.length - 1;

  const questionsContainer = document.getElementById("questionsContainer");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const restartBtn = document.getElementById("restartBtn");

  function persist() {
    const results = computeUniversityResults(careers, answers);
    saveState({
      answers,
      groups: results.groups,
      rankedIds: results.ranked.map((item) => item.id)
    });
  }

  function render() {
    questionsContainer.innerHTML = universityQuestions.map((question, questionIndex) => `
      <div class="question-panel" style="display:${questionIndex === currentQuestion ? "block" : "none"}">
        <div class="mb-4">
          <div class="pill mb-3">Adım ${questionIndex + 1}</div>
          <h3 class="fw-bold mb-2">${question.title}</h3>
          <p class="muted-text mb-0">${question.subtitle}</p>
        </div>
        <div class="row g-3">
          ${question.options.map((option, optionIndex) => `
            <div class="col-md-6">
              <div class="choice-card p-3 ${answers[questionIndex] === optionIndex ? "active" : ""}" data-q="${questionIndex}" data-o="${optionIndex}">
                <div class="choice-icon">${option.icon}</div>
                <div class="fw-bold mb-2">${option.label}</div>
                <div class="muted-text">Bu seçenek sana daha yakınsa seçebilirsin.</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

    questionsContainer.querySelectorAll(".choice-card").forEach((card) => {
      card.addEventListener("click", () => {
        answers[Number(card.dataset.q)] = Number(card.dataset.o);
        persist();
        render();
      });
    });

    progressText.textContent = `${currentQuestion + 1} / ${universityQuestions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / universityQuestions.length) * 100}%`;
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === universityQuestions.length - 1 ? "Sonuçları Gör" : "İleri";
  }

  nextBtn.addEventListener("click", () => {
    if (answers[currentQuestion] === null) {
      alert("Bu adım için bir seçenek seçmen gerekiyor.");
      return;
    }
    if (currentQuestion < universityQuestions.length - 1) {
      currentQuestion += 1;
      render();
      return;
    }
    persist();
    window.location.href = "./sonuclar.html";
  });

  prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion -= 1;
      render();
    }
  });

  restartBtn.addEventListener("click", () => {
    const cleared = universityQuestions.map(() => null);
    saveState({ answers: cleared, groups: null, rankedIds: [] });
    window.location.reload();
  });

  render();
}

export function renderUniversityResultsPage(careers) {
  const mount = document.getElementById("resultsMount");
  const state = loadState();
  const answers = universityQuestions.map((_, index) => state.answers?.[index] ?? null);
  if (!answers.some((item) => item !== null)) {
    mount.innerHTML = `<div class="empty-state">Önce testi tamamlaman gerekiyor. <a href="./test.html" class="fw-bold">Test sayfasına geç</a>.</div>`;
    return;
  }

  const results = computeUniversityResults(careers, answers);
  saveState({ ...state, answers, groups: results.groups, rankedIds: results.ranked.map((item) => item.id) });

  const top = results.ranked.slice(0, 6);
  const grouped = results.ranked.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  mount.innerHTML = `
    <section class="section-space pt-0">
      <div class="container">
        <div class="page-grid">
          <div class="glass-panel">
            <h2 class="section-title">Mesleki Eğilimin</h2>
            <div class="soft-block mb-3">
              <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
                <strong>Ana yatkınlık</strong>
                <span class="score-badge">${escapeHtml(results.mainType.label)}</span>
              </div>
              <p class="muted-text mb-0">${escapeHtml(results.mainType.text)}</p>
            </div>
            <div class="soft-block">
              <strong class="d-block mb-3">Puan dağılımı</strong>
              <div class="d-grid gap-2">
                <div>Sayısal: <strong>${escapeHtml(results.groups.sayisal)}</strong></div>
                <div>Sözel: <strong>${escapeHtml(results.groups.sozel)}</strong></div>
                <div>Dengeli: <strong>${escapeHtml(results.groups.dengeli)}</strong></div>
                <div>Yaratıcı: <strong>${escapeHtml(results.groups.yaratici)}</strong></div>
              </div>
            </div>
          </div>
          <div class="glass-panel">
            <h2 class="section-title">En Uygun 6 Meslek</h2>
            <div class="row g-3">
              ${top.map((item) => `
                <div class="col-md-6">
                  <div class="result-card h-100">
                    <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
                      <strong>${escapeHtml(item.icon)} ${escapeHtml(item.title)}</strong>
                      <span class="score-badge">Uyum ${escapeHtml(item.totalScore)}</span>
                    </div>
                    <div class="text-primary fw-semibold mb-2">${escapeHtml(item.group)} • ${escapeHtml(item.subGroup)}</div>
                    <p class="muted-text mb-3">${escapeHtml(item.short)}</p>
                    <a class="btn btn-outline-dark btn-sm rounded-pill" href="./meslekler.html#${escapeAttr(item.id)}">Detaylı profil</a>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-space pt-0">
      <div class="container">
        <div class="glass-panel">
          <div class="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
            <div>
              <h2 class="section-title">Grup Bazlı Sonuçlar</h2>
              <p class="section-text">Uzun tek sayfa yerine tüm sonuçları burada kategori bazlı tarayabilirsin.</p>
            </div>
            <div class="pill">${results.ranked.length} meslek tarandı</div>
          </div>
          <div class="row g-3">
            ${Object.entries(grouped).map(([groupName, items]) => `
              <div class="col-lg-6">
              <div class="detail-card h-100">
                  <div class="d-flex justify-content-between align-items-center gap-2 mb-3">
                    <strong>${escapeHtml(groupName)}</strong>
                    <span class="tag">${escapeHtml(items.length)} kayıt</span>
                  </div>
                  <div class="d-grid gap-2">
                    ${items.slice(0, 5).map((item) => `
                      <div class="soft-block">
                        <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
                          <strong>${escapeHtml(item.title)}</strong>
                          <span class="score-badge">${escapeHtml(item.totalScore)}</span>
                        </div>
                        <div class="muted-text mb-2">${escapeHtml(item.subGroup)}</div>
                        <a class="btn btn-outline-dark btn-sm rounded-pill" href="./meslekler.html#${escapeAttr(item.id)}">Meslek kartı</a>
                      </div>
                    `).join("")}
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderUniversityCareersPage(bundle) {
  const { careers, universityMeta, liseMeta } = bundle;
  const mount = document.getElementById("careersMount");
  const state = loadState();
  const rankedIds = state.rankedIds || [];
  const orderedCareers = [...careers].sort((a, b) => {
    const aIndex = rankedIds.indexOf(a.id);
    const bIndex = rankedIds.indexOf(b.id);
    if (aIndex === -1 && bIndex === -1) return a.title.localeCompare(b.title, "tr");
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  mount.innerHTML = `
    <section class="section-space pt-0">
      <div class="container">
        <div class="glass-panel">
          <div class="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
            <div>
              <h2 class="section-title">Tüm Meslekler</h2>
              <p class="section-text">Arama ve filtreleri ayrı bir sayfaya taşıdık; böylece sonuç ekranı daha kısa ve odaklı kaldı.</p>
            </div>
            <div class="pill"><span id="allCareersCount">${orderedCareers.length}</span> kart</div>
          </div>
          <div class="soft-block mb-4">
            <div class="filter-bar">
              <div>
                <label class="form-label fw-semibold">Metinsel arama</label>
                <input id="careerSearchInput" type="text" class="form-control" placeholder="Meslek adı, açıklama, beceri..." />
              </div>
              <div>
                <label class="form-label fw-semibold">Ana grup</label>
                <select id="groupFilter" class="form-select"><option value="">Tümü</option></select>
              </div>
              <div>
                <label class="form-label fw-semibold">Alt grup</label>
                <select id="subGroupFilter" class="form-select"><option value="">Tümü</option></select>
              </div>
              <div class="d-flex align-items-end">
                <button id="clearFiltersBtn" class="btn btn-outline-dark w-100" type="button">Temizle</button>
              </div>
            </div>
          </div>
          <div class="row g-4" id="allCareerCards"></div>
        </div>
      </div>
    </section>
    <section class="section-space pt-0">
      <div class="container">
        <div id="detailPages"></div>
      </div>
    </section>
  `;

  const searchInput = document.getElementById("careerSearchInput");
  const groupFilter = document.getElementById("groupFilter");
  const subGroupFilter = document.getElementById("subGroupFilter");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  const allCareerCards = document.getElementById("allCareerCards");
  const detailPages = document.getElementById("detailPages");
  const groupOptions = [...new Set(careers.map((item) => item.group).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
  const subGroupOptions = [...new Set(careers.map((item) => item.subGroup).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));

  groupFilter.innerHTML += groupOptions.map((item) => `<option value="${escapeAttr(item)}">${escapeHtml(item)}</option>`).join("");
  subGroupFilter.innerHTML += subGroupOptions.map((item) => `<option value="${escapeAttr(item)}">${escapeHtml(item)}</option>`).join("");

  function findUniversityRecord(career) {
    return universityMeta.find((item) => String(item.meslek_id) === String(career.meslekId) || String(item.meslek).toLocaleLowerCase("tr") === String(career.title).toLocaleLowerCase("tr"));
  }

  function findLiseRecord(career) {
    return liseMeta.find((item) => String(item.meslek_id) === String(career.meslekId) || String(item.meslek).toLocaleLowerCase("tr") === String(career.title).toLocaleLowerCase("tr"));
  }

  function renderProgramList(career) {
    const record = findUniversityRecord(career);
    const programs = record?.programlar || record?.lisans_programlari || career.subjects;
    const universities = record?.universiteler || career.universities;
    if (!programs.length && !universities.length) return `<div class="muted-text">Program bilgisi bulunamadı.</div>`;
    return `<div class="d-grid gap-2">${programs.slice(0, 5).map((program, index) => `
      <div class="soft-block">
        <strong>${escapeHtml(program)}</strong>
        <div class="muted-text mt-2">${escapeHtml(universities[index] || universities[0] || "Üniversite bilgisi araştırılabilir")}</div>
      </div>
    `).join("")}</div>`;
  }

  function renderLisePaths(career) {
    const record = findLiseRecord(career);
    const yollar = record?.onerilen_lise_yollari || record?.lise_alanlari || [];
    if (!yollar.length) return `<div class="muted-text">Bu meslek için lise alanı bilgisi bulunamadı.</div>`;
    return `<div class="d-grid gap-2">${yollar.map((item) => `
      <div class="soft-block">
        <strong>${escapeHtml(item.okul_turu || "Meslek Lisesi")} / ${escapeHtml(item.alan || "Alan")}</strong>
        <div class="text-primary mt-2">${escapeHtml(item.dal || "Dal belirtilmedi")}</div>
        <div class="muted-text mt-2">${escapeHtml(item.neden || "Bu yol önerilmektedir.")}</div>
      </div>
    `).join("")}</div>`;
  }

  function renderCards(data) {
    document.getElementById("allCareersCount").textContent = data.length;
    allCareerCards.innerHTML = data.map((career) => `
      <div class="col-md-6 col-xl-4">
        <div class="detail-card h-100">
          <div class="career-icon">${escapeHtml(career.icon)}</div>
          <h4 class="fw-bold mb-2">${escapeHtml(career.title)}</h4>
          <div class="muted-text mb-3">${escapeHtml(career.group)} • ${escapeHtml(career.subGroup)}</div>
          <p class="muted-text mb-3">${escapeHtml(career.short)}</p>
          <div class="mb-3">${career.skills.slice(0, 4).map((item) => `<span class="tag me-1 mb-1">${escapeHtml(item)}</span>`).join("")}</div>
          <a class="btn btn-dark rounded-pill btn-sm" href="#${escapeAttr(career.id)}">Detaylı profil</a>
        </div>
      </div>
    `).join("");
  }

  function renderDetailCards(data) {
    detailPages.innerHTML = data.map((career) => `
      <div class="detail-card mb-4" id="${escapeAttr(career.id)}">
        <div class="p-4 rounded-top" style="background:${escapeAttr(career.accent)}; color:#fff;">
          <div class="row g-3 align-items-end">
            <div class="col-lg-8">
              <div class="pill bg-white text-dark mb-3">${escapeHtml(career.group)} • ${escapeHtml(career.subGroup)}</div>
              <h2 class="fw-bold mb-2">${escapeHtml(career.icon)} ${escapeHtml(career.title)}</h2>
              <p class="mb-0 opacity-75">${escapeHtml(career.short)}</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <a href="#top" class="btn btn-light rounded-pill">Yukarı dön</a>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="detail-tabs">
            <button class="detail-tab-btn active" type="button" data-tab="genel-${escapeAttr(career.id)}">Genel Bilgi</button>
            <button class="detail-tab-btn" type="button" data-tab="egitim-${escapeAttr(career.id)}">Üniversite Yolu</button>
            <button class="detail-tab-btn" type="button" data-tab="lise-${escapeAttr(career.id)}">Lise Yolu</button>
          </div>
          <div class="detail-tab-panel active" data-panel="genel-${escapeAttr(career.id)}">
            <div class="info-grid">
              <div class="soft-block">
                <h5>Tanım</h5>
                <p class="muted-text mb-0">${escapeHtml(career.who || "Tanım bilgisi yok.")}</p>
              </div>
              <div class="soft-block">
                <h5>Nerelerde çalışabilir?</h5>
                <ul class="list-clean mb-0">${career.workAreas.map((item) => `<li class="mb-2">${escapeHtml(item)}</li>`).join("")}</ul>
              </div>
              <div class="soft-block">
                <h6>Gerekli özellikler</h6>
                <div>${career.skills.map((item) => `<span class="tag me-1 mb-1">${escapeHtml(item)}</span>`).join("")}</div>
              </div>
            </div>
          </div>
          <div class="detail-tab-panel" data-panel="egitim-${escapeAttr(career.id)}">
            ${renderProgramList(career)}
          </div>
          <div class="detail-tab-panel" data-panel="lise-${escapeAttr(career.id)}">
            ${renderLisePaths(career)}
          </div>
        </div>
      </div>
    `).join("");

    detailPages.querySelectorAll(".detail-tabs").forEach((tabWrap) => {
      const buttons = tabWrap.querySelectorAll(".detail-tab-btn");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const target = button.dataset.tab;
          buttons.forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
          tabWrap.parentElement.querySelectorAll(".detail-tab-panel").forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.panel === target);
          });
        });
      });
    });
  }

  function applyFilters() {
    const search = (searchInput.value || "").toLocaleLowerCase("tr");
    const group = groupFilter.value;
    const subGroup = subGroupFilter.value;
    const filtered = orderedCareers.filter((career) => {
      const haystack = [career.title, career.group, career.subGroup, career.short, career.who, ...career.skills, ...career.subjects, ...career.workAreas].join(" ").toLocaleLowerCase("tr");
      return (!search || haystack.includes(search)) && (!group || career.group === group) && (!subGroup || career.subGroup === subGroup);
    });
    renderCards(filtered);
    renderDetailCards(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  groupFilter.addEventListener("change", applyFilters);
  subGroupFilter.addEventListener("change", applyFilters);
  clearFiltersBtn.addEventListener("click", () => {
    searchInput.value = "";
    groupFilter.value = "";
    subGroupFilter.value = "";
    renderCards(orderedCareers);
    renderDetailCards(orderedCareers);
  });

  renderCards(orderedCareers);
  renderDetailCards(orderedCareers);
}
