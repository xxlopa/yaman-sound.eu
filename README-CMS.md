# YAMAN SOUND — GitHub Pages + Pages CMS

Tahle verze zachovává původní vzhled webu, ale obsah je oddělený od HTML.

## Co se teď upravuje přes CMS

- **Events** → `_events/`
- **Crew** → `_crew/`
- **Sound / Releases** → `_sound_posts/`
- **Media / Videosets** → `_media_posts/`
- **Site settings** → `_data/site.yml`

Pages CMS konfigurace je v `.pages.yml`.

## Jak nasadit

1. Nahraj celý obsah této složky do repozitáře, ze kterého běží GitHub Pages.
2. GitHub → **Settings → Pages** → publishing source nastav na branch, kde je web (typicky `main`, root `/`).
3. Zkontroluj, že `CNAME` obsahuje `yaman-sound.eu`.
4. Otevři **https://app.pagescms.org/** a přihlas se přes GitHub.
5. Nainstaluj Pages CMS GitHub App jen pro YAMAN repozitář.
6. Otevři YAMAN repo v Pages CMS. `.pages.yml` se načte automaticky.

## Přidání eventu

Pages CMS → **Events → New**

Vyplň:
- title
- date + date shown on site
- venue
- flyer (Upload)
- status: Upcoming / Past
- CZ + EN card text
- CZ + EN detail
- GoOut / Facebook / Instagram
- lineup
- `Show on homepage`, pokud má být event na homepage

Klikni **Save**. Pages CMS udělá commit do GitHubu a GitHub Pages web znovu sestaví.

## Přidání Crew / Sound / Media

Funguje stejně — **New → vyplnit → Save**.

U Media se v první verzi používá YouTube embed URL, např.:
`https://www.youtube.com/embed/Kpx5cHtHu-k`

## Newsletter

Původní Netlify Function byla odstraněna, protože GitHub Pages neumí serverové funkce a způsobovala `405 Not Allowed`.

Dočasně newsletter tlačítka vedou na `newsletter.html`. Jakmile vytvoříš veřejný Brevo signup formulář, vlož jeho URL v Pages CMS:

**Site settings → Brevo public signup URL**

Potom všechna newsletter CTA automaticky začnou odkazovat na Brevo, bez úpravy HTML.

Pokud budeš chtít formulář přímo vložený do stránky (ne jen odkaz), můžeme v dalším kroku použít Brevo embed kód a zachovat YAMAN design.

## Důležité

- Složky začínající `_` jsou Jekyll collections. GitHub Pages je při buildu převede na HTML.
- Neukládej na web API klíč Breva ani jiný secret.
- Obrázky nahrané přes Pages CMS se ukládají do `assets/uploads/`.
