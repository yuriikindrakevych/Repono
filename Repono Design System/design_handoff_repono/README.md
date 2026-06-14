# Handoff: Repono Design System → Drupal 11

> Передача дизайн-системи Repono у розробку. Цільовий стек — **Drupal 11**
> (кастомна тема + Single Directory Components). Документ самодостатній: розробник,
> який не був у цій розмові, може почати верстку лише за цим README.

---

## 1. Overview

**Repono** — self-hosted реєстр пакетів, де розробник продає й ліцензує власні модулі
(Drupal, WordPress, веб-застосунки) за підпискою з автооновленням. Аудиторія — розробники
й веб-агенції, які живуть у терміналі, semver, `composer.json`, git-тегах і ліцензійних
ключах.

Цей пакет містить **повну дизайн-систему**: CSS-токени, набір UI-компонентів і
високоточний UI-кіт із чотирма продуктовими екранами (лендинг, сторінка продукту,
прайсинг, кабінет покупця зі станами).

## 2. Про файли в цьому пакеті

Файли HTML/JSX/CSS у бандлі — це **дизайн-референси, створені в HTML/React**: прототипи,
що показують задуманий вигляд і поведінку, **а не продакшн-код для прямого копіювання**.
Завдання — **відтворити ці дизайни у темі Drupal 11** за патернами самого Drupal
(Twig, SDC, бібліотеки ассетів, кеш рендеру), а не вбудовувати React.

**Що переноситься 1:1, а що переписується:**

| Шар | У бандлі | У Drupal 11 |
|---|---|---|
| **Токени** (`tokens/*.css`) | CSS custom properties | **Беруться як є** — кладуться у тему, чіпляються однією бібліотекою |
| **Компоненти** (`components/**/*.jsx`) | React + інлайн-`<style>` | **Переписуються** як SDC: `*.twig` + `*.css` (стилі вже написані в JSX — перенести в окремий CSS), логіка станів — на JS-behavior або серверно |
| **UI-кіт** (`ui_kits/repono/*`) | React-екрани | **Референс верстки** — стають Twig-шаблонами сторінок / layout-ами |
| **Іконки** | Lucide (інлайн SVG) | Lucide як інлайн-SVG у Twig або через icon API Drupal 11 |
| **Шрифти** | Geist + JetBrains Mono (Google Fonts) | Самохостинг у темі (`@font-face`) — див. §7 |

## 3. Fidelity

**High-fidelity.** Кольори, типографіка, відступи, радіуси, тіні й мікровзаємодії —
фінальні. Відтворювати піксель-у-піксель за токенами нижче. Будь-яке значення стилю має
посилатися на CSS-змінну, а не на хардкод.

---

## 4. Рекомендована архітектура теми Drupal 11

Кастомна тема, наприклад `repono_theme`. Drupal 11 має вбудовану підтримку
**Single Directory Components (SDC)** — кожен компонент це папка з `*.component.yml`,
`*.twig` і `*.css`. Це найближчий аналог до того, що тут є.

```
web/themes/custom/repono_theme/
├── repono_theme.info.yml
├── repono_theme.libraries.yml
├── css/
│   └── tokens/                ← скопіювати сюди всі файли з bundle: tokens/*.css
│       ├── fonts.css
│       ├── colors.css
│       ├── typography.css
│       ├── spacing.css
│       ├── elevation.css
│       └── base.css
├── fonts/                     ← самохостинг Geist + JetBrains Mono (woff2)
├── components/                ← SDC, по одному компоненту на папку
│   ├── button/
│   │   ├── button.component.yml
│   │   ├── button.twig
│   │   └── button.css
│   ├── badge/ …
│   ├── terminal/ …
│   └── license-card/ …
└── templates/                 ← page/region/node шаблони (екрани UI-кіту)
```

**Підключення токенів — одна глобальна бібліотека.** У `repono_theme.libraries.yml`:

```yaml
tokens:
  version: 1.x
  css:
    base:
      css/tokens/fonts.css: {}
      css/tokens/colors.css: {}
      css/tokens/typography.css: {}
      css/tokens/spacing.css: {}
      css/tokens/elevation.css: {}
      css/tokens/base.css: {}
```

У `repono_theme.info.yml` додати глобально, щоб токени були на кожній сторінці:

```yaml
libraries:
  - repono_theme/tokens
```

Кожен SDC оголошує власну бібліотеку CSS — токени вже глобальні, тож компоненти лише
посилаються на `var(--…)`, ніколи не дублюють значення.

### Приклад SDC: Button

`components/button/button.component.yml`
```yaml
name: Button
status: stable
props:
  type: object
  properties:
    label: { type: string }
    variant: { type: string, enum: [primary, secondary, ghost, danger], default: primary }
    size: { type: string, enum: [sm, md, lg], default: md }
    href: { type: string }
    disabled: { type: boolean, default: false }
```

`components/button/button.twig`
```twig
{% set classes = ['r-btn', 'r-btn--' ~ variant, size != 'md' ? 'r-btn--' ~ size] %}
{% if href %}
  <a href="{{ href }}" class="{{ classes|join(' ')|trim }}">{{ label }}</a>
{% else %}
  <button type="button" class="{{ classes|join(' ')|trim }}" {{ disabled ? 'disabled' }}>{{ label }}</button>
{% endif %}
```

`components/button/button.css` — перенести правила `.r-btn*` з
`components/buttons/Button.jsx` (вони вже написані під ці самі класи й токени).

Рендер у Twig: `{{ include('repono_theme:button', { label: 'Підключити модуль', variant: 'primary' }) }}`

> Решта компонентів мають **точно таку структуру**: класи (`.r-*`), розмітку й стилі вже
> написано в JSX-файлах — їх треба лише розкласти на `*.twig` (розмітка) + `*.css` (стилі
> з інлайн-`<style>`). Класова система вже узгоджена з токенами.

---

## 5. Екрани (UI-кіт)

Джерело: `ui_kits/repono/`. Поведінка — у відповідних `*.jsx`.

### 5.1 Лендинг (`Landing.jsx`)
- **Призначення:** за 10 секунд переконати розробника, що це надійний спосіб ставити й
  оновлювати платні модулі.
- **Лейаут:** ліво-вирівняний асиметричний герой, 2 колонки (копія ліворуч, «живий
  маніфест» праворуч: термінал `composer require` + картка-ліцензія з heartbeat).
  Далі: смуга «speaks your stack» (теги), 3 кроки «from publish to paid» (sticky-ліва
  колонка + нумеровані рядки), прев'ю історії релізів (`VersionTable`), темна CTA-смуга.
- **Підпис (signature):** термінал друкує команду й по черзі відкриває вивід; картка
  ліцензії з пульсуючим `● active`.

### 5.2 Сторінка продукту (`ProductPage.jsx`)
- **Призначення:** опис, сумісність, інсталяція, історія релізів/changelog.
- **Лейаут:** хедер з `owner/name` (моно) + badge версії + сумісність (теги). Нижче — 2
  колонки: основний контент («що робить» + повна `VersionTable` з розкриттям changelog) і
  sticky-сайдбар (термінал-інсталяція + кнопка «Підключити модуль» + блок «Деталі»).

### 5.3 Прайсинг (`Pricing.jsx`)
- **Призначення:** 3 плани (Solo/Team/Agency), наголос на Team. Ціна — за активний домен,
  staging безкоштовний. Реальна копія фіч, без води.

### 5.4 Кабінет покупця (`Cabinet.jsx`) — з обов'язковими станами
- **Вкладки:** Subscriptions, Licenses, Activations, Invoices, Payment method.
- **Стани (перемикач «Demo state» у прототипі — у проді це реальні стани даних):**
  - **Populated** — список підписок (свіч «Призупинити»→тост «Призупинено»), картки
    ліцензій (копіювання ключа→тост), таблиця активацій (домен + env + heartbeat),
    рахунки, спосіб оплати.
  - **Empty** — `EmptyState`: запрошення до дії («Підключити модуль» / «Вставити ключ»).
  - **Payment error** — `Alert` зверху + у вкладці оплати: пояснює що сталося і що
    зробити, без вибачень («картка …4242 відхилена; модулі працюють ще 7 днів»).
  - **Loading** — скелетони рядків (shimmer, поважає `prefers-reduced-motion`).

---

## 6. Взаємодії та поведінка

- **Кнопки:** hover **світлішає**, press **темнішає + зсув 1px**. Назва дії однакова через
  весь флоу (кнопка «Призупинити» → тост «Призупинено»).
- **Heartbeat:** пульсація лише в стані `active`; `idle/stale/down` статичні.
- **Термінал:** друк команди (≈38ms/символ), потім порядкове розкриття виводу; під
  `prefers-reduced-motion` — одразу фінальний стан.
- **Changelog:** рядок версії розкривається по кліку (grid-rows 0fr→1fr, 260ms).
- **Фокус:** видимий focus-ring (teal, `--ring`) на всіх інтерактивних елементах.
- **Анімація:** стандартний easing `cubic-bezier(0.2,0,0,1)`, тривалості 120–260ms.
  Рух лише там, де несе зміст. Усе поважає `prefers-reduced-motion`.
- **Адаптив:** при ≤920px двоколонкові секції стають одноколонковими; нав-лінки ховаються.

---

## 7. Design tokens (точні значення)

Повний набір — у `tokens/*.css` (152 токени). Ключові:

**Кольори**
| Роль | Змінна | Hex |
|---|---|---|
| Сторінка (фон) | `--surface-page` | `#F4F6F8` |
| Картка | `--surface-card` | `#FFFFFF` |
| Термінал (темна поверхня) | `--surface-terminal` | `#0E1116` |
| Текст основний (чорнило) | `--text-strong` | `#171B21` |
| Текст приглушений | `--text-muted` | `#5A636E` |
| Hairline | `--border-default` | `#DCE1E6` |
| **Акцент — петроль-тіл** | `--accent` | `#0E5A66` |
| Акцент hover / pressed | `--accent-hover` / `--accent-pressed` | `#15727F` / `#0A434C` |
| **Охра — лише badge версій** | `--badge-version-fg` / `--badge-version-bg` | `#8A6418` / `#F3EAD6` |
| Активний heartbeat | `--ok-600` | `#2F7D4F` |
| Помилка оплати | `--danger-600` | `#B0413A` |

**Типографіка** — `--font-display: Geist`, `--font-body: Geist`,
`--font-mono: JetBrains Mono`. Дисплей-трекінг `-0.02…-0.03em`. Шкала: display 26–72px,
body 16px, mono 13–16px (`font-feature-settings: "zero" 1`).

**Відступи** — сітка 4px: `--space-1…32` (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128).

**Радіуси** — `--radius-xs:2px` (дефолт), `sm:3`, `md:5`, `lg:8` (картки), `xl:12`,
`full:999` (лише статус-крапки/пігулки). Реєстрове «залізо», не м'який SaaS.

**Тіні** — холодні, низькорозсіяні (`--shadow-sm/md/lg/pop`). Тінь лише для плаваючих
поверхонь; картки лежать на hairline.

**Заборонено (AI-tropes):** фіолетово-неонові градієнти, gradient-text, світіння,
glassmorphism/blur, центрований герой із блобом і трьома однаковими картками.

---

## 8. Шрифти (потрібна дія)

Бриф називав платні гарнітури (**Neue Montreal / Söhne**, **Berkeley Mono**). У системі —
безкоштовні близькі еквіваленти **Geist** + **JetBrains Mono** (зараз через Google Fonts CDN).

**Для Drupal 11 — самохостинг:** покладіть `.woff2` у `fonts/`, замініть `@import` у
`tokens/fonts.css` на `@font-face` (`font-display: swap`), решта токенів не змінюється.
Якщо є ліцензії на оригінальні гарнітури — підставити їх і оновити `--font-*` у
`tokens/typography.css`.

## 9. Іконографія

**Lucide** (line, stroke 1.75, круглі кінці). У бандлі — інлайн-SVG
(`ui_kits/repono/icons.jsx`, `assets/repono-mark.svg`). У Drupal: інлайн-SVG у Twig або
через Icon API Drupal 11. Бренд-мітка — `assets/repono-mark.svg` (контейнер-маніфест із
teal version-node). **Без емодзі та юнікод-символів як іконок.**

## 10. Assets

- `assets/repono-mark.svg`, `assets/repono-mark-ink.svg` — бренд-мітка (currentColor / ink).
- Лого-локап (мітка + «Repono» у Geist) — див. `guidelines/brand-logo.card.html`.
- Інших растрових ассетів немає: «образність» бренду — це сам артефакт (термінал, картка
  ліцензії, таблиця версій).

## 11. Файли для референсу

- **Токени:** `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `elevation.css`, `base.css`; точка входу — `styles.css`.
- **Компоненти:** `components/{buttons,forms,status,surfaces,navigation,feedback,registry}/*.jsx`
  (+ `.prompt.md` з прикладами вживання кожного).
- **UI-кіт:** `ui_kits/repono/{index.html,Landing.jsx,ProductPage.jsx,Pricing.jsx,Cabinet.jsx,Chrome.jsx,icons.jsx,data.js}`.
- **Специмени:** `guidelines/*.card.html`.
- **Гайд бренду:** `README.md` (корінь), `SKILL.md`.

> Запустити прототип як живий референс: відкрити `ui_kits/repono/index.html` (рантайм-бандл
> `_ds_bundle.js` згенеровано системою). Перемикач унизу — навігація між екранами; у
> кабінеті є перемикач станів.
