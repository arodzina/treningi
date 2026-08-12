# Podsumowanie zmian — Żywienie & PythonAnywhere

## 1. Strategia żywieniowa (Rekompozycja: ↑ Mięśnie, bilans ✓)
- **Co mówi nauka (2024–2026)?**
  - Rotacja kalorii (*calorie cycling*) nie daje „magiczej przewagi metabolicznej” ponad stałą tygodniową pulę kalorii, ale **daje realne korzyści w praktyce**: daje lepszą energię na treningach (w tym biegi i siła), ułatwia regenerację i ułatwia trzymanie diety w dni odpoczynku.
- **Wdrożony model (Rekompozycja):**
  - **Dni treningowe (Wt, Śr, Cz, Pt, Ndz):** Zapotrzebowanie bazowe (BMR × aktywność) + spalone w treningu + **lekki surplus +100 kcal** (stymulacja syntezy białek mięśniowych bez odkładania tłuszczu).
  - **Dni odpoczynku (Pon, Sob):** Zapotrzebowanie bazowe (bilans neutralny / zero kaloryczne).
  - **Cel białka:** **140 g / dobę** (2 g / kg przy Twojej wadze 70 kg) — kluczowe do budowania mięśni i regeneracji.

---

## 2. Nowości w aplikacji
1. **Nawigacja po dniach w sekcji posiłków (← / ▶ / „Dziś”):**
   - Możesz cofać się do dowolnego poprzedniego dnia, wpisywać zjedzone posiłki lub sprawdzać historyczne spożycie oraz bilans kalorii i białka.
2. **Cel Rekompozycja i pasek białka:**
   - W profilu żywieniowym pojawił się cel: `Rekompozycja (↑ mięśnie, bilans ✓)`.
   - Aplikacja automatycznie rozpoznaje, czy w wybranym dniu odbył się trening i dostosowuje cel.
   - Pasek postępu białka wyraźnie pokazuje, ile zjadłaś i ile brakuje do 140 g.
3. **Zaktualizowana sekcja „🥤 Protokół żywieniowy” na zakładce Plan:**
   - Tabela rekomendowanych kalorii i makroskładników w podziale na dni siłowe, biegowe, long run i dni odpoczynku.

---

## 3. Pliki do wdrożenia na PythonAnywhere
Została przygotowana i zaktualizowana paczka plików:
- `treningi-update-pythonanywhere.zip` (zawiera `index.html`, `app.js`, `style.css`, `serve.py`, `wsgi.py`)
- Katalog `treningi-update-pythonanywhere/`

### Instrukcja aktualizacji na PythonAnywhere:
1. Wejdź na [PythonAnywhere](https://www.pythonanywhere.com) i przejdź do zakładki **Files**.
2. Wgraj plik `treningi-update-pythonanywhere.zip`.
3. W konsoli Bash na PythonAnywhere rozpakuj plik:
   ```bash
   unzip -o treningi-update-pythonanywhere.zip -d mysite/
   ```
4. Przejdź do zakładki **Web** i kliknij przycisk **Reload**.
