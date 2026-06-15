YAMAN Decap CMS setup
=====================

Co je hotové v tomto ZIPu:
- /admin webová administrace Decap CMS
- admin/config.yml nastavené na repo xxlopa/yaman-sound.eu
- content/sound.json, content/events.json, content/media.json
- Sound / Events / Media stránky načítají dlaždice automaticky z content/*.json
- upload obrázků přes CMS do assets/img/uploads
- původní .git a __MACOSX soubory nejsou součástí výstupního ZIPu

Jak nasadit:
1) Rozbal ZIP.
2) Obsah složky yaman-sound.eu nahraj přes GitHub Desktop do svého repo xxlopa/yaman-sound.eu.
3) Commit + Push.
4) Otevři https://yaman-sound.eu/admin/

Důležité:
GitHub Pages neumí sám zpracovat OAuth login pro Decap CMS.
Admin UI se načte, ale publikování do GitHubu začne fungovat až po nastavení OAuth proxy/auth backendu.

Bezpečnost:
- přístup půjde přes GitHub účet
- zapni 2FA na GitHubu
- právo publikovat bude mít jen GitHub účet s právem zapisovat do repo

Obsah:
- Sound se upravuje v content/sound.json
- Events se upravuje v content/events.json
- Media se upravuje v content/media.json

Pokud se Decap nepřihlásí, není chyba v dlaždicích ani ve webu, ale chybí OAuth proxy pro GitHub Pages.
