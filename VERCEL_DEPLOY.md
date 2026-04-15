# Vercel Canlıya Alma

Okul bilgisayarında kurulum doğrulaması atlanmış olabilir; bu normal. Bu yapı Vercel'in kendi build ortamında kurulacak şekilde hazırlandı.

## Vercel ayarları

Framework:
- `Next.js`

Build komutu:
- `npm run build`

Install komutu:
- `npm install`

## Environment Variables

Vercel proje ayarlarına şunları ekle:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## İlk canlı test

Canlıya çıktıktan sonra kontrol et:

1. `/`
2. `/dashboard`
3. `/universite`
4. `/lise`

## Sonraki adım

Evde daha rahat ağ ortamında:

1. Yerelde `npm install`
2. `npm run dev`
3. Supabase tabloları ve CRUD ekranları
4. Test sonuçlarını veritabanına yazma
