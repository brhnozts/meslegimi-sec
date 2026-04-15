import "../css/base-theme.css";

export const metadata = {
  title: "Mesleğimi Seç",
  description: "Next.js ve Supabase tabanlı meslek keşif ve yönetim platformu"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
