import { escapeAttr, escapeHtml, readJsonArray } from "./security.js";

const STORAGE_KEY = "meslegimi-sec-lise-state";

export const liseQuestions = [
  { title: "Daha çok nasıl işlerden hoşlanırsın?", options: [
    { label: "Alet, makine, tamir işleri", icon: "🛠️", scores: { teknik: 3 } },
    { label: "İnsanlara hizmet etmek", icon: "🤝", scores: { hizmet: 3 } },
    { label: "Bir şey üretmek veya hazırlamak", icon: "🏭", scores: { uretim: 3 } },
    { label: "Satış, düzen, ofis işleri", icon: "📦", scores: { ticaret: 3 } }
  ]},
  { title: "Kendini hangi konuda daha güçlü hissedersin?", options: [
    { label: "Tamir ve çözüm bulma", icon: "⚙️", scores: { teknik: 3 } },
    { label: "İletişim ve yardım", icon: "💬", scores: { hizmet: 3 } },
    { label: "El becerisi ve dikkat", icon: "✂️", scores: { uretim: 3 } },
    { label: "Takip ve düzen", icon: "🗂️", scores: { ticaret: 3 } }
  ]},
  { title: "Boş zamanda hangisi sana daha yakın?", options: [
    { label: "Elektronik veya araç kurcalamak", icon: "💻", scores: { teknik: 2 } },
    { label: "İnsanlarla ilgilenmek", icon: "🙂", scores: { hizmet: 2 } },
    { label: "Mutfak veya atölye işleri", icon: "🍞", scores: { uretim: 2 } },
    { label: "Satış veya düzenleme", icon: "🛍️", scores: { ticaret: 2 } }
  ]},
  { title: "Hangi ortamda daha rahat çalışırsın?", options: [
    { label: "Atölye veya teknik alan", icon: "🔧", scores: { teknik: 3 } },
    { label: "Müşteri veya insanlarla birlikte", icon: "🧑‍🤝‍🧑", scores: { hizmet: 3 } },
    { label: "Üretim alanı veya mutfak", icon: "🏭", scores: { uretim: 3 } },
    { label: "Mağaza, ofis, depo", icon: "🏬", scores: { ticaret: 3 } }
  ]},
  { title: "Hangisi sana daha cazip geliyor?", options: [
    { label: "Teknik sorun çözmek", icon: "🧠", scores: { teknik: 2 } },
    { label: "Müşteri memnun etmek", icon: "🌟", scores: { hizmet: 2 } },
    { label: "Somut ürün ortaya çıkarmak", icon: "📦", scores: { uretim: 2 } },
    { label: "Satış veya kayıt işleri yapmak", icon: "💳", scores: { ticaret: 2 } }
  ]},
  { title: "Ekip içinde hangi rol sana daha yakın?", options: [
    { label: "Teknik destek veren kişi", icon: "👨‍🔧", scores: { teknik: 2 } },
    { label: "Servis ve destek veren kişi", icon: "🙋", scores: { hizmet: 2 } },
    { label: "Üretim yapan kişi", icon: "🧵", scores: { uretim: 2 } },
    { label: "Düzenleyen ve takip eden kişi", icon: "📋", scores: { ticaret: 2 } }
  ]},
  { title: "Hangi derslere daha yakın hissedersin?", options: [
    { label: "Meslek dersleri ve teknik çizim", icon: "📐", scores: { teknik: 2 } },
    { label: "Türkçe, iletişim, sosyal dersler", icon: "📚", scores: { hizmet: 2 } },
    { label: "Uygulama ve atölye dersleri", icon: "🪚", scores: { uretim: 2 } },
    { label: "Matematik, muhasebe, ofis", icon: "🧮", scores: { ticaret: 2 } }
  ]},
  { title: "Nasıl bir iş hayatı istersin?", options: [
    { label: "Teknik beceriye dayalı", icon: "⚡", scores: { teknik: 3 } },
    { label: "İnsanlarla iletişimli", icon: "🫶", scores: { hizmet: 3 } },
    { label: "Üretim ve emek odaklı", icon: "🏗️", scores: { uretim: 3 } },
    { label: "Ticaret ve düzen odaklı", icon: "📊", scores: { ticaret: 3 } }
  ]},
  { title: "Hangisi seni daha çok motive eder?", options: [
    { label: "Bir cihazı çalışır hale getirmek", icon: "🔌", scores: { teknik: 2 } },
    { label: "Bir kişiyi memnun etmek", icon: "😊", scores: { hizmet: 2 } },
    { label: "Kendi emeğinle bir şey üretmek", icon: "🧱", scores: { uretim: 2 } },
    { label: "Satış veya düzen başarısı görmek", icon: "📈", scores: { ticaret: 2 } }
  ]},
  { title: "Şu an hangi yol sana daha yakın geliyor?", options: [
    { label: "Teknik bir meslek", icon: "🛠️", scores: { teknik: 3 } },
    { label: "Hizmet alanı", icon: "🤝", scores: { hizmet: 3 } },
    { label: "Üretim veya atölye alanı", icon: "🏭", scores: { uretim: 3 } },
    { label: "Satış, ofis, depo alanı", icon: "📦", scores: { ticaret: 3 } }
  ]}
];

export async function loadLiseBundle() {
  const [careersRows, mebData] = await Promise.all([
    readJsonArray("./meslekler_lise.json"),
    readJsonArray("./meslek_lise_meb.json")
  ]);

  return {
    careers: careersRows.map((row, index) => ({
      idNum: row["id"] || row["ID"] || index + 1,
      id: `career-${index}-${slugify(row["Meslek"])}`,
      title: row["Meslek"] || "Meslek",
      group: row["Ana Grup"] || "Belirtilmedi",
      subGroup: row["Alt Grup"] || "Belirtilmedi",
      who: row["Tanım"] || "",
      short: row["Kısa Açıklama"] || "",
      skills: splitList(row["Gerekli Özellikler"]),
      workAreas: splitList(row["Çalışma Alanları"]),
      icon: row["Grup İkonu"] || "✨",
      accent: "linear-gradient(135deg, #0f766e, #1d4ed8)"
    })),
    mebData
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
    scores: state.scores || null,
    rankedIds: Array.isArray(state.rankedIds) ? state.rankedIds : []
  }));
}

export function computeLiseResults(careers, answers) {
  const scores = { teknik: 0, hizmet: 0, uretim: 0, ticaret: 0 };
  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null || answerIndex === undefined) return;
    const option = liseQuestions[questionIndex].options[answerIndex];
    Object.entries(option.scores || {}).forEach(([key, value]) => {
      scores[key] += value;
    });
  });

  const main = getMainType(scores);
  const ranked = careers
    .map((career) => ({ ...career, totalScore: scoreLiseCareer(career, scores) }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return { answers, scores, main, ranked };
}

function getMainType(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (!sorted[0] || sorted[0][1] === 0) {
    return { label: "Henüz oluşmadı", text: "Önce testi tamamlayınca burada ana meslek grubun görünür." };
  }
  const map = {
    teknik: { label: "Teknik Meslekler", text: "Tamir, kurulum ve teknik beceri isteyen alanlara daha yakın görünüyorsun." },
    hizmet: { label: "Hizmet Meslekleri", text: "İnsanlarla iletişim kurulan ve destek verilen alanlar sana daha uygun görünüyor." },
    uretim: { label: "Üretim Meslekleri", text: "Bir şey üretmek, hazırlamak ve uygulamalı çalışmak seni daha çok motive ediyor." },
    ticaret: { label: "Ticaret ve Ofis Meslekleri", text: "Düzen, satış, takip ve ofis süreçleri sana daha yakın duruyor." }
  };
  return map[sorted[0][0]];
}

function scoreLiseCareer(career, scores) {
  let total = 0;
  if (career.group === "Teknik Meslekler") total += scores.teknik * 5;
  if (career.group === "Hizmet Meslekleri") total += scores.hizmet * 5;
  if (career.group === "Üretim Meslekleri") total += scores.uretim * 5;
  if (career.group === "Ticaret ve Ofis Meslekleri") total += scores.ticaret * 5;
  return total;
}

export function initLiseTestPage(careers) {
  const state = loadState();
  const answers = liseQuestions.map((_, index) => state.answers?.[index] ?? null);
  let currentQuestion = Math.max(0, answers.findIndex((item) => item === null));
  if (currentQuestion === 0 && answers[0] !== null) currentQuestion = liseQuestions.length - 1;

  const questionsContainer = document.getElementById("questionsContainer");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const restartBtn = document.getElementById("restartBtn");

  function persist() {
    const results = computeLiseResults(careers, answers);
    saveState({
      answers,
      scores: results.scores,
      rankedIds: results.ranked.map((item) => item.id)
    });
  }

  function render() {
    questionsContainer.innerHTML = liseQuestions.map((question, questionIndex) => `
      <div class="question-panel" style="display:${questionIndex === currentQuestion ? "block" : "none"}">
        <div class="mb-4">
          <div class="pill mb-3">Adım ${questionIndex + 1}</div>
          <h3 class="fw-bold mb-2">${question.title}</h3>
        </div>
        <div class="row g-3">
          ${question.options.map((option, optionIndex) => `
            <div class="col-md-6">
              <div class="choice-card p-3 ${answers[questionIndex] === optionIndex ? "active" : ""}" data-q="${questionIndex}" data-o="${optionIndex}">
                <div class="choice-icon">${option.icon}</div>
                <div class="fw-bold mb-2">${option.label}</div>
                <div class="muted-text">Bu seçenek seni daha iyi anlatıyorsa seçebilirsin.</div>
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

    progressText.textContent = `${currentQuestion + 1} / ${liseQuestions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / liseQuestions.length) * 100}%`;
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === liseQuestions.length - 1 ? "Sonuçları Gör" : "İleri";
  }

  nextBtn.addEventListener("click", () => {
    if (answers[currentQuestion] === null) {
      alert("Bu adım için bir seçenek seçmen gerekiyor.");
      return;
    }
    if (currentQuestion < liseQuestions.length - 1) {
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
    const cleared = liseQuestions.map(() => null);
    saveState({ answers: cleared, scores: null, rankedIds: [] });
    window.location.reload();
  });

  render();
}

export function renderLiseResultsPage(careers) {
  const mount = document.getElementById("resultsMount");
  const state = loadState();
  const answers = liseQuestions.map((_, index) => state.answers?.[index] ?? null);
  if (!answers.some((item) => item !== null)) {
    mount.innerHTML = `<div class="empty-state">Önce testi tamamlaman gerekiyor. <a href="./test.html" class="fw-bold">Test sayfasına geç</a>.</div>`;
    return;
  }

  const results = computeLiseResults(careers, answers);
  saveState({ ...state, answers, scores: results.scores, rankedIds: results.ranked.map((item) => item.id) });

  mount.innerHTML = `
    <section class="section-space pt-0">
      <div class="container">
        <div class="page-grid">
          <div class="glass-panel">
            <h2 class="section-title">Sonucun</h2>
            <div class="soft-block mb-3">
              <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
                <strong>Ana grup</strong>
                <span class="score-badge">${escapeHtml(results.main.label)}</span>
              </div>
              <p class="muted-text mb-0">${escapeHtml(results.main.text)}</p>
            </div>
            <div class="soft-block">
              <strong class="d-block mb-3">Puan dağılımı</strong>
              <div class="d-grid gap-2">
                <div>Teknik: <strong>${escapeHtml(results.scores.teknik)}</strong></div>
                <div>Hizmet: <strong>${escapeHtml(results.scores.hizmet)}</strong></div>
                <div>Üretim: <strong>${escapeHtml(results.scores.uretim)}</strong></div>
                <div>Ticaret / Ofis: <strong>${escapeHtml(results.scores.ticaret)}</strong></div>
              </div>
            </div>
          </div>
          <div class="glass-panel">
            <h2 class="section-title">Öne Çıkan Meslekler</h2>
            <div class="row g-3">
              ${results.ranked.slice(0, 6).map((item) => `
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
  `;
}

export function renderLiseCareersPage(bundle) {
  const { careers, mebData } = bundle;
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
              <h2 class="section-title">Tüm Lise Düzeyi Meslekler</h2>
              <p class="section-text">Filtreleme ve detay görünümünü ayrı ekrana taşıyarak navigasyonu hafiflettik.</p>
            </div>
            <div class="pill"><span id="allCareersCount">${orderedCareers.length}</span> meslek</div>
          </div>
          <div class="soft-block mb-4">
            <div class="filter-bar">
              <div><label class="form-label fw-semibold">Arama</label><input id="careerSearchInput" type="text" class="form-control" placeholder="Meslek adı, açıklama..." /></div>
              <div><label class="form-label fw-semibold">Ana grup</label><select id="groupFilter" class="form-select"><option value="">Tümü</option></select></div>
              <div><label class="form-label fw-semibold">Alt grup</label><select id="subGroupFilter" class="form-select"><option value="">Tümü</option></select></div>
              <div class="d-flex align-items-end"><button id="clearFiltersBtn" type="button" class="btn btn-outline-dark w-100">Temizle</button></div>
            </div>
          </div>
          <div class="row g-4" id="allCareerCards"></div>
        </div>
      </div>
    </section>
    <section class="section-space pt-0">
      <div class="container"><div id="detailPages"></div></div>
    </section>
  `;

  const searchInput = document.getElementById("careerSearchInput");
  const groupFilter = document.getElementById("groupFilter");
  const subGroupFilter = document.getElementById("subGroupFilter");
  const allCareerCards = document.getElementById("allCareerCards");
  const detailPages = document.getElementById("detailPages");

  groupFilter.innerHTML += [...new Set(careers.map((item) => item.group).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")).map((item) => `<option value="${escapeAttr(item)}">${escapeHtml(item)}</option>`).join("");
  subGroupFilter.innerHTML += [...new Set(careers.map((item) => item.subGroup).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")).map((item) => `<option value="${escapeAttr(item)}">${escapeHtml(item)}</option>`).join("");

  function findMebRecord(career) {
    return mebData.find((item) => String(item.meslek_id) === String(career.idNum) || String(item.meslek).toLocaleLowerCase("tr") === String(career.title).toLocaleLowerCase("tr"));
  }

  function renderMebPaths(career) {
    const record = findMebRecord(career);
    const yollar = record?.meb_yollari || [];
    if (!yollar.length) return `<div class="muted-text">Bu meslek için MEB alan/dal eşleştirmesi bulunamadı.</div>`;
    return `<div class="d-grid gap-2">${yollar.map((item) => `
      <div class="soft-block">
        <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2">
          <strong>${escapeHtml(item.alan)}</strong>
          <span class="tag">${escapeHtml(item.oncelik)}</span>
        </div>
        <div class="mb-2"><span class="tag">🏫 ${escapeHtml(item.okul_turu || "Mesleki ve Teknik Anadolu Lisesi")}</span></div>
        <div class="text-primary fw-semibold mb-1">${escapeHtml(item.dal)}</div>
        <div class="muted-text">${escapeHtml(item.neden)}</div>
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

  function renderDetails(data) {
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
            <button class="detail-tab-btn" type="button" data-tab="lise-${escapeAttr(career.id)}">MEB Alan / Dal</button>
            <button class="detail-tab-btn" type="button" data-tab="kariyer-${escapeAttr(career.id)}">Kariyer</button>
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
              <div class="soft-block">
                <h6>Hızlı başlangıç</h6>
                <ul class="list-clean mb-0">
                  <li class="mb-2">Uygulamalı dersleri önemse.</li>
                  <li class="mb-2">Staj veya işbaşı deneyimine erken başla.</li>
                  <li class="mb-2">Mesleği küçük deneyimlerle erkenden tanı.</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="detail-tab-panel" data-panel="lise-${escapeAttr(career.id)}">
            ${renderMebPaths(career)}
          </div>
          <div class="detail-tab-panel" data-panel="kariyer-${escapeAttr(career.id)}">
            <div class="d-grid gap-2">
              <div class="soft-block"><strong>1. Lise</strong><div class="muted-text mt-2">İlgili alan/dal yoluna yönel ve uygulama derslerine ağırlık ver.</div></div>
              <div class="soft-block"><strong>2. Deneyim</strong><div class="muted-text mt-2">Staj, çıraklık veya yarı zamanlı deneyim kazan.</div></div>
              <div class="soft-block"><strong>3. Başlangıç</strong><div class="muted-text mt-2">Giriş seviyesi bir pozisyonla alana adım at.</div></div>
              <div class="soft-block"><strong>4. Gelişim</strong><div class="muted-text mt-2">Ustalık, uzmanlaşma veya kendi işini kurma seçeneklerini değerlendir.</div></div>
            </div>
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
      const haystack = [career.title, career.group, career.subGroup, career.short, career.who, ...career.skills, ...career.workAreas].join(" ").toLocaleLowerCase("tr");
      return (!search || haystack.includes(search)) && (!group || career.group === group) && (!subGroup || career.subGroup === subGroup);
    });
    renderCards(filtered);
    renderDetails(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  groupFilter.addEventListener("change", applyFilters);
  subGroupFilter.addEventListener("change", applyFilters);
  document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    searchInput.value = "";
    groupFilter.value = "";
    subGroupFilter.value = "";
    renderCards(orderedCareers);
    renderDetails(orderedCareers);
  });

  renderCards(orderedCareers);
  renderDetails(orderedCareers);
}
