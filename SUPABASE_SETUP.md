# Supabase Kurulum Notu

Önce ortam değişkenlerini tanımla:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://akhkkghvhuggkkhqgejv.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

`publishableKey` gizli değildir ama tek başına yeterli koruma sağlamaz. Güvenlik için esas katman `RLS policy` olacaktır.

## Önerilen Şema

Bu proje için şu üç tablo yeterli bir başlangıç sağlar:

1. `career_groups`
2. `careers`
3. `quiz_results`

`career_groups` ana/alt grup mantığını tutar.
`careers` üniversite ve lise akışındaki meslek kayıtlarını tutar.
`quiz_results` ileride kullanıcı sonuçlarını saklamak için hazırlanır.

## SQL Script

Supabase SQL Editor'e bunu tek parça halinde çalıştırabilirsin:

```sql
-- Gerekirse UUID üretimi için
create extension if not exists "pgcrypto";

-- 1) Ana grup / alt grup tablosu
create table if not exists public.career_groups (
  id uuid primary key default gen_random_uuid(),
  module text not null check (module in ('universite', 'lise')),
  group_name text not null,
  sub_group_name text,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module, group_name, sub_group_name)
);

-- 2) Meslek tablosu
create table if not exists public.careers (
  id uuid primary key default gen_random_uuid(),
  module text not null check (module in ('universite', 'lise')),
  slug text not null unique,
  title text not null,
  group_name text not null,
  sub_group_name text,
  description text,
  short_description text,
  skills text[] not null default '{}',
  programs text[] not null default '{}',
  universities text[] not null default '{}',
  work_areas text[] not null default '{}',
  meb_reference jsonb,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) Test sonuçları tablosu
create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  module text not null check (module in ('universite', 'lise')),
  session_id text,
  user_name text,
  user_email text,
  answers jsonb not null default '{}'::jsonb,
  score_summary jsonb not null default '{}'::jsonb,
  top_career_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

-- updated_at otomatik güncelleme fonksiyonu
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_career_groups_updated_at on public.career_groups;
create trigger trg_career_groups_updated_at
before update on public.career_groups
for each row execute function public.set_updated_at();

drop trigger if exists trg_careers_updated_at on public.careers;
create trigger trg_careers_updated_at
before update on public.careers
for each row execute function public.set_updated_at();

-- RLS aç
alter table public.career_groups enable row level security;
alter table public.careers enable row level security;
alter table public.quiz_results enable row level security;

-- Public okuma politikaları
drop policy if exists "Public read career_groups" on public.career_groups;
create policy "Public read career_groups"
on public.career_groups
for select
to anon, authenticated
using (true);

drop policy if exists "Public read careers" on public.careers;
create policy "Public read careers"
on public.careers
for select
to anon, authenticated
using (true);

-- Sonuç ekleme politikası
drop policy if exists "Insert quiz results" on public.quiz_results;
create policy "Insert quiz results"
on public.quiz_results
for insert
to anon, authenticated
with check (true);

-- Yönetim tarafı için başlangıçta sadece authenticated kullanıcılara tam erişim açılabilir.
drop policy if exists "Authenticated manage career_groups" on public.career_groups;
create policy "Authenticated manage career_groups"
on public.career_groups
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated manage careers" on public.careers;
create policy "Authenticated manage careers"
on public.careers
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated manage quiz_results" on public.quiz_results;
create policy "Authenticated manage quiz_results"
on public.quiz_results
for all
to authenticated
using (true)
with check (true);
```

## İlk Veri Yükleme

İstersen önce CSV/JSON’dan toplu ekleme yerine Supabase SQL ile küçük bir başlangıç seti de atabilirsin. Aşağıdaki örnek, sadece deneme amaçlı birkaç kayıt ekler:

```sql
insert into public.career_groups (module, group_name, sub_group_name, description, sort_order)
values
  ('universite', 'Sayısal', 'Mühendislik', 'Teknik ve analitik alanlar', 1),
  ('lise', 'Teknik Meslekler', 'Elektrik-Elektronik', 'Lise sonrası teknik yol', 1);

insert into public.careers (
  module, slug, title, group_name, sub_group_name, description, short_description, skills, programs, universities, work_areas, is_featured, sort_order
)
values
  (
    'universite',
    'yazilim-muhendisi',
    'Yazılım Mühendisi',
    'Sayısal',
    'Bilgisayar ve Yazılım',
    'Yazılım geliştirir, sistem tasarlar ve teknik çözümler üretir.',
    'Kod yazar, sistem kurar, ürün geliştirir.',
    array['Programlama', 'Analiz', 'Sorun çözme'],
    array['Bilgisayar Mühendisliği', 'Yazılım Mühendisliği'],
    array['İTÜ', 'ODTÜ', 'Bilkent'],
    array['Yazılım şirketleri', 'Teknoloji girişimleri', 'Ar-Ge ekipleri'],
    true,
    1
  ),
  (
    'lise',
    'elektrik-teknisyeni',
    'Elektrik Teknisyeni',
    'Teknik Meslekler',
    'Elektrik-Elektronik',
    'Elektrik sistemlerinin kurulumu, bakımı ve onarımında görev alır.',
    'Kurulum, bakım ve teknik destek.',
    array['Teknik beceri', 'Dikkat', 'El-göz koordinasyonu'],
    array['Elektrik-Elektronik Alanı'],
    array['Meslek lisesi yolları'],
    array['Bakım ekipleri', 'Sanayi tesisleri', 'Servis noktaları'],
    true,
    1
  );
```

## Sonraki Adım

İlk canlı sürümden sonra şu iki şeyi bağlayacağız:

1. Dashboard üzerinden `careers` ve `career_groups` CRUD ekranları
2. `quiz_results` içine test sonuçlarını yazma

## Not

`auth/v1/settings` isteği bu proje için çalışıyor, yani URL ve publishable key doğru görünüyor. Yeni alan adı kullanırsan hem bu dosyadaki env değerlerini hem de Vercel ortam değişkenlerini güncelle.
