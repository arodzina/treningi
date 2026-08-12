# Plan zmian — Żywienie + nawigacja po dniach

## Zmiany w app.js

### 1. Zmienny cel kaloryczny (calorie cycling)
- Detect czy dany dzień ma zalogowany trening (bieg / siła)
- Dni z treningiem: BMR×aktywność + spalone kcal + **+100 kcal surplus**
- Dni odpoczynku: BMR×aktywność (bilans neutralny)
- Nowa opcja w select `nut-goal`: "Rekompozycja (min. tłuszcz, max. mięśnie)"

### 2. Cel białka
- Stały cel: 2 g × waga kg/dzień (dla 70 kg = 140 g)
- Pasek postępu białka w sekcji wyników

### 3. Nawigacja po dniach w posiłkach
- Zmienna `foodLogDate` (domyślnie dziś)
- Przyciski ← → + wyświetlacz daty
- `renderFoodLog()` i `setupFoodForm()` korzystają z `foodLogDate`
- `calcNutrition()` też oblicza dla wybranego dnia

### 4. Protokół żywieniowy na Plan tab
- Nowa sekcja: plan dzienny z makrami

## Kolejność implementacji
1. Dodać `foodLogDate` i nawigację po dniach
2. Zmienić `todayFoodTotals()` → `dayFoodTotals(date)`
3. Dodać calorie cycling logic w `calcNutrition()`
4. Dodać cel białka
5. ZIP do PythonAnywhere
