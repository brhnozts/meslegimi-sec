# Supabase Kurulum Notu

`js/supabase-config.js` dosyasındaki alanları doldur:

```js
export const supabaseConfig = {
  url: "https://YOUR_PROJECT.supabase.co",
  publishableKey: "YOUR_SUPABASE_PUBLISHABLE_KEY",
  schema: "public"
};
```

Anahtarlar eklendikten sonra sıradaki adımlar:

1. Dashboard üzerinde gerçek tablo sorgularını bağlamak
2. İçerik yönetimi için CRUD ekranları eklemek
3. Supabase tarafında RLS politikalarını açmak
4. Admin ve public erişimleri ayırmak

Notlar:

- `publishableKey` gizli değildir ama tek başına yeterli koruma sağlamaz. Güvenlik için asıl kritik katman `RLS policy` tarafıdır.
- Supabase proje adresin geldikten sonra CSP içindeki `connect-src` kuralına o alan adını da eklememiz gerekir.
