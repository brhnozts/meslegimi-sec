import "../css/base-theme.css";

export const metadata = {
  title: "Mesleğimi Seç",
  description: "Next.js ve Supabase tabanlı meslek keşif ve yönetim platformu"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
