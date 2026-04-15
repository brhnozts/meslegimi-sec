import { SiteNav } from "@/components/site-nav";
import { QuizPage } from "@/components/quiz-page";

const questions = [
  {
    title: "Hangi dersler sana daha eğlenceli geliyor?",
    subtitle: "En çok hoşuna giden alanı seç.",
    options: [
      { label: "Matematik ve fen", icon: "🔢" },
      { label: "Türkçe ve sosyal dersler", icon: "📚" },
      { label: "Hepsinden biraz", icon: "⚖️" },
      { label: "Resim, müzik, tasarım", icon: "🎨" }
    ]
  },
  {
    title: "Boş zamanında hangisi sana daha yakın?",
    subtitle: "Doğal olarak yöneldiğin seçeneği düşün.",
    options: [
      { label: "Kod yazmak veya problem çözmek", icon: "💻" },
      { label: "Yazmak, tartışmak, anlatmak", icon: "🗣️" },
      { label: "Plan yapmak ve düzen kurmak", icon: "🗂️" },
      { label: "Tasarım yapmak veya üretmek", icon: "✨" }
    ]
  },
  {
    title: "Nasıl bir çalışma ortamı seni daha çok çeker?",
    options: [
      { label: "Laboratuvar veya teknik ekip", icon: "🧪" },
      { label: "İnsanlarla sürekli temas", icon: "🤝" },
      { label: "Yönetim ve koordinasyon", icon: "🏢" },
      { label: "Stüdyo veya yaratıcı ekip", icon: "🖌️" }
    ]
  }
];

export default function UniversityTestPage() {
  return (
    <>
      <SiteNav moduleKey="universite" activePage="test" />
      <QuizPage
        title="Üniversite Yol Testi"
        description="Okul ağında hızlı deploy edebilmek için ilk sürümde hafifletilmiş bir test akışı kurduk."
        questions={questions}
        resultsHref="/universite/sonuclar"
      />
    </>
  );
}
