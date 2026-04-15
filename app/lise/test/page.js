import { SiteNav } from "@/components/site-nav";
import { QuizPage } from "@/components/quiz-page";

const questions = [
  {
    title: "Daha çok nasıl işlerden hoşlanırsın?",
    options: [
      { label: "Alet, makine, tamir işleri", icon: "🛠️" },
      { label: "İnsanlara hizmet etmek", icon: "🤝" },
      { label: "Bir şey üretmek veya hazırlamak", icon: "🏭" },
      { label: "Satış, düzen, ofis işleri", icon: "📦" }
    ]
  },
  {
    title: "Hangi ortamda daha rahat çalışırsın?",
    options: [
      { label: "Atölye veya teknik alan", icon: "🔧" },
      { label: "Müşteri veya insanlarla birlikte", icon: "🧑‍🤝‍🧑" },
      { label: "Üretim alanı veya mutfak", icon: "🏭" },
      { label: "Mağaza, ofis, depo", icon: "🏬" }
    ]
  },
  {
    title: "Şu an hangi yol sana daha yakın geliyor?",
    options: [
      { label: "Teknik bir meslek", icon: "🛠️" },
      { label: "Hizmet alanı", icon: "🤝" },
      { label: "Üretim veya atölye alanı", icon: "🏭" },
      { label: "Satış, ofis, depo alanı", icon: "📦" }
    ]
  }
];

export default function LiseTestPage() {
  return (
    <>
      <SiteNav moduleKey="lise" activePage="test" />
      <QuizPage
        title="Lise Sonrası Meslek Testi"
        description="Okul ağında takılmadan deploy edebilmek için ilk sürümde hafifletilmiş bir test akışı kurduk."
        questions={questions}
        resultsHref="/lise/sonuclar"
      />
    </>
  );
}
