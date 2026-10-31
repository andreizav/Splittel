# Ltemplate — Next-Gen Angular 20 Enterprise Admin Dashboard

[![Angular](https://img.shields.io/badge/Angular-20.0.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Angular Material](https://img.shields.io/badge/Material_MDC-20.0.0-3F51B5?style=for-the-badge&logo=google&logoColor=white)](https://material.angular.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests Passing](https://img.shields.io/badge/Tests-182%2F182%20Passed-success?style=for-the-badge&logo=jasmine&logoColor=white)](#-тестирование-и-контроль-качества)
[![Node](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

Современный, производительный и готовый к production шаблон административной панели на базе **Angular 20**, **Angular Material 20 (MDC)** и **Tailwind CSS 3.4**. Включает гибкую модульную архитектуру, динамическую смену макетов, централизованную палитру дизайн-токенов, переключение светлой/тёмной тем без артефактов прозрачности, 25 готовых функциональных разделов и 100% покрытие студийными и официальными медиа-ассетами.

Настоящий документ объединяет в себе **всю проектную документацию, системную архитектурную карту, схемы, таблицы компонентов, прямой исходный код и исчерпывающее дерево всех 1 429+ файлов проекта**.

---

## 📑 Содержание

- [Ключевые возможности](#-ключевые-возможности)
- [Технологический стек и статистика файлов](#-технологический-стек-и-статистика-файлов)
- [Архитектурная диаграмма системы (Mermaid)](#-архитектурная-диаграмма-системы-mermaid)
- [Быстрый старт и установка](#-быстрый-старт-и-установка)
- [Доступные команды (Scripts)](#-доступные-команды-scripts)
- [Архитектура и структура каталогов](#-архитектура-и-структура-каталогов)
  - [Корневые конфигурационные файлы (Root Directory)](#1-корневые-конфигурационные-файлы-root-directory)
  - [Каталог ядра приложения (`src/`)](#2-каталог-ядра-приложения-src)
  - [Корневой модуль приложения (`src/app/`)](#3-корневой-модуль-приложения-srcapp)
  - [Слой Shared (Общие компоненты, сервисы, директивы, пайпы)](#4-слой-shared-общие-компоненты-сервисы-директивы-пайпы)
- [Функциональные модули разделов (Views)](#-функциональные-модули-разделов-views)
- [Прямой исходный код и архитектура компонентов](#-прямой-исходный-код-и-архитектура-компонентов)
  - [Модуль календаря (`src/app/views/app-calendar/`)](#-модуль-календаря-srcappviewsapp-calendar)
  - [Архитектура реактивных сигналов (Angular Signals): `ThemeService`](#️-архитектура-реактивных-сигналов-angular-signals-themeservice)
  - [Динамический просмотрщик исходного кода компонентов (`ExampleViewerComponent`)](#-динамический-просмотрщик-исходного-кода-компонентов-exampleviewercomponent)
- [Единая цветовая система и темы](#-единая-цветовая-система-и-темы)
- [Дизайн-система, ассеты и стили](#-дизайн-система-ассеты-и-стили)
  - [Структура SCSS стилей (`src/assets/styles/`)](#структура-scss-стилей-srcassetsstyles)
  - [Каталог статических ассетов и медиа (`src/assets/`)](#каталог-статических-ассетов-и-медиа-srcassets)
- [Авторизация и безопасность](#-авторизация-и-безопасность)
- [Тестирование и контроль качества](#-тестирование-и-контроль-качества)
- [Сборка для продакшн](#-сборка-для-продакшн)
- [Исчерпывающее дерево файлов проекта (Full Filesystem Tree)](#-исчерпывающее-дерево-файлов-проекта-full-filesystem-tree)
- [Лицензия](#-лицензия)

---

## 🚀 Ключевые возможности

- **Angular 20 & Material MDC**: Чистая архитектура с компонентами Angular Material последней спецификации MDC.
- **Двойная система макетов (Dual Layouts)**:
  - **Vertical Layout**: Классическая боковая панель навигации (полный режим, компактный аккордеон, скрытый режим).
  - **Horizontal Layout**: Современная горизонтальная панель меню в шапке приложения.
- **Единая система цветов (Unified Color Tokens)**:
  - Центральный источник правды для цветов (`_color-tokens.scss`), автоматически питающий Angular Material и Tailwind CSS utilities.
- **Мгновенное переключение Light / Dark тем**:
  - Полное устранение нежелательной прозрачности: все выпадающие списки (`mat-menu`), оверлеи селектов (`mat-select`), шторки уведомлений (`mat-sidenav`), диалоги и плавающая кнопка кастомизатора имеют плотные непрозрачные фоны и аккуратные тени в обоих режимах.
- **Богатая коллекция функциональных модулей (25 разделов)**:
  - 4 типа дашбордов (Аналитика, Криптовалюты, LMS, Dark-вид).
  - Витрина из более чем 30 компонентов Material MDC.
  - Полнофункциональный интерактивный чат (мессенджер).
  - Почтовый клиент (Inbox) с фильтрацией и модалкой отправки.
  - Интерактивный календарь `angular-calendar` с отображением месяца/недели/дня, Drag & Drop и модальным управлением событиями.
  - Управление задачами (Todo) с категориями и приоритетами.
  - Полноценный интернет-магазин (каталог, фильтры, корзина, оформление).
  - Управление счетами и конструктор инвойсов.
  - Интерактивный тур онбординга пользователей (Driver.js).
- **Студийные ассеты и векторная графика**:
  - 100% замена всех устаревших изображений на современные 4K-портреты, студийные фото товаров и авторские геометрические SVG-иллюстрации для экранов входа, сброса пароля, блокировки и ошибок 404/500.
- **Интернационализация (i18n)**:
  - Готовые переводы на английский (EN) и испанский (ES) через `@ngx-translate`.
- **Автономный демо-режим**:
  - Встроенный mock-бэкенд `angular-in-memory-web-api` для работы «из коробки» без поднятия внешнего API.

---

## 🛠 Технологический стек и статистика файлов

| Категория | Библиотека / Инструмент | Версия | Назначение |
| :--- | :--- | :--- | :--- |
| **Framework** | Angular Core / Common / CLI | `20.0.0` | Основной реактивный фреймворк |
| **UI Components** | Angular Material & CDK | `20.0.0` | MDC-компоненты интерфейса, оверлеи |
| **CSS Engine** | Tailwind CSS & Sass (SCSS) | `3.4.17` | Адаптивная верстка, utility-классы, токены |
| **Charts** | ngx-echarts / ECharts | `20.0.2` / `5.6.0` | Интерактивные сложные визуализации |
| **Charts** | @swimlane/ngx-charts | `21.1.0` | Декларативные SVG-графики |
| **Charts** | Chart.js | `4.4.7` | Легковесные линейные и круговые диаграммы |
| **Calendar** | angular-calendar / date-fns | `0.32.2` / `4.0.0` | Интерактивный календарь, расписание и манипуляции с датами |
| **Data Tables** | @swimlane/ngx-datatable | `20.1.0` | Быстрые виртуализированные таблицы |
| **Rich Text Editor**| ngx-quill / Quill | `26.0.3` / `2.0.3` | Визуальный WYSIWYG-редактор |
| **Internationalization**| @ngx-translate/core | `16.0.4` | Динамическая локализация на лету |
| **User Onboarding** | driver.js | `0.9.8` | Интерактивные пошаговые подсказки (Tour) |
| **Testing** | Jasmine & Karma | `5.6.0` / `6.4.4` | Модульное тестирование (Headless Chrome) |

### Распределение файлов по типам
| Расширение | Назначение | Количество файлов |
| :--- | :--- | :--- |
| `.ts` | TypeScript (компоненты, сервисы, модули, спецификации тестов, конфиги) | 524 |
| `.scss` | Стили SCSS (компонентные стили, темы, переменные, дизайн-система) | 253 |
| `.html` | Шаблоны компонентов Angular | 239 |
| `.svg` | Векторные иконки, иллюстрации, бренды | 155 |
| `.png` | Растровые изображения (логотипы, крипта, скриншоты, значки) | 156 |
| `.jpg` / `.webp` | Фотографии студийного качества (аватары, продукты, галерея, обои) | 61 |
| `.json` | Конфигурационные файлы, локализации i18n, схемы | 8 |
| `.css` / `.js` | Вспомогательные стили и скрипты аналитики/вендоров | 35 |
| **Всего** | **Полный исходный код и медиа-ассеты проекта** | **1 429+ файлов в 304 директориях** |

---

## 🗺 Архитектурная диаграмма системы (Mermaid)

```mermaid
graph TD
    Root[main.ts & app.module.ts] --> AppComp[app.component]
    AppComp --> RouterOutlet[Router Outlet]

    subgraph SessionsLayout["Sessions Layout (Авторизация и системные)"]
        RouterOutlet --> SessionsView["/sessions (Signin, Signup, Forgot, Lockscreen, 404, 500)"]
    end

    subgraph AdminLayout["Admin Layout (Защищённые маршруты AuthGuard)"]
        RouterOutlet --> VertLayout[VerticalLayoutComponent]
        RouterOutlet --> HorizLayout[HorizontalLayoutComponent]

        VertLayout --> SideNav[app-sidebar-side]
        VertLayout --> HeaderSide[app-header-side]
        VertLayout --> Breadcrumb[app-breadcrumb]
        VertLayout --> AdminOutlet[Dynamic Router Outlet]
        VertLayout --> Footer[app-footer]
        VertLayout --> NotificSide[app-notifications in mat-sidenav]
        VertLayout --> Customizer[app-customizer]

        HorizLayout --> HeaderTop[app-header-top]
        HorizLayout --> HorizNav[app-sidebar-top]
    end

    subgraph FeatureViews["25 функциональных модулей (Lazy-loaded)"]
        AdminOutlet --> Dash["/dashboard (Analytics, Crypto, LMS, Alt)"]
        AdminOutlet --> MatEx["/material (30+ MDC-компонентов)"]
        AdminOutlet --> Crud["/cruds (CRUD ngx-table)"]
        AdminOutlet --> Shop["/shop (Products, Cart, Checkout)"]
        AdminOutlet --> Chat["/chat (Full Chat Client)"]
        AdminOutlet --> Inbox["/inbox (Email Client & Composer)"]
        AdminOutlet --> Cal["/calendar (angular-calendar)"]
        AdminOutlet --> Inv["/invoice (Invoices, Builder)"]
        AdminOutlet --> Todo["/todo (Task Management)"]
        AdminOutlet --> Tour["/tour (Driver.js Interactive Tour)"]
        AdminOutlet --> OtherViews["Другие (Profile, Maps, Forms, Drag-n-Drop, Tables, Icons, UI-Kits)"]
    end

    subgraph SharedCore["Ядро Shared (Сервисы, Состояния, Директивы)"]
        ThemeService[ThemeService] --> UnifiedColors[Unified Color System]
        LayoutService[LayoutService] --> LayoutConfig[Layout State & Responsiveness]
        NavigationService[NavigationService] --> NavModel[Dynamic Menu Model]
        AuthService[JwtAuthService] --> TokenStorage[JWT & Role Guards]
    end
```

---

## ⚡️ Быстрый старт и установка

### 1. Требования к окружению
- **Node.js**: `>= 20.0.0` (рекомендуется LTS 20.x или 22.x)
- **npm**: `>= 10.0.0`

### 2. Клонирование и установка зависимостей

```bash
# Клонируйте репозиторий
git clone git@github.com:andreizav/Ltemplate.git
cd Ltemplate

# Перейдите на актуальную ветку
git checkout master

# Установите зависимости проекта
npm install
```

### 3. Запуск сервера разработки

```bash
npm start
# или: npx ng serve
```

После компиляции приложение откроется по адресу: **`http://localhost:4200/`**.  
Сервер поддерживает автоматическую горячую перезагрузку (Live Reload) при изменении любых файлов стилей, шаблонов или TypeScript.

### 4. Вход в систему (Демо-аккаунт)

Для демонстрации используется симуляция авторизации (Mock JWT). На странице входа `/sessions/signin` можно использовать предустановленные учётные данные:
- **Email**: `watson@example.com` (или любой валидный email)
- **Пароль**: любой непустой пароль (авторизация подтверждается локальным хранилищем)

---

## 📜 Доступные команды (Scripts)

| Команда | Описание |
| :--- | :--- |
| `npm start` | Запуск локального сервера разработки на порту `4200` |
| `npm run build` | Оптимизированная production-сборка в директорию `dist/` |
| `npm test` | Запуск всех 182 модульных тестов в среде Headless Chrome |
| `npm run lint` | Проверка стилей и качества кода линтером |
| `ng generate component name` | Генерация нового компонента Angular с шаблоном и стилями |

---

## 🏛 Архитектура и структура каталогов

```text
Ltemplate/
├── src/
│   ├── app/
│   │   ├── app.component.*            # Корневой компонент (TitleService, RouterOutlet)
│   │   ├── app.module.ts              # Корневой модуль приложения
│   │   ├── app.routing.ts             # Корневая маршрутизация и AuthGuard
│   │   ├── shared/                    # Общие переиспользуемые модули
│   │   │   ├── components/            # Макеты, шапки, сайдбары, уведомления, кастомизатор
│   │   │   ├── services/              # ThemeService, LayoutService, NavigationService, JwtAuth
│   │   │   ├── directives/            # Dropdown, ScrollTo, SidenavToggle, FontSize
│   │   │   ├── pipes/                 # RelativeTime, Excerpt, GetValueByPath
│   │   │   ├── guards/                # AuthGuard, UserRoleGuard
│   │   │   ├── models/                # Интерфейсы TypeScript
│   │   │   └── config/                # theme-colors.ts (цветовая схема)
│   │   └── views/                     # 25 функциональных разделов (Lazy-Loaded)
│   ├── assets/
│   │   ├── i18n/                      # Локализации en.json, es.json
│   │   ├── images/                    # Аватары, продукты, крипта, логотипы, SVG-иллюстрации
│   │   └── styles/                    # Sass дизайн-система и Tailwind CSS
│   ├── environments/                  # environment.ts / environment.prod.ts
│   ├── main.ts                        # Точка входа в приложение
│   └── styles.scss                    # Корневое подключение стилей
├── angular.json                       # Конфигурация сборки Angular CLI
├── tailwind.config.js                 # Конфигурация Tailwind и привязка токенов
├── tsconfig.json                      # Базовые настройки TypeScript
└── README.md                          # Исчерпывающая системная документация проекта
```

> **Подробная карта файлов**: Полное дерево всех 1 429 файлов проекта с описанием их ролей находится в разделе [Исчерпывающее дерево файлов проекта](#-исчерпывающее-дерево-файлов-проекта-full-filesystem-tree).

### 1. Корневые конфигурационные файлы (Root Directory)

| Файл | Описание и роль в проекте |
| :--- | :--- |
| `angular.json` | Главный конфигурационный манифест Angular CLI (сборка, стили, ассеты, тесты, оптимизация, браузеры) |
| `package.json` | Манифест зависимостей npm, скрипты (`start`, `build`, `test`, `lint`), версии Angular 20 |
| `package-lock.json` | Дерево зафиксированных точных версий зависимостей npm |
| `tailwind.config.js` | Конфигурация Tailwind CSS: генерация цветов на основе дизайн-токенов SCSS, пути сканирования шаблонов |
| `tsconfig.json` | Базовые настройки компилятора TypeScript (ES2022, пути `paths`, strict/target настройки) |
| `tsconfig.app.json` | Конфигурация TypeScript для сборки основного приложения |
| `tsconfig.spec.json` | Конфигурация TypeScript для выполнения модульных тестов Jasmine/Karma |
| `karma.conf.js` | Конфигурация тест-раннера Karma (Jasmine, ChromeHeadless, кастомные флаги) |
| `README.md` | Единая исчерпывающая документация, системная карта, архитектура и дерево файлов |
| `.gitignore` | Исключения контроля версий Git (`node_modules`, `dist`, кэши, IDE) |

---

### 2. Каталог ядра приложения (`src/`)

| Путь к файлу | Роль в системе |
| :--- | :--- |
| `src/main.ts` | Точка входа в приложение: инициализация Angular (`platformBrowserDynamic`), регистрация глобальных сервисов |
| `src/index.html` | Главный HTML-документ: подключение шрифтов Inter/Roboto, иконок Material Icons, метатегов |
| `src/polyfills.ts` | Полифилы для совместимости стандартов ES и Zone.js |
| `src/styles.scss` | Корневая точка входа SCSS, подключающая `assets/styles/app.scss` и `assets/styles/tailwind.scss` |
| `src/styles.css` | Корневой fallback CSS файл |
| `src/test.ts` | Инициализатор тестового окружения Angular Testing Platform для Karma |
| `src/typings.d.ts` | Глобальные декларации типов TypeScript (включая сторонние библиотеки) |
| `src/config.ts` | Глобальный конфигурационный объект (`auth`, `api`, `themeLocalStorageKey`) |
| `src/favicon.ico` | Иконка вкладки браузера |
| `src/environments/environment.ts` | Переменные окружения для локальной разработки (`production: false`, apiURL) |
| `src/environments/environment.prod.ts` | Переменные окружения для продакшн-сборки (`production: true`) |
| `src/vendor/` | Сторонние автономные библиотеки (Pace loader, Chart.js) |

---

### 3. Корневой модуль приложения (`src/app/`)

| Файл | Описание |
| :--- | :--- |
| `src/app/app.component.ts` | Корневой компонент приложения: подписка на смену страниц, скролл наверх, установка заголовка вкладки TitleService |
| `src/app/app.component.html` | Главный контейнер `<router-outlet></router-outlet>` |
| `src/app/app.component.css` | Стили корневого компонента |
| `src/app/app.component.spec.ts` | Модульный тест для корневого компонента |
| `src/app/app.module.ts` | Главный NgModule: регистрация `BrowserModule`, `BrowserAnimationsModule`, `HttpClientModule`, `TranslateModule`, `InMemoryWebApiModule`, `SharedModule` |
| `src/app/app.routing.ts` | Корневые маршруты: распределение между шаблонами авторизации (`sessions`) и защищенными разделами (Vertical/Horizontal layout) с AuthGuard |

---

### 4. Слой Shared (Общие компоненты, сервисы, директивы, пайпы)

#### 4.1. Компоненты макетов и UI (`src/app/shared/components/`)
- **`layouts/vertical-layout/`**:
  - `vertical-layout.component.ts`, `.html`: Основной вертикальный макет админ-панели (боковой сайдбар, фиксированная шапка, хлебные крошки, контент, футер, боковая панель уведомлений `mat-sidenav`).
- **`layouts/horizontal-layout/`**:
  - `horizontal-layout.component.ts`, `.html`: Горизонтальный макет с навигационным меню в верхней части экрана.
- **`header-side/`**:
  - `header-side.component.ts`, `.template.html`: Верхняя панель для вертикального макета (кнопка свёртывания сайдбара, переключатель языка EN/ES, поиск, колокольчик уведомлений, меню профиля).
- **`header-top/`**:
  - `header-top.component.ts`, `.html`: Верхняя панель для горизонтального макета со встроенной горизонтальной навигацией.
- **`sidebar-side/`**:
  - `sidebar-side.component.ts`, `.template.html`: Левая боковая панель с аватаром пользователя, статусом, меню действий и древовидным списком разделов.
- **`sidebar-top/`**:
  - `sidebar-top.component.ts`, `.html`: Горизонтальное выпадающее меню навигации.
- **`customizer/`**:
  - `customizer.component.ts`, `.html`, `.scss`: Плавающая панель кастомизации оформления (переключение тем Light/Dark, выбор вертикального/горизонтального макета, цветов сайдбара, хлебных крошек).
- **`notifications/`**:
  - `notifications.component.ts`, `.html`: Выдвижная шторка со списком системных уведомлений, статусами, временными метками и кнопкой очистки.
- **`ltemplate-notifications2/`**:
  - `ltemplate-notifications2.component.ts`, `.html`, `.scss`: Дополнительный компонент оверлея уведомлений.
- **`breadcrumb/`**:
  - `breadcrumb.component.ts`, `.html`: Динамические хлебные крошки, синхронизированные с текущим URL и данными маршрута.
- **`footer/`**:
  - `footer.component.ts`, `.html`: Подвал страницы с копирайтом и ссылками.
- **`bottom-sheet/`**:
  - `bottom-sheet.component.ts`, `.html`: Всплывающая нижняя шторка для мобильных и контекстных действий.
- **`search-input-over/`**:
  - `search-input-over.component.ts`, `.html`: Выдвижное поле полноэкранного поиска по разделам системы.
- **`egret-sidebar/`**:
  - `egret-sidebar.component.ts`, `egret-sidebar-toggler.directive.ts`, `egret-sidebar.helper.service.ts`: Универсальный механизм гибких внутренних сайдбаров для приложений (чат, почта, задачи).
- **`shared-components.module.ts`**: Декларация и экспорт всех общих компонентов интерфейса.

#### 4.2. Сервисы ядра (`src/app/shared/services/`)
- **`theme.service.ts`**: Главный сервис управления темами (Navy Light, Navy Dark). Синхронизирует классы тем на `documentElement`, `bodyElement` и `OverlayContainer` для CDK-оверлеев.
- **`layout.service.ts`**: Реактивное управление состоянием интерфейса (стили сайдбара: full, compact, closed; ориентация: vertical, horizontal; адаптивность для мобильных).
- **`navigation.service.ts`**: Сервис модели навигации, поставляет иерархический список меню с правами доступа и иконками.
- **`match-media.service.ts`**: Отслеживание брейкпоинтов экрана (mobile, tablet, desktop).
- **`route-parts.service.ts`**: Парсинг сегментов маршрута для генерации хлебных крошек и заголовков страниц.
- **`app-confirm/`**: `app-confirm.service.ts`, `app-confirm.component.ts`, `.html`: Модальный диалог подтверждения опасных операций.
- **`app-loader/`**: `app-loader.service.ts`, `app-loader.component.ts`, `.html`: Глобальный модальный спиннер загрузки.
- **`auth/`**: `jwt-auth.service.ts`: Сервис авторизации, валидация JWT-токена, хранение сессии в localStorage, роли пользователя.

#### 4.3. Директивы (`src/app/shared/directives/`)
- `dropdown.directive.ts`, `dropdown-toggle.directive.ts`: Управление поведением выпадающих списков и аккордеонов.
- `egret-side-nav-toggle.directive.ts`: Переключение состояния бокового меню.
- `scroll-to.directive.ts`: Плавная прокрутка к целевому элементу.
- `font-size.directive.ts`: Динамическое управление размером шрифта.
- `shared-directives.module.ts`: Модуль директив.

#### 4.4. Пайпы (`src/app/shared/pipes/`)
- `relative-time.pipe.ts`: Человекочитаемое форматирование относительного времени ("2 минуты назад").
- `excerpt.pipe.ts`: Усечение длинного текста с многоточием.
- `get-value-by-path.pipe.ts`: Безопасное извлечение вложенных свойств объекта по строковому пути.
- `shared-pipes.module.ts`: Модуль пайпов.

#### 4.5. Безопасность и Guards (`src/app/shared/guards/`)
- `auth.guard.ts`: Защита приватных маршрутов (проверка наличия валидной сессии через `JwtAuthService`).
- `user-role.guard.ts`: Ограничение доступа к маршрутам на основе ролей пользователя (Admin, Editor, User).

#### 4.6. Модели и Конфигурация (`src/app/shared/models/`, `src/app/shared/config/`)
- `models/user.model.ts`: Интерфейс пользователя системы.
- `models/event.model.ts`: Модель событий календаря.
- `models/notification.model.ts`: Модель системных уведомлений.
- `config/theme-colors.ts`: Централизованная карта цветовых токенов и палитр дизайн-системы.
- `animations/Ltemplate-animations.ts`: Набор фирменных анимаций Angular (fade, slide, expand).
- `inmemory-db/`: Локальный mock-сервер `inmemory-db.service.ts` с фикстурами для демонстрации без внешнего API.

---

## 📦 Функциональные модули разделов (Views)

Все 25 функциональных модулей бизнес-логики загружаются асинхронно (Lazy Loading) по мере перехода пользователя по маршрутам:

Система разделена на 25 независимых, лениво загружаемых (lazy-loaded) функциональных модулей:

| Модуль (Папка) | Назначение и состав компонентов |
| :--- | :--- |
| **`dashboard/`** | Дашборды аналитики, криптовалюты, LMS и альтернативный вид: `AnalyticsComponent`, `CryptocurrencyComponent`, `LearningManagementComponent`, `DashboardDarkComponent`, графики, карточки KPI |
| **`material-example-view/`** | Полная витрина компонентов Angular Material MDC (30+ примеров: Autocomplete, Buttons, Cards, Dialogs, Datepicker, Expansion, Form Fields, Grids, Menus, Tables, Tooltips, Tabs и др.) |
| **`app-calendar/`** | Интерактивный календарь: интеграция с `angular-calendar` и `date-fns`, переключение представлений (месяц/неделя/день), `AppCalendarComponent`, модальный диалог `CalendarFormDialogComponent`, сервис `AppCalendarService` |
| **`app-chats/`** | Полнофункциональный мессенджер: левый сайдбар контактов, окно переписки, отправка сообщений, смайлики |
| **`app-inbox/`** | Клиент электронной почты: папки (входящие, отправленные, спам), список писем, детальный просмотр, модальное окно написания письма |
| **`app-tour/`** | Интерактивный онбординг пользователей с пошаговыми подсказками на базе библиотеки Driver.js |
| **`app-dialogs/`** | Примеры диалоговых окон, подтверждений и всплывающих панелей |
| **`chart-example-view/`** | Интерактивные графики: ECharts, ngx-charts (круговые, столбчатые, линейные, радарные) |
| **`charts/`** | Дополнительные компоненты графиков и визуализаций |
| **`cruds/`** | Модуль типовых CRUD-операций: таблица с пагинацией, фильтрацией, сортировкой, попап добавления и редактирования записи |
| **`forms/`** | Формы ввода: базовая форма, мастер пошагового заполнения (Form Wizard), интеграция с WYSIWYG-редактором Quill |
| **`invoice/`** | Управление счетами: список счетов, просмотр деталей счета, интерактивный конструктор нового счета |
| **`map/`** | Интеграция с интерактивными картами Google Maps |
| **`mat-icons/`** | Каталог и поиск по иконкам Material Icons |
| **`order/`** | Управление заказами и продажами |
| **`others/`** | Вспомогательные страницы (галерея изображений, список пользователей, пустая заготовка Blank) |
| **`page-layouts/`** | Шаблоны компоновки контента (сайдбар слева, сайдбар справа, фиксированная шапка, контейнерная раскладка) |
| **`profile/`** | Личный кабинет пользователя: `ProfileOverviewComponent` (обзор, активность, навыки) и `ProfileSettingsComponent` (настройки аккаунта) |
| **`search-view/`** | Страница отображения глобальных поисковых результатов |
| **`sessions/`** | Модуль страниц авторизации и системных статусов: Sign In, Sign Up (4 варианта дизайна), Forgot Password, Lockscreen, 404 Not Found, 500 Server Error |
| **`shop/`** | Полноценный интернет-магазин: каталог товаров с фильтрами, детальная карточка товара, корзина покупателя, оформление заказа Checkout |
| **`tables/`** | Разнообразные реализации таблиц: Material Table, Filter Table, Paging Table |
| **`todo/`** | Таск-менеджер (ToDo): список задач, теги, фильтрация по приоритету, сайдбар редактирования деталей задачи |
| **`utilities/`** | Демонстрация вспомогательных utility-классов верстки и отступов |

---

### Детальное описание ключевых функциональных разделов:

1. **`dashboard/`**:
   - `Analytics`: графики трафика, конверсий, сессий, посещений по странам.
   - `Cryptocurrency`: котировки криптовалют, балансы, графики курсов (BTC, ETH, SOL, LTC).
   - `Learning Management (LMS)`: прогресс обучения, курсы, блок PRO-апгрейда.
   - `Analytics Alt`: альтернативное визуальное представление ключевых метрик.
2. **`material-example-view/`**:
   - Полная витрина всех 30+ компонентов Angular Material MDC (Autocomplete, Datepicker, Select, Table, Dialog, Bottom Sheet, Tabs, Slider, Stepper, Expansion Panel, Badge, Chips и др.).
3. **`app-calendar/`**:
   - Календарь на `angular-calendar` и `date-fns` с отображением по месяцам, неделям, дням и спискам. Интерактивное создание, перетаскивание, изменение интервала и диалоговое окно редактирования событий. Подробный исходный код компонентов приведён в разделе [Прямой исходный код и архитектура компонентов](#-прямой-исходный-код-и-архитектура-компонентов).
4. **`app-chats/`**:
   - Полноценный интерфейс мессенджера: поиск контактов, статусы «онлайн/офлайн», история сообщений, поле быстрого ответа.
5. **`app-inbox/`**:
   - Почтовый ящик с папками «Входящие», «Отправленные», «Спам», «Корзина», предпросмотр писем и модальное окно создания нового письма.
6. **`app-tour/`**:
   - Пошаговый интерактивный обучающий тур по интерфейсу на базе Driver.js.
7. **`cruds/`**:
   - Типовой модуль CRUD (Create, Read, Update, Delete) на виртуализированной таблице `ngx-datatable` с пагинацией, фильтрацией и модальным редактором.
8. **`shop/`**:
   - Модуль интернет-магазина: витрина товаров с поиском и фильтрами по категориям, страница детального просмотра товара, корзина (`Cart`) и страница оформления (`Checkout`).
9. **`forms/`**:
   - Базовые элементы форм, реактивные формы, пошаговый мастер (Form Wizard), визуальный редактор Quill.
10. **`invoice/`**:
    - Список инвойсов со статусами оплаты, страница детального просмотра для печати и конструктор создания нового счета.
11. **`todo/`**:
    - Управление списком дел: фильтрация по статусам, цветовые теги, приоритеты, боковая панель быстрого редактирования задачи.
12. **`sessions/`**:
    - Страницы аутентификации с авторскими SVG-иллюстрациями: Sign In, Sign Up (4 разных дизайн-шаблона), Forgot Password, Lockscreen, 404 Not Found, 500 Server Error.
13. **`profile/`**:
    - Личный профиль пользователя: Overview (статистика активности, навыки, недавние действия) и Settings (изменение личных данных, пароля, уведомлений).

---

## 💻 Прямой исходный код и архитектура компонентов

Для удобства инспекции прямо в репозитории ниже приведён исчерпывающий исходный код ключевых компонентов, их шаблонов, диалоговых окон, сервисов и моделей. Вы можете сразу изучить детали реализации без необходимости перехода вглубь дерева файлов.

### 📅 Модуль календаря (`src/app/views/app-calendar/`)

Интерактивный планировщик событий построен на связке библиотеки **`angular-calendar`** (0.32.2) и утилит даты **`date-fns`** (4.0.0).  
Включает в себя:
- Режимы отображения: **Month**, **Week**, **Day**;
- Перетаскивание событий (Drag & Drop) и растягивание по времени (Resize);
- Раскрывающийся аккордеон списка событий активного дня;
- Всплывающее модальное окно добавления/редактирования на базе Angular Material Dialog с колорпикером и дейтпикером;
- Реактивное обновление состояния через `RxJS Subject` и сервисный слой.

#### 🔗 Быстрые ссылки на исходные файлы в репозитории:
- 📄 Контроллер компонента: [`src/app/views/app-calendar/app-calendar.component.ts`](src/app/views/app-calendar/app-calendar.component.ts)
- 📄 Шаблон интерфейса: [`src/app/views/app-calendar/app-calendar.component.html`](src/app/views/app-calendar/app-calendar.component.html)
- 📄 Стили компонента: [`src/app/views/app-calendar/app-calendar.component.css`](src/app/views/app-calendar/app-calendar.component.css)
- 📄 Модальный диалог (TS): [`src/app/views/app-calendar/calendar-form-dialog/calendar-form-dialog.component.ts`](src/app/views/app-calendar/calendar-form-dialog/calendar-form-dialog.component.ts)
- 📄 Модальный диалог (HTML): [`src/app/views/app-calendar/calendar-form-dialog/calendar-form-dialog.component.html`](src/app/views/app-calendar/calendar-form-dialog/calendar-form-dialog.component.html)
- 📄 Сервис данных: [`src/app/views/app-calendar/app-calendar.service.ts`](src/app/views/app-calendar/app-calendar.service.ts)
- 📄 Модель событий: [`src/app/shared/models/event.model.ts`](src/app/shared/models/event.model.ts)
- 📄 Модуль: [`src/app/views/app-calendar/app-calendar.module.ts`](src/app/views/app-calendar/app-calendar.module.ts)
- 📄 Маршрутизация: [`src/app/views/app-calendar/app-calendar.routing.ts`](src/app/views/app-calendar/app-calendar.routing.ts)

---

#### 1. TypeScript контроллер: `app-calendar.component.ts`

```typescript
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { isSameDay, isSameMonth } from 'date-fns';
import { LtemplateAnimations } from '../../shared/animations/ltemplate-animations';
import { LtemplateCalendarEvent } from '../../shared/models/event.model';
import { AppCalendarService } from './app-calendar.service';
import { CalendarFormDialogComponent } from './calendar-form-dialog/calendar-form-dialog.component';
import { AppConfirmService } from '../../shared/services/app-confirm/app-confirm.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.css'],
  animations: LtemplateAnimations,
  standalone: false
})
export class AppCalendarComponent implements OnInit {
  public view = 'month';
  public viewDate = new Date();
  private dialogRef: MatDialogRef<CalendarFormDialogComponent>;
  public activeDayIsOpen: boolean = true;
  public refresh: Subject<any> = new Subject();
  public events: LtemplateCalendarEvent[];
  private actions: CalendarEventAction[];

  constructor(
    public dialog: MatDialog,
    private calendarService: AppCalendarService,
    private confirmService: AppConfirmService
  ) {
    this.actions = [
      {
        label: '<i class="material-icons icon-sm">edit</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('edit', event);
        },
      },
      {
        label: '<i class="material-icons icon-sm">close</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.removeEvent(event);
        },
      },
    ];
  }

  ngOnInit() {
    this.loadEvents();
  }

  private initEvents(events): LtemplateCalendarEvent[] {
    return events.map((event) => {
      event.actions = this.actions;
      return new LtemplateCalendarEvent(event);
    });
  }

  public loadEvents() {
    this.calendarService.getEvents().subscribe((events: CalendarEvent[]) => {
      this.events = this.initEvents(events);
    });
  }

  public removeEvent(event) {
    this.confirmService
      .confirm({
        title: 'Delete Event?',
      })
      .subscribe((res) => {
        if (!res) {
          return;
        }

        this.calendarService.deleteEvent(event._id).subscribe((events) => {
          this.events = this.initEvents(events);
          this.refresh.next(1);
        });
      });
  }

  public addEvent() {
    this.dialogRef = this.dialog.open(CalendarFormDialogComponent, {
      panelClass: 'calendar-form-dialog',
      data: {
        action: 'add',
        date: new Date(),
      },
      width: '450px',
    });
    this.dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      let dialogAction = res.action;
      let responseEvent = res.event;
      this.calendarService.addEvent(responseEvent).subscribe((events) => {
        this.events = this.initEvents(events);
        this.refresh.next(true);
      });
    });
  }

  public handleEvent(action: string, event: LtemplateCalendarEvent): void {
    this.dialogRef = this.dialog.open(CalendarFormDialogComponent, {
      panelClass: 'calendar-form-dialog',
      data: { event, action },
      width: '450px',
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      let dialogAction = res.action;
      let responseEvent = res.event;

      if (dialogAction === 'save') {
        this.calendarService.updateEvent(responseEvent).subscribe((events) => {
          this.events = this.initEvents(events);
          this.refresh.next(1);
        });
      } else if (dialogAction === 'delete') {
        this.removeEvent(event);
      }
    });
  }

  public dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  public eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;

    this.calendarService.updateEvent(event).subscribe((events) => {
      this.events = this.initEvents(events);
      this.refresh.next(1);
    });
  }
}
```

---

#### 2. HTML шаблон: `app-calendar.component.html`

```html
<div class="sm:mx-8">
  <div class="mb-4">
    <button mat-raised-button class="m-2" color="accent" (click)="addEvent()">Add Event</button>
  </div>
  <mat-card class="p-0" [@animate]="{value:'*',params:{delay:'200ms',y:'40px'}}">
    <mat-card-title class="mat-bg-primary">
      <div [ngStyle]="{overflow: 'hidden'}" class="card-title-text calendar-title">
        <!-- Навигация: Назад / Сегодня / Вперед -->
        <div class="cal-top-col text-center">
          <button mat-icon-button mwlCalendarPreviousView [view]="view" [(viewDate)]="viewDate">
            <mat-icon class="text-white">chevron_left</mat-icon>
          </button>
          <button mat-icon-button mwlCalendarToday [(viewDate)]="viewDate">
            <mat-icon class="text-white">today</mat-icon>
          </button>
          <button mat-icon-button mwlCalendarNextView [view]="view" [(viewDate)]="viewDate">
            <mat-icon class="text-white">chevron_right</mat-icon>
          </button>
        </div>
  
        <!-- Заголовок текущего периода -->
        <div class="cal-top-col text-center">
          <h5 class="m-0 text-white" [style.lineHeight]="'40px'">{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h5>
        </div>
  
        <!-- Переключатели режимов: Месяц / Неделя / День -->
        <div class="cal-top-col text-center">
          <button mat-icon-button matTooltip="Month View" (click)="view = 'month'" [class.active]="view === 'month'">
            <mat-icon class="text-white">view_comfy</mat-icon>
          </button>
          <button mat-icon-button matTooltip="Week View" (click)="view = 'week'" [class.active]="view === 'week'">
            <mat-icon class="text-white">view_week</mat-icon>
          </button>
          <button mat-icon-button matTooltip="Day View" (click)="view = 'day'" [class.active]="view === 'day'">
            <mat-icon class="text-white">view_day</mat-icon>
          </button>
        </div>
      </div>
      <mat-divider></mat-divider>
    </mat-card-title>
  
    <!-- Представления календаря -->
    <mat-card-content class="p-0">
      <div [ngSwitch]="view">
        <mwl-calendar-month-view
          *ngSwitchCase="'month'"
          [viewDate]="viewDate"
          [events]="events"
          [refresh]="refresh"
          [activeDayIsOpen]="activeDayIsOpen"
          (dayClicked)="dayClicked($event.day)"
          (eventClicked)="handleEvent('edit', $event.event)"
          (eventTimesChanged)="eventTimesChanged($event)">
        </mwl-calendar-month-view>
        <mwl-calendar-week-view
          *ngSwitchCase="'week'"
          [viewDate]="viewDate"
          [events]="events"
          [refresh]="refresh"
          (eventClicked)="handleEvent('edit', $event.event)"
          (eventTimesChanged)="eventTimesChanged($event)">
        </mwl-calendar-week-view>
        <mwl-calendar-day-view
          *ngSwitchCase="'day'"
          [viewDate]="viewDate"
          [events]="events"
          [refresh]="refresh"
          (eventClicked)="handleEvent('edit', $event.event)"
          (eventTimesChanged)="eventTimesChanged($event)">
        </mwl-calendar-day-view>
      </div>
    </mat-card-content>
  </mat-card>
</div>
```

---

#### 3. Модальный диалог: `calendar-form-dialog.component.ts`

```typescript
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LtemplateCalendarEvent } from '../../../shared/models/event.model';

interface DialogData {
  event?: CalendarEvent;
  action?: string;
  date?: Date;
}

@Component({
  selector: 'app-calendar-form-dialog',
  templateUrl: './calendar-form-dialog.component.html',
  styleUrls: ['./calendar-form-dialog.component.scss'],
  standalone: false
})
export class CalendarFormDialogComponent implements OnInit {
  event: CalendarEvent;
  dialogTitle: string;
  eventForm: UntypedFormGroup;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<CalendarFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: UntypedFormBuilder
  ) {
    this.event = data.event;
    this.action = data.action;
    
    if (this.action === 'edit') {
      this.dialogTitle = this.event.title;
    } else {
      this.dialogTitle = 'Add Event';
      this.event = new LtemplateCalendarEvent({
        start: data.date,
        end: data.date
      });
    }
    this.eventForm = this.buildEventForm(this.event);
  }

  ngOnInit() {}

  buildEventForm(event: LtemplateCalendarEvent) {
    return new UntypedFormGroup({
      _id: new UntypedFormControl(event._id),
      title: new UntypedFormControl(event.title),
      start: new UntypedFormControl(event.start),
      end: new UntypedFormControl(event.end),
      allDay: new UntypedFormControl(event.allDay),
      color: this.formBuilder.group({
        primary: new UntypedFormControl(event.color.primary),
        secondary: new UntypedFormControl(event.color.secondary)
      }),
      meta: this.formBuilder.group({
        location: new UntypedFormControl(event.meta.location),
        notes: new UntypedFormControl(event.meta.notes)
      })
    });
  }
}
```

```html
<!-- calendar-form-dialog.component.html: Форма диалога с выбором цвета и Material Datepicker -->
<div class="event-dialog-wrapper">
  <mat-toolbar class="mat-primary m-0">
    <div class="flex justify-between items-center w-full py-2">
      <span class="title dialog-title">{{dialogTitle}}</span>
      <span class="flex-grow"></span>
      <button mat-icon-button (click)="dialogRef.close()" aria-label="Close dialog">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </mat-toolbar>

  <div mat-dialog-content class="p-4 m-0">
    <form name="eventForm" [formGroup]="eventForm" class="event-form">
      <div class="flex flex-wrap pt-2">
        <div class="w-full">
          <mat-form-field class="w-full">
            <input matInput name="title" formControlName="title" placeholder="Title" required>
          </mat-form-field>
        </div>

        <div class="flex flex-col w-full" formGroupName="color">
          <mat-form-field class="w-full">
            <input matInput class="color-picker-input" name="primaryColor" formControlName="primary"
              placeholder="Primary color" [(colorPicker)]="event.color.primary" [style.background]="event.color.primary"
              (colorPickerChange)="eventForm.patchValue({color:{primary: event.color.primary}})" />
          </mat-form-field>
        </div>

        <div class="flex flex-col w-full">
          <mat-form-field>
            <input matInput [matDatepicker]="startDateDP" placeholder="Start Date" name="startDate" formControlName="start">
            <mat-datepicker-toggle matSuffix [for]="startDateDP"></mat-datepicker-toggle>
            <mat-datepicker #startDateDP></mat-datepicker>
          </mat-form-field>
          <mat-form-field>
            <input matInput [matDatepicker]="endDateDP" placeholder="End Date" name="endDate" formControlName="end">
            <mat-datepicker-toggle matSuffix [for]="endDateDP"></mat-datepicker-toggle>
            <mat-datepicker #endDateDP></mat-datepicker>
          </mat-form-field>
        </div>
      </div>
    </form>
  </div>

  <div class="m-0 px-6 py-4 flex items-center justify-end gap-2">
    <button *ngIf="action ==='edit'" mat-stroked-button color="warn" (click)="dialogRef.close({action: 'delete'})">
      <mat-icon>delete</mat-icon> Delete
    </button>
    <button mat-flat-button color="primary" (click)="dialogRef.close({action: 'save', event: eventForm.value})" [disabled]="eventForm.invalid">
      Save
    </button>
  </div>
</div>
```

---

#### 4. Сервис данных и модель: `app-calendar.service.ts` и `event.model.ts`

```typescript
// app-calendar.service.ts: Реактивный сервис управления списком событий
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarEventDB } from '../../shared/inmemory-db/calendarEvents';
import { Observable, of } from 'rxjs';
import { LtemplateCalendarEvent } from '../../shared/models/event.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AppCalendarService {
  public events: LtemplateCalendarEvent[];
  constructor(private http: HttpClient) {}

  public getEvents(): Observable<LtemplateCalendarEvent[]> {
    let eventDB = new CalendarEventDB();
    return of(eventDB.events).pipe(
      map((events) => {
        this.events = events;
        return events;
      })
    );
  }

  public addEvent(event): Observable<LtemplateCalendarEvent[]> {
    this.events.push(event);
    return of(this.events);
  }

  public updateEvent(event): Observable<LtemplateCalendarEvent[]> {
    this.events = this.events.map((e) => {
      if (e._id === event._id) {
        return Object.assign(e, event);
      }
      return e;
    });
    return of(this.events);
  }

  public deleteEvent(eventID: string): Observable<LtemplateCalendarEvent[]> {
    this.events = this.events.filter((e) => e._id !== eventID);
    return of(this.events);
  }
}
```

```typescript
// event.model.ts: Строгая типизация модели событий календаря
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';

export class LtemplateCalendarEvent implements CalendarEvent {
  _id?: string;
  start: Date;
  end?: Date;
  title: string;
  color?: { primary: string; secondary: string };
  actions?: CalendarEventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: { beforeStart?: boolean; afterEnd?: boolean };
  draggable?: boolean;
  meta?: { location: string; notes: string };

  constructor(data?) {
    data = data || {};
    this.start = new Date(data.start) || startOfDay(new Date());
    this.end = data.end ? new Date(data.end) : undefined;
    this._id = data._id || '';
    this.title = data.title || '';
    this.color = {
      primary: data.color && data.color.primary || '#247ba0',
      secondary: data.color && data.color.secondary || '#D1E8FF'
    };
    this.draggable = data.draggable || true;
    this.resizable = {
      beforeStart: data.resizable && data.resizable.beforeStart || true,
      afterEnd: data.resizable && data.resizable.afterEnd || true
    };
    this.actions = data.actions || [];
    this.allDay = data.allDay || false;
    this.cssClass = data.cssClass || '';
    this.meta = {
      location: data.meta && data.meta.location || '',
      notes: data.meta && data.meta.notes || ''
    };
  }
}
```

---

#### 5. Модуль и маршрутизация: `app-calendar.module.ts` и `app-calendar.routing.ts`

```typescript
// app-calendar.module.ts: Модуль компонента календаря с внедрением зависимостей
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ColorPickerModule } from 'ngx-color-picker';
import { AppCalendarComponent } from './app-calendar.component';
import { CalendarRoutes } from "./app-calendar.routing";
import { CalendarFormDialogComponent } from './calendar-form-dialog/calendar-form-dialog.component';
import { AppCalendarService } from './app-calendar.service';

@NgModule({ 
    declarations: [
        AppCalendarComponent,
        CalendarFormDialogComponent
    ], imports: [CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        ColorPickerModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        RouterModule.forChild(CalendarRoutes)], providers: [AppCalendarService, provideHttpClient(withInterceptorsFromDi())] })
export class AppCalendarModule { }
```

```typescript
// app-calendar.routing.ts: Настройка маршрутизации для календаря
import { Routes } from '@angular/router';
import { AppCalendarComponent } from './app-calendar.component';

export const CalendarRoutes: Routes = [{ path: '', component: AppCalendarComponent, data: { title: 'Calendar' } }];
```

---


### ⚡️ Архитектура реактивных сигналов (Angular Signals): `ThemeService`

Сервис `ThemeService` ([`src/app/shared/services/theme.service.ts`](src/app/shared/services/theme.service.ts)) демонстрирует современный подход Angular 20 к управлению реактивным состоянием:

```typescript
import { Injectable, Inject, Renderer2, RendererFactory2, DOCUMENT, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeConfig, THEME_IDS, generateThemeConfig } from '../config/theme-colors';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeConfig = generateThemeConfig();

  // Реактивные сигналы Angular
  private _activeTheme = signal<ThemeConfig>(this.themeConfig[THEME_IDS.NAVY_LIGHT]);
  public readonly activeTheme = this._activeTheme.asReadonly();
  public readonly isDarkMode = computed(() => this._activeTheme().mode === 'dark');
  public readonly currentThemeId = computed(() => this._activeTheme().id);

  // Двусторонний мост к RxJS Observable для обратной совместимости
  public readonly activeThemeObservable$ = toObservable(this._activeTheme);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    private overlayContainer: OverlayContainer
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public setActiveThemeById(themeId: string): void {
    const theme = this.themeConfig[themeId];
    if (theme) {
      this._activeTheme.set(theme);
      this.applyThemeToDOM(theme);
    }
  }
}
```

---

### 🔍 Динамический просмотрщик исходного кода компонентов (`ExampleViewerComponent`)

В системе предусмотрен встроенный механизм демонстрации исходного кода компонентов ([`src/app/shared/components/example-viewer/example-viewer.component.ts`](src/app/shared/components/example-viewer/example-viewer.component.ts)). Он загружает файлы `.html`, `.ts`, `.scss` и подсвечивает синтаксис на лету через директиву `LtemplateHighlightDirective`:

```html
<!-- example-viewer.component.html: Интерактивные вкладки исходного кода HTML / TS / SCSS -->
<div class="example-viewer-tab-wrap">
  <mat-tab-group class="mb-6">
    <mat-tab label="HTML">
      <div class="code-wrap" id="html">
        <pre><code LtemplateHighlight [languages]="['xml']" [path]="componentPath + '.html'"></code></pre>
      </div>
    </mat-tab>
    <mat-tab label="TS">
      <div class="code-wrap" id="ts">
        <pre><code LtemplateHighlight [path]="componentPath + '.ts'"></code></pre>
      </div>
    </mat-tab>
    <mat-tab label="SCSS">
      <div class="code-wrap" id="scss">
        <pre><code LtemplateHighlight [path]="componentPath + '.scss'"></code></pre>
      </div>
    </mat-tab>
  </mat-tab-group>
</div>
```

---



### 📦 Остальные модули и компоненты

Ниже приведен исходный код остальных компонентов и модулей приложения.

#### 📄 `src/app/app.component.html`

```html
<router-outlet></router-outlet>

```

---

#### 📄 `src/app/app.component.spec.ts`

```typescript
describe('AppComponent', () => {
  it('true expect to be true', () => {
    expect(true).toBe(true);
  });
});

```

---

#### 📄 `src/app/app.component.ts`

```typescript
import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RoutePartsService } from './shared/services/route-parts.service';

import { filter } from 'rxjs/operators';
import { UILibIconService } from './shared/services/ui-lib-icon.service';
import { ThemeService } from './shared/services/theme.service';
import { LayoutService } from './shared/services/layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'Ltemplate';
  pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private iconService: UILibIconService,
    private layoutService: LayoutService
  ) {
    iconService.init()
  }

  ngOnInit() {
    this.changePageTitle();
    // this.themeService.applyMatTheme(this.layoutService.layoutConf.matTheme);
  }

  ngAfterViewInit() {
  }

  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }
      // Extract title from parts;
      this.pageTitle = routeParts
                      .reverse()
                      .map((part) => part.title )
                      .reduce((partA, partI) => {return `${partA} > ${partI}`});
      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }
}

```

---

#### 📄 `src/app/app.module.ts`

```typescript
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

// import { GestureConfig } from '@angular/material/core';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from './shared/components/perfect-scrollbar';


import { InMemoryWebApiModule, HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true, delay: 200 }),
    BrowserModule,
    BrowserAnimationsModule,
    // HttpClientModule,
    SharedModule,
    LayoutModule,
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false })],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    // REQUIRED IF YOU USE JWT AUTHENTICATION
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule { }
```

---

#### 📄 `src/app/app.routing.ts`

```typescript
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/analytics',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.routes').then(m => m.SessionsRoutes),
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'material',
        loadChildren: () => import('./views/material-example-view/material-example-view.module').then(m => m.MaterialExampleViewModule),
        data: { title: 'Material', breadcrumb: 'MATERIAL'}
      },
      {
        path: 'dialogs',
        loadChildren: () => import('./views/app-dialogs/app-dialogs.module').then(m => m.AppDialogsModule),
        data: { title: 'Dialogs', breadcrumb: 'DIALOGS'}
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.routes').then(m => m.ProfileRoutes),
        data: { title: 'Profile', breadcrumb: 'PROFILE'}
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule),
        data: { title: 'Tables', breadcrumb: 'TABLES'}
      },
      {
        path: 'tour',
        loadChildren: () => import('./views/app-tour/app-tour.module').then(m => m.AppTourModule),
        data: { title: 'Tour', breadcrumb: 'TOUR'}
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
        data: { title: 'Forms', breadcrumb: 'FORMS'}
      },
      {
        path: 'chart',
        loadChildren: () => import('./views/chart-example-view/chart-example-view.module').then(m => m.ChartExampleViewModule),
        data: { title: 'Charts', breadcrumb: 'CHARTS'}
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/charts.module').then(m => m.AppChartsModule),
        data: { title: 'Charts', breadcrumb: 'CHARTS'}
      },
      {
        path: 'map',
        loadChildren: () => import('./views/map/map.module').then(m => m.AppMapModule),
        data: { title: 'Map', breadcrumb: 'MAP'}
      },
      {
        path: 'inbox',
        loadChildren: () => import('./views/app-inbox/app-inbox.module').then(m => m.AppInboxModule),
        data: { title: 'Inbox', breadcrumb: 'INBOX'}
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/app-calendar/app-calendar.module').then(m => m.AppCalendarModule),
        data: { title: 'Calendar', breadcrumb: 'CALENDAR'}
      },
      {
        path: 'chat',
        loadChildren: () => import('./views/app-chats/app-chats.module').then(m => m.AppChatsModule),
        data: { title: 'Chat', breadcrumb: 'CHAT'}
      },
      {
        path: 'cruds',
        loadChildren: () => import('./views/cruds/cruds.module').then(m => m.CrudsModule),
        data: { title: 'CRUDs', breadcrumb: 'CRUDs'}
      },
      {
        path: 'shop',
        loadChildren: () => import('./views/shop/shop.module').then(m => m.ShopModule),
        data: { title: 'Shop', breadcrumb: 'SHOP'}
      },
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'todo',
        loadChildren: () => import('./views/todo/todo.module').then(m => m.TodoModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule),
        data: { title: 'Orders', breadcrumb: 'Orders'}
      },
      {
        path: 'page-layouts',
        loadChildren: () => import('./views/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
      },
      {
        path: 'session-pages',
        loadChildren: () => import('./views/sessions/sessions.routes').then(m => m.SessionsRoutes),
      },
      {
        path: 'utilities',
        loadChildren: () => import('./views/utilities/utilities.module').then(m => m.UtilitiesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/mat-icons/mat-icons.module').then(m => m.MatIconsModule),
        data: { title: 'Icons', breadcrumb: 'Icons'}
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];


```

---

#### 📄 `src/app/shared/animations/ltemplate-animations.ts`

```typescript
import {
  sequence,
  trigger,
  animate,
  style,
  group,
  query,
  transition,
  animateChild,
  state,
  animation,
  useAnimation,
  stagger,
} from '@angular/animations';

const reusable = animation(
  [
    style({
      opacity: '{{opacity}}',
      transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})',
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*')),
  ],
  {
    params: {
      duration: '200ms',
      delay: '0ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '0',
      z: '0',
    },
  }
);

export const LtemplateAnimations = [
  trigger('animate', [transition('void => *', [useAnimation(reusable)])]),

  trigger('fadeInOut', [
    state(
      '0',
      style({
        opacity: 0,
        display: 'none',
      })
    ),
    state(
      '1',
      style({
        opacity: 1,
        display: 'block',
      })
    ),
    transition('0 => 1', animate('300ms')),
    transition('1 => 0', animate('300ms')),
  ]),
];

```

---

#### 📄 `src/app/shared/components/bottom-sheet-share/bottom-sheet-share.component.html`

```html
<mat-nav-list>
  <mat-list-item>
      <svg class="icon-bottom-sheet icon-facebook">
          <use xlink:href="#icon-facebook" />
      </svg>
      <a mat-list-item href="https://www.facebook.com/sharer.php?u=https://themeforest.net/item/angular-landing-material-design-angular-app-landing-page/21198258">
        <span mat-line>Share on Facebook</span>
      </a>
  </mat-list-item>
  <mat-list-item>
      <svg class="icon-bottom-sheet icon-facebook">
          <use xlink:href="#icon-twitter" />
      </svg>
      <a mat-list-item href="https://twitter.com/intent/tweet?url=https://themeforest.net/item/angular-landing-material-design-angular-app-landing-page/21198258&hashtags=angular,template,landing">
        <span mat-line>Tweet About Us!</span>
      </a>
  </mat-list-item>
  <mat-list-item>
      <svg class="icon-bottom-sheet icon-linkedin">
        <use xlink:href="#icon-linkedin" />
      </svg>
      <a mat-list-item href="https://www.linkedin.com/shareArticle?mini=true&url=https://themeforest.net/item/angular-landing-material-design-angular-app-landing-page/21198258">
        <span mat-line>Share on LinkedIn</span>
      </a>
  </mat-list-item>
</mat-nav-list>

```

---

#### 📄 `src/app/shared/components/bottom-sheet-share/bottom-sheet-share.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-bottom-sheet-share',
    templateUrl: './bottom-sheet-share.component.html',
    styleUrls: ['./bottom-sheet-share.component.scss'],
    standalone: true,
    imports: [CommonModule, MatListModule]
})
export class BottomSheetShareComponent implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetShareComponent>) {}

  ngOnInit() {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
  }
}

```

---

#### 📄 `src/app/shared/components/breadcrumb/breadcrumb.component.html`

```html
<div class="container-dynamic">
  <div
    class="breadcrumb-bar"
    *ngIf="
      layout.layoutConf.useBreadcrumb &&
      layout.layoutConf.breadcrumb === 'simple'
    "
  >
    <ul class="breadcrumb">
      <li *ngFor="let part of routeParts">
        <a routerLink="/{{ part.url }}">{{ part.breadcrumb | translate }}</a>
      </li>
    </ul>
  </div>

  <div
    class="breadcrumb-title"
    *ngIf="
      layout.layoutConf.useBreadcrumb &&
      layout.layoutConf.breadcrumb === 'title'
    "
  >
    <h1 class="bc-title">
      {{ routeParts[routeParts.length - 1]?.breadcrumb | translate }}
    </h1>
    <ul class="breadcrumb" *ngIf="routeParts.length > 1">
      <li *ngFor="let part of routeParts">
        <a routerLink="/{{ part.url }}" class="text-muted">{{
          part.breadcrumb | translate
        }}</a>
      </li>
    </ul>
  </div>
</div>

```

---

#### 📄 `src/app/shared/components/breadcrumb/breadcrumb.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { RoutePartsService } from '../../../shared/services/route-parts.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule]
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  routeParts: any[];
  routerEventSub: Subscription;
  // public isEnabled: boolean = true;
  constructor(
    private router: Router,
    private routePartsService: RoutePartsService,
    private activeRoute: ActivatedRoute,
    public layout: LayoutService
  ) {
    this.routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);

    this.routerEventSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        this.routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
        // generate url from parts
        this.routeParts.reverse().map((item, i) => {
          item.breadcrumb = this.parseText(item);
          item.urlSegments.forEach((urlSegment:any, j: number) => {
            if (j === 0) {
              return (item.url = `${urlSegment.path}`);
            }
            item.url += `/${urlSegment.path}`;
          });
          if (i === 0) {
            return item;
          }
          // prepend previous part to current part
          item.url = `${this.routeParts[i - 1].url}/${item.url}`;
          return item;
        });
      });
  }

  ngOnInit() {}
  ngOnDestroy() {
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  parseText(part:any) {
    if (!part.breadcrumb) {
      return '';
    }
    part.breadcrumb = part.breadcrumb.replace(/{{([^{}]*)}}/g, (a:any, b:any) => {
      const r = part.params[b];
      return typeof r === 'string' ? r : a;
    });
    return part.breadcrumb;
  }
}

```

---

#### 📄 `src/app/shared/components/button-loading/button-loading.component.html`

```html
<button mat-flat-button [color]="color" class="button-loading {{btnClass}}" [type]="type" [disabled]="loading" 
[ngClass]="{
    loading: loading,
    'mat-button': !raised,
    'mat-raised-button': raised
  }">
    <!-- <div class="btn-spinner" *ngIf="loading"></div> -->
    <span *ngIf="!loading">
        <ng-content></ng-content>
    </span>
    <span *ngIf="loading">{{loadingText}}</span>
</button>
```

---

#### 📄 `src/app/shared/components/button-loading/button-loading.component.ts`

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'button-loading',
    templateUrl: './button-loading.component.html',
    styleUrls: ['./button-loading.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule]
})
export class ButtonLoadingComponent implements OnInit {

  @Input('loading') loading: boolean = false;
  @Input('btnClass') btnClass: string = '';
  @Input('raised') raised: boolean = true;
  @Input('loadingText') loadingText = 'Please wait';
  @Input('type') type: 'button' | 'submit' = 'submit';
  @Input('color') color: 'primary' | 'accent' | 'warn' = 'primary';

  constructor() { 
  }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/shared/components/customizer/customizer.component.html`

```html
<div class="handle" *ngIf="!isCustomizerOpen">
  <button mat-fab color="primary" (click)="isCustomizerOpen = true">
    <mat-icon class="spin text-white">settings</mat-icon>
  </button>
</div>
<div id="app-customizer" *ngIf="isCustomizerOpen">
  <mat-card class="p-0">
    <mat-card-title class="m-0 light-gray">
      <div class="card-title-text flex flex-wrap justify-center items-center pl-4 py-3">
        <button class="!mr-4 rtl:ml-4" mat-flat-button [color]="viewMode === 'options' ? 'primary':''"
          (click)="viewMode = 'options'">Options</button>
        <button mat-flat-button [color]="viewMode === 'json' ? 'primary':''" (click)="viewMode = 'json'">Json</button>
        <span class="flex-grow"></span>
        <button class="card-control" mat-icon-button (click)="isCustomizerOpen = false">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </mat-card-title>
    <mat-card-content *ngIf="viewMode === 'json'" class="h-[calc(100vh-90px)]">
      <!-- <pre class="text-muted">{{this.layoutConf | json}}</pre> -->
      <pre><code [LtemplateHighlight]="this.layoutConf | json"></code></pre>
      <div class="flex">
        <span class="flex-grow"></span>
        <a href="https://github.com/andreizav/Ltemplate#readme" target="_blank" mat-mini-fab aria-label="Documentation"><mat-icon>help</mat-icon></a>
      </div>
    </mat-card-content>

    <mat-card-content *ngIf="viewMode === 'options'" class="h-[calc(100vh-90px)]" perfectScrollbar>
      <p><small>Customize the template then copy configuration json.</small></p>
      <div class="!pb-4 mb-4 border-bottom">
        <h6 class="title text-secondary">Layouts</h6>
        <mat-radio-group class="flex flex-col" name="selectedLayout" ngDefaultControl [(ngModel)]="selectedLayout"
          (change)="changeLayoutStyle($event)">
          <mat-radio-button class="!mb-0" [value]="'top'"> Top Navigation </mat-radio-button>
          <mat-radio-button [value]="'side'"> Side Navigation </mat-radio-button>
        </mat-radio-group>
      </div>


      <!-- <div class="!pb-4 mb-4 border-bottom"> -->
      <!-- <h6 class="title text-muted">Header Colors</h6> -->
      <!-- <div class="mb-4">
            <mat-checkbox [(ngModel)]="isTopbarFixed" (change)="toggleTopbarFixed($event)" [disabled]="selectedLayout === 'top'" [value]="selectedLayout !== 'top'">Fixed Header</mat-checkbox>
          </div> -->

      <!-- <div class="colors">
              <div 
              class="color {{c.class}}" 
              *ngFor="let c of customizer.topbarColors"
              (click)="customizer.changeTopbarColor(c)">
              <mat-icon class="active-icon" *ngIf="c.active">check</mat-icon>
            </div>
          </div>   -->
      <!-- </div> -->

      <div class="!pb-4 mb-4 border-bottom">
        <h6 class="title text-secondary">Material Themes</h6>
        <div class="colors grid grid-cols-2 gap-4">
          <div
            class="color flex flex-col items-center {{theme.id === 'Ltemplate-navy' ? 'bg-white text-black' : 'bg-black text-white'}}"
            *ngFor="let theme of themes" (click)="changeTheme(theme)" [style.background]="theme.primaryColor">
            <div class="flex flex-col items-center flex-grow justify-center h-full">
              <!-- <mat-icon class="active-icon" *ngIf="isThemeActive(theme)">check</mat-icon> -->
              <span class="theme-name text-xs py-1 px-2 rounded mt-1">{{theme.name}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="!pb-4 mb-4 border-bottom">
        <h6 class="title text-secondary">Sidebar colors</h6>
        <div class="colors">
          <div class="color {{c.class}} bg-sidebar-bg" *ngFor="let c of customizer.sidebarColors"
            (click)="customizer.changeSidebarColor(c)">
            <mat-icon class="active-icon" *ngIf="c.active">check</mat-icon>
          </div>
        </div>
      </div>

      <div class="!pb-4 mb-4 border-bottom">
        <h6 class="title text-secondary">Breadcrumb</h6>
        <div class="mb-4">
          <mat-checkbox name="useBreadcrumb" ngDefaultControl [(ngModel)]="layoutConf.useBreadcrumb"
            (change)="toggleBreadcrumb($event)">Use breadcrumb</mat-checkbox>
        </div>
        <small class="text-muted block !mb-2">Breadcrumb types</small>
        <mat-radio-group class="flex flex-col" name="breadcrumb" ngDefaultControl [(ngModel)]="layoutConf.breadcrumb"
          [disabled]="!layoutConf.useBreadcrumb">
          <mat-radio-button class="" [value]="'simple'"> Simple </mat-radio-button>
          <mat-radio-button [value]="'title'"> Simple with title </mat-radio-button>
        </mat-radio-group>
      </div>

      <div class="!pb-4 border-bottom">
        <h6 class="title text-secondary">Navigation</h6>
        <mat-radio-group class="flex flex-col" [(ngModel)]="selectedMenu" name="selectedMenu" ngDefaultControl
          (change)="changeSidenav($event)" [disabled]="selectedLayout === 'top'">
          <mat-radio-button class="" *ngFor="let type of sidenavTypes" [value]="type.value">
            {{type.name}}
          </mat-radio-button>
        </mat-radio-group>
      </div>

      <div class="!pb-4 border-bottom">
        <mat-checkbox name="topbarFixed" ngDefaultControl [(ngModel)]="layoutConf.topbarFixed"
          (change)="toggleTopbarFixed($event)">Fixed Header</mat-checkbox>
      </div>

      <div class="!pb-4">
        <mat-checkbox name="isRTL" ngDefaultControl [(ngModel)]="isRTL" (change)="toggleDir($event)">RTL</mat-checkbox>
      </div>
    </mat-card-content>
  </mat-card>
</div>
```

---

#### 📄 `src/app/shared/components/customizer/customizer.component.scss`

```scss
.handle {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 999;

  button.mat-mdc-fab,
  button {
    background-color: rgb(var(--color-primary, 15, 23, 76)) !important;
    color: #ffffff !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.2) !important;
    border: none !important;

    mat-icon {
      color: #ffffff !important;
      fill: #ffffff !important;
    }
  }
}

#app-customizer {
  position: fixed;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
  width: 350px;
  max-width: calc(100% - 60px);
  background-color: rgb(var(--bg-card, 255, 255, 255)) !important;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.25) !important;
  border-left: 1px solid rgba(var(--fg-divider, 226, 232, 240), 0.7) !important;
  border-radius: 16px 0 0 0;
  overflow: hidden;

  .title {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 13px;
  }
  .mat-mdc-card,
  .mat-card,
  mat-card {
    background-color: rgb(var(--bg-card, 255, 255, 255)) !important;
    color: rgb(var(--fg-base, 15, 23, 42)) !important;
    border-radius: 16px 0 0 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    border: none !important;

    .mat-mdc-card-title,
    .mat-card-title {
      background: rgba(var(--bg-hover, 241, 245, 249), 0.95) !important;
      border-bottom: 1px solid rgba(var(--fg-divider, 226, 232, 240), 0.7) !important;
      border-radius: 16px 0 0 0;
      color: rgb(var(--fg-base, 15, 23, 42)) !important;
      .card-title-text {
        font-size: .875rem;
      }
      .card-control {
        position: relative;
        top: -4px;
        color: rgb(var(--fg-base, 15, 23, 42)) !important;
      }
    }
    .mat-mdc-card-content,
    .mat-card-content {
      padding: 1rem 1.5rem;
      background-color: rgb(var(--bg-card, 255, 255, 255)) !important;
      color: rgb(var(--fg-base, 15, 23, 42)) !important;
    }
  }
  .colors {
    padding: 1rem 0 .5rem;
  }
  .color {
    position: relative;
    display: inline-block;
    margin: 8px;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.14),
                0 2px 2px 0 rgba(0,0,0,.12),
                0 1px 5px 0 rgba(0,0,0,.2);
    transition: all .3s ease;

    &:hover {
      box-shadow: 0 4px 5px -2px rgba(0,0,0,.14),
                  0 7px 10px 1px rgba(0,0,0,.12),
                  0 2px 16px 1px rgba(0,0,0,.2);
    }
    
    .active-icon {
      position: absolute;
      top: 20px;
      left: 50%;
      color: white;
      transform: translateX(-50%);
    }
    
    .theme-name {
      opacity: 0.9;
      transition: opacity .2s ease;
    }
    
    &:hover .theme-name {
      opacity: 1;
    }
  }

  .mat-radio-group {
    width: 100%;
    .mat-radio-button {
      display: block;
      margin-bottom: 10px;
    }
  }

  .photos {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -4px;
  }
  .photo {
    display: flex;
    width: calc(100% / 3);
    justify-content: center;
    align-items: center;
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .photo img {
    height: 88px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.14), 0px 2px 2px 0px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  }
  .photo.active {
    transform: scale(0.9);
  }
}
.pos-rel {
  position: relative;
  z-index: 99;
  .olay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 100;
  }
}

.colors {
  display: flex;
  flex-wrap: wrap;
  .color {
    position: relative;
    width: 36px;
    height: 36px;
    display: inline-block;
    border-radius: 50%;
    margin: 8px;
    text-align: center;
    box-shadow: 0 4px 20px 1px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.03);
    cursor: pointer;
    .active-icon {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 6px;
    }
  }
}

.border-bottom {
  border-bottom: 1px solid rgba(0,0,0,.08);
}

.spin {
  animation: spin 2s infinite linear;
}

@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(359deg);}
}

// [dir="rtl"] {
//   .handle {}
//   #app-customizer {
//     right: auto;
//     left: 0;
//   }
// }
```

---

#### 📄 `src/app/shared/components/customizer/customizer.component.ts`

```typescript
import { Component, OnInit, OnDestroy, Input, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../../shared/services/navigation.service';
import { LayoutService, ILayoutConf } from '../../../shared/services/layout.service';
import { CustomizerService } from 'app/shared/services/customizer.service';
import { ThemeService } from 'app/shared/services/theme.service';
import { AppTheme } from 'app/shared/models/app-theme.model';
import { PerfectScrollbarModule } from '../../components/perfect-scrollbar/perfect-scrollbar.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-customizer',
    templateUrl: './customizer.component.html',
    styleUrls: ['./customizer.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatRadioModule,
      MatCheckboxModule,
      MatSlideToggleModule,
      MatCardModule,
      MatExpansionModule,
      MatTabsModule,
      MatIconModule,
      PerfectScrollbarModule,
      SharedDirectivesModule
    ]
})
export class CustomizerComponent implements OnInit, OnDestroy {
  isCustomizerOpen = false;
  viewMode: 'options' | 'json' = 'options';
  sidenavTypes = [
    {
      name: 'Default Menu',
      value: 'default-menu',
    },
    {
      name: 'Separator Menu',
      value: 'separator-menu',
    },
    {
      name: 'Icon Menu',
      value: 'icon-menu',
    },
  ];
  sidebarColors: any[] = [];
  topbarColors: any[] = [];

  layoutConf: ILayoutConf = {};
  private layoutSub: Subscription;
  selectedMenu = 'icon-menu';
  selectedLayout: string = '';
  isTopbarFixed = false;
  isFooterFixed = false;
  isRTL = false;
  themes: any[] = [];
  activeTheme: any;

  constructor(
    private navService: NavigationService,
    public layout: LayoutService,
    private themeService: ThemeService,
    public customizer: CustomizerService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.selectedLayout = this.layoutConf.navigationPos || '';
    this.isTopbarFixed = !!this.layoutConf.topbarFixed;
    this.isRTL = this.layoutConf.dir === 'rtl';
    this.themes = this.themeService.getAvailableThemes();
    this.activeTheme = this.themeService.getActiveTheme();
    this.layoutSub = this.layout.layoutConf$.subscribe(layoutConf => {
      this.layoutConf = layoutConf;
      this.selectedLayout = layoutConf.navigationPos || '';
      this.isTopbarFixed = !!layoutConf.topbarFixed;
      this.isRTL = layoutConf.dir === 'rtl';
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }
  
  changeTheme(theme: AppTheme) {
    this.themeService.setActiveThemeById(theme.id);
    this.layout.publishLayoutChange({ matTheme: theme.id });
  }
  
  isThemeActive(theme: AppTheme): boolean {
    return theme.id === this.activeTheme.id;
  }
  
  changeLayoutStyle(data: any) {
    this.layout.publishLayoutChange({ navigationPos: this.selectedLayout });
  }
  changeSidenav(data: any) {
    this.navService.publishNavigationChange(data.value);
  }
  toggleBreadcrumb(data: any) {
    this.layout.publishLayoutChange({ useBreadcrumb: data.checked });
  }
  toggleTopbarFixed(data: any) {
    this.layout.publishLayoutChange({ topbarFixed: data.checked });
  }
  toggleDir(data: any) {
    let dir = data.checked ? 'rtl' : 'ltr';
    this.layout.publishLayoutChange({ dir: dir });
  }

}


```

---

#### 📄 `src/app/shared/components/divider/divider.component.html`

```html
<div class="divider-container {{ class }}">
  <hr class="divider-line">
  <span class="divider-text">{{ text }}</span>
  <hr class="divider-line">
</div> 
```

---

#### 📄 `src/app/shared/components/divider/divider.component.scss`

```scss
.divider-container {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: rgb(var(--fg-divider));
  border: none;
  margin: 0;
}

.divider-text {
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  color: rgb(var(--fg-hint));
  text-transform: uppercase;
} 
```

---

#### 📄 `src/app/shared/components/divider/divider.component.ts`

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Ltemplate-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DividerComponent {
  @Input() text: string = 'OR';
  @Input() class: string = '';
} 
```

---

#### 📄 `src/app/shared/components/example-viewer/example-viewer.component.html`

```html
<div class="Ltemplate-card overflow-hidden">
  <mat-accordion multi="true" displayMode="flat" class="Ltemplate-example-viewer-accordion">
    <mat-expansion-panel>
      <mat-expansion-panel-header collapsedHeight="48px" expandedHeight="48px" class="light-gray Ltemplate-example-viewer-header">
        <mat-panel-title>
          {{data?.title}} 
        </mat-panel-title>
        <button mat-stroked-button color="warn" ><mat-icon>code</mat-icon> View Code</button>
      </mat-expansion-panel-header>
  
      <div class="example-viewer-tab-wrap">
        <mat-tab-group class="mb-6">
          <mat-tab label="HTML">
            <div class="code-wrap" id="html">
                <pre><code LtemplateHighlight [languages]="['xml']" [path]="componentPath +'.html'"></code></pre>
            </div>
          </mat-tab>
          <mat-tab label="TS">
              <div class="code-wrap" id="ts">
                <pre><code LtemplateHighlight [path]="componentPath+'.ts'"></code></pre>
              </div>
          </mat-tab>
          <mat-tab label="SCSS">
            <div class="code-wrap" id="scss">
                <pre><code LtemplateHighlight [path]="componentPath+'.scss'"></code></pre>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </mat-expansion-panel>
  
    <mat-expansion-panel expanded style="position: relative;">
      <div class="example-component !pt-4">
        <div #exampleContainer></div>
      </div>
    </mat-expansion-panel>
  </mat-accordion>
</div>


```

---

#### 📄 `src/app/shared/components/example-viewer/example-viewer.component.ts`

```typescript
import { Component, OnInit, Input, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, OnDestroy, ComponentRef } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedDirectivesModule } from '../../directives/shared-directives.module';

@Component({
    selector: "Ltemplate-example-viewer",
    templateUrl: "./example-viewer.component.html",
    styleUrls: ["./example-viewer.component.scss"],
    standalone: true,
    imports: [
      CommonModule,
      MatExpansionModule,
      MatButtonModule,
      MatIconModule,
      MatTabsModule,
      SharedDirectivesModule
    ]
})
export class LtemplateExampleViewerComponent implements OnInit, AfterViewInit, OnDestroy {

  private _exampleId: string;
  exampleViewRef: ComponentRef<any>;
  componentPath: string;

  // Component ID
  @Input("exampleId")
  set exampleId(exampleId: string) {
    if (exampleId) {
      this._exampleId = exampleId;
    } else {
      console.log("EXAMPLE ID MISSING");
    }
  }
  // Title and component Ref
  @Input('data') data: any;

  // Component Directory path
  @Input('path') path: any;

  get exampleId(): string {
    return this._exampleId;
  }

  @ViewChild('exampleContainer', { read: ViewContainerRef }) exampleContainer: ViewContainerRef

  constructor(
    private cfr: ComponentFactoryResolver
  ) { 

  }

  ngOnInit() {
    this.componentPath = this.path + this.exampleId + '/' + this.exampleId + '.component';
  }
  ngAfterViewInit() {
    if(!this.data) {
      console.log('EXAMPLE COMPONENT MISSING');
      return;
    }
    let componentFactory = this.cfr.resolveComponentFactory(this.data.component);
    this.exampleViewRef = this.exampleContainer.createComponent(componentFactory);
  }
  ngOnDestroy() {
    if(this.exampleViewRef) {
      this.exampleViewRef.destroy();
    }
  }


}

```

---

#### 📄 `src/app/shared/components/example-viewer-template/example-viewer-template.component.html`

```html
<div class="m-3">
  <div *ngFor="let example of examples" class="mb-6">
    <Ltemplate-example-viewer [exampleId]="example" [path]="componentDirPath" [data]="exampleComponents[example]"></Ltemplate-example-viewer>
  </div>
</div>
```

---

#### 📄 `src/app/shared/components/example-viewer-template/example-viewer-template.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LtemplateExampleViewerComponent } from '../example-viewer/example-viewer.component';

@Component({
    selector: 'Ltemplate-example-viewer-template',
    templateUrl: './example-viewer-template.component.html',
    styleUrls: ['./example-viewer-template.component.scss'],
    standalone: true,
    imports: [CommonModule, LtemplateExampleViewerComponent]
})
export class LtemplateExampleViewerTemplateComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  id: string;
  examples: any[];
  exampleComponents: any = {};
  title: string;
  componentDirPath: string;

  constructor(private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    combineLatest(this.route.params, this.route.data)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(([params, data]) => {
      this.id = params['id'];
      this.examples = data.map[this.id];
      this.exampleComponents = data.components;
      this.componentDirPath = data.path;

      const title = this.id.replace('-', ' ');
      this.title = title.charAt(0).toUpperCase() + title.substring(1);
      // console.log(params, data);
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
  }
}

```

---

#### 📄 `src/app/shared/components/footer/footer.component.html`

```html
<footer class="px-3 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between">
</footer>

```

---

#### 📄 `src/app/shared/components/footer/footer.component.scss`

```scss
.main-footer {
    padding: 0 1rem;
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-height: 64px;
    }
    .navigation-top & {
      margin: 0 -1rem -.333rem;
    }
  }
```

---

#### 📄 `src/app/shared/components/footer/footer.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/shared/components/header-side/header-side.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderSideComponent } from './header-side.component';
import { LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services/theme.service';
import { TranslateModule } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderSideComponent', () => {
  let component: HeaderSideComponent;
  let fixture: ComponentFixture<HeaderSideComponent>;
  let layoutService: LayoutService;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let jwtAuthServiceSpy: jasmine.SpyObj<JwtAuthService>;

  beforeEach(async () => {
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['getAvailableThemes', 'getActiveTheme', 'setActiveThemeById']);
    themeServiceSpy.getAvailableThemes.and.returnValue([{ id: 'Ltemplate-navy', name: 'Navy', mode: 'light' }]);
    themeServiceSpy.getActiveTheme.and.returnValue({ id: 'Ltemplate-navy', name: 'Navy', mode: 'light' });

    jwtAuthServiceSpy = jasmine.createSpyObj('JwtAuthService', ['signout']);

    await TestBed.configureTestingModule({
      imports: [HeaderSideComponent, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        LayoutService,
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: JwtAuthService, useValue: jwtAuthServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();

    layoutService = TestBed.inject(LayoutService);
    fixture = TestBed.createComponent(HeaderSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize layoutConf with full sidebar', () => {
    expect(component).toBeTruthy();
    expect(component.layoutConf.sidebarStyle).toBe('full');
  });

  it('should close sidebar when toggleSidenav is called from full state, and reopen when called again', () => {
    // Initial state is full
    expect(layoutService.layoutConf.sidebarStyle).toBe('full');

    // First toggle: full -> closed
    component.toggleSidenav();
    expect(layoutService.layoutConf.sidebarStyle).toBe('closed');
    expect(component.layoutConf.sidebarStyle).toBe('closed');

    // Second toggle: closed -> full (reopen)
    component.toggleSidenav();
    expect(layoutService.layoutConf.sidebarStyle).toBe('full');
    expect(component.layoutConf.sidebarStyle).toBe('full');
  });

  it('should toggle collapse between compact and full styles', () => {
    // Starting from full
    expect(layoutService.layoutConf.sidebarStyle).toBe('full');

    // Toggle collapse: full -> compact
    component.toggleCollapse();
    expect(layoutService.layoutConf.sidebarStyle).toBe('compact');
    expect(layoutService.layoutConf.sidebarCompactToggle).toBe(true);

    // Toggle collapse: compact -> full
    component.toggleCollapse();
    expect(layoutService.layoutConf.sidebarStyle).toBe('full');
    expect(layoutService.layoutConf.sidebarCompactToggle).toBe(false);
  });
});

```

---

#### 📄 `src/app/shared/components/header-side/header-side.component.ts`

```typescript
import { Component, OnInit, OnDestroy, EventEmitter, Input, ViewChildren, Output, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { commonMaterialModules } from '../../material-imports';
import { ThemeService } from '../../services/theme.service';
import { LayoutService, ILayoutConf } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { SearchModule } from '../../search/search.module';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header-side',
    templateUrl: './header-side.template.html',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      ...commonMaterialModules,
      TranslateModule,
      SearchModule
    ]
})
export class HeaderSideComponent implements OnInit, OnDestroy {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'es'
  }];
  currentLang = this.availableLangs[0];

  public themes: any[] = [];
  public activeTheme: any;
  private layoutSub: Subscription;

  public get layoutConf(): ILayoutConf {
    return this.layout.layoutConf;
  }

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    this.themes = this.themeService.getAvailableThemes();
    this.activeTheme = this.themeService.getActiveTheme();
    this.layoutSub = this.layout.layoutConf$.subscribe(() => {
      this.cdr.markForCheck();
    });
    this.translate.use(this.currentLang.code);
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }

  changeTheme(themeId: string) {
    this.themeService.setActiveThemeById(themeId);
  }

  toggleNotific() {
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.layout.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  toggleCollapse() {
    // compact --> full
    if (this.layout.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      });
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    });
  }

  onSearch(e) {
    //   console.log(e)
  }
}


```

---

#### 📄 `src/app/shared/components/header-side/header-side.template.html`

```html
<mat-toolbar class="topbar flex bg-card">
  <!-- Sidenav toggle button -->
  <button *ngIf="layoutConf.sidebarStyle !== 'compact'" mat-icon-button id="sidenavToggle" (click)="toggleSidenav()"
    matTooltip="Toggle Hide/Open">
    <mat-icon>menu</mat-icon>
  </button>

  <span class="flex-grow"></span>
  <!-- Language Switcher -->
  <button mat-button [matMenuTriggerFor]="menu">
    <span class="fi fi-{{currentLang.flag}} mr-2 rtl:ml-2"></span>
    <span>{{currentLang.name}}</span>
  </button>
  <mat-menu #menu="matMenu">
    <button mat-menu-item *ngFor="let lang of availableLangs" (click)="setLang(lang)">
      <span class="fi mr-2 rtl:ml-2 fi-{{lang.flag}}"></span>
      <span>{{lang.name}}</span>
    </button>
  </mat-menu>


  <Ltemplate-search-input-over placeholder="Country (e.g. US)" resultPage="/search"></Ltemplate-search-input-over>
  <!-- Open "views/search-view/result-page.component" to know more about subscribing to input field value -->

  <!-- Notification toggle button -->
  <button mat-icon-button matTooltip="Notifications" (click)="toggleNotific()" [style.overflow]="'visible'"
    class="">
    <mat-icon>notifications</mat-icon>
    <span class="notification-number mat-bg-warn">3</span>
  </button>
  <!-- Top left user menu -->
  <button mat-icon-button [matMenuTriggerFor]="accountMenu" class="">
    <img src="assets/images/face-7.jpg" alt="" class="!w-6 !h-6 rounded-full" />
  </button>

  <mat-menu #accountMenu="matMenu">
    <button mat-menu-item [routerLink]="['/profile/overview']">
      <mat-icon>account_box</mat-icon>
      <span>Profile</span>
    </button>
    <button mat-menu-item [routerLink]="['/profile/settings']">
      <mat-icon>settings</mat-icon>
      <span>Account Settings</span>
    </button>
    <button mat-menu-item>
      <mat-icon>notifications_off</mat-icon>
      <span>Disable alerts</span>
    </button>
    <button mat-menu-item (click)="jwtAuth.signout()">
      <mat-icon>exit_to_app</mat-icon>
      <span>{{ "SIGNOUT" | translate }}</span>
    </button>
  </mat-menu>
</mat-toolbar>
```

---

#### 📄 `src/app/shared/components/header-top/header-top.component.html`

```html
<div class="header-topnav py-3">
  <div class="container">
    <div class="topnav flex">
      <!-- App Logo -->
      <div class="topbar-branding">
        <a routerLink="/dashboard/analytics" class="cursor-pointer flex items-center">
          <img src="assets/images/ltemplate.svg" alt="Ltemplate" class="app-logo">
        </a>
      </div>

      <ul class="menu" *ngIf="!layoutConf.isMobile">
        <li *ngFor="let item of menuItems; let i = index;">
          <div *ngIf="item.type !== 'separator'" routerLinkActive="open">
            <a matRipple routerLink="/{{item.state}}" *ngIf="item.type === 'link'">
              <mat-icon>{{item.icon}}</mat-icon>
              {{item.name | translate}}
            </a>
            <div *ngIf="item.type === 'dropDown'">
              <label matRipple for="drop-{{i}}" class="toggle"><mat-icon>{{item.icon}}</mat-icon> {{item.name |
                translate}}</label>
              <a matRipple><mat-icon>{{item.icon}}</mat-icon> {{item.name | translate}}</a>
              <input type="checkbox" id="drop-{{i}}" />
              <ul>
                <li *ngFor="let itemLvL2 of item.sub; let j = index;" routerLinkActive="open">
                  <a matRipple routerLink="{{item.state ? '/'+item.state : ''}}/{{itemLvL2.state}}"
                    *ngIf="itemLvL2.type !== 'dropDown'">
                    <mat-icon *ngIf="itemLvL2.icon">{{itemLvL2.icon}}</mat-icon>
                    {{itemLvL2.name | translate}}
                  </a>

                  <div *ngIf="itemLvL2.type === 'dropDown'">
                    <label matRipple for="drop-{{i}}{{j}}" class="toggle">{{itemLvL2.name | translate}}</label>
                    <a matRipple><mat-icon *ngIf="itemLvL2.icon">{{itemLvL2.icon}}</mat-icon> {{itemLvL2.name |
                      translate}}</a>
                    <input type="checkbox" id="drop-{{i}}{{j}}" />
                    <!-- Level 3 -->
                    <ul>
                      <li *ngFor="let itemLvL3 of itemLvL2.sub" routerLinkActive="open">
                        <a matRipple
                          routerLink="{{item.state ? '/'+item.state : ''}}{{itemLvL2.state ? '/'+itemLvL2.state : ''}}/{{itemLvL3.state}}">
                          <mat-icon *ngIf="itemLvL3.icon">{{itemLvL3.icon}}</mat-icon>
                          {{itemLvL3.name | translate}}
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <span class="flex-grow"></span>
      <!-- End Navigation -->

      <!-- Language Switcher -->
      <button mat-button [matMenuTriggerFor]="menu">
        <span class="fi fi-{{currentLang.flag}} mr-2 rtl:ml-2"></span>
        <span>{{currentLang.name}}</span>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item *ngFor="let lang of availableLangs" (click)="setLang(lang)">
          <span class="fi mr-2 rtl:ml-2 fi-{{lang.flag}}"></span>
          <span>{{lang.name}}</span>
        </button>
      </mat-menu>
      <!-- Notification toggle button -->
      <button mat-icon-button matTooltip="Notifications" (click)="toggleNotific()" [style.overflow]="'visible'"
        class="">
        <mat-icon>notifications</mat-icon>
        <span class="notification-number mat-bg-warn">3</span>
      </button>
      <!-- Top left user menu -->
      <button mat-icon-button [matMenuTriggerFor]="accountMenu" class="mr-4 rtl:ml-4 img-button">
        <img src="assets/images/face-7.jpg" alt="" class="rounded-full">
      </button>
      <mat-menu #accountMenu="matMenu">
        <button mat-menu-item [routerLink]="['/profile/overview']">
          <mat-icon>account_box</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item [routerLink]="['/profile/settings']">
          <mat-icon>settings</mat-icon>
          <span>Account Settings</span>
        </button>
        <button mat-menu-item>
          <mat-icon>notifications_off</mat-icon>
          <span>Disable alerts</span>
        </button>
        <button mat-menu-item (click)="jwtAuth.signout()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Sign out</span>
        </button>
      </mat-menu>
      <!-- Mobile screen menu toggle -->
      <button mat-icon-button class="mr-4 rtl:ml-4" (click)="toggleSidenav()" *ngIf="layoutConf.isMobile">
        <mat-icon>menu</mat-icon>
      </button>

    </div>
  </div>
</div>
```

---

#### 📄 `src/app/shared/components/header-top/header-top.component.ts`

```typescript
import { Component, OnInit, Input, OnDestroy, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutService, ILayoutConf } from '../../services/layout.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { commonMaterialModules } from 'app/shared/material-imports';

@Component({
    selector: 'app-header-top',
    templateUrl: './header-top.component.html',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      ...commonMaterialModules,
      TranslateModule
    ]
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  private layoutSub: Subscription;
  menuItems:any;
  menuItemSub: Subscription;
  themes: any[] = [];
  activeTheme: any;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'es'
  }];
  currentLang = this.availableLangs[0];

  public get layoutConf(): ILayoutConf {
    return this.layout.layoutConf;
  }

  @Input() notificPanel;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    public translate: TranslateService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    public jwtAuth: JwtAuthService
  ) { }

  ngOnInit() {
    this.layoutSub = this.layout.layoutConf$.subscribe(() => {
      this.cdr.markForCheck();
    });
    this.themes = this.themeService.getAvailableThemes();
    this.activeTheme = this.themeService.getActiveTheme();
    this.translate.use(this.currentLang.code);
    this.menuItemSub = this.navService.menuItems$
    .subscribe(res => {
      res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
      let limit = 4
      let mainItems:any[] = res.slice(0, limit)
      if(res.length <= limit) {
        return this.menuItems = mainItems
      }
      let subItems:any[] = res.slice(limit, res.length - 1)
      mainItems.push({
        name: 'More',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems
      })
      this.menuItems = mainItems
    })
  }
  ngOnDestroy() {
    if (this.menuItemSub) {
      this.menuItemSub.unsubscribe();
    }
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme: any) {
    this.themeService.setActiveThemeById(theme.id);
    this.layout.publishLayoutChange({matTheme: theme.id});
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layout.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }
}

```

---

#### 📄 `src/app/shared/components/layouts/admin-layout/admin-layout.component.html`

```html
<mat-progress-bar mode="indeterminate" class="!absolute top-0 left-0 right-0 z-[1000] invisible" [ngClass]="{'!visible': isModuleLoading}"></mat-progress-bar>

<!-- Render either horizontal or vertical layout based on navigationPos -->
<app-horizontal-layout *ngIf="layoutConf.navigationPos === 'top'"></app-horizontal-layout>
<app-vertical-layout *ngIf="layoutConf.navigationPos === 'side'"></app-vertical-layout>

<!-- Only for demo purpose -->
<!-- Remove this from your production version -->
<app-customizer></app-customizer> 
```

---

#### 📄 `src/app/shared/components/layouts/admin-layout/admin-layout.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { LayoutService } from '../../../services/layout.service';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';
import { CustomizerComponent } from '../../customizer/customizer.component';
import { HorizontalLayoutComponent } from '../horizontal-layout/horizontal-layout.component';
import { VerticalLayoutComponent } from '../vertical-layout/vertical-layout.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      HorizontalLayoutComponent,
      VerticalLayoutComponent,
      CustomizerComponent,
      MatProgressBarModule
    ]
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private layoutConfSub: Subscription;
  private moduleLoaderSub: Subscription;
  public layoutConf: any = {};
  public isModuleLoading: Boolean = false;
  
  constructor(
    private layout: LayoutService,
    private router: Router,
    private jwtAuth: JwtAuthService
  ) {
    // Check Auth Token is valid
    this.jwtAuth.checkTokenIsValid().subscribe();
  }

  ngOnInit() {
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
      this.layoutConf = layoutConf;
    });
     // FOR MODULE LOADER FLAG
     this.moduleLoaderSub = this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.isModuleLoading = true;
        console.log('NavigationStart');
      }
      if(event instanceof NavigationEnd) {
        this.isModuleLoading = false;
        console.log('NavigationEnd');
      }
    });
  }
  
  ngOnDestroy() {
    if(this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
  }
}

```

---

#### 📄 `src/app/shared/components/layouts/auth-layout/auth-layout.component.html`

```html
<router-outlet></router-outlet>
```

---

#### 📄 `src/app/shared/components/layouts/auth-layout/auth-layout.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    public translate: TranslateService,
  ) { 
    // Translator init
    const browserLang: string = translate.getBrowserLang() || 'en';
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/shared/components/layouts/horizontal-layout/horizontal-layout.component.html`

```html
<div class="app-admin-wrap" [dir]='layoutConf?.dir'>
  <!-- Header for top navigation layout -->
  <app-header-top [notificPanel]="notificationPanel"></app-header-top>
  
  <!-- Main Container -->
  <mat-sidenav-container 
    [dir]='layoutConf.dir'
    class="app-admin-container app-side-nav-container mat-drawer-transition"
    [ngClass]="adminContainerClasses">
    <mat-sidenav-content>
      <!-- Top navigation layout (navigation for mobile screen) -->
      <app-sidebar-top *ngIf="layoutConf.isMobile"></app-sidebar-top>

      <!-- App content -->
      <div class="main-content-wrap" id="main-content-wrap" [perfectScrollbar]="scrollConfig" [disabled]="layoutConf.topbarFixed || !layoutConf.perfectScrollbar">
        <div class="rightside-content-hold" id="rightside-content-hold" [perfectScrollbar]="scrollConfig" [disabled]="!layoutConf.topbarFixed || !layoutConf.perfectScrollbar">
          <!-- View Loader -->
          <div class="view-loader flex flex-col items-center justify-center" *ngIf="isModuleLoading" style="position:fixed;">
            <div class="spinner">
              <div class="double-bounce1 mat-bg-accent"></div>
              <div class="double-bounce2 mat-bg-primary"></div>
            </div>
          </div>
          <!-- Breadcrumb -->
          <app-breadcrumb></app-breadcrumb>
          <!-- View outlet -->
          <div class="container-dynamic">
            <router-outlet></router-outlet>
          </div>
          <span class="m-auto" *ngIf="!layoutConf.footerFixed"></span>
          <app-footer *ngIf="!layoutConf.footerFixed"></app-footer>
        </div>
        <span class="m-auto" *ngIf="layoutConf.footerFixed"></span>
        <app-footer *ngIf="layoutConf.footerFixed"></app-footer>
      </div>
      
      <!-- View overlay for mobile navigation -->
      <div class="sidebar-backdrop"
        [ngClass]="{'visible': layoutConf.sidebarStyle !== 'closed' && layoutConf.isMobile}"
        (click)="closeSidebar()">
      </div>
    </mat-sidenav-content>

    <!-- Notification bar -->
    <mat-sidenav #notificationPanel mode="over" class="" position="end">
      <div class="nofication-panel">
        <app-notifications [notificPanel]="notificationPanel"></app-notifications>
      </div>
    </mat-sidenav>
    
    <ltemplate-notifications2></ltemplate-notifications2>
  </mat-sidenav-container>
</div> 
```

---

#### 📄 `src/app/shared/components/layouts/horizontal-layout/horizontal-layout.component.ts`

```typescript
import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { LayoutService } from '../../../services/layout.service';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderTopComponent } from '../../header-top/header-top.component';
import { SidebarTopComponent } from '../../sidebar-top/sidebar-top.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LtemplateNotifications2Component } from '../../ltemplate-notifications2/ltemplate-notifications2.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PerfectScrollbarModule, PerfectScrollbarDirective } from '../../../components/perfect-scrollbar';

@Component({
  selector: 'app-horizontal-layout',
  templateUrl: './horizontal-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    FooterComponent,
    HeaderTopComponent,
    SidebarTopComponent,
    NotificationsComponent,
    LtemplateNotifications2Component,
    MatSidenavModule,
    PerfectScrollbarModule
  ]
})
export class HorizontalLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;

  public scrollConfig = {}
  public layoutConf: any = {};
  public adminContainerClasses: any = {};
  
  constructor(
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private jwtAuth: JwtAuthService
  ) {
    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((routeChange: NavigationEnd) => {
      this.layout.adjustLayout({ route: routeChange.url });
      this.scrollToTop();
    });
  }

  ngOnInit() {
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
      this.layoutConf = layoutConf;
      this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
      this.cdr.markForCheck();
    });

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.isModuleLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }
  
  ngAfterViewInit() {}
  
  scrollToTop() {
    if(document) {
      setTimeout(() => {
        let element;
        if(this.layoutConf.topbarFixed) {
          element = <HTMLElement>document.querySelector('#rightside-content-hold');
        } else {
          element = <HTMLElement>document.querySelector('#main-content-wrap');
        }
        element.scrollTop = 0;
      });
    }
  }

  ngOnDestroy() {
    if(this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if(this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if(this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  updateAdminContainerClasses(layoutConf) {
    return {
      'navigation-top': true,
      'sidebar-compact': layoutConf.sidebarStyle === 'compact' && layoutConf.isMobile,
      'sidebar-closed': layoutConf.sidebarStyle === 'closed' && layoutConf.isMobile,
      'fixed-topbar': layoutConf.topbarFixed
    };
  }
} 
```

---

#### 📄 `src/app/shared/components/layouts/vertical-layout/vertical-layout.component.html`

```html
<div class="app-admin-wrap" [dir]='layoutConf?.dir'>
  <!-- Main Container -->
  <mat-sidenav-container 
    [dir]='layoutConf.dir'
    class="app-admin-container app-side-nav-container mat-drawer-transition"
    [ngClass]="adminContainerClasses">
    <mat-sidenav-content>
      <!-- SIDEBAR -->
      <app-sidebar-side
        (mouseenter)="sidebarMouseenter($event)"
        (mouseleave)="sidebarMouseleave($event)"
      ></app-sidebar-side>
      
      <!-- App content -->
      <div class="main-content-wrap" id="main-content-wrap">
        <!-- Header for side navigation layout -->
        <app-header-side *ngIf="layoutConf.topbarFixed" [notificPanel]="notificationPanel"></app-header-side>

        <div class="rightside-content-hold" id="rightside-content-hold">
          <app-header-side *ngIf="!layoutConf.topbarFixed" [notificPanel]="notificationPanel"></app-header-side>

          <!-- Breadcrumb -->
          <app-breadcrumb></app-breadcrumb>
          <!-- View outlet -->
          <div class="container-dynamic">
            <router-outlet></router-outlet>
          </div>
          <span class="m-auto"></span>
          <app-footer></app-footer>
        </div>
      </div>
      
      <!-- View overlay for mobile navigation -->
      <div class="sidebar-backdrop"
        [ngClass]="{'visible': layoutConf.sidebarStyle !== 'closed' && layoutConf.isMobile}"
        (click)="closeSidebar()">
      </div>
    </mat-sidenav-content>

    <!-- Notification bar -->
    <mat-sidenav #notificationPanel mode="over" class="" position="end">
      <div class="nofication-panel">
        <app-notifications [notificPanel]="notificationPanel"></app-notifications>
      </div>
    </mat-sidenav>
    
    <ltemplate-notifications2></ltemplate-notifications2>
  </mat-sidenav-container>
</div> 
```

---

#### 📄 `src/app/shared/components/layouts/vertical-layout/vertical-layout.component.ts`

```typescript
import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule, } from '@angular/router';
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { ILayoutConf, LayoutService } from '../../../services/layout.service';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderSideComponent } from '../../header-side/header-side.component';
import { SidebarSideComponent } from '../../sidebar-side/sidebar-side.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LtemplateNotifications2Component } from '../../ltemplate-notifications2/ltemplate-notifications2.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PerfectScrollbarModule } from '../../../components/perfect-scrollbar';

@Component({
  selector: 'app-vertical-layout',
  templateUrl: './vertical-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    FooterComponent,
    HeaderSideComponent,
    SidebarSideComponent,
    NotificationsComponent,
    LtemplateNotifications2Component,
    MatSidenavModule,
    PerfectScrollbarModule
  ]
})
export class VerticalLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;
  public scrollConfig = {
    suppressScrollX: true
  }
  public layoutConf: ILayoutConf = {};
  public adminContainerClasses: any = {};
  
  constructor(
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private jwtAuth: JwtAuthService
  ) {
    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((routeChange: NavigationEnd) => {
      this.layout.adjustLayout({ route: routeChange.url });
      this.scrollToTop();
    });
  }

  ngOnInit() {
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
      this.layoutConf = layoutConf;
      this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
      this.cdr.markForCheck();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }
  
  ngAfterViewInit() {}
  
  scrollToTop() {
    if(document) {
      setTimeout(() => {
        let element;
        if(this.layoutConf.topbarFixed) {
          element = <HTMLElement>document.querySelector('#rightside-content-hold');
        } else {
          element = <HTMLElement>document.querySelector('#main-content-wrap');
        }
        element.scrollTop = 0;
      });
    }
  }

  ngOnDestroy() {
    if(this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if(this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if(this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  sidebarMouseenter(e) {
    if(this.layoutConf.sidebarStyle === 'compact') {
      this.layoutConf.sidebarStyle = 'full';
      this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
      this.cdr.markForCheck();
    }
  }

  sidebarMouseleave(e) {
    if (
      this.layoutConf.sidebarStyle === 'full' &&
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layoutConf.sidebarStyle = 'compact';
      this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
      this.cdr.markForCheck();
    }
  }

  updateAdminContainerClasses(layoutConf) {
    return {
      'navigation-side': true,
      'sidebar-full': layoutConf.sidebarStyle === 'full',
      'sidebar-compact': layoutConf.sidebarStyle === 'compact',
      'compact-toggle-active': layoutConf.sidebarCompactToggle,
      'sidebar-compact-big': layoutConf.sidebarStyle === 'compact-big',
      'sidebar-opened': layoutConf.sidebarStyle !== 'closed',
      'sidebar-closed': layoutConf.sidebarStyle === 'closed',
      'fixed-topbar': layoutConf.topbarFixed
    };
  }
} 
```

---

#### 📄 `src/app/shared/components/ltemplate-notifications2/ltemplate-notifications2.component.html`

```html
<mat-sidenav mode="over" class="w-80 p-4" position="end">
  <div class="flex items-center justify-between border-b pb-3 mb-4">
    <h3 class="text-lg font-semibold m-0">Notifications</h3>
    <span class="text-xs text-secondary bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">All caught up</span>
  </div>
  <div class="text-sm text-secondary text-center py-8">
    No unread notifications at this time.
  </div>
</mat-sidenav>
```

---

#### 📄 `src/app/shared/components/ltemplate-notifications2/ltemplate-notifications2.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'ltemplate-notifications2',
    templateUrl: './ltemplate-notifications2.component.html',
    styleUrls: ['./ltemplate-notifications2.component.scss'],
    standalone: true,
    imports: [CommonModule, MatSidenavModule]
})
export class LtemplateNotifications2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

```

---

#### 📄 `src/app/shared/components/ltemplate-notifications2/notifications2.service.ts`

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Notifications2Service {
  isPanelOpen: boolean = false;
  
  constructor() { }
}

```

---

#### 📄 `src/app/shared/components/ltemplate-sidebar/ltemplate-sidebar-helper.service.ts`

```typescript
import { Injectable } from "@angular/core";
import { LtemplateSidebarComponent } from "./ltemplate-sidebar.component";

@Injectable({
  providedIn: "root"
})
export class LtemplateSidebarHelperService {
  sidebarList: LtemplateSidebarComponent[];

  constructor() {
    this.sidebarList = [];
  }

  setSidebar(name, sidebar): void {
    this.sidebarList[name] = sidebar;
  }

  getSidebar(name): any {
    return this.sidebarList[name];
  }

  removeSidebar(name) {
    if (!this.sidebarList[name]) {
      console.warn(`The sidebar with name '${name}' doesn't exist.`);
    }

    // remove sidebar
    delete this.sidebarList[name];
  }
}

```

---

#### 📄 `src/app/shared/components/ltemplate-sidebar/ltemplate-sidebar.component.html`

```html
<div>
  <ng-content></ng-content>
</div>
```

---

#### 📄 `src/app/shared/components/ltemplate-sidebar/ltemplate-sidebar.component.ts`

```typescript
import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy,
  HostListener,
  Directive,
  Renderer2,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
// import { MatchMediaService } from "app/shared/services/match-media.service";
// import { MediaObserver } from "@angular/flex-layout";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LtemplateSidebarHelperService } from "./ltemplate-sidebar-helper.service";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "ltemplate-sidebar",
  templateUrl: "./ltemplate-sidebar.component.html",
  styleUrls: ["./ltemplate-sidebar.component.scss"],
  standalone: true
})
export class LtemplateSidebarComponent implements OnInit, OnDestroy {
  // Name
  @Input()
  name: string;

  // right
  @Input()
  @HostBinding("class.position-right")
  right: boolean;

  // Open
  @HostBinding("class.open")
  @Input()
  opened: boolean;

  @HostBinding("class.sidebar-locked-open")
  sidebarLockedOpen: boolean;

  //mode
  @HostBinding("class.is-over")
  isOver: boolean;
  isMobile: boolean;
  private backdrop: HTMLElement | null = null;

  private lockedBreakpoint = "(min-width: 960px)";
  private unsubscribeAll: Subject<any>;

  constructor(
    // private matchMediaService: MatchMediaService,
    // private mediaObserver: MediaObserver,
    private sidebarHelperService: LtemplateSidebarHelperService,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.unsubscribeAll = new Subject();
    this.isMobile = false;
  }

  ngOnInit() {
    this.sidebarHelperService.setSidebar(this.name, this);
    this.breakpointObserver
      .observe(this.lockedBreakpoint)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((state: any) => {
        this.isMobile = !state.matches;
        // this.sidebarLockedOpen = state.matches;
        this.opened = state.matches;
      });
  }

  open() {
    this.opened = true;
    if (!this.sidebarLockedOpen && !this.backdrop) {
      this.showBackdrop();
    }
  }

  close() {
    this.opened = false;
    this.hideBackdrop();
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  showBackdrop() {
    if (!this.isMobile) {
      return;
    }
    const backdrop: HTMLElement = this._renderer.createElement("div");
    backdrop.classList.add("ltemplate-sidebar-overlay");

    this._renderer.appendChild(
      this._elementRef.nativeElement.parentElement,
      backdrop
    );

    // Close sidebar onclick
    backdrop.addEventListener("click", () => {
      this.close();
    });

    this.backdrop = backdrop;
    this.cdr.markForCheck();
  }

  hideBackdrop() {
    if (this.backdrop && this.backdrop.parentNode) {
      this.backdrop.parentNode.removeChild(this.backdrop);
      this.backdrop = null;
    }

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
    this.sidebarHelperService.removeSidebar(this.name);
  }
}

@Directive({
  selector: "[LtemplateSidebarToggler]",
  standalone: true
})
export class LtemplateSidebarTogglerDirective {
  @Input("LtemplateSidebarToggler")
  public id: any;

  constructor(private LtemplateSidebarHelperService: LtemplateSidebarHelperService) { }

  @HostListener("click")
  onClick() {
    this.LtemplateSidebarHelperService.getSidebar(this.id).toggle();
  }
}

```

---

#### 📄 `src/app/shared/components/notifications/notifications.component.html`

```html
<div class="text-center mat-bg-primary !pt-4 !pb-4">
  <h6 class="m-0 text-white">Notifications</h6>
</div>

<div class="flex flex-col min-w-[220px]">
  <div class="" *ngFor="let n of notifications">
    <a [routerLink]="[n.route || '/dashboard']" class="flex flex-row items-start px-4 py-3 hover:bg-hover">
      <mat-icon [color]="n.color" class="text-sm mr-2 !h-[16px] !w-[16px] rtl:ml-2">{{n.icon}}</mat-icon>
      <div class="mat-list-text">
        <h4 class="text-sm font-semibold !mb-0">{{n.message}}</h4>
        <small class="text-xs font-medium text-secondary">{{n.time}}</small>
      </div>
    </a>
  </div>
</div>

<div class="text-center mt-4" *ngIf="notifications.length">
  <small><a href="#" class="text-secondary underline" (click)="clearAll($event)">Clear all notifications</a></small>
</div>
```

---

#### 📄 `src/app/shared/components/notifications/notifications.component.ts`

```typescript
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatIconModule,
      MatButtonModule,
      MatListModule
    ]
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;

  // Dummy notifications
  notifications = [{
    message: 'New contact added',
    icon: 'assignment_ind',
    time: '1 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New message',
    icon: 'chat',
    time: '4 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Production release v4.2 deployed',
    icon: 'verified',
    time: '12 min ago',
    route: '/charts',
    color: 'primary'
  }]

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.notificPanel.close();
        }
    });
  }
  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/index.ts`

```typescript
export { PerfectScrollbarComponent } from './perfect-scrollbar.component';
export { PerfectScrollbarDirective } from './perfect-scrollbar.directive';

export {
  Geometry,
  Position,

  PERFECT_SCROLLBAR_CONFIG,

  PerfectScrollbarConfig,
  PerfectScrollbarConfigInterface
} from './perfect-scrollbar.interfaces';

export { PerfectScrollbarModule } from './perfect-scrollbar.module';

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/perfect-scrollbar-force-native-scroll.directive.ts`

```typescript
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[forceNativeScrolling]',
    standalone: false
})
export class ForceNativeScrollDirective {

  constructor(private renderer: Renderer2, el: ElementRef) {
    ['ps__child', 'ps__child--consume'].forEach((className) => {
      this.renderer.addClass(el?.nativeElement, className);
    });
  }
}

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/perfect-scrollbar.component.css`

```css
/*
  TODO: Remove important flags after this bug if fixed:
  https://github.com/angular/flex-layout/issues/381
*/

perfect-scrollbar {
  position: relative;

  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}

perfect-scrollbar[hidden] {
  display: none;
}

perfect-scrollbar[fxflex] {
  display: flex;
  flex-direction: column;
  height: auto;
  min-width: 0;
  min-height: 0;

  -webkit-box-direction: column;
  -webkit-box-orient: column;
}

perfect-scrollbar[fxflex] > .ps {
  -ms-flex: 1 1 auto;

  flex: 1 1 auto;
  width: auto;
  height: auto;
  min-width: 0;
  min-height: 0;

  -webkit-box-flex: 1;
}

perfect-scrollbar[fxlayout] > .ps,
perfect-scrollbar[fxlayout] > .ps > .ps-content {
  display: flex;

  -ms-flex: 1 1 auto;

  flex: 1 1 auto;
  flex-direction: inherit;
  align-items: inherit;
  align-content: inherit;
  justify-content: inherit;
  width: 100%;
  height: 100%;

  -webkit-box-align: inherit;
  -webkit-box-direction: inherit;
  -webkit-box-flex: 1;
  -webkit-box-orient: inherit;
  -webkit-box-pack: inherit;
}

perfect-scrollbar[fxlayout='row'] > .ps,
perfect-scrollbar[fxlayout='row'] > .ps > .ps-content {
  flex-direction: row !important;

  -webkit-box-direction: row !important;
  -webkit-box-orient: row !important;
}

perfect-scrollbar[fxlayout='column'] > .ps,
perfect-scrollbar[fxlayout='column'] > .ps > .ps-content {
  flex-direction: column !important;

  -webkit-box-direction: column !important;
  -webkit-box-orient: column !important;
}

perfect-scrollbar > .ps {
  position: static;

  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}

perfect-scrollbar > .ps textarea {
  -ms-overflow-style: scrollbar;
}

perfect-scrollbar > .ps > .ps-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: block;
  overflow: hidden;

  pointer-events: none;
}

perfect-scrollbar > .ps > .ps-overlay .ps-indicator-top,
perfect-scrollbar > .ps > .ps-overlay .ps-indicator-left,
perfect-scrollbar > .ps > .ps-overlay .ps-indicator-right,
perfect-scrollbar > .ps > .ps-overlay .ps-indicator-bottom {
  position: absolute;

  opacity: 0;

  transition: opacity 300ms ease-in-out;
}

perfect-scrollbar > .ps > .ps-overlay .ps-indicator-top,
perfect-scrollbar > .ps > .ps-overlay .ps-indicator-bottom {
  left: 0;

  min-width: 100%;
  min-height: 24px;
}

perfect-scrollbar > .ps > .ps-overlay .ps-indicator-left,
perfect-scrollbar > .ps > .ps-overlay .ps-indicator-right {
  top: 0;

  min-width: 24px;
  min-height: 100%;
}

perfect-scrollbar > .ps > .ps-overlay .ps-indicator-top {
  top: 0;
}

perfect-scrollbar > .ps > .ps-overlay .ps-indicator-left {
  left: 0;
}

perfect-scrollbar > .ps > .ps-overlay .ps-indicator-right {
  right: 0;
}

perfect-scrollbar > .ps > .ps-overlay .ps-indicator-bottom {
  bottom: 0;
}

perfect-scrollbar > .ps.ps--active-y > .ps__rail-y {
  top: 0 !important;
  right: 0 !important;
  left: auto !important;

  width: 10px;

  cursor: default;

  transition:
    width 200ms linear,
    opacity 200ms linear,
    background-color 200ms linear;
}

perfect-scrollbar > .ps.ps--active-y > .ps__rail-y:hover,
perfect-scrollbar > .ps.ps--active-y > .ps__rail-y.ps--clicking {
  width: 15px;
}

perfect-scrollbar > .ps.ps--active-x > .ps__rail-x {
  top: auto !important;
  bottom: 0 !important;
  left: 0 !important;

  height: 10px;

  cursor: default;

  transition:
    height 200ms linear,
    opacity 200ms linear,
    background-color 200ms linear;
}

perfect-scrollbar > .ps.ps--active-x > .ps__rail-x:hover,
perfect-scrollbar > .ps.ps--active-x > .ps__rail-x.ps--clicking {
  height: 15px;
}

perfect-scrollbar > .ps.ps--active-x.ps--active-y > .ps__rail-y {
  margin: 0 0 10px;
}

perfect-scrollbar > .ps.ps--active-x.ps--active-y > .ps__rail-x {
  margin: 0 10px 0 0;
}

perfect-scrollbar > .ps.ps--scrolling-y > .ps__rail-y,
perfect-scrollbar > .ps.ps--scrolling-x > .ps__rail-x {
  opacity: 0.9;

  background-color: #eee;
}

perfect-scrollbar.ps-show-always > .ps.ps--active-y > .ps__rail-y,
perfect-scrollbar.ps-show-always > .ps.ps--active-x > .ps__rail-x {
  opacity: 0.6;
}

perfect-scrollbar.ps-show-active > .ps.ps--active-y > .ps-overlay:not(.ps-at-top) .ps-indicator-top {
  opacity: 1;

  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
}

perfect-scrollbar.ps-show-active > .ps.ps--active-y > .ps-overlay:not(.ps-at-bottom) .ps-indicator-bottom {
  opacity: 1;

  background: linear-gradient(to top, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
}

perfect-scrollbar.ps-show-active > .ps.ps--active-x > .ps-overlay:not(.ps-at-left) .ps-indicator-left {
  opacity: 1;

  background: linear-gradient(to right, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
}

perfect-scrollbar.ps-show-active > .ps.ps--active-x > .ps-overlay:not(.ps-at-right) .ps-indicator-right {
  opacity: 1;

  background: linear-gradient(to left, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
}

perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-top .ps-indicator-top {
  background: linear-gradient(to bottom, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);
}

perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-bottom .ps-indicator-bottom {
  background: linear-gradient(to top, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);
}

perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-left .ps-indicator-left {
  background: linear-gradient(to right, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);
}

perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-right .ps-indicator-right {
  background: linear-gradient(to left, rgba(170, 170, 170, 0.5) 0%, rgba(170, 170, 170, 0) 100%);
}

perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-top .ps-indicator-top.ps-indicator-show,
perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-y > .ps-overlay.ps-at-bottom .ps-indicator-bottom.ps-indicator-show,
perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-left .ps-indicator-left.ps-indicator-show,
perfect-scrollbar.ps-show-active.ps-show-limits > .ps.ps--active-x > .ps-overlay.ps-at-right .ps-indicator-right.ps-indicator-show {
  opacity: 1;
}

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/perfect-scrollbar.component.html`

```html
<div style="position: static;" [class.ps]="usePSClass" [perfectScrollbar]="config" [disabled]="disabled">
  <div class="ps-content">
    <ng-content></ng-content>
  </div>

  <div *ngIf="scrollIndicators" class="ps-overlay" [class.ps-at-top]="states.top" [class.ps-at-left]="states.left" [class.ps-at-right]="states.right" [class.ps-at-bottom]="states.bottom">
    <div class="ps-indicator-top" [class.ps-indicator-show]="indicatorY && interaction"></div>
    <div class="ps-indicator-left" [class.ps-indicator-show]="indicatorX && interaction"></div>
    <div class="ps-indicator-right" [class.ps-indicator-show]="indicatorX && interaction"></div>
    <div class="ps-indicator-bottom" [class.ps-indicator-show]="indicatorY && interaction"></div>
  </div>
</div>

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/perfect-scrollbar.component.ts`

```typescript
import { Subject, merge, fromEvent } from 'rxjs';
import { mapTo, takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgZone, Inject, Component,
  OnInit, OnDestroy, DoCheck, Input, Output, EventEmitter, HostBinding,
  ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { PerfectScrollbarDirective } from './perfect-scrollbar.directive';

import { PerfectScrollbarEvent, PerfectScrollbarEvents,
  PerfectScrollbarConfigInterface } from './perfect-scrollbar.interfaces';

@Component({
    selector: 'perfect-scrollbar',
    exportAs: 'ngxPerfectScrollbar',
    templateUrl: './perfect-scrollbar.component.html',
    styleUrls: [
        './perfect-scrollbar.component.css',
        '../../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css'
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PerfectScrollbarComponent implements OnInit, OnDestroy, DoCheck {
  public states: any = {};

  public indicatorX: boolean = false;
  public indicatorY: boolean = false;

  public interaction: boolean = false;

  private scrollPositionX: number = 0;
  private scrollPositionY: number = 0;

  private scrollDirectionX: number = 0;
  private scrollDirectionY: number = 0;

  private usePropagationX: boolean = false;
  private usePropagationY: boolean = false;

  private allowPropagationX: boolean = false;
  private allowPropagationY: boolean = false;

  private stateTimeout: number | null = null;

  private readonly ngDestroy: Subject<void> = new Subject();

  private readonly stateUpdate: Subject<string> = new Subject();

  @Input() disabled: boolean = false;

  @Input() usePSClass: boolean = true;

  @HostBinding('class.ps-show-limits')
  @Input() autoPropagation: boolean = false;

  @HostBinding('class.ps-show-active')
  @Input() scrollIndicators: boolean = false;

  @Input() config?: PerfectScrollbarConfigInterface;

  @Output() psScrollY: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollX: EventEmitter<any> = new EventEmitter<any>();

  @Output() psScrollUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollLeft: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollRight: EventEmitter<any> = new EventEmitter<any>();

  @Output() psYReachEnd: EventEmitter<any> = new EventEmitter<any>();
  @Output() psYReachStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() psXReachEnd: EventEmitter<any> = new EventEmitter<any>();
  @Output() psXReachStart: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.stateUpdate
        .pipe(
          takeUntil(this.ngDestroy),
          distinctUntilChanged((a, b) => (a === b && !this.stateTimeout))
        )
        .subscribe((state: string) => {
          if (this.stateTimeout && typeof window !== 'undefined') {
            window.clearTimeout(this.stateTimeout);

            this.stateTimeout = null;
          }

          if (state === 'x' || state === 'y') {
            this.interaction = false;

            if (state === 'x') {
              this.indicatorX = false;

              this.states.left = false;
              this.states.right = false;

              if (this.autoPropagation && this.usePropagationX) {
                this.allowPropagationX = false;
              }
            } else if (state === 'y') {
              this.indicatorY = false;

              this.states.top = false;
              this.states.bottom = false;

              if (this.autoPropagation && this.usePropagationY) {
                this.allowPropagationY = false;
              }
            }
          } else {
            if (state === 'left' || state === 'right') {
              this.states.left = false;
              this.states.right = false;

              this.states[state] = true;

              if (this.autoPropagation && this.usePropagationX) {
                this.indicatorX = true;
              }
            } else if (state === 'top' || state === 'bottom') {
              this.states.top = false;
              this.states.bottom = false;

              this.states[state] = true;

              if (this.autoPropagation && this.usePropagationY) {
                this.indicatorY = true;
              }
            }

            if (this.autoPropagation && typeof window !== 'undefined') {
              this.stateTimeout = window.setTimeout(() => {
                this.indicatorX = false;
                this.indicatorY = false;

                this.stateTimeout = null;

                if (this.interaction && (this.states.left || this.states.right)) {
                  this.allowPropagationX = true;
                }

                if (this.interaction && (this.states.top || this.states.bottom)) {
                  this.allowPropagationY = true;
                }

                this.cdRef.markForCheck();
              }, 500);
            }
          }

          this.cdRef.markForCheck();
          this.cdRef.detectChanges();
        });

      this.zone.runOutsideAngular(() => {
        if (this.directiveRef) {
          const element = this.directiveRef.elementRef.nativeElement;

          fromEvent<WheelEvent>(element, 'wheel')
            .pipe(
              takeUntil(this.ngDestroy)
            )
            .subscribe((event: WheelEvent) => {
              if (!this.disabled && this.autoPropagation) {
                const scrollDeltaX = event.deltaX;
                const scrollDeltaY = event.deltaY;

                this.checkPropagation(event, scrollDeltaX, scrollDeltaY);
              }
            });

          fromEvent<TouchEvent>(element, 'touchmove')
            .pipe(
              takeUntil(this.ngDestroy)
            )
            .subscribe((event: TouchEvent) => {
              if (!this.disabled && this.autoPropagation) {
                const scrollPositionX = event.touches[0].clientX;
                const scrollPositionY = event.touches[0].clientY;

                const scrollDeltaX = scrollPositionX - this.scrollPositionX;
                const scrollDeltaY = scrollPositionY - this.scrollPositionY;

                this.checkPropagation(event, scrollDeltaX, scrollDeltaY);

                this.scrollPositionX = scrollPositionX;
                this.scrollPositionY = scrollPositionY;
              }
            });

            merge(
              fromEvent(element, 'ps-scroll-x')
                .pipe(mapTo('x')),
              fromEvent(element, 'ps-scroll-y')
                .pipe(mapTo('y')),
              fromEvent(element, 'ps-x-reach-end')
                .pipe(mapTo('right')),
              fromEvent(element, 'ps-y-reach-end')
                .pipe(mapTo('bottom')),
              fromEvent(element, 'ps-x-reach-start')
                .pipe(mapTo('left')),
              fromEvent(element, 'ps-y-reach-start')
                .pipe(mapTo('top')),
            )
            .pipe(
              takeUntil(this.ngDestroy)
            )
            .subscribe((state: string) => {
              if (!this.disabled && (this.autoPropagation || this.scrollIndicators)) {
                this.stateUpdate.next(state);
              }
            });
        }
      });

      window.setTimeout(() => {
        PerfectScrollbarEvents.forEach((eventName: PerfectScrollbarEvent) => {
          if (this.directiveRef) {
            this.directiveRef[eventName] = this[eventName];
          }
        });
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngDestroy.next();
      this.ngDestroy.unsubscribe();

      if (this.stateTimeout && typeof window !== 'undefined') {
        window.clearTimeout(this.stateTimeout);
      }
    }
  }

  ngDoCheck(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.disabled && this.autoPropagation && this.directiveRef) {
        const element = this.directiveRef.elementRef.nativeElement;

        this.usePropagationX = element.classList.contains('ps--active-x');

        this.usePropagationY = element.classList.contains('ps--active-y');
      }
    }
  }

  private checkPropagation(event: any, deltaX: number, deltaY: number): void {
    this.interaction = true;

    const scrollDirectionX = (deltaX < 0) ? -1 : 1;
    const scrollDirectionY = (deltaY < 0) ? -1 : 1;

    if ((this.usePropagationX && this.usePropagationY) ||
        (this.usePropagationX && (!this.allowPropagationX ||
        (this.scrollDirectionX !== scrollDirectionX))) ||
        (this.usePropagationY && (!this.allowPropagationY ||
        (this.scrollDirectionY !== scrollDirectionY))))
    {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!!deltaX) {
      this.scrollDirectionX = scrollDirectionX;
    }

    if (!!deltaY) {
      this.scrollDirectionY = scrollDirectionY;
    }

    this.stateUpdate.next('interaction');

    this.cdRef.detectChanges();
  }
}

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/perfect-scrollbar.directive.ts`

```typescript
import PerfectScrollbar from 'perfect-scrollbar';

// const ResizeObserver = require('resize-observer-polyfill');

import { ResizeObserver } from '@juggle/resize-observer';

import { Subject, fromEvent } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgZone, Inject, Optional, ElementRef, Directive,
  OnInit, DoCheck, OnChanges, OnDestroy, Input, Output, EventEmitter,
  SimpleChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

import { Geometry, Position } from './perfect-scrollbar.interfaces';

import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfig, PerfectScrollbarConfigInterface,
  PerfectScrollbarEvent, PerfectScrollbarEvents } from './perfect-scrollbar.interfaces';

@Directive({
    selector: '[perfectScrollbar]',
    exportAs: 'ngxPerfectScrollbar',
    standalone: false
})
export class PerfectScrollbarDirective implements OnInit, OnDestroy, DoCheck, OnChanges {
  private instance: PerfectScrollbar | null = null;

  private ro: ResizeObserver | null = null;

  private timeout: number | null = null;
  private animation: number | null = null;

  private configDiff: KeyValueDiffer<string, any> | null = null;

  private readonly ngDestroy: Subject<void> = new Subject();

  @Input() disabled: boolean = false;

  @Input('perfectScrollbar') config?: PerfectScrollbarConfigInterface;

  @Output() psScrollY: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollX: EventEmitter<any> = new EventEmitter<any>();

  @Output() psScrollUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollLeft: EventEmitter<any> = new EventEmitter<any>();
  @Output() psScrollRight: EventEmitter<any> = new EventEmitter<any>();

  @Output() psYReachEnd: EventEmitter<any> = new EventEmitter<any>();
  @Output() psYReachStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() psXReachEnd: EventEmitter<any> = new EventEmitter<any>();
  @Output() psXReachStart: EventEmitter<any> = new EventEmitter<any>();

  constructor(private zone: NgZone, private differs: KeyValueDiffers,
    public elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(PERFECT_SCROLLBAR_CONFIG) private defaults: PerfectScrollbarConfigInterface) {}

  ngOnInit(): void {
    if (!this.disabled && isPlatformBrowser(this.platformId)) {
      const config = new PerfectScrollbarConfig(this.defaults);

      config.assign(this.config); // Custom configuration

      this.zone.runOutsideAngular(() => {
        this.instance = new PerfectScrollbar(this.elementRef.nativeElement, config);
      });

      if (!this.configDiff) {
        this.configDiff = this.differs.find(this.config || {}).create();

        this.configDiff.diff(this.config || {});
      }

      this.zone.runOutsideAngular(() => {
        this.ro = new ResizeObserver(() => {
          this.update();
        });

        if (this.elementRef.nativeElement.children[0]) {
          this.ro.observe(this.elementRef.nativeElement.children[0]);
        }

        this.ro.observe(this.elementRef.nativeElement);
      });

      this.zone.runOutsideAngular(() => {
        PerfectScrollbarEvents.forEach((eventName: PerfectScrollbarEvent) => {
          const eventType = eventName.replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);

          fromEvent<Event>(this.elementRef.nativeElement, eventType)
            .pipe(
              auditTime(20),
              takeUntil(this.ngDestroy)
            )
            .subscribe((event: Event) => {
              this[eventName].emit(event);
            });
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngDestroy.next();
      this.ngDestroy.complete();

      if (this.ro) {
        this.ro.disconnect();
      }

      if (this.timeout && typeof window !== 'undefined') {
        window.clearTimeout(this.timeout);
      }

      this.zone.runOutsideAngular(() => {
        if (this.instance) {
          this.instance.destroy();
        }
      });

      this.instance = null;
    }
  }

  ngDoCheck(): void {
    if (!this.disabled && this.configDiff && isPlatformBrowser(this.platformId)) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes) {
        this.ngOnDestroy();

        this.ngOnInit();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].isFirstChange() && isPlatformBrowser(this.platformId)) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === true) {
         this.ngOnDestroy();
        } else if (changes['disabled'].currentValue === false) {
          this.ngOnInit();
        }
      }
    }
  }

  public ps(): PerfectScrollbar | null {
    return this.instance;
  }

  public update(): void {
    if (typeof window !== 'undefined') {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }

      this.timeout = window.setTimeout(() => {
        if (!this.disabled && this.configDiff) {
          try {
            this.zone.runOutsideAngular(() => {
              if (this.instance) {
                this.instance.update();
              }
            });
          } catch (error) {
            // Update can be finished after destroy so catch errors
          }
        }
      }, 0);
    }
  }

  public geometry(prefix: string = 'scroll'): Geometry {
    return new Geometry(
      this.elementRef.nativeElement[prefix + 'Left'],
      this.elementRef.nativeElement[prefix + 'Top'],
      this.elementRef.nativeElement[prefix + 'Width'],
      this.elementRef.nativeElement[prefix + 'Height']
    );
  }

  public position(absolute: boolean = false): Position {
    if (!absolute && this.instance) {
      return new Position(
        this.instance.reach.x || 0,
        this.instance.reach.y || 0
      );
    } else {
      return new Position(
        this.elementRef.nativeElement.scrollLeft,
        this.elementRef.nativeElement.scrollTop
      );
    }
  }

  public scrollable(direction: string = 'any'): boolean {
    const element = this.elementRef.nativeElement;

    if (direction === 'any') {
      return element.classList.contains('ps--active-x') ||
        element.classList.contains('ps--active-y');
    } else if (direction === 'both') {
      return element.classList.contains('ps--active-x') &&
        element.classList.contains('ps--active-y');
    } else {
      return element.classList.contains('ps--active-' + direction);
    }
  }

  public scrollTo(x: number, y?: number, speed?: number): void {
    if (!this.disabled) {
      if (y == null && speed == null) {
        this.animateScrolling('scrollTop', x, speed);
      } else {
        if (x != null) {
          this.animateScrolling('scrollLeft', x, speed);
        }

        if (y != null) {
          this.animateScrolling('scrollTop', y, speed);
        }
      }
    }
  }

  public scrollToX(x: number, speed?: number): void {
    this.animateScrolling('scrollLeft', x, speed);
  }

  public scrollToY(y: number, speed?: number): void {
    this.animateScrolling('scrollTop', y, speed);
  }

  public scrollToTop(offset?: number, speed?: number): void {
    this.animateScrolling('scrollTop', (offset || 0), speed);
  }

  public scrollToLeft(offset?: number, speed?: number): void {
    this.animateScrolling('scrollLeft', (offset || 0), speed);
  }

  public scrollToRight(offset?: number, speed?: number): void {
    const left = this.elementRef.nativeElement.scrollWidth -
      this.elementRef.nativeElement.clientWidth;

    this.animateScrolling('scrollLeft', left - (offset || 0), speed);
  }

  public scrollToBottom(offset?: number, speed?: number): void {
    const top = this.elementRef.nativeElement.scrollHeight -
      this.elementRef.nativeElement.clientHeight;

    this.animateScrolling('scrollTop', top - (offset || 0), speed);
  }

  public scrollToElement(element: HTMLElement | string, offset?: number, speed?: number): void {
    if (typeof element === 'string') {
      element = this.elementRef.nativeElement.querySelector(element) as HTMLElement;
    }

    if (element) {
      const elementPos = element.getBoundingClientRect();

      const scrollerPos = this.elementRef.nativeElement.getBoundingClientRect();

      if (this.elementRef.nativeElement.classList.contains('ps--active-x')) {
        const currentPos = this.elementRef.nativeElement['scrollLeft'];

        const position = elementPos.left - scrollerPos.left + currentPos;

        this.animateScrolling('scrollLeft', position + (offset || 0), speed);
      }

      if (this.elementRef.nativeElement.classList.contains('ps--active-y')) {
        const currentPos = this.elementRef.nativeElement['scrollTop'];

        const position = elementPos.top - scrollerPos.top + currentPos;

        this.animateScrolling('scrollTop', position + (offset || 0), speed);
      }
    }
  }

  private animateScrolling(target: string, value: number, speed?: number): void {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation);

      this.animation = null;
    }

    if (!speed || typeof window === 'undefined') {
      this.elementRef.nativeElement[target] = value;
    } else if (value !== this.elementRef.nativeElement[target]) {
      let newValue = 0;
      let scrollCount = 0;

      let oldTimestamp = performance.now();
      let oldValue = this.elementRef.nativeElement[target];

      const cosParameter = (oldValue - value) / 2;

      const step = (newTimestamp: number) => {
        scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));

        newValue = Math.round(value + cosParameter + cosParameter * Math.cos(scrollCount));

        // Only continue animation if scroll position has not changed
        if (this.elementRef.nativeElement[target] === oldValue) {
          if (scrollCount >= Math.PI) {
            this.animateScrolling(target, value, 0);
          } else {
            this.elementRef.nativeElement[target] = newValue;

            // On a zoomed out page the resulting offset may differ
            oldValue = this.elementRef.nativeElement[target];

            oldTimestamp = newTimestamp;

            this.animation = window.requestAnimationFrame(step);
          }
        }
      };

      window.requestAnimationFrame(step);
    }
  }
}

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/perfect-scrollbar.interfaces.ts`

```typescript
import { InjectionToken } from '@angular/core';

export const PERFECT_SCROLLBAR_CONFIG = new InjectionToken('PERFECT_SCROLLBAR_CONFIG');

export class Geometry {
  public x: number;
  public y: number;

  public w: number;
  public h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

export class Position {
  public x: number | 'start' | 'end';
  public y: number | 'start' | 'end';

  constructor(x: number | 'start' | 'end', y: number | 'start' | 'end') {
    this.x = x;
    this.y = y;
  }
}

export type PerfectScrollbarEvent = 'psScrollY' | 'psScrollX' | 'psScrollUp'| 'psScrollDown' |
  'psScrollLeft' | 'psScrollRight' | 'psYReachEnd' | 'psYReachStart' | 'psXReachEnd' | 'psXReachStart';

export const PerfectScrollbarEvents: PerfectScrollbarEvent[] = [
  'psScrollY',
  'psScrollX',

  'psScrollUp',
  'psScrollDown',
  'psScrollLeft',
  'psScrollRight',

  'psYReachEnd',
  'psYReachStart',
  'psXReachEnd',
  'psXReachStart'
];

export interface PerfectScrollbarConfigInterface {
  handlers?: string[];

  wheelSpeed?: number;
  swipeEasing?: boolean;

  suppressScrollX?: boolean;
  suppressScrollY?: boolean;

  wheelPropagation?: boolean;
  useBothWheelAxes?: boolean;

  scrollingThreshold?: number;

  minScrollbarLength?: number;
  maxScrollbarLength?: number;

  scrollXMarginOffset?: number;
  scrollYMarginOffset?: number;
}

export class PerfectScrollbarConfig implements PerfectScrollbarConfigInterface {
  public handlers?: string[];

  public wheelSpeed?: number;
  public swipeEasing?: boolean;

  public suppressScrollX?: boolean;
  public suppressScrollY?: boolean;

  public wheelPropagation?: boolean;
  public useBothWheelAxes?: boolean;

  public scrollingThreshold?: number;

  public minScrollbarLength?: number;
  public maxScrollbarLength?: number;

  public scrollXMarginOffset?: number;
  public scrollYMarginOffset?: number;

  constructor(config: PerfectScrollbarConfigInterface = {}) {
    this.assign(config);
  }

  public assign(config: PerfectScrollbarConfigInterface = {}) {
    for (const key in config) {
      this[key as keyof PerfectScrollbarConfig] = config[key as keyof PerfectScrollbarConfigInterface] as never;
    }
  }
}

```

---

#### 📄 `src/app/shared/components/perfect-scrollbar/perfect-scrollbar.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarComponent } from './perfect-scrollbar.component';
import { PerfectScrollbarDirective } from './perfect-scrollbar.directive';
import { ForceNativeScrollDirective } from './perfect-scrollbar-force-native-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PerfectScrollbarComponent, PerfectScrollbarDirective, ForceNativeScrollDirective],
    exports: [CommonModule, PerfectScrollbarComponent, PerfectScrollbarDirective, ForceNativeScrollDirective]
})
export class PerfectScrollbarModule {
}

```

---

#### 📄 `src/app/shared/components/shared-components.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { SearchModule } from '../search/search.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';

// ONLY FOR DEMO
import { CustomizerComponent } from './customizer/customizer.component';

// ALWAYS REQUIRED 
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { LtemplateSidebarComponent, LtemplateSidebarTogglerDirective } from './ltemplate-sidebar/ltemplate-sidebar.component';
import { BottomSheetShareComponent } from './bottom-sheet-share/bottom-sheet-share.component';
import { LtemplateExampleViewerComponent } from './example-viewer/example-viewer.component';
import { LtemplateExampleViewerTemplateComponent } from './example-viewer-template/example-viewer-template.component';
import { LtemplateNotifications2Component } from './ltemplate-notifications2/ltemplate-notifications2.component';
import { DividerComponent } from './divider/divider.component';
import { allMaterialModules, commonMaterialModules } from '../material-imports';
// All shared components are now standalone
const standaloneComponents = [
  HeaderTopComponent,
  SidebarTopComponent,
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  LtemplateNotifications2Component,
  CustomizerComponent,
  FooterComponent,
  AppLoaderComponent,
  AppComfirmComponent,
  DividerComponent,
  ButtonLoadingComponent,
  LtemplateSidebarComponent,
  LtemplateSidebarTogglerDirective,
  BottomSheetShareComponent,
  LtemplateExampleViewerComponent,
  LtemplateExampleViewerTemplateComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    PerfectScrollbarModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    ...commonMaterialModules,
    ...allMaterialModules,
    // Import all standalone components
    ...standaloneComponents
  ],
  declarations: [],
  exports: [
    ...standaloneComponents
  ]
})
export class SharedComponentsModule { }
```

---

#### 📄 `src/app/shared/components/sidebar-side/sidebar-side.component.html`

```html
<div class="sidebar-panel {{layoutConf?.sidebarColor}}">
    <div id="scroll-area" [perfectScrollbar] class="navigation-hold flex flex-col !bg-sidebar-bg">
        <div class="sidebar-hold">

            <!-- App Logo -->
            <div class="branding !bg-sidebar-bg">
                <a routerLink="/dashboard/analytics" class="cursor-pointer flex items-center">
                    <img src="assets/images/ltemplate.svg" alt="Ltemplate" class="app-logo">
                </a>

                <span style="margin: auto" *ngIf="layoutConf.sidebarStyle !== 'compact'"></span>
                <div class="sidebar-compact-switch" [ngClass]="{active: layoutConf.sidebarCompactToggle}"
                    (click)="toggleCollapse()" *ngIf="layoutConf.sidebarStyle !== 'compact'"><span></span></div>
            </div>
            <!-- Sidebar user -->
            <div class="app-user">
                <div class="app-user-photo">
                    <img src="assets/images/face-7.jpg" class="mat-elevation-z1" alt="">
                </div>
                <span class="app-user-name m-2 text-sidebar-text">
                    <mat-icon class="icon-xs !fill-sidebar-text">lock</mat-icon>
                    {{jwtAuth?.user?.displayName}}
                </span>
                <!-- Small buttons -->
                <div class="app-user-controls">
                    <a class="hover:bg-hover" mat-icon-button mat-xs-button [matMenuTriggerFor]="appUserMenu">
                        <mat-icon class="text-[18px] !flex justify-center items-center text-sidebar-text">settings</mat-icon>
                    </a>
                    <a class="hover:bg-hover" mat-icon-button mat-xs-button matTooltip="Inbox" routerLink="/inbox">
                        <mat-icon class="text-[18px] !flex justify-center items-center text-sidebar-text">email</mat-icon>
                    </a>
                    <a class="hover:bg-hover" mat-icon-button mat-xs-button matTooltip="Sign Out"
                        routerLink="/sessions/signin">
                        <mat-icon class="text-[18px] !flex justify-center items-center text-sidebar-text">exit_to_app</mat-icon>
                    </a>
                    <mat-menu #appUserMenu="matMenu">
                        <button mat-menu-item routerLink="/profile/overview">
                            <mat-icon>account_box</mat-icon>
                            <span>Profile</span>
                        </button>
                        <button mat-menu-item routerLink="/profile/settings">
                            <mat-icon>settings</mat-icon>
                            <span>Account Settings</span>
                        </button>
                        <button mat-menu-item routerLink="/calendar">
                            <mat-icon>date_range</mat-icon>
                            <span>Calendar</span>
                        </button>
                        <button mat-menu-item (click)="jwtAuth.signout()">
                            <mat-icon>exit_to_app</mat-icon>
                            <span>Sign out</span>
                        </button>
                    </mat-menu>
                </div>
            </div>
            <!-- Navigation -->
            <app-sidenav [items]="menuItems" [hasIconMenu]="hasIconTypeMenuItem"
                [iconMenuTitle]="iconTypeMenuTitle" #sidenav></app-sidenav>
        </div>
    </div>
</div>
```

---

#### 📄 `src/app/shared/components/sidebar-side/sidebar-side.component.ts`

```typescript
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { TranslateModule } from "@ngx-translate/core";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { PerfectScrollbarModule } from "app/shared/components/perfect-scrollbar";

@Component({
    selector: "app-sidebar-side",
    templateUrl: "./sidebar-side.component.html",
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      TranslateModule,
      SidenavComponent,
      PerfectScrollbarModule
    ]
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  private layoutSub: Subscription;
  @ViewChild('sidenav') sidenav:any;

  public get layoutConf(): ILayoutConf {
    return this.layout.layoutConf;
  }

  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutSub = this.layout.layoutConf$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const links = this.sidenav.sidenav.nativeElement.querySelectorAll('li[appdropdownlink]');
      [...links].forEach(link => {
        if(link.querySelector('a.open')) {
          // Add open class
          link.classList.add('open');
          // Scroll into view if not in view
          const rect = link.getBoundingClientRect();
          const inView = (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
          if (!inView) {
            link.scrollIntoView();
          }
        }
      })
    }, 50)
  }
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (this.layout.layoutConf.sidebarCompactToggle) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: true
      });
    }
  }
}

```

---

#### 📄 `src/app/shared/components/sidebar-top/sidebar-top.component.html`

```html
<div class="sidebar-panel bg-card">
  <div id="sidebar-top-scroll-area flex flex-col" [perfectScrollbar] class="navigation-hold !m-0">
    <app-sidenav [items]="menuItems" #sidenav></app-sidenav>
  </div>
</div>
```

---

#### 📄 `src/app/shared/components/sidebar-top/sidebar-top.component.ts`

```typescript
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
// import PerfectScrollbar from 'perfect-scrollbar';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from "rxjs";
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
    selector: 'app-sidebar-top',
    templateUrl: './sidebar-top.component.html',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      TranslateModule,
      PerfectScrollbarModule,
      SidenavComponent
    ]
})
export class SidebarTopComponent implements OnInit, OnDestroy, AfterViewInit {
  // private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  private menuItemsSub: Subscription;
  @ViewChild('sidenav') sidenav:any;

  constructor(
    private navService: NavigationService
  ) { }

  ngOnInit() {
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const links = this.sidenav.sidenav.nativeElement.querySelectorAll('li[appdropdownlink]');
      [...links].forEach(link => {
        if(link.querySelector('a.open')) {
          // Add open class
          link.classList.add('open');
          // Scroll into view
          link.scrollIntoView();
        }
      })
    }, 50)
  }
  ngOnDestroy() {
    // if(this.sidebarPS) {
    //   this.sidebarPS.destroy();
    // }
    if( this.menuItemsSub ) {
      this.menuItemsSub.unsubscribe()
    }
  }

}

```

---

#### 📄 `src/app/shared/components/sidenav/sidenav.component.ts`

```typescript
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppDropdownDirective } from '../../directives/dropdown.directive';
import { DropdownAnchorDirective } from '../../directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from '../../directives/dropdown-link.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.template.html',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule,
      MatTooltipModule,
      AppDropdownDirective,
      DropdownAnchorDirective,
      DropdownLinkDirective,
      TranslateModule
    ]
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  @ViewChild('sidenav') sidenav:ElementRef;
  
  constructor() {

  }
  ngOnInit() {
  }
  ngAfterViewInit() {}
}
```

---

#### 📄 `src/app/shared/components/sidenav/sidenav.template.html`

```html
<div class="sidenav-hold bg-sidebar-bg" #sidenav>
  <div class="icon-menu mb-4" *ngIf="hasIconTypeMenuItem">
    <!-- Icon menu separator -->
    <div class="mb-4 nav-item-sep flex flex-col justify-center items-center">
      <mat-divider class="w-[240px]"></mat-divider>
      <span class="text-muted !px-0 text-sidebar-text">{{iconTypeMenuTitle}}</span>
    </div>

    <!-- Icon menu items -->
    <div class="icon-menu-list flex flex-row justify-center">
      <div class="icon-menu-item" *ngFor="let item of menuItems">
        <a *ngIf="!item.disabled && item.type === 'icon'" mat-icon-button
          routerLink="/{{item.state}}" routerLinkActive="" class="rtl:!p-3 !flex items-center hover:bg-bg-hover">
          <mat-icon *ngIf="item.icon" class="sidenav-mat-icon text-sidebar-text">{{item.icon}}</mat-icon>
          <mat-icon *ngIf="item.svgIcon" [svgIcon]="item.svgIcon" class="svgIcon text-sidebar-text hover:bg-bg-hover"></mat-icon>
        </a>
      </div>
    </div>
  </div>

  <ng-container *ngTemplateOutlet="menuTemplate; context: {menuItems: menuItems}"></ng-container>

</div>

<ng-template #menuTemplate let-menuItems="menuItems">
  <ul appDropdown class="sidenav">
    <li *ngFor="let item of menuItems" appDropdownLink >
      <!-- separator -->
      <div class="nav-item-sep" *ngIf="item.type === 'separator'">
        <mat-divider></mat-divider>
        <span class="text-sidebar-text">{{item.name | translate}}</span>
      </div>

      <!-- Item -->
      <div *ngIf="!item.disabled && item.type !== 'separator' && item.type !== 'icon'" class="lvl1">
        <a routerLink="/{{item.state}}" appDropdownToggle matRipple
          *ngIf="item.type !== 'extLink' && item.type !== 'dropDown'" routerLinkActive="open">
          <mat-icon *ngIf="item.icon" class="sidenav-mat-icon text-sidebar-text">{{item.icon}}</mat-icon>
          <mat-icon *ngIf="item.svgIcon" [svgIcon]="item.svgIcon" class="svgIcon text-sidebar-text"></mat-icon>
          <span class="item-name text-sidebar-text lvl1">{{item.name | translate}}</span>
          <span class="flex-grow"></span>
          <span class="menuitem-badge mat-bg-{{ badge.color }}" [ngStyle]="{background: badge.color}"
            *ngFor="let badge of item.badges">{{ badge.value }}</span>
        </a>
        <a [href]="item.state" appDropdownToggle matRipple *ngIf="item.type === 'extLink'" target="_blank">
          <mat-icon *ngIf="item.icon" class="sidenav-mat-icon text-sidebar-text">{{item.icon}}</mat-icon>
          <span class="item-name text-sidebar-text lvl1">{{item.name | translate}}</span>
          <span class="flex-grow"></span>
          <span class="menuitem-badge mat-bg-{{ badge.color }}" [ngStyle]="{background: badge.color}"
            *ngFor="let badge of item.badges">{{ badge.value }}</span>
        </a>

        <!-- DropDown -->
        <a *ngIf="item.type === 'dropDown'" appDropdownToggle matRipple>
          <mat-icon *ngIf="item.icon" class="sidenav-mat-icon text-sidebar-text">{{item.icon}}</mat-icon>
          <mat-icon *ngIf="item.svgIcon" [svgIcon]="item.svgIcon" class="svgIcon text-sidebar-text"></mat-icon>
          <span class="item-name text-sidebar-text lvl1">{{item.name | translate}}</span>
          <span class="flex-grow"></span>
          <span class="menuitem-badge mat-bg-{{ badge.color }}" [ngStyle]="{background: badge.color}"
            *ngFor="let badge of item.badges">{{ badge.value }}</span>
          <mat-icon class="menu-caret text-sidebar-text">keyboard_arrow_right</mat-icon>
        </a>

        <!-- recursive call -->
        <div *ngIf="item.type === 'dropDown'">
          <ng-container *ngTemplateOutlet="menuTemplate; context: {menuItems: item.sub}"></ng-container>
        </div>


      </div>
    </li>
  </ul>
</ng-template>
```

---

#### 📄 `src/app/shared/config/theme-colors.ts`

```typescript

// Theme mode (light or dark)
export type ThemeMode = 'light' | 'dark';

// Theme configuration interface
export interface ThemeConfig {
  id: string;      // Theme ID used for CSS classes 
  name: string;    // Display name
  mode: ThemeMode; // Light or dark mode
}

// Theme IDs used for referencing themes
export const THEME_IDS = {
  NAVY_LIGHT: 'Ltemplate-navy',
  NAVY_DARK: 'Ltemplate-navy-dark',
  // GREEN_LIGHT: 'Ltemplate-green',
  // GREEN_DARK: 'Ltemplate-green-dark',
  // INDIGO_PINK_LIGHT: 'indigo-pink',
  // INDIGO_PINK_DARK: 'indigo-pink-dark'
} as const;

/**
 * Generate the theme configuration
 * No color values are defined here - all colors are defined in SCSS
 */
export function generateThemeConfig(): Record<string, ThemeConfig> {
  return {
    [THEME_IDS.NAVY_LIGHT]: {
      id: THEME_IDS.NAVY_LIGHT,
      name: 'Default Light',
      mode: 'light'
    },
    [THEME_IDS.NAVY_DARK]: {
      id: THEME_IDS.NAVY_DARK,
      name: 'Default Dark',
      mode: 'dark'
    },
    // [THEME_IDS.GREEN_LIGHT]: {
    //   id: THEME_IDS.GREEN_LIGHT,
    //   name: 'Green Light',
    //   mode: 'light'
    // },
    // [THEME_IDS.GREEN_DARK]: {
    //   id: THEME_IDS.GREEN_DARK,
    //   name: 'Green Dark',
    //   mode: 'dark'
    // },
    // [THEME_IDS.INDIGO_PINK_LIGHT]: {
    //   id: THEME_IDS.INDIGO_PINK_LIGHT,
    //   name: 'Indigo Pink',
    //   mode: 'light'
    // },
    // [THEME_IDS.INDIGO_PINK_DARK]: {
    //   id: THEME_IDS.INDIGO_PINK_DARK,
    //   name: 'Indigo Pink Dark',
    //   mode: 'dark'
    // }
  };
} 
```

---

#### 📄 `src/app/shared/directives/auto-focus.directive.ts`

```typescript
import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[autoFocus]',
    standalone: false
})
export class AutoFocusDirective {
    constructor(private el: ElementRef) {
    }
    
    public focus(): void {
        console.log(this.el.nativeElement.focus());
        (this.el.nativeElement as HTMLInputElement).focus();
    }
}
```

---

#### 📄 `src/app/shared/directives/dropdown-anchor.directive.ts`

```typescript
import { Directive, HostListener, Inject } from '@angular/core';
import { DropdownLinkDirective } from './dropdown-link.directive';

@Directive({
    selector: '[appDropdownToggle]',
    standalone: true
})
export class DropdownAnchorDirective {
  protected navlink: DropdownLinkDirective;

  constructor(@Inject(DropdownLinkDirective) navlink: DropdownLinkDirective) {
    this.navlink = navlink;
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    // console.log(this.navlink)
    this.navlink.toggle();
  }
}

```

---

#### 📄 `src/app/shared/directives/dropdown-link.directive.ts`

```typescript
import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { AppDropdownDirective } from './dropdown.directive';

@Directive({
    selector: '[appDropdownLink]',
    standalone: true
})
export class DropdownLinkDirective implements OnInit, OnDestroy {
  @Input() public group: any;

  protected _open: boolean;
  protected nav: AppDropdownDirective;

  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  public constructor(
    @Inject(AppDropdownDirective) nav: AppDropdownDirective, 
    private _elemRef: ElementRef
  ) {
    this.nav = nav;
  }

  public ngOnInit(): any {
    this.nav.addLink(this);
    // console.log('test')
    // set true if open class exists
    setTimeout(() => {
      this.open = this._elemRef.nativeElement.classList.contains('open');
    }, 100);
  }

  public ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  public toggle(): any {
    this.open = !this.open;
  }
}

```

---

#### 📄 `src/app/shared/directives/dropdown.directive.ts`

```typescript
import { Directive } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[appDropdown]',
    standalone: true
})
export class AppDropdownDirective {
  public navlinks: Array<DropdownLinkDirective> = [];

  private _router: Subscription;

  public closeOtherLinks(openLink: DropdownLinkDirective): void {
    this.navlinks.forEach((link: DropdownLinkDirective) => {
      if (link !== openLink) {
        link.open = false;
      }
    });
  }

  public addLink(link: DropdownLinkDirective): void {
    this.navlinks.push(link);
  }

  public removeGroup(link: DropdownLinkDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  public getUrl() {
    return this.router.url;
  }

  public ngOnInit(): any {
    this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.navlinks.forEach((link: DropdownLinkDirective) => {
          if (link.group) {
            const routeUrl = this.getUrl();
            const currentUrl = routeUrl.split('/');
            if (currentUrl.indexOf(link.group) > 0) {
              link.open = true;
              this.closeOtherLinks(link);
            }
          }
        });
      });
  }

  constructor(private router: Router) { }

}

```

---

#### 📄 `src/app/shared/directives/font-size.directive.ts`

```typescript
import { Directive, ElementRef, Attribute, OnInit } from '@angular/core';

@Directive({
    selector: '[fontSize]',
    standalone: false
})
export class FontSizeDirective implements OnInit {
  constructor( @Attribute('fontSize') public fontSize: string, private el: ElementRef) { }
  ngOnInit() {
    this.el.nativeElement.fontSize = this.fontSize;
  }
}

```

---

#### 📄 `src/app/shared/directives/ltemplate-highlight.directive.ts`

```typescript
import {
  Directive,
  ElementRef,
  Attribute,
  OnInit,
  Input,
  Renderer2,
  NgZone,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
  AfterContentInit
} from "@angular/core";
import HighlightJS from "highlight.js";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
    host: {
        "[class.hljs]": "true",
        "[innerHTML]": "highlightedCode"
    },
    selector: "[LtemplateHighlight]",
    standalone: false
})
export class LtemplateHighlightDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private _zone: NgZone,
    private http: HttpClient
  ) {
    this.unsubscribeAll = new Subject();
  }
  // Inner highlighted html
  highlightedCode: string = '';

  @Input() path: string = '';
  
  @Input("LtemplateHighlight") code: string = '';
  private unsubscribeAll: Subject<any>;
  @Input() languages: string[] = [];
  private originalContent: string = '';

  ngAfterContentInit() {
    // Store the original content for use if code input is empty
    this.originalContent = this.el.nativeElement.textContent || '';
  }

  ngOnInit() {
    if (this.code) {
      this.highlightElement(this.code);
    } else if (this.path) {
      this.highlightedCode = "Loading..."
      this.http
        .get(this.path, { responseType: "text" })
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(response => {
          this.highlightElement(response, this.languages);
        });
    } else if (this.originalContent) {
      // If code input is empty and no path, use the original content
      this.highlightElement(this.originalContent, this.languages);
    } else {
      // Wait for ngAfterContentInit to get content
      setTimeout(() => {
        if (!this.code && !this.path && this.originalContent) {
          this.highlightElement(this.originalContent, this.languages);
        }
      });
    }
  }

  ngOnDestroy() {
      this.unsubscribeAll.next(1);
      this.unsubscribeAll.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["code"] &&
      changes["code"].currentValue &&
      changes["code"].currentValue !== changes["code"].previousValue
    ) {
      this.highlightElement(this.code);
    } else if (
      changes["code"] && 
      !changes["code"].currentValue &&
      this.originalContent
    ) {
      // If code was reset to empty, use original content
      this.highlightElement(this.originalContent, this.languages);
    }
  }

  highlightElement(code: string, languages?: string[]) {
    this._zone.runOutsideAngular(() => {
      const res = HighlightJS.highlightAuto(code);
      this.highlightedCode = res.value;
      // this.cdr.detectChanges();
    });
  }
}

```

---

#### 📄 `src/app/shared/directives/ltemplate-side-nav-toggle.directive.ts`

```typescript
import { Directive, Host, Self, Optional, OnDestroy, OnInit } from '@angular/core';
// import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { MatSidenav } from '@angular/material/sidenav';


@Directive({
    selector: '[LtemplateSideNavToggle]',
    standalone: false
})
export class LtemplateSideNavToggleDirective implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  constructor(
    // private mediaObserver: MediaObserver,
    @Host() @Self() @Optional() public sideNav: MatSidenav
  ) {
  }

  ngOnInit() {
    this.initSideNav();
  }

  ngOnDestroy() {
    if(this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe()
    }
  }

  updateSidenav() {
    var self = this;
    setTimeout(() => {
      self.sideNav.opened = !self.isMobile;
      self.sideNav.mode = self.isMobile ? 'over' : 'side';
    })
  }
  initSideNav() {
    // this.isMobile = this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm');
    this.updateSidenav();
    // this.screenSizeWatcher = this.mediaObserver.asObservable()
    // .subscribe((change: MediaChange[]) => {
    //     this.isMobile = (change[0].mqAlias == 'xs') || (change[0].mqAlias == 'sm');
    //   this.updateSidenav();
    // });
  }

}

```

---

#### 📄 `src/app/shared/directives/ltemplate-sidenav-helper/ltemplate-sidenav-helper.directive.ts`

```typescript
import {
  Directive,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
  HostListener
} from "@angular/core";
// import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
// import { MatchMediaService } from "app/shared/services/match-media.service";
import { LtemplateSidenavHelperService } from "./ltemplate-sidenav-helper.service";
import { MatSidenav } from "@angular/material/sidenav";
// import { MediaObserver } from "@angular/flex-layout";

@Directive({
    selector: "[LtemplateSidenavHelper]",
    standalone: false
})
export class LtemplateSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding("class.is-open")
  isOpen: boolean;

  @Input("LtemplateSidenavHelper")
  id: string;

  @Input("isOpen")
  isOpenBreakpoint: string;

  private unsubscribeAll: Subject<any>;

  constructor(
    // private matchMediaService: MatchMediaService,
    private LtemplateSidenavHelperService: LtemplateSidenavHelperService,
    private matSidenav: MatSidenav,
    // private mediaObserver: MediaObserver
  ) {
    // Set the default value
    this.isOpen = true;

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.LtemplateSidenavHelperService.setSidenav(this.id, this.matSidenav);

    // if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
    //   this.isOpen = true;
    //   this.matSidenav.mode = "side";
    //   this.matSidenav.toggle(true);
    // } else {
    //   this.isOpen = false;
    //   this.matSidenav.mode = "over";
    //   this.matSidenav.toggle(false);
    // }

    // this.matchMediaService.onMediaChange
    //   .pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe(() => {
    //     if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
    //       this.isOpen = true;
    //       this.matSidenav.mode = "side";
    //       this.matSidenav.toggle(true);
    //     } else {
    //       this.isOpen = false;
    //       this.matSidenav.mode = "over";
    //       this.matSidenav.toggle(false);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
  }
}

@Directive({
    selector: "[LtemplateSidenavToggler]",
    standalone: false
})
export class LtemplateSidenavTogglerDirective {
  @Input("LtemplateSidenavToggler")
  public id: any;

  constructor(private LtemplateSidenavHelperService: LtemplateSidenavHelperService) {}

  @HostListener("click")
  onClick() {
    // console.log(this.LtemplateSidenavHelperService.getSidenav(this.id))
    this.LtemplateSidenavHelperService.getSidenav(this.id).toggle();
  }
}

```

---

#### 📄 `src/app/shared/directives/ltemplate-sidenav-helper/ltemplate-sidenav-helper.service.ts`

```typescript
import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({
  providedIn: "root"
})
export class LtemplateSidenavHelperService {
  sidenavList: MatSidenav[];

  constructor() {
    this.sidenavList = [];
  }

  setSidenav(id, sidenav): void {
    this.sidenavList[id] = sidenav;
  }

  getSidenav(id): any {
    return this.sidenavList[id];
  }
}

```

---

#### 📄 `src/app/shared/directives/scroll-to.directive.ts`

```typescript
import { Directive, ElementRef, Attribute, OnInit, HostListener } from '@angular/core';

@Directive({
    selector: '[scrollTo]',
    standalone: false
})
export class ScrollToDirective implements OnInit {
  constructor( @Attribute('scrollTo') public elmID: string, private el: ElementRef) { }

  ngOnInit() {}

  currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  };

  elmYPosition(eID: string) {
    var elm = document.getElementById(eID);
    if (!elm) {
      return 0;
    }
    var y = elm.offsetTop;
    var node: any = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  };

  @HostListener('click', ['$event'])
  smoothScroll() {
    if(!this.elmID)
      return;
    var startY = this.currentYPosition();
    var stopY = this.elmYPosition(this.elmID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 50);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
    return false;
  };
}
```

---

#### 📄 `src/app/shared/directives/shared-directives.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { FontSizeDirective } from './font-size.directive';
import { ScrollToDirective } from './scroll-to.directive';
import { AppDropdownDirective } from './dropdown.directive';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { LtemplateSideNavToggleDirective } from './ltemplate-side-nav-toggle.directive';
import { LtemplateSidenavHelperDirective, LtemplateSidenavTogglerDirective } from './ltemplate-sidenav-helper/ltemplate-sidenav-helper.directive';
import { LtemplateHighlightDirective } from './ltemplate-highlight.directive';
import { AutoFocusDirective } from './auto-focus.directive';

// Standalone directives that need to be imported
const standaloneDirectives = [
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective
];

// Non-standalone directives that need to be declared
const nonStandaloneDirectives = [
  AutoFocusDirective,
  FontSizeDirective,
  ScrollToDirective,
  LtemplateSideNavToggleDirective,
  LtemplateSidenavHelperDirective,
  LtemplateSidenavTogglerDirective,
  LtemplateHighlightDirective
];

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    // Import all standalone directives
    ...standaloneDirectives
  ],
  declarations: [
    // Only declare non-standalone directives
    ...nonStandaloneDirectives
  ],
  exports: [
    // Export both standalone and non-standalone directives
    ...standaloneDirectives,
    ...nonStandaloneDirectives
  ]
})
export class SharedDirectivesModule { }
```

---

#### 📄 `src/app/shared/guards/auth.guard.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let jwtAuthSpy: jasmine.SpyObj<JwtAuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    jwtAuthSpy = jasmine.createSpyObj('JwtAuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        { provide: JwtAuthService, useValue: jwtAuthSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user is logged in', () => {
    jwtAuthSpy.isLoggedIn.and.returnValue(true);
    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/dashboard/analytics' } as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should prevent activation and redirect to signin when user is not logged in', () => {
    jwtAuthSpy.isLoggedIn.and.returnValue(false);
    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/dashboard/analytics' } as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/sessions/signin'], {
      queryParams: { return: '/dashboard/analytics' }
    });
  });
});

```

---

#### 📄 `src/app/shared/guards/auth.guard.ts`

```typescript
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtAuth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/sessions/signin"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}

```

---

#### 📄 `src/app/shared/guards/user-role.guard.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRoleGuard } from './user-role.guard';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

describe('UserRoleGuard', () => {
  let guard: UserRoleGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let jwtAuthSpy: jasmine.SpyObj<JwtAuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    jwtAuthSpy = jasmine.createSpyObj('JwtAuthService', ['getUser']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        UserRoleGuard,
        { provide: Router, useValue: routerSpy },
        { provide: JwtAuthService, useValue: jwtAuthSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    guard = TestBed.inject(UserRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user role matches allowed roles in route data', () => {
    jwtAuthSpy.getUser.and.returnValue({ role: 'SA', displayName: 'Watson Joyce' } as any);
    const mockRoute = {
      data: { roles: ['SA', 'ADMIN'] }
    } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(true);
    expect(snackBarSpy.open).not.toHaveBeenCalled();
  });

  it('should block access and display snackbar when user role does not match allowed roles', () => {
    jwtAuthSpy.getUser.and.returnValue({ role: 'GUEST', displayName: 'Guest User' } as any);
    const mockRoute = {
      data: { roles: ['SA', 'ADMIN'] }
    } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(false);
    expect(snackBarSpy.open).toHaveBeenCalledWith('You do not have access to this page!', 'OK');
  });

  it('should block access and display snackbar when user is not logged in', () => {
    jwtAuthSpy.getUser.and.returnValue(null as any);
    const mockRoute = {
      data: { roles: ['SA'] }
    } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBe(false);
    expect(snackBarSpy.open).toHaveBeenCalledWith('You do not have access to this page!', 'OK');
  });
});

```

---

#### 📄 `src/app/shared/guards/user-role.guard.ts`

```typescript
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import {  MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private router: Router, private jwtAuth: JwtAuthService, private snack: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var user = this.jwtAuth.getUser();

    if (
      user &&
      route.data &&
      route.data.roles &&
      route.data.roles.includes(user.role)
    ) {
      return true;
    } else {
      this.snack.open('You do not have access to this page!', 'OK');
      return false;
    }
  }
}

```

---

#### 📄 `src/app/shared/helpers/utils.ts`

```typescript
export function getIndexBy(array: Array<{}>, { name, value }): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i][name] === value) {
      return i;
    }
  }
  return -1;
}

function currentYPosition(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body && document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(selector) {
  var elm = document.querySelector(selector);
  if (!selector || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    window.scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function(leapY) {
          return () => {
            window.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function(leapY) {
        return () => {
          window.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

/**
 * Gets a CSS variable value from the :root element
 * 
 * @param variableName The CSS variable name (without the -- prefix)
 * @param defaultValue Optional default value to return if the variable is not found
 * @param element Optional element to get the variable from (defaults to :root)
 * @returns The CSS variable value as a string
 * 
 * @example
 * // Get primary color RGB values
 * const primaryRgb = getCssVariable('primary-500');
 * // Returns "0, 129, 255"
 * 
 * // Use as RGB
 * element.style.backgroundColor = `rgba(${getCssVariable('primary-500')}, 0.5)`;
 * 
 * // Get with default
 * const accent = getCssVariable('accent-300', '255, 136, 72');
 */
export function getCssVariable(
  variableName: string, 
  defaultValue: string = '', 
  element: HTMLElement | null = null
): string {
  // If the window object doesn't exist (e.g., during SSR), return the default
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  // Get the element to read the CSS variable from
  const targetElement = element || document.documentElement;
  
  // Ensure variableName starts with --
  const cssVarName = variableName.startsWith('--') ? variableName : `--${variableName}`;
  
  // Get the CSS variable value using getComputedStyle
  let value = getComputedStyle(targetElement).getPropertyValue(cssVarName).trim();
  value = value || getComputedStyle(document.body).getPropertyValue(cssVarName).trim();
  // console.log(variableName, value);
  // Return the value or default if empty
  return value || defaultValue;
}

/**
 * Creates an RGB color string from CSS variable
 * 
 * @param variableName The CSS variable name (without the -- prefix)
 * @param opacity Optional opacity value (0-1)
 * @returns A CSS color value (rgb or rgba)
 * 
 * @example
 * // Get rgb color
 * const primaryColor = getRgbColorFromCssVariable('primary-500');
 * // Returns "rgb(0, 129, 255)"
 * 
 * // Get rgba color with opacity
 * const primaryWithOpacity = getRgbColorFromCssVariable('primary-500', 0.5);
 * // Returns "rgba(0, 129, 255, 0.5)"
 */
export function getRgbColorFromCssVariable(
  variableName: string,
  opacity?: number
): string {
  const rgbValues = getCssVariable(variableName);
  
  if (!rgbValues) {
    console.warn(`CSS variable --${variableName} not found or empty`);
    return '';
  }
  
  return typeof opacity === 'number' 
    ? `rgba(${rgbValues}, ${opacity})` 
    : `rgb(${rgbValues})`;
}

/**
 * Get an object with all CSS variables matching a prefix
 * 
 * @param prefix The prefix to match CSS variables (without the -- prefix)
 * @returns An object with all matching CSS variables
 * 
 * @example
 * // Get all primary color variants
 * const primaryColors = getCssVariablesByPrefix('primary');
 * // Returns { "primary-50": "236, 245, 255", "primary-100": "217, 236, 255", ... }
 */
export function getCssVariablesByPrefix(prefix: string): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const result: Record<string, string> = {};
  const styles = getComputedStyle(document.documentElement);
  const cssVars = Array.from(styles).filter(prop => 
    prop.startsWith('--') && prop.includes(prefix)
  );
  
  cssVars.forEach(prop => {
    // Remove the -- prefix for the property name
    const name = prop.substring(2);
    result[name] = styles.getPropertyValue(prop).trim();
  });
  
  return result;
}




```

---

#### 📄 `src/app/shared/helpers/window.helper.ts`

```typescript
import { ClassProvider, FactoryProvider, InjectionToken } from "@angular/core";

export function _window(): any {
  return window;
}
export const WINDOW = new InjectionToken("WindowToken");
export abstract class WindowRef {
  get nativeWindow(): Window {
    throw new Error("Not implemented.");
  }
}
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }
  get nativeWindow(): Window {
    return _window();
  }
}
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};
export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: _window,
  deps: []
};
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  windowProvider
];

```

---

#### 📄 `src/app/shared/inmemory-db/calendarEvents.ts`

```typescript
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { LtemplateCalendarEvent } from '../../shared/models/event.model';

export class CalendarEventDB {
  private colors: any = {
    red: {
      primary: '#f44336',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#247ba0 ',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#ffd97d',
      secondary: '#FDF1BA'
    }
  };

  public events:  any[] = [{
    _id: '100',
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: this.colors.red
  }, {
    _id: '101',
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: this.colors.yellow
  }, {
    _id: '102',
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: this.colors.blue
  }, {
    _id: '103',
    start: addHours(startOfDay(new Date()), 2),
    end: new Date(),
    title: 'A draggable and resizable event',
    color: this.colors.yellow,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }];
}
```

---

#### 📄 `src/app/shared/inmemory-db/chat-db.ts`

```typescript
import { ChatCollection } from "../models/chat.model";

export class ChatDB {
  public static user = [
    {
      id: "7863a6802ez0e277a0f98534",
      name: "John Doe",
      avatar: "assets/images/face-1.jpg",
      status: "online",
      chatInfo: [
        {
          chatId: "89564a680b3249760ea21fe77",
          contactId: "323sa680b3249760ea21rt47",
          contactName: "Frank Powell",
          unread: 4,
          lastChatTime: "2026-09-13T10:10:18.931Z"
        },
        {
          chatId: "3289564a680b2134760ea21fe7753",
          contactId: "14663a3406eb47ffa63d4fec9429cb71",
          contactName: "Betty Diaz",
          unread: 0,
          lastChatTime: "2026-09-12T15:45:18.931Z"
        }
      ]
    }
  ];
  public static contacts = [
    {
      id: "323sa680b3249760ea21rt47",
      name: "Frank Powell",
      avatar: "assets/images/faces/13.jpg",
      status: "online",
      mood: ""
    },
    {
      id: "14663a3406eb47ffa63d4fec9429cb71",
      name: "Betty Diaz",
      avatar: "assets/images/faces/12.jpg",
      status: "online",
      mood: ""
    },
    {
      id: "43bd9bc59d164b5aea498e3ae1c24c3c",
      name: "Brian Stephens",
      avatar: "assets/images/faces/3.jpg",
      status: "online",
      mood: ""
    },
    {
      id: "3fc8e01f3ce649d1caf884fbf4f698e4",
      name: "Jacqueline Day",
      avatar: "assets/images/faces/16.jpg",
      status: "offline",
      mood: ""
    },
    {
      id: "e929b1d790ab49968ed8e34648553df4",
      name: "Arthur Mendoza",
      avatar: "assets/images/faces/10.jpg",
      status: "online",
      mood: ""
    },
    {
      id: "d6caf04bba614632b5fecf91aebf4564",
      name: "Jeremy Lee",
      avatar: "assets/images/faces/9.jpg",
      status: "offline",
      mood: ""
    },
    {
      id: "be0fb188c8e242f097fafa24632107e4",
      name: "Johnny Newman",
      avatar: "assets/images/faces/5.jpg",
      status: "offline",
      mood: ""
    },
    {
      id: "dea902191b964a68ba5f2d93cff37e13",
      name: "Jeffrey Little",
      avatar: "assets/images/faces/15.jpg",
      status: "online",
      mood: ""
    },
    {
      id: "0bf58f5ccc4543a9f8747350b7bda3c7",
      name: "Barbara Romero",
      avatar: "assets/images/faces/4.jpg",
      status: "offline",
      mood: ""
    },
    {
      id: "c5d7498bbcb84d81fc72168871ac6a6e",
      name: "Daniel James",
      avatar: "assets/images/faces/2.jpg",
      status: "offline",
      mood: ""
    },
    {
      id: "97bfbdd9413e46efdaca2010400fe18c",
      name: "Alice Sanders",
      avatar: "assets/images/faces/17.jpg",
      status: "offline",
      mood: ""
    }
  ];
  public static chatCollection: ChatCollection[] = [
    {
      id: "89564a680b3249760ea21fe77",
      chats: [
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Hi Watson, how is the staging deployment looking for v4.2?",
          time: "2026-09-13T10:05:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "The staging deployment completed successfully. All automated smoke tests passed.",
          time: "2026-09-13T10:07:28.291Z"
        },
        {
          contactId: "323sa680b3249760ea21rt47",
          text: "Great! Let me review the canary telemetry. I'll let you know once we are ready for production promotion.",
          time: "2026-09-13T10:09:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Sounds great, standing by.",
          time: "2026-09-13T10:10:28.291Z"
        },
      ]
    },
    {
      id: "3289564a680b2134760ea21fe7753",
      chats: [
        {
          contactId: "14663a3406eb47ffa63d4fec9429cb71",
          text: "Hi Watson, did you review the updated API gateway throttling policies?",
          time: "2026-09-12T15:40:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Yes, I checked the rate limit headers. The 5,000 req/min threshold looks well balanced for enterprise tenants.",
          time: "2026-09-12T15:42:28.291Z"
        },
        {
          contactId: "14663a3406eb47ffa63d4fec9429cb71",
          text: "Perfect, I'll update the developer documentation accordingly.",
          time: "2026-09-12T15:44:28.291Z"
        },
        {
          contactId: "7863a6802ez0e277a0f98534",
          text: "Thanks Betty, appreciate the quick turnaround!",
          time: "2026-09-12T15:45:28.291Z"
        }
      ]
    }
  ];
}

```

---

#### 📄 `src/app/shared/inmemory-db/countries.ts`

```typescript
export class CountryDB {
  public countries = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Cote D\'Ivoire', code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Lao People\'S Democratic Republic', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' }
  ]
}
```

---

#### 📄 `src/app/shared/inmemory-db/inbox.ts`

```typescript
export class InboxDB {
  public messages = [
    {
      sender: {
        name: 'Elena Rostova',
        photo: 'assets/images/face-1.jpg'
      },
      date: new Date('2026-09-12T14:30:00'),
      selected: false,
      subject: 'Welcome to the Ltemplate Enterprise Platform',
      message: `<p>Hi Watson,</p>
            <p>Welcome to your newly provisioned enterprise workspace! Your organization cluster and initial administrative credentials have been successfully activated.</p>
            <p>Here are three quick recommendations to get your team onboarded smoothly:</p>
            <ul>
              <li><strong>Configure Single Sign-On (SSO):</strong> Navigate to Organization Settings to connect your Okta or Google Workspace IdP.</li>
              <li><strong>Review Role-Based Access:</strong> Assign custom roles and scope API tokens per environment.</li>
              <li><strong>Set Up Webhooks:</strong> Configure event dispatch endpoints for real-time order and audit notifications.</li>
            </ul>
            <p>If you have any questions or need architecture assistance, feel free to reply directly to this thread.</p><br>
            Best regards,<br>
            Elena Rostova<br>
            Head of Solutions Architecture`
    },
    {
      sender: {
        name: 'Security Operations',
        photo: 'assets/images/face-2.jpg'
      },
      date: new Date('2026-09-11T09:15:00'),
      selected: false,
      subject: 'Security Advisory: Scheduled TLS Certificate Rotation',
      message: `<p>Hello Team,</p>
            <p>This is an automated notification regarding the scheduled rotation of ingress SSL/TLS certificates across our production clusters.</p>
            <blockquote>
            Maintenance Window: Saturday, September 19, 2026 — 02:00 to 02:30 UTC.<br>
            Expected Impact: Zero downtime. Active sessions and WebSocket streams will maintain transparent connection failover.
            </blockquote>
            <p>All automated verification checks and staging canary deployments have passed with 100% compliance. No manual action is required on your end.</p><br>
            Regards,<br>
            SecOps Team`
    },
    {
      sender: {
        name: 'Marcus Vance',
        photo: 'assets/images/face-3.jpg'
      },
      date: new Date('2026-09-09T16:45:00'),
      selected: false,
      subject: 'Q3 Cloud Infrastructure & Latency Benchmark Report',
      message: `<p>Hi Watson,</p>
            <p>Attached is our comprehensive Q3 infrastructure review. Over the past quarter, average API response times decreased from 145ms to 84ms following our PostgreSQL connection pool optimization and Redis multi-region caching rollout.</p>
            <p>Key highlights from the report:</p>
            <ul>
              <li>99.992% uptime achieved across all three production availability zones.</li>
              <li>Peak throughput reached 42,000 requests/sec with zero packet loss.</li>
              <li>Infrastructure cost per 1M transactions reduced by 18.5%.</li>
            </ul>
            <p>Let me know if you would like to review the Grafana telemetry dashboards together during our Thursday sync.</p><br>
            Cheers,<br>
            Marcus`
    },
    {
      sender: {
        name: 'Billing & Invoicing',
        photo: 'assets/images/face-4.jpg'
      },
      date: new Date('2026-09-07T11:00:00'),
      selected: false,
      subject: 'Invoice INV-2026-004 Confirmation & Receipt',
      message: `<p>Dear Watson,</p>
            <p>Thank you for your business. Your recent payment for <strong>Enterprise SaaS Platform Annual Subscription</strong> has been processed successfully.</p>
            <p><strong>Invoice Number:</strong> INV-2026-004<br>
            <strong>Billing Period:</strong> September 2026 – September 2027<br>
            <strong>Amount Paid:</strong> $12,500.00 USD (Includes 10% VAT)</p>
            <p>You can download the full PDF receipt and view past invoice history directly from your Billing Portal.</p><br>
            Kind regards,<br>
            Ltemplate Finance Team`
    },
    {
      sender: {
        name: 'Michael Chang',
        photo: 'assets/images/face-5.jpg'
      },
      date: new Date('2026-09-05T13:20:00'),
      selected: false,
      subject: 'Pull Request Approved: Angular 20 Signals & Zoneless Migration',
      message: `<p>Watson,</p>
            <p>I completed the code review for PR #142 (Migration of core dashboard widgets to signal-based inputs and zoneless change detection).</p>
            <p>Bundle size decreased by 14% and initial contentful paint improved by 120ms in our Lighthouse benchmarks. I have approved and merged the branch into <code>main</code>.</p>
            <p>Automated staging smoke tests are green. Ready for production rollout whenever you give the green light.</p><br>
            Thanks,<br>
            Michael`
    },
    {
      sender: {
        name: 'Sarah Connor',
        photo: 'assets/images/face-6.jpg'
      },
      date: new Date('2026-09-03T10:10:00'),
      selected: false,
      subject: 'Webhook Delivery Retries: Operational Best Practices',
      message: `<p>Hello Platform Engineering,</p>
            <p>Following customer inquiries regarding webhook reliability during third-party gateway downtime, we have implemented an exponential backoff policy with automatic jitter.</p>
            <blockquote>
            Failed dispatches are now retried at 5s, 30s, 5m, 30m, and 2h intervals before routing to the Dead Letter Queue (DLQ).
            </blockquote>
            <p>Documentation and testing sandbox scripts have been published to the Developer Portal.</p><br>
            Best,<br>
            Sarah`
    },
    {
      sender: {
        name: 'David Kim',
        photo: 'assets/images/face-2.jpg'
      },
      date: new Date('2026-08-30T15:00:00'),
      selected: false,
      subject: 'API v3 Deprecation Timeline & SDK Migration Guide',
      message: `<p>Hi Watson,</p>
            <p>Please note that legacy API v2 endpoints will sunset on December 31, 2026. All partner integrations must migrate to API v3 which provides OpenAPI 3.1 specifications, gRPC streaming, and field masking.</p>
            <p>The TypeScript SDK v3.4.0 is now published to npm and includes drop-in backward compatibility wrappers.</p><br>
            Regards,<br>
            David Kim<br>
            Developer Relations`
    },
    {
      sender: {
        name: 'Maya Jenkins',
        photo: 'assets/images/face-4.jpg'
      },
      date: new Date('2026-08-25T08:30:00'),
      selected: false,
      subject: 'Customer Feedback Summary: August Enterprise Cohort',
      message: `<p>Hi Team,</p>
            <p>We received overwhelmingly positive feedback from our August enterprise beta cohort. Customers particularly highlighted the speed of the cryptocurrency real-time tracker and the intuitive invoice generator.</p>
            <p>Overall Customer Satisfaction (CSAT) score reached 4.9/5.0 with a Net Promoter Score (NPS) of +68.</p><br>
            Keep up the great work!<br>
            Maya`
    }
  ]
}
```

---

#### 📄 `src/app/shared/inmemory-db/inmemory-db.service.ts`

```typescript
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ChatDB } from './chat-db';
import { InvoiceDB } from './invoices';
import { Todo, TodoTag } from './todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { 
      'contacts': ChatDB.contacts,
      'chat-collections': ChatDB.chatCollection,
      'chat-user': ChatDB.user,
      'invoices': InvoiceDB.invoices,
      'todoList': Todo.todoList,
      'todoTag': TodoTag.tag
    }
  }
}
```

---

#### 📄 `src/app/shared/inmemory-db/invoices.ts`

```typescript
import { Invoice } from "../models/invoice.model";

export class InvoiceDB {
  static invoices: Invoice[] = [
      {
          id: '5a9ae2106518248b68251fd1',
          orderNo: 'INV-2026-001',
          status: 'pending',
          date: (new Date()),
          currency: '$',
          vat: 10,
          buyer: {
              name: 'Schoen, Conn & Mills Corp',
              address: 'finance@senger.com \n 61 Johnson St. Shirley, NY 11967 \n \n +1 (202) 555-0170',
          },
          seller: {
              name: 'Ltemplate Systems Inc.',
              address: 'billing@ltemplate.dev \n 100 Montgomery St, Suite 1800. San Francisco, CA 94104 \n \n +1 (415) 555-0199',
          },
          item: [{
              name: 'Enterprise Cloud Platform License',
              unit: 1,
              price: 1800
          }, {
              name: 'Dedicated Kubernetes Cluster Support',
              unit: 12,
              price: 250
          }]
      },
      {
          id: '5a9ae2106518248b68251fd2',
          orderNo: 'INV-2026-002',
          status: 'processing',
          date: (new Date()),
          currency: '$',
          vat: 10,
          buyer: {
              name: 'New Age Technologies Inc.',
              address: 'accounts@newage-tech.io \n 7664 Rockcrest Road. Longview, TX 75604 \n \n +1 (202) 555-0153',
          },
          seller: {
              name: 'Ltemplate Systems Inc.',
              address: 'billing@ltemplate.dev \n 100 Montgomery St, Suite 1800. San Francisco, CA 94104 \n \n +1 (415) 555-0199',
          },
          item: [{
              name: 'Full-Stack Architecture Consulting',
              unit: 40,
              price: 150
          }, {
              name: 'High-Availability Database Tuning',
              unit: 1,
              price: 2500
          }]
      },
      {
          id: '5a9ae2106518248b68251fd3',
          orderNo: 'INV-2026-003',
          status: 'delivered',
          date: (new Date()),
          currency: '$',
          vat: 10,
          buyer: {
              name: 'Predovic, Schowalter & Haag Ltd',
              address: 'billing@price-consulting.com \n 7178 Plumb Branch Dr. South Bend, IN 46614 \n \n +1 (574) 555-0182',
          },
          seller: {
              name: 'Ltemplate Systems Inc.',
              address: 'billing@ltemplate.dev \n 100 Montgomery St, Suite 1800. San Francisco, CA 94104 \n \n +1 (415) 555-0199',
          },
          item: [{
              name: 'Security Audit & Compliance Review',
              unit: 1,
              price: 5000
          }, {
              name: 'Automated CI/CD Pipeline Integration',
              unit: 1,
              price: 3500
          }]
      },
      {
          id: '5a9ae2106518248b68251fd4',
          orderNo: 'INV-2026-004',
          status: 'delivered',
          date: (new Date()),
          currency: '$',
          vat: 10,
          buyer: {
              name: 'Hane Global PLC',
              address: 'procurement@hane-global.org \n 858 8th St. Nanuet, NY 10954 \n \n +1 (202) 555-0131',
          },
          seller: {
              name: 'Ltemplate Systems Inc.',
              address: 'billing@ltemplate.dev \n 100 Montgomery St, Suite 1800. San Francisco, CA 94104 \n \n +1 (415) 555-0199',
          },
          item: [{
              name: 'SaaS Platform Annual Subscription (500 Seats)',
              unit: 1,
              price: 12000
          }, {
              name: 'Priority 24/7 SLA Incident Response',
              unit: 12,
              price: 500
          }]
      }
  ]
}
```

---

#### 📄 `src/app/shared/inmemory-db/orders.ts`

```typescript
export class OrderDB {
  static orders = [
    {
      id: 1,
      
    }
  ]
}
```

---

#### 📄 `src/app/shared/inmemory-db/products.ts`

```typescript
export class ProductDB {
  public products = [
    {
        "_id": "5a9ae2106518248b68251fdf",
        "name": "Wireless Bluetooth V4.0 Portable Speaker",
        "subtitle": "Deep bass and 12-hour battery life",
        "description": "Premium wireless portable speaker with dual acoustic drivers, rich bass radiators, and IPX7 waterproof protection.",
        "category": "speaker",
        "tags": [
            "bluetooth",
            "audio",
            "wireless"
        ],
        "price": {
            "sale": 32,
            "previous": 54
        },
        "ratings": {
            "rating": 3.86,
            "ratingCount": 26
        },
        "features": [
            "12-hour playtime",
            "IPX7 waterproof",
            "Dual acoustic drivers"
        ],
        "photo": "../../../../assets/images/products/speaker-1.jpg",
        "gallery": [
            "../../../../assets/images/products/speaker-1.jpg",
            "../../../../assets/images/products/speaker-2.jpg"
        ],
        "badge": {
            "text": "20% off",
            "color": "#0D47A1"
        }
    },
    {
        "_id": "5a9ae210b7b4d3ad2f048bbe",
        "name": "Portable Speaker with HD Sound",
        "subtitle": "Crystal clear acoustics with hands-free calling",
        "description": "Compact bluetooth speaker with 360-degree omnidirectional sound, integrated conference mic, and USB-C fast charge.",
        "category": "speaker",
        "tags": [
            "speaker",
            "portable",
            "bluetooth"
        ],
        "price": {
            "sale": 25,
            "previous": 43
        },
        "ratings": {
            "rating": 3.72,
            "ratingCount": 18
        },
        "features": [
            "Omnidirectional sound",
            "Built-in mic",
            "USB-C fast charging"
        ],
        "photo": "../../../../assets/images/products/speaker-2.jpg",
        "gallery": [
            "../../../../assets/images/products/speaker-1.jpg",
            "../../../../assets/images/products/speaker-2.jpg"
        ],
        "badge": {
            "text": "Sale",
            "color": "#DD2C00"
        }
    },
    {
        "_id": "5a9ae210d9a8d6dda7256417",
        "name": "Lightweight On-Ear Headphones - Black",
        "subtitle": "On-ear fit to minimize noise so you can hear every beat",
        "description": "Padded ergonomic on-ear headphones with active noise reduction, ultra-lightweight band, and tangle-free braided cable.",
        "category": "headphone",
        "tags": [
            "headphones",
            "audio",
            "wired"
        ],
        "price": {
            "sale": 29,
            "previous": 55
        },
        "ratings": {
            "rating": 3.79,
            "ratingCount": 77
        },
        "features": [
            "Noise reduction",
            "Ergonomic cushions",
            "Tangle-free cable"
        ],
        "photo": "../../../../assets/images/products/headphone-2.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "-40%",
            "color": "#0288D1"
        }
    },
    {
        "_id": "5a9ae210e8329237332e56d7",
        "name": "Automatic-self-wind mens Watch",
        "subtitle": "Precision automatic mechanical movement with sapphire glass",
        "description": "Luxury self-winding stainless steel mechanical watch with scratch-resistant sapphire crystal and water resistance.",
        "category": "watch",
        "tags": [
            "watch",
            "luxury",
            "automatic"
        ],
        "price": {
            "sale": 33,
            "previous": 58
        },
        "ratings": {
            "rating": 4.74,
            "ratingCount": 64
        },
        "features": [
            "Sapphire crystal",
            "Stainless steel band",
            "50m water resistant"
        ],
        "photo": "../../../../assets/images/products/watch-1.jpg",
        "gallery": [
            "../../../../assets/images/products/watch-1.jpg",
            "../../../../assets/images/products/watch-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae210cb9937d28c6eca1a",
        "name": "Automatic-self-wind mens Watch 5102PR-001",
        "subtitle": "Chronograph exhibition caseback with leather strap",
        "description": "Classic automatic chronograph wristwatch with genuine Italian leather band and luminous dial hands.",
        "category": "watch",
        "tags": [
            "watch",
            "chronograph",
            "leather"
        ],
        "price": {
            "sale": 38,
            "previous": 50
        },
        "ratings": {
            "rating": 4.43,
            "ratingCount": 98
        },
        "features": [
            "Exhibition caseback",
            "Genuine leather",
            "Luminous dials"
        ],
        "photo": "../../../../assets/images/products/watch-2.jpg",
        "gallery": [
            "../../../../assets/images/products/watch-1.jpg",
            "../../../../assets/images/products/watch-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2106f155194e5c95d67",
        "name": "On-Ear Headphones - Black",
        "subtitle": "Studio monitoring grade sound fidelity",
        "description": "High-resolution studio monitoring headphones designed for audio engineers, producers, and discerning listeners.",
        "category": "headphone",
        "tags": [
            "studio",
            "headphones",
            "hifi"
        ],
        "price": {
            "sale": 38,
            "previous": 54
        },
        "ratings": {
            "rating": 4.84,
            "ratingCount": 52
        },
        "features": [
            "40mm neodymium drivers",
            "Foldable design",
            "Detachable cable"
        ],
        "photo": "../../../../assets/images/products/headphone-3.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2101625a02fee92e27f",
        "name": "In-Ear Headphone",
        "subtitle": "Ergonomic in-ear buds with dynamic drivers",
        "description": "Sweat-resistant sports in-ear earphones with comfortable silicone ear tips, balanced bass, and inline remote control.",
        "category": "headphone",
        "tags": [
            "in-ear",
            "earphones",
            "sports"
        ],
        "price": {
            "sale": 31,
            "previous": 58
        },
        "ratings": {
            "rating": 3.18,
            "ratingCount": 90
        },
        "features": [
            "Sweat-resistant",
            "Silicone ear tips",
            "Inline microphone"
        ],
        "photo": "../../../../assets/images/products/headphone-4.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2108970b01447ec34aa",
        "name": "Smart Phone Pro 128GB - Space Gray",
        "subtitle": "Edge-to-edge Super Retina OLED display",
        "description": "Next-generation flagship smartphone with 5G connectivity, advanced triple-camera system, and all-day battery performance.",
        "category": "phone",
        "tags": [
            "smartphone",
            "5g",
            "oled"
        ],
        "price": {
            "sale": 22,
            "previous": 44
        },
        "ratings": {
            "rating": 3.53,
            "ratingCount": 47
        },
        "features": [
            "Super Retina OLED",
            "Triple 48MP camera",
            "All-day battery"
        ],
        "photo": "../../../../assets/images/products/iphone-2.jpg",
        "gallery": [
            "../../../../assets/images/products/iphone-1.jpg",
            "../../../../assets/images/products/iphone-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2103c04707145e21300",
        "name": "Smart Phone Ultra 256GB - Silver",
        "subtitle": "Aerospace-grade titanium frame with high refresh display",
        "description": "Ultra performance smartphone powered by the latest mobile processor, cinema-grade video recording, and high-speed memory.",
        "category": "phone",
        "tags": [
            "smartphone",
            "5g",
            "titanium"
        ],
        "price": {
            "sale": 31,
            "previous": 40
        },
        "ratings": {
            "rating": 3.42,
            "ratingCount": 35
        },
        "features": [
            "120Hz ProMotion",
            "Titanium build",
            "256GB storage"
        ],
        "photo": "../../../../assets/images/products/iphone-1.jpg",
        "gallery": [
            "../../../../assets/images/products/iphone-1.jpg",
            "../../../../assets/images/products/iphone-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae21021b2911c97ad6c5b",
        "name": "Over-Ear Headphones, Stereo Lightweight Adjustable Wired Headset",
        "subtitle": "Ultra-plush memory foam earcups for extended listening",
        "description": "Comfortable over-ear headphones with balanced acoustic tuning, passive noise isolation, and adjustable steel-reinforced headband.",
        "category": "headphone",
        "tags": [
            "over-ear",
            "headphones",
            "stereo"
        ],
        "price": {
            "sale": 33,
            "previous": 57
        },
        "ratings": {
            "rating": 3.51,
            "ratingCount": 60
        },
        "features": [
            "Memory foam earcups",
            "Steel headband",
            "Gold-plated 3.5mm jack"
        ],
        "photo": "../../../../assets/images/products/headphone-1.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2106518248b68251fdf",
        "name": "Wireless Bluetooth V4.0 Portable Speaker",
        "subtitle": "Deep bass and 12-hour battery life",
        "description": "Premium wireless portable speaker with dual acoustic drivers, rich bass radiators, and IPX7 waterproof protection.",
        "category": "speaker",
        "tags": [
            "bluetooth",
            "audio",
            "wireless"
        ],
        "price": {
            "sale": 32,
            "previous": 54
        },
        "ratings": {
            "rating": 3.86,
            "ratingCount": 26
        },
        "features": [
            "12-hour playtime",
            "IPX7 waterproof",
            "Dual acoustic drivers"
        ],
        "photo": "../../../../assets/images/products/speaker-1.jpg",
        "gallery": [
            "../../../../assets/images/products/speaker-1.jpg",
            "../../../../assets/images/products/speaker-2.jpg"
        ],
        "badge": {
            "text": "20% off",
            "color": "#0D47A1"
        }
    },
    {
        "_id": "5a9ae210b7b4d3ad2f048bbe",
        "name": "Portable Speaker with HD Sound",
        "subtitle": "Crystal clear acoustics with hands-free calling",
        "description": "Compact bluetooth speaker with 360-degree omnidirectional sound, integrated conference mic, and USB-C fast charge.",
        "category": "speaker",
        "tags": [
            "speaker",
            "portable",
            "bluetooth"
        ],
        "price": {
            "sale": 25,
            "previous": 43
        },
        "ratings": {
            "rating": 3.72,
            "ratingCount": 18
        },
        "features": [
            "Omnidirectional sound",
            "Built-in mic",
            "USB-C fast charging"
        ],
        "photo": "../../../../assets/images/products/speaker-2.jpg",
        "gallery": [
            "../../../../assets/images/products/speaker-1.jpg",
            "../../../../assets/images/products/speaker-2.jpg"
        ],
        "badge": {
            "text": "Sale",
            "color": "#DD2C00"
        }
    },
    {
        "_id": "5a9ae210d9a8d6dda7256417",
        "name": "Lightweight On-Ear Headphones - Black",
        "subtitle": "On-ear fit to minimize noise so you can hear every beat",
        "description": "Padded ergonomic on-ear headphones with active noise reduction, ultra-lightweight band, and tangle-free braided cable.",
        "category": "headphone",
        "tags": [
            "headphones",
            "audio",
            "wired"
        ],
        "price": {
            "sale": 29,
            "previous": 55
        },
        "ratings": {
            "rating": 3.79,
            "ratingCount": 77
        },
        "features": [
            "Noise reduction",
            "Ergonomic cushions",
            "Tangle-free cable"
        ],
        "photo": "../../../../assets/images/products/headphone-2.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "-40%",
            "color": "#0288D1"
        }
    },
    {
        "_id": "5a9ae210e8329237332e56d7",
        "name": "Automatic-self-wind mens Watch",
        "subtitle": "Precision automatic mechanical movement with sapphire glass",
        "description": "Luxury self-winding stainless steel mechanical watch with scratch-resistant sapphire crystal and water resistance.",
        "category": "watch",
        "tags": [
            "watch",
            "luxury",
            "automatic"
        ],
        "price": {
            "sale": 33,
            "previous": 58
        },
        "ratings": {
            "rating": 4.74,
            "ratingCount": 64
        },
        "features": [
            "Sapphire crystal",
            "Stainless steel band",
            "50m water resistant"
        ],
        "photo": "../../../../assets/images/products/watch-1.jpg",
        "gallery": [
            "../../../../assets/images/products/watch-1.jpg",
            "../../../../assets/images/products/watch-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae210cb9937d28c6eca1a",
        "name": "Automatic-self-wind mens Watch 5102PR-001",
        "subtitle": "Chronograph exhibition caseback with leather strap",
        "description": "Classic automatic chronograph wristwatch with genuine Italian leather band and luminous dial hands.",
        "category": "watch",
        "tags": [
            "watch",
            "chronograph",
            "leather"
        ],
        "price": {
            "sale": 38,
            "previous": 50
        },
        "ratings": {
            "rating": 4.43,
            "ratingCount": 98
        },
        "features": [
            "Exhibition caseback",
            "Genuine leather",
            "Luminous dials"
        ],
        "photo": "../../../../assets/images/products/watch-2.jpg",
        "gallery": [
            "../../../../assets/images/products/watch-1.jpg",
            "../../../../assets/images/products/watch-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2106f155194e5c95d67",
        "name": "On-Ear Headphones - Black",
        "subtitle": "Studio monitoring grade sound fidelity",
        "description": "High-resolution studio monitoring headphones designed for audio engineers, producers, and discerning listeners.",
        "category": "headphone",
        "tags": [
            "studio",
            "headphones",
            "hifi"
        ],
        "price": {
            "sale": 38,
            "previous": 54
        },
        "ratings": {
            "rating": 4.84,
            "ratingCount": 52
        },
        "features": [
            "40mm neodymium drivers",
            "Foldable design",
            "Detachable cable"
        ],
        "photo": "../../../../assets/images/products/headphone-3.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2101625a02fee92e27f",
        "name": "In-Ear Headphone",
        "subtitle": "Ergonomic in-ear buds with dynamic drivers",
        "description": "Sweat-resistant sports in-ear earphones with comfortable silicone ear tips, balanced bass, and inline remote control.",
        "category": "headphone",
        "tags": [
            "in-ear",
            "earphones",
            "sports"
        ],
        "price": {
            "sale": 31,
            "previous": 58
        },
        "ratings": {
            "rating": 3.18,
            "ratingCount": 90
        },
        "features": [
            "Sweat-resistant",
            "Silicone ear tips",
            "Inline microphone"
        ],
        "photo": "../../../../assets/images/products/headphone-4.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2108970b01447ec34aa",
        "name": "Smart Phone Pro 128GB - Space Gray",
        "subtitle": "Edge-to-edge Super Retina OLED display",
        "description": "Next-generation flagship smartphone with 5G connectivity, advanced triple-camera system, and all-day battery performance.",
        "category": "phone",
        "tags": [
            "smartphone",
            "5g",
            "oled"
        ],
        "price": {
            "sale": 22,
            "previous": 44
        },
        "ratings": {
            "rating": 3.53,
            "ratingCount": 47
        },
        "features": [
            "Super Retina OLED",
            "Triple 48MP camera",
            "All-day battery"
        ],
        "photo": "../../../../assets/images/products/iphone-2.jpg",
        "gallery": [
            "../../../../assets/images/products/iphone-1.jpg",
            "../../../../assets/images/products/iphone-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae2103c04707145e21300",
        "name": "Smart Phone Ultra 256GB - Silver",
        "subtitle": "Aerospace-grade titanium frame with high refresh display",
        "description": "Ultra performance smartphone powered by the latest mobile processor, cinema-grade video recording, and high-speed memory.",
        "category": "phone",
        "tags": [
            "smartphone",
            "5g",
            "titanium"
        ],
        "price": {
            "sale": 31,
            "previous": 40
        },
        "ratings": {
            "rating": 3.42,
            "ratingCount": 35
        },
        "features": [
            "120Hz ProMotion",
            "Titanium build",
            "256GB storage"
        ],
        "photo": "../../../../assets/images/products/iphone-1.jpg",
        "gallery": [
            "../../../../assets/images/products/iphone-1.jpg",
            "../../../../assets/images/products/iphone-2.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    },
    {
        "_id": "5a9ae21021b2911c97ad6c5b",
        "name": "Over-Ear Headphones, Stereo Lightweight Adjustable Wired Headset",
        "subtitle": "Ultra-plush memory foam earcups for extended listening",
        "description": "Comfortable over-ear headphones with balanced acoustic tuning, passive noise isolation, and adjustable steel-reinforced headband.",
        "category": "headphone",
        "tags": [
            "over-ear",
            "headphones",
            "stereo"
        ],
        "price": {
            "sale": 33,
            "previous": 57
        },
        "ratings": {
            "rating": 3.51,
            "ratingCount": 60
        },
        "features": [
            "Memory foam earcups",
            "Steel headband",
            "Gold-plated 3.5mm jack"
        ],
        "photo": "../../../../assets/images/products/headphone-1.jpg",
        "gallery": [
            "../../../../assets/images/products/headphone-1.jpg",
            "../../../../assets/images/products/headphone-2.jpg",
            "../../../../assets/images/products/headphone-3.jpg",
            "../../../../assets/images/products/headphone-4.jpg"
        ],
        "badge": {
            "text": "",
            "color": "red"
        }
    }
];
}

```

---

#### 📄 `src/app/shared/inmemory-db/todo.ts`

```typescript
import { TagItem, TodoItem } from "../models/todo.model";

export class Todo {
  static todoList: TodoItem[] = [
    {
      id: 1,
      title: "Optimize GraphQL query resolvers",
      note: "Review N+1 query patterns in data analytics resolvers and implement DataLoader batching.",
      important: true,
      starred: true,
      done: false,
      read: false,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      tag: [1, 2]
    },
    {
      id: 2,
      title: "Mobile responsive layout audit",
      note: "Verify navigation drawer gestures and table horizontal scrolling across iOS Safari and Android Chrome.",
      important: false,
      starred: false,
      done: true,
      read: true,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      tag: [1, 5]
    },
    {
      id: 3,
      title: "Implement silent token refresh",
      note: "Ensure seamless background JWT token rotation before expiration to prevent user session disconnects.",
      important: false,
      starred: false,
      done: true,
      read: false,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      tag: [2, 3]
    },
    {
      id: 4,
      title: "Configure Prometheus alerting rules",
      note: "Set up alerting rules for Redis connection saturation, container restart loops, and elevated 5xx error rates.",
      important: false,
      starred: true,
      done: false,
      read: true,
      selected: false,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      tag: [2, 4]
    }
  ];
  read: any;
}

// ============================================
export class TodoTag {
  static tag: TagItem[] = [
    {
      id: 1,
      name: "frontend"
    },
    {
      id: 2,
      name: "backend"
    },
    {
      id: 3,
      name: "API"
    },
    {
      id: 4,
      name: "issue"
    },
    {
      id: 5,
      name: "mobile"
    }
  ];
}

```

---

#### 📄 `src/app/shared/inmemory-db/users.ts`

```typescript
export class UserDB {
  public users = [
    {
      '_id': '5a7b73f76bed15c94d1e46d4',
      'index': 0,
      'guid': 'c01da2d1-07f8-4acc-a1e3-72dda7310af8',
      'isActive': false,
      'balance': 2838.08,
      'age': 30,
      'name': 'Stefanie Marsh',
      'gender': 'female',
      'company': 'ACIUM',
      'email': 'stefaniemarsh@acium.com',
      'phone': '+1 (857) 535-2066',
      'address': '163 Poplar Avenue, Cliffside, Virginia, 4592',
      'bd': '2015-02-08T04:28:44 -06:00'
    },
    {
      '_id': '5a7b73f7f79f4250b96a355a',
      'index': 1,
      'guid': '3f04aa40-62da-466d-ac14-2b8a5da3d1ce',
      'isActive': true,
      'balance': 3043.81,
      'age': 39,
      'name': 'Elena Bennett',
      'gender': 'female',
      'company': 'FIBRODYNE',
      'email': 'elenabennett@fibrodyne.com',
      'phone': '+1 (994) 570-2070',
      'address': '526 Grace Court, Cherokee, Oregon, 7017',
      'bd': '2017-11-15T09:04:57 -06:00'
    },
    {
      '_id': '5a7b73f78b64a02a67204d6e',
      'index': 2,
      'guid': 'e7d9d61e-b657-4fcf-b069-2eb9bfdc44fa',
      'isActive': true,
      'balance': 1796.92,
      'age': 23,
      'name': 'Joni Cabrera',
      'gender': 'female',
      'company': 'POWERNET',
      'email': 'jonicabrera@powernet.com',
      'phone': '+1 (848) 410-2368',
      'address': '554 Barlow Drive, Alamo, Michigan, 3686',
      'bd': '2017-10-15T12:55:51 -06:00'
    },
    {
      '_id': '5a7b73f7572e59b231149b94',
      'index': 3,
      'guid': '47673d82-ab31-48a1-8a16-2c6701573c67',
      'isActive': false,
      'balance': 2850.27,
      'age': 37,
      'name': 'Gallagher Shaw',
      'gender': 'male',
      'company': 'ZILLAR',
      'email': 'gallaghershaw@zillar.com',
      'phone': '+1 (896) 422-3786',
      'address': '111 Argyle Road, Graball, Idaho, 7272',
      'bd': '2017-11-19T03:38:30 -06:00'
    },
    {
      '_id': '5a7b73f70f9d074552e13090',
      'index': 4,
      'guid': 'bc9c7cd3-04e0-4095-a933-af28efaf3b3e',
      'isActive': false,
      'balance': 3743.48,
      'age': 26,
      'name': 'Blanchard Knapp',
      'gender': 'male',
      'company': 'ACRODANCE',
      'email': 'blanchardknapp@acrodance.com',
      'phone': '+1 (867) 542-2772',
      'address': '707 Malta Street, Yukon, Wyoming, 6861',
      'bd': '2014-05-28T01:33:58 -06:00'
    },
    {
      '_id': '5a7b73f78988bd6e92650473',
      'index': 5,
      'guid': '08cb947c-e49c-4736-9687-0fca0992ec38',
      'isActive': false,
      'balance': 3453.79,
      'age': 34,
      'name': 'Parker Rivas',
      'gender': 'male',
      'company': 'SLAMBDA',
      'email': 'parkerrivas@slambda.com',
      'phone': '+1 (997) 413-2418',
      'address': '543 Roosevelt Place, Tibbie, Minnesota, 6944',
      'bd': '2015-01-05T09:55:23 -06:00'
    },
    {
      '_id': '5a7b73f72488770f90649570',
      'index': 6,
      'guid': '771c85d5-7762-4bae-96fd-09892a9c4374',
      'isActive': false,
      'balance': 3334.73,
      'age': 20,
      'name': 'Alexandria Forbes',
      'gender': 'female',
      'company': 'EQUITOX',
      'email': 'alexandriaforbes@equitox.com',
      'phone': '+1 (869) 521-2533',
      'address': '663 Minna Street, Omar, Alabama, 5265',
      'bd': '2017-03-09T05:48:57 -06:00'
    },
    {
      '_id': '5a7b73f7c576e368b321a705',
      'index': 7,
      'guid': '2455a7ef-a537-46e1-a210-75e5e2187460',
      'isActive': false,
      'balance': 3488.64,
      'age': 37,
      'name': 'Lessie Wise',
      'gender': 'female',
      'company': 'AFFLUEX',
      'email': 'lessiewise@affluex.com',
      'phone': '+1 (820) 404-2967',
      'address': '752 Woodhull Street, Utting, Oklahoma, 2739',
      'bd': '2014-10-21T03:09:34 -06:00'
    },
    {
      '_id': '5a7b73f705f8a9c6e35c8ca2',
      'index': 8,
      'guid': 'a90d65a8-681d-462f-bf08-eceeef366375',
      'isActive': true,
      'balance': 3786.67,
      'age': 36,
      'name': 'Carrie Gates',
      'gender': 'female',
      'company': 'VIRVA',
      'email': 'carriegates@virva.com',
      'phone': '+1 (845) 463-3986',
      'address': '561 Boulevard Court, Rote, Louisiana, 8458',
      'bd': '2017-03-30T02:06:23 -06:00'
    },
    {
      '_id': '5a7b73f7a3e2be2dbb7b093e',
      'index': 9,
      'guid': 'fb3d0f97-91ae-4336-b0b4-19f4a00fe567',
      'isActive': false,
      'balance': 3335.5,
      'age': 33,
      'name': 'Dalton Spears',
      'gender': 'male',
      'company': 'MIRACLIS',
      'email': 'daltonspears@miraclis.com',
      'phone': '+1 (919) 541-3528',
      'address': '167 Lester Court, Glasgow, Arkansas, 6311',
      'bd': '2017-04-01T01:41:12 -06:00'
    },
    {
      '_id': '5a7b73f716de69a9217c1273',
      'index': 10,
      'guid': '129a92fd-848f-48eb-98a1-aebf6e92b079',
      'isActive': false,
      'balance': 3811.15,
      'age': 30,
      'name': 'Delia Merrill',
      'gender': 'female',
      'company': 'COMTEST',
      'email': 'deliamerrill@comtest.com',
      'phone': '+1 (879) 401-2304',
      'address': '761 Polhemus Place, Kidder, Puerto Rico, 5901',
      'bd': '2014-08-29T08:42:59 -06:00'
    },
    {
      '_id': '5a7b73f7ed19007bed2d29fb',
      'index': 11,
      'guid': 'd799b69a-192d-4ee3-9a69-9e8e5afc45b0',
      'isActive': false,
      'balance': 3935.82,
      'age': 28,
      'name': 'Vance Aguilar',
      'gender': 'male',
      'company': 'CYCLONICA',
      'email': 'vanceaguilar@cyclonica.com',
      'phone': '+1 (972) 549-2681',
      'address': '653 Billings Place, Gardners, Connecticut, 7805',
      'bd': '2015-02-21T03:06:14 -06:00'
    },
    {
      '_id': '5a7b73f78d0dc0858a70c44a',
      'index': 12,
      'guid': '8cbb37bb-7644-4993-b48b-df3a69deb339',
      'isActive': true,
      'balance': 3868.95,
      'age': 28,
      'name': 'Adams Harper',
      'gender': 'male',
      'company': 'NORSUP',
      'email': 'adamsharper@norsup.com',
      'phone': '+1 (824) 494-3395',
      'address': '571 Turner Place, Norris, Mississippi, 3829',
      'bd': '2014-01-30T02:05:53 -06:00'
    },
    {
      '_id': '5a7b73f7e929494a8568a885',
      'index': 13,
      'guid': '22ec32d7-0ba9-4366-b6d8-ca16389a2cd9',
      'isActive': false,
      'balance': 3954.41,
      'age': 34,
      'name': 'Bass Sexton',
      'gender': 'male',
      'company': 'CIRCUM',
      'email': 'basssexton@circum.com',
      'phone': '+1 (930) 476-3634',
      'address': '563 Victor Road, Richmond, Kansas, 7742',
      'bd': '2014-05-04T10:16:32 -06:00'
    },
    {
      '_id': '5a7b73f767e97ce3136444fd',
      'index': 14,
      'guid': '031d282f-0be9-49e1-a211-9aa59d449d91',
      'isActive': false,
      'balance': 3287.33,
      'age': 24,
      'name': 'Howard Velez',
      'gender': 'male',
      'company': 'ECOSYS',
      'email': 'howardvelez@ecosys.com',
      'phone': '+1 (920) 556-2885',
      'address': '378 Grimes Road, Websterville, Marshall Islands, 3506',
      'bd': '2015-12-19T08:17:58 -06:00'
    },
    {
      '_id': '5a7b73f7fba076653cc18925',
      'index': 15,
      'guid': 'd76ab6d6-d1db-4286-8516-ce6c9db3972a',
      'isActive': false,
      'balance': 3279.98,
      'age': 21,
      'name': 'Lola Morton',
      'gender': 'female',
      'company': 'PROVIDCO',
      'email': 'lolamorton@providco.com',
      'phone': '+1 (963) 458-2788',
      'address': '991 Ashland Place, Richville, New York, 3529',
      'bd': '2016-11-29T07:58:24 -06:00'
    },
    {
      '_id': '5a7b73f7c6d408bc853be87c',
      'index': 16,
      'guid': '30c2d1c7-770b-4adb-b6df-cc205d748323',
      'isActive': false,
      'balance': 3955.55,
      'age': 37,
      'name': 'Bishop Rutledge',
      'gender': 'male',
      'company': 'DAYCORE',
      'email': 'bishoprutledge@daycore.com',
      'phone': '+1 (886) 539-3156',
      'address': '870 Vanderveer Place, Bridgetown, California, 7593',
      'bd': '2014-11-10T04:47:00 -06:00'
    },
    {
      '_id': '5a7b73f7abe6c78719d2f494',
      'index': 17,
      'guid': '2d8e77a1-4a88-4642-b6a8-693de296661c',
      'isActive': true,
      'balance': 1832.83,
      'age': 23,
      'name': 'Lea Reese',
      'gender': 'female',
      'company': 'GLUID',
      'email': 'leareese@gluid.com',
      'phone': '+1 (866) 413-2199',
      'address': '811 Dunne Place, Vowinckel, Rhode Island, 8646',
      'bd': '2014-03-16T04:30:06 -06:00'
    },
    {
      '_id': '5a7b73f72d64af126b8080be',
      'index': 18,
      'guid': 'e1e8ee63-6d08-48fc-a077-2265cee34f23',
      'isActive': true,
      'balance': 2419.18,
      'age': 23,
      'name': 'Knox Moses',
      'gender': 'male',
      'company': 'BRAINCLIP',
      'email': 'knoxmoses@brainclip.com',
      'phone': '+1 (982) 519-2486',
      'address': '917 Turnbull Avenue, Shasta, Virgin Islands, 7016',
      'bd': '2015-11-09T10:11:15 -06:00'
    },
    {
      '_id': '5a7b73f789b4e9086d34b255',
      'index': 19,
      'guid': '13552b7d-928c-4b92-a2ae-5ccbee807594',
      'isActive': false,
      'balance': 1220.91,
      'age': 22,
      'name': 'Marsha Jacobs',
      'gender': 'female',
      'company': 'COMSTAR',
      'email': 'marshajacobs@comstar.com',
      'phone': '+1 (858) 511-2546',
      'address': '580 Hampton Avenue, Ilchester, New Hampshire, 2191',
      'bd': '2016-02-11T01:34:23 -06:00'
    },
    {
      '_id': '5a7b73f737eea8e94089b7b4',
      'index': 20,
      'guid': 'cf577c87-b40c-4c09-9fac-d04c9a824b86',
      'isActive': false,
      'balance': 2446.07,
      'age': 25,
      'name': 'Bell Emerson',
      'gender': 'male',
      'company': 'MULTIFLEX',
      'email': 'bellemerson@multiflex.com',
      'phone': '+1 (806) 496-2473',
      'address': '238 Oxford Walk, Monument, New Mexico, 1345',
      'bd': '2016-10-07T01:07:21 -06:00'
    },
    {
      '_id': '5a7b73f76bc821dc6ee56ee2',
      'index': 21,
      'guid': 'b6c685c2-a497-4261-9217-622723d5235f',
      'isActive': false,
      'balance': 3694.63,
      'age': 33,
      'name': 'Cecelia Graham',
      'gender': 'female',
      'company': 'ZOXY',
      'email': 'ceceliagraham@zoxy.com',
      'phone': '+1 (933) 429-3129',
      'address': '954 Lawton Street, Terlingua, New Jersey, 6723',
      'bd': '2017-12-01T04:36:13 -06:00'
    },
    {
      '_id': '5a7b73f794c27c4048290cbf',
      'index': 22,
      'guid': '7e887403-8ff5-41b4-9902-bb63ff714fee',
      'isActive': true,
      'balance': 2804.02,
      'age': 29,
      'name': 'Anthony Pennington',
      'gender': 'male',
      'company': 'NAMEGEN',
      'email': 'anthonypennington@namegen.com',
      'phone': '+1 (860) 458-3988',
      'address': '287 Auburn Place, Gardiner, Northern Mariana Islands, 7131',
      'bd': '2018-02-04T11:06:51 -06:00'
    },
    {
      '_id': '5a7b73f720a5781f7d19597a',
      'index': 23,
      'guid': '9e108687-e1ca-4385-bdd5-62ab006f8aa3',
      'isActive': true,
      'balance': 1984.1,
      'age': 36,
      'name': 'Mayo Justice',
      'gender': 'male',
      'company': 'SLOFAST',
      'email': 'mayojustice@slofast.com',
      'phone': '+1 (854) 428-2270',
      'address': '648 Melba Court, Dodge, Pennsylvania, 7596',
      'bd': '2016-12-29T07:28:10 -06:00'
    },
    {
      '_id': '5a7b73f7f0a4c5e6c9807fb2',
      'index': 24,
      'guid': '93b0b383-dd69-4453-be26-f13ae361ce67',
      'isActive': true,
      'balance': 1845.13,
      'age': 22,
      'name': 'Vaughn Salazar',
      'gender': 'male',
      'company': 'ZAGGLE',
      'email': 'vaughnsalazar@zaggle.com',
      'phone': '+1 (986) 415-3294',
      'address': '382 Dewitt Avenue, Goodville, Palau, 711',
      'bd': '2014-10-31T12:32:59 -06:00'
    },
    {
      '_id': '5a7b73f7e6c45298c709371c',
      'index': 25,
      'guid': '5a059bbb-3f6d-47bc-ba2b-c13eeaaa93b4',
      'isActive': false,
      'balance': 3684.79,
      'age': 31,
      'name': 'Calhoun Bradshaw',
      'gender': 'male',
      'company': 'OVERPLEX',
      'email': 'calhounbradshaw@overplex.com',
      'phone': '+1 (964) 594-2363',
      'address': '527 Seton Place, Wedgewood, Wisconsin, 8306',
      'bd': '2016-05-27T10:46:17 -06:00'
    },
    {
      '_id': '5a7b73f79468759d25ecdcf4',
      'index': 26,
      'guid': '68d7f78e-5001-480b-a67d-72b370a5c2de',
      'isActive': false,
      'balance': 1831.14,
      'age': 29,
      'name': 'Dianne Bauer',
      'gender': 'female',
      'company': 'XUMONK',
      'email': 'diannebauer@xumonk.com',
      'phone': '+1 (866) 510-2479',
      'address': '540 Moffat Street, Emison, South Carolina, 7329',
      'bd': '2014-09-02T04:57:23 -06:00'
    },
    {
      '_id': '5a7b73f7346b1bbab11524fa',
      'index': 27,
      'guid': '0729eef8-36c5-4aa2-8e31-f5e2ca19b94b',
      'isActive': false,
      'balance': 1719.77,
      'age': 22,
      'name': 'Hebert Bryan',
      'gender': 'male',
      'company': 'COMTRAIL',
      'email': 'hebertbryan@comtrail.com',
      'phone': '+1 (838) 579-3709',
      'address': '669 Hausman Street, Gerber, Kentucky, 7779',
      'bd': '2017-11-29T12:22:59 -06:00'
    },
    {
      '_id': '5a7b73f75116874002de08de',
      'index': 28,
      'guid': '63014b40-3f1e-40ff-b2f7-f55ef6a5a599',
      'isActive': true,
      'balance': 1973.27,
      'age': 20,
      'name': 'Cash Bean',
      'gender': 'male',
      'company': 'SUPREMIA',
      'email': 'cashbean@supremia.com',
      'phone': '+1 (846) 551-2291',
      'address': '152 Garnet Street, Boling, Nevada, 4867',
      'bd': '2014-01-06T10:18:37 -06:00'
    },
    {
      '_id': '5a7b73f739be4dc1f743993c',
      'index': 29,
      'guid': 'ae498760-b43b-4c9c-8575-820f419984f6',
      'isActive': true,
      'balance': 2118.14,
      'age': 36,
      'name': 'Candy Hopper',
      'gender': 'female',
      'company': 'ACCUFARM',
      'email': 'candyhopper@accufarm.com',
      'phone': '+1 (841) 425-2442',
      'address': '695 Nassau Avenue, Nutrioso, Maryland, 2026',
      'bd': '2016-01-03T02:15:56 -06:00'
    },
    {
      '_id': '5a7b73f70b86f2969d762be2',
      'index': 30,
      'guid': 'f19cb86e-ab4f-4d07-833a-4adb8a19d0af',
      'isActive': false,
      'balance': 3794.89,
      'age': 37,
      'name': 'Fisher Powell',
      'gender': 'male',
      'company': 'ENOMEN',
      'email': 'fisherpowell@enomen.com',
      'phone': '+1 (876) 562-2932',
      'address': '616 Tapscott Avenue, Crucible, Nebraska, 4900',
      'bd': '2018-01-31T05:15:13 -06:00'
    },
    {
      '_id': '5a7b73f7394648a68c2a6ae3',
      'index': 31,
      'guid': 'a88e5389-0b07-4d19-ac6c-718ce9e0de55',
      'isActive': false,
      'balance': 3343.45,
      'age': 38,
      'name': 'Rosemary Sloan',
      'gender': 'female',
      'company': 'PHORMULA',
      'email': 'rosemarysloan@phormula.com',
      'phone': '+1 (924) 517-3289',
      'address': '687 Navy Walk, Edmund, Delaware, 1419',
      'bd': '2018-01-23T11:32:25 -06:00'
    },
    {
      '_id': '5a7b73f77ad97f4e1c2fa65a',
      'index': 32,
      'guid': 'fb915568-2875-49b3-96d7-6b54b2b186a1',
      'isActive': true,
      'balance': 2680.62,
      'age': 30,
      'name': 'Elba Glover',
      'gender': 'female',
      'company': 'APPLICA',
      'email': 'elbaglover@applica.com',
      'phone': '+1 (857) 495-3565',
      'address': '279 Bridgewater Street, Edneyville, Utah, 9246',
      'bd': '2015-10-03T12:24:56 -06:00'
    },
    {
      '_id': '5a7b73f72598106a97fbf7d5',
      'index': 33,
      'guid': 'fac3cd4b-2d42-4b4f-9d6f-0bac689bd47b',
      'isActive': false,
      'balance': 3286.46,
      'age': 37,
      'name': 'Mildred Short',
      'gender': 'female',
      'company': 'NIXELT',
      'email': 'mildredshort@nixelt.com',
      'phone': '+1 (980) 530-3588',
      'address': '434 Elm Place, Coloma, West Virginia, 1990',
      'bd': '2016-03-22T10:13:26 -06:00'
    },
    {
      '_id': '5a7b73f7b88290b05f53faa1',
      'index': 34,
      'guid': 'b1c6a3a3-00bd-4bc6-87df-69eecd909ab5',
      'isActive': false,
      'balance': 1484.16,
      'age': 24,
      'name': 'Karin Schultz',
      'gender': 'female',
      'company': 'PLASMOS',
      'email': 'karinschultz@plasmos.com',
      'phone': '+1 (904) 544-2796',
      'address': '380 Rockaway Avenue, Faxon, American Samoa, 5776',
      'bd': '2016-03-27T09:30:36 -06:00'
    },
    {
      '_id': '5a7b73f7d2f7429d0caec5fe',
      'index': 35,
      'guid': '62c961ac-49b1-4a69-b4bf-13a396ec4fd9',
      'isActive': false,
      'balance': 3450.17,
      'age': 23,
      'name': 'Addie Rose',
      'gender': 'female',
      'company': 'XYQAG',
      'email': 'addierose@xyqag.com',
      'phone': '+1 (838) 549-3147',
      'address': '999 Coleridge Street, Golconda, Vermont, 9575',
      'bd': '2016-10-01T06:50:42 -06:00'
    },
    {
      '_id': '5a7b73f78a4c54ff8334e053',
      'index': 36,
      'guid': '4f2f7ae5-0bd1-4665-b97f-c556e5162349',
      'isActive': false,
      'balance': 1797.89,
      'age': 23,
      'name': 'Janie Ellison',
      'gender': 'female',
      'company': 'SPLINX',
      'email': 'janieellison@splinx.com',
      'phone': '+1 (947) 460-2254',
      'address': '114 Landis Court, Genoa, Indiana, 5198',
      'bd': '2017-07-28T12:45:44 -06:00'
    },
    {
      '_id': '5a7b73f7c87f7e86fcb00055',
      'index': 37,
      'guid': 'b7236378-8129-44b5-bcc6-0369290ffad6',
      'isActive': false,
      'balance': 3776.51,
      'age': 38,
      'name': 'Elisabeth Campbell',
      'gender': 'female',
      'company': 'GOKO',
      'email': 'elisabethcampbell@goko.com',
      'phone': '+1 (849) 430-3377',
      'address': '832 Kermit Place, Lutsen, Georgia, 9145',
      'bd': '2015-04-26T06:40:08 -06:00'
    },
    {
      '_id': '5a7b73f712f9208f145fa6ea',
      'index': 38,
      'guid': '5c955e3a-5f3a-4ead-96ee-80a5de6dc479',
      'isActive': true,
      'balance': 3794.93,
      'age': 27,
      'name': 'Noble Holland',
      'gender': 'male',
      'company': 'NUTRALAB',
      'email': 'nobleholland@nutralab.com',
      'phone': '+1 (888) 573-3730',
      'address': '408 Roosevelt Court, Hiwasse, North Dakota, 281',
      'bd': '2014-03-25T12:24:34 -06:00'
    },
    {
      '_id': '5a7b73f7aa1f371de59df90b',
      'index': 39,
      'guid': '94698a81-61a6-4e23-a952-76a50fba71ef',
      'isActive': true,
      'balance': 2205.55,
      'age': 35,
      'name': 'Laverne Brock',
      'gender': 'female',
      'company': 'ICOLOGY',
      'email': 'lavernebrock@icology.com',
      'phone': '+1 (821) 600-3174',
      'address': '391 Conover Street, Cassel, Tennessee, 6566',
      'bd': '2016-01-27T09:40:41 -06:00'
    },
    {
      '_id': '5a7b73f7c45c697931199945',
      'index': 40,
      'guid': 'a05a215f-be1c-49d1-89ca-c821b118f923',
      'isActive': true,
      'balance': 2397.12,
      'age': 29,
      'name': 'Irene Frost',
      'gender': 'female',
      'company': 'RODEMCO',
      'email': 'irenefrost@rodemco.com',
      'phone': '+1 (918) 539-2612',
      'address': '401 Moore Place, Groton, Arizona, 3415',
      'bd': '2017-09-14T09:46:55 -06:00'
    },
    {
      '_id': '5a7b73f7ef55416e92ebc818',
      'index': 41,
      'guid': '1ae8ceac-e8d0-4417-9f6f-04cd4e4738ad',
      'isActive': false,
      'balance': 3335.51,
      'age': 35,
      'name': 'Beard Hendricks',
      'gender': 'male',
      'company': 'QUONK',
      'email': 'beardhendricks@quonk.com',
      'phone': '+1 (847) 521-3952',
      'address': '576 Bayard Street, Chloride, Federated States Of Micronesia, 8070',
      'bd': '2016-11-01T12:47:26 -06:00'
    },
    {
      '_id': '5a7b73f7cbeecfe6febd672d',
      'index': 42,
      'guid': 'afdf3298-77bd-46b3-ae8d-232f815c5f01',
      'isActive': false,
      'balance': 2205.01,
      'age': 37,
      'name': 'Nelson Shields',
      'gender': 'male',
      'company': 'ARTWORLDS',
      'email': 'nelsonshields@artworlds.com',
      'phone': '+1 (956) 534-3050',
      'address': '581 Maple Street, Needmore, Colorado, 2062',
      'bd': '2014-07-21T08:22:01 -06:00'
    },
    {
      '_id': '5a7b73f71803de25c5f754ad',
      'index': 43,
      'guid': '5b872cad-4388-496b-8ede-5f86990dec00',
      'isActive': true,
      'balance': 1001.05,
      'age': 21,
      'name': 'Luella Duffy',
      'gender': 'female',
      'company': 'KROG',
      'email': 'luelladuffy@krog.com',
      'phone': '+1 (973) 451-2222',
      'address': '349 Bryant Street, Tioga, South Dakota, 6493',
      'bd': '2016-04-27T02:46:46 -06:00'
    },
    {
      '_id': '5a7b73f77f2a05eacb331c74',
      'index': 44,
      'guid': '7d6b7650-10d7-435d-87ca-33a1fe12cd57',
      'isActive': false,
      'balance': 1926.79,
      'age': 27,
      'name': 'Rosa Guthrie',
      'gender': 'female',
      'company': 'COMTOURS',
      'email': 'rosaguthrie@comtours.com',
      'phone': '+1 (814) 528-2701',
      'address': '719 Kathleen Court, Morriston, Guam, 4011',
      'bd': '2015-07-02T08:22:18 -06:00'
    },
    {
      '_id': '5a7b73f7727afbb0fc15653b',
      'index': 45,
      'guid': 'ebbc985b-227e-4954-a8a6-588b2a2bff22',
      'isActive': false,
      'balance': 2464.9,
      'age': 29,
      'name': 'Dillard Carlson',
      'gender': 'male',
      'company': 'COMCUR',
      'email': 'dillardcarlson@comcur.com',
      'phone': '+1 (847) 469-3741',
      'address': '918 Oceanic Avenue, Cochranville, Missouri, 1018',
      'bd': '2016-06-11T11:31:54 -06:00'
    },
    {
      '_id': '5a7b73f71dd7612e967e01ae',
      'index': 46,
      'guid': '63a2ee7f-2141-4ec5-b1e2-fcdcd62f28ed',
      'isActive': false,
      'balance': 3917.74,
      'age': 25,
      'name': 'Faye Walls',
      'gender': 'female',
      'company': 'EMERGENT',
      'email': 'fayewalls@emergent.com',
      'phone': '+1 (964) 527-3791',
      'address': '947 Judge Street, Nescatunga, Maine, 4928',
      'bd': '2014-06-23T12:46:21 -06:00'
    },
    {
      '_id': '5a7b73f7b33c73c425db7ee0',
      'index': 47,
      'guid': '61d40a89-af0c-40ca-8970-c54978134e6b',
      'isActive': true,
      'balance': 2213.18,
      'age': 32,
      'name': 'Norma Hooper',
      'gender': 'female',
      'company': 'PARCOE',
      'email': 'normahooper@parcoe.com',
      'phone': '+1 (827) 503-2742',
      'address': '470 Fenimore Street, Hatteras, Texas, 1582',
      'bd': '2015-01-15T12:22:00 -06:00'
    },
    {
      '_id': '5a7b73f7c30aa4064670cf21',
      'index': 48,
      'guid': '969d77af-b251-4924-82cf-7c787752161d',
      'isActive': false,
      'balance': 3673.94,
      'age': 23,
      'name': 'Lee Wiggins',
      'gender': 'female',
      'company': 'NITRACYR',
      'email': 'leewiggins@nitracyr.com',
      'phone': '+1 (941) 478-3536',
      'address': '958 Flatbush Avenue, Clara, North Carolina, 970',
      'bd': '2018-01-09T11:09:34 -06:00'
    },
    {
      '_id': '5a7b73f7ecd5a4859f2d94dc',
      'index': 49,
      'guid': 'cdf9b8de-a309-4cb7-80bb-f1b830b8b640',
      'isActive': true,
      'balance': 2166.21,
      'age': 27,
      'name': 'Alvarez Lynch',
      'gender': 'male',
      'company': 'KIGGLE',
      'email': 'alvarezlynch@kiggle.com',
      'phone': '+1 (929) 528-3805',
      'address': '901 Stratford Road, Derwood, Iowa, 1402',
      'bd': '2015-01-08T04:28:57 -06:00'
    },
    {
      '_id': '5a7b73f7216c8cabc849eea7',
      'index': 50,
      'guid': 'c4175d6a-1560-468e-b682-701c1549b6b1',
      'isActive': false,
      'balance': 3479.39,
      'age': 39,
      'name': 'Oneal Rosario',
      'gender': 'male',
      'company': 'UBERLUX',
      'email': 'onealrosario@uberlux.com',
      'phone': '+1 (951) 572-3027',
      'address': '267 Rockaway Parkway, Chapin, Montana, 7813',
      'bd': '2014-02-10T05:08:13 -06:00'
    },
    {
      '_id': '5a7b73f78841719bf955b2d9',
      'index': 51,
      'guid': '966c9ce6-9151-47cb-8c71-98c4cd0d2f40',
      'isActive': false,
      'balance': 1625.49,
      'age': 36,
      'name': 'Olsen Stevens',
      'gender': 'male',
      'company': 'EMPIRICA',
      'email': 'olsenstevens@empirica.com',
      'phone': '+1 (871) 403-3377',
      'address': '704 Lamont Court, Saranap, Massachusetts, 3171',
      'bd': '2014-09-17T05:13:13 -06:00'
    },
    {
      '_id': '5a7b73f7b7b8e578dff0f85c',
      'index': 52,
      'guid': '8269a34f-3a02-47d6-bcb1-8f076bb478f0',
      'isActive': true,
      'balance': 1143.73,
      'age': 27,
      'name': 'Marian Henson',
      'gender': 'female',
      'company': 'ENDIPINE',
      'email': 'marianhenson@endipine.com',
      'phone': '+1 (995) 406-2592',
      'address': '803 Ellery Street, Boykin, Alaska, 8624',
      'bd': '2016-08-28T01:22:51 -06:00'
    },
    {
      '_id': '5a7b73f737459ec79c91ca75',
      'index': 53,
      'guid': 'badb9342-10fd-4520-ae66-c246e47add8f',
      'isActive': false,
      'balance': 1458.01,
      'age': 23,
      'name': 'Dudley Dickson',
      'gender': 'male',
      'company': 'POLARIA',
      'email': 'dudleydickson@polaria.com',
      'phone': '+1 (860) 428-3250',
      'address': '833 Revere Place, Rockbridge, Illinois, 4628',
      'bd': '2017-01-19T12:36:59 -06:00'
    },
    {
      '_id': '5a7b73f70ddc6fc11ebf043a',
      'index': 54,
      'guid': '52b1be89-8186-4685-81b7-203c17ed9f89',
      'isActive': true,
      'balance': 2815.76,
      'age': 25,
      'name': 'Earnestine Oneil',
      'gender': 'female',
      'company': 'CYTREK',
      'email': 'earnestineoneil@cytrek.com',
      'phone': '+1 (879) 541-3490',
      'address': '442 Emerald Street, Graniteville, Hawaii, 1302',
      'bd': '2017-07-07T10:34:33 -06:00'
    },
    {
      '_id': '5a7b73f78b816185ccd2b4b3',
      'index': 55,
      'guid': 'e66850ea-546b-4eb5-ae76-d66b0e727f44',
      'isActive': true,
      'balance': 3645.09,
      'age': 21,
      'name': 'Nicholson Mason',
      'gender': 'male',
      'company': 'TELEQUIET',
      'email': 'nicholsonmason@telequiet.com',
      'phone': '+1 (861) 528-3215',
      'address': '261 Aitken Place, Cecilia, Ohio, 1381',
      'bd': '2016-03-20T08:31:34 -06:00'
    },
    {
      '_id': '5a7b73f780f8bf8fbe24d75c',
      'index': 56,
      'guid': '40b999cd-00bf-46e0-9107-b44906d832e0',
      'isActive': false,
      'balance': 2477.66,
      'age': 36,
      'name': 'Linda Shaffer',
      'gender': 'female',
      'company': 'ZORK',
      'email': 'lindashaffer@zork.com',
      'phone': '+1 (828) 524-3011',
      'address': '350 Plymouth Street, Waterford, Washington, 6715',
      'bd': '2017-07-09T05:51:11 -06:00'
    },
    {
      '_id': '5a7b73f741e22fc19ffa6952',
      'index': 57,
      'guid': 'cc2ac19d-7d67-4f60-973a-369160a9c377',
      'isActive': false,
      'balance': 2651.39,
      'age': 20,
      'name': 'Montoya Riggs',
      'gender': 'male',
      'company': 'MARKETOID',
      'email': 'montoyariggs@marketoid.com',
      'phone': '+1 (809) 562-3786',
      'address': '633 Monitor Street, Chicopee, District Of Columbia, 550',
      'bd': '2016-02-05T12:36:05 -06:00'
    },
    {
      '_id': '5a7b73f7de56ead40c26e69a',
      'index': 58,
      'guid': '6e0b06b8-1199-498c-8002-41f4972aa2d2',
      'isActive': false,
      'balance': 3463.92,
      'age': 28,
      'name': 'Walker Duran',
      'gender': 'male',
      'company': 'GEOFORM',
      'email': 'walkerduran@geoform.com',
      'phone': '+1 (868) 502-2553',
      'address': '550 Kensington Walk, Wyano, Virginia, 7703',
      'bd': '2017-08-18T12:39:37 -06:00'
    },
    {
      '_id': '5a7b73f70a04fe142269ea8d',
      'index': 59,
      'guid': 'c6733cd5-1e73-4317-b4bc-1a9e597581a4',
      'isActive': true,
      'balance': 3846.35,
      'age': 26,
      'name': 'Suzanne House',
      'gender': 'female',
      'company': 'SYBIXTEX',
      'email': 'suzannehouse@sybixtex.com',
      'phone': '+1 (892) 533-2739',
      'address': '367 Harwood Place, Twilight, Oregon, 9799',
      'bd': '2016-11-26T11:57:18 -06:00'
    },
    {
      '_id': '5a7b73f7339943d94af3b39d',
      'index': 60,
      'guid': '4ff2c2aa-0573-4be1-a1c8-f684af8a5fbf',
      'isActive': false,
      'balance': 2717.94,
      'age': 26,
      'name': 'Lewis Oconnor',
      'gender': 'male',
      'company': 'EXOZENT',
      'email': 'lewisoconnor@exozent.com',
      'phone': '+1 (954) 582-2660',
      'address': '717 Sutter Avenue, Bartley, Michigan, 1142',
      'bd': '2017-08-21T08:25:00 -06:00'
    },
    {
      '_id': '5a7b73f7d8e266ad1bc5daa8',
      'index': 61,
      'guid': '94667aad-86fc-4a2c-94fb-11b572307c75',
      'isActive': false,
      'balance': 2725.58,
      'age': 39,
      'name': 'Shelley Bonner',
      'gender': 'female',
      'company': 'INDEXIA',
      'email': 'shelleybonner@indexia.com',
      'phone': '+1 (965) 490-3768',
      'address': '896 Clinton Avenue, Canoochee, Idaho, 1154',
      'bd': '2016-04-11T06:08:29 -06:00'
    },
    {
      '_id': '5a7b73f7e74a5af674e4cbdd',
      'index': 62,
      'guid': 'ec68c47e-7cbd-485e-8d54-fab1bb6ea008',
      'isActive': true,
      'balance': 1343.87,
      'age': 29,
      'name': 'Mccall Morales',
      'gender': 'male',
      'company': 'QUILITY',
      'email': 'mccallmorales@quility.com',
      'phone': '+1 (939) 455-2610',
      'address': '325 Crystal Street, Harleigh, Wyoming, 5658',
      'bd': '2014-11-20T07:30:04 -06:00'
    },
    {
      '_id': '5a7b73f7efb231e53a0c94cd',
      'index': 63,
      'guid': '6a8b3f55-406c-4ae8-be59-94a0f8fbd180',
      'isActive': false,
      'balance': 1092.69,
      'age': 37,
      'name': 'Vera Mcpherson',
      'gender': 'female',
      'company': 'CIPROMOX',
      'email': 'veramcpherson@cipromox.com',
      'phone': '+1 (890) 500-3729',
      'address': '771 Beard Street, Rivera, Minnesota, 4726',
      'bd': '2017-07-13T02:47:50 -06:00'
    },
    {
      '_id': '5a7b73f7e345c5dfc5d636e4',
      'index': 64,
      'guid': '46879caf-76e6-46e0-9b8b-bc17667a81ea',
      'isActive': true,
      'balance': 2077.12,
      'age': 36,
      'name': 'Gregory Roth',
      'gender': 'male',
      'company': 'EARWAX',
      'email': 'gregoryroth@earwax.com',
      'phone': '+1 (806) 595-2477',
      'address': '349 Dunham Place, Sardis, Alabama, 3320',
      'bd': '2017-11-08T02:26:23 -06:00'
    },
    {
      '_id': '5a7b73f77f5f9d730fab11e0',
      'index': 65,
      'guid': '9cfb8f58-7acf-4a39-bf2b-c90269c33db0',
      'isActive': true,
      'balance': 3503.58,
      'age': 31,
      'name': 'Russell Carver',
      'gender': 'male',
      'company': 'PREMIANT',
      'email': 'russellcarver@premiant.com',
      'phone': '+1 (849) 521-2335',
      'address': '851 Noble Street, Holcombe, Oklahoma, 311',
      'bd': '2016-07-10T10:08:35 -06:00'
    },
    {
      '_id': '5a7b73f7cab10f461153989c',
      'index': 66,
      'guid': '2562a818-4451-4193-94cd-650d131ff097',
      'isActive': false,
      'balance': 1652.9,
      'age': 21,
      'name': 'Darlene Hurley',
      'gender': 'female',
      'company': 'STELAECOR',
      'email': 'darlenehurley@stelaecor.com',
      'phone': '+1 (868) 492-2270',
      'address': '627 Wilson Street, Loveland, Louisiana, 765',
      'bd': '2017-05-20T12:39:31 -06:00'
    },
    {
      '_id': '5a7b73f7ecccc997e4160a59',
      'index': 67,
      'guid': '0050170f-0283-481d-9633-dc9d134be121',
      'isActive': true,
      'balance': 3692.88,
      'age': 21,
      'name': 'Lela Bailey',
      'gender': 'female',
      'company': 'AQUOAVO',
      'email': 'lelabailey@aquoavo.com',
      'phone': '+1 (917) 449-2329',
      'address': '121 Adams Street, Malo, Arkansas, 7435',
      'bd': '2016-11-06T04:55:46 -06:00'
    }
  ]
}
```

---

#### 📄 `src/app/shared/interceptors/token.interceptor.ts`

```typescript
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwtAuth: JwtAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.jwtAuth.token || this.jwtAuth.getJwtToken();

    var changedReq;

    if (token) {

      changedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });

    } else {

      changedReq = req;
      
    }
    return next.handle(changedReq);
  }
}

```

---

#### 📄 `src/app/shared/material-imports.ts`

```typescript
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatOptionModule } from "@angular/material/core";

/**
 * Commonly used Material modules for direct import into standalone components
 */
export const commonMaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatTooltipModule
];

/**
 * Essential Material modules needed for example components
 */
export const exampleMaterialModules = [
  // Basic modules
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatStepperModule,
  MatCardModule,
  
  // Additional modules needed for examples
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatListModule,
  MatGridListModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTreeModule,
  MatRippleModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatDividerModule
];

/**
 * All Material modules for more complex components
 */
export const allMaterialModules = [
  MatCheckboxModule,
  MatButtonModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatTreeModule,
  MatRippleModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatDividerModule,
  MatOptionModule
]; 
```

---

#### 📄 `src/app/shared/models/app-theme.model.ts`

```typescript
/**
 * Represents a theme in the application
 */
export interface AppTheme {
  /**
   * Unique identifier for the theme
   */
  id: string;
  
  /**
   * Display name of the theme
   */
  name: string;
  
  /**
   * Theme mode - 'light' or 'dark'
   */
  mode: 'light' | 'dark';
  
  /**
   * Primary color in hex format
   */
  primaryColor: string;
  
  /**
   * Accent color in hex format
   */
  accentColor: string;
  
  /**
   * Warning color in hex format
   */
  warnColor: string;
} 
```

---

#### 📄 `src/app/shared/models/chat.model.ts`

```typescript
export interface Chat {
    text: string;
    time: Date | string;
    contactId: User['id'];
  }
  
  export interface ChatCollection {
    id: string;
    chats: Chat[];
  }
  
  export interface UserChatInfo {
    chatId: ChatCollection['id'];
    contactId: User['id'];
    contactName: User['name'];
    unread: number;
    lastChatTime: Date | string;
  }
  
  export class User {
    id: string;
    avatar: string;
    name: string;
    status: string;
    chatInfo?: UserChatInfo[];
  }
  
```

---

#### 📄 `src/app/shared/models/event.model.ts`

```typescript
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

export class LtemplateCalendarEvent implements CalendarEvent {
  _id?: string;
  start: Date;
  end?: Date;
  title: string;
  color?: {
    primary: string;
    secondary: string;
  };
  actions?: CalendarEventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: {
    location: string,
    notes: string
  };

  constructor(data?) {
    data = data || {};
    this.start = new Date(data.start) || startOfDay(new Date());
    this.end = data.end ? new Date(data.end) : undefined;
    this._id = data._id || '';
    this.title = data.title || '';
    this.color = {
      primary: data.color && data.color.primary || '#247ba0',
      secondary: data.color && data.color.secondary || '#D1E8FF'
    };
    this.draggable = data.draggable || true;
    this.resizable = {
      beforeStart: data.resizable && data.resizable.beforeStart || true,
      afterEnd: data.resizable && data.resizable.afterEnd || true
    };
    this.actions = data.actions || [];
    this.allDay = data.allDay || false;
    this.cssClass = data.cssClass || '';
    this.meta = {
      location: data.meta && data.meta.location || '',
      notes: data.meta && data.meta.notes || ''
    };
  }
}

```

---

#### 📄 `src/app/shared/models/invoice.model.ts`

```typescript
export interface Invoice {
  id?: string;
  orderNo?: string;
  status?: string;
  date?: string | Date;
  currency?: string;
  vat?: number;
  buyer?: {
    name: string;
    address: string;
  };
  seller?: {
    name: string;
    address: string;
  };
  item?: InvoiceItem[];
}

export interface InvoiceItem {
  name?: string;
  unit?: number | null;
  price?: number | null;
  id?: string;
}

```

---

#### 📄 `src/app/shared/models/product.model.ts`

```typescript
export class Product {
  public _id: string;
  public name: string;
  public description?: string;
  public category?: string;
  public tags?: string[];
  public price: {
    sale: number,
    previous?: number
  };
  public ratings?: {
    rating: number,
    ratingCount: number
  };
  public features?: string[];
  public photo?: string;
  public gallery?: string[];
  public badge?: { text: string, color?: string };
}

```

---

#### 📄 `src/app/shared/models/todo.model.ts`

```typescript
export interface TodoItem {
    id?: number;
    title?: string;
    note?: string;
    important?: boolean;
    starred?: boolean;
    done?: boolean;
    read?: boolean;
    selected?: boolean;
    startDate?: string;
    dueDate?: string;

    tag?: number[];
}

export interface TagItem {
    id?: number;
    name?: string;
}
```

---

#### 📄 `src/app/shared/models/user.model.ts`

```typescript
export interface User {
  id?: string;
  displayName?: string;
  role?: string
}
```

---

#### 📄 `src/app/shared/pipes/excerpt.pipe.spec.ts`

```typescript
import { ExcerptPipe } from './excerpt.pipe';

describe('ExcerptPipe', () => {
  let pipe: ExcerptPipe;

  beforeEach(() => {
    pipe = new ExcerptPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original text when text length is within limit', () => {
    expect(pipe.transform('Hello', 5)).toBe('Hello');
    expect(pipe.transform('Hi', 5)).toBe('Hi');
    expect(pipe.transform('', 5)).toBe('');
  });

  it('should truncate text and append ellipsis when text exceeds limit', () => {
    expect(pipe.transform('Hello World', 5)).toBe('Hello...');
    expect(pipe.transform('Angular Material Design', 7)).toBe('Angular...');
  });

  it('should use default limit of 5 when limit argument is omitted', () => {
    expect(pipe.transform('Dashboard')).toBe('Dashb...');
    expect(pipe.transform('Test')).toBe('Test');
  });
});

```

---

#### 📄 `src/app/shared/pipes/excerpt.pipe.ts`

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'excerpt',
    standalone: false
})
export class ExcerptPipe implements PipeTransform {
  transform(text: string, limit: number = 5) {
    if(text.length <= limit)
      return text;
    return text.substring(0, limit) + '...';
  }
}
```

---

#### 📄 `src/app/shared/pipes/get-value-by-key.pipe.spec.ts`

```typescript
import { GetValueByKeyPipe } from './get-value-by-key.pipe';

describe('GetValueByKeyPipe', () => {
  let pipe: GetValueByKeyPipe;

  const mockItems = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Editor' },
    { id: 3, name: 'Charlie', role: 'Viewer' }
  ];

  beforeEach(() => {
    pipe = new GetValueByKeyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the requested property value for matching item id', () => {
    expect(pipe.transform(mockItems, 1, 'name')).toBe('Alice');
    expect(pipe.transform(mockItems, 2, 'role')).toBe('Editor');
    expect(pipe.transform(mockItems, 3, 'name')).toBe('Charlie');
  });

  it('should return undefined when item id is not found', () => {
    expect(pipe.transform(mockItems, 999, 'name')).toBeUndefined();
  });

  it('should return undefined when property does not exist on matching item', () => {
    expect(pipe.transform(mockItems, 1, 'nonExistentProp')).toBeUndefined();
  });
});

```

---

#### 📄 `src/app/shared/pipes/get-value-by-key.pipe.ts`

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "getValueByKey",
    pure: false,
    standalone: false
})
export class GetValueByKeyPipe implements PipeTransform {
  transform(value: any[], id: number, property: string): any {
    const filteredObj = value.find(item => {
      if (item.id !== undefined) {
        return item.id === id;
      }

      return false;
    });

    if (filteredObj) {
      return filteredObj[property];
    }
  }
}

```

---

#### 📄 `src/app/shared/pipes/relative-time.pipe.spec.ts`

```typescript
import { RelativeTimePipe } from './relative-time.pipe';

describe('RelativeTimePipe', () => {
  let pipe: RelativeTimePipe;

  beforeEach(() => {
    pipe = new RelativeTimePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format seconds ago correctly', () => {
    const now = new Date();
    const tenSecondsAgo = new Date(now.getTime() - 10 * 1000);
    expect(pipe.transform(tenSecondsAgo)).toContain('seconds ago');
  });

  it('should format minutes ago correctly', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    expect(pipe.transform(fiveMinutesAgo)).toBe('5 minutes ago');
  });

  it('should format hours ago correctly', () => {
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 3600 * 1000);
    expect(pipe.transform(threeHoursAgo)).toBe('3 hours ago');
  });

  it('should format days ago correctly', () => {
    const now = new Date();
    const fourDaysAgo = new Date(now.getTime() - 4 * 86400 * 1000);
    expect(pipe.transform(fourDaysAgo)).toBe('4 days ago');
  });

  it('should handle string date inputs', () => {
    const dateStr = new Date(Date.now() - 30 * 1000).toISOString();
    expect(pipe.transform(dateStr as any)).toContain('seconds ago');
  });
});

```

---

#### 📄 `src/app/shared/pipes/relative-time.pipe.ts`

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'relativeTime',
    standalone: false
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date) {
    if(!(value instanceof Date))
      value = new Date(value);

    let seconds: number = Math.floor(((new Date()).getTime() - value.getTime()) / 1000);
    let interval: number = Math.floor(seconds / 31536000);
    
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
}
```

---

#### 📄 `src/app/shared/pipes/shared-pipes.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from "./excerpt.pipe";
import { GetValueByKeyPipe } from './get-value-by-key.pipe';

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}
```

---

#### 📄 `src/app/shared/search/search-input-over/search-input-over.component.html`

```html
<div class="search-bar-wide" [ngClass]="{ open: isOpen }">
  <button mat-icon-button class="search-icon-btn" (click)="open()">
    <mat-icon>search</mat-icon>
  </button>
  <div>
    <input autoFocus [formControl]="searchCtrl" class="bg-card" type="text" [placeholder]="placeholder" />
  </div>
  <mat-icon class="search-close text-muted" (click)="close()">close</mat-icon>
</div>

```

---

#### 📄 `src/app/shared/search/search-input-over/search-input-over.component.scss`

```scss
.search-bar-wide {
  &.open {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    z-index: 999;
    .search-icon-btn {
      display: none;
    }
    div {
      display: flex;
    }
    .search-close {
      display: block;
    }
  }
  div {
    display: none;
    height: 100%;
    width: 100%;
    input {
      height: 100%;
      width: 100%;
      border: 0;
      outline: 0;
      padding: 0;
      font-weight: 700;
      padding-left: 15px;
    }
  }
  .search-close {
    display: none;
    position: absolute;
    top: 20px;
    right: 15px;
    cursor: pointer;
  }
}

```

---

#### 📄 `src/app/shared/search/search-input-over/search-input-over.component.ts`

```typescript
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  ViewChildren
} from "@angular/core";
import { UntypedFormControl, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { SearchService } from "../search.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AutoFocusDirective } from "app/shared/directives/auto-focus.directive";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedDirectivesModule } from "app/shared/directives/shared-directives.module";

@Component({
    selector: "Ltemplate-search-input-over",
    templateUrl: "./search-input-over.component.html",
    styleUrls: ["./search-input-over.component.scss"],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatIconModule,
      SharedDirectivesModule
    ]
})
export class SearchInputOverComponent implements OnInit, OnDestroy {
  isOpen: boolean;
  @ViewChildren(AutoFocusDirective) searchInput;
  @Input('resultPage') resultPage: string;
  @Input('placeholder') placeholder: string = "Search here";
  @Output("search") search = new EventEmitter();
  searchCtrl = new UntypedFormControl();
  searchCtrlSub: Subscription;
  constructor(
      private searchService: SearchService,
      private router: Router
  ) {}

  ngOnInit() {
    this.searchCtrl.valueChanges.pipe(debounceTime(200))
    .subscribe(value => {
      this.search.emit(value);
      this.searchService.searchTerm.next(value);
    });
  }

  ngOnDestroy() {
    if (this.searchCtrlSub) {
      this.searchCtrlSub.unsubscribe();
    }
  }
  navigateToResult() {
    if(this.resultPage) {
        this.router.navigateByUrl(this.resultPage);
    }
  }
  open() {
    this.isOpen = true;
    this.navigateToResult();

    setTimeout(() => {
      this.searchInput.first.focus();
    })
  }
  close() {
    this.isOpen = false;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
}

```

---

#### 📄 `src/app/shared/search/search.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchInputOverComponent } from "./search-input-over/search-input-over.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedDirectivesModule } from "../directives/shared-directives.module";

@NgModule({
  declarations: [],
  exports: [SearchInputOverComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatIconModule, 
    MatButtonModule, 
    SharedDirectivesModule,
    SearchInputOverComponent
  ]
})
export class SearchModule {}

```

---

#### 📄 `src/app/shared/search/search.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchTerm$: Observable<string> = this.searchTerm.asObservable();

  constructor() {}
}

```

---

#### 📄 `src/app/shared/services/app-confirm/app-confirm.component.ts`

```typescript
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm',
  template: `<div class="p-4">
    <h1 class="text-lg pl-1 !mb-2">{{ data.title }}</h1>
    <div class="mb-4 pl-1" *ngIf="!!data.message">{{ data.message }}</div>
    <div class="!pb-2 w-full flex justify-end gap-2">
    <button
    type="button"
    mat-stroked-button
    (click)="dialogRef.close(false)">Cancel</button>
    <button
    type="button"
    mat-flat-button
    color="primary"
    (click)="dialogRef.close(true)">{{ data.confirmText || 'OK' }}</button>
  </div>`,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class AppComfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
```

---

#### 📄 `src/app/shared/services/app-confirm/app-confirm.service.ts`

```typescript
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { AppComfirmComponent } from './app-confirm.component';

interface confirmData {
  title?: string,
  message?: string,
  confirmText?: string
}

@Injectable({
  providedIn: 'root'
})
export class AppConfirmService {

  constructor(private dialog: MatDialog) { }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.message = data.message || 'Are you sure?';
    data.confirmText = data.confirmText || 'OK';
    let dialogRef: MatDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message, confirmText: data.confirmText}
    });
    return dialogRef.afterClosed();
  }
}
```

---

#### 📄 `src/app/shared/services/app-loader/app-loader.component.css`

```css
.mat-dialog-content {
  min-height: 122px;
}
```

---

#### 📄 `src/app/shared/services/app-loader/app-loader.component.html`

```html
<div class="text-center">
    <h6 class="m-0 !p-4" *ngIf="!!title" style="white-space: pre-wrap; line-height: 1.4;">{{ title }}</h6>
    <div mat-dialog-content>
        <mat-spinner [style.margin]="'auto'"></mat-spinner>
    </div>
</div>

```

---

#### 📄 `src/app/shared/services/app-loader/app-loader.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-app-loader',
    templateUrl: './app-loader.component.html',
    styleUrls: ['./app-loader.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      MatProgressSpinnerModule,
      MatDialogModule
    ]
})
export class AppLoaderComponent implements OnInit {
  title;
  message;
  constructor(public dialogRef: MatDialogRef<AppLoaderComponent>) {}

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/shared/services/app-loader/app-loader.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppLoaderComponent } from './app-loader.component';

interface Config {
  width?: string
}

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {
  dialogRef: MatDialogRef<AppLoaderComponent>;
  constructor(private dialog: MatDialog) { }

  public open(title: string = 'Please wait', config: Config = {width: '200px'}): Observable<boolean> {
    this.dialogRef = this.dialog.open(AppLoaderComponent, { disableClose: true, backdropClass: 'light-backdrop'});
    this.dialogRef.updateSize(config.width);
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }

  public close() {
    if(this.dialogRef)
      this.dialogRef.close();
  }
}

```

---

#### 📄 `src/app/shared/services/auth/jwt-auth.service.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';
import { LocalStoreService } from '../local-store.service';
import { User } from '../../models/user.model';

describe('JwtAuthService', () => {
  let service: JwtAuthService;
  let localStoreSpy: jasmine.SpyObj<LocalStoreService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    localStoreSpy = jasmine.createSpyObj('LocalStoreService', ['getItem', 'setItem']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        JwtAuthService,
        { provide: LocalStoreService, useValue: localStoreSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ return: '/dashboard/analytics' }) }
        }
      ]
    });

    service = TestBed.inject(JwtAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for isLoggedIn when token does not exist', () => {
    localStoreSpy.getItem.and.returnValue(null);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should return true for isLoggedIn when token exists', () => {
    localStoreSpy.getItem.and.returnValue('sample-valid-jwt-token');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should set user and token and update user$ observable', () => {
    const mockUser: User = { id: '123', displayName: 'Watson', role: 'SA' };
    const mockToken = 'jwt-token-abc';

    service.setUserAndToken(mockToken, mockUser, true);

    expect(service.isAuthenticated).toBe(true);
    expect(service.token).toBe(mockToken);
    expect(localStoreSpy.setItem).toHaveBeenCalledWith('JWT_TOKEN', mockToken);
    expect(localStoreSpy.setItem).toHaveBeenCalledWith('Ltemplate_USER', mockUser);
    expect(service.user$.value).toEqual(mockUser);
  });

  it('should clear token and navigate to signin on signout', () => {
    service.signout();

    expect(service.isAuthenticated).toBe(false);
    expect(service.token).toBeNull();
    expect(localStoreSpy.setItem).toHaveBeenCalledWith('JWT_TOKEN', null);
    expect(localStoreSpy.setItem).toHaveBeenCalledWith('Ltemplate_USER', null);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('sessions/signin');
  });
});

```

---

#### 📄 `src/app/shared/services/auth/jwt-auth.service.ts`

```typescript
import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";

// ================= only for demo purpose ===========
const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

const DEMO_USER: User = {
  id: "5b700c45639d2c0c54b354ba",
  displayName: "Watson Joyce",
  role: "SA",
};
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token: string | null = null;
  isAuthenticated: boolean = false;
  user: User | null = null;
  user$ = new BehaviorSubject<User | null>(this.user);
  signingIn: boolean = false;
  return: string;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "Ltemplate_USER";

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }

  public signin(username, password) {
    return of({token: DEMO_TOKEN, user: DEMO_USER})
      .pipe(
        delay(1000),
        map((res: any) => {
          this.setUserAndToken(res.token, res.user, !!res);
          this.signingIn = false;
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );

    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER

    // this.signingIn = true;
    // return this.http.post(`${environment.apiURL}/auth/local`, { username, password })
    //   .pipe(
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    return of(DEMO_USER)
      .pipe(
        map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), profile, true);
          this.signingIn = false;
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );
    
    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */

    // return this.http.get(`${environment.apiURL}/api/users/profile`)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       this.signout();
    //       return of(error);
    //     })
    //   );
  }

  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: string | null, user: User | null, isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }
}

```

---

#### 📄 `src/app/shared/services/copier.service.ts`

```typescript
/**
 * This class is based on the code in the following projects:
 *
 * - https://github.com/zenorocha/select
 * - https://github.com/zenorocha/clipboard.js/
 *
 * Both released under MIT license - © Zeno Rocha
 */
import {Injectable} from '@angular/core';

@Injectable()
export class CopierService {

  private textarea: HTMLTextAreaElement | null = null;

  /** Copy the text value to the clipboard. */
  copyText(text: string): boolean {
    this.createTextareaAndSelect(text);

    const copySuccessful = document.execCommand('copy');
    this.removeFake();

    return copySuccessful;
  }

  /**
   * Creates a hidden textarea element, sets its value from `text` property,
   * and makes a selection on it.
   */
  private createTextareaAndSelect(text: string) {
    // Create a fake element to hold the contents to copy
    this.textarea = document.createElement('textarea');

    // Prevent zooming on iOS
    this.textarea.style.fontSize = '12pt';

    // Hide the element
    this.textarea.classList.add('cdk-visually-hidden');

    // Move element to the same position vertically
    const yPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.textarea.style.top = yPosition + 'px';

    this.textarea.setAttribute('readonly', '');
    this.textarea.value = text;

    document.body.appendChild(this.textarea);

    this.textarea.select();
    this.textarea.setSelectionRange(0, this.textarea.value.length);
  }

  /** Remove the text area from the DOM. */
  private removeFake() {
    if (this.textarea) {
      document.body.removeChild(this.textarea);
      this.textarea = null;
    }
  }
}
```

---

#### 📄 `src/app/shared/services/customizer.service.ts`

```typescript
import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { filter } from "rxjs/operators";
import { LayoutService } from "./layout.service";

@Injectable({
  providedIn: "root"
})
export class CustomizerService {


  colors = [
    {
      class: "black",
      active: false
    },
    {
      class: "white",
      active: false
    },
    {
      class: "dark-blue",
      active: false
    },
    {
      class: "grey",
      active: false
    },
    {
      class: "brown",
      active: false
    },
    {
      class: "gray",
      active: false
    },
    {
      class: "purple",
      active: false
    },
    {
      class: "blue",
      active: false
    },
    
    {
      class: "indigo",
      active: false
    },
    {
      class: "yellow",
      active: false
    },
    {
      class: "green",
      active: false
    },
    {
      class: "pink",
      active: false
    },
    {
      class: "red",
      active: false
    },
    {
      class: "slate",
      active: false
    }
  ];
  selectedSidebarColor;
  topbarColors: any[];
  sidebarColors: any[];

  constructor(
    private router: Router,     
    private layout: LayoutService,
  ) {
    this.sidebarColors = this.getSidebarColors();
  }

  getSidebarColors() {
    let sidebarColors = [
      {
        class: "sidebar-dark",
        active: false
      },
      {
        class: "sidebar-light",
        active: false
      }
    ];
    return sidebarColors;
  }


  changeSidebarColor(color) {
    this.layout.publishLayoutChange({ sidebarColor: color.class });
    this.sidebarColors = this.getSidebarColors();
  }

  removeClass(el, className) {
    if (!el || el.length === 0) return;
    if (!el.length) {
      el.classList.remove(className);
    } else {
      for (var i = 0; i < el.length; i++) {
        el[i].classList.remove(className);
      }
    }
  }
  addClass(el, className) {
    if (!el) return;
    if (!el.length) {
      el.classList.add(className);
    } else {
      for (var i = 0; i < el.length; i++) {
        el[i].classList.add(className);
      }
    }
  }
  findClosest(el, className) {
    if (!el) return;
    while (el) {
      var parent = el.parentElement;
      if (parent && this.hasClass(parent, className)) {
        return parent;
      }
      el = parent;
    }
  }
  hasClass(el, className) {
    if (!el) return;
    return (
      ` ${el.className} `.replace(/[\n\t]/g, " ").indexOf(` ${className} `) > -1
    );
  }
  toggleClass(el, className) {
    if (!el) return;
    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  }

}
```

---

#### 📄 `src/app/shared/services/error-handler.service.ts`

```typescript
import { ErrorHandler, Injectable, Injector, ApplicationRef, ChangeDetectorRef } from '@angular/core';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    errorCount = 0;

    constructor(protected injector: Injector) {
        super();
    }
    // https://github.com/angular/angular/issues/17010
    handleError(error: any) {
        let increment = 5;
        let max = 50;

        // Prevents change detection
        let debugCtx = error['ngDebugContext'];
        let changeDetectorRef = debugCtx && debugCtx.injector.get(ChangeDetectorRef);
        if (changeDetectorRef) changeDetectorRef.detach();

        this.errorCount = this.errorCount + 1;
        if (this.errorCount % increment === 0) {
            console.log(' ');
            console.log(`errorHandler() was called ${this.errorCount} times.`);
            console.log(' ');
            super.handleError(error);

            if (this.errorCount === max) {
                console.log(' ');
                console.log(`Preventing recursive error after ${this.errorCount} recursive errors.`);
                console.log(' ');

                let appRef = this.injector.get(ApplicationRef);
                appRef.tick();
            }
        }
        else if (this.errorCount === 1) {
            super.handleError(error);
        }
    }
}

```

---

#### 📄 `src/app/shared/services/landing-page.service.ts`

```typescript
/* 
  Only Required if you want to use Angular Landing
  (https://themeforest.net/item/angular-landing-material-design-angular-app-landing-page/21198258)
*/
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class LandingPageService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  public addFix() {
    this.document.documentElement.classList.add('landing');
    this.document.body.classList.add('landing');
  }
  public removeFix() {
    this.document.documentElement.classList.remove('landing');
    this.document.body.classList.remove('landing');
  }

}

```

---

#### 📄 `src/app/shared/services/layout.service.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { LayoutService, ILayoutConf } from './layout.service';
import { ThemeService } from './theme.service';

describe('LayoutService', () => {
  let service: LayoutService;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(() => {
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['setActiveThemeById']);

    TestBed.configureTestingModule({
      providers: [
        LayoutService,
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    });

    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default layout configuration', () => {
    expect(service.layoutConf).toBeDefined();
    expect(service.layoutConf.navigationPos).toBe('side');
    expect(service.layoutConf.sidebarStyle).toBe('full');
    expect(service.layoutConf.dir).toBe('ltr');
  });

  it('should publish layout changes and notify subscribers', (done) => {
    const updatedConf: ILayoutConf = {
      navigationPos: 'top',
      sidebarStyle: 'compact',
      dir: 'rtl'
    };

    service.layoutConf$.subscribe(conf => {
      if (conf.navigationPos === 'top') {
        expect(conf.sidebarStyle).toBe('compact');
        expect(conf.dir).toBe('rtl');
        done();
      }
    });

    service.publishLayoutChange(updatedConf);
  });

  it('should delegate applyMatTheme to ThemeService', () => {
    service.applyMatTheme('Ltemplate-navy-dark');
    expect(themeServiceSpy.setActiveThemeById).toHaveBeenCalledWith('Ltemplate-navy-dark');
  });

  it('should expose reactive signals for layoutConfSignal, isCompact, isMobileSignal, and currentTheme', () => {
    expect(service.layoutConfSignal().navigationPos).toBe('side');
    expect(service.isCompact()).toBe(false);
    expect(service.currentTheme()).toBe('Ltemplate-navy');
    expect(typeof service.isMobileSignal()).toBe('boolean');

    service.publishLayoutChange({ sidebarStyle: 'compact', matTheme: 'Ltemplate-navy-dark' });
    expect(service.isCompact()).toBe(true);
    expect(service.currentTheme()).toBe('Ltemplate-navy-dark');
    expect(service.isDarkTheme()).toBe(true);
  });
});

```

---

#### 📄 `src/app/shared/services/layout.service.ts`

```typescript
import { Injectable, Renderer2, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from './theme.service';
import { config } from 'config';

export interface ILayoutConf {
  navigationPos?: string; // side, top
  sidebarStyle?: string; // full, compact, closed
  sidebarCompactToggle?: boolean; // sidebar expandable on hover
  sidebarColor?: string; // Sidebar background color
  dir?: string; // ltr, rtl
  isMobile?: boolean; // updated automatically
  useBreadcrumb?: boolean; // Breadcrumb enabled/disabled
  breadcrumb?: string; // simple, title
  topbarFixed?: boolean; // Fixed header
  matTheme?: string; // material theme. Ltemplate-navy, Ltemplate-navy-dark
}
export interface ILayoutChangeOptions {
  duration?: number;
  transitionClass?: boolean;
}
interface IAdjustScreenOptions {
  browserEvent?: any;
  route?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  // Signals State
  private _layoutConf = signal<ILayoutConf>({});
  public readonly layoutConfSignal = this._layoutConf.asReadonly();
  public readonly isMobileSignal = signal<boolean>(false);
  public readonly currentTheme = computed(() => this._layoutConf().matTheme || 'Ltemplate-navy');
  public readonly isCompact = computed(() => this._layoutConf().sidebarStyle === 'compact');
  public readonly isDarkTheme = computed(() => (this.currentTheme() || '').includes('dark'));

  // Property compatibility for template access: `layout.layoutConf.useBreadcrumb`
  public get layoutConf(): ILayoutConf {
    return this._layoutConf();
  }
  public set layoutConf(conf: ILayoutConf) {
    this._layoutConf.set(conf);
  }

  // Observable bridge
  public readonly layoutConf$ = toObservable(this._layoutConf);
  public isMobile: boolean = false;
  public currentRoute: string = '';
//   public fullWidthRoutes = ['shop'];
  public fullWidthRoutes = [];

  constructor(private themeService: ThemeService) {
    this.setAppLayout();
  }

  setAppLayout() {
    // ********** SET DEFAULT LAYOUT **********
    let defaultLayout: ILayoutConf = {
      navigationPos: 'side', // side, top
      sidebarStyle: 'full', // full, compact, closed
      sidebarCompactToggle: false, // if "sidebarStyle" is "compact" make it true
      dir: 'ltr', // ltr, rtl
      useBreadcrumb: true, 
      topbarFixed: false,
      sidebarColor: 'sidebar-dark', // sidebar-dark, sidebar-light
      matTheme: 'Ltemplate-navy', // Ltemplate-navy, Ltemplate-navy-dark
      breadcrumb: 'simple', // simple, title
    };
    this.publishLayoutChange(defaultLayout);
  }

  publishLayoutChange(lc: ILayoutConf) {
    // if (this.layoutConf.matTheme !== lc.matTheme && lc.matTheme) {
      let themeId: string | null = null;
      try {
        themeId = localStorage.getItem(config.themeLocalStorageKey);
      } catch (e) {
        console.log('Error getting theme from local storage', e);
      }
      const activeThemeId = themeId || lc.matTheme;
      if (activeThemeId) {
        this.themeService.setActiveThemeById(activeThemeId);
      }
    // }

    const merged = Object.assign({}, this._layoutConf(), lc);
    this._layoutConf.set(merged);
  }

  applyMatTheme(themeId: string) {
    this.themeService.setActiveThemeById(themeId);
  }

  adjustLayout(options: IAdjustScreenOptions = {}) {
    let sidebarStyle: string;
    this.isMobile = this.isSm();
    this.isMobileSignal.set(this.isMobile);
    this.currentRoute = options.route || this.currentRoute;
    sidebarStyle = this.isMobile ? 'closed' : 'full';

    if (this.currentRoute) {
      this.fullWidthRoutes.forEach((route) => {
        if (this.currentRoute.indexOf(route) !== -1) {
          sidebarStyle = 'closed';
        }
      });
    }

    this.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle,
    });
  }
  isSm() {
    return window.matchMedia(`(max-width: 959px)`).matches;
  }
}

```

---

#### 📄 `src/app/shared/services/local-store.service.ts`

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  private ls = window.localStorage;

  constructor() {}

  public setItem(key, value) {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key: string) {
    const value = this.ls.getItem(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  public clear() {
    this.ls.clear();
  }
}

```

---

#### 📄 `src/app/shared/services/match-media.service.ts`

```typescript
import { Injectable } from '@angular/core';
// import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    // private mediaObserver: MediaObserver
  ) {
    this.activeMediaQuery = '';
    this.init();
  }

  private init(): void {
    // this.mediaObserver.asObservable()
    //   .subscribe((change: MediaChange[]) => {
    //     if (this.activeMediaQuery !== change[0].mqAlias) {
    //       this.activeMediaQuery = change[0].mqAlias;
    //       this.onMediaChange.next(change[0].mqAlias);
    //     }
    //   });
  }
}

```

---

#### 📄 `src/app/shared/services/navigation.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  iconMenu: IMenuItem[] = [
    {
      name: 'PROFILE',
      type: 'icon',
      icon: 'person',
      state: 'profile/overview'
    },
    {
      name: 'TOUR',
      type: 'icon',
      icon: 'flight_takeoff',
      state: 'tour'
    },
    {
      name: 'CHAT',
      type: 'icon',
      icon: 'chat',
      state: 'chat',
    },
    {
      type: 'separator',
      name: 'Main Items'
    },
    {
      name: 'DASHBOARD',
      type: 'dropDown',
      icon: 'dashboard',
      sub: [
        { name: 'Analytics', state: 'dashboard/analytics' },
        { name: 'Learning Management', state: 'dashboard/learning-management' },
        { name: 'Analytics Alt', state: 'dashboard/analytics-alt' },
        { name: 'Cryptocurrency', state: 'dashboard/crypto' },
      ]
    },
    {
      name: 'Data Table',
      type: 'dropDown',
      icon: 'list',
      sub: [
        {name: 'Basic Table', state: 'tables/mat-table'},
        {name: 'CRUD Table', state: 'cruds/ngx-table'},
        {name: 'Table variations', state: 'material/table'}
      ]
    },
    {
      name: 'CHAT',
      type: 'link',
      icon: 'chat',
      state: 'chat',
      badges: [{ color: 'warn', value: '1' }]
    },
    {
      name: 'Invoice',
      type: 'dropDown',
      icon: 'receipt',
      sub: [
        { name: 'List', state: 'invoice/list' },
        { name: 'View / Edit / Print', state: 'invoice/5a9ae2106518248b68251fd1' },
      ]
    },
    {
      name: 'ECOMMERCE',
      type: 'dropDown',
      icon: 'shopping_cart',
      sub: [
        { name: 'PRODUCTS', state: 'shop' },
        { name: 'PRODUCT DETAILS', state: 'shop/products/5a9ae2106f155194e5c95d67' },
        { name: 'CART', state: 'shop/cart' },
        { name: 'CHECKOUT', state: 'shop/checkout' }
      ]
    },
    {
      name: 'INBOX',
      type: 'link',
      icon: 'inbox',
      state: 'inbox',
      badges: [{ color: 'primary', value: '4' }]
    },
    {
      name: 'CALENDAR',
      type: 'link',
      icon: 'date_range',
      state: 'calendar'
    },
    {
      name: 'Todo',
      type: 'link',
      icon: 'center_focus_strong',
      state: 'todo/list'
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      icon: 'filter_none',
      sub: [
        { name: 'CONFIRM', state: 'dialogs/confirm' },
        { name: 'LOADER', state: 'dialogs/loader' }
      ]
    },
    {
      name: 'Material Kits',
      type: 'dropDown',
      icon: 'favorite',
      badges: [{ color: 'primary', value: '60+' }],
      sub: [
        {
          name: 'Form controls',
          type: 'dropDown',
          sub: [
            { name: 'Autocomplete', state: 'material/autocomplete' },
            { name: 'Checkbox', state: 'material/checkbox' },
            { name: 'Datepicker', state: 'material/datepicker' },
            { name: 'Form Field', state: 'material/form-field' },
            { name: 'Input Field', state: 'material/input-field' },
            { name: 'Radio Button', state: 'material/radio-button' },
            { name: 'Select', state: 'material/select' },
            { name: 'Slider', state: 'material/slider' },
            { name: 'Slider Toggle', state: 'material/slider-toggle' }
          ]
        },
        {
          name: 'Navigation',
          type: 'dropDown',
          sub: [
            { name: 'Menu', state: 'material/menu' },
            { name: 'Sidenav', state: 'material/sidenav' },
            { name: 'Toolbar', state: 'material/toolbar' }
          ]
        },
        {
          name: 'Layout',
          type: 'dropDown',
          sub: [
            { name: 'Card', state: 'material/card' },
            { name: 'Divider', state: 'material/divider' },
            { name: 'Expansion Panel', state: 'material/expansion-panel' },
            { name: 'Grid', state: 'material/grid' },
            { name: 'List', state: 'material/list' },
            { name: 'Stepper', state: 'material/stepper' },
            { name: 'Tab', state: 'material/tab-group' },
            { name: 'Tree', state: 'material/tree' }
          ]
        },
        {
          name: 'Buttons & Indicators',
          type: 'dropDown',
          sub: [
            { name: 'BUTTONS', state: 'material/buttons' },
            { name: 'Button Toggle', state: 'material/button-toggle' },
            { name: 'Badge', state: 'material/badge' },
            { name: 'Chips', state: 'material/chips' },
            { name: 'Icons', state: 'material/icons' },
            { name: 'Progress Spinner', state: 'material/progress-spinner' },
            { name: 'Progress Bar', state: 'material/progress-bar' },
            { name: 'Ripples', state: 'material/ripples' }
          ]
        },
        {
          name: 'Popups & Modals',
          type: 'dropDown',
          sub: [
            { name: 'Tooltip', state: 'material/tooltip' },
            { name: 'Bottom Sheet', state: 'material/bottom-sheet' },
            { name: 'Dialog', state: 'material/dialog' },
            { name: 'Snackbar', state: 'material/snackbar' }
          ]
        },
        {
          name: 'Data Table',
          type: 'dropDown',
          sub: [
            { name: 'paginator', state: 'material/paginator' },
            { name: 'Sort Header', state: 'material/sort-header' },
            { name: 'Table', state: 'material/table' }
          ]
        }        
      ]
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      icon: 'description',
      sub: [
        { name: 'BASIC', state: 'forms/basic' },
        { name: 'EDITOR', state: 'forms/editor' },
        { name: 'WIZARD', state: 'forms/wizard' }
      ]
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      icon: 'person',
      badges: [{ color: 'primary', value: '2' }],
      sub: [
        { name: 'OVERVIEW', state: 'profile/overview' },
        { name: 'SETTINGS', state: 'profile/settings' },
        { name: 'BLANK', state: 'profile/blank' }
      ]
    },
    {
      name: 'TOUR',
      type: 'link',
      icon: 'flight_takeoff',
      state: 'tour'
    },
    // {
    //   name: 'MAP',
    //   type: 'link',
    //   tooltip: 'Map',
    //   icon: 'add_location',
    //   state: 'map'
    // },

    {
      name: 'CHARTS',
      type: 'dropDown',
      icon: 'show_chart',
      sub: [
        { name: 'Chart js', state: 'charts' },
        {
          name: 'eChart',
          type: 'dropDown',
          state: 'chart',
          sub: [
            { name: 'Pie', state: 'chart/pie' },
            { name: 'Bar', state: 'chart/bar' },
            { name: 'Radar', state: 'chart/radar' },
            { name: "Heatmap", state: "chart/heatmap" },
          ]
        }
      ]
    },
    {
      name: 'Page Layouts',
      type: 'dropDown',
      icon: 'view_carousel',
      sub: [
        { name: 'Left sidebar card', state: 'page-layouts/left-sidebar-card' },
        { name: 'Right sidebar card', state: 'page-layouts/right-sidebar-card' },
        { name: 'Full width card', state: 'page-layouts/full-width-card' },
        { name: 'Full width card tab', state: 'page-layouts/full-width-card-tab' },
      ]
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      icon: 'view_carousel',
      sub: [
        { name: 'SIGNIN', state: 'session-pages/signin' },
        { name: 'SIGNUP', state: 'session-pages/signup' },
        { name: 'FORGOT', state: 'session-pages/forgot-password' },
        { name: 'LOCKSCREEN', state: 'session-pages/lockscreen' },
        { name: 'NOTFOUND', state: 'session-pages/404' },
        { name: 'ERROR', state: 'session-pages/error' },
        { name: 'Signin 2', state: 'session-pages/signin2' },
        { name: 'Signup 2', state: 'session-pages/signup2' },
        { name: 'Signup 3', state: 'session-pages/signup3' },
        { name: 'Signin 3', state: 'session-pages/signin3' },
      ]
    },
    {
      name: 'Utilities',
      type: 'dropDown',
      icon: 'format_list_bulleted',
      sub: [
        { name: 'Color', state: 'utilities/color' },
        { name: 'Typography', state: 'utilities/typography' }
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      icon: 'blur_on',
      sub: [
        { name: 'GALLERY', state: 'others/gallery' },
        { name: 'PRICINGS', state: 'others/pricing' },
        { name: 'USERS', state: 'others/users' },
        { name: 'BLANK', state: 'others/blank' }
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      icon: 'store',
      state: 'icons'
    },
    {
      name: 'Multi Level',
      type: 'dropDown',
      icon: 'format_align_center',
      sub: [
        { name: 'Level Two', state: 'fake-4' },
        {
          name: 'Level Two',
          type: 'dropDown',
          sub: [
            { name: 'Level Three', state: 'fake-2' },
            { 
              name: 'Level Three', 
              type: 'dropDown',
              sub: [
                { name: 'Level Four', state: 'fake-3' },
                { 
                  name: 'Level Four', 
                  type: 'dropDown',
                  sub: [
                    { name: 'Level Five', state: 'fake-3' },
                    { name: 'Level Five', type: 'link', state: 'fake-3' }
                  ]
                }
              ]
            }
          ]
        },
        { name: 'Level Two', state: 'fake-5' }
      ]
    },
    {
      name: 'DOC',
      type: 'extLink',
      icon: 'library_books',
      state: 'https://github.com/andreizav/Ltemplate#readme'
    }
  ];

  separatorMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'CUSTOM COMPONENTS'
    },
    {
      name: 'DASHBOARD',
      type: 'dropDown',
      icon: 'dashboard',
      sub: [
        { name: 'Analytics', state: 'dashboard/analytics' },
        { name: 'Learning Management', state: 'dashboard/learning-management' },
        { name: 'Analytics Alt', state: 'dashboard/analytics-alt' },
        { name: 'Cryptocurrency', state: 'dashboard/crypto' },
      ]
    },
    {
      name: 'CRUD Table',
      type: 'link',
      icon: 'list',
      state: 'cruds/ngx-table'
    },
    {
      name: 'ECOMMERCE',
      type: 'dropDown',
      icon: 'shopping_cart',
      sub: [
        { name: 'PRODUCTS', state: 'shop' },
        { name: 'PRODUCT DETAILS', state: 'shop/products/5a9ae2106f155194e5c95d67' },
        { name: 'CART', state: 'shop/cart' },
        { name: 'CHECKOUT', state: 'shop/checkout' }
      ]
    },
    {
      name: 'INBOX',
      type: 'link',
      icon: 'inbox',
      state: 'inbox',
      badges: [{ color: 'primary', value: '4' }]
    },
    {
      name: 'Invoice',
      type: 'dropDown',
      icon: 'receipt',
      sub: [
        { name: 'List', state: 'invoice/list' },
        { name: 'View / Edit', state: 'invoice/5a9ae2106518248b68251fd1' },
      ]
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      icon: 'person',
      badges: [{ color: 'primary', value: '2' }],
      sub: [
        { name: 'OVERVIEW', state: 'profile/overview' },
        { name: 'SETTINGS', state: 'profile/settings' },
        { name: 'BLANK', state: 'profile/blank' }
      ]
    },
    {
      name: 'CHAT',
      type: 'link',
      icon: 'chat',
      state: 'chat',
      badges: [{ color: 'warn', value: '1' }]
    },
    {
      name: 'Todo',
      type: 'link',
      icon: 'center_focus_strong',
      state: 'todo/list'
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      icon: 'filter_none',
      sub: [
        { name: 'CONFIRM', state: 'dialogs/confirm' },
        { name: 'LOADER', state: 'dialogs/loader' }
      ]
    },
    {
      type: 'separator',
      name: 'INTEGRATED COMPONENTS'
    },
    {
      name: 'Material Kits',
      type: 'dropDown',
      icon: 'favorite',
      badges: [{ color: 'primary', value: '60+' }],
      sub: [
        {
          name: 'Form controls',
          type: 'dropDown',
          sub: [
            { name: 'Autocomplete', state: 'material/autocomplete' },
            { name: 'Checkbox', state: 'material/checkbox' },
            { name: 'Datepicker', state: 'material/datepicker' },
            { name: 'Form Field', state: 'material/form-field' },
            { name: 'Input Field', state: 'material/input-field' },
            { name: 'Radio Button', state: 'material/radio-button' },
            { name: 'Select', state: 'material/select' },
            { name: 'Slider', state: 'material/slider' },
            { name: 'Slider Toggle', state: 'material/slider-toggle' }
          ]
        },
        {
          name: 'Navigation',
          type: 'dropDown',
          sub: [
            { name: 'Menu', state: 'material/menu' },
            { name: 'Sidenav', state: 'material/sidenav' },
            { name: 'Toolbar', state: 'material/toolbar' }
          ]
        },
        {
          name: 'Layout',
          type: 'dropDown',
          sub: [
            { name: 'Card', state: 'material/card' },
            { name: 'Divider', state: 'material/divider' },
            { name: 'Expansion Panel', state: 'material/expansion-panel' },
            { name: 'Grid', state: 'material/grid' },
            { name: 'List', state: 'material/list' },
            { name: 'Stepper', state: 'material/stepper' },
            { name: 'Tab', state: 'material/tab-group' },
            { name: 'Tree', state: 'material/tree' }
          ]
        },
        {
          name: 'Buttons & Indicators',
          type: 'dropDown',
          sub: [
            { name: 'BUTTONS', state: 'material/buttons' },
            { name: 'Button Toggle', state: 'material/button-toggle' },
            { name: 'Badge', state: 'material/badge' },
            { name: 'Chips', state: 'material/chips' },
            { name: 'Icons', state: 'material/icons' },
            { name: 'Progress Spinner', state: 'material/progress-spinner' },
            { name: 'Progress Bar', state: 'material/progress-bar' },
            { name: 'Ripples', state: 'material/ripples' }
          ]
        },
        {
          name: 'Popups & Modals',
          type: 'dropDown',
          sub: [
            { name: 'Tooltip', state: 'material/tooltip' },
            { name: 'Bottom Sheet', state: 'material/bottom-sheet' },
            { name: 'Dialog', state: 'material/dialog' },
            { name: 'Snackbar', state: 'material/snackbar' }
          ]
        },
        {
          name: 'Data Table',
          type: 'dropDown',
          sub: [
            { name: 'paginator', state: 'material/paginator' },
            { name: 'Sort Header', state: 'material/sort-header' },
            { name: 'Table', state: 'material/table' }
          ]
        },
      ]
    },
    {
      name: 'CALENDAR',
      type: 'link',
      icon: 'date_range',
      state: 'calendar'
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      icon: 'description',
      sub: [
        { name: 'BASIC', state: 'forms/basic' },
        { name: 'EDITOR', state: 'forms/editor' },
        { name: 'WIZARD', state: 'forms/wizard' }
      ]
    },
    {
      name: 'Table',
      type: 'link',
      icon: 'format_line_spacing',
      state: 'tables/mat-table',
    },
    {
      name: 'TOUR',
      type: 'link',
      icon: 'flight_takeoff',
      state: 'tour'
    },
    // {
    //   name: 'MAP',
    //   type: 'link',
    //   tooltip: 'Map',
    //   icon: 'add_location',
    //   state: 'map'
    // },

    {
      name: 'CHARTS',
      type: 'dropDown',
      icon: 'show_chart',
      sub: [
        { name: 'Chart js', state: 'charts' },
        {
          name: 'eChart',
          type: 'dropDown',
          state: 'chart',
          sub: [
            { name: 'Pie', state: 'chart/pie' },
            { name: 'Bar', state: 'chart/bar' },
            { name: 'Radar', state: 'chart/radar' },
            { name: "Heatmap", state: "chart/heatmap" },
          ]
        }
      ]
    },
    {
      name: 'OTHER COMPONENTS',
      type: 'separator',
    },
    {
      name: 'Page Layouts',
      type: 'dropDown',
      icon: 'view_carousel',
      sub: [
        { name: 'Left sidebar card', state: 'page-layouts/left-sidebar-card' },
        { name: 'Right sidebar card', state: 'page-layouts/right-sidebar-card' },
        { name: 'Full width card', state: 'page-layouts/full-width-card' },
        { name: 'Full width card tab', state: 'page-layouts/full-width-card-tab' },
      ]
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      icon: 'view_carousel',
      sub: [
        { name: 'SIGNUP', state: 'session-pages/signup' },
        { name: 'Signup 2', state: 'session-pages/signup2' },
        { name: 'Signup 3', state: 'session-pages/signup3' },
        { name: 'SIGNIN', state: 'session-pages/signin' },
        { name: 'Signin 2', state: 'session-pages/signin2' },
        { name: 'Signin 3', state: 'session-pages/signin3' },
        { name: 'FORGOT', state: 'session-pages/forgot-password' },
        { name: 'LOCKSCREEN', state: 'session-pages/lockscreen' },
        { name: 'NOTFOUND', state: 'session-pages/404' },
        { name: 'ERROR', state: 'session-pages/error' }
      ]
    },
    {
      name: 'Utilities',
      type: 'dropDown',
      icon: 'format_list_bulleted',
      sub: [
        { name: 'Color', state: 'utilities/color' },
        { name: 'Typography', state: 'utilities/typography' }
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      icon: 'blur_on',
      sub: [
        { name: 'GALLERY', state: 'others/gallery' },
        { name: 'PRICINGS', state: 'others/pricing' },
        { name: 'USERS', state: 'others/users' },
        { name: 'BLANK', state: 'others/blank' }
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      icon: 'store',
      state: 'icons'
    },
    {
      name: 'Multi Level',
      type: 'dropDown',
      icon: 'format_align_center',
      sub: [
        { name: 'Level Two', state: 'fake-4' },
        {
          name: 'Level Two',
          type: 'dropDown',
          state: 'fake-1',
          sub: [
            { name: 'Level Three', state: 'fake-2' },
            { 
              name: 'Level Three', 
              type: 'dropDown',
              state: 'fake-3',
              sub: [
                { name: 'Level Four', state: 'fake-3' },
                { 
                  name: 'Level Four', 
                  type: 'dropDown',
                  state: 'fake-4',
                  sub: [
                    { name: 'Level Five', state: 'fake-3' },
                    { name: 'Level Five', type: 'link' }
                  ]
                }
              ]
            }
          ]
        },
        { name: 'Level Two', state: 'fake-5' }
      ]
    },
    {
      name: 'DOC',
      type: 'extLink',
      icon: 'library_books',
      state: 'https://github.com/andreizav/Ltemplate#readme'
    }
  ];

  plainMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      type: 'dropDown',
      icon: 'dashboard',
      sub: [
        { name: 'Analytics', state: 'dashboard/analytics' },
        { name: 'Learning Management', state: 'dashboard/learning-management' },
        { name: 'Analytics Alt', state: 'dashboard/analytics-alt' },
        { name: 'Cryptocurrency', state: 'dashboard/crypto' },
      ]
    },
    {
      name: 'CRUD Table',
      type: 'link',
      icon: 'list',
      state: 'cruds/ngx-table'
    },
    {
      name: 'ECOMMERCE',
      type: 'dropDown',
      icon: 'shopping_cart',
      sub: [
        { name: 'PRODUCTS', state: 'shop' },
        { name: 'PRODUCT DETAILS', state: 'shop/products/5a9ae2106f155194e5c95d67' },
        { name: 'CART', state: 'shop/cart' },
        { name: 'CHECKOUT', state: 'shop/checkout' }
      ]
    },
    {
      name: 'INBOX',
      type: 'link',
      icon: 'inbox',
      state: 'inbox',
      badges: [{ color: 'primary', value: '4' }]
    },
    {
      name: 'Invoice',
      type: 'dropDown',
      icon: 'receipt',
      sub: [
        { name: 'List', state: 'invoice/list' },
        { name: 'View / Edit', state: 'invoice/5a9ae2106518248b68251fd1' },
      ]
    },
    {
      name: 'CHAT',
      type: 'link',
      icon: 'chat',
      state: 'chat',
      badges: [{ color: 'warn', value: '1' }]
    },
    {
      name: 'CALENDAR',
      type: 'link',
      icon: 'date_range',
      state: 'calendar'
    },
    {
      name: 'Todo',
      type: 'link',
      icon: 'center_focus_strong',
      state: 'todo/list'
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      icon: 'filter_none',
      sub: [
        { name: 'CONFIRM', state: 'dialogs/confirm' },
        { name: 'LOADER', state: 'dialogs/loader' }
      ]
    },
    {
      name: 'Material Kits',
      type: 'dropDown',
      icon: 'favorite',
      badges: [{ color: 'primary', value: '60+' }],
      sub: [
        {
          name: 'Form controls',
          type: 'dropDown',
          sub: [
            { name: 'Autocomplete', state: 'material/autocomplete' },
            { name: 'Checkbox', state: 'material/checkbox' },
            { name: 'Datepicker', state: 'material/datepicker' },
            { name: 'Form Field', state: 'material/form-field' },
            { name: 'Input Field', state: 'material/input-field' },
            { name: 'Radio Button', state: 'material/radio-button' },
            { name: 'Select', state: 'material/select' },
            { name: 'Slider', state: 'material/slider' },
            { name: 'Slider Toggle', state: 'material/slider-toggle' }
          ]
        },
        {
          name: 'Navigation',
          type: 'dropDown',
          sub: [
            { name: 'Menu', state: 'material/menu' },
            { name: 'Sidenav', state: 'material/sidenav' },
            { name: 'Toolbar', state: 'material/toolbar' }
          ]
        },
        {
          name: 'Layout',
          type: 'dropDown',
          sub: [
            { name: 'Card', state: 'material/card' },
            { name: 'Divider', state: 'material/divider' },
            { name: 'Expansion Panel', state: 'material/expansion-panel' },
            { name: 'Grid', state: 'material/grid' },
            { name: 'List', state: 'material/list' },
            { name: 'Stepper', state: 'material/stepper' },
            { name: 'Tab', state: 'material/tab-group' },
            { name: 'Tree', state: 'material/tree' }
          ]
        },
        {
          name: 'Buttons & Indicators',
          type: 'dropDown',
          sub: [
            { name: 'BUTTONS', state: 'material/buttons' },
            { name: 'Button Toggle', state: 'material/button-toggle' },
            { name: 'Badge', state: 'material/badge' },
            { name: 'Chips', state: 'material/chips' },
            { name: 'Icons', state: 'material/icons' },
            { name: 'Progress Spinner', state: 'material/progress-spinner' },
            { name: 'Progress Bar', state: 'material/progress-bar' },
            { name: 'Ripples', state: 'material/ripples' }
          ]
        },
        {
          name: 'Popups & Modals',
          type: 'dropDown',
          sub: [
            { name: 'Tooltip', state: 'material/tooltip' },
            { name: 'Bottom Sheet', state: 'material/bottom-sheet' },
            { name: 'Dialog', state: 'material/dialog' },
            { name: 'Snackbar', state: 'material/snackbar' }
          ]
        },
        {
          name: 'Data Table',
          type: 'dropDown',
          sub: [
            { name: 'paginator', state: 'material/paginator' },
            { name: 'Sort Header', state: 'material/sort-header' },
            { name: 'Table', state: 'material/table' }
          ]
        }
      ]
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      icon: 'description',
      sub: [
        { name: 'BASIC', state: 'forms/basic' },
        { name: 'EDITOR', state: 'forms/editor' },
        { name: 'WIZARD', state: 'forms/wizard' }
      ]
    },
    {
      name: 'Table',
      type: 'link',
      icon: 'format_line_spacing',
      state: 'tables/mat-table',
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      icon: 'person',
      badges: [{ color: 'primary', value: '2' }],
      sub: [
        { name: 'OVERVIEW', state: 'profile/overview' },
        { name: 'SETTINGS', state: 'profile/settings' },
        { name: 'BLANK', state: 'profile/blank' }
      ]
    },
    {
      name: 'TOUR',
      type: 'link',
      icon: 'flight_takeoff',
      state: 'tour'
    },
    // {
    //   name: 'MAP',
    //   type: 'link',
    //   tooltip: 'Map',
    //   icon: 'add_location',
    //   state: 'map'
    // },

    {
      name: 'CHARTS',
      type: 'dropDown',
      icon: 'show_chart',
      sub: [
        { name: 'Chart js', state: 'charts' },
        {
          name: 'eChart',
          type: 'dropDown',
          state: 'chart',
          sub: [
            { name: 'Pie', state: 'chart/pie' },
            { name: 'Bar', state: 'chart/bar' },
            { name: 'Radar', state: 'chart/radar' },
            { name: "Heatmap", state: "chart/heatmap" },
          ]
        }
      ]
    },
    {
      name: 'Page Layouts',
      type: 'dropDown',
      icon: 'view_carousel',
      sub: [
        { name: 'Left sidebar card', state: 'page-layouts/left-sidebar-card' },
        { name: 'Right sidebar card', state: 'page-layouts/right-sidebar-card' },
        { name: 'Full width card', state: 'page-layouts/full-width-card' },
        { name: 'Full width card tab', state: 'page-layouts/full-width-card-tab' },
      ]
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      icon: 'view_carousel',
      sub: [
        { name: 'SIGNUP', state: 'session-pages/signup' },
        { name: 'Signup 2', state: 'session-pages/signup2' },
        { name: 'Signup 3', state: 'session-pages/signup3' },
        { name: 'SIGNIN', state: 'session-pages/signin' },
        { name: 'Signin 2', state: 'session-pages/signin2' },
        { name: 'Signin 3', state: 'session-pages/signin3' },
        { name: 'FORGOT', state: 'session-pages/forgot-password' },
        { name: 'LOCKSCREEN', state: 'session-pages/lockscreen' },
        { name: 'NOTFOUND', state: 'session-pages/404' },
        { name: 'ERROR', state: 'session-pages/error' }
      ]
    },
    {
      name: 'Utilities',
      type: 'dropDown',
      icon: 'format_list_bulleted',
      sub: [
        { name: 'Color', state: 'utilities/color' },
        { name: 'Typography', state: 'utilities/typography' }
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      icon: 'blur_on',
      sub: [
        { name: 'GALLERY', state: 'others/gallery' },
        { name: 'PRICINGS', state: 'others/pricing' },
        { name: 'USERS', state: 'others/users' },
        { name: 'BLANK', state: 'others/blank' }
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      icon: 'store',
      state: 'icons'
    },
    {
      name: 'Multi Level',
      type: 'dropDown',
      icon: 'format_align_center',
      sub: [
        { name: 'Level Two', state: 'fake-4' },
        {
          name: 'Level Two',
          type: 'dropDown',
          state: 'fake-1',
          sub: [
            { name: 'Level Three', state: 'fake-2' },
            { 
              name: 'Level Three', 
              type: 'dropDown',
              state: 'fake-3',
              sub: [
                { name: 'Level Four', state: 'fake-3' },
                { 
                  name: 'Level Four', 
                  type: 'dropDown',
                  state: 'fake-4',
                  sub: [
                    { name: 'Level Five', state: 'fake-3' },
                    { name: 'Level Five', type: 'link' }
                  ]
                }
              ]
            }
          ]
        },
        { name: 'Level Two', state: 'fake-5' }
      ]
    },
    {
      name: 'DOC',
      type: 'extLink',
      icon: 'library_books',
      state: 'https://github.com/andreizav/Ltemplate#readme'
    }
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() { }

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
      default:
        this.menuItems.next(this.plainMenu);
    }
  }
}

```

---

#### 📄 `src/app/shared/services/route-parts.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot, Params, PRIMARY_OUTLET } from "@angular/router";

interface IRoutePart {
  title: string,
  breadcrumb: string,
  params?: Params,
  url: string,
  urlSegments: any[]
}

@Injectable({
  providedIn: 'root'
})
export class RoutePartsService {
  public routeParts: IRoutePart[];
  constructor(private router: Router) {}

  ngOnInit() {
  }
  generateRouteParts(snapshot: ActivatedRouteSnapshot): IRoutePart[] {
    var routeParts = <IRoutePart[]>[];
    if (snapshot) {
      if (snapshot.firstChild) {
        routeParts = routeParts.concat(this.generateRouteParts(snapshot.firstChild));
      }
      if (snapshot.data['title'] && snapshot.url.length) {
        // console.log(snapshot.data['title'], snapshot.url)
        routeParts.push({
          title: snapshot.data['title'], 
          breadcrumb: snapshot.data['breadcrumb'], 
          url: snapshot.url[0].path,
          urlSegments: snapshot.url,
          params: snapshot.params
        });
      }
    }
    return routeParts;
  }
}
```

---

#### 📄 `src/app/shared/services/theme.service.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './theme.service';
import { THEME_IDS } from '../config/theme-colors';

describe('ThemeService', () => {
  let service: ThemeService;
  let overlayContainer: OverlayContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, OverlayContainer]
    });

    service = TestBed.inject(ThemeService);
    overlayContainer = TestBed.inject(OverlayContainer);
  });

  afterEach(() => {
    const overlayElement = overlayContainer.getContainerElement();
    overlayElement.className = 'cdk-overlay-container';
    document.documentElement.className = '';
    document.body.className = '';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return available themes list', () => {
    const themes = service.getAvailableThemes();
    expect(themes).toBeDefined();
    expect(themes.length).toBeGreaterThan(0);
    expect(themes.some(t => t.id === THEME_IDS.NAVY_LIGHT)).toBe(true);
  });

  it('should return default active theme', () => {
    const active = service.getActiveTheme();
    expect(active).toBeDefined();
    expect(active.id).toBe(THEME_IDS.NAVY_LIGHT);
  });

  it('should switch active theme by valid theme id', () => {
    const success = service.setActiveThemeById(THEME_IDS.NAVY_DARK);
    expect(success).toBe(true);
    expect(service.getActiveTheme().id).toBe(THEME_IDS.NAVY_DARK);
    expect(document.body.classList.contains(THEME_IDS.NAVY_DARK)).toBe(true);
  });

  it('should return false when setting invalid theme id', () => {
    const success = service.setActiveThemeById('non-existent-theme-xyz');
    expect(success).toBe(false);
  });

  it('should create and add a custom theme', () => {
    const customTheme = service.addCustomTheme('Sunset Gold', 'light');
    expect(customTheme).toBeDefined();
    expect(customTheme.name).toBe('Sunset Gold');
    expect(service.getAvailableThemes().some(t => t.id === customTheme.id)).toBe(true);
  });

  it('should toggle dark mode class on document and body elements', () => {
    service.setDarkMode(true);
    expect(document.documentElement.classList.contains('Ltemplate-navy-dark')).toBe(true);
    expect(document.body.classList.contains('Ltemplate-navy-dark')).toBe(true);

    service.setDarkMode(false);
    expect(document.documentElement.classList.contains('Ltemplate-navy-dark')).toBe(false);
    expect(document.body.classList.contains('Ltemplate-navy-dark')).toBe(false);
  });

  it('should expose reactive signals for activeTheme, isDarkMode, and currentThemeId', () => {
    expect(service.activeTheme().id).toBe(THEME_IDS.NAVY_LIGHT);
    expect(service.isDarkMode()).toBe(false);
    expect(service.currentThemeId()).toBe(THEME_IDS.NAVY_LIGHT);

    service.setActiveThemeById(THEME_IDS.NAVY_DARK);
    expect(service.activeTheme().id).toBe(THEME_IDS.NAVY_DARK);
    expect(service.isDarkMode()).toBe(true);
    expect(service.currentThemeId()).toBe(THEME_IDS.NAVY_DARK);
  });
});

```

---

#### 📄 `src/app/shared/services/theme.service.ts`

```typescript
import { Injectable, Inject, Renderer2, RendererFactory2, DOCUMENT, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { OverlayContainer } from '@angular/cdk/overlay';

import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeConfig, ThemeMode, generateThemeConfig, THEME_IDS } from '../config/theme-colors';
import { config } from 'config';

/**
 * Service responsible for managing application themes
 * Uses theme configurations from ../config/theme-colors.ts
 * All color values are defined in CSS in src/assets/styles/scss/_color-tokens.scss
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private documentElement: HTMLElement;
  private bodyElement: HTMLElement;

  // Initialize themes from the central configuration
  private themeConfig = generateThemeConfig();
  
  // Available themes can be expanded by the app
  private availableThemes: ThemeConfig[] = Object.values(this.themeConfig);
  
  // Signals state
  private _activeTheme = signal<ThemeConfig>(this.themeConfig[THEME_IDS.NAVY_LIGHT]);
  public readonly activeTheme = this._activeTheme.asReadonly();
  public readonly isDarkMode = computed(() => this._activeTheme().mode === 'dark');
  public readonly currentThemeId = computed(() => this._activeTheme().id);
  public readonly availableThemesSignal = signal<ThemeConfig[]>(Object.values(this.themeConfig));

  // Observable bridge
  private activeThemeSubject = new BehaviorSubject<ThemeConfig>(this.themeConfig[THEME_IDS.NAVY_LIGHT]);
  public readonly activeThemeObservable$ = toObservable(this._activeTheme);
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    private overlayContainer: OverlayContainer
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.documentElement = document.documentElement;
    this.bodyElement = document.body;
  }
  
  /**
   * Get all available themes
   */
  getAvailableThemes(): ThemeConfig[] {
    return [...this.availableThemes];
  }
  
  /**
   * Get current active theme
   */
  getActiveTheme(): ThemeConfig {
    return this._activeTheme();
  }
  
  /**
   * Get active theme as observable
   */
  activeTheme$(): Observable<ThemeConfig> {
    return this.activeThemeObservable$;
  }
  
  /**
   * Add a new theme to available themes
   */
  addTheme(theme: ThemeConfig): void {
    // Replace existing theme with same ID or add new one
    const existingIndex = this.availableThemes.findIndex(t => t.id === theme.id);
    if (existingIndex >= 0) {
      this.availableThemes[existingIndex] = theme;
    } else {
      this.availableThemes.push(theme);
    }
    this.availableThemesSignal.set([...this.availableThemes]);
  }
  
  /**
   * Set active theme by ID
   */
  setActiveThemeById(themeId: string): boolean {
    const theme = this.availableThemes.find(t => t.id === themeId);
    if (theme) {
      this.setActiveTheme(theme);
      return true;
    }
    return false;
  }
  
  /**
   * Set active theme and apply it
   */
  private setActiveTheme(theme: ThemeConfig): void {
    const overlayContainerElement = this.overlayContainer.getContainerElement();

    // Remove all existing theme classes
    this.availableThemes.forEach(t => {
      this.renderer.removeClass(this.documentElement, t.id);
      this.renderer.removeClass(this.bodyElement, t.id);
      this.renderer.removeClass(overlayContainerElement, t.id);
    });
    
    // Add active theme class
    this.renderer.addClass(this.documentElement, theme.id);
    this.renderer.addClass(this.bodyElement, theme.id);
    this.renderer.addClass(overlayContainerElement, theme.id);
    
    // Add/remove dark theme class
    if (theme.mode === 'dark') {
      this.renderer.addClass(this.documentElement, 'Ltemplate-navy-dark');
      this.renderer.addClass(this.bodyElement, 'Ltemplate-navy-dark');
      this.renderer.addClass(overlayContainerElement, 'Ltemplate-navy-dark');
    } else {
      this.renderer.removeClass(this.documentElement, 'Ltemplate-navy-dark');
      this.renderer.removeClass(this.bodyElement, 'Ltemplate-navy-dark');
      this.renderer.removeClass(overlayContainerElement, 'Ltemplate-navy-dark');
    }
    
    // Save to localStorage
    try {
      localStorage.setItem(config.themeLocalStorageKey, theme.id);
    } catch (e) {
      console.warn('Error saving theme to localStorage:', e);
    }
    
    // Update signal and subject
    this._activeTheme.set(theme);
    this.activeThemeSubject.next(theme);
  }
  
  /**
   * Create a custom theme
   */
  addCustomTheme(name: string, mode: ThemeMode = 'light'): ThemeConfig {
    // Generate a unique ID
    const id = `custom-${name.toLowerCase().replace(/\s+/g, '-')}-${mode}`;
    
    // Create the theme object
    const customTheme: ThemeConfig = {
      id,
      name,
      mode
    };
    
    // Add to available themes
    this.addTheme(customTheme);
    
    // Return the new theme
    return customTheme;
  }
  
  /**
   * Create a dark variant of a theme
   */
  createDarkVariant(theme: ThemeConfig): ThemeConfig {
    if (theme.mode === 'dark') {
      return theme; // Already a dark theme
    }
    
    // Create dark variant
    const darkVariant: ThemeConfig = {
      id: `${theme.id}-dark`,
      name: `${theme.name} Dark`,
      mode: 'dark'
    };
    
    // Add to available themes
    this.addTheme(darkVariant);
    
    return darkVariant;
  }
  
  /**
   * Set dark mode directly
   */
  setDarkMode(isDark: boolean): void {
    const overlayContainerElement = this.overlayContainer.getContainerElement();
    if (isDark) {
      this.renderer.addClass(this.documentElement, 'Ltemplate-navy-dark');  
      this.renderer.addClass(this.bodyElement, 'Ltemplate-navy-dark');
      this.renderer.addClass(overlayContainerElement, 'Ltemplate-navy-dark');
    } else {
      this.renderer.removeClass(this.documentElement, 'Ltemplate-navy-dark');
      this.renderer.removeClass(this.bodyElement, 'Ltemplate-navy-dark');
      this.renderer.removeClass(overlayContainerElement, 'Ltemplate-navy-dark');
    }
  }
}

```

---

#### 📄 `src/app/shared/services/ui-lib-icon.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UILibIconService {

  iconList = [
    { 'name': 'eg_monitor', 'fileName': 'monitor.svg' },
    { 'name': 'eg_money', 'fileName': 'money.svg' },
    { 'name': 'eg_home_security', 'fileName': 'home_security.svg' },
    { 'name': 'eg_paper_plane', 'fileName': 'paper_plane.svg' },
    { 'name': 'eg_menu', 'fileName': 'menu.svg' },
    { 'name': 'eg_home', 'fileName': 'home.svg' },
    { 'name': 'eg_documents', 'fileName': 'documents.svg' },
    { 'name': 'eg_edit', 'fileName': 'edit.svg' },
    { 'name': 'eg_boss', 'fileName': 'boss.svg' },
    { 'name': 'eg_partnership', 'fileName': 'partnership.svg' },
    { 'name': 'eg_partnership_1', 'fileName': 'partnership_1.svg' },
    { 'name': 'eg_success', 'fileName': 'success.svg' },
    { 'name': 'eg_rocket_launch', 'fileName': 'rocket_launch.svg' },
    { 'name': 'eg_rocket', 'fileName': 'rocket.svg' },
    { 'name': 'eg_business_and_trade', 'fileName': 'business_and_trade.svg' },
    { 'name': 'eg_enterprise', 'fileName': 'enterprise.svg' },
    { 'name': 'eg_cloud_computing', 'fileName': 'cloud_computing.svg' },
    { 'name': 'eg_cloud_computing_1', 'fileName': 'cloud_computing_1.svg' },
    { 'name': 'eg_cloud_computing_2', 'fileName': 'cloud_computing_2.svg' },
    { 'name': 'eg_send', 'fileName': 'send.svg' },
    { 'name': 'eg_table', 'fileName': 'table.svg' },
    { 'name': 'eg_notification', 'fileName': 'notification.svg' },
    { 'name': 'eg_person', 'fileName': 'person.svg' },
    { 'name': 'eg_menu_1', 'fileName': 'menu_1.svg' },
    { 'name': 'eg_delete', 'fileName': 'delete.svg' },
    { 'name': 'eg_close', 'fileName': 'close.svg' },
    { 'name': 'eg_magnifying_glass', 'fileName': 'magnifying_glass.svg' },
    { 'name': 'eg_settings', 'fileName': 'settings.svg' },
    { 'name': 'eg_twitter', 'fileName': 'twitter.svg' },
    { 'name': 'eg_facebook', 'fileName': 'facebook.svg' },
    { 'name': 'eg_linkedin', 'fileName': 'linkedin.svg' },
    { 'name': 'eg_pie_chart', 'fileName': 'pie_chart.svg' },
    { 'name': 'eg_paint_palette', 'fileName': 'paint_palette.svg' },
    { 'name': 'eg_server', 'fileName': 'server.svg' },
    { 'name': 'eg_database', 'fileName': 'database.svg' },
    { 'name': 'eg_database_1', 'fileName': 'database_1.svg' },
    { 'name': 'eg_creativity', 'fileName': 'creativity.svg' },
    { 'name': 'eg_list_text', 'fileName': 'list_text.svg' },
    { 'name': 'eg_list', 'fileName': 'list.svg' },
    { 'name': 'eg_shopping_list', 'fileName': 'shopping_list.svg' },
    { 'name': 'eg_checklist', 'fileName': 'checklist.svg' },
    { 'name': 'eg_bullet_list', 'fileName': 'bullet_list.svg' },
    { 'name': 'eg_shopping_cart', 'fileName': 'shopping_cart.svg' },
    { 'name': 'eg_add', 'fileName': 'add.svg' },
    { 'name': 'eg_shopping_cart_1', 'fileName': 'shopping_cart_1.svg' },
    { 'name': 'eg_shopping_basket', 'fileName': 'shopping_basket.svg' },
    { 'name': 'eg_edit_table', 'fileName': 'edit_table.svg' },
    { 'name': 'eg_casino_chips', 'fileName': 'casino_chips.svg' },
    { 'name': 'eg_add_1', 'fileName': 'add_1.svg' },
    { 'name': 'eg_chat', 'fileName': 'chat.svg' },
    { 'name': 'eg_chat_box', 'fileName': 'chat_box.svg' },
    { 'name': 'eg_chat_1', 'fileName': 'chat_1.svg' },
    { 'name': 'eg_agreement', 'fileName': 'agreement.svg' },
    { 'name': 'eg_box', 'fileName': 'box.svg' },
    { 'name': 'eg_link_1', 'fileName': 'link_1.svg' },
    { 'name': 'eg_link', 'fileName': 'link.svg' },
    { 'name': 'eg_message', 'fileName': 'message.svg' },
    { 'name': 'eg_inbox', 'fileName': 'inbox.svg' },
    { 'name': 'eg_inbox_1', 'fileName': 'inbox_1.svg' },
    { 'name': 'eg_invoices', 'fileName': 'invoices.svg' },
    { 'name': 'eg_receipt', 'fileName': 'receipt.svg' },
    { 'name': 'eg_search', 'fileName': 'search.svg' },
    { 'name': 'eg_date', 'fileName': 'date.svg' },
    { 'name': 'eg_building', 'fileName': 'building.svg' },
    { 'name': 'eg_block', 'fileName': 'block.svg' },
    { 'name': 'eg_users', 'fileName': 'users.svg' },
    { 'name': 'eg_user', 'fileName': 'user.svg' },
    { 'name': 'eg_map', 'fileName': 'map.svg' },
    { 'name': 'eg_location', 'fileName': 'location.svg' },
    { 'name': 'eg_drag', 'fileName': 'drag.svg' },
    {
      'name': 'eg_business_card_of_a_man_with_contact_info',
      'fileName': 'business_card_of_a_man_with_contact_info.svg'
    },
    { 'name': 'eg_help', 'fileName': 'help.svg' },
    { 'name': 'eg_list_1', 'fileName': 'list_1.svg' },
    { 'name': 'eg_facebook', 'fileName': 'facebook.svg' },
    { 'name': 'eg_meta', 'fileName': 'meta.svg' },
    { 'name': 'eg_google', 'fileName': 'google.svg' },
    { 'name': 'eg_apple', 'fileName': 'apple.svg' }
  ]

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
  }

  init() {
    this.iconList.forEach(i => {
      this.matIconRegistry.addSvgIcon(
        i.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/svg-icons/${i.fileName}`)
      );
    });
  }
}

```

---

#### 📄 `src/app/shared/shared.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// SERVICES
import { ThemeService } from './services/theme.service';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';
import { AuthGuard } from './guards/auth.guard';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    ThemeService,
    NavigationService,
    RoutePartsService,
    AuthGuard,
    AppConfirmService,
    AppLoaderService
  ]
})
export class SharedModule { }

```

---

#### 📄 `src/app/shared/utils/color-utils.ts`

```typescript
/**
 * Color utility functions for theme generation
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert a hex color to RGB
 */
export function hexToRgb(hex: string): RGB {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(rgb: RGB): string {
  return '#' + 
    ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
      .toString(16)
      .slice(1);
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(rgb: RGB): HSL {
  // Convert RGB to percentages
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  // Find min and max values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Initial HSL values
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  // Calculate saturation and hue if not grayscale
  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / (max - min) + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / (max - min) + 2;
        break;
      case b:
        h = (r - g) / (max - min) + 4;
        break;
    }
    
    h = h * 60;
  }

  return { h, s, l };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  // No saturation means grayscale
  if (s === 0) {
    const value = Math.round(l * 255);
    return { r: value, g: value, b: value };
  }

  // Helper functions
  const hueToRgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  const r = hueToRgb(p, q, (h / 360) + 1/3);
  const g = hueToRgb(p, q, h / 360);
  const b = hueToRgb(p, q, (h / 360) - 1/3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Generate a color palette from a base color
 * Returns an object with 10 colors, from 50 to 900
 */
export function generateColorPalette(baseColor: string): Record<string, string> {
  // Convert base color to HSL
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb);

  // Create palette with different lightness values
  const palette: Record<string, string> = {};
  
  // Generate lighter shades (50-400)
  const lightShades = [
    { name: '50', lightness: 0.95 },
    { name: '100', lightness: 0.90 },
    { name: '200', lightness: 0.80 },
    { name: '300', lightness: 0.70 },
    { name: '400', lightness: 0.60 }
  ];

  // Generate darker shades (600-900)
  const darkShades = [
    { name: '600', lightness: 0.40 },
    { name: '700', lightness: 0.30 },
    { name: '800', lightness: 0.20 },
    { name: '900', lightness: 0.10 }
  ];

  // Set the original color as 500
  palette['500'] = baseColor;
  
  // Generate lighter shades
  lightShades.forEach(shade => {
    const lightHsl = { ...hsl, l: shade.lightness };
    const lightRgb = hslToRgb(lightHsl);
    palette[shade.name] = rgbToHex(lightRgb);
  });
  
  // Generate darker shades
  darkShades.forEach(shade => {
    const darkHsl = { ...hsl, l: shade.lightness };
    const darkRgb = hslToRgb(darkHsl);
    palette[shade.name] = rgbToHex(darkRgb);
  });

  return palette;
}

/**
 * Generate a dark mode variant of a color palette
 */
export function generateDarkVariant(baseColor: string): string {
  // Get the base HSL
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb);
  
  // For dark mode, we typically reduce saturation and adjust lightness
  const darkHsl = { 
    h: hsl.h, 
    s: Math.max(hsl.s - 0.1, 0), // Reduce saturation slightly
    l: Math.min(hsl.l + 0.2, 0.8) // Increase lightness for visibility
  };
  
  const darkRgb = hslToRgb(darkHsl);
  return rgbToHex(darkRgb);
}

/**
 * Convert a color to CSS variable RGB format
 */
export function colorToRgbValues(color: string): string {
  const rgb = hexToRgb(color);
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

/**
 * Generate CSS variables for a theme
 */
export function generateThemeCssVariables(
  primaryColor: string,
  accentColor: string,
  warnColor: string
): Record<string, string> {
  // Generate the palettes
  const primaryPalette = generateColorPalette(primaryColor);
  const accentPalette = generateColorPalette(accentColor);
  const warnPalette = generateColorPalette(warnColor);
  
  // Create CSS variables object
  const cssVars: Record<string, string> = {};
  
  // Add primary variables
  Object.entries(primaryPalette).forEach(([shade, color]) => {
    cssVars[`--primary-${shade}`] = colorToRgbValues(color);
  });
  
  // Add accent variables
  Object.entries(accentPalette).forEach(([shade, color]) => {
    cssVars[`--accent-${shade}`] = colorToRgbValues(color);
  });
  
  // Add warn variables
  Object.entries(warnPalette).forEach(([shade, color]) => {
    cssVars[`--warn-${shade}`] = colorToRgbValues(color);
  });
  
  return cssVars;
} 
```

---

#### 📄 `src/app/views/app-chats/app-chats.component.html`

```html
<div class="sm:mx-8">
  <mat-card class="p-0">
    <mat-sidenav-container class="chat-container">
      <!-- Left sidebar -->
      <mat-sidenav class="chat-sidenav" [opened]="isSidenavOpen" mode="side">
        <app-chat-left-sidenav></app-chat-left-sidenav>
      </mat-sidenav>

      <!-- Right side -->
      <div class="chats-wrap">
        <!-- Right side topbar -->
        <app-chat-contents [matSidenav]="sideNav"></app-chat-contents>

      </div>
    </mat-sidenav-container>
  </mat-card>
</div>
```

---

#### 📄 `src/app/views/app-chats/app-chats.component.ts`

```typescript
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';
import { ChatService } from './chat.service';

@Component({
    selector: 'app-chats',
    templateUrl: './app-chats.component.html',
    styleUrls: ['./app-chats.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppChatsComponent implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  @ViewChild(MatSidenav) public sideNav: MatSidenav;

  activeChatUser = {
    name: 'Gevorg Spartak',
    photo: 'assets/images/face-2.jpg',
    isOnline: true,
    lastMsg: 'Hello!'
  };
  user;


  constructor(
    private breakpointObserver: BreakpointObserver,
    public chatService: ChatService
  ) {
    // console.log(chatService.chats)
    this.user = chatService.user
  }

  ngOnInit() {
    this.chatSideBarInit();
  }
  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe();
    }
  }
  changeActiveUser(user) {
    this.activeChatUser = user;
  }
  updateSidenav() {
    var self = this;
    setTimeout(() => {
      self.isSidenavOpen = !self.isMobile;
      self.sideNav.mode = self.isMobile ? 'over' : 'side';
    });
  }
  chatSideBarInit() {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 959px)');
    this.updateSidenav();

    this.screenSizeWatcher = this.breakpointObserver.observe('(max-width: 959px)').subscribe(result => {
      this.isMobile = result.matches;
      this.updateSidenav();
    });
  }
}

```

---

#### 📄 `src/app/views/app-chats/app-chats.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module'
import { AppChatsComponent } from './app-chats.component';
import { ChatsRoutes } from './app-chats.routing';
import { ChatLeftSidenavComponent } from './chat-left-sidenav/chat-left-sidenav.component';
import { ChatContentsComponent } from './chat-contents/chat-contents.component';
import { ChatService } from './chat.service';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    PerfectScrollbarModule,
    SharedPipesModule,
    RouterModule.forChild(ChatsRoutes)
  ],
  declarations: [AppChatsComponent, ChatLeftSidenavComponent, ChatContentsComponent],
  providers: [ChatService]
})
export class AppChatsModule { }
```

---

#### 📄 `src/app/views/app-chats/app-chats.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { AppChatsComponent } from './app-chats.component';

export const ChatsRoutes: Routes = [
  { path: '', component: AppChatsComponent, data: { title: 'Chat' } }
];

```

---

#### 📄 `src/app/views/app-chats/chat-contents/chat-contents.component.html`

```html
<mat-toolbar color="primary" class="chat-toolbar">
    <!-- sidebar toggle button -->
    <button 
    mat-icon-button
    [style.alignSelf]="'center'"
    class="mr-4 rtl:ml-4" 
    (click)="matSidenav.toggle()"><mat-icon>short_text</mat-icon>
    </button>
    
    <!-- Selected active user -->
    <div class="active-chat-user flex items-center justify-start" *ngIf="activeContact.id">

      <a 
        [ngClass]="{online: activeContact.status === 'online'}" 
        class="toolbar-avatar mr-4 rtl:ml-4"
      >
        <img [src]="activeContact.avatar" alt="">
        <span class="status-dot"></span>
      </a>
      <div class="flex flex-col">
        <h6 class="m-0 font-normal fz-1">{{activeContact.name}}</h6>
      </div>
    </div>

    <!-- Right side top menu -->
    <span class="flex-grow"></span>
    <button 
    [style.alignSelf]="'center'" 
    mat-icon-button 
    [matMenuTriggerFor]="toolbarDDMenu" 
    class="topbar-button-right hidden-on-open">
        <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #toolbarDDMenu="matMenu">
        <button mat-menu-item><mat-icon>account_circle</mat-icon>Contact info</button>
        <button mat-menu-item><mat-icon>volume_mute</mat-icon>Mute</button>
        <button mat-menu-item><mat-icon>delete</mat-icon>Clear chat</button>
    </mat-menu>
</mat-toolbar>

<div *ngIf="chatCollection && !chatService.collectionLoading">
    <!-- Main chat body -->
    <div class="conversations-hold" [perfectScrollbar]>

      <!-- single chat item -->
      <div class="single-conversation flex flex-row" 
        *ngFor="let chat of chatCollection?.chats"
        [ngClass]="{sender: chat.contactId === activeContact.id, me: chat.contactId !== activeContact.id}"
      >

        <a 
          *ngIf="chat.contactId !== activeContact.id" 
          href="" 
          class="toolbar-avatar"
          [ngClass]="{online: user.status === 'online'}"
        >
          <img [src]="user?.avatar" [alt]="user?.name">
          <span class="status-dot"></span>
        </a>

        <a 
          *ngIf="chat.contactId === activeContact.id" 
          href="" 
          class="toolbar-avatar"
          [ngClass]="{online: activeContact.status === 'online'}"
        >
          <img [src]="activeContact?.avatar" [alt]="activeContact?.name">
          <span class="status-dot"></span>
        </a>

        <div>
          <h5 *ngIf="chat.contactId === activeContact.id" class="chat-username text-secondary">{{activeContact?.name}}</h5>
          <h5 *ngIf="chat.contactId !== activeContact.id" class="chat-username text-secondary">{{user?.name}}</h5>

          <div class="conversation-msg">
            {{chat.text}}
          </div>
          <p class="chat-date text-secondary">{{chat.time | relativeTime}}</p>
        </div>
      </div>

    </div>
    <mat-divider></mat-divider>

    <!-- Input box and send button -->
    <div class="chat-input-actions">
      <form 
        #msgForm="ngForm" 
        class="inputForm w-full" 
        (ngSubmit)="sendMessage($event)" 
        (keydown.enter)="sendMessage($event)"
      >
        <mat-form-field class="full-width mr-4 rtl:ml-4">
          <textarea
          matInput
          required
          #msgInput
          ngModel
          placeholder="Type your message"
          name="message"
          class="inputText"
          value=""></textarea>
        </mat-form-field>
        <div class="flex w-full justify-end">
          <button mat-flat-button color="primary" type="submit"><mat-icon>send</mat-icon> Send</button>
        </div>
      </form>
    </div>
</div>

<div class="chat-intro" *ngIf="chatService.collectionLoading">
  <div class="chat-loader">
    <div class="spinner">
      <div class="double-bounce1 mat-bg-accent"></div>
      <div class="double-bounce2 mat-bg-primary"></div>
    </div>
  </div>
</div>

<div class="chat-intro !flex flex-col justify-center items-center" 
*ngIf="!chatCollection && !chatService.collectionLoading">
  <mat-card 
  class="text-center !flex flex-row justify-center items-center rounded-full h-[220px] w-[220px]">
    <mat-icon 
    color="primary"
    class="text-8xl !h-[90px] !w-[90px]">chat</mat-icon>
  </mat-card>
  <h6 class="text-secondary text-lg">Select a contact!</h6>
</div>

```

---

#### 📄 `src/app/views/app-chats/chat-contents/chat-contents.component.ts`

```typescript
import { Component, OnInit, ViewChild, ViewChildren, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { PerfectScrollbarDirective } from "app/shared/components/perfect-scrollbar";
import { ChatService } from "../chat.service";
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Chat, ChatCollection, User } from "app/shared/models/chat.model";

@Component({
    selector: "app-chat-contents",
    templateUrl: "./chat-contents.component.html",
    styleUrls: ["./chat-contents.component.scss"],
    standalone: false
})
export class ChatContentsComponent implements OnInit, OnDestroy {
  public user: User = new User();
  public activeContact: User = new User();
  public chatCollection: ChatCollection;

  userUpdateSub: Subscription;
  chatUpdateSub: Subscription;
  chatSelectSub: Subscription;

  @Input('matSidenav') matSidenav;
  @ViewChild(PerfectScrollbarDirective) psContainer: PerfectScrollbarDirective;

  @ViewChildren("msgInput") msgInput;
  @ViewChild("msgForm") msgForm: NgForm;

  constructor(
    public chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Listen for user update
    // this.userUpdateSub = this.chatService.onUserUpdated.subscribe(user => {
    //   this.user = user;
    //   // console.log(user)
    //   this.cdr.markForCheck();
    // });
    this.user = this.chatService.user;
    
    // Listen for contact change
    this.chatSelectSub = this.chatService.onChatSelected.subscribe(res => {
      if (res) {
        this.chatCollection = res.chatCollection;
        this.activeContact = res.contact;
        this.initMsgForm();
        this.cdr.markForCheck();
      }
    });

    // Listen for chat update
    this.chatUpdateSub = this.chatService.onChatsUpdated.subscribe(chat => {
      this.chatCollection.chats.push(chat);
      this.scrollToBottom();

      this.cdr.markForCheck();
    })
  }
  
  ngOnDestroy() {
    if( this.userUpdateSub ) this.userUpdateSub.unsubscribe();
    if( this.chatSelectSub ) this.chatSelectSub.unsubscribe();
    if( this.chatUpdateSub ) this.chatUpdateSub.unsubscribe();
  }

  sendMessage(e) {
    // console.log(this.msgForm.form.value.message)
    if(!this.msgForm.form.value.message || !this.msgForm.form.value.message.trim().length) {
      return;
    }
    const chat: Chat = {
      contactId: this.chatService.user.id,
      text: this.msgForm.form.value.message,
      time: new Date().toISOString()
    };

    this.chatCollection.chats.push(chat);
    this.chatService
      .updateChats(this.chatCollection.id, [...this.chatCollection.chats])
      .subscribe(res => {
        this.initMsgForm();
        this.cdr.markForCheck();
      });
    
    // Only for demo purpose
    this.chatService.autoReply({
      contactId: this.activeContact.id,
      text: `Hi, I\'m ${this.activeContact.name}. Your imaginary friend.`,
      time: new Date().toISOString()
    })
    
  }

  initMsgForm() {
    setTimeout(() => {
      this.msgForm && this.msgForm.reset();
      this.msgInput && this.msgInput.first && this.msgInput.first.nativeElement.focus();
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.psContainer && this.psContainer.update();
      this.psContainer && this.psContainer.scrollToBottom(0, 400);
    })
  }
}

```

---

#### 📄 `src/app/views/app-chats/chat-left-sidenav/chat-left-sidenav.component.html`

```html
<!-- Left side topbar -->
<mat-toolbar color="primary" class="chat-sidebar-toolbar">
  <a href="" class="toolbar-avatar online">
    <img [src]="currentUser.avatar" alt="">
    <span class="status-dot mat-bg-primary"></span>
  </a>
  <h6 class="m-0 pl-4 font-normal fz-1">{{currentUser.name}}</h6>
</mat-toolbar>
<div [perfectScrollbar] class="chat-sidebar-scroll">
  <!-- Left side contact list -->
  <div class="inbox-nav-list" role="list">
    <div class="flex p-4 items-center cursor-pointer hover:bg-slate-100" *ngFor="let info of currentUser?.chatInfo"
      (click)="getChatByContact(info.contactId)">
      <a mat-list-avatar [ngClass]="{online: (contacts | getValueByKey:info.contactId:'status') === 'online'}"
        class="toolbar-avatar mr-2 rtl:ml-2">
        <img [src]="contacts | getValueByKey:info.contactId:'avatar'" alt="">
        <span class="status-dot mat-bg-primary"></span>
      </a>
      <div>
        <h6 matLine class="mb-1">{{info.contactName}}</h6>
        <p matLine class="text-muted mb-0">{{info.lastChatTime | date}}</p>
      </div>
    </div>

  </div>
  <mat-divider></mat-divider>
  <div class="inbox-nav-list" role="list">
    <div class="flex p-4 items-center cursor-pointer hover:bg-slate-100" *ngFor="let contact of contacts" (click)="getChatByContact(contact.id)">
      <a mat-list-avatar [ngClass]="{online: contact.status === 'online'}" class="toolbar-avatar mr-2 rtl:ml-2">
        <img [src]="contact.avatar" alt="">
        <span class="status-dot"></span>
      </a>
      <h6 class="mb-0" matLine>{{contact.name}}</h6>
      <!-- <p matLine class="text-muted">{{contact.lastChatTime  | date}}</p> -->
    </div>

  </div>
</div>
```

---

#### 📄 `src/app/views/app-chats/chat-left-sidenav/chat-left-sidenav.component.ts`

```typescript
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ChatService } from "../chat.service";
import { Subscription } from "rxjs";
import { User } from "app/shared/models/chat.model";

@Component({
    selector: "app-chat-left-sidenav",
    templateUrl: "./chat-left-sidenav.component.html",
    styleUrls: ["./chat-left-sidenav.component.scss"],
    standalone: false
})
export class ChatLeftSidenavComponent implements OnInit {
  userUpdateSub: Subscription;
  loadDataSub: Subscription;
  
  isSidenavOpen = true;

  currentUser: User = new User();
  contacts: any[];

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.chatService.onChatsUpdated
    //   .subscribe(updatedChats => {
    //     this.chats = updatedChats;
    //   });

    this.userUpdateSub = this.chatService.onUserUpdated
      .subscribe(updatedUser => {
        this.currentUser = updatedUser;
      });

    this.loadDataSub = this.chatService.loadChatData()
      .subscribe(res => {
        this.currentUser = this.chatService.user;
        // this.chats = this.chatService.chats;
        this.contacts = this.chatService.contacts;
        // this.chatService.onUserUpdated.next(this.chatService.user)
        this.cdr.markForCheck();
      });
  }
  ngOnDestroy() {
    if( this.userUpdateSub ) this.userUpdateSub.unsubscribe();
    if( this.loadDataSub ) this.loadDataSub.unsubscribe();
  }

  getChatByContact(contactId) { 
    this.chatService.getChatByContact(contactId)
      .subscribe(res => {
        // console.log('from sub',res);
      }, err => {
        console.log(err)
      })
  }
  
}

```

---

#### 📄 `src/app/views/app-chats/chat.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ChatDB } from 'app/shared/inmemory-db/chat-db';
import { Chat, ChatCollection, User } from 'app/shared/models/chat.model';


// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class ChatService {
  public contacts: User[];
  public chats: ChatCollection[];
  public user: User;
  public collectionLoading: boolean;

  onContactSelected = new BehaviorSubject<any>(null);
  onUserUpdated = new Subject<User>();

  onChatSelected = new BehaviorSubject<any>(null);
  onChatsUpdated = new Subject<any>();

  constructor(private http: HttpClient) {
    // console.log('from service');
    // this.loadChatData()
  }

  loadChatData(): Observable<any> {
    return combineLatest(this.getAllContacts(), this.getAllChats(), this.getCurrentUser(), (contacts, chats, user) => {
      this.contacts = contacts;
      this.chats = chats;
      this.user = user;
      // console.log('next.willCall', user)
      this.onUserUpdated.next(user);
      // console.log('next.called')
      // console.log(
      //   "contacts:",
      //   contacts,
      //   "\n chats:",
      //   chats,
      //   "\n currUser:",
      //   user
      // );
    });
  }
  public getChatByContact(contactId): Observable<ChatCollection> {
    const chatInfo = this.user.chatInfo.find((chat) => chat.contactId === contactId);
    this.collectionLoading = true;

    if (!chatInfo) {
      return this.createChatCollection(contactId)
      .pipe(switchMap((chatColl) => {
        return this.getChatByContact(contactId);
      }));
    }

    return this.getAllChats().pipe(
      switchMap((chats) => {
        const chatCollection = chats.find((chat) => chat.id === chatInfo.chatId);
        const contact = this.contacts.find(
          // tslint:disable-next-line: no-shadowed-variable
          (contact) => contact.id === contactId
        );
        // console.log(chatCollection)
        this.onChatSelected.next({
          chatCollection,
          contact,
        });
        this.collectionLoading = false;
        return of(chatCollection);
      })
    );
  }

  createChatCollection(contactId) {
    // tslint:disable-next-line: no-shadowed-variable
    const contact = this.contacts.find((contact) => contact.id === contactId);
    const chatId = (Math.random() * 1000000000).toString();

    const chatCollection: ChatCollection = {
      id: chatId,
      chats: [],
    };

    const chatInfo = {
      chatId,
      lastChatTime: new Date(),
      contactId: contact.id,
      contactName: contact.name,
      unread: null,
    };

    // return this.http.post('api/chat-collections', { ...chatCollection })
    ChatDB.chatCollection.push(chatCollection);
    return of(ChatDB.chatCollection)
    .pipe(switchMap((updatedChatCollection) => {
      this.user.chatInfo.push(chatInfo);
      return this.updateUser(this.user).pipe(
        switchMap((res) => {
          return this.getCurrentUser().pipe(
            map((user) => {
              this.user = user;
              // console.log(user)
              this.onUserUpdated.next(user);
            })
          );
        })
      );
    }));
  }

  getAllContacts(): Observable<User[]> {
    return of(ChatDB.contacts);
    // return this.http.get<User[]>('api/contacts');
  }
  getAllChats(): Observable<ChatCollection[]> {
    return of(ChatDB.chatCollection)
    // return this.http.get<ChatCollection[]>('api/chat-collections');
  }
  getCurrentUser(): Observable<User> {
    return of(ChatDB.user[0]);
    // return this.http.get<User>('api/chat-user').pipe(map((res) => res[0]));
  }
  updateUser(user: User): Observable<User> {
    return of(ChatDB.user[0]);
    // return this.http.put<User>(`api/chat-user/${user.id}`, { ...user });
  }
  updateChats(chatId: string, chats: Chat[]): Observable<ChatCollection> {
    const chatCollection: ChatCollection = {
      id: chatId,
      chats,
    };
    ChatDB.chatCollection.map((coll) => {
      if(coll.id == chatId) {
        coll.chats = [...chats]
      }
      return coll;
    });

    return of(ChatDB.chatCollection.find(coll => coll.id == chatId));
    // return this.http.put<ChatCollection>('api/chat-collections', chatCollection);
  }

  autoReply(chat) {
    setTimeout(() => {
      this.onChatsUpdated.next(chat);
    }, 1500);
  }
}

```

---

#### 📄 `src/app/views/app-dialogs/app-dialogs.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../../shared/shared.module';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoaderDialogComponent } from './loader-dialog/loader-dialog.component';

import { DialogsRoutes } from "./app-dialogs.routing";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    SharedModule,
    RouterModule.forChild(DialogsRoutes)
  ],
  declarations: [ConfirmDialogComponent, LoaderDialogComponent]
})
export class AppDialogsModule { }

```

---

#### 📄 `src/app/views/app-dialogs/app-dialogs.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoaderDialogComponent } from './loader-dialog/loader-dialog.component';

export const DialogsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'confirm',
      component: ConfirmDialogComponent,
      data: { title: 'Confirm', breadcrumb: 'CONFIRM' },
    }, {
      path: 'loader',
      component: LoaderDialogComponent,
      data: { title: 'Loader', breadcrumb: 'LOADER' },
    }]
  }
];
```

---

#### 📄 `src/app/views/app-dialogs/confirm-dialog/confirm-dialog.component.html`

```html
<mat-card class="p-0">
  <mat-card-title class="">
    <div class="card-title-text pl-4 rtl:pr-4 py-3">
      <span>Confirm Dialog</span>
    </div>
    <mat-divider></mat-divider>
  </mat-card-title>
  <mat-card-content class="!pt-4">
    <div class="!pb-4">
      <mat-form-field class="full-width">
        <mat-label>Title</mat-label>
        <input matInput name="title" placeholder="Title" [(ngModel)]="title">
      </mat-form-field>
    </div>
    <div class="!pb-4">
      <mat-form-field class="full-width">
        <mat-label>Description</mat-label>
        <input matInput name="text" placeholder="Text" [(ngModel)]="text">
      </mat-form-field>
    </div>
    <div class="!pb-4">
      <mat-form-field class="full-width">
        <mat-label>Confirm Text</mat-label>
        <input matInput name="confirmText" placeholder="Confirm Text" [(ngModel)]="confirmText">
      </mat-form-field>
    </div>
    <button mat-raised-button color="primary" (click)="openDialog()" class="mb-4">Open dialog</button>
    <p>You selected: {{selectedOption}}</p>
  </mat-card-content>
</mat-card>
```

---

#### 📄 `src/app/views/app-dialogs/confirm-dialog/confirm-dialog.component.ts`

```typescript
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css'],
    standalone: false
})
export class ConfirmDialogComponent implements OnInit {
  title = 'Confirm dialog';
  text = 'Just click a button!';
  confirmText = 'OK';
  selectedOption: boolean;
  
  constructor(
    public confirmService: AppConfirmService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }
  openDialog() {
    this.confirmService.confirm({title: this.title, message: this.text, confirmText: this.confirmText})
      .subscribe((result) => {
        this.selectedOption = result;
        
        this.cdr.markForCheck();
      });
  }
}

```

---

#### 📄 `src/app/views/app-dialogs/loader-dialog/loader-dialog.component.html`

```html
<mat-card class="p-0">
  <mat-card-title class="">
    <div class="card-title-text pl-4 rtl:pr-4 py-3">
      <span>Loader Dialog</span>
    </div>
    <mat-divider></mat-divider>
  </mat-card-title>
  <mat-card-content class="!pt-4">
    <div class="!pb-4">
        <mat-form-field class="full-width">
            <input
            matInput
            name="title"
            placeholder="Loader text"
            [(ngModel)]="title">
        </mat-form-field>
    </div>
    <div class="!pb-4">
        <mat-form-field class="full-width">
            <input
            matInput
            name="time"
            type="number"
            placeholder="Loading time (ms)"
            [(ngModel)]="loadingTime">
        </mat-form-field>
    </div>
    <button mat-raised-button color="primary" (click)="openLoader()" class="">Show loader</button>
  </mat-card-content>
</mat-card>
```

---

#### 📄 `src/app/views/app-dialogs/loader-dialog/loader-dialog.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
    selector: 'app-loader-dialog',
    templateUrl: './loader-dialog.component.html',
    styleUrls: ['./loader-dialog.component.css'],
    standalone: false
})
export class LoaderDialogComponent implements OnInit {
  loadingTime = 3000;
  title = 'Please wait';
  constructor(private loader: AppLoaderService) { }

  ngOnInit() {
  }
  openLoader() {
    this.loader.open(this.title);
    setTimeout(() => {
      this.loader.close();
    }, this.loadingTime)
  }
}

```

---

#### 📄 `src/app/views/app-inbox/app-inbox.component.html`

```html
<mat-sidenav-container class="min-h-screen !bg-card mx-8">
  <!-- Inbox left side bar -->
  <mat-sidenav #sidenav [opened]="isSidenavOpen" mode="side" class="inbox-sidenav shadow-md">
    <!-- Compose button -->
    <button mat-raised-button class="mat-warn full-width mb-4 rounded-lg shadow-sm transition-all hover:shadow" (click)="openComposeDialog()">
      <span class="font-medium">Compose</span>
    </button>
    <!-- left side buttons -->
    <mat-nav-list class="inbox-nav-list space-y-1" role="list">
      <mat-list-item class="primary-imenu-item rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon class="text-slate-600 mr-3 rtl:ml-3">inbox</mat-icon>
          <span class="font-medium">Inbox</span>
        </a>
      </mat-list-item>
      <mat-list-item class="primary-imenu-item rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon class="text-slate-600 mr-3 rtl:ml-3">folder_special</mat-icon>
          <span class="font-medium">Starred</span>
        </a>
      </mat-list-item>
      <mat-list-item class="primary-imenu-item rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon class="text-slate-600 mr-3 rtl:ml-3">send</mat-icon>
          <span class="font-medium">Sent</span>
        </a>
      </mat-list-item>
      <mat-list-item class="primary-imenu-item rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon class="text-slate-600 mr-3 rtl:ml-3">drafts</mat-icon>
          <span class="font-medium">Draft</span>
        </a>
      </mat-list-item>
      <mat-list-item class="primary-imenu-item rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon class="text-slate-600 mr-3 rtl:ml-3">error</mat-icon>
          <span class="font-medium">Spam</span>
        </a>
      </mat-list-item>

      <mat-divider class="!my-3"></mat-divider>

      <h3 class="text-xs font-semibold uppercase text-slate-500 px-4 mb-2">Categories</h3>
      <mat-list-item class="rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon color="primary" class="mr-3 rtl:ml-3">people</mat-icon>
          <span class="font-medium">Social</span>
        </a>
      </mat-list-item>
      <mat-list-item class="rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon color="warn" class="mr-3 rtl:ml-3">local_offer</mat-icon>
          <span class="font-medium">Promotions</span>
        </a>
      </mat-list-item>
      <mat-list-item class="rounded-md hover:bg-slate-100" role="listitem" routerLinkActive="bg-slate-200">
        <a class="flex flex-row items-center py-2">
          <mat-icon color="accent" class="mr-3 rtl:ml-3">forums</mat-icon>
          <span class="font-medium">Forums</span>
        </a>
      </mat-list-item>
    </mat-nav-list>
  </mat-sidenav>

  <div class="messages-wrap Ltemplate-card">
    <mat-toolbar color="primary" class="inbox-toolbar shadow-sm rounded-t-md">
      <!-- Left sidebar toggle button -->
      <button class="!block lg:!hidden" mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>short_text</mat-icon>
      </button>
      <!-- multiple email select and control -->
      <mat-checkbox (change)="selectToggleAll()" class="inbox-toggle-all mr-4 rtl:ml-4">
        <small class="text-white font-medium">All</small>
      </mat-checkbox>
      <div class="flex space-x-1">
        <button mat-icon-button matTooltip="Move to trash" class="hover:bg-opacity-10 hover:bg-slate-200 transition-colors">
          <mat-icon>delete</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Mark as important" class="hover:bg-opacity-20 hover:bg-slate-200 transition-colors">
          <mat-icon>folder_special</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Move to archive" class="hover:bg-opacity-20 hover:bg-slate-200 transition-colors">
          <mat-icon>archive</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Report spam" class="hover:bg-opacity-20 hover:bg-slate-200 transition-colors">
          <mat-icon>error</mat-icon>
        </button>
      </div>
    </mat-toolbar>
    
    <div class="overflow-y-auto">
      <mat-accordion class="">
        <mat-expansion-panel *ngFor="let message of messages" hideToggle="true" 
          class="shadow-none border-0 transition-colors">
          <mat-expansion-panel-header class="px-4 py-3">
            <mat-panel-title class="items-center">
              <mat-checkbox 
                [(ngModel)]="message.selected" 
                (click)="stopProp($event)" 
                class="mail-checkbox hide-on-open">
              </mat-checkbox>
              <button 
                mat-icon-button 
                matTooltip="Mark as important"
                (click)="stopProp($event)" 
                class="hide-on-open text-slate-400 hover:text-yellow-500 mr-2 rtl:ml-2">
                <mat-icon>star_border</mat-icon>
              </button>

              <span class="hide-on-open font-medium truncate">{{message.sender.name}}</span>
              <div class="flex items-center show-on-open">
                <img [src]="message.sender.photo" alt="" 
                  class="w-10 h-10 rounded-full object-cover mr-4 rtl:ml-4">
                <div class="flex flex-col">
                  <span class="font-semibold">{{message.sender.name}}</span>
                  <small class="text-secondary">{{message.date | date}}</small>
                </div>
              </div>
            </mat-panel-title>
            <mat-panel-description class="items-center">
              <span class="mail-subject text-sm text-secondary font-normal truncate mr-2">{{message.subject}}</span>
              <span class="flex-grow"></span>
              <span class="text-xs text-slate-500 hidden md:block whitespace-nowrap">{{message.date | relativeTime}}</span>
              <button mat-icon-button [matMenuTriggerFor]="msgMenu" (click)="$event.stopPropagation()" 
                class="hidden-on-open text-secondary hover:text-secondary-50 focus:outline-none ml-2">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #msgMenu="matMenu">
                <button mat-menu-item class="flex items-center">
                  <mat-icon class="mr-2 text-slate-500">reply</mat-icon> 
                  <span>Reply</span>
                </button>
                <button mat-menu-item class="flex items-center">
                  <mat-icon class="mr-2 text-slate-500">archive</mat-icon> 
                  <span>Archive</span>
                </button>
                <button mat-menu-item class="flex items-center">
                  <mat-icon class="mr-2 text-slate-500">delete</mat-icon> 
                  <span>Delete</span>
                </button>
              </mat-menu>
            </mat-panel-description>
          </mat-expansion-panel-header>
      
          <div class="message-text p-5 leading-relaxed" [innerHTML]="message.message"></div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  </div>

</mat-sidenav-container>
```

---

#### 📄 `src/app/views/app-inbox/app-inbox.component.ts`

```typescript
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AppInboxService } from './app-inbox.service';
import { MailComposeComponent } from './mail-compose.component';

@Component({
    selector: 'app-inbox',
    templateUrl: './app-inbox.component.html',
    styleUrls: ['./app-inbox.component.css'],
    providers: [AppInboxService],
    standalone: false
})
export class AppInboxComponent implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  selectToggleFlag = false;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;
  messages;


  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    public composeDialog: MatDialog,
    private inboxService: AppInboxService) { }

  ngOnInit() {
    this.inboxSideNavInit();
    this.messages = this.inboxService.messages;
  }
  ngOnDestroy() {
    if(this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe()
    }
  }
  openComposeDialog() {
    const dialogRef = this.composeDialog.open(MailComposeComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }
  selectToggleAll() {
    this.selectToggleFlag = !this.selectToggleFlag;
    this.messages.forEach((msg) => { msg.selected = this.selectToggleFlag });
  }

  stopProp(e) {
    e.stopPropagation()
  }

  updateSidenav() {
    let self = this;
    setTimeout(() => {
      self.isSidenavOpen = !self.isMobile;
      self.sideNav.mode = self.isMobile ? 'over' : 'side';
    })
  }
  inboxSideNavInit() {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 959px)');
    this.updateSidenav();

    this.screenSizeWatcher = this.breakpointObserver.observe('(max-width: 959px)').subscribe(result => {
      this.isMobile = result.matches;
      this.updateSidenav();
    });
  }
}

```

---

#### 📄 `src/app/views/app-inbox/app-inbox.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';
import { QuillModule } from 'ngx-quill';

import { AppInboxComponent } from './app-inbox.component';
import { MailComposeComponent } from './mail-compose.component';
import { InboxRoutes } from "./app-inbox.routing";
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    QuillModule,
    SharedPipesModule,
    RouterModule.forChild(InboxRoutes)
  ],
  declarations: [AppInboxComponent, MailComposeComponent],
  // entryComponents: [MailComposeComponent]
})
export class AppInboxModule { }

```

---

#### 📄 `src/app/views/app-inbox/app-inbox.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { AppInboxComponent } from './app-inbox.component';


export const InboxRoutes: Routes = [
  { path: '', component: AppInboxComponent, data: { title: 'Inbox' } }
];
```

---

#### 📄 `src/app/views/app-inbox/app-inbox.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { InboxDB } from '../../shared/inmemory-db/inbox';
@Injectable()
export class AppInboxService {
  public messages: any[];
  constructor() {
    let inboxDB = new InboxDB();
    this.messages = inboxDB.messages;
  }
}

```

---

#### 📄 `src/app/views/app-inbox/mail-compose.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
    selector: 'mail-compose',
    templateUrl: './mail-compose.template.html',
    standalone: false
})
export class MailComposeComponent implements OnInit {
  newMailData = {};
  mailForm: UntypedFormGroup;

  constructor(private composeDialog: MatDialog) { }

  ngOnInit() {
    this.mailForm = new UntypedFormGroup({
      to: new UntypedFormControl('', [
        Validators.required,
        Validators.email
      ]),
      subject: new UntypedFormControl('', [
        Validators.required
      ]),
      message: new UntypedFormControl('', [
        Validators.required
      ])
    })
  }
  sendEmail() {
    // console.log(this.mailForm.value);
  }
  closeDialog() {

  }
}

```

---

#### 📄 `src/app/views/app-inbox/mail-compose.template.html`

```html
<div class="p-4">
    <form [formGroup]="mailForm" novalidate (submit)="sendEmail()">
        <div class="!pb-4">
            <mat-form-field class="full-width">
                <input matInput formControlName="to" placeholder="To">
            </mat-form-field>
            <small
                *ngIf="mailForm.controls.to.errors && (mailForm.controls.to.dirty || mailForm.controls.to.touched) && (mailForm.controls.to.errors.required)"
                class="form-error-msg"> Email is required </small>
            <small
                *ngIf="mailForm.controls.to.errors && (mailForm.controls.to.dirty || mailForm.controls.to.touched) && (mailForm.controls.to.errors.email)"
                class="form-error-msg"> Invaild email address </small>
        </div>

        <div class="!pb-4">
            <mat-form-field class="full-width">
                <input matInput name="subject" formControlName="subject" placeholder="Subject" value="">
            </mat-form-field>
            <small *ngIf="mailForm.controls.subject.errors && 
            (mailForm.controls.subject.dirty || mailForm.controls.subject.touched) && 
            (mailForm.controls.subject.errors.required)" class="form-error-msg"> Subject is required </small>
        </div>
        <div class="!pb-4">
            <quill-editor theme="snow" formControlName="message"></quill-editor>
            <small *ngIf="mailForm.controls.message.errors && 
            (mailForm.controls.message.dirty || mailForm.controls.message.touched) && 
            (mailForm.controls.message.errors.required)" class="form-error-msg"> Message is required </small>
        </div>

        <div class="flex">
            <button mat-mini-fab class="mat-primary" type="submit"><mat-icon>send</mat-icon></button>
            <button mat-icon-button><mat-icon>attachment</mat-icon></button>
            <span class="flex-grow"></span>
            <button type="button" mat-button matDialogClose>Cancel</button>
        </div>
    </form>
</div>
```

---

#### 📄 `src/app/views/app-tour/app-tour.component.html`

```html
<div class="flex flex-wrap">
  <div class="w-full md:w-1/3">
    <mat-card class="p-4">
      <mat-card-subtitle class="!mb-2">Click this button to start a demo Tour.</mat-card-subtitle>
      <button 
        color="primary" 
        mat-raised-button
        (click)="startTour()">Start Tour</button>
    </mat-card>
  </div>
  <div class="w-full md:w-1/3">
    <mat-card class="p-4" id="areaOne">
      <mat-card-title class="m-0">Define your steps</mat-card-title>
      <mat-card-content class="!px-0">
        <pre><code [LtemplateHighlight]="tourStepsCode" class="tourStepsCode"></code></pre>
      </mat-card-content>
    </mat-card>
  </div>
  <div class="w-full md:w-1/3">
    <mat-card class="p-4" id="areaTwo">
      <mat-card-title class="!mb-4">Initialize tour</mat-card-title>
      <mat-card-content class="!px-0">
        <pre><code [LtemplateHighlight]="initTourCode" class="initTourCode"></code></pre>
      </mat-card-content>
    </mat-card>
  </div>
</div>
```

---

#### 📄 `src/app/views/app-tour/app-tour.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { driver } from "driver.js";

@Component({
    selector: 'app-app-tour',
    templateUrl: './app-tour.component.html',
    styleUrls: ['./app-tour.component.css'],
    standalone: false
})
export class AppTourComponent implements OnInit, OnDestroy {
  driverObj: any;
  
  // Code example strings for the template
  tourStepsCode: string = `tourSteps(): any {
  return {
    showProgress: true,
    onDeselected: () => {
      this.snackBar.open('You just closed User Tour!', 'close', { duration: 3000 });
    },
    onDestroyed: () => {
      this.snackBar.open('User tour ended!', 'close', { duration: 3000 });
    },
    steps: [
      {
        element: '#areaOne',
        popover: {
          title: 'Step one',
          description: 'This is step description.',
          side: 'left',
          align: 'start'
        }
      },
      {
        element: '#areaOne code',
        popover: {
          title: 'Define your steps',
          description: 'This is step description.',
          side: 'left',
          align: 'start'
        }
      },
      {
        element: '#areaTwo code',
        popover: {
          title: 'Invoke startTour function',
          description: 'This is step description.',
          side: 'left',
          align: 'start'
        }
      }
    ]
  }
}`;

  initTourCode: string = `// Initialize new tour with the configured steps
this.driverObj = driver(this.tourSteps());
this.driverObj.drive();`;
  
  constructor(public snackBar: MatSnackBar) {
    this.driverObj = driver();
  }

  ngOnInit() {
   
  }
  
  ngOnDestroy() {
    // Clean up the driver instance if it exists
    if (this.driverObj) {
      this.driverObj.destroy();
    }
  }

  tourSteps(): any {
    return {
      showProgress: true,
      onDeselected: () => {
        this.snackBar.open('You just closed User Tour!', 'close', { duration: 3000 });
      },
      onDestroyed: () => {
        this.snackBar.open('User tour ended!', 'close', { duration: 3000 });
      },
      steps: [
        {
          element: '#areaOne',
          popover: {
            title: 'Define your steps',
            description: 'Provide necessary options to define your steps.',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: 'code.tourStepsCode .hljs-keyword:nth-child(3)',
          popover: {
            title: 'onDeselected callback',
            description: 'You can run code on tour step change',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '#areaTwo code',
          popover: {
            title: 'Initialize tour',
            description: 'Initialize the tour with the configured steps',
            side: 'left',
            align: 'start'
          }
        }
      ]
    }
  }
  
  startTour() {
    // Destroy any running tour
    if (this.driverObj) {
      this.driverObj.destroy();
    }
    
    // Initialize new tour with the configured steps
    this.driverObj = driver(this.tourSteps());
    this.driverObj.drive();
  }
}

```

---

#### 📄 `src/app/views/app-tour/app-tour.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppTourComponent } from './app-tour.component';
import { TourRoutes } from './app-tour.routing';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    SharedDirectivesModule,
    RouterModule.forChild(TourRoutes)
  ],
  declarations: [AppTourComponent]
})
export class AppTourModule { }

```

---

#### 📄 `src/app/views/app-tour/app-tour.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { AppTourComponent } from './app-tour.component';


export const TourRoutes: Routes = [
  { path: '', component: AppTourComponent, data: { title: 'User Tour' } }
];
```

---

#### 📄 `src/app/views/chart-example-view/chart-example-view-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartExampleViewComponent } from './chart-example-view.component';
import { LtemplateExampleViewerTemplateComponent } from 'app/shared/components/example-viewer-template/example-viewer-template.component';
import { CHART_EXAMPLE_COMPONENT_MAP, CHART_EXAMPLE_COMPONENTS } from 'assets/examples/chart';

const routes: Routes = [
  {
    path: ":id",
    component: ChartExampleViewComponent,
    children: [
      {
        path: "",
        component: LtemplateExampleViewerTemplateComponent,
        data: {
          map: CHART_EXAMPLE_COMPONENT_MAP,
          components: CHART_EXAMPLE_COMPONENTS,
          path: "assets/examples/chart/"
        }
      }
    ],
    data: { title: "Chart", breadcrumb: "Chart" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartExampleViewRoutingModule { }

```

---

#### 📄 `src/app/views/chart-example-view/chart-example-view.component.html`

```html
<div class="sm:mx-8">
    <router-outlet></router-outlet>
</div>
```

---

#### 📄 `src/app/views/chart-example-view/chart-example-view.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chart-example-view',
    templateUrl: './chart-example-view.component.html',
    standalone: false
})
export class ChartExampleViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/chart-example-view/chart-example-view.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartExampleViewRoutingModule } from './chart-example-view-routing.module';
import { ChartExampleViewComponent } from './chart-example-view.component';
import { ChartExamplesModule } from 'assets/examples/chart/chart-examples.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

@NgModule({
  declarations: [ChartExampleViewComponent],
  imports: [
    CommonModule,
    ChartExamplesModule,
    SharedComponentsModule,
    ChartExampleViewRoutingModule
  ]
})
export class ChartExampleViewModule { }

```

---

#### 📄 `src/app/views/charts/charts.component.html`

```html
<div class="flex flex-wrap sm:mx-8">
  <div class="w-full md:w-1/3">
    <mat-card class="p-0">
      <mat-card-title class="">
        <div class="card-title-text pl-4 rtl:pr-4 py-3">Vertical Bar chart</div>
      </mat-card-title>
      <mat-divider></mat-divider>
      <mat-card-content>
        <canvas  
          baseChart 
          class="chart"
          [datasets]="barChartData"
          [labels]="barChartLabels"
          [options]="barChartOptions"
          [legend]="barChartLegend"
          [type]="barChartType"></canvas>
      </mat-card-content>
    </mat-card>
  </div>
  
  

  <div class="w-full md:w-1/3">
    <mat-card class="p-0">
      <mat-card-title class="">
        <div class="card-title-text pl-4 rtl:pr-4 py-3">Stacked Bar chart</div>
      </mat-card-title>
      <mat-divider></mat-divider>
      <mat-card-content>
        <canvas  
          baseChart class="chart"
          [datasets]="barChartData"
          [labels]="barChartLabels"
          [options]="barChartStackedOptions"
          [legend]="barChartLegend"
          [type]="barChartType"></canvas>
      </mat-card-content>
    </mat-card>
  </div>

  <div class="w-full md:w-1/3">
    <mat-card class="p-0">
      <mat-card-title class="">
        <div class="card-title-text pl-4 rtl:pr-4 py-3">Basic Line chart</div>
      </mat-card-title>
      <mat-divider></mat-divider>
      <mat-card-content>
        <canvas 
          baseChart 
          class="chart"
          [datasets]="lineChartData"
          [labels]="lineChartLabels"
          [options]="lineChartOptions"
          [legend]="lineChartLegend"
          [type]="lineChartType"></canvas>
      </mat-card-content>
    </mat-card>
  </div>
  <div class="w-full md:w-1/3">
    <mat-card class="p-0">
      <mat-card-title class="">
        <div class="card-title-text pl-4 rtl:pr-4 py-3">Point Line chart</div>
      </mat-card-title>
      <mat-divider></mat-divider>
      <mat-card-content>
        <canvas 
          baseChart 
          class="chart"
          [datasets]="lineChartPointsData"
          [labels]="lineChartLabels"
          [options]="lineChartPointsOptions"
          [legend]="lineChartLegend"
          [type]="lineChartType"></canvas>
      </mat-card-content>
    </mat-card>
  </div>
  <div class="w-full md:w-1/3">
    <mat-card class="p-0">
      <mat-card-title class="">
        <div class="card-title-text pl-4 rtl:pr-4 py-3">Bubble chart</div>
      </mat-card-title>
      <mat-divider></mat-divider>
      <mat-card-content>
        <canvas 
          baseChart 
          class="chart"
          [datasets]="bubbleChartData"
          [labels]="bubbleChartLabels"
          [options]="bubbleChartOptions"
          [legend]="bubbleChartLegend"
          [type]="bubbleChartType"></canvas>
      </mat-card-content>
    </mat-card>
  </div>

  <div class="w-full md:w-1/3">
    <mat-card class="p-0">
      <mat-card-title class="">
        <div class="card-title-text pl-4 rtl:pr-4 py-3">Radar chart</div>
      </mat-card-title>
      <mat-divider></mat-divider>
      <mat-card-content>
        <div style="max-width: 260px; margin: auto;">
          <canvas
        class="chart" 
        baseChart
        [datasets]="radarChartData"
        [labels]="radarChartLabels"
        [legend]="false"
        [type]="radarChartType"
        (chartHover)="radarChartHovered($event)"
        (chartClick)="radarChartClicked($event)"></canvas>
        </div>
        
      </mat-card-content>
    </mat-card>
  </div>

</div>

```

---

#### 📄 `src/app/views/charts/charts.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css'],
    standalone: false
})
export class ChartsComponent implements OnInit {

  sharedChartOptions: any = {
    responsive: true,
    // maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  chartColors: Array <any> = [{
    backgroundColor: '#3f51b5',
    borderColor: '#3f51b5',
    pointBackgroundColor: '#3f51b5',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#eeeeee',
    borderColor: '#e0e0e0',
    pointBackgroundColor: '#e0e0e0',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, {
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  /*
  * Bar Chart
  */
  barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [{
    data: [5, 6, 7, 8, 4, 5, 5],
    label: 'Series A',
    borderWidth: 0
  }, {
    data: [5, 4, 4, 3, 6, 2, 5],
    label: 'Series B',
    borderWidth: 0
  }];
  barChartOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        position: 'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: 9
        }
      }]
    }
  }, this.sharedChartOptions);

  // Bar Chart Stacked
  barChartStackedOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    tooltips: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        stacked: true
      }]
    }
  }, this.sharedChartOptions);

  /*
  * Line Chart Options
  */
  lineChartData: Array <any> = [{
    data: [5, 5, 7, 8, 4, 5, 5],
    label: 'Series A',
    borderWidth: 1
  }, {
    data: [5, 4, 4, 3, 6, 2, 5],
    label: 'Series B',
    borderWidth: 1
  }];
  lineChartLabels: Array <any> = ['1', '2', '3', '4', '5', '6', '7'];
  lineChartOptions: any = Object.assign({
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.sharedChartOptions);
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  lineChartPointsData: Array <any> = [{
    data: [6, 5, 8, 8, 5, 5, 4],
    label: 'Series A',
    borderWidth: 1,
    fill: false,
    pointRadius: 10,
    pointHoverRadius: 15,
    showLine: false
  }, {
    data: [5, 4, 4, 2, 6, 2, 5],
    label: 'Series B',
    borderWidth: 1,
    fill: false,
    pointRadius: 10,
    pointHoverRadius: 15,
    showLine: false
  }];
  lineChartPointsOptions: any = Object.assign({
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    },
    elements: {
      point: {
        pointStyle: 'rectRot',
      }
    }
  }, this.sharedChartOptions);

  // Bubble Chart
  bubbleChartData: Array <any> = [{
    data: [{
      x: 4,
      y: 4,
      r: 15,
    }, {
      x: 6,
      y: 12,
      r: 30,
    }, {
      x: 5,
      y: 4,
      r: 10,
    }, {
      x: 8,
      y: 4,
      r: 6,
    }, {
      x: 7,
      y: 8,
      r: 4,
    }, {
      x: 3,
      y: 13,
      r: 14,
    }, {
      x: 5,
      y: 6,
      r: 8,
    }, {
      x: 7,
      y: 2,
      r: 10,
    }],
    label: 'Series A',
    borderWidth: 1
  }];
  bubbleChartType = 'bubble';
  bubbleChartLabels: Array <any> = ['1', '2', '3', '4', '5', '6', '7'];
  bubbleChartLegend = true;

  bubbleChartOptions: any = Object.assign({
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.sharedChartOptions);

  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f']
  }];
  doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData: number[] = [350, 450, 100];
  doughnutChartType = 'doughnut';
  doughnutOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.sharedChartOptions);
  /*
  * Radar Chart Options
  */
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A', borderWidth: 1 },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B', borderWidth: 1 }
  ];
  public radarChartType: string = 'radar';
  public radarChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(36, 123, 160, 0.2)',
      borderColor: 'rgba(36, 123, 160, 0.6)',
      pointBackgroundColor: 'rgba(36, 123, 160, 0.8)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(36, 123, 160, 0.8)'
    },
    {
      backgroundColor: 'rgba(244, 67, 54, 0.2)',
      borderColor: 'rgba(244, 67, 54, .8)',
      pointBackgroundColor: 'rgba(244, 67, 54, .8)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(244, 67, 54, 1)'
    }
  ];
  /*
  * Pie Chart Options
  */
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = 'pie';
  public pieChartColors: Array<any> = [{
    backgroundColor: ['rgba(255, 217, 125, 0.8)', 'rgba(36, 123, 160, 0.8)', 'rgba(244, 67, 54, 0.8)']
  }];

  constructor() {
  }
  ngOnInit() {}

  /*
  * Bar Chart Event Handler
  */
  public barChartClicked(e: any): void {
  }
  public barChartHovered(e: any): void {
  }

  /*
  * Line Chart Event Handler
  */
  public lineChartClicked(e: any): void {
  }
  public lineChartHovered(e: any): void {
  }

  /*
  * Doughnut Chart Event Handler
  */
  public doughnutChartClicked(e: any): void {
  }
  public doughnutChartHovered(e: any): void {
  }

  /*
  * Rader Chart Event Handler
  */
  public radarChartClicked(e: any): void {
  }
  public radarChartHovered(e: any): void {
  }

  /*
  * Pie Chart Event Handler
  */
  public pieChartClicked(e: any): void {
  }
  public pieChartHovered(e: any): void {
  }

}

```

---

#### 📄 `src/app/views/charts/charts.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { BaseChartDirective } from 'ng2-charts';

import { ChartsComponent } from './charts.component';
import { ChartsRoutes } from "./charts.routing";


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    BaseChartDirective,
    RouterModule.forChild(ChartsRoutes)
  ],
  declarations: [ChartsComponent]
})
export class AppChartsModule { }

```

---

#### 📄 `src/app/views/charts/charts.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';


export const ChartsRoutes: Routes = [
  { path: '', component: ChartsComponent, data: { title: 'Charts' } }
];
```

---

#### 📄 `src/app/views/cruds/crud-ngx-table/crud-ngx-table.component.html`

```html
<div class="sm:mx-8">
  <div class="m-3 flex flex-col md:flex-row justify-between items-center"
    [@animate]="{value:'*',params:{y:'50px',delay:'300ms'}}">

    <div class="p-2 Ltemplate-card !ml-0 flex items-center">
      <mat-icon class="mr-2 text-info">info</mat-icon>
      <div class="text-info font-medium">Crud table is a part of CrudsModule. Location:
        src/app/views/cruds/cruds.module.ts</div>
    </div>
    <div class="md:w-[100px] lg:w-1/6 xl:w-2/6"></div>
    <button mat-flat-button class="m-2" color="primary" (click)="openPopUp({}, true)">{{"ADD" | translate }}
      Customer</button>
  </div>
  <mat-card class="!p-0" [@animate]="{value:'*',params:{y:'50px',delay:'300ms'}}">
    <mat-card-content class="!p-0">
      <mat-table [dataSource]="dataSource" matSort>
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>
          <mat-cell *matCellDef="let row" data-label="id"> {{row._id}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>
          <mat-cell *matCellDef="let row" data-label="name"> {{row.name}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="age">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Age </mat-header-cell>
          <mat-cell *matCellDef="let row" data-label="age"> {{row.age}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="balance">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Balance </mat-header-cell>
          <mat-cell *matCellDef="let row" [style.color]="row.color" data-label="color"> {{row.balance}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="company">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Company </mat-header-cell>
          <mat-cell *matCellDef="let row" [style.color]="row.color" data-label="color"> {{row.company}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="status">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Status </mat-header-cell>
          <mat-cell *matCellDef="let row" [style.color]="row.color" data-label="color">
            <mat-chip mat-sm-chip [color]="'primary'" [selected]="row.isActive">{{row.isActive ? 'active' : 'inactive'}}
            </mat-chip>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Action </mat-header-cell>
          <mat-cell *matCellDef="let row">
            <button mat-icon-button mat-sm-button color="primary" class="mr-4 rtl:ml-4" (click)="openPopUp(row)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button mat-sm-button color="warn" (click)="deleteItem(row)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
      <mat-paginator [pageSizeOptions]="[10, 25, 100]"></mat-paginator>

    </mat-card-content>
  </mat-card>
</div>
```

---

#### 📄 `src/app/views/cruds/crud-ngx-table/crud-ngx-table.component.ts`

```typescript
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatDialogRef as MatDialogRef, MatDialog as MatDialog } from '@angular/material/dialog';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { LtemplateAnimations } from "../../../shared/animations/ltemplate-animations";
import { MatTableDataSource as MatTableDataSource } from '@angular/material/table';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-crud-ngx-table',
    templateUrl: './crud-ngx-table.component.html',
    animations: LtemplateAnimations,
    standalone: false
})
export class CrudNgxTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public dataSource: any;
  public displayedColumns: any;
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

  getDisplayedColumns() {
    return ['name', 'age', 'balance', 'company', 'status', 'actions'];
  }

  getItems() {    
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      })
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new Customer' : 'Update Customer';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        if (isNew) {
          this.loader.open('Adding new Customer');
          this.crudService.addItem(res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Customer Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.loader.open('Updating Customer');
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Customer Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Deleting Customer');
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Customer deleted!', 'OK', { duration: 4000 })
            })
        }
      })
  }
}
```

---

#### 📄 `src/app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component.html`

```html
<div class="p-4">
  <h1 class="text-lg mb-4">{{data.title}}</h1>
  
  <form [formGroup]="itemForm" (ngSubmit)="submit()">
    <div class="flex flex-wrap flex-col md:flex-row">
      <div class="w-full md:w-1/2 pr-16">
        <mat-form-field class="full-width">
          <input matInput name="username" [formControl]="itemForm.controls['name']" placeholder="Name">
        </mat-form-field>
      </div>

      <div class="w-full md:w-1/2 pr-16">
        <mat-form-field class="full-width">
          <input matInput type="number" name="age" [formControl]="itemForm.controls['age']" placeholder="Age">
        </mat-form-field>
      </div>

      <div class="w-full md:w-1/2 pr-16">
        <mat-form-field class="full-width">
          <input matInput type="email" name="email" [formControl]="itemForm.controls['email']" placeholder="Email">
        </mat-form-field>
      </div>

      <div class="w-full md:w-1/2 pr-16">
        <mat-form-field class="full-width">
          <input matInput name="company" [formControl]="itemForm.controls['company']" placeholder="Company">
        </mat-form-field>
      </div>
      <div class="w-full md:w-1/2 pr-16">
        <mat-form-field class="full-width">
          <input matInput name="phone" [formControl]="itemForm.controls['phone']" placeholder="Phone">
        </mat-form-field>
      </div>
      <div class="w-full md:w-1/2 pr-16">
        <mat-form-field class="full-width">
          <input matInput name="address" [formControl]="itemForm.controls['address']" placeholder="address">
        </mat-form-field>
      </div>
      <div class="w-full md:w-1/2 pr-16">
        <mat-form-field class="full-width">
          <input matInput name="balance" [formControl]="itemForm.controls['balance']" placeholder="Balance">
        </mat-form-field>
      </div>
      <div class="w-full md:w-1/2 !pt-4 pr-16">
        <mat-slide-toggle [formControl]="itemForm.controls['isActive']">Active Customer</mat-slide-toggle>
      </div>

      <div class="flex w-full mt-4">
        <button mat-raised-button color="primary" [disabled]="itemForm.invalid">{{"SAVE" | translate }}</button>
        <span class="flex-grow"></span>
        <button mat-button color="warn" type="button" (click)="dialogRef.close(false)">Cancel</button>
      </div>
    </div>
  </form>
</div>
```

---

#### 📄 `src/app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component.ts`

```typescript
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-ngx-table-popup',
    templateUrl: './ngx-table-popup.component.html',
    standalone: false
})
export class NgxTablePopupComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      age: [item.age || ''],
      email: [item.email || ''],
      company: [item.company || ''],
      phone: [item.phone || ''],
      address: [item.address || ''],
      balance: [item.balance || ''],
      isActive: [item.isActive || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}

```

---

#### 📄 `src/app/views/cruds/crud.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDB } from '../../shared/inmemory-db/users';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class CrudService {
  items: any[];
  constructor(
    private http: HttpClient
  ) {
    let userDB = new UserDB();
    this.items = userDB.users;
  }

  //******* Implement your APIs ********
  getItems(): Observable<any> {
    return  of(this.items.slice())
  }
  addItem(item): Observable<any> {
    item._id = Math.round(Math.random() * 10000000000).toString();
    this.items.unshift(item);
    return of(this.items.slice()).pipe(delay(1000));
  }
  updateItem(id, item) {
    this.items = this.items.map(i => {
      if(i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    })
    return of(this.items.slice()).pipe(delay(1000));
  }
  removeItem(row) {
    let i = this.items.indexOf(row);
    this.items.splice(i, 1);
    return of(this.items.slice()).pipe(delay(1000));
  }
}

```

---

#### 📄 `src/app/views/cruds/cruds.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule as MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';

import { CrudsRoutes } from './cruds.routing';
import { CrudService } from './crud.service';
import { NgxTablePopupComponent } from './crud-ngx-table/ngx-table-popup/ngx-table-popup.component'
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule as MatTableModule } from '@angular/material/table';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(CrudsRoutes)
  ],
  declarations: [CrudNgxTableComponent, NgxTablePopupComponent],
  providers: [CrudService]
})
export class CrudsModule { }

```

---

#### 📄 `src/app/views/cruds/cruds.routing.ts`

```typescript
import { Routes } from '@angular/router';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';

export const CrudsRoutes: Routes = [
  { 
    path: 'ngx-table', 
    component: CrudNgxTableComponent, 
    data: { title: 'Table', breadcrumb: 'Table' } 
  }
];
```

---

#### 📄 `src/app/views/dashboard/analytics/analytics.component.html`

```html
<div class="sm:mx-8">
  <!-- First row -->
  <mat-card class="shadow-md" [@animate]="{ value: '*', params: { y: '50px', delay: '300ms' } }">
    <div class="flex flex-wrap">
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center py-4">
          <mat-icon class="text-green-500">show_chart</mat-icon>
          <h4 class="m-0 font-semibold">148,250</h4>
          <small class="text-secondary">Page Views</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center py-4">
          <mat-icon class="text-primary">trending_up</mat-icon>
          <h4 class="m-0 font-semibold">4,820</h4>
          <small class="text-secondary">Conversions</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center py-4">
          <mat-icon class="text-green-500">query_stats</mat-icon>
          <h4 class="m-0 font-semibold">18,940</h4>
          <small class="text-secondary">Active Sessions</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center py-4">
          <mat-icon class="text-primary">person_outline</mat-icon>
          <h4 class="m-0 font-semibold">36,410</h4>
          <small class="text-secondary">Unique Visitors</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center py-4">
          <mat-icon class="text-warn">schedule</mat-icon>
          <h4 class="m-0 font-semibold">4m 32s</h4>
          <small class="text-secondary">Avg. Duration</small>
        </div>
      </div>
    </div>
  </mat-card>
  <!--/ End first row -->

  <!-- 2nd, 3rd row -->
  <div class="flex flex-wrap">
    <div class="w-full sm:w-1/2 lg:w-2/3" [@animate]="{ value: '*', params: { y: '50px', delay: '600ms' } }">
      <mat-card class="shadow-md">
        <mat-tab-group (selectedTabChange)="onTabChange()">
          <mat-tab label="Traffic Vs Sales">
            <ng-template matTabContent>
              <div echarts [options]="trafficVsSaleOptions" [merge]="trafficVsSale" [autoResize]="true" class="h-64 w-full block">
              </div>
            </ng-template>
          </mat-tab>
          <mat-tab label="Sessions">
            <ng-template matTabContent>
              <div echarts [options]="sessionOptions" [merge]="sessions" [autoResize]="true" class="h-64 w-full block"></div>
            </ng-template>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>

    <!--/ End tab -->

    <!-- Donut chart -->
    <div class="w-full sm:w-1/2 lg:w-1/3" [@animate]="{ value: '*', params: { y: '50px', delay: '400ms' } }">
      <mat-card class="shadow-md">
        <h6 class="ml-4 rtl:mr-4 mt-4">Traffic Sources</h6>
        <div echarts [options]="trafficSourcesChart" [autoResize]="true" class="h-64 w-full block"></div>
      </mat-card>
    </div>

    <!--/ End donut chart -->
    <!--/ End 2nd row -->

    <!-- 3rd row, 1st column -->
    <div class="w-full sm:w-1/2 lg:w-1/3" [@animate]="{ value: '*', params: { y: '50px', delay: '800ms' } }">
      <mat-card class="p-4 shadow-md mb-4">
        <h6 class="font-medium">7 Day Traffic</h6>
        <div echarts [options]="dailyTrafficChartBar" [autoResize]="true" class="h-64 w-full block"></div>
      </mat-card>

      <mat-card class="shadow-md">
        <mat-card-title class="mb-0">
          <div class="px-4 py-1 flex items-center">
            <span class="text-sm">Campaign Performance</span>
            <span class="flex-grow"></span>
            <button class="text-secondary" mat-icon-button [matMenuTriggerFor]="menu2">
              <mat-icon class="text-secondary">more_vert</mat-icon>
            </button>
            <mat-menu #menu2="matMenu">
              <button mat-menu-item>
                <mat-icon>settings</mat-icon>
                <span>Campaign Settings</span>
              </button>
              <button mat-menu-item>
                <mat-icon>do_not_disturb</mat-icon>
                <span>Disable All Campaigns</span>
              </button>
              <button mat-menu-item>
                <mat-icon>close</mat-icon>
                <span>Remove panel</span>
              </button>
            </mat-menu>
          </div>
          <mat-divider></mat-divider>
        </mat-card-title>
        <mat-card-content class="!p-4">
          <div class="mb-4">
            <p class="mb-1">
              Organic Search <span class="text-secondary">| 9.8k | 90%</span>
            </p>
            <mat-progress-bar color="warn" mode="determinate" [value]="90" class="rounded h-1.5">
            </mat-progress-bar>
          </div>
          <div class="mb-4">
            <p class="mb-1">
              Direct Traffic <span class="text-secondary">| 8.3k | 80%</span>
            </p>
            <mat-progress-bar color="primary" mode="determinate" [value]="80" class="rounded h-1.5">
            </mat-progress-bar>
          </div>
          <div class="mb-4">
            <p class="mb-1">
              Referral Links <span class="text-secondary">| 5.8k | 60%</span>
            </p>
            <mat-progress-bar color="accent" mode="determinate" [value]="60" class="rounded h-1.5">
            </mat-progress-bar>
          </div>
          <div>
            <p class="mb-1">
              Paid Campaigns <span class="text-secondary">| 4.8k | 40%</span>
            </p>
            <mat-progress-bar color="warn" mode="determinate" [value]="40" class="rounded h-1.5">
            </mat-progress-bar>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!--/ End 3rd row, 1st column -->

    <!-- 3rd row, 2nd column -->
    <div class="w-full sm:w-1/2 lg:w-2/3" [@animate]="{ value: '*', params: { y: '50px', delay: '1000ms' } }">
      <div class="flex flex-wrap mb-4">
        <div class="w-full md:w-1/2 pr-0 md:pr-2">
          <mat-card class="shadow-md">
            <div class="flex flex-wrap">
              <div class="w-2/5 p-4">
                <h6 class="font-medium">Traffic</h6>
                <p class="text-2xl text-green-500 font-bold mb-0">
                  27% <span class="material-icons align-middle">arrow_drop_up</span>
                </p>
                <p class="text-secondary m-0">This Week</p>
              </div>
              <div class="w-3/5">
                <div echarts [options]="trafficGrowthChart" [autoResize]="true" class="h-36 -right-px w-full block"></div>
              </div>
            </div>
          </mat-card>
        </div>
        <div class="w-full md:w-1/2 pl-0 md:pl-2 mt-4 md:mt-0">
          <mat-card class="shadow-md">
            <div class="flex flex-wrap">
              <div class="w-2/5 p-4">
                <h6 class="font-medium">Bounce Rate</h6>
                <p class="text-2xl text-warn font-bold mb-0">
                  20% <span class="material-icons align-middle">arrow_drop_up</span>
                </p>
                <p class="text-secondary m-0">This Week</p>
              </div>
              <div class="w-3/5">
                <div echarts [options]="bounceRateGrowthChart" [autoResize]="true" class="h-36 -right-px w-full block">
                </div>
              </div>
            </div>
          </mat-card>
        </div>
      </div>

      <mat-card class="shadow-md" [@animate]="{ value: '*', params: { scale: '.9', delay: '300ms' } }">
        <mat-table [dataSource]="countryTrafficStats" matSort>
          <ng-container matColumnDef="country">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Country
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="id">
              <span class="flag-icon {{ row.flag }} mr-4 rtl:ml-4"></span>
              {{ row.country }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="visitor">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Visitors
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="progress">
              {{ row.visitor }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="pageView">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Page Views
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="name">
              {{ row.pageView }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="download">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Conversions
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="color">
              {{ row.download }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="bounceRate">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Bounce Rate
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="color">
              {{ row.bounceRate }}
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="[
            'country',
            'visitor',
            'pageView',
            'download',
            'bounceRate'
          ]"></mat-header-row>
          <mat-row *matRowDef="
            let row;
            columns: [
              'country',
              'visitor',
              'pageView',
              'download',
              'bounceRate'
            ]
          ">
          </mat-row>
        </mat-table>
      </mat-card>
    </div>
    <!--/ End 3rd row, 2nd column -->
  </div>
</div>
```

---

#### 📄 `src/app/views/dashboard/analytics/analytics.component.ts`

```typescript
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { LtemplateAnimations } from "app/shared/animations/ltemplate-animations";
import { getRgbColorFromCssVariable } from "app/shared/helpers/utils";
import { ThemeService } from "app/shared/services/theme.service";

@Component({
    selector: "app-analytics",
    templateUrl: "./analytics.component.html",
    animations: LtemplateAnimations,
    standalone: false
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;

  sessionOptions: any;
  sessions: any;
  sessionsData: any;

  trafficGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];

  constructor(
    private themeService: ThemeService
  ) {}

  ngAfterViewInit() {}

  onTabChange() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.activeTheme$().subscribe(activeTheme => {
      this.initTrafficVsSaleChart(activeTheme);
      this.initSessionsChart(activeTheme);
      this.initTrafficSourcesChart(activeTheme);
      this.initDailyTrafficChartBar(activeTheme);
      this.initTrafficGrowthChart(activeTheme);
    });

    // Initial setup with current theme
    const currentTheme = this.themeService.getActiveTheme();
    this.initTrafficVsSaleChart(currentTheme);
    this.initSessionsChart(currentTheme);
    this.initTrafficSourcesChart(currentTheme);
    this.initDailyTrafficChartBar(currentTheme);
    this.initTrafficGrowthChart(currentTheme);

    this.countryTrafficStats = [
      {
        country: "US",
        visitor: 14040,
        pageView: 10000,
        download: 1000,
        bounceRate: 30,
        flag: "flag-icon-us"
      },
      {
        country: "India",
        visitor: 12500,
        pageView: 10000,
        download: 1000,
        bounceRate: 45,
        flag: "flag-icon-in"
      },
      {
        country: "UK",
        visitor: 11000,
        pageView: 10000,
        download: 1000,
        bounceRate: 50,
        flag: "flag-icon-gb"
      },
      {
        country: "Brazil",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 30,
        flag: "flag-icon-br"
      },
      {
        country: "Spain",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 45,
        flag: "flag-icon-es"
      },
      {
        country: "Mexico",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 70,
        flag: "flag-icon-mx"
      },
      {
        country: "Russia",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 40,
        flag: "flag-icon-ru"
      }
    ];

    
    this.bounceRateGrowthChart = {
      tooltip: {
        trigger: "axis",
        backgroundColor: getRgbColorFromCssVariable('bg-card'),
        borderColor: getRgbColorFromCssVariable('fg-divider'),  
        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["0", "1", "2", "3", "4"],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Bounce Rate",
          type: "line",
          smooth: false,
          data: [0, 20, 90, 120, 190],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(244, 67, 54, 1)"
                },
                {
                  offset: 1,
                  color: "rgba(244, 67, 54, .4)"
                }
              ]
            }
          }
        }
      ]
    };
  }

  initTrafficVsSaleChart(theme) {
    // console.log(theme);
    this.trafficVsSaleOptions = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: getRgbColorFromCssVariable('bg-card'),
        borderColor: getRgbColorFromCssVariable('fg-divider'),
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "80px",
        right: "30px",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15"
        ],
        axisLabel: {
          show: true,
          margin: 20,
          color: getRgbColorFromCssVariable('fg-hint')
        },
        axisTick: {
          show: false
        },

        axisLine: {
          show: false,
          lineStyle: {
            show: false
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: getRgbColorFromCssVariable('fg-hint')
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: getRgbColorFromCssVariable('fg-divider', .7)
          }
        }
      },
      series: [
        {
          name: "Traffic",
          label: { show: false, color: getRgbColorFromCssVariable('color-primary') },
          type: "bar",
          barGap: 0,
          color: getRgbColorFromCssVariable('fg-divider'),
          smooth: true
        },
        {
          name: "Sales",
          label: { show: false, color: getRgbColorFromCssVariable('fg-hint') },
          type: "bar",
          color: getRgbColorFromCssVariable('fg-hint'),
          smooth: true
        }
      ]
    };
    
    this.trafficData = [
      1400,
      1350,
      950,
      1150,
      950,
      1260,
      930,
      1450,
      1150,
      1400,
      1350,
      950,
      1150,
      950,
      1260
    ];
    this.saleData = [
      500,
      700,
      350,
      840,
      750,
      800,
      700,
      500,
      700,
      650,
      104,
      750,
      800,
      700,
      500
    ];
    this.trafficVsSale = {
      series: [
        {
          data: this.trafficData
        },
        {
          data: this.saleData
        }
      ]
    };
  }

  initSessionsChart(theme) {
    this.sessionOptions = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: getRgbColorFromCssVariable('bg-card'),
        borderColor: getRgbColorFromCssVariable('fg-divider'),
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "60",
        right: "15",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ],
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: getRgbColorFromCssVariable('fg-hint')
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: getRgbColorFromCssVariable('fg-hint')
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: getRgbColorFromCssVariable('fg-divider', .7)
          }
        }
      },
      series: [
        {
          data: [],
          type: "line",
          name: "User",
          smooth: true,
          color: getRgbColorFromCssVariable('color-primary'),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: getRgbColorFromCssVariable('color-primary'),
              borderColor: getRgbColorFromCssVariable('color-primary', .4),
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: getRgbColorFromCssVariable('bg-card')
            }
          }
        }
      ]
    };
    this.sessionsData = [
      30,
      135,
      95,
      115,
      95,
      126,
      93,
      145,
      115,
      140,
      135,
      95,
      115,
      20,
      40,
      125,
      145,
      115,
      140,
      135,
      95,
      115,
      95,
      126,
      93,
      145,
      115,
      140,
      135,
      95
    ];

    this.sessions = {
      series: [
        {
          data: this.sessionsData
        }
      ]
    };
  }

  initTrafficSourcesChart(theme) {
    this.trafficSourcesChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: [
        getRgbColorFromCssVariable('color-primary', .6),
        getRgbColorFromCssVariable('color-primary', .7),
        getRgbColorFromCssVariable('color-primary', .8)
      ],
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        backgroundColor: getRgbColorFromCssVariable('bg-card'),
        borderColor: getRgbColorFromCssVariable('fg-divider'),
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["55%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            show: false,
            position: "center",
            fontSize: 13,
            fontWeight: "normal",
            formatter: "{a}"
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 15,
              fontWeight: "normal",
              color: "rgba(15, 21, 77, 1)",
              formatter: "{b} \n{c} ({d}%)"
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: [
            {
              value: 335,
              name: "Direct"
            },
            {
              value: 310,
              name: "Search Eng."
            },
            { value: 148, name: "Social" }
          ]
        }
      ]
    };
  }

  initDailyTrafficChartBar(theme) {
    this.dailyTrafficChartBar = {
      legend: {
        show: false
      },
      grid: {
        left: "8px",
        right: "8px",
        bottom: "0",
        top: "0",
        containLabel: true
      },
      tooltip: {
        show: true,
        backgroundColor: getRgbColorFromCssVariable('bg-card'),
        borderColor: getRgbColorFromCssVariable('fg-divider'),
      },
      xAxis: [
        {
          type: "category",
          // data: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          data: ["1", "2", "3", "4", "5", "6", "7"],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: getRgbColorFromCssVariable('fg-hint')
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false,
            formatter: "${value}"
          },
          min: 0,
          max: 100000,
          interval: 25000,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            interval: "auto"
          }
        }
      ],

      series: [
        {
          name: "Online",
          data: [35000, 69000, 22500, 60000, 50000, 50000, 30000],
          label: { show: true, color: getRgbColorFromCssVariable('color-primary'), position: "top" },
          type: "bar",
          barWidth: "12",
          color: getRgbColorFromCssVariable('color-primary'),
          smooth: true,
          itemStyle: {
            borderRadius: 10
          }
        }
      ]
    };
  }

  initTrafficGrowthChart(theme) {
    this.trafficGrowthChart = {
      tooltip: {
        trigger: "axis",
        backgroundColor: getRgbColorFromCssVariable('bg-card'),
        borderColor: getRgbColorFromCssVariable('fg-divider'),
        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["0", "1", "2", "3", "4"],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Visit",
          type: "line",
          smooth: false,
          data: [0, 40, 140, 90, 160],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: getRgbColorFromCssVariable('color-primary')
                },
                {
                  offset: 1,
                  color: getRgbColorFromCssVariable('color-primary', .6)
                }
              ]
            }
          }
        }
      ]
    };
  }

}

```

---

#### 📄 `src/app/views/dashboard/analytics-alt/analytics-alt.component.html`

```html
<div class="sm:mx-8">
  <!-- Dashboard card row -->
  <mat-card class="p-0 " [@animate]="{ value: '*', params: { opacity: '0', y: '40px', delay: '200ms' } }">
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/5 md:w-1/2">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-green-500">show_chart</mat-icon>
          <h4 class="m-0 font-semibold">148,250</h4>
          <small class="m-0 text-secondary">Page Views</small>
        </div>
      </div>
      <div class="w-full lg:w-1/5 md:w-1/2">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-primary">trending_up</mat-icon>
          <h4 class="m-0 font-semibold">4,820</h4>
          <small class="m-0 text-secondary">Conversions</small>
        </div>
      </div>
      <div class="w-full lg:w-1/5 md:w-1/2">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-green-500">query_stats</mat-icon>
          <h4 class="m-0 font-semibold">18,940</h4>
          <small class="m-0 text-secondary">Active Sessions</small>
        </div>
      </div>
      <div class="w-full lg:w-1/5 md:w-1/2">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-primary">person_outline</mat-icon>
          <h4 class="m-0 font-semibold">36,410</h4>
          <small class="m-0 text-secondary">Unique Visitors</small>
        </div>
      </div>
      <div class="w-full lg:w-1/5 md:w-1/2">
        <div class="text-center !pt-4 !pb-4">
          <mat-icon class="text-warn">schedule</mat-icon>
          <h4 class="m-0 font-semibold">4m 32s</h4>
          <small class="m-0 text-secondary">Avg. Duration</small>
        </div>
      </div>
    </div>
  </mat-card>

  <div class="flex flex-wrap">
    <div class="w-full md:w-1/3 sm:w-1/2"
      [@animate]="{ value: '*', params: { opacity: '0', y: '40px', delay: '250ms' } }">
      <mat-card class="p-0 ">
        <h6 class="ml-4 rtl:mr-4 rtl:ml-4 mt-4">Traffic vs Sales</h6>
        <div echarts [options]="monthlyTrafficChartBar" [autoResize]="true" style="height: 216px;"></div>
      </mat-card>
    </div>

    <div class="w-full md:w-1/3 sm:w-1/2"
      [@animate]="{ value: '*', params: { opacity: '0', y: '40px', delay: '300ms' } }">
      <mat-card class="p-4">
        <h6 class="">7 Day Traffic</h6>
        <div echarts [options]="dailyTrafficChartBar" [autoResize]="true" style="height: 200px;"></div>
      </mat-card>
    </div>

    <div class="w-full md:w-1/3 sm:w-1/2"
      [@animate]="{ value: '*', params: { opacity: '0', y: '40px', delay: '350ms' } }">
      <mat-card class="p-0 ">
        <h6 class=" ml-4 rtl:mr-4 rtl:ml-4 mt-4">Traffic Sources</h6>
        <div echarts [options]="dailyBandwithUsage" [autoResize]="true" style="height: 216px;"></div>
      </mat-card>
    </div>

    <div class="w-full md:w-3/5" [@animate]="{ value: '*', params: { opacity: '0', y: '40px', delay: '400ms' } }">
      <mat-card class="p-0 ">
        <mat-table [dataSource]="countryTrafficStats" matSort>
          <ng-container matColumnDef="country">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Country
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="id">
              <span class="flag-icon {{ row.flag }}"></span>
              {{ row.country }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="visitor">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Visitors
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="progress">
              {{ row.visitor }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="pageView">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Page Views
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="name">
              {{ row.pageView }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="download">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Conversions
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="color">
              {{ row.download }}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="bounceRate">
            <mat-header-cell *matHeaderCellDef mat-sort-header>
              Bounce Rate
            </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="color">
              {{ row.bounceRate }}
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="[
            'country',
            'visitor',
            'pageView',
            'download',
            'bounceRate'
          ]"></mat-header-row>
          <mat-row *matRowDef="
            let row;
            columns: [
              'country',
              'visitor',
              'pageView',
              'download',
              'bounceRate'
            ]
          ">
          </mat-row>
        </mat-table>
      </mat-card>
    </div>
    <div class="w-full md:w-2/5" [@animate]="{ value: '*', params: { opacity: '0', y: '40px', delay: '450ms' } }">
      <mat-card class="p-0 ">
        <div class="flex flex-wrap">
          <div class="w-2/5 p-4">
            <h6 class="">Traffic</h6>
            <p class="text-24 text-green font-bold mb-0">
              27% <span class="material-icons">arrow_drop_up</span>
            </p>
            <p class="m-0 text-secondary">This Week</p>
          </div>
          <div class="w-3/5">
            <div echarts [options]="trafficGrowthChart" [autoResize]="true" style="height: 150px; right: -1px"></div>
          </div>
        </div>
      </mat-card>
      <mat-card class="p-0 " [@animate]="{ value: '*', params: { opacity: '0', y: '40px', delay: '500ms' } }">
        <mat-card-title class="!mb-4">
          <div class="pl-4 flex items-center">
            <span class="text-13">Campaign Performance</span>

            <span class="flex-grow"></span>
            <button class="card-control" mat-icon-button [matMenuTriggerFor]="menu2">
              <mat-icon class="">more_vert</mat-icon>
            </button>
            <mat-menu #menu2="matMenu">
              <button mat-menu-item>
                <mat-icon>settings</mat-icon>
                <span>Campaign Settings</span>
              </button>
              <button mat-menu-item>
                <mat-icon>do_not_disturb</mat-icon>
                <span>Disable All Campaigns</span>
              </button>
              <button mat-menu-item>
                <mat-icon>close</mat-icon>
                <span>Remove panel</span>
              </button>
            </mat-menu>
          </div>
          <mat-divider></mat-divider>
        </mat-card-title>
        <mat-card-content>
          <div class="mb-4">
            <p class="mb-1">
              Facebook <span class="text-secondary">| 9.8 | 90%</span>
            </p>
            <mat-progress-bar color="accent" mode="determinate" [value]="90" class="rounded" style="height: 6px">
            </mat-progress-bar>
          </div>
          <div class="mb-4">
            <p class="mb-1">
              Google AdSense <span class="text-secondary">| 8.3 | 80%</span>
            </p>
            <mat-progress-bar class="" color="warn" mode="determinate" [value]="80" class="rounded" style="height: 6px">
            </mat-progress-bar>
          </div>
          <div class="mb-4">
            <p class="mb-1">
              Twitter <span class="text-secondary">| 5.8 | 60%</span>
            </p>
            <mat-progress-bar class="" color="accent" mode="determinate" [value]="60" class="rounded"
              style="height: 6px">
            </mat-progress-bar>
          </div>
          <div class="">
            <p class="mb-1">
              LinkedIn <span class="text-secondary">| 4.8 | 40%</span>
            </p>
            <mat-progress-bar class="" color="warn" mode="determinate" [value]="40" class="rounded" style="height: 6px">
            </mat-progress-bar>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </div>

</div>
```

---

#### 📄 `src/app/views/dashboard/analytics-alt/analytics-alt.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';
import { LayoutService } from 'app/shared/services/layout.service';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { getRgbColorFromCssVariable } from 'app/shared/helpers/utils';

@Component({
    selector: 'app-analytics-alt',
    templateUrl: './analytics-alt.component.html',
    styleUrls: ['./analytics-alt.component.scss'],
    animations: LtemplateAnimations,
    standalone: false
})
export class AnalyticsAltComponent implements OnInit {
  dailyTrafficChartBar: any;
  monthlyTrafficChartBar: any;
  dailyBandwithUsage: any;
  trafficGrowthChart: any;
  countryTrafficStats = [
    {
      country: "US",
      visitor: 14040,
      pageView: 10000,
      download: 1000,
      bounceRate: 30,
      flag: "flag-icon-us"
    },
    {
        country: "India",
        visitor: 12500,
        pageView: 10000,
        download: 1000,
        bounceRate: 45,
        flag: "flag-icon-in"
    },
    {
        country: "UK",
        visitor: 11000,
        pageView: 10000,
        download: 1000,
        bounceRate: 50,
        flag: "flag-icon-gb"
    },
    {
        country: "Brazil",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 30,
        flag: "flag-icon-br"
    },
    {
        country: "Spain",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 45,
        flag: "flag-icon-es"
    },
    {
        country: "Mexico",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 70,
        flag: "flag-icon-mx"
    },
    {
        country: "Russia",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 40,
        flag: "flag-icon-ru"
    }
  ];
  
  constructor(
    private layout: LayoutService,
    private snack: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    this.dailyTrafficChartBar = {
      legend: {
        show: false
      },
      grid: {
        left: "8px",
        right: "8px",
        bottom: "0",
        top: "0",
        containLabel: true
      },
      tooltip: {
        show: true,
        backgroundColor: "rgba(0, 0, 0, .8)"
      },
      xAxis: [
        {
          type: "category",
          // data: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          data: ["1", "2", "3", "4", "5", "6", "7"],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false,
            formatter: "${value}"
          },
          min: 0,
          max: 100000,
          interval: 25000,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            interval: "auto"
          }
        }
      ],

      series: [
        {
          name: "Online",
          data: [35000, 69000, 22500, 60000, 50000, 50000, 30000],
          label: { show: false, color: "#0168c1" },
          type: "bar",
          barWidth: "8",
          color: "#f6be1a",
          smooth: true,
          itemStyle: {
            borderRadius: 10
          }
        }
      ]
    };
    this.monthlyTrafficChartBar = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "4%",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Visit",
          type: "line",
          smooth: true,
          data: [
            140,
            135,
            95,
            115,
            95,
            126,
            93,
            145,
            115,
            140,
            135,
            95,
            115,
            95,
            126,
            125,
            145,
            115,
            140,
            135,
            95,
            115,
            95,
            126,
            93,
            145,
            115,
            140,
            135,
            95
          ],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "#f6be1a"
          },
          areaStyle: {
            color: "#f6be1a",
            opacity: 1
          }
        },
        {
          name: "Sales",
          type: "line",
          smooth: true,
          data: [
            50,
            70,
            65,
            84,
            75,
            80,
            70,
            50,
            70,
            65,
            104,
            75,
            80,
            70,
            50,
            70,
            65,
            94,
            75,
            80,
            70,
            50,
            70,
            65,
            86,
            75,
            80,
            70,
            50,
            70
          ],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "#e91f63"
          },
          areaStyle: {
            color: "#e91f63",
            opacity: 1
          }
        }
      ]
    };

    this.dailyBandwithUsage = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: ["#fcc02e", "#e91f63", "#f44336"],
      tooltip: {
        show: true,
        trigger: "item",
        backgroundColor: getRgbColorFromCssVariable('bg-card'),
        borderColor: getRgbColorFromCssVariable('fg-divider'),
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["50%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            show: false,
            position: "center",
            fontSize: 13,
            fontWeight: "normal",
            formatter: "{a}"
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: [
            {
              value: 335,
              name: "Direct"
            },
            {
              value: 310,
              name: "Search Eng."
            },
            { value: 148, name: "Social" }
          ]
        }
      ]
    };

    this.trafficGrowthChart = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "0",
          "1",
          "2",
          "3",
          "4",
          
        ],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Visit",
          type: "line",
          smooth: false,
          data: [0, 40, 140, 90, 160],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "#fcc02e"
          },
          areaStyle: {
            color: '#f44336',
            opacity: 1
          }
        }
      ]
    };
  }
  ngOnDestroy() {
    
  }
}

```

---

#### 📄 `src/app/views/dashboard/cryptocurrency/cryptocurrency.component.html`

```html
<div class="sm:mx-8">
  <mat-card class="p-0" [@animate]="{ value: '*', params: { scale: '.9', delay: '200ms' } }">
    <div class="flex flex-wrap">
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-primary">account_balance_wallet</mat-icon>
          <h4 class="m-0">5040</h4>
          <small class="m-0 text-secondary">Bitcoin Balance</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-accent">attach_money</mat-icon>
          <h4 class="m-0 ">1200</h4>
          <small class="m-0 text-secondary">USD Balance</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-primary">business_center</mat-icon>
          <h4 class="m-0 ">16420</h4>
          <small class="m-0 text-secondary">Invesment</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center !pt-4 !pb-4 border-right-light">
          <mat-icon class="text-warn">add</mat-icon>
          <h4 class="m-0 ">3010</h4>
          <small class="m-0 text-secondary">Profit</small>
        </div>
      </div>
      <div class="w-full sm:w-1/5 p-4">
        <div class="text-center !pt-4 !pb-4">
          <mat-icon class="text-warn">compare_arrows</mat-icon>
          <h4 class="m-0 ">270</h4>
          <small class="m-0 text-secondary">Transactions</small>
        </div>
      </div>
    </div>
  </mat-card>

  <div class="flex flex-wrap">
    <div class="w-full sm:w-1/2 lg:w-2/3" [@animate]="{value:'*',params:{delay:'400ms',scale:'.9'}}">
      <mat-card class="p-4">
        <div class="flex flex-wrap items-center justify-start">
          <h6 class="m-0">Bitcoin vs Ethereum </h6>
          <span class="flex-grow"></span>
          <button mat-icon-button [matMenuTriggerFor]="chartMenu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #chartMenu="matMenu">
            <button mat-menu-item>
              <span>Last 7 days</span>
            </button>
            <button mat-menu-item>
              <span>Last 30 days</span>
            </button>
          </mat-menu>
        </div>

        <div echarts [options]="cryptoChart" [autoResize]="true" style="height: 340px;"></div>
      </mat-card>
    </div>


    <div class="w-full sm:w-1/2 lg:w-1/3" [@animate]="{value:'*',params:{delay:'400ms',scale:'.9'}}">
      <div class="m-3">
        <mat-accordion multi="false">
          <mat-expansion-panel expanded="true">
            <mat-expansion-panel-header>
              <mat-panel-title>
                BTC
              </mat-panel-title>
            </mat-expansion-panel-header>
            <div class="border-bottom !pb-4 mb-4">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>BTC vs USD</span>
                <span class="flex-grow"></span>
                <span>8897.45</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-green">530(+3.73%)</small>
              </div>
            </div>
            <div class="border-bottom !pb-4 mb-4">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>BTC vs EUR</span>
                <span class="flex-grow"></span>
                <span>3829.23</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-red">430(-1.43%)</small>
              </div>
            </div>
            <div class="">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>BTC vs GBP</span>
                <span class="flex-grow"></span>
                <span>5836.79</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-green">210(+2.23%)</small>
              </div>
            </div>

          </mat-expansion-panel>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                ETH
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="border-bottom !pb-4 mb-4">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>ETH vs USD</span>
                <span class="flex-grow"></span>
                <span>8897.45</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-green">530(+3.73%)</small>
              </div>
            </div>
            <div class="border-bottom !pb-4 mb-4">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>ETH vs EUR</span>
                <span class="flex-grow"></span>
                <span>3829.23</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-red">430(-1.43%)</small>
              </div>
            </div>
            <div class="">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>ETH vs GBP</span>
                <span class="flex-grow"></span>
                <span>5836.79</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-green">210(+2.23%)</small>
              </div>
            </div>
          </mat-expansion-panel>
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                LTC
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="border-bottom !pb-4 mb-4">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>LTC vs USD</span>
                <span class="flex-grow"></span>
                <span>8897.45</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-green">530(+3.73%)</small>
              </div>
            </div>
            <div class="border-bottom !pb-4 mb-4">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>LTC vs EUR</span>
                <span class="flex-grow"></span>
                <span>3829.23</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-red">430(-1.43%)</small>
              </div>
            </div>
            <div class="">
              <div class="flex flex-wrap text-blue font-semibold">
                <span>LTC vs GBP</span>
                <span class="flex-grow"></span>
                <span>5836.79</span>
              </div>
              <div class="flex flex-wrap text-secondary">
                <small>24 hour change</small>
                <span class="flex-grow"></span>
                <small class="text-green">210(+2.23%)</small>
              </div>
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      </div>
    </div>
  </div>

  <!-- COIN ROW -->

  <div class="flex flex-wrap" [@animate]="{value:'*',params:{delay:'600ms',scale:'.9'}}">
    <div class="w-full sm:w-1/2 lg:w-1/5">
      <mat-card class="!rounded-full !flex !flex-row flex-wrap items-center p-4">
        <img class="h-12 w-12 rounded-full" src="assets/images/cryptocurrencies/BTC.png" alt="">
        <span style="width: 20px"></span>
        <div>
          <p class="m-0 text-14 text-secondary line-height-1">Bitcoin</p>
          <span class="text-18 font-bold text-green">$254 <span
              class="material-icons mat-icon-18">arrow_drop_up</span></span>
        </div>
      </mat-card>
    </div>
    <div class="w-full sm:w-1/2 lg:w-1/5">
      <mat-card class="!rounded-full !flex !flex-row flex-wrap items-center p-4">
        <img class="h-12 w-12 rounded-full" src="assets/images/cryptocurrencies/ETH.png" alt="">
        <span style="width: 20px"></span>
        <div>
          <p class="m-0 text-14 text-secondary line-height-1">Ethereum</p>
          <span class="text-18 font-bold text-red">$64 <span
              class="material-icons mat-icon-18">arrow_drop_down</span></span>
        </div>
      </mat-card>
    </div>
    <div class="w-full sm:w-1/2 lg:w-1/5">
      <mat-card class="!rounded-full !flex !flex-row flex-wrap items-center p-4">
        <img class="h-12 w-12 rounded-full" src="assets/images/cryptocurrencies/LTC.png" alt="">
        <span style="width: 20px"></span>
        <div>
          <p class="m-0 text-14 text-secondary line-height-1">Litecoin</p>
          <span class="text-18 font-bold text-green">$45 <span
              class="material-icons mat-icon-18">arrow_drop_up</span></span>
        </div>
      </mat-card>
    </div>
    <div class="w-full sm:w-1/2 lg:w-1/5">
      <mat-card class="!rounded-full !flex !flex-row flex-wrap items-center p-4">
        <img class="h-12 w-12 rounded-full" src="assets/images/cryptocurrencies/BTS.png" alt="">
        <span style="width: 20px"></span>
        <div>
          <p class="m-0 text-14 text-secondary line-height-1">BTS</p>
          <span class="text-18 font-bold text-red">$10 <span
              class="material-icons mat-icon-18">arrow_drop_down</span></span>
        </div>
      </mat-card>
    </div>
    <div class="w-full sm:w-1/2 lg:w-1/5">
      <mat-card class="!rounded-full !flex !flex-row flex-wrap items-center p-4">
        <img class="h-12 w-12 rounded-full" src="assets/images/cryptocurrencies/CNX.png" alt="">
        <span style="width: 20px"></span>
        <div>
          <p class="m-0 text-14 text-secondary line-height-1">CNX</p>
          <span class="text-18 font-bold text-green">$80 <span
              class="material-icons mat-icon-18">arrow_drop_up</span></span>
        </div>
      </mat-card>
    </div>
  </div>
  <!--/ COIN ROW -->

</div>
```

---

#### 📄 `src/app/views/dashboard/cryptocurrency/cryptocurrency.component.ts`

```typescript
import { Component, OnInit } from "@angular/core";
import { LtemplateAnimations } from "app/shared/animations/ltemplate-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from 'tinycolor2';

@Component({
    selector: "app-cryptocurrency",
    templateUrl: "./cryptocurrency.component.html",
    animations: LtemplateAnimations,
    standalone: false
})
export class CryptocurrencyComponent implements OnInit {
  cryptoChart: any;
  cryptoDonutChart: any;
  activeTrades: any[];
  trendingCurrencies: any[];
  
  constructor(    
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Subscribe to theme changes
    this.themeService.activeTheme$().subscribe(activeTheme => {
      this.initCryptoChart(activeTheme);
    });

    // Initial setup with current theme
    const currentTheme = this.themeService.getActiveTheme();
    this.initCryptoChart(currentTheme);

    this.cryptoDonutChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: ["#03A9F4", "#039BE5", "#fcc02e"],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["65%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            show: false,
            position: "center",
            fontSize: 13,
            fontWeight: "normal",
            formatter: "{a}"
          },
          labelLine: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: "normal",
              color: "rgba(0, 0, 0, 0.8)",
              formatter: "{b} \n{c} ({d}%)"
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: [
            {
              value: 335,
              name: "Direct"
            },
            {
              value: 310,
              name: "Search Eng."
            },
            { value: 148, name: "Social" }
          ]
        }
      ]
    };
    this.activeTrades = [
      {
        icon: "assets/images/cryptocurrencies/BTC.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      },
      {
        icon: "assets/images/cryptocurrencies/ADA.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      },
      {
        icon: "assets/images/cryptocurrencies/LTC.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      },
      {
        icon: "assets/images/cryptocurrencies/AE.png",
        currency: "Bitcoin",
        balance: 3000,
        buyingRate: 450,
        currentRate: 450,
        profitLoss: 400,
        lastPrice: 300
      }
    ];

    this.trendingCurrencies = [
      {
        currency: "Bitcoin",
        rate: 3800
      },
      {
        currency: "Bitcoin",
        rate: 3800
      },
      {
        currency: "Bitcoin",
        rate: 3800
      },
      {
        currency: "Bitcoin",
        rate: 3800
      }
    ];
  }

  initCryptoChart(theme) {
    this.cryptoChart = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "60",
        right: "20",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ],
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          data: [
            640,
            1040,
            840,
            1240,
            1040,
            1440,
            1240,
            1640,
            1440,
            1840,
            1640,
            2040,
            1840,
            2240,
            2040,
            2440,
            2240,
            2640,
            2440,
            2840,
            2640,
            3040,
            2840,
            3240,
            3040,
            3440,
            3240,
            3640,
            3440,
            3840
          ],
          type: "line",
          name: "Bitcoin",
          smooth: true,
          color: tinyColor(theme.baseColor).toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: tinyColor(theme.baseColor).toString(),
              borderColor: tinyColor(theme.baseColor).setAlpha(.4).toString(),
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        },
        {
          data: [
            240,
            640,
            440,
            840,
            640,
            1040,
            840,
            1240,
            1040,
            1440,
            1240,
            1640,
            1440,
            1840,
            1640,
            2040,
            1840,
            2240,
            2040,
            2440,
            2240,
            2640,
            2440,
            2840,
            2640,
            3040,
            2840,
            3240,
            3040,
            3440
          ],
          type: "line",
          name: "Ethereum (ETH)",
          smooth: true,
          color: "rgba(0, 0, 0, .3)",
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: "rgba(0, 0, 0, .5)",
              borderColor: "rgba(0, 0, 0, .2)",
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        }
      ]
    };
  }
}

```

---

#### 📄 `src/app/views/dashboard/dashboard.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule as MatTableModule } from '@angular/material/table';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart, LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
echarts.use([BarChart, GridComponent, CanvasRenderer, LegendComponent, TitleComponent, TooltipComponent, PieChart, LineChart]);

import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';

import { DashboardRoutes } from './dashboard.routing';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { LearningManagementComponent } from './learning-management/learning-management.component';
import { AnalyticsAltComponent } from './analytics-alt/analytics-alt.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgApexchartsModule,
    SharedPipesModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    AnalyticsComponent,
    CryptocurrencyComponent,
    LearningManagementComponent,
    AnalyticsAltComponent],
  exports: []
})
export class DashboardModule {

}
```

---

#### 📄 `src/app/views/dashboard/dashboard.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics/analytics.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { UserRoleGuard } from 'app/shared/guards/user-role.guard';
import { LearningManagementComponent } from './learning-management/learning-management.component';
import { AnalyticsAltComponent } from './analytics-alt/analytics-alt.component';
import { config } from 'config';

export const DashboardRoutes: Routes = [
  {
    path: 'learning-management',
    component: LearningManagementComponent,
    data: { title: 'Learning management', breadcrumb: 'Learning management', roles: config.authRoles.editor }
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    data: { title: 'Analytics', breadcrumb: 'Analytics' }
  },
  {
    path: 'analytics-alt',
    component: AnalyticsAltComponent,
    data: { title: 'Analytics Alternative', breadcrumb: 'Analytics Alternative' }
  },
  {
    path: 'crypto',
    component: CryptocurrencyComponent,
    data: { title: 'Cryptocurrency', breadcrumb: 'Cryptocurrency' }
  },
];

```

---

#### 📄 `src/app/views/dashboard/learning-management/learning-management.component.html`

```html
<div class="sm:mx-8">
  <div class="flex flex-wrap">
    <div class="w-full lg:w-3/4 md:w-3/4">
      <mat-card class="p-6" [@animate]="{ value: '*', params: { y: '50px', delay: '300ms' } }">
        <div class="flex flex-wrap justify-between">
          <div class="flex flex-col items-start  justify-center w-7/10">
            <mat-card-title class="!text-lg">Welcome Back, Watson!</mat-card-title>
            <p class="text-small text-secondary">
              You have completed <span class="font-bold">76%</span> of
              your weekly engineering goals! Keep up the momentum with upcoming courses.
            </p>
          </div>
          <div class="w-3/10">
            <apx-chart [series]="welcomeProgressChart.series" [chart]="welcomeProgressChart.chartOptions.chart"
              [grid]="welcomeProgressChart.chartOptions.grid"
              [plotOptions]="welcomeProgressChart.chartOptions.plotOptions"
              [colors]="welcomeProgressChart.chartOptions.colors" 
              [stroke]="welcomeProgressChart.chartOptions.stroke"
              [labels]="welcomeProgressChart.chartOptions.labels"
              [responsive]="welcomeProgressChart.chartOptions.responsive"></apx-chart>
          </div>
        </div>
      </mat-card>
      <div class="flex flex-wrap">
        <div class="w-full sm:w-1/2">
          <mat-card class="p-4" [@animate]="{ value: '*', params: { y: '50px', delay: '400ms' } }">
            <h5 class="mb-4">Results</h5>
            <div class="flex justify-between" *ngFor="let r of results">
              <div class="">
                <i class="material-icons text-sm text-{{r.color}} mr-2 rtl:ml-2">lens</i>
              </div>
              <div class="lm-title flex-grow">
                <p class="font-weight-semi mb-0">{{r.name}}</p>
                <p class="text-small text-secondary">{{r.date}}</p>
              </div>
              <div class="ul-progressbar flex-grow">
                <div class="progress-percentage flex">
                  <span class="flex-grow"></span>
                  <span class="text-secondary">{{r.completed}}%</span>
                </div>
                <mat-progress-bar class="rounded-md" mode="determinate" [value]="r.completed" [color]="r.color"></mat-progress-bar>
              </div>
            </div>
          </mat-card>
        </div>
        <div class="w-full sm:w-1/2">
          <mat-card class="p-4" [@animate]="{ value: '*', params: { y: '50px', delay: '400ms' } }">
            <h5>Study time last week</h5>
            <apx-chart [series]="studyChart.series" [chart]="studyChart.chartOptions.chart"
              [legend]="studyChart.chartOptions.legend" [grid]="studyChart.chartOptions.grid"
              [plotOptions]="studyChart.chartOptions.plotOptions" [colors]="studyChart.chartOptions.colors"
              [dataLabels]="studyChart.chartOptions.dataLabels" [xaxis]="studyChart.chartOptions.xaxis"
              [yaxis]="studyChart.chartOptions.yaxis"></apx-chart>
          </mat-card>
        </div>
        <div class="w-full sm:w-1/2" [@animate]="{ value: '*', params: { y: '50px', delay: '600ms' } }">
          <mat-card class="p-6">
            <div class="flex items-center">
              <div class="flex-grow">
                <h4 class="m-0">Angular 20 Architecture & Signals</h4>
                <p class="text-secondary m-0">Completed module today</p>
              </div>
              <button mat-icon-button>
                <mat-icon class="text-muted-white">play_arrow</mat-icon>
              </button>
            </div>
          </mat-card>
        </div>
        <div class="w-full sm:w-1/2" [@animate]="{ value: '*', params: { y: '50px', delay: '600ms' } }">
          <mat-card class="p-6">
            <div class="flex items-center">
              <div class="flex-grow">
                <h4 class="m-0">Modern Python 3.12 with uv</h4>
                <p class="text-secondary m-0">Completed module yesterday</p>
              </div>
              <button mat-icon-button>
                <mat-icon class="text-muted-white">play_arrow</mat-icon>
              </button>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/4 md:w-1/4" [@animate]="{ value: '*', params: { y: '50px', delay: '400ms' } }">
      <mat-card class="p-4">
        <div class="px-2 py-4 mb-6 w-full flex flex-col items-center text-center blue-100 rounded">
          <img class="mb-4" src="../../../../assets/images/illustrations/upgrade.svg" alt="">
          <p class="font-weight-normal">Upgrade to <b>PRO</b> for <br> more resources</p>
          <button mat-raised-button color="primary">UPGRADE NOW</button>
        </div>

        <h6 class="mb-4">Reminders</h6>

        <div class="flex mb-4" *ngFor="let r of reminders">
          <div class="w-[40px] h-[40px] mr-4 rtl:ml-4 rounded-full mat-bg-chip flex items-center justify-center">
            <mat-icon>{{r.icon}}</mat-icon>
          </div>
          <div class="flex flex-col justify-center flex-grow">
            <h6 class="mb-1">{{r.title}}</h6>
            <small class="text-secondary">{{r.date}}</small>
          </div>
          <button mat-icon-button>
            <mat-icon class="text-secondary">more_vert</mat-icon>
          </button>
        </div>
        <div class="my-4"></div>
        <h6 class="mb-4">Upcoming Challenges</h6>
        <div class="flex mb-4" *ngFor="let c of challenges">
          <div class="w-[40px] h-[40px] mr-4 rtl:ml-4 rounded-full mat-bg-chip flex items-center justify-center">
            <mat-icon>{{c.icon}}</mat-icon>
          </div>
          <div class="flex flex-col justify-center flex-grow">
            <h6 class="mb-1">{{c.title}}</h6>
            <small class="text-secondary">{{c.date}}</small>
          </div>
          <button mat-icon-button>
            <mat-icon class="text-secondary">more_vert</mat-icon>
          </button>
        </div>

      </mat-card>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/dashboard/learning-management/learning-management.component.scss`

```scss
// // Custom styles for ApexCharts
// :host ::ng-deep {
//   // Style for legend markers
//   .apexcharts-legend-marker {
//     border-radius: 4px !important;
//   }

//   // Style for legend text
//   .apexcharts-legend-text {
//     color: var(--fg-secondary) !important;
//     font-size: 0.875rem !important;
//     font-weight: 500 !important;
//     padding-left: 4px !important;
//   }

//   // Style for bar chart
//   .apexcharts-bar-series {
//     .apexcharts-bar-area {
//       // Ensure border radius is applied correctly
//       &:first-child {
//         border-top-left-radius: 10px !important;
//         border-top-right-radius: 10px !important;
//       }
//       &:last-child {
//         border-bottom-left-radius: 10px !important;
//         border-bottom-right-radius: 10px !important;
//       }
//     }
//   }
// }
```

---

#### 📄 `src/app/views/dashboard/learning-management/learning-management.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';
import { getRgbColorFromCssVariable } from "app/shared/helpers/utils";
import { ThemeService } from "app/shared/services/theme.service";

@Component({
    selector: 'app-learning-management',
    templateUrl: './learning-management.component.html',
    styleUrls: ['./learning-management.component.scss'],
    animations: LtemplateAnimations,
    standalone: false
})
export class LearningManagementComponent implements OnInit {

  welcomeProgressChart;

  studyChart = {
    series: [
      {
        name: 'Angular',
        data: [50, 50, 80, 80, 80, 60, 70],
        type: 'bar',
        itemStyle: {
          borderRadius: [0, 0, 10, 10],
        },
        stack: 'one',
      },
      {
        name: 'React',
        data: [70, 80, 90, 100, 70, 80, 65],
        type: 'bar',
        stack: 'one',
      },
      {
        name: 'Javascript',
        data: [65, 80, 70, 100, 90, 70, 55],
        type: 'bar',
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
        },
        stack: 'one',
      },
    ],
    chartOptions: {
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,
        toolbar: {
          show: false,
        },
        fontFamily: 'inherit',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        markers: {
          width: 16,
          height: 16,
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20px',
          borderRadius: 10,
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last'
        },
      },

      dataLabels: {
        enabled: false,
      },

      colors: ['#0081ff', '#e95455', '#e97d23'],
      xaxis: {
        axisBorder: {
          show: false,
        },

        categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri'],
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    },
  };

  courses = [
    {
      icon: 'assets/images/logos/angular.png',
      date: new Date('10 Aug, 2026'),
      name: 'Angular 20 Architecture & Signals',
      progress: 92
    },
    {
      icon: 'assets/images/logos/react.png',
      date: new Date('15 Aug, 2026'),
      name: 'Enterprise React 19 & Next.js',
      progress: 68
    },
    {
      icon: 'assets/images/logos/vue.png',
      date: new Date('22 Aug, 2026'),
      name: 'TypeScript Advanced Type System',
      progress: 54
    },
    {
      icon: 'assets/images/logos/sass.png',
      date: new Date('01 Sep, 2026'),
      name: 'Modern Sass & Tailwind Design Tokens',
      progress: 100
    },
    {
      icon: 'assets/images/logos/bootstrap.png',
      date: new Date('05 Sep, 2026'),
      name: 'Cloud Microservices with Docker',
      progress: 100
    }
  ];

  results = [
    {
      name: 'Angular 20',
      color: 'primary',
      date: '12 Sep',
      completed: 75,
    },
    {
      name: 'TypeScript',
      color: 'accent',
      date: '08 Sep',
      completed: 45,
    },
    {
      name: 'PostgreSQL',
      color: 'warn',
      date: '02 Sep',
      completed: 25,
    },
    {
      name: 'Tailwind CSS',
      color: 'primary',
      date: '28 Aug',
      completed: 90,
    },
    {
      name: 'Docker / K8s',
      color: 'primary',
      date: '20 Aug',
      completed: 98,
    },
  ];

  reminders = [
    {
      title: 'Distributed Systems Assessment',
      date: 'Tomorrow, 10:00 AM',
      icon: 'schedule'
    },
    {
      title: 'TypeScript 5.8 Strict Typing Lab',
      date: 'Thursday, 02:30 PM',
      icon: 'code'
    },
    {
      title: 'Cloud Infrastructure Workshop',
      date: 'Friday, 04:00 PM',
      icon: 'cloud_done'
    }
  ];

  challenges = [
    {
      title: 'Angular Signals State Quiz',
      date: 'Due: 18 Sep, 2026',
      icon: 'military_tech'
    },
    {
      title: 'pgvector Vector Search Hackathon',
      date: 'Due: 22 Sep, 2026',
      icon: 'emoji_events'
    },
    {
      title: 'Enterprise Architecture Audit',
      date: 'Due: 28 Sep, 2026',
      icon: 'workspace_premium'
    }
  ];
  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.activeTheme$().subscribe(activeTheme => {
      this.welcomeProgressChart = {
        series: [76],
        chartOptions: {
          chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: true,
            },
          },
          grid: {
            padding: {
              left: 0,
              right: 0,
              bottom: 10,
            },
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              offsetY: 0,
              hollow: {
                margin: 0,
                size: '60%',
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: true,
                  fontSize: '13px',
                  fontWeight: '600',
                  offsetY: -5,
                  color: getRgbColorFromCssVariable('fg-hint'),
                },
                value: {
                  color: getRgbColorFromCssVariable('color-primary'),
                  fontSize: '24px',
                  fontWeight: '600',
                  offsetY: -40,
                  show: true,
                },
              },
              track: {
                background: getRgbColorFromCssVariable('bg-hover'),
                strokeWidth: '100%',
              },
            },
          },
          colors: [getRgbColorFromCssVariable('color-primary'), getRgbColorFromCssVariable('bg-hover')],
          stroke: {
            lineCap: 'round',
          },
          labels: ['Progress'],
          responsive: [
            {
              breakpoint: 767,
              options: {
                chart: {
                  offsetX: 0,
                  offsetY: 0,
                },
              },
            },
          ],
        },
      };
    });
  }
}

```

---

#### 📄 `src/app/views/forms/basic-form/basic-form.component.html`

```html
<mat-card class="p-0">
    <mat-card-title class="">
        <div class="card-title-text pl-4 rtl:pr-4 py-3">Form validation</div>
    </mat-card-title>
    <mat-divider></mat-divider>
    <mat-card-content class="!pt-4">
        <form [formGroup]="basicForm">
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/2 md:pr-6">
                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                            <input
                            matInput
                            name="username"
                            formControlName="username"
                            placeholder="Username (Min Length: 4, Max Length: 9)"
                            value="">
                        </mat-form-field>
                        <small 
                        *ngIf="basicForm.controls['username'].hasError('minlength') && basicForm.controls['username'].touched" 
                        class="form-error-msg"> Username requires at least {{basicForm.controls['username'].errors.minlength.requiredLength}} characters </small>
                        <small 
                        *ngIf="basicForm.controls['username'].hasError('maxlength') && basicForm.controls['username'].touched" 
                        class="form-error-msg"> Username cannot contain more than {{basicForm.controls['username'].errors.maxlength.requiredLength}} characters </small>
                    </div>

                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                            <input
                            matInput
                            name="firstname"
                            formControlName="firstname"
                            placeholder="First name"
                            value="">
                        </mat-form-field>
                        <small 
                        *ngIf="basicForm.controls['firstname'].hasError('required') && basicForm.controls['firstname'].touched" 
                        class="form-error-msg"> First name is required </small>
                    </div>

                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                        <input
                            matInput
                            type="email"
                            name="email"
                            formControlName="email"
                            placeholder="Your Email"
                            value="">
                        </mat-form-field>
                        <small 
                        *ngIf="basicForm.controls['email'].hasError('required') && basicForm.controls['email'].touched" 
                        class="form-error-msg"> Email is required </small>
                        <small 
                        *ngIf="basicForm.controls['email'].hasError('email') && basicForm.controls['email'].touched" 
                        class="form-error-msg"> Invalid email address </small>
                    </div>

                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                        <input
                            matInput
                            name="website"
                            formControlName="website"
                            placeholder="Website URL (https://ltemplate.dev)"
                            value="">
                        </mat-form-field>
                    </div>

                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                            <input 
                            matInput
                            name="date"
                            formControlName="date"
                            placeholder="Date" 
                            [matDatepicker]="appDatepicker">
                            
                            <mat-datepicker-toggle matSuffix [for]="appDatepicker"></mat-datepicker-toggle>
                        </mat-form-field>
                        <mat-datepicker #appDatepicker></mat-datepicker>
                    </div>
                </div>

                <div class="w-full md:w-1/2">
                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                            <input 
                            matInput
                            name="cardno"
                            formControlName="cardno"
                            placeholder="Credit card number">
                        </mat-form-field>
                        
                    </div>

                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                        <input 
                            type="password"
                            name="password"
                            matInput
                            formControlName="password"
                            placeholder="Password" 
                            value="">
                        </mat-form-field>
                        <small 
                        *ngIf="basicForm.controls['password'].hasError('required') && basicForm.controls['password'].touched" 
                        class="form-error-msg"> Password is required </small>
                    </div>

                    <div class="!pb-4">
                        <mat-form-field class="full-width">
                        <input
                            type="password"
                            name="confirmPassword"
                            matInput
                            appEqualValidator="password"
                            formControlName="confirmPassword"
                            placeholder="Confirm Password"
                            value="">
                        </mat-form-field>
                        
                    </div>

                    <div class="!pb-4">
                        <Label>Gender*</Label>
                        <mat-radio-group 
                        name="gender" 
                        formControlName="gender" >
                            <mat-radio-button value="male" class="mx-12">Male</mat-radio-button>
                            <mat-radio-button value="female">Female</mat-radio-button>
                        </mat-radio-group>
                    </div>
                    
                    <div class="!pb-4 pt-8">
                        <mat-checkbox
                        name="agreed"
                        formControlName="agreed" 
                        class="!pb-4">I have read and agree to the Terms of Service.</mat-checkbox>

                        <small 
                            *ngIf="basicForm.controls['agreed'].hasError('agreed') && basicForm.controls['agreed'].touched" 
                            class="form-error-msg"> You must agree to the Terms of Service </small>
                    </div>
                </div>
            </div>
            <button 
            mat-raised-button 
            color="primary" 
            [disabled]="basicForm.invalid">Submit</button>
        </form>
    </mat-card-content>
</mat-card>


```

---

#### 📄 `src/app/views/forms/basic-form/basic-form.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-basic-form',
    templateUrl: './basic-form.component.html',
    standalone: false
})
export class BasicFormComponent implements OnInit {
  formData = {}
  console = console;
  basicForm: UntypedFormGroup;

  constructor() { }

  ngOnInit() {
    let password = new UntypedFormControl('', Validators.required);
    let confirmPassword = new UntypedFormControl('');

    this.basicForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      firstname: new UntypedFormControl('', [
        Validators.required
      ]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email
      ]),
      website: new UntypedFormControl(''),
      date: new UntypedFormControl(),
      cardno: new UntypedFormControl(''),
      password: password,
      confirmPassword: confirmPassword,
      gender: new UntypedFormControl(''),
      agreed: new UntypedFormControl('', (control: UntypedFormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }
}
```

---

#### 📄 `src/app/views/forms/forms.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule as MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { QuillModule } from 'ngx-quill';

import { BasicFormComponent } from './basic-form/basic-form.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';

import { FormsRoutes } from './forms.routing';
import { WizardComponent } from './wizard/wizard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    QuillModule.forRoot(),
    RouterModule.forChild(FormsRoutes),
  ],
  declarations: [RichTextEditorComponent, WizardComponent, BasicFormComponent],
})
export class AppFormsModule {}

```

---

#### 📄 `src/app/views/forms/forms.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { BasicFormComponent } from './basic-form/basic-form.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { WizardComponent } from './wizard/wizard.component';

export const FormsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        component: BasicFormComponent,
        data: { title: 'Basic', breadcrumb: 'BASIC' }
      },
      {
        path: 'editor',
        component: RichTextEditorComponent,
        data: { title: 'Editor', breadcrumb: 'EDITOR' }
      }, {
        path: 'wizard',
        component: WizardComponent,
        data: { title: 'Wizard', breadcrumb: 'WIZARD' }
      }]
  }
];
```

---

#### 📄 `src/app/views/forms/rich-text-editor/rich-text-editor.component.html`

```html
<mat-card class="p-0">
  
  <mat-card-content class="p-0">
    <quill-editor 
    theme="snow" 
    [(ngModel)]="editorData" 
    (onContentChanged)="onContentChanged()" 
    onSelectionChanged="onSelectionChanged()"></quill-editor>
  </mat-card-content>
</mat-card>

```

---

#### 📄 `src/app/views/forms/rich-text-editor/rich-text-editor.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    styleUrls: [
        './rich-text-editor.component.css'
    ],
    standalone: false
})
export class RichTextEditorComponent implements OnInit {

  editorData = `<h2>Enterprise Platform Release v4.2</h2>
  <p>We are excited to introduce key architecture improvements and monitoring features in this release:</p>
  <ul>
    <li><strong>Real-time Telemetry:</strong> Instant metrics streaming with optimized WebSocket pipelines.</li>
    <li><strong>Role-Based Access Control:</strong> Fine-grained policy evaluation across microservices.</li>
    <li><strong>Automated Reports:</strong> Export high-fidelity audit trails and analytical summaries.</li>
  </ul>
  <p>To learn more about configuration and deployment patterns, consult the architecture documentation.</p>`;

  constructor() { }

  ngOnInit() {
  }

  onContentChanged() { }
  onSelectionChanged() { }
}

```

---

#### 📄 `src/app/views/forms/wizard/wizard.component.html`

```html
<mat-card class="p-0">
  <mat-card-title class="">
    <div class="card-title-text pl-4 rtl:pr-4 py-3">Horizontal Stepper</div>
  </mat-card-title>
  <mat-divider></mat-divider>
  <mat-card-content class="!pt-4">
    <mat-horizontal-stepper [linear]="true">
      <mat-step [stepControl]="firstFormGroup">
        <form [formGroup]="firstFormGroup">
          <ng-template matStepLabel>Personal Details</ng-template>
          <mat-form-field class="!pt-4 !pb-4">
            <input matInput placeholder="Last name, First name" formControlName="firstCtrl" required>
          </mat-form-field>
          <div>
            <button mat-raised-button color="primary" matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup">
        <form [formGroup]="secondFormGroup">
          <ng-template matStepLabel>Contact & Address</ng-template>
          <mat-form-field class="!pt-4 !pb-4">
            <input matInput placeholder="Address" formControlName="secondCtrl" required>
          </mat-form-field>
          <div class="flex flex-row">
            <button mat-raised-button color="accent" matStepperPrevious class="!mr-3">Back</button>
            <button mat-raised-button color="primary" matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Review & Confirmation</ng-template>
        <div>
          <mat-icon class="!pt-4" [style.fontSize]="'36px'">check</mat-icon>
        </div>
        <div class="!pb-4 mb-4">All steps completed successfully. Ready to review and submit.</div>
        <div class="flex flex-row">
          <button mat-raised-button color="accent" matStepperPrevious class="!mr-3">Back</button>
          <button mat-raised-button color="primary" (click)="submit()">Submit</button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  </mat-card-content>
</mat-card>

<mat-card class="p-0">
  <mat-card-title class="">
    <div class="card-title-text pl-4 rtl:pr-4 py-3">Vertical Stepper</div>
    <mat-divider></mat-divider>
  </mat-card-title>
  <mat-card-content class="!pt-4">
    <mat-vertical-stepper [linear]="true">
      <mat-step [stepControl]="firstFormGroup">
        <form [formGroup]="firstFormGroup">
          <ng-template matStepLabel>Personal Details</ng-template>
          <mat-form-field>
            <input matInput placeholder="Last name, First name" formControlName="firstCtrl" required>
          </mat-form-field>
          <div>
            <button mat-raised-button color="primary" matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup">
        <form [formGroup]="secondFormGroup">
          <ng-template matStepLabel>Contact & Address</ng-template>
          <mat-form-field>
            <input matInput placeholder="Address" formControlName="secondCtrl" required>
          </mat-form-field>
          <div class="flex flex-row">
            <button mat-raised-button color="accent" matStepperPrevious class="!mr-3">Back</button>

            <button mat-raised-button color="primary" matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Review & Confirmation</ng-template>
        <div>
          <mat-icon class="!pt-4" [style.fontSize]="'36px'">check</mat-icon>
        </div>
        <div class="!pb-4 mb-4">All steps completed successfully. Ready to review and submit.</div>
        <div>
          <button mat-raised-button color="accent" matStepperPrevious>Back</button>
        </div>
      </mat-step>
    </mat-vertical-stepper>
  </mat-card-content>
</mat-card>
```

---

#### 📄 `src/app/views/forms/wizard/wizard.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.css'],
    standalone: false
})
export class WizardComponent implements OnInit {
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }
  
  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }
}

```

---

#### 📄 `src/app/views/invoice/invoice-details/invoice-details.component.html`

```html
<div class="container">
  <!-- Edit Invoice -->
  <mat-card *ngIf="showEditOption" class="p-4">
    <form [formGroup]="invoiceForm" (ngSubmit)="saveInvoice()">
      <div class="flex justify-end items-center">
        <button mat-button type="button" class="ml-1 mr-1" *ngIf="!isLoading"
          (click)="showEditOption = !showEditOption">
          Cancel
        </button>

        <button-loading [loadingText]="'Saving...'" color="primary" [type]="'submit'"
          [loading]="isLoading">Save</button-loading>
      </div>

      <!-- order details -->
      <div class="flex flex-wrap justify-between order-info">
        <div class="flex flex-col w-1/3">
          <h4>Order Info</h4>
          <p>Order Number</p>
          <mat-form-field>
            <input formControlName="orderNo" matInput required placeholder="Order No." />
          </mat-form-field>
        </div>

        <div class="flex flex-col w-1/3">
          <div>
            <mat-radio-group class="flex flex-col justify-end items-end mb-5" required>
              <mat-radio-button labelPosition="before" value="pending" class="mb-1">Pending</mat-radio-button>
              <mat-radio-button labelPosition="before" value="processing" class="mb-1">Processing</mat-radio-button>
              <mat-radio-button labelPosition="before" value="delivered" class="mb-1">Delivered</mat-radio-button>
            </mat-radio-group>
          </div>

          <div>
            <p class="align-right">Order Date</p>
            <mat-form-field class="w-full">
              <input matInput [matDatepicker]="picker" required placeholder="Choose a date" formControlName="date" />
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>
        </div>
      </div>
      <!-- end of order details -->

      <mat-divider></mat-divider>

      <!-- billing details -->
      <div class="billing-address flex flex-wrap justify-between items-center">
        <!-- seller -->
        <div formGroupName="seller" class="flex flex-col w-1/3">
          <h4 class="mb-5">Bill From</h4>
          <mat-form-field class="mb-5">
            <input formControlName="name" matInput required placeholder="Name of Seller" />
          </mat-form-field>
          <mat-form-field class="mb-5">
            <textarea formControlName="address" matInput required matTextareaAutosize
              placeholder="Address of Seller"></textarea>
          </mat-form-field>
        </div>

        <!-- buyer -->
        <div formGroupName="buyer" class="flex flex-col justify-center items-end w-1/3">
          <h4>Bill To</h4>
          <mat-form-field class="w-full">
            <input formControlName="name" matInput required placeholder="Name of Buyer" />
          </mat-form-field>
          <mat-form-field class="w-full">
            <textarea formControlName="address" matInput required matTextareaAutosize
              placeholder="Address of Buyer"></textarea>
          </mat-form-field>
        </div>
      </div>
      <!-- end of billing details -->

      <!-- item form table -->
      <div formArrayName="item" class="item-form-list flex flex-col">
        <div class="item-form-list-head-line flex justify-around items-center mb-4">
          <p>#</p>
          <p>Item Name</p>
          <p>Unit Price</p>
          <p>Unit</p>
          <p>Cost</p>
          <p></p>
        </div>

        <div *ngFor="let item of invoiceItemFormArray.controls; let i = index" [formGroup]="item"
          class="form-rows flex justify-around items-center">
          <span>{{ i + 1 }}</span>
          <mat-form-field>
            <input formControlName="name" matInput placeholder="Item Name" #name required />
          </mat-form-field>
          <mat-form-field>
            <input type="number" formControlName="price" matInput placeholder="Item Price" #price required />
          </mat-form-field>
          <mat-form-field>
            <input type="number" formControlName="unit" matInput placeholder="Item Unit" #unit required />
          </mat-form-field>
          <span>{{ unit.value * price.value }}</span>
          <button mat-button type="button" (click)="deleteItemFromInvoice(i)">
            Delete
          </button>
        </div>
        <!-- end of item form table -->

        <!-- add item button -->
        <div class="add-button">
          <button mat-button type="button" (click)="addNewItem(emptyFormObject)">
            Add Item
          </button>
        </div>
      </div>

      <!-- total cost of item form -->
      <div class="form-total-cost flex flex-col justify-center items-end">
        <!-- sub total -->
        <div class="flex justify-between items-center mb-3">
          <span>Sub Total:</span>
          <span>{{ currency }}{{ cost }}</span>
        </div>

        <!-- vat -->
        <div class="flex justify-between items-center mb-3">
          <span>Vat(%):</span>
          <div class="flex justify-end items-center">
            <mat-form-field class="mb-3">
              <input type="number" formControlName="vat" matInput placeholder="vat" required />
            </mat-form-field>
            <span>{{ currency }}{{ vat }}</span>
          </div>
        </div>

        <!-- grand total -->
        <div class="flex justify-between items-center">
          <h5>Grand Total:</h5>
          <div class="flex justify-end items-center">
            <mat-form-field class="mb-3">
              <input formControlName="currency" matInput placeholder="currency" required />
            </mat-form-field>
            <h5>
              <strong>{{ currency }}{{ cost + vat }}</strong>
            </h5>
          </div>
        </div>
      </div>
      <!-- end of total cost -->
    </form>
  </mat-card>
  <!-- end of edit invoice -->
  <!-- =================================================== -->

  <!-- =================================================== -->
  <!-- invoice details -->
  <mat-card *ngIf="!showEditOption" class="invoice-details p-4">
    <div class="flex">
      <button mat-icon-button routerLink="/invoice/list">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span class="flex-grow"></span>

      <button mat-flat-button color="primary" class="ml-4 rtl:mr-4 rtl:ml-4 mr-4 rtl:ml-4"
        (click)="showEditOption = !showEditOption">
        Edit Invoice
      </button>
      <button mat-flat-button color="accent" (click)="print()">
        Print Invoice
      </button>
    </div>
    <div id="print-area">
      <!-- order details -->
      <div class="order-info flex justify-between">
        <div>
          <h4>Order Info</h4>
          <p>Order Number</p>
          <p># {{ invoice?.orderNo }}</p>
        </div>

        <div>
          <p><strong>Order status: </strong> {{ invoice?.status }}</p>
          <p><strong>Order date: </strong> {{ invoice?.date | date }}</p>
        </div>
      </div>
      <!-- end of order details -->

      <mat-divider></mat-divider>

      <!-- billing details -->
      <div class="billing-address flex justify-between">
        <!-- seller -->
        <div>
          <h4>Bill From</h4>
          <p>{{ invoice?.seller?.name }}</p>
          <p>{{ invoice?.seller?.address }}</p>
        </div>

        <!-- buyer -->
        <div>
          <h4>Bill To</h4>
          <p>{{ invoice?.buyer?.name }}</p>
          <p>{{ invoice?.buyer?.address }}</p>
        </div>
      </div>
      <!-- end of billing details -->

      <!-- item table -->
      <div class="item-table mb-6">
        <mat-table [dataSource]="invoice.item" class="" #table>
          <!-- Number Column -->
          <ng-container matColumnDef="{{ itemTableColumn[0] }}">
            <mat-header-cell *matHeaderCellDef> # </mat-header-cell>
            <mat-cell *matCellDef="let element; let i = index">
              {{ i + 1 }}
            </mat-cell>
          </ng-container>

          <!-- Item Name Column -->
          <ng-container matColumnDef="{{ itemTableColumn[1] }}">
            <mat-header-cell *matHeaderCellDef>
              {{ itemTableColumn[1] }}
            </mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.name }} </mat-cell>
          </ng-container>

          <!-- Unit price Column -->
          <ng-container matColumnDef="{{ itemTableColumn[2] }}">
            <mat-header-cell *matHeaderCellDef>
              {{ itemTableColumn[2] }}
            </mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.price }} </mat-cell>
          </ng-container>

          <!-- Unit Column -->
          <ng-container matColumnDef="{{ itemTableColumn[3] }}">
            <mat-header-cell *matHeaderCellDef>
              {{ itemTableColumn[3] }}
            </mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.unit }} </mat-cell>
          </ng-container>

          <!-- Cost column -->
          <ng-container matColumnDef="{{ itemTableColumn[4] }}">
            <mat-header-cell *matHeaderCellDef>
              {{ itemTableColumn[4] }}
            </mat-header-cell>
            <mat-cell *matCellDef="let element">
              {{ element.unit * element.price }}
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="itemTableColumn"></mat-header-row>
          <mat-row *matRowDef="let row; columns: itemTableColumn"></mat-row>
        </mat-table>
      </div>
      <!-- end of table -->

      <!-- total cost -->
      <div class="total-cost flex justify-end">
        <div>
          <p>Sub Total:</p>
          <p>Vat:</p>
          <h5>Grand Total:</h5>
        </div>

        <div>
          <p>{{ currency }}{{ cost }}</p>
          <p>{{ currency }}{{ vat.toFixed(2) }}</p>
          <h5>
            <strong>{{ currency }}{{ (cost + vat).toFixed(2) }}</strong>
          </h5>
        </div>
      </div>
      <!-- end of total cost -->
    </div>
  </mat-card>
</div>
```

---

#### 📄 `src/app/views/invoice/invoice-details/invoice-details.component.ts`

```typescript
import { Subscription } from 'rxjs';
import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, DOCUMENT } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice, InvoiceItem } from 'app/shared/models/invoice.model';
import { Inject } from '@angular/core';


@Component({
    selector: 'app-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  cost = 0;
  vat = 0;
  currency = '$';
  showEditOption = false;
  isLoading = false;
  invoiceForm: UntypedFormGroup;
  invoiceFormSub: Subscription;
  invocieId: number;
  invoice: Invoice = {
    item: []
  };

  emptyFormObject: InvoiceItem = {
    name: '',
    price: null,
    unit: null
  };

  itemTableColumn: string[] = [
    'Number',
    'Item Name',
    'Unit Price',
    'Unit',
    'Cost'
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.invocieId = this.route.snapshot.params['id'];
    if (this.invocieId) {
      this.getInvoice();
      this.showEditOption = false;
    } else {
      this.buildInvoiceForm();
      this.showEditOption = true;
    }

    // Add class for print media check _invoice.scss
    this.document.body.classList.add('print-body-content');
  }
  ngOnDestroy() {
    this.document.body.classList.remove('print-body-content');
  }

  getInvoice() {
    this.invoiceService.getInvoiceById(this.invocieId).subscribe((invoice: Invoice) => {
      this.invoice = invoice;
      this.buildInvoiceForm(this.invoice);
      this.calculateCost(this.invoice);
      this.cdr.markForCheck();
    });
  }

  buildInvoiceForm(invoice?: Invoice) {
    this.invoiceForm = this.fb.group({
      id: [invoice ? invoice.id : ''],
      orderNo: [invoice ? invoice.orderNo : ''],
      status: invoice ? invoice.status : '',
      date: invoice ? new Date(invoice.date) : '',
      vat: invoice ? invoice.vat : 0,
      currency: invoice ? invoice.currency : '',
      seller: this.fb.group({
        name: [invoice ? invoice.seller.name : ''],
        address: [invoice ? invoice.seller.address : ''],
      }),
      buyer: this.fb.group({
        name: [invoice ? invoice.buyer.name : ''],
        address: [invoice ? invoice.buyer.address : ''],
      }),
      item: this.fb.array([])
    });

    this.invoice.item.forEach(i => {
      this.addNewItem(i);
    });

    if (this.invoiceFormSub){
      this.invoiceFormSub.unsubscribe();
    }

    this.invoiceFormSub = this.invoiceForm.valueChanges.subscribe(res => {
      this.calculateCost(res);
    });

  }

  calculateCost(invoice: Invoice) {
    this.cost = 0;
    invoice.item.forEach(element => {
      this.cost += element.unit * element.price;
    });
    this.vat = (invoice.vat * this.cost) / 100;
    this.currency = invoice.currency;
  }

  addNewItem(item: InvoiceItem) {
    this.invoiceItemFormArray.push(
      this.fb.group({
        name: [item ? item.name : ''],
        price: [item ? item.price : ''],
        unit: [item ? item.unit : '']
      })
    );
  }

  deleteItemFromInvoice(i: number) {
    this.invoiceItemFormArray.removeAt(i);
  }

  saveInvoice() {
    if (this.invoiceForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.invoiceService.saveInvoice(this.invoiceForm.value)
    .subscribe( (res: Invoice) => {
      this.invoice = this.invoiceForm.value;
      this.isLoading = false;
      this.showEditOption = false;

      this.cdr.markForCheck();

      if (res) {
        this.router.navigateByUrl('/invoice/' + res.id);
      }
    });
  }

  print() {
    window.print();
  }

  get invoiceItemFormArray(): UntypedFormArray {
    return this.invoiceForm.get('item') as UntypedFormArray;
  }
}

```

---

#### 📄 `src/app/views/invoice/invoice-list/invoice-list.component.html`

```html
<div class="container">
  <div class="flex justify-end mt-4">
    <button mat-flat-button color="primary" [routerLink]="['/invoice/add']" routerLinkActive="router-link-active"
      class="mb-4">
      Add Invoice
    </button>
  </div>
  <table mat-table [dataSource]="invoiceList" class="Ltemplate-card">
    <!-- Number Column -->
    <ng-container matColumnDef="{{ itemTableColumn[0] }}">
      <th mat-header-cell *matHeaderCellDef>
        {{ itemTableColumn[0] }}
      </th>
      <td mat-cell *matCellDef="let element"> {{ element.orderNo }} </td>
    </ng-container>

    <!-- Bill from Column -->
    <ng-container matColumnDef="{{ itemTableColumn[1] }}">
      <th mat-header-cell *matHeaderCellDef>
        {{ itemTableColumn[1] }}
      </th>
      <td mat-cell *matCellDef="let element"> {{ element.seller.name }} </td>
    </ng-container>

    <!-- Bill to Column -->
    <ng-container matColumnDef="{{ itemTableColumn[2] }}">
      <th mat-header-cell *matHeaderCellDef>
        {{ itemTableColumn[2] }}
      </th>
      <td mat-cell *matCellDef="let element"> {{ element.buyer.name }} </td>
    </ng-container>

    <!-- Status Column -->
    <ng-container matColumnDef="{{ itemTableColumn[3] }}">
      <th mat-header-cell *matHeaderCellDef>
        {{ itemTableColumn[3] }}
      </th>
      <td mat-cell *matCellDef="let element" style="text-transform: capitalize;">
        <mat-chip color="primary" [selected]="element.status === 'delivered'">
          {{ element.status }}
        </mat-chip>
      </td>
    </ng-container>

    <!-- Action column -->
    <ng-container matColumnDef="{{ itemTableColumn[4] }}">
      <th mat-header-cell *matHeaderCellDef>
        {{ itemTableColumn[4] }}
      </th>
      <td mat-cell *matCellDef="let row">
        <button mat-icon-button routerLink="/invoice/{{ row.id }}" routerLinkActive="router-link-active"
          color="primary">
          <mat-icon>visibility</mat-icon>
        </button>
        <button mat-icon-button (click)="deleteInvoiceById(row.id)" color="warn">
          <mat-icon>delete</mat-icon>
        </button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="itemTableColumn"></tr>
    <tr mat-row *matRowDef="let row; columns: itemTableColumn"></tr>
  </table>
</div>
```

---

#### 📄 `src/app/views/invoice/invoice-list/invoice-list.component.ts`

```typescript
import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { MatTable as MatTable } from "@angular/material/table";
import { InvoiceService } from "../invoice.service";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";
import { Invoice } from "app/shared/models/invoice.model";

@Component({
    selector: "app-invoice-list",
    templateUrl: "./invoice-list.component.html",
    styleUrls: ["./invoice-list.component.scss"],
    standalone: false
})
export class InvoiceListComponent implements OnInit {
  @ViewChild(MatTable) itemTable: MatTable<any>;
  invoiceList: Invoice[];

  itemTableColumn: string[] = [
    "Order No.",
    "Bill From",
    "Bill To",
    "Status",
    "Actions"
  ];

  constructor(
    private invoiceService: InvoiceService,
    private confirmService: AppConfirmService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getInvoiceList();
  }

  getInvoiceList() {
    this.invoiceService.getInvoiceList()
    .subscribe((res: Invoice[]) => {
      this.invoiceList = res;
      // console.log(res);
      this.cdr.detectChanges();
    });
  }

  deleteInvoiceById(id) {
    this.confirmService
      .confirm({ title: "Confirm", message: "Are you sure to delete?" })
      .subscribe(res => {
        if (res) {
          this.invoiceService.deleteInvoice(id).subscribe(e => {
            this.getInvoiceList();
          });
          this.itemTable.renderRows();
        } else return;
      });
  }
}

```

---

#### 📄 `src/app/views/invoice/invoice-routing.module.ts`

```typescript
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { Component } from "@angular/core";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InvoiceDetailsComponent } from "./invoice-details/invoice-details.component";

const routes: Routes = [
  {
    path: "list",
    component: InvoiceListComponent,
    pathMatch: "full"
  },
  {
    path: "add",
    component: InvoiceDetailsComponent,
    pathMatch: "full"
  },
  {
    path: ":id",
    component: InvoiceDetailsComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}

```

---

#### 📄 `src/app/views/invoice/invoice.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceService } from './invoice.service';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { commonMaterialModules, allMaterialModules } from 'app/shared/material-imports';

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ...commonMaterialModules,
    ...allMaterialModules,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  declarations: [InvoiceListComponent, InvoiceDetailsComponent],
  providers: [InvoiceService]
})

export class InvoiceModule { }

```

---

#### 📄 `src/app/views/invoice/invoice.service.ts`

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceDB } from '../../shared/inmemory-db/invoices';
import { Observable, delay, of } from 'rxjs';
import { Invoice } from 'app/shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoiceList(): Observable<Invoice[]> {
    return of(InvoiceDB.invoices)
    // return this.http.get('/api/invoices/');
  }

  getInvoiceById(id): Observable<Invoice> {
    let invoice: Invoice = InvoiceDB.invoices.find((inv: Invoice) => inv.id == id)
    return of(invoice);
    // return this.http.get('/api/invoices/'+id);
  }
  
  saveInvoice(invoice) {
    if(invoice.id) {
      const updatedList = InvoiceDB.invoices.map(inv => {
        if(inv.id === invoice.id) {
          return invoice;
        }
        return inv;
      });
      InvoiceDB.invoices = [...updatedList];
      return of(invoice).pipe(delay(400));
      // return this.http.put('/api/invoices/'+invoice.id, invoice);
    } else {
      invoice.id = (Math.random() * 1000000000).toString();
      InvoiceDB.invoices.push(invoice);
      return of(invoice);
      // return this.http.post('/api/invoices/', invoice);
    }
  }

  deleteInvoice(id) {
    const updatedList = InvoiceDB.invoices.filter(inv => inv.id !== id);
    InvoiceDB.invoices = [...updatedList];
    return of(true);
    // return this.http.delete('/api/invoices/'+id);
  }

}

```

---

#### 📄 `src/app/views/map/map.component.html`

```html
<div class="flex flex-wrap">
  <div class="w-full md:w-1/2">
    <div *ngIf="apiLoaded | async" class="mx-16">
        <google-map></google-map>
    </div>
  </div>

</div>
```

---

#### 📄 `src/app/views/map/map.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    standalone: false
})
export class MapComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  zoom = 6;
  mapCenter = {
    lat: 23.806921,
    lng: 90.377078
  }
  polylinePoints = [
    { lat: 24.847916, lng: 89.369764 },
    { lat: 23.806921, lng: 90.377078 },
    { lat: 24.919298, lng: 91.831699 }
  ];
  circleMapRadius = 50000;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  ngOnInit() {
  }

  circleMapRadiusChange(radius) {
    this.circleMapRadius = radius;
    // console.log(e)
  }
}

```

---

#### 📄 `src/app/views/map/map.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';

import { MapComponent } from './map.component';
import { MapRoutes } from "./map.routing";

@NgModule({ declarations: [MapComponent], imports: [CommonModule,
        MatCardModule,
        MatListModule,
        GoogleMapsModule,
        RouterModule.forChild(MapRoutes)], providers: [provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())] })
export class AppMapModule { }

```

---

#### 📄 `src/app/views/map/map.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { MapComponent } from './map.component';


export const MapRoutes: Routes = [
  { path: '', component: MapComponent, data: { title: 'Google map' } }
];
```

---

#### 📄 `src/app/views/mat-icons/mat-icons.component.html`

```html
<mat-card class="p-4 mb-4">
  <mat-card-content>
    <h6 class="mb-4">HTML</h6>
    <p class="!mb-6"><code>&#x3c;mat-icon&#x3e;3d_rotation&#x3c;/mat-icon&#x3e;</code></p>
    <h6 class="mb-1">Output</h6>
    <mat-icon>3d_rotation</mat-icon>
  </mat-card-content>
</mat-card>

<mat-card class="p-4">
  <mat-card-title class="border-bottom !mb-8">
    <div class="card-title-text">Icon list</div>
  </mat-card-title>
  <mat-card-content>
    <div
    class="text-center flex flex-wrap justify-start items-stretch">
      <div
      class="mb-12 w-1/2 lg:w-1/6 md:2/6 sm:w-3/6"
      *ngFor="let icon of icons">
        <mat-icon
        class="mb-4">{{icon}}</mat-icon> <br>
        <div>{{icon}}</div>
      </div>
    </div>
  </mat-card-content>
</mat-card>

```

---

#### 📄 `src/app/views/mat-icons/mat-icons.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mat-icons',
    templateUrl: './mat-icons.component.html',
    styleUrls: ['./mat-icons.component.css'],
    standalone: false
})
export class MatIconsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  icons = ['3d_rotation', 'ac_unit', 'access_alarm', 'access_alarms', 'access_time', 'accessibility', 'accessible', 'account_balance', 'account_balance_wallet', 'account_box', 'account_circle', 'adb', 'add', 'add_a_photo', 'add_alarm', 'add_alert', 'add_box', 'add_circle', 'add_circle_outline', 'add_location', 'add_shopping_cart', 'add_to_photos', 'add_to_queue', 'adjust', 'airline_seat_flat', 'airline_seat_flat_angled', 'airline_seat_individual_suite', 'airline_seat_legroom_extra', 'airline_seat_legroom_normal', 'airline_seat_legroom_reduced', 'airline_seat_recline_extra', 'airline_seat_recline_normal', 'airplanemode_active', 'airplanemode_inactive', 'airplay', 'airport_shuttle', 'alarm', 'alarm_add', 'alarm_off', 'alarm_on', 'album', 'all_inclusive', 'all_out', 'android', 'announcement', 'apps', 'archive', 'arrow_back', 'arrow_downward', 'arrow_drop_down', 'arrow_drop_down_circle', 'arrow_drop_up', 'arrow_forward', 'arrow_upward', 'art_track', 'aspect_ratio', 'assessment', 'assignment', 'assignment_ind', 'assignment_late', 'assignment_return', 'assignment_returned', 'assignment_turned_in', 'assistant', 'assistant_photo', 'attach_file', 'attach_money', 'attachment', 'audiotrack', 'autorenew', 'av_timer', 'backspace', 'backup', 'battery_alert', 'battery_charging_full', 'battery_full', 'battery_std', 'battery_unknown', 'beach_access', 'beenhere', 'block', 'bluetooth', 'bluetooth_audio', 'bluetooth_connected', 'bluetooth_disabled', 'bluetooth_searching', 'blur_circular', 'blur_linear', 'blur_off', 'blur_on', 'book', 'bookmark', 'bookmark_border', 'border_all', 'border_bottom', 'border_clear', 'border_color', 'border_horizontal', 'border_inner', 'border_left', 'border_outer', 'border_right', 'border_style', 'border_top', 'border_vertical', 'branding_watermark', 'brightness_1', 'brightness_2', 'brightness_3', 'brightness_4', 'brightness_5', 'brightness_6', 'brightness_7', 'brightness_auto', 'brightness_high', 'brightness_low', 'brightness_medium', 'broken_image', 'brush', 'bubble_chart', 'bug_report', 'build', 'burst_mode', 'business', 'business_center', 'cached', 'cake', 'call', 'call_end', 'call_made', 'call_merge', 'call_missed', 'call_missed_outgoing', 'call_received', 'call_split', 'call_to_action', 'camera', 'camera_alt', 'camera_enhance', 'camera_front', 'camera_rear', 'camera_roll', 'cancel', 'card_giftcard', 'card_membership', 'card_travel', 'casino', 'cast', 'cast_connected', 'center_focus_strong', 'center_focus_weak', 'change_history', 'chat', 'chat_bubble', 'chat_bubble_outline', 'check', 'check_box', 'check_box_outline_blank', 'check_circle', 'chevron_left', 'chevron_right', 'child_care', 'child_friendly', 'chrome_reader_mode', 'class', 'clear', 'clear_all', 'close', 'closed_caption', 'cloud', 'cloud_circle', 'cloud_done', 'cloud_download', 'cloud_off', 'cloud_queue', 'cloud_upload', 'code', 'collections', 'collections_bookmark', 'color_lens', 'colorize', 'comment', 'compare', 'compare_arrows', 'computer', 'confirmation_number', 'contact_mail', 'contact_phone', 'contacts', 'content_copy', 'content_cut', 'content_paste', 'control_point', 'control_point_duplicate', 'copyright', 'create', 'create_new_folder', 'credit_card', 'crop', 'crop_16_9', 'crop_3_2', 'crop_5_4', 'crop_7_5', 'crop_din', 'crop_free', 'crop_landscape', 'crop_original', 'crop_portrait', 'crop_rotate', 'crop_square', 'dashboard', 'data_usage', 'date_range', 'dehaze', 'delete', 'delete_forever', 'delete_sweep', 'description', 'desktop_mac', 'desktop_windows', 'details', 'developer_board', 'developer_mode', 'device_hub', 'devices', 'devices_other', 'dialer_sip', 'dialpad', 'directions', 'directions_bike', 'directions_boat', 'directions_bus', 'directions_car', 'directions_railway', 'directions_run', 'directions_subway', 'directions_transit', 'directions_walk', 'disc_full', 'dns', 'do_not_disturb', 'do_not_disturb_alt', 'do_not_disturb_off', 'do_not_disturb_on', 'dock', 'domain', 'done', 'done_all', 'donut_large', 'donut_small', 'drafts', 'drag_handle', 'drive_eta', 'dvr', 'edit', 'edit_location', 'eject', 'email', 'enhanced_encryption', 'equalizer', 'error', 'error_outline', 'euro_symbol', 'ev_station', 'event', 'event_available', 'event_busy', 'event_note', 'event_seat', 'exit_to_app', 'expand_less', 'expand_more', 'explicit', 'explore', 'exposure', 'exposure_neg_1', 'exposure_neg_2', 'exposure_plus_1', 'exposure_plus_2', 'exposure_zero', 'extension', 'face', 'fast_forward', 'fast_rewind', 'favorite', 'favorite_border', 'featured_play_list', 'featured_video', 'feedback', 'fiber_dvr', 'fiber_manual_record', 'fiber_new', 'fiber_pin', 'fiber_smart_record', 'file_download', 'file_upload', 'filter', 'filter_1', 'filter_2', 'filter_3', 'filter_4', 'filter_5', 'filter_6', 'filter_7', 'filter_8', 'filter_9', 'filter_9_plus', 'filter_b_and_w', 'filter_center_focus', 'filter_drama', 'filter_frames', 'filter_hdr', 'filter_list', 'filter_none', 'filter_tilt_shift', 'filter_vintage', 'find_in_page', 'find_replace', 'fingerprint', 'first_page', 'fitness_center', 'flag', 'flare', 'flash_auto', 'flash_off', 'flash_on', 'flight', 'flight_land', 'flight_takeoff', 'flip', 'flip_to_back', 'flip_to_front', 'folder', 'folder_open', 'folder_shared', 'folder_special', 'font_download', 'format_align_center', 'format_align_justify', 'format_align_left', 'format_align_right', 'format_bold', 'format_clear', 'format_color_fill', 'format_color_reset', 'format_color_text', 'format_indent_decrease', 'format_indent_increase', 'format_italic', 'format_line_spacing', 'format_list_bulleted', 'format_list_numbered', 'format_paint', 'format_quote', 'format_shapes', 'format_size', 'format_strikethrough', 'format_textdirection_l_to_r', 'format_textdirection_r_to_l', 'format_underlined', 'forum', 'forward', 'forward_10', 'forward_30', 'forward_5', 'free_breakfast', 'fullscreen', 'fullscreen_exit', 'functions', 'g_translate', 'gamepad', 'games', 'gavel', 'gesture', 'get_app', 'gif', 'golf_course', 'gps_fixed', 'gps_not_fixed', 'gps_off', 'grade', 'gradient', 'grain', 'graphic_eq', 'grid_off', 'grid_on', 'group', 'group_add', 'group_work', 'hd', 'hdr_off', 'hdr_on', 'hdr_strong', 'hdr_weak', 'headset', 'headset_mic', 'healing', 'hearing', 'help', 'help_outline', 'high_quality', 'highlight', 'highlight_off', 'history', 'home', 'hot_tub', 'hotel', 'hourglass_empty', 'hourglass_full', 'http', 'https', 'image', 'image_aspect_ratio', 'import_contacts', 'import_export', 'important_devices', 'inbox', 'indeterminate_check_box', 'info', 'info_outline', 'input', 'insert_chart', 'insert_comment', 'insert_drive_file', 'insert_emoticon', 'insert_invitation', 'insert_link', 'insert_photo', 'invert_colors', 'invert_colors_off', 'iso', 'keyboard', 'keyboard_arrow_down', 'keyboard_arrow_left', 'keyboard_arrow_right', 'keyboard_arrow_up', 'keyboard_backspace', 'keyboard_capslock', 'keyboard_hide', 'keyboard_return', 'keyboard_tab', 'keyboard_voice', 'kitchen', 'label', 'label_outline', 'landscape', 'language', 'laptop', 'laptop_chromebook', 'laptop_mac', 'laptop_windows', 'last_page', 'launch', 'layers', 'layers_clear', 'leak_add', 'leak_remove', 'lens', 'library_add', 'library_books', 'library_music', 'lightbulb_outline', 'line_style', 'line_weight', 'linear_scale', 'link', 'linked_camera', 'list', 'live_help', 'live_tv', 'local_activity', 'local_airport', 'local_atm', 'local_bar', 'local_cafe', 'local_car_wash', 'local_convenience_store', 'local_dining', 'local_drink', 'local_florist', 'local_gas_station', 'local_grocery_store', 'local_hospital', 'local_hotel', 'local_laundry_service', 'local_library', 'local_mall', 'local_movies', 'local_offer', 'local_parking', 'local_pharmacy', 'local_phone', 'local_pizza', 'local_play', 'local_post_office', 'local_printshop', 'local_see', 'local_shipping', 'local_taxi', 'location_city', 'location_disabled', 'location_off', 'location_on', 'location_searching', 'lock', 'lock_open', 'lock_outline', 'looks', 'looks_3', 'looks_4', 'looks_5', 'looks_6', 'looks_one', 'looks_two', 'loop', 'loupe', 'low_priority', 'loyalty', 'mail', 'mail_outline', 'map', 'markunread', 'markunread_mailbox', 'memory', 'menu', 'merge_type', 'message', 'mic', 'mic_none', 'mic_off', 'mms', 'mode_comment', 'mode_edit', 'monetization_on', 'money_off', 'monochrome_photos', 'mood', 'mood_bad', 'more', 'more_horiz', 'more_vert', 'motorcycle', 'mouse', 'move_to_inbox', 'movie', 'movie_creation', 'movie_filter', 'multiline_chart', 'music_note', 'music_video', 'my_location', 'nature', 'nature_people', 'navigate_before', 'navigate_next', 'navigation', 'near_me', 'network_cell', 'network_check', 'network_locked', 'network_wifi', 'new_releases', 'next_week', 'nfc', 'no_encryption', 'no_sim', 'not_interested', 'note', 'note_add', 'notifications', 'notifications_active', 'notifications_none', 'notifications_off', 'notifications_paused', 'offline_pin', 'ondemand_video', 'opacity', 'open_in_browser', 'open_in_new', 'open_with', 'pages', 'pageview', 'palette', 'pan_tool', 'panorama', 'panorama_fish_eye', 'panorama_horizontal', 'panorama_vertical', 'panorama_wide_angle', 'party_mode', 'pause', 'pause_circle_filled', 'pause_circle_outline', 'payment', 'people', 'people_outline', 'perm_camera_mic', 'perm_contact_calendar', 'perm_data_setting', 'perm_device_information', 'perm_identity', 'perm_media', 'perm_phone_msg', 'perm_scan_wifi', 'person', 'person_add', 'person_outline', 'person_pin', 'person_pin_circle', 'personal_video', 'pets', 'phone', 'phone_android', 'phone_bluetooth_speaker', 'phone_forwarded', 'phone_in_talk', 'phone_iphone', 'phone_locked', 'phone_missed', 'phone_paused', 'phonelink', 'phonelink_erase', 'phonelink_lock', 'phonelink_off', 'phonelink_ring', 'phonelink_setup', 'photo', 'photo_album', 'photo_camera', 'photo_filter', 'photo_library', 'photo_size_select_actual', 'photo_size_select_large', 'photo_size_select_small', 'picture_as_pdf', 'picture_in_picture', 'picture_in_picture_alt', 'pie_chart', 'pie_chart_outlined', 'pin_drop', 'place', 'play_arrow', 'play_circle_filled', 'play_circle_outline', 'play_for_work', 'playlist_add', 'playlist_add_check', 'playlist_play', 'plus_one', 'poll', 'polymer', 'pool', 'portable_wifi_off', 'portrait', 'power', 'power_input', 'power_settings_new', 'pregnant_woman', 'present_to_all', 'print', 'priority_high', 'public', 'publish', 'query_builder', 'question_answer', 'queue', 'queue_music', 'queue_play_next', 'radio', 'radio_button_checked', 'radio_button_unchecked', 'rate_review', 'receipt', 'recent_actors', 'record_voice_over', 'redeem', 'redo', 'refresh', 'remove', 'remove_circle', 'remove_circle_outline', 'remove_from_queue', 'remove_red_eye', 'remove_shopping_cart', 'reorder', 'repeat', 'repeat_one', 'replay', 'replay_10', 'replay_30', 'replay_5', 'reply', 'reply_all', 'report', 'report_problem', 'restaurant', 'restaurant_menu', 'restore', 'restore_page', 'ring_volume', 'room', 'room_service', 'rotate_90_degrees_ccw', 'rotate_left', 'rotate_right', 'rounded_corner', 'router', 'rowing', 'rss_feed', 'rv_hookup', 'satellite', 'save', 'scanner', 'schedule', 'school', 'screen_lock_landscape', 'screen_lock_portrait', 'screen_lock_rotation', 'screen_rotation', 'screen_share', 'sd_card', 'sd_storage', 'search', 'security', 'select_all', 'send', 'sentiment_dissatisfied', 'sentiment_neutral', 'sentiment_satisfied', 'sentiment_very_dissatisfied', 'sentiment_very_satisfied', 'settings', 'settings_applications', 'settings_backup_restore', 'settings_bluetooth', 'settings_brightness', 'settings_cell', 'settings_ethernet', 'settings_input_antenna', 'settings_input_component', 'settings_input_composite', 'settings_input_hdmi', 'settings_input_svideo', 'settings_overscan', 'settings_phone', 'settings_power', 'settings_remote', 'settings_system_daydream', 'settings_voice', 'share', 'shop', 'shop_two', 'shopping_basket', 'shopping_cart', 'short_text', 'show_chart', 'shuffle', 'signal_cellular_4_bar', 'signal_cellular_connected_no_internet_4_bar', 'signal_cellular_no_sim', 'signal_cellular_null', 'signal_cellular_off', 'signal_wifi_4_bar', 'signal_wifi_4_bar_lock', 'signal_wifi_off', 'sim_card', 'sim_card_alert', 'skip_next', 'skip_previous', 'slideshow', 'slow_motion_video', 'smartphone', 'smoke_free', 'smoking_rooms', 'sms', 'sms_failed', 'snooze', 'sort', 'sort_by_alpha', 'spa', 'space_bar', 'speaker', 'speaker_group', 'speaker_notes', 'speaker_notes_off', 'speaker_phone', 'spellcheck', 'star', 'star_border', 'star_half', 'stars', 'stay_current_landscape', 'stay_current_portrait', 'stay_primary_landscape', 'stay_primary_portrait', 'stop', 'stop_screen_share', 'storage', 'store', 'store_mall_directory', 'straighten', 'streetview', 'strikethrough_s', 'style', 'subdirectory_arrow_left', 'subdirectory_arrow_right', 'subject', 'subscriptions', 'subtitles', 'subway', 'supervisor_account', 'surround_sound', 'swap_calls', 'swap_horiz', 'swap_vert', 'swap_vertical_circle', 'switch_camera', 'switch_video', 'sync', 'sync_disabled', 'sync_problem', 'system_update', 'system_update_alt', 'tab', 'tab_unselected', 'tablet', 'tablet_android', 'tablet_mac', 'tag_faces', 'tap_and_play', 'terrain', 'text_fields', 'text_format', 'textsms', 'texture', 'theaters', 'thumb_down', 'thumb_up', 'thumbs_up_down', 'time_to_leave', 'timelapse', 'timeline', 'timer', 'timer_10', 'timer_3', 'timer_off', 'title', 'toc', 'today', 'toll', 'tonality', 'touch_app', 'toys', 'track_changes', 'traffic', 'train', 'tram', 'transfer_within_a_station', 'transform', 'translate', 'trending_down', 'trending_flat', 'trending_up', 'tune', 'turned_in', 'turned_in_not', 'tv', 'unarchive', 'undo', 'unfold_less', 'unfold_more', 'update', 'usb', 'verified_user', 'vertical_align_bottom', 'vertical_align_center', 'vertical_align_top', 'vibration', 'video_call', 'video_label', 'video_library', 'videocam', 'videocam_off', 'videogame_asset', 'view_agenda', 'view_array', 'view_carousel', 'view_column', 'view_comfy', 'view_compact', 'view_day', 'view_headline', 'view_list', 'view_module', 'view_quilt', 'view_stream', 'view_week', 'vignette', 'visibility', 'visibility_off', 'voice_chat', 'voicemail', 'volume_down', 'volume_mute', 'volume_off', 'volume_up', 'vpn_key', 'vpn_lock', 'wallpaper', 'warning', 'watch', 'watch_later', 'wb_auto', 'wb_cloudy', 'wb_incandescent', 'wb_iridescent', 'wb_sunny', 'wc', 'web', 'web_asset', 'weekend', 'whatshot', 'widgets', 'wifi', 'wifi_lock', 'wifi_tethering', 'work', 'wrap_text', 'youtube_searched_for', 'zoom_in', 'zoom_out', 'zoom_out_map']
}

```

---

#### 📄 `src/app/views/mat-icons/mat-icons.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatIconsComponent } from './mat-icons.component';
import { MatIconsRoutes } from "./mat-icons.routing";
import { UILibIconsComponent } from './uilib-icons/uilib-icons.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild(MatIconsRoutes)
  ],
  declarations: [MatIconsComponent, UILibIconsComponent]
})
export class MatIconsModule { }

```

---

#### 📄 `src/app/views/mat-icons/mat-icons.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { MatIconsComponent } from './mat-icons.component';
import { UILibIconsComponent } from './uilib-icons/uilib-icons.component';

export const MatIconsRoutes: Routes = [
  { path: '', component: MatIconsComponent, data: { title: 'Material icons' } },
  {
    path: 'ui-lib-icons',
    component: UILibIconsComponent,
  },
];

```

---

#### 📄 `src/app/views/mat-icons/uilib-icons/uilib-icons.component.html`

```html
<div class="m-3">
  <mat-icon style="color: #8990a2" *ngFor="let i of iconService.iconList" [svgIcon]="i.name" class="m-16"></mat-icon>
</div>
```

---

#### 📄 `src/app/views/mat-icons/uilib-icons/uilib-icons.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { UILibIconService } from '../../../shared/services/ui-lib-icon.service';

@Component({
    selector: 'app-uilib-icons',
    templateUrl: './uilib-icons.component.html',
    styleUrls: ['./uilib-icons.component.scss'],
    standalone: false
})
export class UILibIconsComponent implements OnInit {

  constructor(
    public iconService: UILibIconService
  ) { }

  ngOnInit(): void {
  }

}

```

---

#### 📄 `src/app/views/material-example-view/material-example-view-routing.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MaterialExampleViewComponent } from "./material-example-view.component";
import { LtemplateExampleViewerTemplateComponent } from "app/shared/components/example-viewer-template/example-viewer-template.component";
import {
  MATERIAL_EXAMPLE_COMPONENT_MAP,
  MATERIAL_EXAMPLE_COMPONENTS
} from "assets/examples/material";

const routes: Routes = [
  {
    path: ":id",
    component: MaterialExampleViewComponent,
    children: [
      {
        path: "",
        component: LtemplateExampleViewerTemplateComponent,
        data: {
          map: MATERIAL_EXAMPLE_COMPONENT_MAP,
          components: MATERIAL_EXAMPLE_COMPONENTS,
          path: "assets/examples/material/"
        }
      }
    ],
    data: { title: "Material", breadcrumb: "UI Kits" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialExampleViewRoutingModule {}

```

---

#### 📄 `src/app/views/material-example-view/material-example-view.component.html`

```html
<div class="sm:mx-8">
    <router-outlet></router-outlet>
</div>
```

---

#### 📄 `src/app/views/material-example-view/material-example-view.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-material-example-view',
    templateUrl: './material-example-view.component.html',
    standalone: false
})
export class MaterialExampleViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/material-example-view/material-example-view.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialExampleViewRoutingModule } from './material-example-view-routing.module';
import { MaterialExampleViewComponent } from './material-example-view.component';
import { MaterialExamplesModule } from 'assets/examples/material/material-examples.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

@NgModule({
  declarations: [MaterialExampleViewComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MaterialExamplesModule,
    MaterialExampleViewRoutingModule
  ]
})
export class MaterialExampleViewModule { }

```

---

#### 📄 `src/app/views/order/order-cost-list/order-cost-list.component.html`

```html
<div class="m-6">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <div>
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Order Cost Breakdown</h2>
      <p class="text-sm text-secondary">Detailed cost analysis and financial allocation</p>
    </div>
    <button mat-stroked-button routerLink="/orders/1001">
      <mat-icon class="mr-1">arrow_back</mat-icon> Back to Order
    </button>
  </div>

  <mat-card class="p-6 !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
    <mat-card-title class="text-lg font-semibold mb-4">Cost Allocation Matrix</mat-card-title>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700 text-secondary">
            <th class="py-3 px-4">Category</th>
            <th class="py-3 px-4">Description</th>
            <th class="py-3 px-4 text-right">Gross Cost</th>
            <th class="py-3 px-4 text-right">Tax (15%)</th>
            <th class="py-3 px-4 text-right">Net Total</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-100 dark:border-slate-800">
            <td class="py-3 px-4 font-medium">License Fees</td>
            <td class="py-3 px-4 text-secondary">Core Enterprise Dashboard Bundle</td>
            <td class="py-3 px-4 text-right">$433.91</td>
            <td class="py-3 px-4 text-right">$65.09</td>
            <td class="py-3 px-4 text-right font-semibold">$499.00</td>
          </tr>
          <tr class="border-b border-slate-100 dark:border-slate-800">
            <td class="py-3 px-4 font-medium">Support SLA</td>
            <td class="py-3 px-4 text-secondary">Annual 24/7 Priority Support</td>
            <td class="py-3 px-4 text-right">$173.04</td>
            <td class="py-3 px-4 text-right">$25.96</td>
            <td class="py-3 px-4 text-right font-semibold">$199.00</td>
          </tr>
          <tr class="font-bold text-base">
            <td class="py-4 px-4" colspan="4">Total Allocated Cost</td>
            <td class="py-4 px-4 text-right text-primary">$698.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </mat-card>
</div>

```

---

#### 📄 `src/app/views/order/order-cost-list/order-cost-list.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-cost-list',
    templateUrl: './order-cost-list.component.html',
    styleUrls: ['./order-cost-list.component.scss'],
    standalone: false
})
export class OrderCostListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/order/order-detail/order-detail.component.html`

```html
<div class="m-6">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <div>
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Order #1001 Details</h2>
      <p class="text-sm text-secondary">Customer: Watson Joyce &bull; Placed on: Sep 13, 2026</p>
    </div>
    <div class="flex gap-3">
      <button mat-stroked-button routerLink="/orders">
        <mat-icon class="mr-1">arrow_back</mat-icon> Back to Orders
      </button>
      <button mat-flat-button color="primary" routerLink="/orders/1001/costs">
        <mat-icon class="mr-1">attach_money</mat-icon> Cost Breakdown
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <mat-card class="p-6 !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-2">
      <mat-card-title class="text-lg font-semibold mb-4">Ordered Items</mat-card-title>
      <div class="space-y-4">
        <div class="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p class="font-medium">Enterprise Admin License</p>
            <p class="text-xs text-secondary">SKU: LTEMP-ENT-2026</p>
          </div>
          <p class="font-semibold">$499.00</p>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p class="font-medium">Priority Support (12 Months)</p>
            <p class="text-xs text-secondary">SKU: SUP-PRI-1YR</p>
          </div>
          <p class="font-semibold">$199.00</p>
        </div>
        <div class="flex justify-between items-center pt-2 text-base font-bold">
          <span>Total</span>
          <span class="text-primary">$698.00</span>
        </div>
      </div>
    </mat-card>

    <mat-card class="p-6 !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <mat-card-title class="text-lg font-semibold mb-4">Order Summary</mat-card-title>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-secondary">Status</span>
          <span class="text-green-600 font-medium">Completed</span>
        </div>
        <div class="flex justify-between">
          <span class="text-secondary">Payment Method</span>
          <span>Credit Card (•••• 4242)</span>
        </div>
        <div class="flex justify-between">
          <span class="text-secondary">Fulfillment</span>
          <span>Instant Digital Delivery</span>
        </div>
      </div>
    </mat-card>
  </div>
</div>
```

---

#### 📄 `src/app/views/order/order-detail/order-detail.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss'],
    standalone: false
})
export class OrderDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/order/order-list/order-list.component.html`

```html
<div class="m-6">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <div>
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Orders Management</h2>
      <p class="text-sm text-secondary">Track, review, and manage customer orders and fulfillment</p>
    </div>
    <div class="flex gap-2">
      <button mat-flat-button color="primary" routerLink="/orders/1001">
        <mat-icon class="mr-1">visibility</mat-icon> View Sample Order
      </button>
    </div>
  </div>

  <mat-card class="p-8 text-center !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex justify-center mb-4 text-primary">
      <mat-icon class="!w-16 !h-16 !text-6xl text-primary">shopping_bag</mat-icon>
    </div>
    <mat-card-title class="text-xl font-semibold mb-2">No Active Orders Found</mat-card-title>
    <mat-card-subtitle class="text-secondary max-w-md mx-auto mb-6">
      Orders placed by customers will appear here with live tracking, invoicing status, and shipment details.
    </mat-card-subtitle>
    <div class="flex justify-center gap-3">
      <button mat-flat-button color="primary" routerLink="/orders/1001">
        Inspect Sample Order #1001
      </button>
      <button mat-stroked-button routerLink="/shop">
        Go to Shop
      </button>
    </div>
  </mat-card>
</div>

```

---

#### 📄 `src/app/views/order/order-list/order-list.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
    standalone: false
})
export class OrderListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/order/order-routing.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderCostListComponent } from "./order-cost-list/order-cost-list.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderListComponent } from "./order-list/order-list.component";

const routes: Routes = [
  {
    path: "",
    component: OrderListComponent
  },
  {
    path: ":id",
    data: { title: "Order Details", breadcrumb: "{{id}}" },
    children: [
      {
        path: "",
        component: OrderDetailComponent
      },
      {
        path: "costs",
        component: OrderCostListComponent,
        data: { title: "Costs", breadcrumb: "Costs" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}

```

---

#### 📄 `src/app/views/order/order.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderCostListComponent } from "./order-cost-list/order-cost-list.component";
import { commonMaterialModules, allMaterialModules } from "app/shared/material-imports";

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrderCostListComponent
  ],
  imports: [
    CommonModule, 
    ...commonMaterialModules,
    ...allMaterialModules,
    OrderRoutingModule]
})
export class OrderModule {}

```

---

#### 📄 `src/app/views/order/order.service.ts`

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
}

```

---

#### 📄 `src/app/views/others/app-blank/app-blank.component.html`

```html
<p class="sm:mx-8">
  This is a blank component.
</p>
```

---

#### 📄 `src/app/views/others/app-blank/app-blank.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blank',
    templateUrl: './app-blank.component.html',
    styleUrls: ['./app-blank.component.css'],
    standalone: false
})
export class AppBlankComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/others/app-gallery/app-gallery.component.html`

```html
<div class="sm:mx-8">
  <mat-card class="p-0">
    <mat-card-title class="m-0">
      <div class="card-title-text pl-4 rtl:pr-4 py-3">Media gallery</div>
    </mat-card-title>
    <mat-divider></mat-divider>
    <mat-card-content class="!pt-4">
      <mat-grid-list cols="3" rowHeight="1:1" class="app-gallery">
        <!-- Gallery item -->
        <mat-grid-tile *ngFor="let photo of photos">
          <img [src]="photo.url" alt="">
          <!-- item detail, show on hover -->
          <div class="gallery-control-wrap !h-14 flex items-center">
            <div class="gallery-control flex items-center w-full">
              <h4 class="photo-detail fz-1">{{photo.name}}</h4>
              <span class="flex-grow"></span>
              <button mat-icon-button [matMenuTriggerFor]="photoMenu" class="">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #photoMenu="matMenu">
                <button mat-menu-item><mat-icon>send</mat-icon>Send as attachment</button>
                <button mat-menu-item><mat-icon>favorite</mat-icon>Favorite</button>
                <button mat-menu-item><mat-icon>delete</mat-icon>Delete</button>
              </mat-menu>
            </div>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </mat-card-content>
  </mat-card>
</div>
```

---

#### 📄 `src/app/views/others/app-gallery/app-gallery.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './app-gallery.component.html',
    styleUrls: ['./app-gallery.component.css'],
    standalone: false
})
export class AppGalleryComponent implements OnInit {
  photos = [{
    name: 'Photo 1',
    url: 'assets/images/sq-10.jpg'
  }, {
    name: 'Photo 2',
    url: 'assets/images/sq-16.jpg'
  }, {
    name: 'Photo 3',
    url: 'assets/images/sq-15.jpg'
  }, {
    name: 'Photo 4',
    url: 'assets/images/sq-17.jpg'
  }, {
    name: 'Photo 5',
    url: 'assets/images/sq-13.jpg'
  }, {
    name: 'Photo 6',
    url: 'assets/images/sq-12.jpg'
  }, {
    name: 'Photo 7',
    url: 'assets/images/sq-11.jpg'
  }, {
    name: 'Photo 8',
    url: 'assets/images/sq-10.jpg'
  }]
  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/others/app-pricing/app-pricing.component.html`

```html
<div class="sm:mx-8">
  <mat-slide-toggle [(ngModel)]="isAnnualSelected" color="primary" class="my-6 pl-3">Get upto 10% discount
    annually</mat-slide-toggle>

  <div class="flex flex-wrap">
    <!-- Pricing box -->
    <div class="w-full lg:w-1/4 md:w-1/2">
      <mat-card class="plan-pricing text-center p-0">
        <mat-card-title class="light-gray mb-4">
          <div class="card-title-text py-4">
            <div class="text-lg">Developer</div>
            <div class="text-sm text-muted">For New Developers</div>
          </div>
        </mat-card-title>
        <mat-divider></mat-divider>
        <mat-card-content class="!pt-4">
          <h1><strong>FREE</strong></h1>
          <mat-list dense class="mb-4">
            <mat-list-item>10GB of Bandwidth</mat-list-item>
            <mat-list-item>Max 50 connection</mat-list-item>
            <mat-list-item>512MB RAM</mat-list-item>
            <mat-list-item class="text-muted">Unlimited access</mat-list-item>
            <mat-list-item class="text-muted">Unlimited User</mat-list-item>
            <mat-list-item class="text-muted">Data analytics</mat-list-item>
          </mat-list>
          <button mat-stroked-button class="">Get Started</button>
        </mat-card-content>
      </mat-card>
    </div>
    <!-- Pricing box -->
    <div class="w-full lg:w-1/4 md:w-1/2">
      <mat-card class="plan-pricing text-center p-0">
        <mat-card-title class="mat-bg-primary mb-4">
          <div class="card-title-text py-4">
            <div class="text-white text-lg">Starter</div>
            <div class="text-sm text-muted-white">For Professional Developers</div>
          </div>
        </mat-card-title>
        <mat-divider></mat-divider>
        <mat-card-content class="!pt-4">
          <h1>
            <strong>$
              <span *ngIf="!isAnnualSelected">{{30}} /Mo</span>
              <span *ngIf="isAnnualSelected">{{30 * 12 * .9}} /Yr</span>
            </strong>
          </h1>
          <mat-list dense class="mb-4">
            <mat-list-item>100GB of Bandwidth</mat-list-item>
            <mat-list-item>Max 500 connection</mat-list-item>
            <mat-list-item>1GB RAM</mat-list-item>
            <mat-list-item>Unlimited access</mat-list-item>
            <mat-list-item class="text-muted">Unlimited User</mat-list-item>
            <mat-list-item class="text-muted">Data analytics</mat-list-item>
          </mat-list>
          <button mat-raised-button class="mat-primary">Get Started</button>
        </mat-card-content>
      </mat-card>
    </div>
    <!-- Pricing box -->
    <div class="w-full lg:w-1/4 md:w-1/2">
      <mat-card class="plan-pricing text-center p-0">
        <mat-card-title class="light-gray mb-4">
          <div class="card-title-text py-4">
            <div class="text-lg">Business</div>
            <div class="text-sm text-muted">For Small Businesses</div>
          </div>
        </mat-card-title>
        <mat-divider></mat-divider>
        <mat-card-content class="!pt-4">
          <h1>
            <strong>$
              <span *ngIf="!isAnnualSelected">{{60}} /Mo</span>
              <span *ngIf="isAnnualSelected">{{60 * 12 * .9}} /Yr</span>
            </strong>
          </h1>
          <mat-list dense class="mb-4">
            <mat-list-item>100GB of Bandwidth</mat-list-item>
            <mat-list-item>Max 1500 connection</mat-list-item>
            <mat-list-item>2GB RAM</mat-list-item>
            <mat-list-item>Unlimited access</mat-list-item>
            <mat-list-item>Unlimited User</mat-list-item>
            <mat-list-item class="text-muted">Data analytics</mat-list-item>
          </mat-list>
          <button mat-stroked-button class="">Get Started</button>
        </mat-card-content>
      </mat-card>
    </div>
    <!-- Pricing box -->
    <div class="w-full lg:w-1/4 md:w-1/2">
      <mat-card class="plan-pricing text-center p-0">
        <mat-card-title class="light-gray mb-4">
          <div class="card-title-text py-4">
            <div class="text-lg">Enterprise</div>
            <div class="text-sm text-muted">For Large companies</div>
          </div>
        </mat-card-title>
        <mat-divider></mat-divider>
        <mat-card-content class="!pt-4">
          <h1>
            <strong>$
              <span *ngIf="!isAnnualSelected">{{160}} /Mo</span>
              <span *ngIf="isAnnualSelected">{{160 * 12 * .9}} /Yr</span>
            </strong>
          </h1>
          <mat-list dense class="mb-4">
            <mat-list-item>1000GB of Bandwidth</mat-list-item>
            <mat-list-item>Max 5000 connection</mat-list-item>
            <mat-list-item>8GB RAM</mat-list-item>
            <mat-list-item>Unlimited access</mat-list-item>
            <mat-list-item>Unlimited User</mat-list-item>
            <mat-list-item>Data analytics</mat-list-item>
          </mat-list>
          <button mat-stroked-button class="">Get Started</button>
        </mat-card-content>
      </mat-card>
    </div>

  </div>
</div>
```

---

#### 📄 `src/app/views/others/app-pricing/app-pricing.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pricing',
    templateUrl: './app-pricing.component.html',
    styleUrls: ['./app-pricing.component.css'],
    standalone: false
})
export class AppPricingComponent implements OnInit {
  isAnnualSelected: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/others/app-users/app-users.component.html`

```html
<div class="flex flex-wrap sm:mx-8">
  <div
  *ngFor="let user of users"
  class="w-full md:w-1/3 sm:w-1/2">
    <mat-card class="user-card p-0">
      <mat-card-title class="mb-4">
        <div class="card-title-text flex items-center py-2 px-4">
          <a href="" class="toolbar-avatar sm mr-4 rtl:ml-4"><img [src]="user.photo" alt=""></a>
          <span class="text-16">{{user.name}}</span>
          <span class="flex-grow"></span>
          <button mat-icon-button [matMenuTriggerFor]="userMenu" class="" size="small">
              <mat-icon class="text-secondary">more_vert</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
              <button mat-menu-item>Follow</button>
              <button mat-menu-item>Message</button>
              <button mat-menu-item>Block</button>
              <button mat-menu-item>Delete</button>
          </mat-menu>
        </div>
        <mat-divider></mat-divider>
      </mat-card-title>
      <mat-card-content class="!pt-4">
        <!-- user detail lines-->
        <div class="user-details">
          <p class="flex items-center"><mat-icon class="!flex items-center text-secondary text-[16px]">card_membership</mat-icon>{{user.membership}}</p>
          <p class="flex items-center"><mat-icon class="!flex items-center text-secondary text-[16px]">date_range</mat-icon>Member since {{user.registered | date}}</p>
          <p class="flex items-center"><mat-icon class="!flex items-center text-secondary text-[16px]">phone</mat-icon>{{user.phone}}</p>
          <p class="flex items-center"><mat-icon class="!flex items-center text-secondary text-[16px]">location_on</mat-icon>{{user.address}}</p>
        </div>
      </mat-card-content>
    </mat-card>
  </div>
</div>
```

---

#### 📄 `src/app/views/others/app-users/app-users.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-users',
    templateUrl: './app-users.component.html',
    styleUrls: ['./app-users.component.css'],
    standalone: false
})
export class AppUsersComponent implements OnInit {
  users = [
    {
      'name': 'Snow Benton',
      'membership': 'Paid Member',
      'phone': '+1 (956) 486-2327',
      'photo': 'assets/images/face-1.jpg',
      'address': '329 Dictum Court, Minnesota',
      'registered': '2016-07-09'
    },
    {
      'name': 'Kay Sellers',
      'membership': 'Paid Member',
      'phone': '+1 (929) 406-3172',
      'photo': 'assets/images/face-2.jpg',
      'address': '893 Garden Place, American Samoa',
      'registered': '2017-02-16'
    },
    {
      'name': 'Robert Middleton',
      'membership': 'Paid Member',
      'phone': '+1 (995) 451-2205',
      'photo': 'assets/images/face-3.jpg',
      'address': '301 Hazel Court, West Virginia',
      'registered': '2017-01-22'
    },
    {
      'name': 'Delaney Randall',
      'membership': 'Paid Member',
      'phone': '+1 (922) 599-2410',
      'photo': 'assets/images/face-4.jpg',
      'address': '128 Kensington Walk, Ohio',
      'registered': '2016-12-08'
    },
    {
      'name': 'Melendez Lawrence',
      'membership': 'Paid Member',
      'phone': '+1 (824) 589-2029',
      'photo': 'assets/images/face-5.jpg',
      'address': '370 Lincoln Avenue, Florida',
      'registered': '2015-03-29'
    },
    {
      'name': 'Galloway Fitzpatrick',
      'membership': 'Paid Member',
      'phone': '+1 (907) 477-2375',
      'photo': 'assets/images/face-6.jpg',
      'address': '296 Stuyvesant Avenue, Iowa',
      'registered': '2015-12-12'
    },
    {
      'name': 'Watson Joyce',
      'membership': 'Paid Member',
      'phone': '+1 (982) 500-3137',
      'photo': 'assets/images/face-7.jpg',
      'address': '224 Visitation Place, Illinois',
      'registered': '2015-08-19'
    },
    {
      'name': 'Ada Kidd',
      'membership': 'Paid Member',
      'phone': '+1 (832) 531-2385',
      'photo': 'assets/images/face-1.jpg',
      'address': '230 Oxford Street, South Dakota',
      'registered': '2016-08-11'
    },
    {
      'name': 'Raquel Mcintyre',
      'membership': 'Paid Member',
      'phone': '+1 (996) 443-2102',
      'photo': 'assets/images/face-2.jpg',
      'address': '393 Sullivan Street, Palau',
      'registered': '2014-09-03'
    },
    {
      'name': 'Juliette Hunter',
      'membership': 'Paid Member',
      'phone': '+1 (876) 568-2964',
      'photo': 'assets/images/face-3.jpg',
      'address': '191 Stryker Court, New Jersey',
      'registered': '2017-01-18'
    },
    {
      'name': 'Workman Floyd',
      'membership': 'Paid Member',
      'phone': '+1 (996) 481-2712',
      'photo': 'assets/images/face-4.jpg',
      'address': '350 Imlay Street, Utah',
      'registered': '2017-05-01'
    },
    {
      'name': 'Amanda Bean',
      'membership': 'Paid Member',
      'phone': '+1 (894) 512-3907',
      'photo': 'assets/images/face-5.jpg',
      'address': '254 Stockton Street, Vermont',
      'registered': '2014-08-30'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/others/nested1/nested1.component.html`

```html
<div class="m-6 flex justify-center items-center min-h-[45vh]">
  <mat-card class="max-w-md w-full p-6 text-center !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex justify-center mb-4 text-primary">
      <mat-icon class="!w-16 !h-16 !text-6xl text-primary">account_tree</mat-icon>
    </div>
    <mat-card-title class="text-xl font-bold mb-2">Nested Route Level 1</mat-card-title>
    <mat-card-subtitle class="text-secondary mb-4">Multi-level dropdown navigation demo</mat-card-subtitle>
    <mat-card-content>
      <p class="text-sm text-slate-500 mb-6">
        Demonstrates deep nested routing structures within the navigation hierarchy.
      </p>
      <div class="flex justify-center gap-3">
        <button mat-flat-button color="primary" routerLink="/others/nested2">
          Go to Nested Level 2
        </button>
      </div>
    </mat-card-content>
  </mat-card>
</div>

```

---

#### 📄 `src/app/views/others/nested1/nested1.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nested1',
    templateUrl: './nested1.component.html',
    styleUrls: ['./nested1.component.scss'],
    standalone: false
})
export class Nested1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/others/nested2/nested2.component.html`

```html
<div class="m-6 flex justify-center items-center min-h-[45vh]">
  <mat-card class="max-w-md w-full p-6 text-center !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex justify-center mb-4 text-primary">
      <mat-icon class="!w-16 !h-16 !text-6xl text-primary">account_tree</mat-icon>
    </div>
    <mat-card-title class="text-xl font-bold mb-2">Nested Route Level 2</mat-card-title>
    <mat-card-subtitle class="text-secondary mb-4">Deep nested menu child view</mat-card-subtitle>
    <mat-card-content>
      <p class="text-sm text-slate-500 mb-6">
        This view proves child route matching, breadcrumb hierarchy resolution, and layout stability.
      </p>
      <div class="flex justify-center gap-3">
        <button mat-stroked-button routerLink="/others/nested1">
          Back to Level 1
        </button>
        <button mat-flat-button color="primary" routerLink="/dashboard/analytics">
          Dashboard
        </button>
      </div>
    </mat-card-content>
  </mat-card>
</div>

```

---

#### 📄 `src/app/views/others/nested2/nested2.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nested2',
    templateUrl: './nested2.component.html',
    styleUrls: ['./nested2.component.scss'],
    standalone: false
})
export class Nested2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/others/nested3/nested3.component.html`

```html
<div class="m-6 flex justify-center items-center min-h-[45vh]">
  <mat-card class="max-w-md w-full p-6 text-center !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex justify-center mb-4 text-primary">
      <mat-icon class="!w-16 !h-16 !text-6xl text-primary">account_tree</mat-icon>
    </div>
    <mat-card-title class="text-xl font-bold mb-2">Nested Route Level 3</mat-card-title>
    <mat-card-subtitle class="text-secondary mb-4">Deepest leaf of navigation menu</mat-card-subtitle>
    <mat-card-content>
      <p class="text-sm text-slate-500 mb-6">
        Nested route terminal view with full breadcrumb hierarchy display.
      </p>
      <div class="flex justify-center gap-3">
        <button mat-stroked-button routerLink="/others/nested2">
          Back to Level 2
        </button>
        <button mat-flat-button color="primary" routerLink="/dashboard/analytics">
          Dashboard
        </button>
      </div>
    </mat-card-content>
  </mat-card>
</div>

```

---

#### 📄 `src/app/views/others/nested3/nested3.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nested3',
    templateUrl: './nested3.component.html',
    styleUrls: ['./nested3.component.scss'],
    standalone: false
})
export class Nested3Component implements OnInit {

  constructor(
    public r: Router
  ) { }

  ngOnInit() {
  }
  go() {
    this.r.navigate(['/dashboard'])
  }
}

```

---

#### 📄 `src/app/views/others/others.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule as MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule as MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from './../../shared/shared.module';

import { AppGalleryComponent } from './app-gallery/app-gallery.component';
import { AppPricingComponent } from './app-pricing/app-pricing.component';
import { AppUsersComponent } from './app-users/app-users.component';
import { AppBlankComponent } from './app-blank/app-blank.component';
import { OthersRoutes } from "./others.routing";
import { Nested1Component } from './nested1/nested1.component';
import { Nested2Component } from './nested2/nested2.component';
import { Nested3Component } from './nested3/nested3.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    SharedModule,
    RouterModule.forChild(OthersRoutes)
  ],
  declarations: [
    AppGalleryComponent, 
    AppPricingComponent, 
    AppUsersComponent, 
    AppBlankComponent, Nested1Component, Nested2Component, Nested3Component
  ]
})
export class OthersModule { }

```

---

#### 📄 `src/app/views/others/others.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { AppGalleryComponent } from './app-gallery/app-gallery.component';
import { AppPricingComponent } from './app-pricing/app-pricing.component';
import { AppUsersComponent } from './app-users/app-users.component';
import { AppBlankComponent } from './app-blank/app-blank.component';
import { Nested1Component } from './nested1/nested1.component';
import { Nested2Component } from './nested2/nested2.component';
import { Nested3Component } from './nested3/nested3.component';

export const OthersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'gallery',
      component: AppGalleryComponent,
      data: { title: 'Gallery', breadcrumb: 'GALLERY' }
    }, {
      path: 'pricing',
      component: AppPricingComponent,
      data: { title: 'Pricing', breadcrumb: 'PRICINGS' }
    }, {
      path: 'users',
      component: AppUsersComponent,
      data: { title: 'Users', breadcrumb: 'USERS' }
    }, {
      path: 'blank',
      component: AppBlankComponent,
      data: { title: 'Blank', breadcrumb: 'BLANK' }
    }, {
      path: 'n1',
      component: Nested1Component,
      data: { title: '1', breadcrumb: '1' }
    }, {
      path: 'n1/n2',
      component: Nested2Component,
      data: { title: '2', breadcrumb: '2' }
    }, {
      path: 'n1/n3',
      component: Nested3Component,
      data: { title: '3', breadcrumb: '3' }
    }]
  }
];
```

---

#### 📄 `src/app/views/page-layouts/full-width-card/full-width-card.component.html`

```html
<div class="sm:mx-8 !pb-8">
  <mat-card>
    <mat-card-header>
      <mat-card-title class="mb-4">Platform Architecture & Deployment Guide</mat-card-title>
    </mat-card-header>
    <mat-card-content class="space-y-4 text-slate-700 leading-relaxed">
      <h3 class="text-lg font-semibold text-slate-900 mt-2">1. Cloud Infrastructure & Container Orchestration</h3>
      <p>
        The platform operates on a containerized microservice topology managed via Kubernetes. Ingress routing is handled by an edge API gateway with integrated TLS 1.3 termination, rate-limiting, and distributed DDoS mitigation. Each independent microservice exposes health probe endpoints (liveness and readiness) monitored continuously by the service mesh.
      </p>

      <h3 class="text-lg font-semibold text-slate-900 mt-4">2. High Availability & Data Persistence</h3>
      <p>
        Relational persistence is backed by PostgreSQL clusters running in hot-standby replication with sub-second synchronization latency. Pgvector extensions enable real-time vector embeddings and semantic similarity lookups. Continuous WAL archiving guarantees point-in-time recovery with zero RPO for critical financial and audit transactions.
      </p>

      <h3 class="text-lg font-semibold text-slate-900 mt-4">3. Distributed Caching & In-Memory Operations</h3>
      <p>
        Session states, rate-limiting counters, and frequently queried read-replicas are cached via Redis clusters utilizing pub/sub message channels for invalidation. Cache hit ratios consistently maintain 98.4% efficiency across all edge regions.
      </p>

      <h3 class="text-lg font-semibold text-slate-900 mt-4">4. Security Posture & Enterprise Compliance</h3>
      <p>
        All communication between internal microservices is encrypted using mutual TLS (mTLS) with automated certificate rotation. Access delegation leverages role-based access control (RBAC) validated against enterprise OpenID Connect and SAML identity providers. Comprehensive audit trails are streamed to immutable append-only logs for regulatory compliance.
      </p>
    </mat-card-content>
  </mat-card>
</div>
```

---

#### 📄 `src/app/views/page-layouts/full-width-card/full-width-card.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-full-width-card',
    templateUrl: './full-width-card.component.html',
    styleUrls: ['./full-width-card.component.scss'],
    standalone: false
})
export class FullWidthCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/page-layouts/full-width-card-tab/full-width-card-tab.component.html`

```html
<div class="page-layout overflow-hidden !pb-8">
  <div class="content">
    <div class="content-header px-6 pt-6">
      <h1 class="text-lg font-semibold">System Configuration & Telemetry</h1>
    </div>

    <div class="">
      <div class="Ltemplate-card flex flex-col">
          <mat-tab-group>
              <mat-tab label="Cloud Infrastructure">
                <div class="p-6 h-100vh-280px space-y-4 leading-relaxed" [perfectScrollbar]>
                    <h3 class="text-base font-semibold text-slate-900">Kubernetes Cluster Topologies</h3>
                    <p>The system is deployed across primary multi-zone clusters ensuring zero single points of failure. Autoscaling policies dynamically adjust replica sets based on custom Prometheus metrics, CPU utilization, and incoming request queue depths.</p>
                    <h3 class="text-base font-semibold text-slate-900">Ingress & Service Mesh</h3>
                    <p>Edge ingress controllers balance incoming traffic with weighted round-robin policies across geographical regions. Mutual TLS is strictly enforced for all service-to-service communication with dynamic certificate issuance.</p>
                    <h3 class="text-base font-semibold text-slate-900">Continuous Delivery Pipelines</h3>
                    <p>Automated canary deployments evaluate error rates, response latencies, and transaction completion metrics over a 15-minute verification window before promoting artifacts to global production environments.</p>
                </div>
              </mat-tab>
              <mat-tab label="Database & Persistence">
                <div class="p-6 h-100vh-280px space-y-4 leading-relaxed" [perfectScrollbar]>
                    <h3 class="text-base font-semibold text-slate-900">PostgreSQL Primary-Replica Cluster</h3>
                    <p>Primary write nodes handle ACID-compliant transactions with synchronous commit to read replicas. Connection pooling is orchestrated via PgBouncer maintaining sub-millisecond query allocation times.</p>
                    <h3 class="text-base font-semibold text-slate-900">Vector Search Engine (Qdrant)</h3>
                    <p>High-dimensional embeddings are indexed using HNSW graphs for approximate nearest neighbor search, providing sub-15ms semantic matching for document clustering and intelligent retrieval.</p>
                    <h3 class="text-base font-semibold text-slate-900">Distributed In-Memory Cache (Redis)</h3>
                    <p>Redis Sentinel clusters manage high-availability failover with automatic primary election. Cache invalidation utilizes pub/sub notifications to ensure strict consistency across application servers.</p>
                </div>
              </mat-tab>
              <mat-tab label="Security & Governance">
                <div class="p-6 h-100vh-280px space-y-4 leading-relaxed" [perfectScrollbar]>
                    <h3 class="text-base font-semibold text-slate-900">Identity & Role-Based Access Control</h3>
                    <p>Authentication integrates standard OIDC and SAML 2.0 protocols with enterprise IdPs (Google Workspace, Okta, Azure AD). Permissions are evaluated using fine-grained Attribute-Based Access Control (ABAC) policies.</p>
                    <h3 class="text-base font-semibold text-slate-900">Cryptographic Storage & Secrets Management</h3>
                    <p>Database volumes and object stores are protected by AES-256 encryption at rest. Application credentials, API keys, and certificates are injected dynamically from HashiCorp Vault with lease expiration timers.</p>
                    <h3 class="text-base font-semibold text-slate-900">Compliance & Audit Logging</h3>
                    <p>Every administrative action and privileged data query is immutably logged with user identity, timestamp, IP address, and payload hash conforming to SOC 2 Type II, HIPAA, and GDPR standards.</p>
                </div>
              </mat-tab>
          </mat-tab-group>
      </div>
    </div>

  </div>

</div>
```

---

#### 📄 `src/app/views/page-layouts/full-width-card-tab/full-width-card-tab.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-full-width-card-tab',
    templateUrl: './full-width-card-tab.component.html',
    styleUrls: ['./full-width-card-tab.component.scss'],
    standalone: false
})
export class FullWidthCardTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/page-layouts/left-sidebar-card/left-sidebar-card.component.html`

```html
<div class="page-layout sm:mx-8 overflow-hidden pb-8">
  <!-- Left Sidebar -->
  <ltemplate-sidebar name="layout-left-sidebar-card" class="Ltemplate-card" [opened]="true">
    <div class="sidebar-header mt-4 px-4">
      <h5 class="text-sm mb-0 font-semibold">Cluster Navigation</h5>
    </div>
    <div>
      <mat-list>
        <mat-list-item>Overview & Health</mat-list-item>
        <mat-list-item>Workloads & Pods</mat-list-item>
        <mat-list-item>Ingress & Services</mat-list-item>
        <mat-list-item>Storage & Volumes</mat-list-item>
      </mat-list>
      <mat-selection-list>
        <mat-list-option [selected]="true">prod-us-east-1</mat-list-option>
        <mat-list-option>prod-eu-west-1</mat-list-option>
        <mat-list-option>staging-cluster</mat-list-option>
        <mat-list-option>sandbox-dev</mat-list-option>
      </mat-selection-list>
    </div>
  </ltemplate-sidebar>

  <!-- body content -->
  <div class="content">
    <!-- content card -->
    <div class="content-body">
      <div class="Ltemplate-card flex flex-col">
        <!-- card header -->
        <div class="bg-card px-6 py-2 border-b border-divider rounded-t-md flex items-center h-[64px]">
          <button
            mat-icon-button
            LtemplateSidebarToggler="layout-left-sidebar-card"
            class="!flex mr-2 rtl:ml-2"
          >
            <mat-icon>menu</mat-icon>
          </button>

          <span class="font-medium text-slate-800">Cluster Telemetry & Operational Logs</span>
        </div>
        <!-- Card body -->
        <div class="bg-card p-6 space-y-4 text-slate-700 leading-relaxed">
          <h3 class="text-lg font-semibold text-slate-900">Active Node Pool Status</h3>
          <p>
            Cluster <code>prod-us-east-1</code> is healthy with 24 worker nodes actively serving traffic across 3 availability zones. Overall CPU utilization is steady at 43.8% and memory allocation is 61.2% of total capacity.
          </p>
          <h3 class="text-lg font-semibold text-slate-900 mt-4">Automated Scaling Events</h3>
          <p>
            Horizontal Pod Autoscalers (HPA) adjusted 6 microservice deployments in response to morning traffic spikes. Zero throttled requests or container eviction events were recorded during the peak transition window.
          </p>
          <h3 class="text-lg font-semibold text-slate-900 mt-4">Ingress Gateway & Traffic Routing</h3>
          <p>
            The Envoy ingress mesh routed 18.4 million requests in the last 24 hours with an average round-trip latency of 28ms. TLS handshakes averaged 1.2ms with zero expired certificate warnings detected.
          </p>
          <h3 class="text-lg font-semibold text-slate-900 mt-4">Audit & Security Findings</h3>
          <p>
            Continuous runtime security scanner (Falco & Trivy) completed an automated scan with 0 critical and 0 high severity vulnerabilities identified. All container images conform to verified rootless execution policies.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

```

---

#### 📄 `src/app/views/page-layouts/left-sidebar-card/left-sidebar-card.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-left-sidebar-card',
    templateUrl: './left-sidebar-card.component.html',
    styleUrls: ['./left-sidebar-card.component.scss'],
    standalone: false
})
export class LeftSidebarCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/page-layouts/page-layouts-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftSidebarCardComponent } from './left-sidebar-card/left-sidebar-card.component';
import { FullWidthCardComponent } from './full-width-card/full-width-card.component';
import { RightSidebarCardComponent } from './right-sidebar-card/right-sidebar-card.component';
import { FullWidthCardTabComponent } from './full-width-card-tab/full-width-card-tab.component';

const routes: Routes = [
  {
    path: 'full-width-card',
    component: FullWidthCardComponent
  },
  {
    path: 'full-width-card-tab',
    component: FullWidthCardTabComponent
  },
  {
    path: 'left-sidebar-card',
    component: LeftSidebarCardComponent
  },
  {
    path: 'right-sidebar-card',
    component: RightSidebarCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageLayoutsRoutingModule { }

```

---

#### 📄 `src/app/views/page-layouts/page-layouts.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutsRoutingModule } from './page-layouts-routing.module';
import { LeftSidebarCardComponent } from './left-sidebar-card/left-sidebar-card.component';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { FullWidthCardComponent } from './full-width-card/full-width-card.component';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { RightSidebarCardComponent } from './right-sidebar-card/right-sidebar-card.component';
import { FullWidthCardTabComponent } from './full-width-card-tab/full-width-card-tab.component';
import { commonMaterialModules, allMaterialModules } from 'app/shared/material-imports';
@NgModule({
  declarations: [LeftSidebarCardComponent, FullWidthCardComponent, RightSidebarCardComponent, FullWidthCardTabComponent],
  imports: [
    ...commonMaterialModules,
    ...allMaterialModules,
    SharedDirectivesModule,
    SharedComponentsModule,
    CommonModule,
    PerfectScrollbarModule,
    PageLayoutsRoutingModule
  ]
})
export class PageLayoutsModule { }

```

---

#### 📄 `src/app/views/page-layouts/right-sidebar-card/right-sidebar-card.component.html`

```html
<div class="page-layout sm:mx-8 overflow-hidden pb-8">
  <!-- Left Sidebar -->
  <ltemplate-sidebar name="layout-left-sidebar-card" [right]="true" class="Ltemplate-card" [opened]="true">
    <div class="sidebar-header mt-4 px-4">
      <h5 class="text-sm mb-0 font-semibold">Service Registry</h5>
    </div>
    <div>
      <mat-list>
        <mat-list-item>Auth Service</mat-list-item>
        <mat-list-item>Billing & Invoicing</mat-list-item>
        <mat-list-item>Data Ingestion</mat-list-item>
        <mat-list-item>Notification Engine</mat-list-item>
      </mat-list>
      <mat-selection-list>
        <mat-list-option [selected]="true">PostgreSQL 16 Pool</mat-list-option>
        <mat-list-option>Redis Cache Cluster</mat-list-option>
        <mat-list-option>Kafka Event Bus</mat-list-option>
        <mat-list-option>Qdrant Vector Index</mat-list-option>
      </mat-selection-list>
    </div>
  </ltemplate-sidebar>

  <!-- body content -->
  <div class="content">
    <!-- content card -->
    <div class="content-body">
      <div class="Ltemplate-card flex flex-col">
        <!-- card header -->
        <div class="bg-card px-6 py-2 border-b border-divider rounded-t-md flex justify-between items-center h-[64px]">
          <span class="font-medium text-slate-800">Service Mesh Health & Circuit Breakers</span>

          <button
            mat-icon-button
            LtemplateSidebarToggler="layout-left-sidebar-card"
            class="!flex mr-2 rtl:ml-2"
          >
            <mat-icon>menu</mat-icon>
          </button>
        </div>
        <!-- Card body -->
        <div class="bg-card p-6 space-y-4 text-slate-700 leading-relaxed">
          <h3 class="text-lg font-semibold text-slate-900">Distributed Tracing & Latency SLA</h3>
          <p>
            End-to-end request tracing spans (OpenTelemetry) show 99.5% of API requests completed within the 120ms SLA threshold. P99 latency across cross-region service calls is stable at 48ms.
          </p>
          <h3 class="text-lg font-semibold text-slate-900 mt-4">Circuit Breaker & Retry Policies</h3>
          <p>
            Zero circuit breakers tripped in the preceding 7-day period. Exponential backoff and jitter algorithms prevented cascade connection exhaustion during external payment gateway rate-limit spikes.
          </p>
          <h3 class="text-lg font-semibold text-slate-900 mt-4">Database Connection Pooling</h3>
          <p>
            PgBouncer managed 450 concurrent client connections across 32 physical server threads with an average connection acquisition time of 0.4ms. Lock contention remained at 0.02%.
          </p>
          <h3 class="text-lg font-semibold text-slate-900 mt-4">Event Queue Throughput</h3>
          <p>
            The distributed Kafka message broker processed 1.42 billion events over the last 30 days with zero partition lag. Consumer group offset commitments are verified healthy.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

```

---

#### 📄 `src/app/views/page-layouts/right-sidebar-card/right-sidebar-card.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-right-sidebar-card',
    templateUrl: './right-sidebar-card.component.html',
    styleUrls: ['./right-sidebar-card.component.scss'],
    standalone: false
})
export class RightSidebarCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/profile/profile-blank/profile-blank.component.html`

```html
<div class="m-6 flex justify-center items-center min-h-[45vh]">
  <mat-card class="max-w-md w-full p-6 text-center !rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex justify-center mb-4 text-primary">
      <mat-icon class="!w-16 !h-16 !text-6xl text-primary">person_outline</mat-icon>
    </div>
    <mat-card-title class="text-xl font-bold mb-2">Blank Profile Page</mat-card-title>
    <mat-card-subtitle class="text-secondary mb-4">Clean canvas ready for custom user profile sections</mat-card-subtitle>
    <mat-card-content>
      <p class="text-sm text-slate-500 mb-6">
        This template provides a blank slate to integrate custom widgets, activities, or user credentials.
      </p>
      <div class="flex justify-center gap-3">
        <button mat-flat-button color="primary" routerLink="/profile/overview">
          View Overview
        </button>
        <button mat-stroked-button routerLink="/profile/settings">
          Settings
        </button>
      </div>
    </mat-card-content>
  </mat-card>
</div>

```

---

#### 📄 `src/app/views/profile/profile-blank/profile-blank.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-profile-blank',
    templateUrl: './profile-blank.component.html',
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      RouterModule
    ]
})
export class ProfileBlankComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/profile/profile-overview/profile-overview.component.html`

```html
<div class="flex flex-wrap gap-6">
  <div class="flex flex-col w-full xl:w-[calc(50%-12px)]">
    <!-- Time line -->
    <mat-card class="default shadow-md mb-6">
      <h3 class="mx-6 my-5 text-xl font-semibold">Timeline</h3>
      <mat-card-content>
        <div class="relative overflow-hidden">
          <!-- Timeline vertical line -->
          <div class="absolute top-10 bottom-0 left-6 w-px bg-slate-200"></div>
          
          <div class="w-full overflow-hidden mb-8">
            <div class="float-left relative mr-7 h-12 w-12 rounded-full overflow-hidden shadow-sm border-2 border-gray-100">
              <img src="assets/images/face-6.jpg" class="max-w-full" alt="">
            </div>
            <div class="float-right w-[calc(100%-78px)]">
              <div class="flex mb-2 items-center">
                <a href="#" class="mr-4 rtl:ml-4 font-medium text-primary hover:underline"><b>John Doe</b> published a system status update</a>
                <span class="text-secondary text-sm">1 hour ago</span>
                <span class="flex-grow"></span>
              </div>
              <div class="mb-3">
                <p class="leading-relaxed">All production microservices are operating with 99.99% uptime following the zero-downtime database maintenance window.</p>
              </div>
              <div class="mb-2">
                <a href="#" class="mr-4 rtl:ml-4 text-slate-500 hover:text-primary transition-colors text-sm font-medium">Like</a>
                <a href="#" class="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Comment</a>
              </div>
            </div>
          </div>

          <div class="w-full overflow-hidden mb-8">
            <div class="float-left relative mr-7 h-12 w-12 rounded-full overflow-hidden shadow-sm border-2 border-gray-100">
              <img src="assets/images/face-2.jpg" class="max-w-full" alt="">
            </div>
            <div class="float-right w-[calc(100%-78px)]">
              <div class="flex mb-2 items-center">
                <a href="#" class="mr-4 rtl:ml-4 font-medium text-primary hover:underline"><b>Elena Rostova</b> uploaded architecture diagrams</a>
                <span class="text-secondary text-sm">15 hours ago</span>
                <span class="flex-grow"></span>
              </div>
              <div class="mb-3">
                <img src="assets/images/photo-600_220.jpg" class="rounded-md shadow-sm max-w-full" alt="">
              </div>
              <div class="mb-2">
                <a href="#" class="mr-4 rtl:ml-4 text-slate-500 hover:text-primary transition-colors text-sm font-medium">Like</a>
                <a href="#" class="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Comment</a>
              </div>
            </div>
          </div>

          <div class="w-full overflow-hidden mb-8">
            <div class="float-left relative mr-7 h-12 w-12 rounded-full overflow-hidden">
              <mat-icon class="icon-badge mat-bg-primary text-center !w-12 !h-12 leading-[48px]">settings</mat-icon>
            </div>
            <div class="float-right w-[calc(100%-78px)]">
              <div class="flex mb-2 items-center">
                <a href="#" class="mr-4 rtl:ml-4 font-medium text-primary hover:underline"><b>New Team Members</b></a>
                <span class="text-secondary text-sm">2 days ago</span>
                <span class="flex-grow"></span>
              </div>
              <div class="mb-3">
                <p class="leading-relaxed"><a class="text-primary font-medium hover:underline" href="">Kevin Huyn</a> and 34 other engineers joined your organization.</p>
              </div>
              <div class="mb-2">
                <a href="#" class="mr-4 rtl:ml-4 text-slate-500 hover:text-primary transition-colors text-sm font-medium">Like</a>
                <a href="#" class="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Comment</a>
              </div>
            </div>
          </div>

          <div class="w-full overflow-hidden mb-6">
            <div class="float-left relative mr-7 h-12 w-12 rounded-full overflow-hidden">
              <mat-icon class="icon-badge mat-bg-warn text-center !w-12 !h-12 leading-[48px]">verified</mat-icon>
            </div>
            <div class="float-right w-[calc(100%-78px)]">
              <div class="flex mb-2 items-center">
                <a href="#" class="mr-4 rtl:ml-4 font-medium text-primary hover:underline"><b>Workspace Plan Upgraded</b></a>
                <span class="text-secondary text-sm">5 days ago</span>
                <span class="flex-grow"></span>
              </div>
              <div class="mb-3">
                <p class="leading-relaxed">Organization workspace successfully upgraded to Enterprise Tier with unlimited seats and 24/7 dedicated support.</p>
              </div>
              <div class="mb-2">
                <a href="#" class="mr-4 rtl:ml-4 text-slate-500 hover:text-primary transition-colors text-sm font-medium">Like</a>
                <a href="#" class="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Comment</a>
              </div>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
    <!-- End Time line -->

    <mat-card class="default shadow-md">
      <h3 class="mx-6 my-5 text-xl font-semibold">Uploaded Photos</h3>
      <mat-card-content class="p-0">
        <mat-grid-list cols="3" rowHeight="1:1" class="app-gallery">
          <!-- Gallery item -->
          <mat-grid-tile *ngFor="let photo of photos">
            <img [src]="photo.url" alt="" class="transition-all duration-300">
            <!-- item detail, show on hover -->
            <div class="gallery-control-wrap bg-black/40 backdrop-blur-sm">
              <div class="gallery-control flex p-3">
                <h4 class="photo-detail text-white font-medium">{{photo.name}}</h4>
                <span class="flex-grow"></span>
                <button mat-icon-button [matMenuTriggerFor]="photoMenu" class="text-white">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #photoMenu="matMenu">
                  <button mat-menu-item><mat-icon>send</mat-icon>Send as attachment</button>
                  <button mat-menu-item><mat-icon>favorite</mat-icon>Favorite</button>
                  <button mat-menu-item><mat-icon>delete</mat-icon>Delete</button>
                </mat-menu>
              </div>
            </div>
          </mat-grid-tile>
        </mat-grid-list>
      </mat-card-content>
    </mat-card>
  </div>

  <div class="flex flex-col w-full xl:w-[calc(50%-12px)]">
    <mat-card class="default shadow-md mb-6">
      <h3 class="mx-6 my-5 text-xl font-semibold">Support Tickets</h3>
      <mat-card-content class="p-0">
        <div class="flex flex-row items-center px-4 py-4 border-b border-divider hover:bg-hover transition-colors" *ngFor="let t of tickets">
          <img class="mr-4 rtl:ml-4 w-10 h-10 rounded-full border-2 border-gray-100 shadow-sm" [src]="t.img" alt="">
          <div class="flex w-full items-center">
            <h6 class="m-0 mr-4 rtl:ml-4 font-medium">{{t.name}}</h6>
            <span class="flex-grow"></span>
            <div class="w-2/5 text-secondary truncate">{{t.text | excerpt:20 }}</div>
            <span class="flex-grow"></span>
            <small class="text-slate-500 mr-4 rtl:ml-4 ml-4 rtl:mr-4 rtl:ml-4 whitespace-nowrap">{{ t.date | relativeTime}}</small>
          </div>
          <mat-chip-listbox>
            <mat-chip-option mat-sm-chip [color]="t.isOpen ? 'primary' : 'warn'" [selected]="t.isOpen" class="font-medium text-xs">
              {{t.isOpen ? 'active' : 'closed'}}
            </mat-chip-option>
          </mat-chip-listbox>
        </div>
        <div class="text-center p-3">
          <button mat-button class="full-width text-primary hover:bg-primary-50">View all tickets</button>
        </div>
      </mat-card-content>
    </mat-card>

    <mat-card class="default shadow-md">
      <h3 class="mx-6 my-5 text-xl font-semibold">Assigned Tasks</h3>
      <mat-card-content class="p-0">
        <div class="mb-0">
          <div class="flex items-center px-4 py-4 border-b border-divider hover:bg-hover transition-colors" *ngFor="let t of tasks">
            <mat-checkbox class="mr-4 rtl:ml-4"></mat-checkbox>
            <span class="">{{t.text}}</span>
            <span class="flex-grow"></span>
            <mat-chip mat-sm-chip [color]="t.status ? 'primary' : 'warn'" [selected]="t.status ? true : false" class="font-medium text-xs">
              {{t.status ? 'completed' : 'pending'}}
            </mat-chip>
            <button mat-icon-button mat-sm-button [matMenuTriggerFor]="taskMenu" class="tasktype-action ml-4 rtl:mr-4 rtl:ml-4 text-slate-500">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #taskMenu="matMenu">
              <button mat-menu-item>
                <mat-icon>done</mat-icon>
                <span>Completed</span>
              </button>
              <button mat-menu-item>
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
              </button>
              <button mat-menu-item>
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
              </button>
            </mat-menu>
          </div>
        </div>
        <div class="text-center p-3">
          <button mat-button class="full-width text-primary hover:bg-primary-50">View all tasks</button>
        </div>
      </mat-card-content>
    </mat-card>
  </div>
</div>
```

---

#### 📄 `src/app/views/profile/profile-overview/profile-overview.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

@Component({
    selector: 'app-profile-overview',
    templateUrl: './profile-overview.component.html',
    styleUrls: ['./profile-overview.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatCardModule,
      MatIconModule,
      MatListModule,
      MatProgressBarModule,
      MatCheckboxModule,
      MatMenuModule,
      MatButtonModule,
      MatChipsModule,
      MatGridListModule,
      SharedPipesModule
    ]
})
export class ProfileOverviewComponent implements OnInit {
  activityData = [{
    month: 'January',
    spent: 240,
    opened: 8,
    closed: 30
  }, {
    month: 'February',
    spent: 140,
    opened: 6,
    closed: 20
  }, {
    month: 'March',
    spent: 220,
    opened: 10,
    closed: 20
  }, {
    month: 'April',
    spent: 440,
    opened: 40,
    closed: 60
  }, {
    month: 'May',
    spent: 340,
    opened: 40,
    closed: 60
  }];

  tasks = [{
    text: 'Review CI/CD deployment pipeline for production cluster',
    status: 0
  }, {
    text: 'Complete security audit & vulnerability scanning',
    status: 0
  }, {
    text: 'Migrate legacy auth tokens to RSA-256 JWT schema',
    status: 1
  }, {
    text: 'Configure automated PostgreSQL daily backups',
    status: 1
  }, {
    text: 'Optimize frontend bundle splitting and lazy-loaded routes',
    status: 1
  }]

  tickets = [{
    img: 'assets/images/face-1.jpg',
    name: 'Michael Chang',
    text: 'SSO SAML authentication setup inquiry for enterprise org',
    date: new Date('2026-09-10'),
    isOpen: true
  }, {
    img: 'assets/images/face-5.jpg',
    name: 'Sarah Connor',
    text: 'Requesting webhook callback retry and timeout documentation',
    date: new Date('2026-09-08'),
    isOpen: false
  }, {
    img: 'assets/images/face-3.jpg',
    name: 'Marcus Vance',
    text: 'Increase API rate limits for bulk telemetry streaming',
    date: new Date('2026-09-05'),
    isOpen: false
  }, {
    img: 'assets/images/face-4.jpg',
    name: 'Maya Jenkins',
    text: 'Enterprise annual billing plan renewal confirmation',
    date: new Date('2026-09-02'),
    isOpen: false
  }, {
    img: 'assets/images/face-2.jpg',
    name: 'David Kim',
    text: 'Invoice receipt and VAT tax compliance verification',
    date: new Date('2026-08-28'),
    isOpen: false
  }]

  photos = [{
    name: 'Photo 1',
    url: 'assets/images/sq-15.jpg'
  }, {
    name: 'Photo 2',
    url: 'assets/images/sq-8.jpg'
  }, {
    name: 'Photo 3',
    url: 'assets/images/sq-9.jpg'
  }, {
    name: 'Photo 4',
    url: 'assets/images/sq-10.jpg'
  }, {
    name: 'Photo 5',
    url: 'assets/images/sq-11.jpg'
  }, {
    name: 'Photo 6',
    url: 'assets/images/sq-12.jpg'
  }]

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/profile/profile-settings/profile-settings.component.html`

```html
<mat-card class="p-0 shadow-md">
  <mat-tab-group class="profile-tab-group">
    <mat-tab label="Account Settings">
      <mat-card-content class="px-6 pt-6 pb-4">
          <form>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <mat-form-field class="w-full" appearance="fill">
                <mat-label>Name</mat-label>
                <input
                matInput
                name="name"
                placeholder="Your full name">
                <mat-icon matSuffix>person</mat-icon>
              </mat-form-field>
              <mat-form-field class="w-full" appearance="fill">
                <mat-label>Job Title</mat-label>
                <input
                matInput
                name="title"
                placeholder="Your position">
                <mat-icon matSuffix>work</mat-icon>
              </mat-form-field>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <mat-form-field class="w-full" appearance="fill">
                <mat-label>Email</mat-label>
                <input
                matInput
                name="email"
                placeholder="Your email address">
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>
              <mat-form-field class="w-full" appearance="fill">
                <mat-label>Phone</mat-label>
                <input
                matInput
                name="phone"
                placeholder="Your phone number">
                <mat-icon matSuffix>phone</mat-icon>
              </mat-form-field>
            </div>
            <mat-form-field class="w-full" appearance="fill">
              <mat-label>Address</mat-label>
              <input
              matInput
              name="address"
              placeholder="Your address">
              <mat-icon matSuffix>location_on</mat-icon>
            </mat-form-field>
            <mat-form-field class="w-full" appearance="fill">
              <mat-label>Website</mat-label>
              <input
              matInput
              name="website"
              placeholder="Your website URL">
              <mat-icon matSuffix>language</mat-icon>
            </mat-form-field>
            <div class="flex justify-end mt-6">
              <button mat-raised-button color="primary" class="px-6">Save Changes</button>
            </div>
          </form>
      </mat-card-content>
    </mat-tab>
    <mat-tab label="Privacy Settings">
      <mat-card-content class="px-6 pt-6 pb-4">
        <div class="mb-6">
          <h5 class="!text-sm font-semibold mb-2">Notification Preferences</h5>
          <div class="space-y-3 ml-1">
            <div class="flex items-start">
              <mat-checkbox color="primary" class="leading-tight"> 
                <span class="ml-1 text-slate-700">Get weekly news in your email.</span>
              </mat-checkbox>
            </div>
            <div class="flex items-start">
              <mat-checkbox color="primary" class="leading-tight"> 
                <span class="ml-1 text-slate-700">Get notification when someone follows you.</span>
              </mat-checkbox>
            </div>
            <div class="flex items-start">
              <mat-checkbox color="primary" class="leading-tight"> 
                <span class="ml-1 text-slate-700">Get email when someone follows you.</span>
              </mat-checkbox>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h5 class="!text-sm font-semibold mb-2">Theme Preferences</h5>
          <p class="text-slate-600 mb-3">Choose your admin panel color scheme.</p>
          <mat-radio-group class="flex flex-col space-y-2 ml-1">
            <mat-radio-button value="indigo" color="primary" class="text-slate-700">
              <span class="ml-1">Indigo</span>
              <span class="inline-block w-4 h-4 rounded-full bg-indigo-500 ml-2"></span>
            </mat-radio-button>
            <mat-radio-button value="blue" color="primary" class="text-slate-700">
              <span class="ml-1">Blue</span>
              <span class="inline-block w-4 h-4 rounded-full bg-blue-500 ml-2"></span>
            </mat-radio-button>
            <mat-radio-button value="pink" color="primary" class="text-slate-700">
              <span class="ml-1">Pink</span>
              <span class="inline-block w-4 h-4 rounded-full bg-pink-500 ml-2"></span>
            </mat-radio-button>
            <mat-radio-button value="purple" color="primary" class="text-slate-700">
              <span class="ml-1">Purple</span>
              <span class="inline-block w-4 h-4 rounded-full bg-purple-500 ml-2"></span>
            </mat-radio-button>
          </mat-radio-group>
        </div>
        <div class="flex justify-end mt-4">
          <button mat-raised-button color="primary" class="px-6">Save Preferences</button>
        </div>
      </mat-card-content>
    </mat-tab>
  </mat-tab-group>
</mat-card>
```

---

#### 📄 `src/app/views/profile/profile-settings/profile-settings.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      MatCardModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatCheckboxModule,
      MatRadioModule,
      MatSlideToggleModule,
      MatButtonModule
    ]
})
export class ProfileSettingsComponent implements OnInit {
  public hasBaseDropZoneOver: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}

```

---

#### 📄 `src/app/views/profile/profile.component.html`

```html
<div class="flex flex-wrap">
  <div class="w-full xl:w-[300px] lg:w-[300px] md:w-1/2">
    <mat-card class="box-border mb-6 pb-0 shadow-md">
      <div class="w-full mb-6 flex justify-center mt-4">
        <img src="assets/images/sq-face-220.jpg" class="w-1/2 h-auto rounded-full border-4 border-gray-100 shadow" alt="">
      </div>
      <div class="text-center mb-6 px-4">
        <h1 class="text-2xl font-bold mb-1">{{(user | async)?.displayName}}</h1>
        <h2 class="text-lg font-medium mb-3">Senior Solutions Architect</h2>
        <p class="text-secondary text-sm leading-relaxed">Full-stack system architect specializing in cloud infrastructure, high-throughput distributed systems, and modern Angular web applications.</p>
      </div>
      <div class="profile-actions flex justify-center items-center mb-6">
        <button mat-raised-button color="primary" class="!mr-3 font-medium">Message</button>
        <button mat-raised-button color="accent" class="font-medium">Follow</button>
      </div>
      <div class="profile-nav">
        <div class="px-4 py-3 flex items-center cursor-pointer hover:bg-hover font-medium" routerLink="/profile/overview" routerLinkActive="border-l-[3px] text-primary-600 font-semibold">
          <mat-icon class="mr-3 rtl:ml-3">home</mat-icon>
          Overview
        </div>
        <mat-divider></mat-divider>
        <div class="px-4 py-3 flex items-center cursor-pointer hover:bg-hover font-medium" routerLink="/profile/settings" routerLinkActive="border-l-[3px] text-primary-600 font-semibold">
          <mat-icon class="mr-3 rtl:ml-3">settings</mat-icon>
          Settings
        </div>
        <mat-divider></mat-divider>
        <div class="px-4 py-3 flex items-center cursor-pointer hover:bg-hover font-medium" routerLink="/profile/blank" routerLinkActive="border-l-[3px] text-primary-600 font-semibold">
          <mat-icon class="mr-3 rtl:ml-3">content_paste</mat-icon>
          Blank
        </div>
      </div>
    </mat-card>

    <!-- Contact Information -->
    <mat-card class="default shadow-md mt-6">
      <mat-card-content class="!pt-2 px-2">
        <div class="flex flex-col mb-4">
          <div class="flex items-center p-2 hover:bg-hover rounded-lg">
            <mat-icon class="mr-3 rtl:ml-3 text-primary">public</mat-icon>
            <div class="text-secondary">https://ltemplate.dev</div>
          </div>
        </div>
        <div class="flex flex-col mb-4">
          <div class="flex items-center p-2 hover:bg-hover rounded-lg">
            <mat-icon class="mr-3 rtl:ml-3 text-primary">email</mat-icon>
            <div class="text-secondary">watson&#64;example.com</div>
          </div>
        </div>
        <div class="flex flex-col mb-4">
          <div class="flex items-center p-2 hover:bg-hover rounded-lg">
            <mat-icon class="mr-3 rtl:ml-3 text-primary">phone</mat-icon>
            <div class="text-secondary">+1 (555) 234-5678</div>
          </div>
        </div>
        <div class="flex flex-col mb-4">
          <div class="flex items-center p-2 hover:bg-hover rounded-lg">
            <mat-icon class="mr-3 rtl:ml-3 text-primary">add_location</mat-icon>
            <div class="text-secondary">San Francisco, CA, USA</div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  </div>

  <!-- Profile Views -->
  <div class="w-full md:w-1/2 xl:w-[calc(100%-300px)] lg:w-[calc(100%-300px)] pl-0">
    <router-outlet></router-outlet>
  </div>
</div>
```

---

#### 📄 `src/app/views/profile/profile.component.ts`

```typescript
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatDividerModule
    ]
})
export class ProfileComponent implements OnInit {
  activeView: string = "overview";
  user: Observable<User | null>;
  // Doughnut
  doughnutChartColors: any[] = [
    {
      backgroundColor: ["#fff", "rgba(0, 0, 0, .24)"],
    },
  ];

  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, this.total1 - this.data1];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, this.total2 - this.data2];

  doughnutChartType = "doughnut";
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: "bottom",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    tooltips: {
      enabled: false,
    },
  };

  constructor(private router: ActivatedRoute, public jwtAuth: JwtAuthService) {}

  ngOnInit() {
    this.activeView = this.router.snapshot.params["view"];
    this.user = this.jwtAuth.user$;
  }
}

```

---

#### 📄 `src/app/views/profile/profile.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule as MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule as MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileBlankComponent } from './profile-blank/profile-blank.component';
import { ProfileRoutes } from "./profile.routing";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    SharedPipesModule,
    ProfileComponent,
    ProfileOverviewComponent,
    ProfileSettingsComponent,
    ProfileBlankComponent,
    RouterModule.forChild(ProfileRoutes)
  ],
  declarations: []
})
export class ProfileModule { }

```

---

#### 📄 `src/app/views/profile/profile.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from "./profile-overview/profile-overview.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { ProfileBlankComponent } from "./profile-blank/profile-blank.component";

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'overview',
        component: ProfileOverviewComponent,
        data: { title: 'Overview', breadcrumb: 'OVERVIEW' }
      }, 
      {
        path: 'settings',
        component: ProfileSettingsComponent,
        data: { title: 'Settings', breadcrumb: 'SETTINGS' }
      }, 
      {
        path: 'blank',
        component: ProfileBlankComponent,
        data: { title: 'Blank', breadcrumb: 'BLANK' }
      }
    ]
  }
];

```

---

#### 📄 `src/app/views/profile/profile.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile.component";
import { ProfileOverviewComponent } from "./profile-overview/profile-overview.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { ProfileBlankComponent } from "./profile-blank/profile-blank.component";

export const ProfileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [{
      path: 'overview',
      component: ProfileOverviewComponent,
      data: { title: 'Overview', breadcrumb: 'OVERVIEW' }
    }, 
    {
      path: 'settings',
      component: ProfileSettingsComponent,
      data: { title: 'Settings', breadcrumb: 'SETTINGS' }
    }, 
    {
      path: 'blank',
      component: ProfileBlankComponent,
      data: { title: 'Blank', breadcrumb: 'BLANK' }
    }]
  }
];
```

---

#### 📄 `src/app/views/search-view/country.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
      private http: HttpClient
  ) { }

  getCountries(name) {
      return this.http.get<any[]>('https://restcountries.com/v3.1/name/'+name);
  }
}

```

---

#### 📄 `src/app/views/search-view/result-page/result-page.component.html`

```html
<div class="m-4">
  <h2 class="mt-0">Search result for "{{ searchService.searchTerm$ | async }}"</h2>
</div>

<div class="elevation-1 m-4 rounded-md">
  <div *ngFor="let item of countries$ | async" class="flex justify-start p-4">
    <div class="mr-4">{{item.flag}}</div>
    <div class="mr-4">{{item.name.common}}</div>
    <div class="text-secondary">{{item.name.official}}</div>
  </div>
</div>
```

---

#### 📄 `src/app/views/search-view/result-page/result-page.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SearchService } from "app/shared/search/search.service";
import { Observable, Subscription } from "rxjs";
import { CountryService } from "../country.service";

@Component({
    selector: "app-result-page",
    templateUrl: "./result-page.component.html",
    styleUrls: ["./result-page.component.scss"],
    standalone: false
})
export class ResultPageComponent implements OnInit, OnDestroy {
  countries$: Observable<any[]>;
  searchTermSub: Subscription;

  constructor(
    public searchService: SearchService,
    public countryService: CountryService
  ) {}

  ngOnInit() {
    this.searchTermSub = this.searchService.searchTerm$.subscribe(term => {
      this.countries$ = this.countryService.getCountries(term);
    });
  }

  ngOnDestroy() {
    if (this.searchTermSub) {
      this.searchTermSub.unsubscribe();
    }
  }
  
}

```

---

#### 📄 `src/app/views/search-view/search-view-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultPageComponent } from './result-page/result-page.component';

const routes: Routes = [
    {
        path: '',
        component: ResultPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchViewRoutingModule { }

```

---

#### 📄 `src/app/views/search-view/search-view.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SearchViewRoutingModule } from "./search-view-routing.module";
import { ResultPageComponent } from "./result-page/result-page.component";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [ResultPageComponent],
  imports: [
    MatCardModule, 
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    SearchViewRoutingModule
  ]
})
export class SearchViewModule {}

```

---

#### 📄 `src/app/views/sessions/error/error.component.html`

```html
<div class="flex min-h-screen bg-card relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  <!-- Container with gradient effects applied via SCSS -->
  <div class="container flex min-h-screen mx-auto relative z-10" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">
    <div class="flex-1 flex flex-col items-center justify-center p-8">
      
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center mb-4">
          <img src="assets/images/illustrations/500_error.svg" alt="404 Error Illustration" class="mb-8">
          <h1 class="text-2xl font-semibold mb-2">Internal Server Error</h1>
          <p class="text-secondary text-center mb-6">Server Error! Something went wrong on our end. We are working to fix the problem.</p>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            mat-flat-button 
            color="primary" 
            class="py-2" 
            [routerLink]="['/']">
            Back to Dashboard
          </button>
          
          <button 
            mat-stroked-button
            class="py-2">
            Report this Problem
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

```

---

#### 📄 `src/app/views/sessions/error/error.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatButtonModule
    ]
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/sessions/forgot-password/forgot-password.component.html`

```html
<div class="flex min-h-screen bg-card relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  <!-- Container with gradient effects applied via SCSS -->
  <div class="container flex min-h-screen mx-auto relative z-10" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">

    <!-- Left Column -->
    <div class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="flex items-center gap-2 mb-12">
        <img src="assets/images/ltemplate.svg" alt="Ltemplate" class="h-10">
        <span class="text-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text font-bold">Ltemplate</span>
      </div>
      <div class="w-full max-w-md">
        <div class="mb-6">
          <h1 class="text-2xl font-semibold">Reset Password</h1>
          <p class="text-secondary">We'll send password reset instructions to your registered email address</p>
        </div>

        <p *ngIf="errorMsg" class="text-center mb-4 text-red-500"><small>{{errorMsg}}</small></p>

        <form #fpForm="ngForm" (ngSubmit)="submitEmail()" class="space-y-4">
          <div>
            <mat-form-field class="w-full">
              <mat-label>Email*</mat-label>
              <input
                matInput
                name="email"
                required
                [(ngModel)]="userEmail"
                #email="ngModel"
                placeholder="john.doe@example.com">
              <mat-error *ngIf="email.errors && (email.dirty || email.touched) && (email?.errors?.required)">
                Email is required
              </mat-error>
            </mat-form-field>
          </div>

          <button 
            mat-flat-button 
            color="primary" 
            class="w-full py-2" 
            [disabled]="fpForm.invalid">
            Send Reset Link
          </button>
          
          <div class="text-center pt-4">
            <span class="text-secondary">Remember your password? </span>
            <a routerLink="/sessions/signin" class="text-blue-500 hover:text-blue-600">Sign in</a>
          </div>
          
          <div class="text-center">
            <span class="text-secondary">Don't have an account? </span>
            <a routerLink="/sessions/signup" class="text-blue-500 hover:text-blue-600">Sign up</a>
          </div>
        </form>
      </div>
    </div>

    <!-- Right Column -->
    <div class="hidden lg:flex w-1/2 p-8">
      
      <div class="flex flex-col justify-center items-center max-w-lg mx-auto">
        <img src="assets/images/illustrations/forgot-password.svg" alt="Forgot Password Illustration" class="mb-8">
      </div>
    </div>
  </div>
</div>


```

---

#### 📄 `src/app/views/sessions/forgot-password/forgot-password.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatProgressBarModule
    ]
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: string;
  errorMsg: string = '';
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  
  constructor() { }

  ngOnInit() {
  }
  
  submitEmail() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}

```

---

#### 📄 `src/app/views/sessions/forgot-password2/forgot-password2.component.css`

```css
.page-wrap {
    background-image: url('../../../../assets/images/backgrounds/signin.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  
  .page-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(var(--color-primary), 0.8);
  }
```

---

#### 📄 `src/app/views/sessions/forgot-password2/forgot-password2.component.html`

```html
<div class="page-wrap flex flex-col justify-center items-center !min-h-screen slate">
  <div class="xs:min-w-full sm:min-w-96 min-w-72" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">
    <mat-progress-bar mode="determinate" class="session-progress"></mat-progress-bar>
    <mat-card class="!m-0 sm:h-auto h-screen sm:!rounded-md !rounded-none">
      <mat-card-content>
        <div class="flex flex-col justify-start items-start !py-4">
          <p class="text-xl mb-1 font-bold">Reset Password</p>
          <p class="text-secondary">We'll send password reset instructions to your registered email address</p>
        </div>

        <p *ngIf="errorMsg" class="text-center"><small class="text-red">{{errorMsg}}</small></p>

        <form #fpForm="ngForm" (ngSubmit)="submitEmail()">
          <div class="">
            <mat-form-field class="w-full">
              <input
                matInput
                name="email"
                required
                [(ngModel)]="userEmail"
                #email="ngModel"
                placeholder="Email"
                value="">
            </mat-form-field>
            <small
              *ngIf="email.errors && (email.dirty || email.touched) && (email?.errors?.required)"
              class="form-error-msg"> Email is required </small>
          </div>

          <button mat-raised-button color="primary" class="w-full mb-4" [disabled]="fpForm.invalid">Send Reset Link</button>
          
          <div class="flex justify-center items-center">
            <a [routerLink]="'/sessions/signin2'" class="text-primary">Sign in</a>
            <span class="mx-2">|</span>
            <a [routerLink]="'/sessions/signup2'" class="text-primary">Create a new account</a>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  </div>
</div>


```

---

#### 📄 `src/app/views/sessions/forgot-password2/forgot-password2.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton as MatButton } from '@angular/material/button';
import { MatProgressBar as MatProgressBar } from '@angular/material/progress-bar';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-forgot-password2',
    templateUrl: './forgot-password2.component.html',
    styleUrls: ['./forgot-password2.component.css'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatProgressBarModule
    ]
})
export class ForgotPassword2Component implements OnInit {
  userEmail: string;
  errorMsg: string = '';
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  
  constructor() { }

  ngOnInit() {
  }
  
  submitEmail() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}

```

---

#### 📄 `src/app/views/sessions/lockscreen/lockscreen.component.html`

```html
<div class="flex min-h-screen bg-card relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  <!-- Container with gradient effects applied via SCSS -->
  <div class="container flex min-h-screen mx-auto relative z-10" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">

    <!-- Left Column -->
    <div class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="flex items-center gap-2 mb-12">
        <img src="assets/images/ltemplate.svg" alt="Ltemplate" class="h-10">
        <span class="text-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text font-bold">Ltemplate</span>
      </div>
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center mb-6">
          <img class="w-24 h-24 rounded-full object-cover mb-4" src="assets/images/face-3.jpg" alt="User profile">
          <h2 class="text-2xl font-semibold text-slate-800">John Doe</h2>
          <p class="text-secondary">Last seen 1 hour ago</p>
        </div>

        <form #lockscreenForm="ngForm" (ngSubmit)="unlock()" class="space-y-4">
          <div>
            <mat-form-field class="w-full">
              <mat-label>Password*</mat-label>
              <input 
                matInput
                type="password"
                name="password"
                required
                [(ngModel)]="lockscreenData.password"
                #password="ngModel"
                placeholder="••••••••••">
              <button mat-icon-button matSuffix type="button">
                <mat-icon>lock_outline</mat-icon>
              </button>
              <mat-error *ngIf="password.errors && (password.dirty || password.touched) && (password?.errors?.required)">
                Password is required
              </mat-error>
            </mat-form-field>
          </div>

          <button 
            mat-flat-button 
            color="primary" 
            class="w-full py-2" 
            [disabled]="lockscreenForm.invalid">
            Unlock
          </button>
          
          <div class="text-center pt-4">
            <a routerLink="/sessions/signin" class="text-blue-500 hover:text-blue-600">Sign in with a different account</a>
          </div>
        </form>
      </div>
    </div>

    <!-- Right Column -->
    <div class="hidden lg:flex w-1/2 p-8">
      <div class="flex flex-col justify-center items-center max-w-lg mx-auto">
        <img src="assets/images/illustrations/lock-and-key.svg" alt="Security Illustration" class="mb-8">
        <h1 class="font-medium text-2xl leading-tight text-center mb-8">
          Your session is locked
        </h1>
      </div>
    </div>
  </div>
</div>


```

---

#### 📄 `src/app/views/sessions/lockscreen/lockscreen.component.scss`

```scss
.screen-bottom-left-gradient {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -10%;
    bottom: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.2) 25%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    filter: blur(50px);
    z-index: 0;
  }
}

.screen-bottom-right-gradient {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -5%;
    bottom: -5%;
    width: 40%;
    height: 40%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(147, 197, 253, 0.15) 50%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    filter: blur(40px);
    z-index: 0;
  }
} 
```

---

#### 📄 `src/app/views/sessions/lockscreen/lockscreen.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-lockscreen',
    templateUrl: './lockscreen.component.html',
    styleUrls: ['./lockscreen.component.scss'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressBarModule
    ]
})
export class LockscreenComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  lockscreenData = {
    password: ''
  }

  constructor() { }

  ngOnInit() {
  }

  unlock() {
    console.log(this.lockscreenData);

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}

```

---

#### 📄 `src/app/views/sessions/not-found/not-found.component.html`

```html
<div class="flex min-h-screen bg-card relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  <!-- Container with gradient effects applied via SCSS -->
  <div class="container flex min-h-screen mx-auto relative z-10" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">
    <div class="flex-1 flex flex-col items-center justify-center p-8">
      
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center mb-4">
          <img src="assets/images/illustrations/404.svg" alt="404 Error Illustration" class="mb-8">
          <h1 class="text-2xl font-semibold mb-2">Page Not Found!</h1>
          <p class="text-secondary text-center mb-6">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            mat-flat-button 
            color="primary" 
            class="py-2" 
            [routerLink]="['/']">
            Back to Dashboard
          </button>
          
          <button 
            mat-stroked-button
            class="py-2">
            Report this Problem
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

```

---

#### 📄 `src/app/views/sessions/not-found/not-found.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatButtonModule
    ]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

---

#### 📄 `src/app/views/sessions/sessions.module.ts`

```typescript
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { TranslateModule } from '@ngx-translate/core';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SessionsRoutes } from "./sessions.routing";
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { Signup2Component } from './signup2/signup2.component';
import { Signup3Component } from './signup3/signup3.component';
import { Signin3Component } from './signin3/signin3.component';
import { Signin2Component } from './signin2/signin2.component';
import { commonMaterialModules, allMaterialModules } from 'app/shared/material-imports';
import { DividerComponent } from 'app/shared/components/divider/divider.component';
import { ForgotPassword2Component } from './forgot-password2/forgot-password2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ...commonMaterialModules,
    ...allMaterialModules,
    PerfectScrollbarModule,
    DividerComponent,
    ForgotPasswordComponent,
    ForgotPassword2Component,
    LockscreenComponent, 
    SigninComponent, 
    SignupComponent, 
    NotFoundComponent, 
    ErrorComponent, 
    Signup2Component, 
    Signup3Component, 
    Signin3Component, 
    Signin2Component,
    RouterModule.forChild(SessionsRoutes)
  ],
  declarations: []
})
export class SessionsModule { }
```

---

#### 📄 `src/app/views/sessions/sessions.routes.ts`

```typescript
export { SessionsRoutes } from './sessions.routing';

```

---

#### 📄 `src/app/views/sessions/sessions.routing.ts`

```typescript
import { Signup3Component } from './signup3/signup3.component';
import { Signup2Component } from './signup2/signup2.component';
import { Routes } from "@angular/router";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ErrorComponent } from "./error/error.component";
import { Signin3Component } from './signin3/signin3.component';
import { Signin2Component } from './signin2/signin2.component';
import { ForgotPassword2Component } from './forgot-password2/forgot-password2.component';

export const SessionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "signin",
        component: SigninComponent,
        data: { title: "Signin" }
      },
      {
        path: "signup",
        component: SignupComponent,
        data: { title: "Signup" }
      },
      {
        path: "signup2",
        component: Signup2Component,
        data: { title: "Signup2" }
      },
      {
        path: "signin2",
        component: Signin2Component,
        data: { title: "Signin2" }
      },
      {
        path: "signup3",
        component: Signup3Component,
        data: { title: "Signup3" }
      },
      {
        path: "signin3",
        component: Signin3Component,
        data: { title: "sign-in-3" }
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        data: { title: "Forgot password" }
      },
      {
        path: "forgot-password2",
        component: ForgotPassword2Component,
        data: { title: "Forgot password" }
      },
      {
        path: "lockscreen",
        component: LockscreenComponent,
        data: { title: "Lockscreen" }
      },
      {
        path: "404",
        component: NotFoundComponent,
        data: { title: "Not Found" }
      },
      {
        path: "error",
        component: ErrorComponent,
        data: { title: "Error" }
      }
    ]
  }
];

```

---

#### 📄 `src/app/views/sessions/signin/signin.component.html`

```html
<mat-progress-bar mode="determinate" class="absolute top-0 left-0 right-0 invisible" [ngClass]="{'!visible': isLoading}"></mat-progress-bar>

<div class="flex min-h-screen bg-card relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  <!-- Container with gradient effects applied via SCSS -->
  <div class="container flex min-h-screen mx-auto relative z-10" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">

    <!-- Left Column -->
    <div class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="flex items-center gap-2 mb-12">
        <img src="assets/images/ltemplate.svg" alt="Ltemplate" class="h-10">
        <span class="text-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text font-bold">Ltemplate</span>
      </div>
      <div class="w-full max-w-md">        
        <p *ngIf="errorMsg" class="text-center mb-4 text-red-500"><small>{{errorMsg}}</small></p>
        
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="">
          <div>
            <mat-form-field class="w-full">
              <mat-label>Email*</mat-label>
              <input matInput type="email" formControlName="email" placeholder="watson@example.com">
              <mat-error *ngIf="signupForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="signupForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="w-full">
              <mat-label>Password*</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password"
                placeholder="••••••••••">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="signupForm.get('password')?.hasError('required')">Password is required</mat-error>
            </mat-form-field>
            <p><a [routerLink]="'/sessions/forgot-password'" class="text-primary text-center full-width">Forgot password?</a></p>
          </div>

          <mat-checkbox formControlName="remember" color="primary">Trust this device for 30 days</mat-checkbox>

          <button mat-flat-button color="primary" type="submit" class="w-full py-2 my-4" [disabled]="signupForm.invalid">
            Sign In
          </button>

          <div class="text-center">
            <span class="text-secondary">Don't have an account? </span>
            <a routerLink="/sessions/signup" class="text-blue-500 hover:text-blue-600">Sign up</a>
          </div>

          <Ltemplate-divider text="OR" class="my-10"></Ltemplate-divider>

          <div class="flex flex-col gap-4">
            <button mat-stroked-button type="button" class="w-full !bg-card py-2 flex justify-center items-center gap-2">
              <mat-icon svgIcon="eg_google" aria-hidden="false"></mat-icon>
              <span>Sign in with Google</span>
            </button>

            <button mat-stroked-button type="button" class="w-full !bg-card py-2 flex justify-center items-center gap-2">
              <mat-icon svgIcon="eg_meta" aria-hidden="false"></mat-icon>
              <span>Sign in with Meta</span>
            </button>

            <button mat-stroked-button type="button" class="w-full !bg-card py-2 flex justify-center items-center gap-2">
              <mat-icon svgIcon="eg_apple" aria-hidden="false"></mat-icon>
              <span>Sign in with Apple</span>
            </button>

          </div>

        </form>
      </div>
    </div>

    <!-- Right Column -->
    <div class="hidden lg:flex w-1/2 p-8">
      <div class="flex flex-col justify-center items-center max-w-lg mx-auto">
        
        <img src="assets/images/illustrations/meditating_girl.svg" alt="Ltemplate illustration" class="mb-8">
        <h1 class="font-medium text-2xl leading-tight text-center mb-8">
          Code less, build more with
          <span class="bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text font-bold">Ltemplate!</span>
        </h1>
      </div>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/sessions/signin/signin.component.ts`

```typescript
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DividerComponent } from 'app/shared/components/divider/divider.component';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatCheckboxModule,
      DividerComponent
    ]
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  isLoading = false;

  signupForm: UntypedFormGroup;
  hidePassword = true;
  errorMsg = '';
  private _unsubscribeAll: Subject<any>;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jwtAuth: JwtAuthService,
    private LtemplateLoader: AppLoaderService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['watson@example.com', [Validators.required, Validators.email]],
      password: ['12345678', Validators.required],
      remember: [false]
    });
  }

  ngAfterViewInit() {
    // Uncomment if you want auto sign-in
    // this.autoSignIn();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signinData = this.signupForm.value;
      
      this.submitButton.disabled = true;
      this.progressBar.mode = 'indeterminate';
      this.isLoading = true;
      this.jwtAuth.signin(signinData.email, signinData.password)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl(this.jwtAuth.return);
          this.isLoading = false;
        },
        error: (err) => {
          this.submitButton.disabled = false;
          this.progressBar.mode = 'determinate';
          this.errorMsg = err.message;
          this.isLoading = false;
        }
      });
    }
  }

  autoSignIn() {
    if (this.jwtAuth.return === '/') {
      return;
    }
    this.LtemplateLoader.open(`Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(0, 20)}...`, {width: '320px'});
    setTimeout(() => {
      this.onSubmit();
      this.LtemplateLoader.close();
    }, 2000);
  }
}

```

---

#### 📄 `src/app/views/sessions/signin2/signin2.component.css`

```css
.page-wrap {
  background-image: url('../../../../assets/images/backgrounds/signin.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.page-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(var(--color-primary), 0.8);
}
```

---

#### 📄 `src/app/views/sessions/signin2/signin2.component.html`

```html
<div class="page-wrap flex flex-col justify-center items-center !min-h-screen slate">
  <div class="xs:min-w-full sm:min-w-96 min-w-72" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">
    <mat-progress-bar mode="determinate" class="session-progress"></mat-progress-bar>
    <mat-card class="!m-0 sm:h-auto h-screen sm:!rounded-md !rounded-none">
      <mat-card-content>
        <div class="flex flex-col justify-start items-start !py-4">
          <p class="text-xl mb-1 font-bold">Sign in to Ltemplate</p>
          <p><span class="text-secondary">New here? </span> <a [routerLink]="'/sessions/signup2'"
              class="text-primary text-center full-width">Create a new account</a></p>
        </div>

        <p *ngIf="errorMsg" class="text-center"><small class="text-red">{{errorMsg}}</small></p>

        <form [formGroup]="signinForm" (ngSubmit)="signin()">
          <div class="">
            <mat-form-field class="w-full">
              <input matInput name="username" [formControl]="signinForm.controls['username']" placeholder="Username"
                value="">
            </mat-form-field>
            <small
              *ngIf="signinForm.controls['username'].hasError('required') && signinForm.controls['username'].touched"
              class="form-error-msg"> Username is required </small>
          </div>

          <div class="">
            <mat-form-field class="w-full">
              <input type="password" name="password" matInput [formControl]="signinForm.controls['password']"
                placeholder="Password" value="">
              @if (signinForm.controls['password'].hasError('required') && signinForm.controls['password'].touched) {
              <mat-error>Password is <strong>required</strong></mat-error>
              }
            </mat-form-field>

          </div>

          <div class="">
            <mat-checkbox name="remember" [formControl]="signinForm.controls['remember']" class="!pb-4">Trust this device</mat-checkbox>
          </div>

          <button mat-raised-button color="primary" class="w-full mb-4" [disabled]="signinForm.invalid">Sign in</button>
          <a [routerLink]="'/sessions/forgot-password2'" class="text-primary text-center full-width">Forgot password?</a>
        </form>

        <div class="w-full">
          <Ltemplate-divider text="OR" class="my-4"></Ltemplate-divider>
          <button mat-stroked-button class="w-full flex items-center justify-center py-2">
            Sign in with Google
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  </div>
</div>
```

---

#### 📄 `src/app/views/sessions/signin2/signin2.component.ts`

```typescript
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton as MatButton } from '@angular/material/button';
import { MatProgressBar as MatProgressBar } from '@angular/material/progress-bar';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DividerComponent } from 'app/shared/components/divider/divider.component';

@Component({
    selector: 'app-signin2',
    templateUrl: './signin2.component.html',
    styleUrls: ['./signin2.component.css'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      MatProgressBarModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule,
      MatButtonModule,
      DividerComponent
    ]
})
export class Signin2Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: UntypedFormGroup;
  errorMsg = '';
  // return: string;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private LtemplateLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new UntypedFormGroup({
      username: new UntypedFormControl('Watson', Validators.required),
      password: new UntypedFormControl('12345678', Validators.required),
      remember: new UntypedFormControl(true)
    });

    // this.route.queryParams
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(params => this.return = params['return'] || '/');
  }

  ngAfterViewInit() {
    // this.autoSignIn();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    
    this.jwtAuth.signin(signinData.username, signinData.password)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl(this.jwtAuth.return);
      },
      error: (err) => {
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
        this.errorMsg = err.message;
      }
    });
  }

  autoSignIn() {    
    if(this.jwtAuth.return === '/') {
      return
    }
    this.LtemplateLoader.open(`Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(0, 20)}...`, {width: '320px'});
    setTimeout(() => {
      this.signin();
      console.log('autoSignIn');
      this.LtemplateLoader.close()
    }, 2000);
  }

}

```

---

#### 📄 `src/app/views/sessions/signin3/signin3.component.html`

```html
<div [perfectScrollbar]="{}" class="flex min-h-screen bg-card justify-center items-center relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  
  <div
    class="bg-card relative z-10 shadow-lg flex flex-wrap flex-col md:flex-row justify-start w-full max-w-4xl rounded-lg overflow-hidden"
    [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">

    <!-- Left Side content -->
    <div class="bg-primary-50 dark:bg-slate-700 flex flex-col justify-center items-center w-full md:w-2/5 p-8">
      <img class="w-48 h-auto mb-6" src="assets/images/illustrations/meditating_girl.svg" alt="Meditation illustration">
      <h2 class="text-2xl font-medium text-primary-900 text-center mb-2">Welcome Back</h2>
      <p class="text-sm text-secondary text-center">Sign in to access your account</p>
    </div>

    <!-- Right side content -->
    <div class="flex flex-col justify-center items-center w-full md:w-3/5 p-8">
      <div class="w-full max-w-sm">
        <h1 class="text-2xl font-bold mb-6">Sign In</h1>
        
        <form [formGroup]="signupForm" class="space-y-4" (ngSubmit)="onSubmit()">
          <mat-form-field class="w-full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" name="email" placeholder="your.email@example.com" />
            <mat-icon matPrefix class="mr-2 text-secondary">email</mat-icon>
            <mat-error *ngIf="signupForm.get('email')?.invalid">Please enter a valid email</mat-error>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" name="password" />
            <mat-icon matPrefix class="mr-2 text-secondary">lock</mat-icon>
            <button mat-icon-button matSuffix type="button" (click)="togglePasswordVisibility()" tabindex="-1" class="text-secondary">
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="signupForm.get('password')?.invalid">Password is required</mat-error>
          </mat-form-field>

          <div class="flex items-center justify-between w-full">
            <mat-checkbox formControlName="remember" color="primary" class="text-secondary">
              Remember me
            </mat-checkbox>
            <a class="text-sm text-primary-600 hover:text-primary-800 font-medium" routerLink="/sessions/forgot-password">
              Forgot password?
            </a>
          </div>

          <button mat-flat-button color="primary" class="w-full py-2" type="submit" [disabled]="signupForm.invalid">
            Sign In
          </button>

          <div class="flex items-center justify-center mt-6 space-x-1 text-sm">
            <span class="text-secondary">Don't have an account?</span>
            <a class="font-medium text-primary-600 hover:text-primary-800" routerLink="/sessions/signup3">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/sessions/signin3/signin3.component.scss`

```scss
// same as _signup-4.scss
```

---

#### 📄 `src/app/views/sessions/signin3/signin3.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';

@Component({
    selector: 'app-signin3',
    templateUrl: './signin3.component.html',
    styleUrls: ['./signin3.component.scss'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatCheckboxModule,
      PerfectScrollbarModule
    ]
})
export class Signin3Component implements OnInit {

  signupForm: UntypedFormGroup;
  hidePassword = true;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {
        email: ["",[Validators.required,Validators.email]],
        password: password,
        remember: [false,Validators.required]
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
    }
  }

}

```

---

#### 📄 `src/app/views/sessions/signup/signup.component.html`

```html
<mat-progress-bar mode="determinate" class="absolute top-0 left-0 right-0 invisible" [ngClass]="{'!visible': isLoading}"></mat-progress-bar>

<div class="flex min-h-screen bg-card relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  <!-- Container with gradient effects applied via SCSS -->
  <div class="container flex min-h-screen mx-auto relative z-10" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">

    <!-- Left Column -->
    <div class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="flex items-center gap-2 mb-12">
        <img src="assets/images/ltemplate.svg" alt="Ltemplate" class="h-10">
        <span class="text-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text font-bold">Ltemplate</span>
      </div>
      <div class="w-full max-w-md">
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="">
          <div>
            <mat-form-field class="w-full">
              <mat-label>First Name*</mat-label>
              <input matInput type="text" formControlName="firstName" placeholder="John">
              <mat-error *ngIf="signupForm.get('firstName')?.hasError('required')">First name is required</mat-error>
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="w-full">
              <mat-label>Last Name*</mat-label>
              <input matInput type="text" formControlName="lastName" placeholder="Doe">
              <mat-error *ngIf="signupForm.get('lastName')?.hasError('required')">Last name is required</mat-error>
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="w-full">
              <mat-label>Email*</mat-label>
              <input matInput type="email" formControlName="email" placeholder="john.doe@example.com">
              <mat-error *ngIf="signupForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="signupForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="w-full">
              <mat-label>Password*</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password"
                placeholder="••••••••••">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="signupForm.get('password')?.hasError('required')">Password is required</mat-error>
            </mat-form-field>
          </div>

          <mat-checkbox formControlName="agreed" color="primary">I agree to the Terms of Service and Privacy Policy</mat-checkbox>

          <button mat-flat-button color="primary" type="submit" class="w-full py-2 my-4">
            Sign Up
          </button>

          <div class="text-center">
            <span class="text-secondary">Already have an account? </span>
            <a routerLink="/sessions/signin" class="text-blue-500 hover:text-blue-600">Sign in</a>
          </div>

          <Ltemplate-divider text="OR" class="my-10"></Ltemplate-divider>

          <div class="flex flex-col gap-4">
            <button mat-stroked-button type="button" class="w-full !bg-card py-2 flex justify-center items-center gap-2">
              <mat-icon svgIcon="eg_google" aria-hidden="false"></mat-icon>
              <span>Sign up with Google</span>
            </button>

            <button mat-stroked-button type="button" class="w-full !bg-card py-2 flex justify-center items-center gap-2">
              <mat-icon svgIcon="eg_meta" aria-hidden="false"></mat-icon>
              <span>Sign up with Meta</span>
            </button>

            <button mat-stroked-button type="button" class="w-full !bg-card py-2 flex justify-center items-center gap-2">
              <mat-icon svgIcon="eg_apple" aria-hidden="false"></mat-icon>
              <span>Sign up with Apple</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Right Column -->
    <div class="hidden lg:flex w-1/2 p-8">
      <div class="flex flex-col justify-center items-center max-w-lg mx-auto">
        <img src="assets/images/illustrations/meditating_girl.svg" alt="Ltemplate illustration" class="mb-8">
        <h1 class="font-medium text-2xl leading-tight text-center mb-8">
          Code less, build more with
          <span class="bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text font-bold">Ltemplate!</span>
        </h1>
      </div>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/sessions/signup/signup.component.ts`

```typescript
import { ErrorStateMatcher } from '@angular/material/core';
import { Validators, UntypedFormGroup, NgForm, FormGroupDirective, UntypedFormControl, AbstractControl, ValidationErrors } from "@angular/forms";
import { UntypedFormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DividerComponent } from 'app/shared/components/divider/divider.component';

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatCheckboxModule,
      DividerComponent
    ]
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;
  hidePassword = true;
  isLoading = false;
  
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      agreed: [false, Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Handle form submission
      console.log(this.signupForm.value);
    }
  }
}
```

---

#### 📄 `src/app/views/sessions/signup2/signup2.component.css`

```css
.page-wrap {
    background-image: url('../../../../assets/images/backgrounds/signin.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.page-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(var(--color-primary), 0.8);
}
```

---

#### 📄 `src/app/views/sessions/signup2/signup2.component.html`

```html
<div class="page-wrap flex flex-col justify-center items-center !min-h-screen slate">
  <div class="xs:min-w-full sm:min-w-96 min-w-72" [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">
    <mat-progress-bar mode="determinate" class="session-progress"></mat-progress-bar>
    <mat-card class="!m-0 sm:h-auto h-screen sm:!rounded-md !rounded-none">
      <mat-card-content>
        <div class="flex flex-col justify-start items-start !py-4">
          <p class="text-xl mb-1 font-bold">Sign up to Ltemplate</p>
          <p><span class="text-secondary">Already have an account? </span> <a [routerLink]="'/sessions/signin2'"
              class="text-primary text-center full-width">Sign in</a></p>
        </div>

        <p *ngIf="errorMsg" class="text-center"><small class="text-red">{{errorMsg}}</small></p>

        <form [formGroup]="signupForm" (ngSubmit)="signup()">
          <div class="">
            <mat-form-field class="w-full">
              <input
                matInput
                type="email"
                name="email"
                [formControl]="signupForm.controls['email']"
                placeholder="Your Email"
                value="">
            </mat-form-field>
            <small 
              *ngIf="signupForm.controls['email'].hasError('required') && signupForm.controls['email'].touched" 
              class="form-error-msg"> Email is required </small>

              <small 
                *ngIf="signupForm.controls['email'].hasError('email') && signupForm.controls['email'].touched" 
                class="form-error-msg"> Invalid email address </small>
          </div>

          <div class="">
            <mat-form-field class="w-full">
              <input 
                type="password"
                name="password"
                matInput
                [formControl]="signupForm.controls['password']"
                placeholder="Password" 
                value="">
            </mat-form-field>
            <small 
              *ngIf="signupForm.controls['password'].hasError('required') && signupForm.controls['password'].touched" 
              class="form-error-msg"> Password is required </small>
          </div>
          
          <div class="!pb-4">
            <mat-checkbox
              name="agreed"
              [formControl]="signupForm.controls['agreed']"
              class="">I have read and agree to the Terms of Service.</mat-checkbox>

              <small 
                *ngIf="signupForm.controls['agreed'].hasError('agreed') && signupForm.controls['agreed'].touched" 
                class="form-error-msg"> You must agree to the Terms of Service </small>
          </div>

          <button mat-raised-button color="primary" class="w-full" [disabled]="signupForm.invalid">Sign up</button>
        </form>

        <div class="w-full">
          <Ltemplate-divider text="OR" class="my-6"></Ltemplate-divider>
          <button mat-stroked-button class="w-full flex items-center justify-center py-2">
            Sign up with Google
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  </div>
</div>

```

---

#### 📄 `src/app/views/sessions/signup2/signup2.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton as MatButton } from '@angular/material/button';
import { MatProgressBar as MatProgressBar } from '@angular/material/progress-bar';
import { Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DividerComponent } from 'app/shared/components/divider/divider.component';

@Component({
    selector: 'app-signup2',
    templateUrl: './signup2.component.html',
    styleUrls: ['./signup2.component.css'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      MatProgressBarModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule,
      MatButtonModule,
      DividerComponent
    ]
})
export class Signup2Component implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: UntypedFormGroup;
  errorMsg: string = '';
  
  constructor() {}

  ngOnInit() {
    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: password,
      agreed: new UntypedFormControl('', (control: UntypedFormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }

  signup() {
    const signupData = this.signupForm.value;
    console.log(signupData);

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

}

```

---

#### 📄 `src/app/views/sessions/signup3/signup3.component.html`

```html
<div [perfectScrollbar]="{}" class="flex min-h-screen bg-card justify-center items-center relative overflow-hidden screen-bottom-left-gradient screen-bottom-right-gradient">
  
  <div
    class="bg-card relative z-10 shadow-lg flex flex-wrap flex-col md:flex-row justify-start w-full max-w-4xl rounded-lg overflow-hidden"
    [@animate]="{value:'*',params:{y:'40px',opacity:'0',delay:'100ms', duration: '400ms'}}">

    <!-- Left Side content -->
    <div class="bg-primary-50 flex flex-col justify-center items-center w-full md:w-2/5 p-8">
      <img class="w-48 h-auto mb-6" src="assets/images/illustrations/meditating_girl.svg" alt="Posting photo illustration">
      <h2 class="text-2xl font-medium text-primary-900 text-center mb-2">Join Us Today</h2>
      <p class="text-sm text-secondary text-center">Create an account to get started</p>
    </div>

    <!-- Right side content -->
    <div class="flex flex-col justify-center items-center w-full md:w-3/5 p-8">
      <div class="w-full max-w-sm">
        <h1 class="text-2xl font-bold mb-6">Sign Up</h1>
        
        <form [formGroup]="signupForm" class="space-y-4" (ngSubmit)="onSubmit()">
          <mat-form-field class="w-full">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" type="text" name="username" placeholder="johndoe" />
            <mat-icon matPrefix class="mr-2 text-secondary">person</mat-icon>
            <mat-error *ngIf="signupForm.get('username')?.invalid">Username is required</mat-error>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" name="email" placeholder="your.email@example.com" />
            <mat-icon matPrefix class="mr-2 text-secondary">email</mat-icon>
            <mat-error *ngIf="signupForm.get('email')?.invalid">Please enter a valid email</mat-error>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" name="password" />
            <mat-icon matPrefix class="mr-2 text-secondary">lock</mat-icon>
            <button mat-icon-button matSuffix type="button" (click)="togglePasswordVisibility()" tabindex="-1" class="text-secondary">
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="signupForm.get('password')?.invalid">Password is required</mat-error>
          </mat-form-field>

          <div class="flex items-center w-full">
            <mat-checkbox formControlName="agreed" color="primary" class="text-secondary">
              I agree to the <a href="#" class="text-primary-600 hover:text-primary-800 font-medium">Terms of Service</a> and <a href="#" class="text-primary-600 hover:text-primary-800 font-medium">Privacy Policy</a>
            </mat-checkbox>
          </div>

          <button mat-flat-button color="primary" class="w-full py-2" type="submit" [disabled]="signupForm.invalid">
            Sign Up
          </button>

          <div class="flex items-center justify-center mt-6 space-x-1 text-sm">
            <span class="text-secondary">Already have an account?</span>
            <a class="font-medium text-primary-600 hover:text-primary-800" routerLink="/sessions/signin3">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/sessions/signup3/signup3.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';

@Component({
    selector: 'app-signup3',
    templateUrl: './signup3.component.html',
    styleUrls: ['./signup3.component.scss'],
    animations: LtemplateAnimations,
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatCheckboxModule,
      PerfectScrollbarModule
    ]
})
export class Signup3Component implements OnInit {

  signupForm: UntypedFormGroup;
  hidePassword = true;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {
        username: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
    }
  }
}

```

---

#### 📄 `src/app/views/shop/cart/cart.component.html`

```html
<div class="container mx-auto px-4 !py-6 max-w-7xl">
  <!-- Page Title & Navigation -->
  <div class="flex items-center justify-between mb-8">
    <h1 class="text-2xl font-bold">Your Shopping Cart</h1>
    <button 
      mat-button 
      routerLink="/shop" 
      class="text-secondary hover:text-primary-600 transition-colors"
    >
      <mat-icon>chevron_left</mat-icon>
      <span class="ml-1 hidden sm:inline-block">Continue Shopping</span>
    </button>
  </div>

  <!-- Cart Items Table -->
  <div class="mb-8" *ngIf="cart.length" [@animate]="{value:'*',params:{delay: '100ms', x:'-50px'}}">
    <div class="overflow-x-auto Ltemplate-card">
      <table class="w-full min-w-full">
        <thead class="bg-base border-b border-divider">
          <tr>
            <th class="px-6 py-4 text-xs font-medium text-secondary uppercase tracking-wider text-center">Remove</th>
            <th class="px-6 py-4 text-xs font-medium text-secondary uppercase tracking-wider text-center">Image</th>
            <th class="px-6 py-4 text-xs font-medium text-secondary uppercase tracking-wider text-left">Product</th>
            <th class="px-6 py-4 text-xs font-medium text-secondary uppercase tracking-wider text-right">Price</th>
            <th class="px-6 py-4 text-xs font-medium text-secondary uppercase tracking-wider text-center">Quantity</th>
            <th class="px-6 py-4 text-xs font-medium text-secondary uppercase tracking-wider text-right">Total</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr *ngFor="let item of cart" class="hover:bg-base border-divider transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <button 
                mat-icon-button 
                color="warn" 
                (click)="removeProduct(item)" 
                class="hover:bg-red-50 transition-colors"
              >
                <mat-icon>close</mat-icon>
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="flex items-center justify-center">
                <img 
                  class="h-16 w-16 rounded-md object-cover shadow-sm cursor-pointer"
                  [src]="item.product.photo" 
                  [routerLink]="['/shop/products', item.product._id]"
                  alt="Product thumbnail"
                >
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium hover:text-primary-600 cursor-pointer transition-colors"
                   [routerLink]="['/shop/products', item.product._id]">
                {{item.product.name}}
              </div>
              <div class="text-xs text-secondary mt-1" *ngIf="item.product.category">
                Category: {{item.product.category}}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              {{item.product.price.sale | currency}}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <input 
                class="w-16 px-2 py-1 text-center bg-base border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                min="1" 
                type="number" 
                (change)="onQuantityChange()" 
                [(ngModel)]="item.data.quantity"
              >
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              {{item.product.price.sale * item.data.quantity | currency}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Order Summary & Checkout -->
  <div class="flex flex-col md:flex-row gap-8" *ngIf="cart.length" [@animate]="{value:'*',params:{delay: '100ms', x:'50px'}}">
    <div class="flex-grow">
      <!-- Coupon code or additional features could go here -->
    </div>
    
    <div class="w-full md:w-1/3 lg:w-1/4">
      <div class="Ltemplate-card rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semiboldmb-4">Order Summary</h2>
        
        <div class="space-y-3 mb-6">
          <div class="flex justify-between items-center">
            <span class="text-secondary">Subtotal</span>
            <span class="font-medium">${{subTotal}}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-secondary">VAT</span>
            <span class="font-medium">{{vat}}%</span>
          </div>
          
          <div class="border-t border-divider pt-3 mt-3">
            <div class="flex justify-between items-center">
              <span class="font-semibold">Total</span>
              <span class="font-bold">${{total}}</span>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col space-y-3">
          <button 
            mat-raised-button 
            color="primary" 
            routerLink="/shop/checkout" 
            class="py-2 px-4 shadow-md"
          >
            Proceed to Checkout
          </button>
          
          <button 
            mat-stroked-button 
            routerLink="/shop" 
            class="py-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty Cart State -->
  <div *ngIf="!cart.length" [@animate]="{value:'*',params:{delay: '100ms', y:'-50px'}}">
    <div class="flex flex-col items-center justify-center Ltemplate-card rounded-lg shadow-md p-10 text-center">
      <mat-icon class="text-hint text-6xl mb-4 !h-[64px] !w-[64px]">shopping_cart</mat-icon>
      <h2 class="text-xl font-semibold mb-2">Your cart is empty</h2>
      <p class="text-secondary mb-6">Looks like you haven't added any products to your cart yet.</p>
      <button 
        mat-flat-button 
        color="primary" 
        routerLink="/shop" 
        class="py-2 px-6"
      >
        Browse Products
      </button>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/shop/cart/cart.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { ShopService, CartItem } from '../shop.service';
import { LtemplateAnimations } from "../../../shared/animations/ltemplate-animations";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    animations: [LtemplateAnimations],
    standalone: false
})
export class CartComponent implements OnInit {
  public cart: CartItem[];
  public total: number;
  public subTotal: number;
  public vat: number = 15;
  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.getCart();
    this.onQuantityChange();
  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  removeProduct(cartItem) {
    this.shopService
    .removeFromCart(cartItem)
    .subscribe(res => {
      this.cart = res;
    })
  }
  onQuantityChange() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity)
    })
    this.total = this.subTotal + (this.subTotal * (15/100))
  }

}

```

---

#### 📄 `src/app/views/shop/checkout/checkout.component.html`

```html
<div class="container mx-auto px-4 py-6 max-w-7xl">
  <!-- Page Title & Navigation -->
  <div class="flex items-center justify-between mb-4 mt-4 ml-4">
    <h1 class="text-2xl font-bold">Checkout</h1>
    <button 
      mat-button 
      routerLink="/shop/cart" 
      class="text-slate-600 hover:text-primary-600 transition-colors"
    >
      <mat-icon>chevron_left</mat-icon>
      <span class="ml-1 hidden sm:inline-block">Back to Cart</span>
    </button>
  </div>

  <div class="flex flex-col lg:flex-row gap-8" *ngIf="cart.length">
    <!-- Billing & Shipping Forms -->
    <div class="w-full lg:w-2/3" [@animate]="{value:'*',params:{delay: '100ms', x:'-50px'}}">
      <!-- Billing Address -->
      <div class="Ltemplate-card p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Billing Address</h2>
        
        <form [formGroup]="checkoutForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <mat-form-field class="w-full">
                <mat-label>Country</mat-label>
                <mat-select [formControl]="checkoutForm.controls['country']">
                  <mat-option *ngFor="let c of countries" [value]="c.code">
                    {{ c.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>First Name</mat-label>
                <input matInput [formControl]="checkoutForm.controls['firstName']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Last Name</mat-label>
                <input matInput [formControl]="checkoutForm.controls['lastName']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Company</mat-label>
                <input matInput [formControl]="checkoutForm.controls['company']">
                <mat-hint>Optional</mat-hint>
              </mat-form-field>
            </div>

            <div class="col-span-2 md:col-span-1">
              <mat-form-field class="w-full">
                <mat-label>Address Line 1</mat-label>
                <input matInput [formControl]="checkoutForm.controls['address1']">
              </mat-form-field>
            </div>

            <div class="col-span-2 md:col-span-1">
              <mat-form-field class="w-full">
                <mat-label>Address Line 2</mat-label>
                <input matInput [formControl]="checkoutForm.controls['address2']">
                <mat-hint>Optional</mat-hint>
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>City</mat-label>
                <input matInput [formControl]="checkoutForm.controls['city']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Zip/Postal Code</mat-label>
                <input matInput type="number" [formControl]="checkoutForm.controls['zip']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Phone</mat-label>
                <input matInput [formControl]="checkoutForm.controls['phone']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Email</mat-label>
                <input matInput [formControl]="checkoutForm.controls['email']">
              </mat-form-field>
            </div>
          </div>
        </form>
      </div>

      <!-- Account & Address Options -->
      <div class="Ltemplate-card p-6 mb-6">
        <div class="flex flex-col space-y-3">
          <mat-checkbox class="text-secondary">
            <span class="ml-2">Create an account for future purchases</span>
          </mat-checkbox>
          
          <mat-checkbox [(ngModel)]="hasAltAddress" class="text-secondary">
            <span class="ml-2">Ship to a different address</span>
          </mat-checkbox>
        </div>
      </div>

      <!-- Alternative Shipping Address -->
      <div 
        class="Ltemplate-card p-6 mb-6" 
        *ngIf="hasAltAddress" 
        [@animate]="{value:'*',params:{delay:'100ms',y:'50px'}}"
      >
        <h2 class="text-lg font-semibold mb-4">Shipping Address</h2>
        
        <form [formGroup]="checkoutFormAlt">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <mat-form-field class="w-full">
                <mat-label>Country</mat-label>
                <mat-select [formControl]="checkoutFormAlt.controls['country']">
                  <mat-option *ngFor="let c of countries" [value]="c.code">
                    {{ c.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>First Name</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['firstName']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Last Name</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['lastName']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Company</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['company']">
                <mat-hint>Optional</mat-hint>
              </mat-form-field>
            </div>

            <div class="col-span-2 md:col-span-1">
              <mat-form-field class="w-full">
                <mat-label>Address Line 1</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['address1']">
              </mat-form-field>
            </div>

            <div class="col-span-2 md:col-span-1">
              <mat-form-field class="w-full">
                <mat-label>Address Line 2</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['address2']">
                <mat-hint>Optional</mat-hint>
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>City</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['city']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Zip/Postal Code</mat-label>
                <input matInput type="number" [formControl]="checkoutFormAlt.controls['zip']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Phone</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['phone']">
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Email</mat-label>
                <input matInput [formControl]="checkoutFormAlt.controls['email']">
              </mat-form-field>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="w-full lg:w-1/3" [@animate]="{value:'*',params:{delay: '100ms', x:'50px'}}">
      <div class="Ltemplate-card p-6 sticky top-4">
        <h2 class="text-lg font-semibold mb-4">Order Summary</h2>
        
        <!-- Product List -->
        <div class="space-y-4 mb-6">
          <div class="max-h-60 overflow-y-auto pr-2">
            <div class="space-y-4">
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100" *ngFor="let p of cart">
                <img 
                  [src]="p.product.photo" 
                  alt="Product thumbnail"
                  class="w-12 h-12 rounded-md object-cover shadow-sm"
                >
                <div class="flex-grow min-w-0">
                  <p class="text-sm font-medium truncate">{{p.product.name}}</p>
                  <p class="text-xs text-secondary">Qty: {{p.data.quantity}}</p>
                </div>
                <div class="text-sm font-medium whitespace-nowrap">
                  {{p.product.price.sale * p.data.quantity | currency}}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Totals -->
        <div class="space-y-3 mb-6">
          <div class="flex justify-between items-center text-sm">
            <span class="text-secondary">Subtotal</span>
            <span class="font-medium">{{subTotal | currency}}</span>
          </div>
          
          <div class="flex justify-between items-center text-sm">
            <span class="text-secondary">VAT</span>
            <span class="font-medium">{{vat}}%</span>
          </div>
          
          <div class="flex justify-between items-center text-sm">
            <span class="text-secondary">Shipping</span>
            <span class="font-medium">{{shipping}}</span>
          </div>
          
          <div class="border-t border-gray-200 pt-3 mt-3">
            <div class="flex justify-between items-center">
              <span class="font-semibold">Total</span>
              <span class="font-bold text-lg">{{total | currency}}</span>
            </div>
          </div>
        </div>
        
        <!-- Payment Methods -->
        <div class="bg-base rounded-md p-4 mb-6">
          <h3 class="text-sm font-medium mb-3">Payment Method</h3>
          
          <mat-radio-group class="flex flex-col space-y-3" [(ngModel)]="paymentMethod">
            <mat-radio-button value="paypal" class="bg-card rounded p-3 shadow-sm">
              <span class="ml-2">PayPal</span>
            </mat-radio-button>

            <mat-radio-button value="card" class="bg-card rounded p-3 shadow-sm">
              <span class="ml-2">Credit Card</span>
            </mat-radio-button>

            <mat-radio-button value="bank" class="bg-card rounded p-3 shadow-sm">
              <span class="ml-2">Bank Transfer</span>
            </mat-radio-button>
          </mat-radio-group>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col space-y-3">
          <button 
            mat-raised-button 
            color="primary" 
            (click)="placeOrder()" 
            class="py-3 shadow-md"
          >
            <span class="flex items-center justify-center">
              <span>Complete Order</span>
              <mat-icon class="ml-2">check_circle</mat-icon>
            </span>
          </button>
          
          <button 
            mat-stroked-button 
            routerLink="/shop/cart" 
            class="py-2"
          >
            <span class="flex items-center justify-center">
              <mat-icon class="mr-2">chevron_left</mat-icon>
              <span>Return to Cart</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty Cart State -->
  <div *ngIf="!cart.length" [@animate]="{value:'*',params:{delay: '100ms', y:'-50px'}}">
    <div class="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 text-center">
      <mat-icon class="text-slate-300 text-6xl mb-4">shopping_cart</mat-icon>
      <h2 class="text-xl font-semibold text-slate-800 mb-2">Your cart is empty</h2>
      <p class="text-slate-600 mb-6">You need to add products to your cart before proceeding to checkout.</p>
      <button 
        mat-raised-button 
        color="primary" 
        routerLink="/shop" 
        class="py-2 px-6"
      >
        Browse Products
      </button>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/shop/checkout/checkout.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CountryDB } from '../../../shared/inmemory-db/countries';
import { ShopService, CartItem } from '../shop.service';
import { LtemplateAnimations } from "../../../shared/animations/ltemplate-animations";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    animations: LtemplateAnimations,
    standalone: false
})
export class CheckoutComponent implements OnInit {
  public cart: CartItem[];
  public checkoutForm: UntypedFormGroup;
  public checkoutFormAlt: UntypedFormGroup;
  public hasAltAddress: boolean;
  public countries: any[];

  public total: number;
  public subTotal: number;
  public vat: number = 15;
  public shipping: any = 'Free';
  public paymentMethod: string;

  constructor(
    private fb: UntypedFormBuilder,
    private shopService: ShopService
  ) {
    let countryDB = new CountryDB();
    this.countries = countryDB.countries;
  }

  ngOnInit() {
    this.getCart();
    this.buildCheckoutForm();
  }
  calculateCost() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity)
    })
    this.total = this.subTotal + (this.subTotal * (15/100));
    if(this.shipping !== 'Free') {
      this.total += this.shipping;
    }
  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
      this.calculateCost();
    })
  }
  buildCheckoutForm() {
    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [],
      address1: ['', Validators.required],
      address2: [],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })

    this.checkoutFormAlt = this.fb.group({
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [],
      address1: ['', Validators.required],
      address2: [],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })
  }


  placeOrder() {
    let billingAddress = this.checkoutForm.value;
    let shippingAddress;
    
    if(this.hasAltAddress) {
      shippingAddress = this.checkoutFormAlt.value;
    }
    
    console.log(billingAddress, shippingAddress, this.paymentMethod)
  }

}

```

---

#### 📄 `src/app/views/shop/product-details/product-details.component.html`

```html
<div class="container mx-auto px-4 !py-6 max-w-7xl">
  <!-- Navigation & Cart Bar -->
  <div class="flex items-center justify-between mb-6">
    <button mat-button class="text-slate-600 hover:text-primary-600 transition-colors" routerLink="/shop">
      <mat-icon>chevron_left</mat-icon>
      <span class="ml-1 text-sm font-medium hidden sm:inline-block">Back to Shop</span>
    </button>
    <button mat-raised-button color="primary" routerLink="/shop/cart" class="py-1 px-4 flex items-center shadow-md">
      <mat-icon class="mr-2">shopping_cart</mat-icon> Cart ({{cartData?.itemCount}})
    </button>
  </div>

  <!-- Product Content -->
  <div class="flex flex-col lg:flex-row gap-8">
    <!-- Product Gallery -->
    <div class="w-full lg:w-1/2" [@animate]="{value:'*',params:{delay: '100ms', x:'-100px'}}">
      <div class="flex flex-row-reverse lg:flex-row gap-4">
        <!-- Thumbnails -->
        <div class="flex lg:flex-col gap-2 w-16 lg:w-20">
          <img 
            *ngFor="let image of photoGallery" 
            [src]="image.url" 
            [ngClass]="{'ring-2 ring-primary-500 opacity-60': image.state === '1'}"
            (click)="changeState(image)"
            class="w-full h-16 lg:h-20 object-cover rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-all"
            alt="Product thumbnail"
          >
        </div>
        
        <!-- Main Image -->
        <div class="flex-1">
          <img 
            *ngFor="let image of photoGallery" 
            [src]="image.url" 
            [@fadeInOut]="image.state"
            class="w-full h-auto rounded-lg shadow-md object-cover"
            alt="Product image"
          >
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div class="w-full lg:w-1/2 flex flex-col" [@animate]="{value:'*',params:{delay: '100ms', x:'50px'}}">
      <!-- Rating -->
      <div class="flex items-center mb-3" *ngIf="product?.ratings?.rating">
        <div class="flex items-center">
          <mat-icon class="text-amber-500 text-sm">star</mat-icon>
          <mat-icon class="text-amber-500 text-sm" *ngIf="product?.ratings?.rating >= 2">star</mat-icon>
          <mat-icon class="text-amber-500 text-sm" *ngIf="product?.ratings?.rating >= 3">star</mat-icon>
          <mat-icon class="text-amber-500 text-sm" *ngIf="product?.ratings?.rating >= 4">star</mat-icon>
          <mat-icon class="text-amber-500 text-sm" *ngIf="product?.ratings?.rating >= 5">star</mat-icon>
        </div>
        <span class="text-slate-500 text-sm ml-2">{{product?.ratings?.rating}} ({{product?.ratings?.ratingCount}} ratings)</span>
      </div>
      
      <!-- Title & Description -->
      <h1 class="text-3xl font-bold text-slate-800 mb-4">{{product?.name}}</h1>
      
      <!-- Price -->
      <div class="flex items-center mb-6">
        <span class="text-2xl font-semibold text-slate-900 mr-3">{{product?.price?.sale | currency:'USD'}}</span>
        <span class="text-lg text-slate-500 line-through">{{product?.price?.previous | currency:'USD'}}</span>
      </div>
      
      <!-- Description -->
      <div class="mb-6">
        <p class="text-slate-600 leading-relaxed">{{product?.description}}</p>
      </div>
      
      <!-- Category & Tags -->
      <div class="mb-6 space-y-2">
        <p class="text-slate-600">
          <span class="font-medium text-slate-700">Category:</span> 
          <span class="ml-2 text-primary-600">{{product?.category}}</span>
        </p>
        <p class="text-slate-600">
          <span class="font-medium text-slate-700">Tags:</span> 
          <span *ngFor="let t of product.tags; let last = last" class="ml-2 text-primary-600">
            {{t}}<span *ngIf="!last">, </span>
          </span>
        </p>
      </div>
      
      <!-- Options -->
      <div class="space-y-6 mb-8">
        <div class="space-y-3">
          <label class="block text-sm font-medium text-slate-700">Choose an option:</label>
          <mat-radio-group class="flex flex-col space-y-2">
            <mat-radio-button [value]="'opt1'" color="primary" class="text-slate-700">Option 1</mat-radio-button>
            <mat-radio-button [value]="'opt2'" color="primary" class="text-slate-700">Option 2</mat-radio-button>
            <mat-radio-button [value]="'opt3'" color="primary" class="text-slate-700">Option 3</mat-radio-button>
          </mat-radio-group>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-slate-700" for="quantity">Quantity:</label>
          <input 
            class="w-24 h-10 px-3 py-2 bg-slate-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
            id="quantity" 
            name="quantity" 
            type="number" 
            [(ngModel)]="quantity"
            min="1"
          >
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4">
        <button 
          mat-raised-button 
          color="accent" 
          (click)="addToCart()" 
          class="px-6 py-2 flex items-center shadow-md transition-transform hover:scale-105"
        >
          <mat-icon class="mr-2">add_shopping_cart</mat-icon> 
          Add to Cart
        </button>
        <button 
          mat-stroked-button 
          color="primary" 
          routerLink="/shop"
          class="px-6 py-2 flex items-center"
        >
          <mat-icon class="mr-2">chevron_left</mat-icon> 
          Back to Shop
        </button>
      </div>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/shop/product-details/product-details.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LtemplateAnimations } from "../../../shared/animations/ltemplate-animations";
import { ShopService, CartItem } from '../shop.service';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../shared/models/product.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    animations: LtemplateAnimations,
    standalone: false
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public productID;
  public product: Product;
  public quantity: number = 1;
  public cart: CartItem[];
  public cartData: any;
  private productSub: Subscription;

  public photoGallery: any[] = [{url: '', state: '0'}];
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productID = this.route.snapshot.params['id'];
    this.getProduct(this.productID);
    this.getCart();
    this.cartData = this.shopService.cartData;
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

  getProduct(id) {
    this.productSub = this.shopService.getProductDetails(id)
    .subscribe(res => {
      this.product = res;
      this.initGallery(this.product)
    }, err => {
      this.product = {
        _id: '',
        name: '',
        price: { sale: 0 }
      };
    })
  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  addToCart() {
    let cartItem: CartItem = {
      product: this.product,
      data: {
        quantity: this.quantity,
        options: {}
      }
    };

    this.shopService
    .addToCart(cartItem)
    .subscribe(res => {
      this.cart = res;
      this.quantity = 1;
      this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
    })
  }

  initGallery(product: Product) {
    if(!product.gallery) {
      return;
    }
    this.photoGallery = product.gallery.map(i => {
      return {
        url: i,
        state: '0'
      }
    });
    if (this.photoGallery[0])  {
      this.photoGallery[0].state = '1';
    }
  }
  changeState(photo) {
    if (photo.state === '1') {
      return;
    }
    this.photoGallery = this.photoGallery.map(p => {
      if (photo.url === p.url) {
        setTimeout(() => {
          p.state = '1';
          return p;
        }, 290)
      }
      p.state = '0';
      return p;
    })
  }

}

```

---

#### 📄 `src/app/views/shop/products/products.component.html`

```html
<div class="min-h-screen sm:mx-8">
  <mat-sidenav-container class="!bg-card">
    <mat-sidenav LtemplateSideNavToggle class="w-60">
      <div class="pl-2 pr-4">
        <form [formGroup]="filterForm" name="filterForm">
          <mat-accordion multi="true" displayMode="flat" class="!px-2">
            <!-- Categories -->
            <mat-expansion-panel expanded="true">
              <mat-expansion-panel-header>
                <mat-panel-title class="text-slate-800 font-medium">
                  Categories
                </mat-panel-title>
              </mat-expansion-panel-header>
              <ul class="space-y-2 py-1">
                <li class="px-2 py-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors" 
                    [ngClass]="{'font-medium text-primary-600': 'all' === activeCategory}" 
                    (click)="setActiveCategory('all')">All</li>
                <li class="px-2 py-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors capitalize" 
                    *ngFor="let c of categories$ | async" 
                    [ngClass]="{'font-medium text-primary-600': c === activeCategory}" 
                    (click)="setActiveCategory(c)">{{c}}</li>
              </ul>
            </mat-expansion-panel>
          </mat-accordion>
        </form>
      </div>
    </mat-sidenav>
    <div class="shop-wrap p-4">
      <!-- Top Toolbar -->
      <div class="flex flex-col md:flex-row items-center Ltemplate-card p-4 mb-6">
        <button mat-icon-button class="mr-4 rtl:ml-4 text-slate-600" (click)="toggleSideNav()">
          <mat-icon>short_text</mat-icon>
        </button>
        <div class="w-full md:w-64 mb-4 md:mb-0">
          <form [formGroup]="filterForm" class="relative">
            <input type="text" 
                  name="searchProduct" 
                  placeholder="Search product" 
                  class="w-full h-10 px-4 py-2 bg-base border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  [formControl]="filterForm.controls['search']">
            <mat-icon class="absolute right-3 top-2 text-slate-400">search</mat-icon>
          </form>
        </div>
        
        <!-- View change buttons and cart -->
        <span class="flex-grow"></span>
        <div class="hidden md:flex items-center space-x-2 mr-4">
          <button mat-icon-button [color]="viewMode === 'list-view' ? 'primary' : ''" (click)="viewMode = 'list-view'" class="text-slate-600">
            <mat-icon>format_list_bulleted</mat-icon>
          </button>
          <button mat-icon-button [color]="viewMode === 'grid-view' ? 'primary' : ''" (click)="viewMode = 'grid-view'" class="text-slate-600">
            <mat-icon>apps</mat-icon>
          </button>
        </div>

        <button mat-raised-button color="primary" routerLink="/shop/cart" class="py-1 px-4 flex items-center">
          <mat-icon class="mr-2">shopping_cart</mat-icon> Cart ({{cartData.itemCount}})
        </button>
      </div>
      
      <!-- Products container -->
      <div class="flex flex-wrap -mx-3" [ngClass]="{'flex-col': viewMode === 'list-view'}">
        <!-- Product Box -->
        <div 
          [ngClass]="{'w-full': viewMode === 'list-view', 'w-full sm:w-1/2 lg:w-1/3 px-3': viewMode === 'grid-view'}" class="mb-6"
          *ngFor="let product of products$ | async | paginate: { itemsPerPage: 6, currentPage: currentPage }; let i = index;"
          [@animate]="{value:'*',params:{delay: (i*100)+'ms', y:'50px'}}">
          
          <div class="Ltemplate-card h-full transition-shadow !hover:shadow-lg relative"
               [ngClass]="{'flex': viewMode === 'list-view'}">
            <!-- Badge -->
            <div *ngIf="product?.badge?.text" 
                class="absolute top-4 left-4 z-10 h-12 w-12 rounded-full flex items-center justify-center transform -rotate-12 shadow-md" 
                [ngStyle]="{background: product?.badge?.color || '#f44336'}">
              <span class="text-xs font-medium text-center leading-tight">{{product?.badge?.text}}</span>
            </div>
            
            <!-- Product Image -->
            <div [ngClass]="{'w-1/3': viewMode === 'list-view'}" class="relative">
              <div class="overflow-hidden cursor-pointer" [routerLink]="['/shop/products/', product._id]">
                <img [src]="product.photo" alt="" [ngClass]="{'w-auto h-full': viewMode === 'list-view', 'w-full h-48': viewMode === 'grid-view'}" class="object-cover transition-all duration-300">
              </div>
            </div>
            
            <!-- Product Info -->
            <div [ngClass]="{'w-2/3 pl-4': viewMode === 'list-view'}" class="p-4 flex flex-col">
              <!-- Main Info -->
              <div class="mb-auto">
                <h3 class="text-lg font-medium hover:text-primary transition-colors cursor-pointer mb-1" 
                    [routerLink]="['/shop/products/', product._id]">{{product.name}}</h3>
                <p class="text-secondary text-sm mb-2">{{product?.subtitle}}</p>
                <p class="text-secondary text-sm mb-1">
                  <span class="font-medium text-secondary">Category:</span> {{product?.category}}
                </p>
                <p class="text-secondary text-sm mb-3">
                  <span class="font-medium text-secondary">Tags: </span>
                  <span *ngFor="let t of product.tags" class="mr-1"> {{t}}</span>
                </p>
              </div>
              
              <!-- Rating and Price Area -->
              <div class="mt-2">
                <div *ngIf="viewMode === 'grid-view'" class="mb-2">
                  <span class="text-sm text-secondary">{{product?.ratings?.rating}} ({{product?.ratings?.ratingCount}} ratings)</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                  <div class="price">
                    <span class="text-lg font-medium mr-2">{{product?.price?.sale | currency:'USD'}}</span>
                    <del class="text-sm text-secondary">{{product?.price?.previous | currency:'USD'}}</del>
                  </div>
                  <button mat-icon-button color="primary" (click)="addToCart(product)" class="bg-primary-50">
                    <mat-icon>add_shopping_cart</mat-icon>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Extended Info (List View) -->
            <div *ngIf="viewMode === 'list-view'" class="w-1/4 border-l border-divider p-4 hidden lg:block">
              <div class="flex justify-between mb-4">
                <div class="text-sm text-secondary">{{product?.ratings?.rating}} ({{product?.ratings?.ratingCount}} ratings)</div>
                <div class="flex space-x-2">
                  <button mat-icon-button class="text-secondary">
                    <mat-icon>playlist_add</mat-icon>
                  </button>
                  <button mat-icon-button class="text-secondary">
                    <mat-icon>favorite</mat-icon>
                  </button>
                </div>
              </div>
              
              <ul class="space-y-2 text-secondary">
                <li class="flex items-center">
                  <mat-icon class="text-primary-500 mr-2 text-sm">check</mat-icon> 
                  <span class="text-sm">Heavy duty</span>
                </li>
                <li class="flex items-center">
                  <mat-icon class="text-primary-500 mr-2 text-sm">check</mat-icon> 
                  <span class="text-sm">Water resistance</span>
                </li>
                <li class="flex items-center">
                  <mat-icon class="text-primary-500 mr-2 text-sm">check</mat-icon> 
                  <span class="text-sm">Clean design</span>
                </li>
                <li class="flex items-center">
                  <mat-icon class="text-primary-500 mr-2 text-sm">check</mat-icon> 
                  <span class="text-sm">High quality materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="w-full flex justify-center my-8">
          <pagination-controls (pageChange)="currentPage = $event" class="custom-pagination"></pagination-controls>
        </div>
      </div>
    </div>
  </mat-sidenav-container>
</div>
```

---

#### 📄 `src/app/views/shop/products/products.component.ts`

```typescript
import { Component, OnInit, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { ShopService, CartItem } from '../shop.service';
import { Product } from '../../../shared/models/product.model';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LtemplateAnimations } from '../../../shared/animations/ltemplate-animations';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    animations: [LtemplateAnimations],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductsComponent), // replace name as appropriate
            multi: true
        }
    ],
    standalone: false
})
export class ProductsComponent implements OnInit, OnDestroy {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: UntypedFormGroup;
  public cart: CartItem[];
  public cartData: any;

  constructor(
    private shopService: ShopService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.categories$ = this.shopService.getCategories();
    this.buildFilterForm(this.shopService.initialFilters);
    
    setTimeout(() => {
      this.loader.open();
    });
    this.products$ = this.shopService
      .getFilteredProduct(this.filterForm)
      .pipe(
        map(products => {
          this.loader.close();
          return products;
        })
      );
    this.getCart();
    this.cartData = this.shopService.cartData;
  }
  ngOnDestroy() {

  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  addToCart(product) {
    let cartItem: CartItem = {
      product: product,
      data: {
        quantity: 1
      }
    };
    this.shopService
    .addToCart(cartItem)
    .subscribe(cart => {
      this.cart = cart;
      this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
    })
  }

  buildFilterForm(filterData:any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    })
  }
  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category)
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }
}

```

---

#### 📄 `src/app/views/shop/shop.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatRadioModule as MatRadioModule } from '@angular/material/radio';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule as MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule as MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { StarRatingModule } from 'angular-star-rating';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductsComponent } from './products/products.component';
import { ShopService } from './shop.service';
import { ShopRoutes } from './shop.routing';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatRippleModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
    StarRatingModule.forRoot(),
    NgxPaginationModule,
    RouterModule.forChild(ShopRoutes),
    SharedDirectivesModule
  ],
  declarations: [
    ProductsComponent, 
    ProductDetailsComponent, 
    CartComponent, CheckoutComponent
  ],
  providers: [ShopService]
})
export class ShopModule { }

```

---

#### 📄 `src/app/views/shop/shop.routing.ts`

```typescript
import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const ShopRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ProductsComponent
  }, {
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: { title: 'Detail', breadcrumb: 'Detail' }
  }, {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart', breadcrumb: 'CART' }
  }, {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Checkout', breadcrumb: 'CHECKOUT' }
  }]
}]
```

---

#### 📄 `src/app/views/shop/shop.service.ts`

```typescript

import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductDB } from '../../shared/inmemory-db/products';
import { CountryDB } from '../../shared/inmemory-db/countries';
import { Product } from '../../shared/models/product.model';
import { UntypedFormGroup } from '@angular/forms';

import { of, combineLatest } from 'rxjs';
import { startWith, debounceTime, delay, map, switchMap } from 'rxjs/operators';



export interface CartItem {
  product: Product;
  data: {
    quantity: number,
    options?: any
  };
}

@Injectable()
export class ShopService {
  public products: Product[] = [];
  public initialFilters = {
    minPrice: 10,
    maxPrice: 40,
    minRating: 1,
    maxRating: 5
  };

  public cart: CartItem[] = [];
  public cartData = {
    itemCount: 0
  }
  constructor() { }
  public getCart(): Observable<CartItem[]> {
    return of(this.cart)
  }
  public addToCart(cartItem: CartItem): Observable<CartItem[]> {
    let index = -1;
    this.cart.forEach((item, i) => {
      if(item.product._id === cartItem.product._id) {
        index = i;
      }
    })
    if(index !== -1) {
      this.cart[index].data.quantity += cartItem.data.quantity;
      this.updateCount();
      return of(this.cart)
    } else {
      this.cart.push(cartItem);
      this.updateCount();
      return of(this.cart)
    }
  }
  private updateCount() {
    this.cartData.itemCount = 0;
    this.cart.forEach(item => {
      this.cartData.itemCount += item.data.quantity;
    })
  }
  public removeFromCart(cartItem: CartItem): Observable<CartItem[]> {
    this.cart = this.cart.filter(item => {
      if(item.product._id == cartItem.product._id) {
        return false;
      }
      return true;
    });
    this.updateCount();
    return of(this.cart)
  }
  public getProducts(): Observable<Product[]> {
    let productDB = new ProductDB();
    return of(productDB.products)
      .pipe(
        delay(500),
        map((data: Product[]) => {
          this.products = data;
          return data;
        })
      )
  }
  public getProductDetails(productID): Observable<Product> {
    let productDB = new ProductDB();
    let product = productDB.products.filter(p => p._id === productID)[0];
    if(!product) {
      return observableThrowError(new Error('Product not found!'));
    }
    return of(product)
  }
  public getCategories(): Observable<any> {
    let categories = ['speaker', 'headphone', 'watch', 'phone'];
    return of(categories);
  }

  public getFilteredProduct(filterForm: UntypedFormGroup): Observable<Product[]> {
    return combineLatest(
      this.getProducts(),
      filterForm.valueChanges
      .pipe(
        startWith(this.initialFilters),
        debounceTime(400)
      )
    )
    .pipe(
      switchMap(([products, filterData]) => {
        return this.filterProducts(products, filterData);
      })
    )

  }
  /*
  * If your data set is too big this may raise performance issue.
  * You should implement server side filtering instead.
  */ 
  private filterProducts(products: Product[], filterData): Observable<Product[]> {
    let filteredProducts = products.filter(p => {
      let isMatch: Boolean;
      let match = {
        search: false,
        caterory: false,
        price: false,
        rating: false
      };
      // Search
      if (
        !filterData.search
        || p.name.toLowerCase().indexOf(filterData.search.toLowerCase()) > -1
        || p.description.indexOf(filterData.search) > -1
        || p.tags.indexOf(filterData.search) > -1
      ) {
        match.search = true;
      } else {
        match.search = false;
      }
      // Category filter
      if (
        filterData.category === p.category 
        || !filterData.category 
        || filterData.category === 'all'
      ) {
        match.caterory = true;
      } else {
        match.caterory = false;
      }
      // Price filter
      if (
        p.price.sale >= filterData.minPrice 
        && p.price.sale <= filterData.maxPrice
      ) {
        match.price = true;
      } else {
        match.price = false;
      }
      // Rating filter
      if(
        p.ratings.rating >= filterData.minRating 
        && p.ratings.rating <= filterData.maxRating
      ) {
        match.rating = true;
      } else {
        match.rating = false;
      }
      
      for(let m in match) {
        if(!match[m]) return false;
      }

      return true;
    })
    return of(filteredProducts)
  }
}

```

---

#### 📄 `src/app/views/tables/material-table/material-table.component.html`

```html
<div class="sm:mx-8 rtl:ml-2 mt-4 !pb-4">
  <div class="Ltemplate-card" [@animate]="{value:'*',params:{y:'50px',delay:'300ms'}}">
      <mat-table [dataSource]="dataSource" matSort >

          <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="id"> {{row.id}} </mat-cell>
          </ng-container>
      
          <ng-container matColumnDef="age">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Progress </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="progress"> {{row.age}} </mat-cell>
          </ng-container>
      
          <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>
            <mat-cell *matCellDef="let row" data-label="name"> {{row.name}} </mat-cell>
          </ng-container>
      
          <ng-container matColumnDef="gender">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Gender </mat-header-cell>
            <mat-cell *matCellDef="let row" [style.color]="row.color" data-label="color"> {{row.gender}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="company">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Company </mat-header-cell>
            <mat-cell *matCellDef="let row" [style.color]="row.color" data-label="color"> {{row.company}} </mat-cell>
          </ng-container>

          <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Company </mat-header-cell>
            <mat-cell *matCellDef="let row" [style.color]="row.color" data-label="color"> {{row.email}} </mat-cell>
          </ng-container>
      
          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;">
          </mat-row>
      </mat-table>
      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
  </div>
</div>

```

---

#### 📄 `src/app/views/tables/material-table/material-table.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { TablesService } from '../tables.service';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource as MatTableDataSource } from '@angular/material/table';
import { LtemplateAnimations } from 'app/shared/animations/ltemplate-animations';

@Component({
    selector: 'app-material-table',
    templateUrl: './material-table.component.html',
    styleUrls: ['./material-table.component.scss'],
    animations: LtemplateAnimations,
    standalone: false
})
export class MaterialTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    this.displayedColumns = this.tableService.getDataConf().map((c) => c.prop)
    this.dataSource = new MatTableDataSource(this.tableService.getAll());
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

```

---

#### 📄 `src/app/views/tables/tables.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule as MatTableModule } from '@angular/material/table';


import { TablesRoutes } from './tables.routing';
import { MaterialTableComponent } from './material-table/material-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    RouterModule.forChild(TablesRoutes)
  ],
  declarations: [MaterialTableComponent]
})
export class TablesModule { }

```

---

#### 📄 `src/app/views/tables/tables.routing.ts`

```typescript
import { Routes } from '@angular/router';

import { MaterialTableComponent } from './material-table/material-table.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'mat-table',
      component: MaterialTableComponent,
      data: { title: 'Material TAble', breadcrumb: 'Material Table' }
    }]
  }
];

```

---

#### 📄 `src/app/views/tables/tables.service.ts`

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  constructor() { }
  getDataConf() {
    return [
      {
        prop: 'id'
      },
      {
        prop: 'age',
        name: 'Age'
      },
      {
        prop: 'name',
        name: 'Name'
      },
      {
        prop: 'gender',
        name: 'Gender'
      },
      {
        prop: 'company',
        name: 'Company'
      },
      {
        prop: 'email',
        name: 'Email'
      }
    ];
  }
  getAll() {
    return [
      {
        'id': 0,
        'age': 40,
        'name': 'Mclean Brady',
        'gender': 'male',
        'company': 'JAMNATION',
        'email': 'mcleanbrady@jamnation.com',
        'phone': '+1 (875) 472-2061',
        'registered': '2014-10-20T04:54:00 -06:00'
      },
      {
        'id': 1,
        'age': 39,
        'name': 'Dillon Ruiz',
        'gender': 'male',
        'company': 'ACRODANCE',
        'email': 'dillonruiz@acrodance.com',
        'phone': '+1 (858) 562-2261',
        'registered': '2016-08-07T12:15:31 -06:00'
      },
      {
        'id': 2,
        'age': 39,
        'name': 'Robyn Knox',
        'gender': 'female',
        'company': 'GLUID',
        'email': 'robynknox@gluid.com',
        'phone': '+1 (826) 491-3098',
        'registered': '2017-02-12T02:43:39 -06:00'
      },
      {
        'id': 3,
        'age': 32,
        'name': 'Santana Wagner',
        'gender': 'male',
        'company': 'INTRADISK',
        'email': 'santanawagner@intradisk.com',
        'phone': '+1 (841) 550-2276',
        'registered': '2016-03-28T11:22:15 -06:00'
      },
      {
        'id': 4,
        'age': 34,
        'name': 'Jennie Branch',
        'gender': 'female',
        'company': 'VERAQ',
        'email': 'jenniebranch@veraq.com',
        'phone': '+1 (895) 483-3982',
        'registered': '2015-03-16T01:30:06 -06:00'
      },
      {
        'id': 5,
        'age': 39,
        'name': 'Farrell Preston',
        'gender': 'male',
        'company': 'HONOTRON',
        'email': 'farrellpreston@honotron.com',
        'phone': '+1 (993) 534-2843',
        'registered': '2015-08-14T09:07:47 -06:00'
      },
      {
        'id': 6,
        'age': 38,
        'name': 'Garner Reyes',
        'gender': 'male',
        'company': 'VIOCULAR',
        'email': 'garnerreyes@viocular.com',
        'phone': '+1 (973) 495-3873',
        'registered': '2016-03-23T03:47:23 -06:00'
      },
      {
        'id': 7,
        'age': 32,
        'name': 'Ella Boone',
        'gender': 'female',
        'company': 'ARCHITAX',
        'email': 'ellaboone@architax.com',
        'phone': '+1 (945) 491-2580',
        'registered': '2015-07-01T09:35:10 -06:00'
      },
      {
        'id': 8,
        'age': 30,
        'name': 'Kathryn Owens',
        'gender': 'female',
        'company': 'CYCLONICA',
        'email': 'kathrynowens@cyclonica.com',
        'phone': '+1 (978) 598-2767',
        'registered': '2014-03-11T11:38:12 -06:00'
      },
      {
        'id': 9,
        'age': 22,
        'name': 'Byers Santana',
        'gender': 'male',
        'company': 'KAGGLE',
        'email': 'byerssantana@kaggle.com',
        'phone': '+1 (984) 546-3400',
        'registered': '2015-08-17T02:48:09 -06:00'
      },
      {
        'id': 10,
        'age': 30,
        'name': 'Nina Middleton',
        'gender': 'female',
        'company': 'ZINCA',
        'email': 'ninamiddleton@zinca.com',
        'phone': '+1 (829) 553-2060',
        'registered': '2014-12-20T09:53:27 -06:00'
      },
      {
        'id': 11,
        'age': 38,
        'name': 'Nixon Morrow',
        'gender': 'male',
        'company': 'CUBIX',
        'email': 'nixonmorrow@cubix.com',
        'phone': '+1 (825) 501-3712',
        'registered': '2014-09-10T10:23:34 -06:00'
      },
      {
        'id': 12,
        'age': 28,
        'name': 'Bonita Pate',
        'gender': 'female',
        'company': 'MAGNEATO',
        'email': 'bonitapate@magneato.com',
        'phone': '+1 (808) 497-3968',
        'registered': '2016-01-20T02:45:43 -06:00'
      },
      {
        'id': 13,
        'age': 30,
        'name': 'Amy Hyde',
        'gender': 'female',
        'company': 'UNDERTAP',
        'email': 'amyhyde@undertap.com',
        'phone': '+1 (867) 555-2669',
        'registered': '2015-04-12T08:39:31 -06:00'
      },
      {
        'id': 14,
        'age': 20,
        'name': 'Cortez Camacho',
        'gender': 'male',
        'company': 'IDEGO',
        'email': 'cortezcamacho@idego.com',
        'phone': '+1 (986) 546-3364',
        'registered': '2014-08-21T11:00:20 -06:00'
      },
      {
        'id': 15,
        'age': 29,
        'name': 'Castaneda Armstrong',
        'gender': 'male',
        'company': 'INTERFIND',
        'email': 'castanedaarmstrong@interfind.com',
        'phone': '+1 (975) 557-2651',
        'registered': '2014-11-15T10:38:24 -06:00'
      },
      {
        'id': 16,
        'age': 37,
        'name': 'Liza West',
        'gender': 'female',
        'company': 'COWTOWN',
        'email': 'lizawest@cowtown.com',
        'phone': '+1 (852) 415-2358',
        'registered': '2017-05-06T09:46:03 -06:00'
      },
      {
        'id': 17,
        'age': 37,
        'name': 'Roth Baird',
        'gender': 'male',
        'company': 'RODEMCO',
        'email': 'rothbaird@rodemco.com',
        'phone': '+1 (840) 417-3313',
        'registered': '2015-04-18T10:58:50 -06:00'
      },
      {
        'id': 18,
        'age': 26,
        'name': 'Alexis Blackburn',
        'gender': 'female',
        'company': 'PREMIANT',
        'email': 'alexisblackburn@premiant.com',
        'phone': '+1 (957) 576-2362',
        'registered': '2014-08-08T12:59:38 -06:00'
      },
      {
        'id': 19,
        'age': 35,
        'name': 'Sadie Tillman',
        'gender': 'female',
        'company': 'DUOFLEX',
        'email': 'sadietillman@duoflex.com',
        'phone': '+1 (843) 499-3330',
        'registered': '2016-02-21T09:25:03 -06:00'
      },
      {
        'id': 20,
        'age': 27,
        'name': 'Sharron Conley',
        'gender': 'female',
        'company': 'QUARMONY',
        'email': 'sharronconley@quarmony.com',
        'phone': '+1 (951) 459-2465',
        'registered': '2014-10-19T06:04:36 -06:00'
      },
      {
        'id': 21,
        'age': 27,
        'name': 'Jordan Mccoy',
        'gender': 'male',
        'company': 'ACCUSAGE',
        'email': 'jordanmccoy@accusage.com',
        'phone': '+1 (825) 568-3296',
        'registered': '2017-01-27T01:53:02 -06:00'
      },
      {
        'id': 22,
        'age': 35,
        'name': 'Rene House',
        'gender': 'female',
        'company': 'INSURETY',
        'email': 'renehouse@insurety.com',
        'phone': '+1 (838) 578-3190',
        'registered': '2015-11-07T10:07:58 -06:00'
      },
      {
        'id': 23,
        'age': 38,
        'name': 'Bernice Berry',
        'gender': 'female',
        'company': 'ROCKYARD',
        'email': 'berniceberry@rockyard.com',
        'phone': '+1 (885) 466-2145',
        'registered': '2014-04-17T07:43:02 -06:00'
      },
      {
        'id': 24,
        'age': 30,
        'name': 'Bowen Beach',
        'gender': 'male',
        'company': 'TETRATREX',
        'email': 'bowenbeach@tetratrex.com',
        'phone': '+1 (843) 493-3197',
        'registered': '2015-07-27T03:38:33 -06:00'
      },
      {
        'id': 25,
        'age': 31,
        'name': 'Monica Leblanc',
        'gender': 'female',
        'company': 'TALENDULA',
        'email': 'monicaleblanc@talendula.com',
        'phone': '+1 (911) 524-2349',
        'registered': '2016-04-10T08:33:17 -06:00'
      },
      {
        'id': 26,
        'age': 36,
        'name': 'Lina Rivas',
        'gender': 'female',
        'company': 'BOINK',
        'email': 'linarivas@boink.com',
        'phone': '+1 (983) 572-2470',
        'registered': '2014-08-28T09:44:32 -06:00'
      },
      {
        'id': 27,
        'age': 25,
        'name': 'Joyce Yang',
        'gender': 'female',
        'company': 'SPORTAN',
        'email': 'joyceyang@sportan.com',
        'phone': '+1 (807) 491-3917',
        'registered': '2015-07-22T12:58:31 -06:00'
      },
      {
        'id': 28,
        'age': 20,
        'name': 'Lana Joseph',
        'gender': 'female',
        'company': 'BOLAX',
        'email': 'lanajoseph@bolax.com',
        'phone': '+1 (942) 467-2363',
        'registered': '2016-10-30T06:13:50 -06:00'
      },
      {
        'id': 29,
        'age': 20,
        'name': 'Jimenez Guerrero',
        'gender': 'male',
        'company': 'INSURON',
        'email': 'jimenezguerrero@insuron.com',
        'phone': '+1 (991) 585-3706',
        'registered': '2016-09-15T01:35:16 -06:00'
      },
      {
        'id': 30,
        'age': 35,
        'name': 'Williams Bentley',
        'gender': 'male',
        'company': 'ZEAM',
        'email': 'williamsbentley@zeam.com',
        'phone': '+1 (837) 490-2610',
        'registered': '2014-01-06T01:04:11 -06:00'
      },
      {
        'id': 31,
        'age': 27,
        'name': 'Doreen Garrett',
        'gender': 'female',
        'company': 'ENERSAVE',
        'email': 'doreengarrett@enersave.com',
        'phone': '+1 (920) 522-2847',
        'registered': '2017-01-25T03:24:47 -06:00'
      },
      {
        'id': 32,
        'age': 34,
        'name': 'Shaw Cannon',
        'gender': 'male',
        'company': 'EBIDCO',
        'email': 'shawcannon@ebidco.com',
        'phone': '+1 (903) 530-2676',
        'registered': '2014-04-11T04:49:08 -06:00'
      },
      {
        'id': 33,
        'age': 25,
        'name': 'Sonya Skinner',
        'gender': 'female',
        'company': 'EXOSWITCH',
        'email': 'sonyaskinner@exoswitch.com',
        'phone': '+1 (923) 428-3014',
        'registered': '2014-02-09T11:59:54 -06:00'
      },
      {
        'id': 34,
        'age': 27,
        'name': 'Todd Potter',
        'gender': 'male',
        'company': 'MUSIX',
        'email': 'toddpotter@musix.com',
        'phone': '+1 (817) 491-2268',
        'registered': '2015-04-06T11:10:47 -06:00'
      },
      {
        'id': 35,
        'age': 21,
        'name': 'Celina Rose',
        'gender': 'female',
        'company': 'TWIIST',
        'email': 'celinarose@twiist.com',
        'phone': '+1 (863) 599-2063',
        'registered': '2015-09-04T07:59:29 -06:00'
      },
      {
        'id': 36,
        'age': 40,
        'name': 'Ingrid Day',
        'gender': 'female',
        'company': 'ZBOO',
        'email': 'ingridday@zboo.com',
        'phone': '+1 (921) 447-2312',
        'registered': '2016-10-01T08:26:07 -06:00'
      },
      {
        'id': 37,
        'age': 24,
        'name': 'Lynch Stark',
        'gender': 'male',
        'company': 'PYRAMIA',
        'email': 'lynchstark@pyramia.com',
        'phone': '+1 (995) 431-2354',
        'registered': '2014-01-26T11:38:48 -06:00'
      },
      {
        'id': 38,
        'age': 29,
        'name': 'Helga Mendez',
        'gender': 'female',
        'company': 'COMVEYER',
        'email': 'helgamendez@comveyer.com',
        'phone': '+1 (897) 418-3815',
        'registered': '2015-10-03T08:58:45 -06:00'
      },
      {
        'id': 39,
        'age': 30,
        'name': 'Corinne Calhoun',
        'gender': 'female',
        'company': 'ADORNICA',
        'email': 'corinnecalhoun@adornica.com',
        'phone': '+1 (841) 564-3617',
        'registered': '2016-05-24T10:42:36 -06:00'
      },
      {
        'id': 40,
        'age': 40,
        'name': 'Winifred Conrad',
        'gender': 'female',
        'company': 'SATIANCE',
        'email': 'winifredconrad@satiance.com',
        'phone': '+1 (885) 533-2416',
        'registered': '2017-03-01T06:12:08 -06:00'
      },
      {
        'id': 41,
        'age': 27,
        'name': 'Lawanda Stevenson',
        'gender': 'female',
        'company': 'ZILLACTIC',
        'email': 'lawandastevenson@zillactic.com',
        'phone': '+1 (823) 535-3187',
        'registered': '2014-07-07T05:26:22 -06:00'
      },
      {
        'id': 42,
        'age': 30,
        'name': 'Kirsten Long',
        'gender': 'female',
        'company': 'IMAGEFLOW',
        'email': 'kirstenlong@imageflow.com',
        'phone': '+1 (809) 592-2264',
        'registered': '2014-05-08T07:41:56 -06:00'
      },
      {
        'id': 43,
        'age': 39,
        'name': 'Summer Farley',
        'gender': 'female',
        'company': 'ENTOGROK',
        'email': 'summerfarley@entogrok.com',
        'phone': '+1 (814) 490-3578',
        'registered': '2016-10-28T10:02:34 -06:00'
      },
      {
        'id': 44,
        'age': 31,
        'name': 'Mendoza Randall',
        'gender': 'male',
        'company': 'COREPAN',
        'email': 'mendozarandall@corepan.com',
        'phone': '+1 (846) 501-2860',
        'registered': '2015-12-14T12:58:18 -06:00'
      },
      {
        'id': 45,
        'age': 27,
        'name': 'Marcy Doyle',
        'gender': 'female',
        'company': 'VORATAK',
        'email': 'marcydoyle@voratak.com',
        'phone': '+1 (848) 411-2728',
        'registered': '2014-02-12T10:46:27 -06:00'
      },
      {
        'id': 46,
        'age': 30,
        'name': 'Burch Walker',
        'gender': 'male',
        'company': 'COMVEYOR',
        'email': 'burchwalker@comveyor.com',
        'phone': '+1 (968) 445-2104',
        'registered': '2014-01-07T05:16:30 -06:00'
      },
      {
        'id': 47,
        'age': 31,
        'name': 'Solis Lester',
        'gender': 'male',
        'company': 'MACRONAUT',
        'email': 'solislester@macronaut.com',
        'phone': '+1 (857) 422-3242',
        'registered': '2016-10-20T09:40:51 -06:00'
      },
      {
        'id': 48,
        'age': 20,
        'name': 'Lorene Mooney',
        'gender': 'female',
        'company': 'ORGANICA',
        'email': 'lorenemooney@organica.com',
        'phone': '+1 (853) 406-2716',
        'registered': '2015-09-17T03:54:41 -06:00'
      },
      {
        'id': 49,
        'age': 34,
        'name': 'Rhodes Vega',
        'gender': 'male',
        'company': 'CHILLIUM',
        'email': 'rhodesvega@chillium.com',
        'phone': '+1 (863) 577-3562',
        'registered': '2016-06-15T05:36:10 -06:00'
      },
      {
        'id': 50,
        'age': 28,
        'name': 'Pruitt Merrill',
        'gender': 'male',
        'company': 'KYAGURU',
        'email': 'pruittmerrill@kyaguru.com',
        'phone': '+1 (910) 585-3659',
        'registered': '2017-04-02T09:36:00 -06:00'
      },
      {
        'id': 51,
        'age': 33,
        'name': 'Bernadine Hart',
        'gender': 'female',
        'company': 'BITTOR',
        'email': 'bernadinehart@bittor.com',
        'phone': '+1 (906) 446-3518',
        'registered': '2015-11-10T07:45:59 -06:00'
      },
      {
        'id': 52,
        'age': 22,
        'name': 'Carver Mckenzie',
        'gender': 'male',
        'company': 'LOCAZONE',
        'email': 'carvermckenzie@locazone.com',
        'phone': '+1 (803) 407-3142',
        'registered': '2015-06-24T07:16:02 -06:00'
      },
      {
        'id': 53,
        'age': 27,
        'name': 'Dean Cobb',
        'gender': 'male',
        'company': 'ASSISTIA',
        'email': 'deancobb@assistia.com',
        'phone': '+1 (877) 539-3346',
        'registered': '2016-12-02T01:14:47 -06:00'
      },
      {
        'id': 54,
        'age': 32,
        'name': 'Camacho Robinson',
        'gender': 'male',
        'company': 'INSURITY',
        'email': 'camachorobinson@insurity.com',
        'phone': '+1 (929) 430-3079',
        'registered': '2016-12-14T08:59:33 -06:00'
      },
      {
        'id': 55,
        'age': 36,
        'name': 'Nancy Rodgers',
        'gender': 'female',
        'company': 'COSMOSIS',
        'email': 'nancyrodgers@cosmosis.com',
        'phone': '+1 (873) 489-2643',
        'registered': '2014-08-21T02:19:28 -06:00'
      },
      {
        'id': 56,
        'age': 27,
        'name': 'June Henry',
        'gender': 'female',
        'company': 'PETIGEMS',
        'email': 'junehenry@petigems.com',
        'phone': '+1 (808) 536-2445',
        'registered': '2014-03-28T08:36:27 -06:00'
      },
      {
        'id': 57,
        'age': 26,
        'name': 'Rochelle Simmons',
        'gender': 'female',
        'company': 'DANJA',
        'email': 'rochellesimmons@danja.com',
        'phone': '+1 (936) 563-3886',
        'registered': '2015-12-07T08:01:18 -06:00'
      },
      {
        'id': 58,
        'age': 32,
        'name': 'Alice Thornton',
        'gender': 'female',
        'company': 'ISOSURE',
        'email': 'alicethornton@isosure.com',
        'phone': '+1 (962) 560-2318',
        'registered': '2015-06-07T08:09:50 -06:00'
      },
      {
        'id': 59,
        'age': 39,
        'name': 'Clara Downs',
        'gender': 'female',
        'company': 'ZANILLA',
        'email': 'claradowns@zanilla.com',
        'phone': '+1 (977) 595-2657',
        'registered': '2015-06-14T02:33:33 -06:00'
      }
    ]
  }

}

```

---

#### 📄 `src/app/views/todo/tag-dialogue/tag-dialogue.component.html`

```html
<mat-dialog-content>
  <div class="flex flex-wrap justify-between items-center">
    <mat-form-field>
      <input #tagInput matInput placeholder="New tag" required
        (keyup.enter)="addTag(tagInput.value);tagInput.value=''" />
    </mat-form-field>
    <button color="primary" mat-raised-button (click)="addTag(tagInput.value);tagInput.value=''">Add</button>
  </div>

  <div class="flex flex-col mt-5">
    <div class="flex justify-between items-center mb-3" *ngFor="let tag of tagList; let i = index;">
      <span>{{tag.id}}</span>
      <span>{{tag.name}}</span>
      <button color="warn" mat-raised-button (click)="tagList.splice(i,1);deleteTag(tag)">Delete</button>
    </div>
  </div>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Close</button>
</mat-dialog-actions>

<!-- <button mat-button mat-dialog-close>Cancel</button>
<button mat-button [mat-dialog-close]="true" cdkFocusInitial>Save</button> -->
```

---

#### 📄 `src/app/views/todo/tag-dialogue/tag-dialogue.component.ts`

```typescript
import { TagItem } from 'app/shared/models/todo.model';
import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-tag-dialogue',
    templateUrl: './tag-dialogue.component.html',
    styleUrls: ['./tag-dialogue.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TagDialogueComponent implements OnInit {

  tagList: TagItem[];

  constructor(
    private cdr: ChangeDetectorRef,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<TagDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) private data
    ) { }

  ngOnInit() {
    this.todoService.getTagList().subscribe((tagList:TagItem[]) => {
      this.tagList = tagList;
      this.cdr.markForCheck();
    })
  }

  addTag(tagName: string) {
    if(tagName) {
      let tag = {
        // id: this.tagList.length+1,
        name:tagName
      }
      // this.tagList.push(tag);
      this.todoService.saveTag(tag).subscribe(res => {
        this.tagList = [...res]
      });
      this.cdr.markForCheck();
    }
  }

  deleteTag(tag: TagItem) {
    this.todoService.deleteTag(tag);
  }

}

```

---

#### 📄 `src/app/views/todo/todo/todo.component.html`

```html
<div class="page-layout overflow-hidden pb-8">
  <div class="header-bg bg-primary"></div>
  <div class="content">
    <div class="content-header flex flex-wrap justify-center items-center mb-4">
      <div class="search-box flex items-center Ltemplate-card flex-grow">
        <button mat-icon-button><mat-icon>search</mat-icon></button>
        <input class="bg-card" type="text" (keyup)="updateSearchTerm(serachTerm.value)" placeholder="Search for a task" #serachTerm />
      </div>
    </div>

    <div class="content-body">
      <div class="Ltemplate-card flex flex-col h-screen" [perfectScrollbar]>
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
</div>
```

---

#### 📄 `src/app/views/todo/todo/todo.component.ts`

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService) { 
  }

  ngOnInit() {
    this.updateSearchTerm("");
  }

  updateSearchTerm(term: string) {
    this.todoService.updateSearchTerm(term);
  }

}

```

---

#### 📄 `src/app/views/todo/todo-details/todo-details.component.html`

```html
<mat-toolbar>
  <button mat-icon-button routerLink="/todo/list">
    <mat-icon>arrow_back</mat-icon>
  </button>

  <mat-checkbox
    style="margin-left: 16px; font-size: 14px;"
    [checked]="todo?.done"
    (change)="todo.done = !todo.done"
  >
    <span>
      {{ todo?.done ? "Mark as undone" : "Mark as done" }}
    </span>
  </mat-checkbox>

  <div class="flex justify-end items-center flex-grow">
    <button
      mat-icon-button
      (click)="todo.read = !todo.read"
      matTooltip="{{ todo?.read ? 'Mark as unread' : 'Mark as read' }}"
    >
      <mat-icon>{{ todo?.read ? "drafts" : "markunread" }}</mat-icon>
    </button>
    <button
      mat-icon-button
      (click)="todo.important = !todo.important"
      matTooltip="{{
        todo?.important ? 'Mark as unimportant' : 'Mark as important'
      }}"
    >
      <mat-icon
        [ngClass]="{
          'fill-color-warn': todo?.important
        }"
        >{{ todo?.important ? "error" : "error_outline" }}</mat-icon
      >
    </button>
    <button
      mat-icon-button
      matTooltip="{{ todo?.starred ? 'Remove star' : 'Mark star' }}"
      (click)="todo.starred = !todo.starred"
    >
      <mat-icon
        [ngClass]="{
          'fill-color-accent': todo?.starred
        }"
        >{{ todo?.starred ? "star" : "star_outline" }}</mat-icon
      >
    </button>

    <!-- drop down menu for tag -->
    <button
      mat-icon-button
      matTooltip="Manage tags"
      (click)="openTagManaginDialogue()"
    >
      <mat-icon>library_add</mat-icon>
    </button>
    <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Add tags">
      <mat-icon>label</mat-icon>
    </button>
    <mat-menu #menu="matMenu" [xPosition]="'before'">
      <button
        style="text-transform: capitalize;"
        mat-menu-item
        *ngFor="let tag of tagList"
        (click)="updateTodoTag(tag.id)"
      >
        {{ tag.name }}
      </button>
    </mat-menu>

    <button mat-icon-button matTooltip="Delete" (click)="deleteTodo()">
      <mat-icon>delete_outline</mat-icon>
    </button>
  </div>
</mat-toolbar>

<div class="!p-4 mat-bg-card">
  <mat-chip-listbox #chipList>
    <div *ngFor="let tagId of todo?.tag">
      <mat-chip
        *ngIf="tagMap.get(tagId)"
        class="!flex justify-center items-center"
        [selectable]="true"
        [removable]="true"
        (removed)="removeTagFromTodo(tagId)"
      >
        <span>{{ tagMap.get(tagId) }}</span>
        <mat-icon matChipRemove>cancel</mat-icon>
      </mat-chip>
    </div>
  </mat-chip-listbox>
</div>

<!-- input fields for title and notes -->
<form
  *ngIf="todoForm"
  [formGroup]="todoForm"
  class="flex flex-col"
  style="padding: 0px 16px;margin-top: 20px;"
  (ngSubmit)="saveTodo()"
>
  <mat-form-field>
    <input formControlName="title" matInput placeholder="Title" required />
  </mat-form-field>

  <mat-form-field>
    <textarea
      formControlName="note"
      matInput
      placeholder="Put your notes"
      matTextareaAutosize
      required
    ></textarea>
  </mat-form-field>

  <div class="flex justify-start items-center">
    <mat-form-field class="!mr-4 rtl:ml-4">
      <input
        formControlName="startDate"
        matInput
        [matDatepicker]="picker"
        placeholder="Start Date"
        required
      />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <mat-form-field>
      <input
        formControlName="dueDate"
        matInput
        [matDatepicker]="picker2"
        placeholder="Due Date"
        required
      />
      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
      <mat-datepicker #picker2></mat-datepicker>
    </mat-form-field>
  </div>
  <div class="flex justify-start items-center !mt-4">
    <button class="!mr-4 rtl:ml-4" color="primary" mat-raised-button>Save</button>
    <button type="button" mat-button routerLink="/todo/list">Cancel</button>
  </div>
</form>

```

---

#### 📄 `src/app/views/todo/todo-details/todo-details.component.ts`

```typescript
import { TagDialogueComponent } from './../tag-dialogue/tag-dialogue.component';
import { UntypedFormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { TodoService } from './../todo.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TodoItem, TagItem } from 'app/shared/models/todo.model';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
    selector: 'app-todo-details',
    templateUrl: './todo-details.component.html',
    styleUrls: ['./todo-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TodoDetailsComponent implements OnInit {

  todo: TodoItem = {
    title: '',
    note: '',
    startDate: '',
    dueDate: '',
    tag: []
  };

  todoForm: UntypedFormGroup;
  a: PerfectScrollbar;
  tagList: TagItem[];
  tagMap: Map<number,string> = new Map();

  constructor(
    private tagDialogue: MatDialog,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private todoService: TodoService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    
    let id = this.route.snapshot.params['id'];

    if(id) {
      this.todoService.getTodoById(id).subscribe((todo: TodoItem) => {
        this.todo = todo;
        // console.log(todo)
        this.buildTodoForm(this.todo);
      });
    } else this.buildTodoForm();

    this.getTagList()

  }

  getTagList() {
    this.tagMap.clear();
    this.todoService.getTagList().subscribe((tagList: TagItem[]) => {
      this.tagList = tagList; 
      tagList.forEach((tag: TagItem) => {
        this.tagMap.set(tag.id,tag.name);
      });
      this.cdr.markForCheck();
    });
  }

  buildTodoForm(todo?: TodoItem) {
    this.todoForm = this.fb.group({
      title: [todo?todo.title:''],
      note: [todo?todo.note:''],
      startDate: [todo?todo.startDate:''],
      dueDate: [todo?todo.dueDate:'']
    });
  }

  saveTodo() {
    if(this.todoForm.invalid)
    return;
    this.todo.title = this.todoForm.get("title").value;
    this.todo.note = this.todoForm.get("note").value;
    this.todo.startDate = this.todoForm.get("startDate").value;
    this.todo.dueDate = this.todoForm.get("dueDate").value;

    this.todoService.updateTodo(this.todo).subscribe(res => {
      this.router.navigateByUrl("/todo/list");
    });

  }

  updateTodoTag(id: number) {
      if(!this.todo.tag.includes(id)) {
        this.todo.tag.push(id);
        this.cdr.markForCheck();
      }
  }

  removeTagFromTodo(tagId) {
    this.todo.tag.splice(this.todo.tag.indexOf(tagId),1);
    this.cdr.markForCheck();
  }

  deleteTodo() {
    if(this.todo.id) {
      this.todoService.deleteTodo(this.todo).subscribe(e=>{
        this.router.navigateByUrl("/todo/list");
      });
    }
  }

  openTagManaginDialogue() {
    const dialogRef = this.tagDialogue.open(TagDialogueComponent, {
      // width: '250px',
      // data: {name: "", animal: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTagList();
    });
  }
  }

```

---

#### 📄 `src/app/views/todo/todo-list/todo-list.component.html`

```html
<mat-toolbar>

  <button mat-icon-button [matMenuTriggerFor]="menu">
    <mat-icon>arrow_drop_down</mat-icon>
  </button>
  <mat-menu #menu="matMenu">
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>All</button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>Done</button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>Undone</button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>Read</button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>Unread</button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>
      Starred
    </button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>
      Unstarred
    </button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>
      Important
    </button>
    <button (click)="onTodoOptionSelected($event)" mat-menu-item>
      Unimportant
    </button>
  </mat-menu>

  <button mat-icon-button [matMenuTriggerFor]="tagMenu">
    <mat-icon>label</mat-icon>
  </button>
  <mat-menu #tagMenu="matMenu">
    <button
      mat-menu-item
      (click)="onTodoOptionSelected({ target: { innerText: 'All' } })"
    >
      all
    </button>
    <button
      mat-menu-item
      *ngFor="let tag of tagList"
      (click)="filterTodoListOnTag(tag)"
    >
      {{ tag.name }}
    </button>
  </mat-menu>

  <div class="flex justify-end items-center flex-grow">
    <button mat-raised-button color="primary" routerLink="/todo/add">
      Create Todo
    </button>
  </div>
</mat-toolbar>

<div cdkDropList class="todo-list" (cdkDropListDropped)="drop($event)">
  <div
    class="todo-box flex justify-center items-center"
    *ngIf="todoList?.length < 1"
  >
    Loading...
  </div>
  <div
    class="todo-box flex justify-start items-center mat-bg-card"
    *ngFor="let todo of (todoList | todoSearch: searchTerm)"
    cdkDrag
    cdkDragHandle
  >
    <!-- <mat-checkbox
      [checked]="todo?.selected"
      (change)="toggleCheckBox(todo)"
    ></mat-checkbox> -->
    <mat-icon class="move-handler">open_with</mat-icon>

    <div class="flex justify-between items-center flex-grow !ml-4 rtl:mr-4 rtl:ml-4">
      <div
        class="flex flex-col flex-grow cursor-pointer"        
        routerLink="/todo/list/{{ todo?.id }}"
      >
        <span class="font-bold !mb-2">{{ todo?.title }}</span>
        <span class="!mb-2">{{ todo?.note }}</span>

        <mat-chip-listbox #chipList>
          <div *ngFor="let tag of todo?.tag">
            <mat-chip *ngIf="tagMap.get(tag)">
              {{ tagMap.get(tag) }}
            </mat-chip>
          </div>
        </mat-chip-listbox>
      </div>

      <div class="flex justify-end items-center">
        <button mat-icon-button (click)="toggleImportant(todo)">
          <mat-icon
            [ngClass]="{
              'fill-color-warn': todo?.important
            }"
            >{{ todo?.important ? "error" : "error_outline" }}</mat-icon
          >
        </button>
        <button mat-icon-button (click)="toggleStar(todo)">
          <mat-icon
            [ngClass]="{
              'fill-color-accent': todo?.starred
            }"
            >{{ todo?.starred ? "star" : "star_outline" }}</mat-icon
          >
        </button>
        <div>
          <button mat-icon-button [matMenuTriggerFor]="menu2">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu2="matMenu" [xPosition]="'before'">
            <button mat-menu-item (click)="toggleRead(todo)">
              <mat-icon>{{
                todo.read ? "check_box" : "check_box_outline_blank"
              }}</mat-icon>
              <span style="vertical-align: middle;">{{
                todo.read ? "Mark as unread" : "Mark as read"
              }}</span>
            </button>
            <button mat-menu-item (click)="toggleDone(todo)">
              <mat-icon>{{
                todo.done ? "check_box" : "check_box_outline_blank"
              }}</mat-icon>
              <span style="vertical-align: middle;">{{
                todo.done ? "Mark as undone" : "Mark as done"
              }}</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </div>
  </div>
</div>

```

---

#### 📄 `src/app/views/todo/todo-list/todo-list.component.ts`

```typescript
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { TodoService } from "../todo.service";
import { TodoItem, TagItem } from "app/shared/models/todo.model";
import { debounceTime, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "app-todo-list",
    templateUrl: "./todo-list.component.html",
    styleUrls: ["./todo-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class TodoListComponent implements OnInit, OnDestroy {
  todoList: TodoItem[];
  tempList: TodoItem[];
  searchTerm: string;
  test: string;
  tagList: TagItem[];
  tagMap: Map<number, string> = new Map<number, string>();
  isMasterToggled: boolean = false;
  toggledItemNumber: number = 0;
  unsubscribeAll: Subject<any>;

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.tagMap.clear();
    this.todoService.getTodoList()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((res: TodoItem[]) => {
      this.todoList = res;
      this.tempList = res; //used for filtering data

      this.todoService.getTagList()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res: TagItem[]) => {
        this.tagList = res;
        res.forEach((tag: TagItem) => {
          this.tagMap.set(tag.id, tag.name);
          this.cdr.markForCheck();
        });
      });
    });

    this.todoService.getSearchTerm().pipe(debounceTime(250))
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(term => {
      this.searchTerm = term;
      this.cdr.markForCheck();
    });

  }

  ngOnDestroy() {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
  }

  drop(event: CdkDragDrop<TodoItem[]>) {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
    // Do what you need with the re-arranged array "todoList"
    this.cdr.markForCheck();
  }

  filterTodoListOnTag(tag: TagItem) {
    this.todoList = this.tempList.filter((todo: TodoItem) => {
      return todo.tag.includes(tag.id);
    })
    this.cdr.detectChanges();
  }

  onTodoOptionSelected(event) {
    switch (event.target.innerText) {
      case "All":
        this.todoList = this.tempList;
        break;

      case "Read":
        this.todoList = this.tempList.filter((todo: TodoItem) => {
          return !todo.read;
        });
        break;

      case "Unread":
        this.todoList = this.tempList.filter((todo: TodoItem) => {
          return !todo.read;
        });
        break;

      case "Important":
        this.todoList = this.tempList.filter((todo: TodoItem) => {
          return todo.important;
        });
        break;

      case "Unimportant":
        this.todoList = this.tempList.filter((todo: TodoItem) => {
          return !todo.important;
        });
        break;

      case "Done":
        this.todoList = this.tempList.filter((todo: TodoItem) => {
          return todo.done;
        });
        break;

      case "Undone":
      this.todoList = this.tempList.filter((todo: TodoItem) => {
        return !todo.done;
      });
      break;

      case "Starred":
        this.todoList = this.tempList.filter((todo: TodoItem) => {
          return todo.starred;
        });
        break;

      case "Unstarred":
        this.todoList = this.tempList.filter((todo: TodoItem) => {
          return !todo.starred;
        });
        break;

      default:
        break;
    }

    this.cdr.detectChanges();
  }

  masterToggle() {
    this.toggledItemNumber = 0;

    this.isMasterToggled = !this.isMasterToggled;

    if (this.isMasterToggled) {
      this.todoList.forEach((todo: TodoItem) => {
        todo.selected = true;
        this.toggledItemNumber++;
      });
    } else {
      this.todoList.forEach((todo: TodoItem) => {
        todo.selected = false;
        this.toggledItemNumber--;
      });
    }

    this.cdr.detectChanges();
  }

  toggleCheckBox(todo: TodoItem) {
    todo.selected = !todo.selected;
    if (todo.selected) this.toggledItemNumber++;
    else this.toggledItemNumber--;

    if (this.toggledItemNumber == this.todoList.length)
      this.isMasterToggled = true;
    else if (this.toggledItemNumber == 0) this.isMasterToggled = false;
  }

  toggleImportant(todo: TodoItem) {
    todo.important = !todo.important;
    this.todoService.updateTodo(todo);
  }

  toggleStar(todo: TodoItem) {
    todo.starred = !todo.starred;
    this.todoService.updateTodo(todo);
  }

  toggleRead(todo: TodoItem) {
    todo.read = !todo.read;
    this.todoService.updateTodo(todo);
  }

  toggleDone(todo: TodoItem) {
    todo.done = !todo.done;
    this.todoService.updateTodo(todo);
  }
}

```

---

#### 📄 `src/app/views/todo/todo-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TodoListComponent
      },
      {
        path: 'add',
        component: TodoDetailsComponent
      },
      {
        path: 'list/:id',
        component: TodoDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TodoRoutingModule { }

```

---

#### 📄 `src/app/views/todo/todo-search.pipe.ts`

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from 'app/shared/models/todo.model';

@Pipe({
    name: 'todoSearch',
    standalone: false
})
export class TodoSearchPipe implements PipeTransform {

  transform(value: TodoItem[], term?: string): TodoItem[] {

    if(value !== undefined && term) {
      return value.filter((todo: TodoItem) => {
        return todo.title.toLowerCase().match(term.toLowerCase())
         || todo.note.toLowerCase().match(term.toLowerCase());
      });
    }
      return value;
  }

}

```

---

#### 📄 `src/app/views/todo/todo.module.ts`

```typescript
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TodoRoutingModule } from "./todo-routing.module";
import { TodoComponent } from "./todo/todo.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoDetailsComponent } from "./todo-details/todo-details.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoSearchPipe } from './todo-search.pipe';
import { TagDialogueComponent } from './tag-dialogue/tag-dialogue.component';

@NgModule({
  declarations: [TodoComponent, TodoListComponent, TodoDetailsComponent, TodoSearchPipe, TagDialogueComponent],
  imports: [
    CommonModule, 
    TodoRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    DragDropModule,
    MatRippleModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    PerfectScrollbarModule
  ],
  // entryComponents: [TagDialogueComponent]
})
export class TodoModule {}

```

---

#### 📄 `src/app/views/todo/todo.service.ts`

```typescript
import { TagItem } from './../../shared/models/todo.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { TodoItem } from 'app/shared/models/todo.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Todo, TodoTag } from 'app/shared/inmemory-db/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  sub: Subscription;

  constructor(private http: HttpClient) {
  }

  getTodoList() {
    return of(Todo.todoList)
    // return this.http.get("/api/todoList");
  }

  getTodoById(id) {
    return of(Todo.todoList.find(todo => todo.id === +id));
    // return this.http.get("/api/todoList/"+id);
  }

  getTagList() {
    return of(TodoTag.tag);
    // return this.http.get("/api/todoTag");
  }

  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  saveTag(tag: TagItem) {
    let newTag: TagItem = {
      id: Math.floor(Math.random() * 9000) + 1000,
      ...tag
    }
    TodoTag.tag.push(newTag);
    return of(TodoTag.tag)
    // return this.http.post("/api/todoTag/",tag);
  }

  deleteTag(tag: TagItem) {
    let filteredTag = TodoTag.tag.filter(t => t.id !== +tag.id);
    TodoTag.tag = [...filteredTag];
    return of(TodoTag.tag);
    // this.http.delete("/api/todoTag/" + tag.id).subscribe(e => { });
  }

  deleteTodo(todo: TodoItem) {
    let filteredTodo = Todo.todoList.filter(t => t.id !== +todo.id);
    Todo.todoList = [...filteredTodo];
    return of(Todo.todoList);
    // return this.http.delete("/api/todoList/" + todo.id);
  }

  updateTodo(todo: TodoItem) {

    let updatedTodo;
    todo.selected = false;

    if (!todo.id) {
      todo.id = Math.floor(Math.random() * 9000) + 1000;
      Todo.todoList.push(todo);
      // updatedTodo = todo;
      // updatedTodo = this.http.post("/api/todoList/", todo);
    }
    else {
      Todo.todoList.map(t => {
        if(t.id === +todo.id) {
          return {...todo}
        }
        return t;
      });
      // updatedTodo = this.http.put("/api/todoList/" + todo.id, todo);
    }

    return of(todo);
  }
}

```

---

#### 📄 `src/app/views/utilities/colors/colors.component.html`

```html
<mat-card class="p-4 max-w-[750px] !my-6 !mx-auto">
  <h2 class="text-2xl font-bold mb-4">Background Colors</h2>
  <div class="flex flex-wrap gap-4 mb-8">
    <div class="flex flex-col items-center gap-2">
      <div class="bg-base w-[100px] h-[100px] rounded-md border border-divider"></div>
      <p class="text-base">.bg-base</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="bg-card w-[100px] h-[100px] rounded-md border border-divider"></div>
      <p class="text-card">.bg-card</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="bg-hover w-[100px] h-[100px] rounded-md border border-divider"></div>
      <p class="text-hover">.bg-hover</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="bg-primary w-[100px] h-[100px] rounded-md"></div>
      <p class="text-base">.bg-primary</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="bg-accent w-[100px] h-[100px] rounded-md"></div>
      <p class="text-base">.bg-accent</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="bg-warn w-[100px] h-[100px] rounded-md"></div>
      <p class="text-base">.bg-warn</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="bg-info w-[100px] h-[100px] rounded-md"></div>
      <p class="text-base">.bg-info</p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="bg-slate-500 w-[100px] h-[100px] rounded-md"></div>
      <p class="text-base">.bg-slate-500</p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="bg-gray-500 w-[100px] h-[100px] rounded-md"></div>
      <p class="text-base">.bg-gray-500</p>
    </div>

  </div>

  <h2 class="text-2xl font-bold">Text Colors</h2>

  <div class="flex flex-wrap gap-4 mb-8">
    <div class="flex flex-col items-center gap-2">
      <p class="text-base">.text-base</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-secondary">.text-secondary</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-slate-500">.text-slate-500</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-gray-500">.text-gray-500</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-hint">.text-hint</p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <p class="text-primary">.text-primary</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-accent">.text-accent</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-warn">.text-warn</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-success">.text-success</p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-info">.text-info</p>
    </div>
  </div>

  <h2 class="text-2xl font-bold">Border & Divider</h2>
  <div class="flex flex-wrap gap-4 mb-8">
    <div class="flex flex-col items-center gap-2 border border-black rounded-md p-2">
      <p class="text-base m-0">.border .border-black</p>
    </div>
    <div class="flex flex-col items-center gap-2 border border-divider rounded-md p-2">
      <p class="text-base m-0">.border .border-divider</p>
    </div>
    <div class="flex flex-col items-center gap-2 border border-slate-400 rounded-md p-2">
      <p class="text-base m-0">.border .border-slate-400</p>
    </div>
  </div>
</mat-card>
```

---

#### 📄 `src/app/views/utilities/colors/colors.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss'],
    standalone: false
})
export class ColorsComponent implements OnInit {
  colors = {
    "primary": {},
    "accent": {},
    "warn": {}
  }
  constructor() { }

  ngOnInit() {
    // console.log(Object.keys(this.colors).length)
  }

}

```

---

#### 📄 `src/app/views/utilities/typography/typography.component.html`

```html
<mat-card class="p-4 max-w-[750px] !my-6 !mx-auto">
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-headline-1 my-0 mr-4 rtl:ml-4">Headline 1</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-headline-1	&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-headline-2 my-0 mr-4 rtl:ml-4">Headline 2</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-headline-2	&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-headline-3 my-0 mr-4 rtl:ml-4">Headline 3</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-headline-3	&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-headline-4 my-0 mr-4 rtl:ml-4">Headline 4</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-headline-4	&quot;></span>'
          "></code></pre>
        </div>
    </div>

    
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-headline-5 my-0 mr-4 rtl:ml-4">Headline 5</span>
      <div>
          <pre><code LtemplateHighlight="
            <span class=&quot;mat-headline-5&quot;></span>
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-headline-6 my-0 mr-4 rtl:ml-4">Headline 6</span>
      <div>
          <pre><code LtemplateHighlight="
            <span class=&quot;mat-headline-6&quot;></span>
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-subtitle-1 my-0 mr-4 rtl:ml-4">subtitle 1</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-subtitle-1&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-subtitle-2 my-0 mr-4 rtl:ml-4">subtitle 2</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-subtitle-2&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-heading-label my-0 mr-4 rtl:ml-4">Heading Label</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-heading-label&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-body-1 my-0 mr-4 rtl:ml-4">Body 1</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-body-1&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-body-2 my-0 mr-4 rtl:ml-4">Body 2</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-body-2&quot;></span>'
          "></code></pre>
        </div>
    </div>
    <div class="flex flex-wrap justify-between items-center mb-6">
      <span class="mat-caption my-0 mr-4 rtl:ml-4">Caption</span>
      <div>
          <pre><code [LtemplateHighlight]="
            '<span class=&quot;mat-caption&quot;></span>'
          "></code></pre>
        </div>
    </div>


  </mat-card>
```

---

#### 📄 `src/app/views/utilities/typography/typography.component.ts`

```typescript
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.scss'],
    standalone: false
})
export class TypographyComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    
  }

}

```

---

#### 📄 `src/app/views/utilities/utilities-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypographyComponent } from './typography/typography.component';
import { ColorsComponent } from './colors/colors.component';

const routes: Routes = [
  {
    path: 'color',
    component: ColorsComponent
  },
  {
    path: 'typography',
    component: TypographyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }

```

---

#### 📄 `src/app/views/utilities/utilities.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilitiesRoutingModule } from './utilities-routing.module';
import { TypographyComponent } from './typography/typography.component';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { ColorsComponent } from './colors/colors.component';
import { commonMaterialModules, allMaterialModules } from 'app/shared/material-imports';

@NgModule({
  declarations: [TypographyComponent, ColorsComponent],
  imports: [
    CommonModule,
    ...commonMaterialModules,
    ...allMaterialModules,
    SharedDirectivesModule,
    UtilitiesRoutingModule
  ]
})
export class UtilitiesModule { }

```

---

## 🎨 Единая цветовая система и темы

Ltemplate использует **Unified Color System** — централизованную модель дизайн-токенов:

```mermaid
graph LR
    Tokens["_color-tokens.scss (Slate, Indigo, Violet, Amber, Rose)"] --> SCSSVars["_css-vars.scss (:root, .Ltemplate-navy, .Ltemplate-navy-dark)"]
    SCSSVars --> MDC["Angular Material MDC (Themes & Containers)"]
    SCSSVars --> Tailwind["tailwind.config.js (bg-card, text-base, border-divider)"]
    ThemeService["ThemeService (Angular CDK OverlayContainer)"] --> BodyTheme["document.body & .cdk-overlay-container"]
```

### Доступные темы:
1. **Navy Light (Светлая по умолчанию)**:
   - Фон приложения: светлый мягкий оттенок `#f8fafc` (Slate 50).
   - Карточки и меню: чистый белый `#ffffff`.
   - Акцентный цвет: глубокий флотский синий `#0f174c` (Primary).
2. **Navy Dark (Тёмная тема)**:
   - Фон приложения: тёмный сланец `#0b0f19`.
   - Карточки и выпадающие панели: тёмно-сланцевый `#0f172a` (Slate 900).
   - Текст: высококонтрастный мягкий белый с правильной градацией читаемости.

### Управление темами через `ThemeService`
Переключение тем происходит реактивно через сервис `ThemeService`:
```typescript
// Внедрение в компонент
constructor(private themeService: ThemeService) {}

// Переключение темы
this.themeService.setActiveThemeById('Ltemplate-navy-dark');
```
Классы темы автоматически применяются не только к корневому `<html>`, но и к `<body>`, а также к контейнеру оверлеев Angular CDK (`this.overlayContainer.getContainerElement()`). Это гарантирует, что диалоги, тултипы и всплывающие меню всегда отображаются в актуальной теме без прозрачности.

---

## 🖼 Дизайн-система, ассеты и стили

### Структура SCSS стилей (`src/assets/styles/`)

```
src/assets/styles/
├── app.scss                       # Главный файл объединения всех SCSS-модулей
├── tailwind.scss                  # Директивы Tailwind (@tailwind base, components, utilities)
├── scss/
│   ├── _variables.scss            # Sass-переменные размеров, шрифтов, брейкпоинтов
│   ├── _color-tokens.scss         # Централизованные цветовые палитры (Slate, Indigo, Violet, и др.)
│   ├── _css-vars.scss             # CSS Custom Properties (:root, .Ltemplate-navy, .Ltemplate-navy-dark)
│   ├── _typography.scss           # Шрифтовые классы и стили типографики
│   ├── _animations.scss           # Keyframe-анимации
│   ├── _page-layouts.scss         # Стили раскладок страниц
│   ├── components/                # Стилизация компонентов
│   │   ├── _components.scss       # Реестр подключения компонентных стилей
│   │   ├── _button.scss           # Кнопки MDC
│   │   ├── _card.scss             # Карточки MDC
│   │   ├── _menu.scss             # Выпадающие списки, mat-menu, mat-select, autocomplete
│   │   ├── _notifications.scss    # Шторка уведомлений и mat-sidenav/mat-drawer
│   │   ├── _mat-table.scss        # Таблицы Material
│   │   ├── _ltemplate-sidebar.scss# Левый сайдбар
│   │   ├── _example-viewer.scss   # Блоки просмотра примеров кода
│   │   ├── _perfect-scrollbar.scss# Кастомные скроллбары
│   │   ├── _ngx-pagination.scss   # Элементы пагинации
│   │   └── _others.scss           # Вспомогательные элементы
│   ├── main/                      # Основные элементы каркаса приложения
│   │   ├── _main.scss             # Импорт файлов каркаса
│   │   ├── _header.scss           # Общие стили шапки
│   │   ├── _header-side.scss      # Шапка для вертикального режима
│   │   ├── _header-top.scss       # Шапка для горизонтального режима
│   │   ├── _sidebar.scss          # Сайдбар каркаса
│   │   ├── _sidenav.scss          # Боковые панели
│   │   ├── _topnav.scss           # Верхняя навигация
│   │   ├── _layout.scss           # Сетка контейнеров и врапперов
│   │   ├── _breadcrumb.scss       # Хлебные крошки
│   │   ├── _footer.scss           # Подвал
│   │   ├── _notifications.scss    # Стили уведомлений каркаса
│   │   └── _scaffolding.scss      # Базовая разметка страницы
│   ├── mixins/                    # Sass-миксины
│   │   ├── _mixins.scss           # Миксины брейкпоинтов и теней
│   │   └── _gradients.scss        # Градиентные заливки
│   ├── themes/                    # Темы оформления
│   │   ├── _init.scss             # Инициализация светлой и тёмной тем Angular Material
│   │   ├── _ltemplate.theme.scss  # Настройки палитр
│   │   ├── _header-top.theme.scss # Тематизация верхней шапки
│   │   ├── _ltemplate-calendar.theme.scss # Стилизация календаря
│   │   └── _driverjs-tour.theme.scss # Стилизация подсказок тура
│   └── views/                     # Индивидуальные стили разделов
│       ├── _calendar.scss         # Календарь
│       ├── _chats.scss            # Чат
│       ├── _gallery.scss          # Галерея
│       ├── _inbox.scss            # Почтовый ящик
│       ├── _invoice.scss          # Счета
│       ├── _landing.scss          # Лендинг
│       ├── _pricings.scss         # Таблицы цен
│       ├── _profile.scss          # Профиль пользователя
│       ├── _shop.scss             # Магазин
│       ├── _users.scss            # Пользователи
│       ├── _views.scss            # Сводный файл представлений
│       ├── sessions/              # Стили страниц авторизации
│       └── todo/                  # Стили таск-менеджера
```

---

### Каталог статических ассетов и медиа (`src/assets/`)

- **`src/assets/i18n/`**:
  - `en.json`: Английская локализация интерфейса.
  - `es.json`: Испанская локализация интерфейса.
- **`src/assets/images/illustrations/`**: Векторные SVG-иллюстрации премиум-качества:
  - `meditating_girl.svg`: Вход и регистрация (разработчик в медитации с графиками).
  - `forgot-password.svg`: Восстановление пароля (ключ, щит безопасности, карта).
  - `lock-and-key.svg`: Блокировка экрана (кибер-замок со сканером отпечатка).
  - `404.svg`: Ошибка 404 (космический портал, астронавт, планеты).
  - `500_error.svg`: Ошибка сервера 500 (серверная стойка).
  - `upgrade.svg`: Обновление аккаунта (ракета PRO).
- **`src/assets/images/logos/`**: Актуальные векторные и растровые логотипы технологий (`angular.png`, `react.png`, `vue.png`, `sass.png`, `bootstrap.png`, `webpack.png`, `npm.png`, `laravel.png`, `spotify.svg`, `google.svg`, `apple.svg` и др.).
- **`src/assets/images/cryptocurrencies/`**: Официальные круглые иконки криптовалют высокой четкости (`BTC.png`, `ETH.png`, `USDT.png`, `BNB.png`, `SOL`, `XRP.png`, `DOGE.png` и др.).
- **`src/assets/images/products/`**: Студийные фотографии товаров интернет-магазина (`iphone-1.jpg`, `watch-1.jpg`, `headphone-1.jpg`..`headphone-4.jpg`, `speaker-1.jpg`).
- **`src/assets/images/svg-icons/`**: Обширная библиотека векторных значков интерфейса (более 70 SVG-иконок).
- **`src/assets/images/`**: Студийные портретные аватары (`face-1.jpg`..`face-7.jpg`, `faces/`), фотографии галереи (`sq-1.jpg`..`sq-17.jpg`), обои (`backgrounds/signin.webp`, `sidebar-bg.jpg`, `sidebar-bg-dark.jpg`).

---

## 🔒 Авторизация и безопасность

- **`JwtAuthService`**: управляет жизненным циклом сессии, сохраняет токен и профиль пользователя в `localStorage`.
- **`AuthGuard`**: блокирует неавторизованный доступ к внутренним маршрутам админ-панели и перенаправляет на `/sessions/signin`.
- **`UserRoleGuard`**: проверяет права доступа (роли `SA` — Super Admin, `ADMIN`, `USER`) перед переходом в защищённые подразделы.

---

## 🧪 Тестирование и контроль качества

Проект полностью протестирован и оптимизирован для CI/CD-пайплайнов:
- **182 из 182 тестов успешно проходят (100% Pass Rate)**.
- Тесты выполняются в среде **Chrome Headless** без необходимости открытия окна браузера:

```bash
# Запуск тестов один раз
npx ng test --watch=false --browsers=ChromeHeadless
```

---

## 📦 Сборка для продакшн

Для генерации оптимизированного production-бандла выполните:

```bash
npm run build
```

- Сборка генерирует оптимизированные chunk-файлы в папку `dist/`.
- Время сборки: **~5.7 секунд**.
- Все CSS-классы Tailwind автоматически прореживаются (Purge/JIT), оставляя минимальный размер стилей (~29 КБ gzip).

---

## 🌲 Исчерпывающее дерево файлов проекта (Full Filesystem Tree)

Ниже приведено полное дерево каждого каталога и файла проекта (за исключением скомпилированных артефактов `dist`, кэша `.angular` и внешних пакетов `node_modules`):

Ниже приведено полное дерево каждого каталога и файла проекта (за исключением скомпилированных артефактов `dist`, кэша `.angular` и внешних пакетов `node_modules`):

```text
Ltemplate/
├── src/
│   ├── app/
│   │   ├── shared/
│   │   │   ├── animations/
│   │   │   │   └── ltemplate-animations.ts (1.0 KB)
│   │   │   ├── components/
│   │   │   │   ├── bottom-sheet-share/
│   │   │   │   │   ├── bottom-sheet-share.component.html (1.2 KB)
│   │   │   │   │   ├── bottom-sheet-share.component.scss (0.0 KB)
│   │   │   │   │   └── bottom-sheet-share.component.ts (0.5 KB)
│   │   │   │   ├── breadcrumb/
│   │   │   │   │   ├── breadcrumb.component.html (0.8 KB)
│   │   │   │   │   ├── breadcrumb.component.scss (0.0 KB)
│   │   │   │   │   └── breadcrumb.component.ts (2.3 KB)
│   │   │   │   ├── button-loading/
│   │   │   │   │   ├── button-loading.component.html (0.4 KB)
│   │   │   │   │   ├── button-loading.component.scss (0.0 KB)
│   │   │   │   │   └── button-loading.component.ts (0.6 KB)
│   │   │   │   ├── customizer/
│   │   │   │   │   ├── customizer.component.html (5.4 KB)
│   │   │   │   │   ├── customizer.component.scss (4.2 KB)
│   │   │   │   │   └── customizer.component.ts (3.6 KB)
│   │   │   │   ├── divider/
│   │   │   │   │   ├── divider.component.html (0.2 KB)
│   │   │   │   │   ├── divider.component.scss (0.3 KB)
│   │   │   │   │   └── divider.component.ts (0.4 KB)
│   │   │   │   ├── example-viewer/
│   │   │   │   │   ├── example-viewer.component.html (1.5 KB)
│   │   │   │   │   ├── example-viewer.component.scss (0.0 KB)
│   │   │   │   │   └── example-viewer.component.ts (1.6 KB)
│   │   │   │   ├── example-viewer-template/
│   │   │   │   │   ├── example-viewer-template.component.html (0.2 KB)
│   │   │   │   │   ├── example-viewer-template.component.scss (0.0 KB)
│   │   │   │   │   └── example-viewer-template.component.ts (1.3 KB)
│   │   │   │   ├── footer/
│   │   │   │   │   ├── footer.component.html (0.1 KB)
│   │   │   │   │   ├── footer.component.scss (0.2 KB)
│   │   │   │   │   └── footer.component.ts (0.5 KB)
│   │   │   │   ├── header-side/
│   │   │   │   │   ├── header-side.component.ts (2.5 KB)
│   │   │   │   │   └── header-side.template.html (2.0 KB)
│   │   │   │   ├── header-top/
│   │   │   │   │   ├── header-top.component.html (4.3 KB)
│   │   │   │   │   └── header-top.component.ts (3.1 KB)
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── admin-layout/
│   │   │   │   │   │   ├── admin-layout.component.html (0.5 KB)
│   │   │   │   │   │   └── admin-layout.component.ts (2.0 KB)
│   │   │   │   │   ├── auth-layout/
│   │   │   │   │   │   ├── auth-layout.component.html (0.0 KB)
│   │   │   │   │   │   └── auth-layout.component.ts (0.6 KB)
│   │   │   │   │   ├── horizontal-layout/
│   │   │   │   │   │   ├── horizontal-layout.component.html (2.3 KB)
│   │   │   │   │   │   └── horizontal-layout.component.ts (4.0 KB)
│   │   │   │   │   └── vertical-layout/
│   │   │   │   │       ├── vertical-layout.component.html (1.8 KB)
│   │   │   │   │       └── vertical-layout.component.ts (4.6 KB)
│   │   │   │   ├── ltemplate-notifications2/
│   │   │   │   │   ├── ltemplate-notifications2.component.html (0.1 KB)
│   │   │   │   │   ├── ltemplate-notifications2.component.scss (0.0 KB)
│   │   │   │   │   ├── ltemplate-notifications2.component.ts (0.5 KB)
│   │   │   │   │   └── notifications2.service.ts (0.2 KB)
│   │   │   │   ├── ltemplate-sidebar/
│   │   │   │   │   ├── ltemplate-sidebar-helper.service.ts (0.6 KB)
│   │   │   │   │   ├── ltemplate-sidebar.component.html (0.0 KB)
│   │   │   │   │   ├── ltemplate-sidebar.component.scss (0.0 KB)
│   │   │   │   │   └── ltemplate-sidebar.component.ts (3.4 KB)
│   │   │   │   ├── notifications/
│   │   │   │   │   ├── notifications.component.html (0.8 KB)
│   │   │   │   │   └── notifications.component.ts (1.5 KB)
│   │   │   │   ├── perfect-scrollbar/
│   │   │   │   │   ├── index.ts (0.4 KB)
│   │   │   │   │   ├── perfect-scrollbar-force-native-scroll.directive.ts (0.4 KB)
│   │   │   │   │   ├── perfect-scrollbar.component.css (6.3 KB)
│   │   │   │   │   ├── perfect-scrollbar.component.html (0.7 KB)
│   │   │   │   │   ├── perfect-scrollbar.component.ts (9.1 KB)
│   │   │   │   │   ├── perfect-scrollbar.directive.ts (10.3 KB)
│   │   │   │   │   ├── perfect-scrollbar.interfaces.ts (2.2 KB)
│   │   │   │   │   └── perfect-scrollbar.module.ts (0.6 KB)
│   │   │   │   ├── sidebar-side/
│   │   │   │   │   ├── sidebar-side.component.html (3.2 KB)
│   │   │   │   │   └── sidebar-side.component.ts (3.1 KB)
│   │   │   │   ├── sidebar-top/
│   │   │   │   │   ├── sidebar-top.component.html (0.2 KB)
│   │   │   │   │   └── sidebar-top.component.ts (2.0 KB)
│   │   │   │   ├── sidenav/
│   │   │   │   │   ├── sidenav.component.ts (1.4 KB)
│   │   │   │   │   └── sidenav.template.html (3.7 KB)
│   │   │   │   └── shared-components.module.ts (3.7 KB)
│   │   │   ├── config/
│   │   │   │   └── theme-colors.ts (1.5 KB)
│   │   │   ├── directives/
│   │   │   │   ├── ltemplate-sidenav-helper/
│   │   │   │   │   ├── ltemplate-sidenav-helper.directive.ts (2.5 KB)
│   │   │   │   │   └── ltemplate-sidenav-helper.service.ts (0.4 KB)
│   │   │   │   ├── auto-focus.directive.ts (0.3 KB)
│   │   │   │   ├── dropdown-anchor.directive.ts (0.5 KB)
│   │   │   │   ├── dropdown-link.directive.ts (1.1 KB)
│   │   │   │   ├── dropdown.directive.ts (1.5 KB)
│   │   │   │   ├── font-size.directive.ts (0.3 KB)
│   │   │   │   ├── ltemplate-highlight.directive.ts (2.8 KB)
│   │   │   │   ├── ltemplate-side-nav-toggle.directive.ts (1.3 KB)
│   │   │   │   ├── scroll-to.directive.ts (1.9 KB)
│   │   │   │   └── shared-directives.module.ts (1.7 KB)
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts (0.7 KB)
│   │   │   │   └── user-role.guard.ts (0.8 KB)
│   │   │   ├── helpers/
│   │   │   │   ├── utils.ts (5.3 KB)
│   │   │   │   └── window.helper.ts (0.7 KB)
│   │   │   ├── inmemory-db/
│   │   │   │   ├── calendarEvents.ts (1.2 KB)
│   │   │   │   ├── chat-db.ts (4.1 KB)
│   │   │   │   ├── countries.ts (9.8 KB)
│   │   │   │   ├── inbox.ts (18.4 KB)
│   │   │   │   ├── inmemory-db.service.ts (0.6 KB)
│   │   │   │   ├── invoices.ts (3.1 KB)
│   │   │   │   ├── orders.ts (0.1 KB)
│   │   │   │   ├── products.ts (17.5 KB)
│   │   │   │   ├── todo.ts (1.7 KB)
│   │   │   │   └── users.ts (30.8 KB)
│   │   │   ├── interceptors/
│   │   │   │   └── token.interceptor.ts (0.8 KB)
│   │   │   ├── models/
│   │   │   │   ├── app-theme.model.ts (0.5 KB)
│   │   │   │   ├── chat.model.ts (0.5 KB)
│   │   │   │   ├── event.model.ts (1.4 KB)
│   │   │   │   ├── invoice.model.ts (0.4 KB)
│   │   │   │   ├── product.model.ts (0.4 KB)
│   │   │   │   ├── todo.model.ts (0.3 KB)
│   │   │   │   └── user.model.ts (0.1 KB)
│   │   │   ├── pipes/
│   │   │   │   ├── excerpt.pipe.ts (0.3 KB)
│   │   │   │   ├── get-value-by-key.pipe.ts (0.5 KB)
│   │   │   │   ├── relative-time.pipe.ts (1.0 KB)
│   │   │   │   └── shared-pipes.module.ts (0.4 KB)
│   │   │   ├── search/
│   │   │   │   ├── search-input-over/
│   │   │   │   │   ├── search-input-over.component.html (0.4 KB)
│   │   │   │   │   ├── search-input-over.component.scss (0.6 KB)
│   │   │   │   │   └── search-input-over.component.ts (2.1 KB)
│   │   │   │   ├── search.module.ts (0.7 KB)
│   │   │   │   └── search.service.ts (0.4 KB)
│   │   │   ├── services/
│   │   │   │   ├── app-confirm/
│   │   │   │   │   ├── app-confirm.component.ts (1.0 KB)
│   │   │   │   │   └── app-confirm.service.ts (0.9 KB)
│   │   │   │   ├── app-loader/
│   │   │   │   │   ├── app-loader.component.css (0.0 KB)
│   │   │   │   │   ├── app-loader.component.html (0.2 KB)
│   │   │   │   │   ├── app-loader.component.ts (0.7 KB)
│   │   │   │   │   └── app-loader.service.ts (0.8 KB)
│   │   │   │   ├── auth/
│   │   │   │   │   └── jwt-auth.service.ts (3.8 KB)
│   │   │   │   ├── copier.service.ts (1.6 KB)
│   │   │   │   ├── customizer.service.ts (2.6 KB)
│   │   │   │   ├── error-handler.service.ts (1.3 KB)
│   │   │   │   ├── landing-page.service.ts (0.6 KB)
│   │   │   │   ├── layout.service.ts (3.6 KB)
│   │   │   │   ├── local-store.service.ts (0.5 KB)
│   │   │   │   ├── match-media.service.ts (0.8 KB)
│   │   │   │   ├── navigation.service.ts (29.2 KB)
│   │   │   │   ├── route-parts.service.ts (1.1 KB)
│   │   │   │   ├── theme.service.ts (5.4 KB)
│   │   │   │   └── ui-lib-icon.service.ts (5.1 KB)
│   │   │   ├── utils/
│   │   │   │   └── color-utils.ts (5.3 KB)
│   │   │   ├── material-imports.ts (4.3 KB)
│   │   │   └── shared.module.ts (1.0 KB)
│   │   ├── views/
│   │   │   ├── app-calendar/
│   │   │   │   ├── calendar-form-dialog/
│   │   │   │   │   ├── calendar-form-dialog.component.html (3.3 KB)
│   │   │   │   │   ├── calendar-form-dialog.component.scss (0.0 KB)
│   │   │   │   │   └── calendar-form-dialog.component.ts (2.1 KB)
│   │   │   │   ├── app-calendar.component.css (0.0 KB)
│   │   │   │   ├── app-calendar.component.html (3.3 KB)
│   │   │   │   ├── app-calendar.component.ts (4.5 KB)
│   │   │   │   ├── app-calendar.module.ts (2.0 KB)
│   │   │   │   ├── app-calendar.routing.ts (0.2 KB)
│   │   │   │   └── app-calendar.service.ts (1.9 KB)
│   │   │   ├── app-chats/
│   │   │   │   ├── chat-contents/
│   │   │   │   │   ├── chat-contents.component.html (4.2 KB)
│   │   │   │   │   ├── chat-contents.component.scss (0.0 KB)
│   │   │   │   │   └── chat-contents.component.ts (3.3 KB)
│   │   │   │   ├── chat-left-sidenav/
│   │   │   │   │   ├── chat-left-sidenav.component.html (1.6 KB)
│   │   │   │   │   ├── chat-left-sidenav.component.scss (0.0 KB)
│   │   │   │   │   └── chat-left-sidenav.component.ts (1.6 KB)
│   │   │   │   ├── app-chats.component.css (0.0 KB)
│   │   │   │   ├── app-chats.component.html (0.5 KB)
│   │   │   │   ├── app-chats.component.ts (1.7 KB)
│   │   │   │   ├── app-chats.module.ts (1.7 KB)
│   │   │   │   ├── app-chats.routing.ts (0.2 KB)
│   │   │   │   └── chat.service.ts (4.4 KB)
│   │   │   ├── app-dialogs/
│   │   │   │   ├── confirm-dialog/
│   │   │   │   │   ├── confirm-dialog.component.css (0.0 KB)
│   │   │   │   │   ├── confirm-dialog.component.html (1.1 KB)
│   │   │   │   │   └── confirm-dialog.component.ts (0.9 KB)
│   │   │   │   ├── loader-dialog/
│   │   │   │   │   ├── loader-dialog.component.css (0.0 KB)
│   │   │   │   │   ├── loader-dialog.component.html (0.9 KB)
│   │   │   │   │   └── loader-dialog.component.ts (0.6 KB)
│   │   │   │   ├── app-dialogs.module.ts (1.0 KB)
│   │   │   │   └── app-dialogs.routing.ts (0.5 KB)
│   │   │   ├── app-inbox/
│   │   │   │   ├── app-inbox.component.css (0.0 KB)
│   │   │   │   ├── app-inbox.component.html (7.5 KB)
│   │   │   │   ├── app-inbox.component.ts (2.1 KB)
│   │   │   │   ├── app-inbox.module.ts (1.8 KB)
│   │   │   │   ├── app-inbox.routing.ts (0.2 KB)
│   │   │   │   ├── app-inbox.service.ts (0.3 KB)
│   │   │   │   ├── mail-compose.component.ts (0.9 KB)
│   │   │   │   └── mail-compose.template.html (2.0 KB)
│   │   │   ├── app-tour/
│   │   │   │   ├── app-tour.component.css (0.0 KB)
│   │   │   │   ├── app-tour.component.html (1.0 KB)
│   │   │   │   ├── app-tour.component.ts (3.1 KB)
│   │   │   │   ├── app-tour.module.ts (0.7 KB)
│   │   │   │   └── app-tour.routing.ts (0.2 KB)
│   │   │   ├── chart-example-view/
│   │   │   │   ├── chart-example-view-routing.module.ts (0.9 KB)
│   │   │   │   ├── chart-example-view.component.html (0.1 KB)
│   │   │   │   ├── chart-example-view.component.ts (0.3 KB)
│   │   │   │   └── chart-example-view.module.ts (0.6 KB)
│   │   │   ├── charts/
│   │   │   │   ├── charts.component.css (0.0 KB)
│   │   │   │   ├── charts.component.html (3.4 KB)
│   │   │   │   ├── charts.component.ts (7.8 KB)
│   │   │   │   ├── charts.module.ts (0.7 KB)
│   │   │   │   └── charts.routing.ts (0.2 KB)
│   │   │   ├── cruds/
│   │   │   │   ├── crud-ngx-table/
│   │   │   │   │   ├── ngx-table-popup/
│   │   │   │   │   │   ├── ngx-table-popup.component.html (2.3 KB)
│   │   │   │   │   │   └── ngx-table-popup.component.ts (1.1 KB)
│   │   │   │   │   ├── crud-ngx-table.component.html (3.2 KB)
│   │   │   │   │   └── crud-ngx-table.component.ts (3.5 KB)
│   │   │   │   ├── crud.service.ts (1.0 KB)
│   │   │   │   ├── cruds.module.ts (2.1 KB)
│   │   │   │   └── cruds.routing.ts (0.3 KB)
│   │   │   ├── dashboard/
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── analytics.component.html (9.1 KB)
│   │   │   │   │   ├── analytics.component.scss (0.0 KB)
│   │   │   │   │   └── analytics.component.ts (16.2 KB)
│   │   │   │   ├── analytics-alt/
│   │   │   │   │   ├── analytics-alt.component.html (8.1 KB)
│   │   │   │   │   ├── analytics-alt.component.scss (0.0 KB)
│   │   │   │   │   └── analytics-alt.component.ts (9.6 KB)
│   │   │   │   ├── cryptocurrency/
│   │   │   │   │   ├── cryptocurrency.component.html (10.6 KB)
│   │   │   │   │   ├── cryptocurrency.component.scss (0.0 KB)
│   │   │   │   │   └── cryptocurrency.component.ts (8.0 KB)
│   │   │   │   ├── learning-management/
│   │   │   │   │   ├── learning-management.component.html (5.8 KB)
│   │   │   │   │   ├── learning-management.component.scss (0.8 KB)
│   │   │   │   │   └── learning-management.component.ts (5.8 KB)
│   │   │   │   ├── dashboard.module.ts (2.4 KB)
│   │   │   │   └── dashboard.routing.ts (1.1 KB)
│   │   │   ├── forms/
│   │   │   │   ├── basic-form/
│   │   │   │   │   ├── basic-form.component.css (0.0 KB)
│   │   │   │   │   ├── basic-form.component.html (7.1 KB)
│   │   │   │   │   └── basic-form.component.ts (1.4 KB)
│   │   │   │   ├── rich-text-editor/
│   │   │   │   │   ├── rich-text-editor.component.css (0.0 KB)
│   │   │   │   │   ├── rich-text-editor.component.html (0.3 KB)
│   │   │   │   │   └── rich-text-editor.component.ts (0.9 KB)
│   │   │   │   ├── wizard/
│   │   │   │   │   ├── wizard.component.css (0.0 KB)
│   │   │   │   │   ├── wizard.component.html (3.5 KB)
│   │   │   │   │   └── wizard.component.ts (0.8 KB)
│   │   │   │   ├── forms.module.ts (1.8 KB)
│   │   │   │   └── forms.routing.ts (0.7 KB)
│   │   │   ├── invoice/
│   │   │   │   ├── invoice-details/
│   │   │   │   │   ├── invoice-details.component.html (9.8 KB)
│   │   │   │   │   ├── invoice-details.component.scss (0.0 KB)
│   │   │   │   │   └── invoice-details.component.ts (4.1 KB)
│   │   │   │   ├── invoice-list/
│   │   │   │   │   ├── invoice-list.component.html (2.2 KB)
│   │   │   │   │   ├── invoice-list.component.scss (0.0 KB)
│   │   │   │   │   └── invoice-list.component.ts (1.5 KB)
│   │   │   │   ├── invoice-routing.module.ts (0.7 KB)
│   │   │   │   ├── invoice.module.ts (0.9 KB)
│   │   │   │   └── invoice.service.ts (1.5 KB)
│   │   │   ├── map/
│   │   │   │   ├── map.component.css (0.0 KB)
│   │   │   │   ├── map.component.html (0.2 KB)
│   │   │   │   ├── map.component.ts (1.0 KB)
│   │   │   │   ├── map.module.ts (0.8 KB)
│   │   │   │   └── map.routing.ts (0.2 KB)
│   │   │   ├── mat-icons/
│   │   │   │   ├── uilib-icons/
│   │   │   │   │   ├── uilib-icons.component.html (0.1 KB)
│   │   │   │   │   ├── uilib-icons.component.scss (0.0 KB)
│   │   │   │   │   └── uilib-icons.component.ts (0.4 KB)
│   │   │   │   ├── mat-icons.component.css (0.0 KB)
│   │   │   │   ├── mat-icons.component.html (0.7 KB)
│   │   │   │   ├── mat-icons.component.ts (14.4 KB)
│   │   │   │   ├── mat-icons.module.ts (0.6 KB)
│   │   │   │   └── mat-icons.routing.ts (0.4 KB)
│   │   │   ├── material-example-view/
│   │   │   │   ├── material-example-view-routing.module.ts (1.0 KB)
│   │   │   │   ├── material-example-view.component.html (0.1 KB)
│   │   │   │   ├── material-example-view.component.ts (0.3 KB)
│   │   │   │   └── material-example-view.module.ts (0.7 KB)
│   │   │   ├── order/
│   │   │   │   ├── order-cost-list/
│   │   │   │   │   ├── order-cost-list.component.html (0.0 KB)
│   │   │   │   │   ├── order-cost-list.component.scss (0.0 KB)
│   │   │   │   │   └── order-cost-list.component.ts (0.3 KB)
│   │   │   │   ├── order-detail/
│   │   │   │   │   ├── order-detail.component.html (0.1 KB)
│   │   │   │   │   ├── order-detail.component.scss (0.0 KB)
│   │   │   │   │   └── order-detail.component.ts (0.3 KB)
│   │   │   │   ├── order-list/
│   │   │   │   │   ├── order-list.component.html (0.1 KB)
│   │   │   │   │   ├── order-list.component.scss (0.0 KB)
│   │   │   │   │   └── order-list.component.ts (0.3 KB)
│   │   │   │   ├── order-routing.module.ts (0.8 KB)
│   │   │   │   ├── order.module.ts (0.7 KB)
│   │   │   │   └── order.service.ts (0.1 KB)
│   │   │   ├── others/
│   │   │   │   ├── app-blank/
│   │   │   │   │   ├── app-blank.component.css (0.0 KB)
│   │   │   │   │   ├── app-blank.component.html (0.1 KB)
│   │   │   │   │   └── app-blank.component.ts (0.3 KB)
│   │   │   │   ├── app-gallery/
│   │   │   │   │   ├── app-gallery.component.css (0.0 KB)
│   │   │   │   │   ├── app-gallery.component.html (1.3 KB)
│   │   │   │   │   └── app-gallery.component.ts (0.8 KB)
│   │   │   │   ├── app-pricing/
│   │   │   │   │   ├── app-pricing.component.css (0.0 KB)
│   │   │   │   │   ├── app-pricing.component.html (4.9 KB)
│   │   │   │   │   └── app-pricing.component.ts (0.3 KB)
│   │   │   │   ├── app-users/
│   │   │   │   │   ├── app-users.component.css (0.0 KB)
│   │   │   │   │   ├── app-users.component.html (1.7 KB)
│   │   │   │   │   └── app-users.component.ts (3.1 KB)
│   │   │   │   ├── nested1/
│   │   │   │   │   ├── nested1.component.html (0.0 KB)
│   │   │   │   │   ├── nested1.component.scss (0.0 KB)
│   │   │   │   │   └── nested1.component.ts (0.3 KB)
│   │   │   │   ├── nested2/
│   │   │   │   │   ├── nested2.component.html (0.0 KB)
│   │   │   │   │   ├── nested2.component.scss (0.0 KB)
│   │   │   │   │   └── nested2.component.ts (0.3 KB)
│   │   │   │   ├── nested3/
│   │   │   │   │   ├── nested3.component.html (0.1 KB)
│   │   │   │   │   ├── nested3.component.scss (0.0 KB)
│   │   │   │   │   └── nested3.component.ts (0.4 KB)
│   │   │   │   ├── others.module.ts (2.3 KB)
│   │   │   │   └── others.routing.ts (1.4 KB)
│   │   │   ├── page-layouts/
│   │   │   │   ├── full-width-card/
│   │   │   │   │   ├── full-width-card.component.html (1.9 KB)
│   │   │   │   │   ├── full-width-card.component.scss (0.0 KB)
│   │   │   │   │   └── full-width-card.component.ts (0.3 KB)
│   │   │   │   ├── full-width-card-tab/
│   │   │   │   │   ├── full-width-card-tab.component.html (3.9 KB)
│   │   │   │   │   ├── full-width-card-tab.component.scss (0.0 KB)
│   │   │   │   │   └── full-width-card-tab.component.ts (0.3 KB)
│   │   │   │   ├── left-sidebar-card/
│   │   │   │   │   ├── left-sidebar-card.component.html (4.8 KB)
│   │   │   │   │   ├── left-sidebar-card.component.scss (0.0 KB)
│   │   │   │   │   └── left-sidebar-card.component.ts (0.3 KB)
│   │   │   │   ├── right-sidebar-card/
│   │   │   │   │   ├── right-sidebar-card.component.html (4.8 KB)
│   │   │   │   │   ├── right-sidebar-card.component.scss (0.0 KB)
│   │   │   │   │   └── right-sidebar-card.component.ts (0.3 KB)
│   │   │   │   ├── page-layouts-routing.module.ts (0.9 KB)
│   │   │   │   └── page-layouts.module.ts (1.2 KB)
│   │   │   ├── profile/
│   │   │   │   ├── profile-blank/
│   │   │   │   │   ├── profile-blank.component.css (0.0 KB)
│   │   │   │   │   ├── profile-blank.component.html (0.0 KB)
│   │   │   │   │   └── profile-blank.component.ts (0.3 KB)
│   │   │   │   ├── profile-overview/
│   │   │   │   │   ├── profile-overview.component.css (0.0 KB)
│   │   │   │   │   ├── profile-overview.component.html (9.4 KB)
│   │   │   │   │   └── profile-overview.component.ts (2.2 KB)
│   │   │   │   ├── profile-settings/
│   │   │   │   │   ├── profile-settings.component.css (0.0 KB)
│   │   │   │   │   ├── profile-settings.component.html (4.9 KB)
│   │   │   │   │   └── profile-settings.component.ts (0.4 KB)
│   │   │   │   ├── profile.component.html (3.3 KB)
│   │   │   │   ├── profile.component.ts (1.3 KB)
│   │   │   │   ├── profile.module.ts (2.2 KB)
│   │   │   │   └── profile.routing.ts (0.9 KB)
│   │   │   ├── search-view/
│   │   │   │   ├── result-page/
│   │   │   │   │   ├── result-page.component.html (0.4 KB)
│   │   │   │   │   ├── result-page.component.scss (0.0 KB)
│   │   │   │   │   └── result-page.component.ts (0.9 KB)
│   │   │   │   ├── country.service.ts (0.4 KB)
│   │   │   │   ├── search-view-routing.module.ts (0.4 KB)
│   │   │   │   └── search-view.module.ts (0.6 KB)
│   │   │   ├── sessions/
│   │   │   │   ├── error/
│   │   │   │   │   ├── error.component.css (0.0 KB)
│   │   │   │   │   ├── error.component.html (1.3 KB)
│   │   │   │   │   └── error.component.ts (0.4 KB)
│   │   │   │   ├── forgot-password/
│   │   │   │   │   ├── forgot-password.component.html (2.6 KB)
│   │   │   │   │   ├── forgot-password.component.scss (0.0 KB)
│   │   │   │   │   └── forgot-password.component.ts (0.8 KB)
│   │   │   │   ├── forgot-password2/
│   │   │   │   │   ├── forgot-password2.component.css (0.3 KB)
│   │   │   │   │   ├── forgot-password2.component.html (1.8 KB)
│   │   │   │   │   └── forgot-password2.component.ts (0.9 KB)
│   │   │   │   ├── lockscreen/
│   │   │   │   │   ├── lockscreen.component.html (2.7 KB)
│   │   │   │   │   ├── lockscreen.component.scss (0.7 KB)
│   │   │   │   │   └── lockscreen.component.ts (0.8 KB)
│   │   │   │   ├── not-found/
│   │   │   │   │   ├── not-found.component.html (1.3 KB)
│   │   │   │   │   ├── not-found.component.scss (0.0 KB)
│   │   │   │   │   └── not-found.component.ts (0.4 KB)
│   │   │   │   ├── signin/
│   │   │   │   │   ├── signin.component.html (4.3 KB)
│   │   │   │   │   ├── signin.component.scss (0.0 KB)
│   │   │   │   │   └── signin.component.ts (2.8 KB)
│   │   │   │   ├── signin2/
│   │   │   │   │   ├── signin2.component.css (0.3 KB)
│   │   │   │   │   ├── signin2.component.html (2.6 KB)
│   │   │   │   │   └── signin2.component.ts (2.7 KB)
│   │   │   │   ├── signin3/
│   │   │   │   │   ├── signin3.component.html (3.1 KB)
│   │   │   │   │   ├── signin3.component.scss (0.0 KB)
│   │   │   │   │   └── signin3.component.ts (1.1 KB)
│   │   │   │   ├── signup/
│   │   │   │   │   ├── signup.component.html (4.7 KB)
│   │   │   │   │   ├── signup.component.scss (0.0 KB)
│   │   │   │   │   └── signup.component.ts (1.2 KB)
│   │   │   │   ├── signup2/
│   │   │   │   │   ├── signup2.component.css (0.3 KB)
│   │   │   │   │   ├── signup2.component.html (3.1 KB)
│   │   │   │   │   └── signup2.component.ts (1.4 KB)
│   │   │   │   ├── signup3/
│   │   │   │   │   ├── signup3.component.html (3.4 KB)
│   │   │   │   │   ├── signup3.component.scss (0.0 KB)
│   │   │   │   │   └── signup3.component.ts (1.1 KB)
│   │   │   │   ├── sessions.module.ts (1.9 KB)
│   │   │   │   └── sessions.routing.ts (2.1 KB)
│   │   │   ├── shop/
│   │   │   │   ├── cart/
│   │   │   │   │   ├── cart.component.html (6.0 KB)
│   │   │   │   │   ├── cart.component.scss (0.0 KB)
│   │   │   │   │   └── cart.component.ts (1.1 KB)
│   │   │   │   ├── checkout/
│   │   │   │   │   ├── checkout.component.html (11.8 KB)
│   │   │   │   │   ├── checkout.component.scss (0.0 KB)
│   │   │   │   │   └── checkout.component.ts (2.7 KB)
│   │   │   │   ├── product-details/
│   │   │   │   │   ├── product-details.component.html (5.5 KB)
│   │   │   │   │   ├── product-details.component.scss (0.0 KB)
│   │   │   │   │   └── product-details.component.ts (2.6 KB)
│   │   │   │   ├── products/
│   │   │   │   │   ├── products.component.html (8.3 KB)
│   │   │   │   │   ├── products.component.scss (0.0 KB)
│   │   │   │   │   └── products.component.ts (3.0 KB)
│   │   │   │   ├── shop.module.ts (2.7 KB)
│   │   │   │   ├── shop.routing.ts (0.8 KB)
│   │   │   │   └── shop.service.ts (4.4 KB)
│   │   │   ├── tables/
│   │   │   │   ├── material-table/
│   │   │   │   │   ├── material-table.component.html (2.0 KB)
│   │   │   │   │   ├── material-table.component.scss (0.0 KB)
│   │   │   │   │   └── material-table.component.ts (1.1 KB)
│   │   │   │   ├── tables.module.ts (0.8 KB)
│   │   │   │   ├── tables.routing.ts (0.3 KB)
│   │   │   │   └── tables.service.ts (16.8 KB)
│   │   │   ├── todo/
│   │   │   │   ├── tag-dialogue/
│   │   │   │   │   ├── tag-dialogue.component.html (0.9 KB)
│   │   │   │   │   ├── tag-dialogue.component.scss (0.0 KB)
│   │   │   │   │   └── tag-dialogue.component.ts (1.3 KB)
│   │   │   │   ├── todo/
│   │   │   │   │   ├── todo.component.html (0.7 KB)
│   │   │   │   │   ├── todo.component.scss (0.0 KB)
│   │   │   │   │   └── todo.component.ts (0.6 KB)
│   │   │   │   ├── todo-details/
│   │   │   │   │   ├── todo-details.component.html (3.9 KB)
│   │   │   │   │   ├── todo-details.component.scss (0.0 KB)
│   │   │   │   │   └── todo-details.component.ts (3.3 KB)
│   │   │   │   ├── todo-list/
│   │   │   │   │   ├── todo-list.component.html (4.1 KB)
│   │   │   │   │   ├── todo-list.component.scss (0.0 KB)
│   │   │   │   │   └── todo-list.component.ts (4.8 KB)
│   │   │   │   ├── todo-routing.module.ts (0.8 KB)
│   │   │   │   ├── todo-search.pipe.ts (0.5 KB)
│   │   │   │   ├── todo.module.ts (2.2 KB)
│   │   │   │   └── todo.service.ts (2.2 KB)
│   │   │   └── utilities/
│   │   │       ├── colors/
│   │   │       │   ├── colors.component.html (3.5 KB)
│   │   │       │   ├── colors.component.scss (0.0 KB)
│   │   │       │   └── colors.component.ts (0.4 KB)
│   │   │       ├── typography/
│   │   │       │   ├── typography.component.html (3.7 KB)
│   │   │       │   ├── typography.component.scss (0.0 KB)
│   │   │       │   └── typography.component.ts (0.3 KB)
│   │   │       ├── utilities-routing.module.ts (0.5 KB)
│   │   │       └── utilities.module.ts (0.7 KB)
│   │   ├── app.component.css (0.0 KB)
│   │   ├── app.component.html (0.0 KB)
│   │   ├── app.component.spec.ts (0.1 KB)
│   │   ├── app.component.ts (1.9 KB)
│   │   ├── app.module.ts (2.4 KB)
│   │   └── app.routing.ts (5.3 KB)
│   ├── assets/
│   │   ├── examples/
│   │   │   ├── chart/
│   │   │   │   ├── echart-bar/
│   │   │   │   │   ├── echart-bar.component.html (0.9 KB)
│   │   │   │   │   ├── echart-bar.component.scss (0.0 KB)
│   │   │   │   │   ├── echart-bar.component.spec.ts (0.6 KB)
│   │   │   │   │   └── echart-bar.component.ts (6.4 KB)
│   │   │   │   ├── echart-heatmap/
│   │   │   │   │   ├── echart-heatmap.component.html (0.6 KB)
│   │   │   │   │   ├── echart-heatmap.component.scss (0.2 KB)
│   │   │   │   │   ├── echart-heatmap.component.spec.ts (0.7 KB)
│   │   │   │   │   └── echart-heatmap.component.ts (14.5 KB)
│   │   │   │   ├── echart-pie/
│   │   │   │   │   ├── echart-pie.component.html (1.1 KB)
│   │   │   │   │   ├── echart-pie.component.scss (0.0 KB)
│   │   │   │   │   ├── echart-pie.component.spec.ts (0.6 KB)
│   │   │   │   │   └── echart-pie.component.ts (9.4 KB)
│   │   │   │   ├── echart-radar/
│   │   │   │   │   ├── echart-radar.component.html (0.6 KB)
│   │   │   │   │   ├── echart-radar.component.scss (0.0 KB)
│   │   │   │   │   ├── echart-radar.component.spec.ts (0.7 KB)
│   │   │   │   │   └── echart-radar.component.ts (10.5 KB)
│   │   │   │   ├── chart-examples.module.ts (1.2 KB)
│   │   │   │   └── index.ts (1.1 KB)
│   │   │   └── material/
│   │   │       ├── accordin-expansion-panel/
│   │   │       │   ├── accordin-expansion-panel.component.html (2.1 KB)
│   │   │       │   ├── accordin-expansion-panel.component.scss (0.3 KB)
│   │   │       │   ├── accordin-expansion-panel.component.spec.ts (0.7 KB)
│   │   │       │   └── accordin-expansion-panel.component.ts (0.5 KB)
│   │   │       ├── align-tab-group/
│   │   │       │   ├── align-tab-group.component.html (0.6 KB)
│   │   │       │   ├── align-tab-group.component.scss (0.0 KB)
│   │   │       │   ├── align-tab-group.component.spec.ts (0.7 KB)
│   │   │       │   └── align-tab-group.component.ts (0.3 KB)
│   │   │       ├── animation-tab-group/
│   │   │       │   ├── animation-tab-group.component.html (0.4 KB)
│   │   │       │   ├── animation-tab-group.component.scss (0.0 KB)
│   │   │       │   ├── animation-tab-group.component.spec.ts (0.7 KB)
│   │   │       │   └── animation-tab-group.component.ts (0.3 KB)
│   │   │       ├── appearance-form-field/
│   │   │       │   ├── appearance-form-field.component.html (1.0 KB)
│   │   │       │   ├── appearance-form-field.component.scss (0.0 KB)
│   │   │       │   ├── appearance-form-field.component.spec.ts (0.7 KB)
│   │   │       │   └── appearance-form-field.component.ts (0.3 KB)
│   │   │       ├── auto-hide-tooltip/
│   │   │       │   ├── auto-hide-tooltip.component.html (0.6 KB)
│   │   │       │   ├── auto-hide-tooltip.component.scss (0.2 KB)
│   │   │       │   ├── auto-hide-tooltip.component.spec.ts (1.3 KB)
│   │   │       │   └── auto-hide-tooltip.component.ts (0.6 KB)
│   │   │       ├── auto-resizing-texarea/
│   │   │       │   ├── auto-resizing-texarea.component.html (0.7 KB)
│   │   │       │   ├── auto-resizing-texarea.component.scss (0.0 KB)
│   │   │       │   ├── auto-resizing-texarea.component.spec.ts (1.2 KB)
│   │   │       │   └── auto-resizing-texarea.component.ts (0.8 KB)
│   │   │       ├── autocomplete-chip/
│   │   │       │   ├── autocomplete-chip.component.html (0.9 KB)
│   │   │       │   ├── autocomplete-chip.component.scss (0.1 KB)
│   │   │       │   ├── autocomplete-chip.component.spec.ts (1.1 KB)
│   │   │       │   └── autocomplete-chip.component.ts (2.3 KB)
│   │   │       ├── autocomplete-overview/
│   │   │       │   ├── autocomplete-overview.component.html (0.7 KB)
│   │   │       │   ├── autocomplete-overview.component.scss (0.3 KB)
│   │   │       │   ├── autocomplete-overview.component.spec.ts (1.2 KB)
│   │   │       │   └── autocomplete-overview.component.ts (1.8 KB)
│   │   │       ├── autoresize-sidenav/
│   │   │       │   ├── autoresize-sidenav.component.html (0.5 KB)
│   │   │       │   ├── autoresize-sidenav.component.scss (0.3 KB)
│   │   │       │   ├── autoresize-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── autoresize-sidenav.component.ts (0.4 KB)
│   │   │       ├── basic-badge/
│   │   │       │   ├── basic-badge.component.html (0.6 KB)
│   │   │       │   ├── basic-badge.component.scss (0.0 KB)
│   │   │       │   ├── basic-badge.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-badge.component.ts (0.3 KB)
│   │   │       ├── basic-bar/
│   │   │       │   ├── basic-bar.component.html (0.1 KB)
│   │   │       │   ├── basic-bar.component.scss (0.0 KB)
│   │   │       │   ├── basic-bar.component.spec.ts (0.6 KB)
│   │   │       │   └── basic-bar.component.ts (0.3 KB)
│   │   │       ├── basic-button-toggle/
│   │   │       │   ├── basic-button-toggle.component.html (0.3 KB)
│   │   │       │   ├── basic-button-toggle.component.scss (0.0 KB)
│   │   │       │   ├── basic-button-toggle.component.spec.ts (0.8 KB)
│   │   │       │   └── basic-button-toggle.component.ts (0.3 KB)
│   │   │       ├── basic-card/
│   │   │       │   ├── basic-card.component.html (0.0 KB)
│   │   │       │   ├── basic-card.component.scss (0.0 KB)
│   │   │       │   ├── basic-card.component.spec.ts (0.6 KB)
│   │   │       │   └── basic-card.component.ts (0.3 KB)
│   │   │       ├── basic-checkbox/
│   │   │       │   ├── basic-checkbox.component.html (0.0 KB)
│   │   │       │   ├── basic-checkbox.component.scss (0.0 KB)
│   │   │       │   ├── basic-checkbox.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-checkbox.component.ts (0.3 KB)
│   │   │       ├── basic-chip/
│   │   │       │   ├── basic-chip.component.html (0.3 KB)
│   │   │       │   ├── basic-chip.component.scss (0.0 KB)
│   │   │       │   ├── basic-chip.component.spec.ts (0.6 KB)
│   │   │       │   └── basic-chip.component.ts (0.3 KB)
│   │   │       ├── basic-datepicker/
│   │   │       │   ├── basic-datepicker.component.html (0.2 KB)
│   │   │       │   ├── basic-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── basic-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-datepicker.component.ts (0.3 KB)
│   │   │       ├── basic-dialog/
│   │   │       │   ├── basic-dialog-overview/
│   │   │       │   │   ├── basic-dialog-overview.component.html (0.4 KB)
│   │   │       │   │   ├── basic-dialog-overview.component.scss (0.0 KB)
│   │   │       │   │   ├── basic-dialog-overview.component.spec.ts (1.4 KB)
│   │   │       │   │   └── basic-dialog-overview.component.ts (0.6 KB)
│   │   │       │   ├── basic-dialog.component.html (0.3 KB)
│   │   │       │   ├── basic-dialog.component.scss (0.0 KB)
│   │   │       │   ├── basic-dialog.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-dialog.component.ts (0.9 KB)
│   │   │       ├── basic-divider/
│   │   │       │   ├── basic-divider.component.html (0.2 KB)
│   │   │       │   ├── basic-divider.component.scss (0.0 KB)
│   │   │       │   ├── basic-divider.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-divider.component.ts (0.3 KB)
│   │   │       ├── basic-expansion-panel/
│   │   │       │   ├── basic-expansion-panel.component.html (0.9 KB)
│   │   │       │   ├── basic-expansion-panel.component.scss (0.0 KB)
│   │   │       │   ├── basic-expansion-panel.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-expansion-panel.component.ts (0.4 KB)
│   │   │       ├── basic-grid/
│   │   │       │   ├── basic-grid.component.html (0.2 KB)
│   │   │       │   ├── basic-grid.component.scss (0.0 KB)
│   │   │       │   ├── basic-grid.component.spec.ts (0.6 KB)
│   │   │       │   └── basic-grid.component.ts (0.3 KB)
│   │   │       ├── basic-icon/
│   │   │       │   ├── basic-icon.component.html (0.1 KB)
│   │   │       │   ├── basic-icon.component.scss (0.0 KB)
│   │   │       │   ├── basic-icon.component.spec.ts (0.6 KB)
│   │   │       │   └── basic-icon.component.ts (0.3 KB)
│   │   │       ├── basic-input/
│   │   │       │   ├── basic-input.component.html (0.3 KB)
│   │   │       │   ├── basic-input.component.scss (0.1 KB)
│   │   │       │   ├── basic-input.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-input.component.ts (0.3 KB)
│   │   │       ├── basic-list/
│   │   │       │   ├── basic-list.component.html (0.2 KB)
│   │   │       │   ├── basic-list.component.scss (0.0 KB)
│   │   │       │   ├── basic-list.component.spec.ts (0.6 KB)
│   │   │       │   └── basic-list.component.ts (0.3 KB)
│   │   │       ├── basic-menu/
│   │   │       │   ├── basic-menu.component.html (0.2 KB)
│   │   │       │   ├── basic-menu.component.scss (0.0 KB)
│   │   │       │   ├── basic-menu.component.spec.ts (0.9 KB)
│   │   │       │   └── basic-menu.component.ts (0.3 KB)
│   │   │       ├── basic-paginator/
│   │   │       │   ├── basic-paginator.component.html (0.1 KB)
│   │   │       │   ├── basic-paginator.component.scss (0.0 KB)
│   │   │       │   ├── basic-paginator.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-paginator.component.ts (0.3 KB)
│   │   │       ├── basic-radio/
│   │   │       │   ├── basic-radio.component.html (0.2 KB)
│   │   │       │   ├── basic-radio.component.scss (0.1 KB)
│   │   │       │   ├── basic-radio.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-radio.component.ts (0.3 KB)
│   │   │       ├── basic-select/
│   │   │       │   ├── basic-select.component.html (0.5 KB)
│   │   │       │   ├── basic-select.component.scss (0.0 KB)
│   │   │       │   ├── basic-select.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-select.component.ts (0.5 KB)
│   │   │       ├── basic-sidenav/
│   │   │       │   ├── basic-sidenav.component.html (0.3 KB)
│   │   │       │   ├── basic-sidenav.component.scss (0.2 KB)
│   │   │       │   ├── basic-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-sidenav.component.ts (0.3 KB)
│   │   │       ├── basic-slider/
│   │   │       │   ├── basic-slider.component.html (0.1 KB)
│   │   │       │   ├── basic-slider.component.scss (0.1 KB)
│   │   │       │   ├── basic-slider.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-slider.component.ts (0.3 KB)
│   │   │       ├── basic-snackbar/
│   │   │       │   ├── basic-snackbar.component.html (0.3 KB)
│   │   │       │   ├── basic-snackbar.component.scss (0.0 KB)
│   │   │       │   ├── basic-snackbar.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-snackbar.component.ts (0.5 KB)
│   │   │       ├── basic-sort-header/
│   │   │       │   ├── basic-sort-header.component.html (0.5 KB)
│   │   │       │   ├── basic-sort-header.component.scss (0.1 KB)
│   │   │       │   ├── basic-sort-header.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-sort-header.component.ts (1.7 KB)
│   │   │       ├── basic-spinner/
│   │   │       │   ├── basic-spinner.component.html (0.0 KB)
│   │   │       │   ├── basic-spinner.component.scss (0.0 KB)
│   │   │       │   ├── basic-spinner.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-spinner.component.ts (0.3 KB)
│   │   │       ├── basic-stepper/
│   │   │       │   ├── basic-stepper.component.html (1.3 KB)
│   │   │       │   ├── basic-stepper.component.scss (0.0 KB)
│   │   │       │   ├── basic-stepper.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-stepper.component.ts (0.7 KB)
│   │   │       ├── basic-tab-group/
│   │   │       │   ├── basic-tab-group.component.html (0.2 KB)
│   │   │       │   ├── basic-tab-group.component.scss (0.0 KB)
│   │   │       │   ├── basic-tab-group.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-tab-group.component.ts (0.3 KB)
│   │   │       ├── basic-table/
│   │   │       │   ├── basic-table.component.html (1.3 KB)
│   │   │       │   ├── basic-table.component.scss (0.1 KB)
│   │   │       │   ├── basic-table.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-table.component.ts (1.4 KB)
│   │   │       ├── basic-toggle/
│   │   │       │   ├── basic-toggle.component.html (0.0 KB)
│   │   │       │   ├── basic-toggle.component.scss (0.0 KB)
│   │   │       │   ├── basic-toggle.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-toggle.component.ts (0.3 KB)
│   │   │       ├── basic-toolbar/
│   │   │       │   ├── basic-toolbar.component.html (0.0 KB)
│   │   │       │   ├── basic-toolbar.component.scss (0.0 KB)
│   │   │       │   ├── basic-toolbar.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-toolbar.component.ts (0.3 KB)
│   │   │       ├── basic-tooltip/
│   │   │       │   ├── basic-tooltip.component.html (0.2 KB)
│   │   │       │   ├── basic-tooltip.component.scss (0.0 KB)
│   │   │       │   ├── basic-tooltip.component.spec.ts (0.7 KB)
│   │   │       │   └── basic-tooltip.component.ts (0.3 KB)
│   │   │       ├── bottom-sheet/
│   │   │       │   ├── bottom-sheet-overview/
│   │   │       │   │   ├── bottom-sheet-overview.component.html (0.7 KB)
│   │   │       │   │   ├── bottom-sheet-overview.component.scss (0.0 KB)
│   │   │       │   │   ├── bottom-sheet-overview.component.spec.ts (1.0 KB)
│   │   │       │   │   └── bottom-sheet-overview.component.ts (0.6 KB)
│   │   │       │   ├── bottom-sheet.component.html (0.1 KB)
│   │   │       │   ├── bottom-sheet.component.scss (0.0 KB)
│   │   │       │   ├── bottom-sheet.component.spec.ts (0.7 KB)
│   │   │       │   └── bottom-sheet.component.ts (0.6 KB)
│   │   │       ├── button-examples/
│   │   │       │   ├── button-examples.component.html (1.6 KB)
│   │   │       │   ├── button-examples.component.scss (0.0 KB)
│   │   │       │   ├── button-examples.component.spec.ts (0.9 KB)
│   │   │       │   └── button-examples.component.ts (0.3 KB)
│   │   │       ├── button-toggle/
│   │   │       │   ├── button-toggle.component.html (0.7 KB)
│   │   │       │   ├── button-toggle.component.scss (0.1 KB)
│   │   │       │   ├── button-toggle.component.spec.ts (0.9 KB)
│   │   │       │   └── button-toggle.component.ts (0.3 KB)
│   │   │       ├── buttons/
│   │   │       │   ├── buttons.component.html (3.1 KB)
│   │   │       │   ├── buttons.component.scss (0.1 KB)
│   │   │       │   ├── buttons.component.spec.ts (0.6 KB)
│   │   │       │   └── buttons.component.ts (0.3 KB)
│   │   │       ├── changing-tooltip/
│   │   │       │   ├── changing-tooltip.component.html (0.3 KB)
│   │   │       │   ├── changing-tooltip.component.scss (0.0 KB)
│   │   │       │   ├── changing-tooltip.component.spec.ts (0.7 KB)
│   │   │       │   └── changing-tooltip.component.ts (0.4 KB)
│   │   │       ├── checkbox-tree/
│   │   │       │   ├── checkbox-tree.component.html (1.4 KB)
│   │   │       │   ├── checkbox-tree.component.scss (0.0 KB)
│   │   │       │   ├── checkbox-tree.component.spec.ts (0.7 KB)
│   │   │       │   └── checkbox-tree.component.ts (7.9 KB)
│   │   │       ├── clear-button-input/
│   │   │       │   ├── clear-button-input.component.html (0.3 KB)
│   │   │       │   ├── clear-button-input.component.scss (0.0 KB)
│   │   │       │   ├── clear-button-input.component.spec.ts (0.7 KB)
│   │   │       │   └── clear-button-input.component.ts (0.4 KB)
│   │   │       ├── configurable-checkbox/
│   │   │       │   ├── configurable-checkbox.component.html (1.3 KB)
│   │   │       │   ├── configurable-checkbox.component.scss (0.2 KB)
│   │   │       │   ├── configurable-checkbox.component.spec.ts (0.7 KB)
│   │   │       │   └── configurable-checkbox.component.ts (0.4 KB)
│   │   │       ├── configurable-sidenav/
│   │   │       │   ├── configurable-sidenav.component.html (1.0 KB)
│   │   │       │   ├── configurable-sidenav.component.scss (0.2 KB)
│   │   │       │   ├── configurable-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── configurable-sidenav.component.ts (0.4 KB)
│   │   │       ├── configurable-toggle/
│   │   │       │   ├── configurable-toggle.component.html (1.2 KB)
│   │   │       │   ├── configurable-toggle.component.scss (0.0 KB)
│   │   │       │   ├── configurable-toggle.component.spec.ts (1.1 KB)
│   │   │       │   └── configurable-toggle.component.ts (0.8 KB)
│   │   │       ├── custom-bar/
│   │   │       │   ├── custom-bar.component.html (2.2 KB)
│   │   │       │   ├── custom-bar.component.scss (0.2 KB)
│   │   │       │   ├── custom-bar.component.spec.ts (0.6 KB)
│   │   │       │   └── custom-bar.component.ts (0.4 KB)
│   │   │       ├── custom-class-tooltip/
│   │   │       │   ├── custom-class-tooltip.component.html (0.2 KB)
│   │   │       │   ├── custom-class-tooltip.component.scss (0.1 KB)
│   │   │       │   ├── custom-class-tooltip.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-class-tooltip.component.ts (0.6 KB)
│   │   │       ├── custom-datepicker/
│   │   │       │   ├── custom-datepicker.component.html (0.2 KB)
│   │   │       │   ├── custom-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── custom-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-datepicker.component.ts (1.6 KB)
│   │   │       ├── custom-loading-buttons/
│   │   │       │   ├── custom-loading-buttons.component.html (0.3 KB)
│   │   │       │   ├── custom-loading-buttons.component.scss (0.0 KB)
│   │   │       │   ├── custom-loading-buttons.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-loading-buttons.component.ts (0.9 KB)
│   │   │       ├── custom-paginator/
│   │   │       │   ├── custom-paginator.component.html (0.7 KB)
│   │   │       │   ├── custom-paginator.component.scss (0.0 KB)
│   │   │       │   ├── custom-paginator.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-paginator.component.ts (0.7 KB)
│   │   │       ├── custom-panel-select/
│   │   │       │   ├── custom-panel-select.component.html (0.3 KB)
│   │   │       │   ├── custom-panel-select.component.scss (0.2 KB)
│   │   │       │   ├── custom-panel-select.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-panel-select.component.ts (0.6 KB)
│   │   │       ├── custom-position-tooltip/
│   │   │       │   ├── custom-position-tooltip.component.html (0.5 KB)
│   │   │       │   ├── custom-position-tooltip.component.scss (0.0 KB)
│   │   │       │   ├── custom-position-tooltip.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-position-tooltip.component.ts (0.6 KB)
│   │   │       ├── custom-ripples/
│   │   │       │   ├── custom-ripples.component.html (0.8 KB)
│   │   │       │   ├── custom-ripples.component.scss (0.5 KB)
│   │   │       │   ├── custom-ripples.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-ripples.component.ts (0.4 KB)
│   │   │       ├── custom-snackbar/
│   │   │       │   ├── custom-snackbar-overview/
│   │   │       │   │   ├── custom-snackbar-overview.component.html (0.1 KB)
│   │   │       │   │   ├── custom-snackbar-overview.component.scss (0.0 KB)
│   │   │       │   │   ├── custom-snackbar-overview.component.spec.ts (0.7 KB)
│   │   │       │   │   └── custom-snackbar-overview.component.ts (0.4 KB)
│   │   │       │   ├── custom-snackbar.component.html (0.3 KB)
│   │   │       │   ├── custom-snackbar.component.scss (0.0 KB)
│   │   │       │   ├── custom-snackbar.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-snackbar.component.ts (0.7 KB)
│   │   │       ├── custom-spinner/
│   │   │       │   ├── custom-spinner.component.html (1.6 KB)
│   │   │       │   ├── custom-spinner.component.scss (0.2 KB)
│   │   │       │   ├── custom-spinner.component.spec.ts (0.7 KB)
│   │   │       │   └── custom-spinner.component.ts (0.4 KB)
│   │   │       ├── custom-tab-group/
│   │   │       │   ├── custom-tab-group.component.html (1.5 KB)
│   │   │       │   ├── custom-tab-group.component.scss (0.1 KB)
│   │   │       │   ├── custom-tab-group.component.spec.ts (1.0 KB)
│   │   │       │   └── custom-tab-group.component.ts (0.3 KB)
│   │   │       ├── customized-stepper/
│   │   │       │   ├── customized-stepper.component.html (1.9 KB)
│   │   │       │   ├── customized-stepper.component.scss (0.0 KB)
│   │   │       │   ├── customized-stepper.component.spec.ts (0.7 KB)
│   │   │       │   └── customized-stepper.component.ts (0.9 KB)
│   │   │       ├── data-dialog/
│   │   │       │   ├── data-dialog-overview/
│   │   │       │   │   ├── data-dialog-overview.component.html (0.4 KB)
│   │   │       │   │   ├── data-dialog-overview.component.scss (0.0 KB)
│   │   │       │   │   ├── data-dialog-overview.component.spec.ts (1.0 KB)
│   │   │       │   │   └── data-dialog-overview.component.ts (0.5 KB)
│   │   │       │   ├── data-dialog.component.html (0.1 KB)
│   │   │       │   ├── data-dialog.component.scss (0.0 KB)
│   │   │       │   ├── data-dialog.component.spec.ts (0.7 KB)
│   │   │       │   └── data-dialog.component.ts (0.7 KB)
│   │   │       ├── delay-tooltip/
│   │   │       │   ├── delay-tooltip.component.html (0.8 KB)
│   │   │       │   ├── delay-tooltip.component.scss (0.1 KB)
│   │   │       │   ├── delay-tooltip.component.spec.ts (0.7 KB)
│   │   │       │   └── delay-tooltip.component.ts (0.5 KB)
│   │   │       ├── different-locale-datepicker/
│   │   │       │   ├── different-locale-datepicker.component.html (0.3 KB)
│   │   │       │   ├── different-locale-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── different-locale-datepicker.component.spec.ts (0.8 KB)
│   │   │       │   └── different-locale-datepicker.component.ts (1.3 KB)
│   │   │       ├── disabled-datepicker/
│   │   │       │   ├── disabled-datepicker.component.html (0.7 KB)
│   │   │       │   ├── disabled-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── disabled-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── disabled-datepicker.component.ts (0.3 KB)
│   │   │       ├── disabled-select/
│   │   │       │   ├── disabled-select.component.html (0.8 KB)
│   │   │       │   ├── disabled-select.component.scss (0.0 KB)
│   │   │       │   ├── disabled-select.component.spec.ts (0.7 KB)
│   │   │       │   └── disabled-select.component.ts (0.4 KB)
│   │   │       ├── disabled-tooltip/
│   │   │       │   ├── disabled-tooltip.component.html (0.3 KB)
│   │   │       │   ├── disabled-tooltip.component.scss (0.1 KB)
│   │   │       │   ├── disabled-tooltip.component.spec.ts (0.7 KB)
│   │   │       │   └── disabled-tooltip.component.ts (0.4 KB)
│   │   │       ├── display-value-autocomplete/
│   │   │       │   ├── display-value-autocomplete.component.html (0.4 KB)
│   │   │       │   ├── display-value-autocomplete.component.scss (0.1 KB)
│   │   │       │   ├── display-value-autocomplete.component.spec.ts (1.3 KB)
│   │   │       │   └── display-value-autocomplete.component.ts (1.2 KB)
│   │   │       ├── drawer-sidenav/
│   │   │       │   ├── drawer-sidenav.component.html (0.3 KB)
│   │   │       │   ├── drawer-sidenav.component.scss (0.1 KB)
│   │   │       │   ├── drawer-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── drawer-sidenav.component.ts (0.3 KB)
│   │   │       ├── dynamic-data-tree/
│   │   │       │   ├── dynamic-data-tree.component.html (0.8 KB)
│   │   │       │   ├── dynamic-data-tree.component.scss (0.1 KB)
│   │   │       │   ├── dynamic-data-tree.component.spec.ts (0.7 KB)
│   │   │       │   └── dynamic-data-tree.component.ts (4.5 KB)
│   │   │       ├── dynamic-grid/
│   │   │       │   ├── dynamic-grid.component.html (0.2 KB)
│   │   │       │   ├── dynamic-grid.component.scss (0.0 KB)
│   │   │       │   ├── dynamic-grid.component.spec.ts (0.7 KB)
│   │   │       │   └── dynamic-grid.component.ts (0.7 KB)
│   │   │       ├── dynamic-tab-group/
│   │   │       │   ├── dynamic-tab-group.component.html (0.9 KB)
│   │   │       │   ├── dynamic-tab-group.component.scss (0.1 KB)
│   │   │       │   ├── dynamic-tab-group.component.spec.ts (0.7 KB)
│   │   │       │   └── dynamic-tab-group.component.ts (0.7 KB)
│   │   │       ├── error-form-field/
│   │   │       │   ├── error-form-field.component.html (0.2 KB)
│   │   │       │   ├── error-form-field.component.scss (0.1 KB)
│   │   │       │   ├── error-form-field.component.spec.ts (0.7 KB)
│   │   │       │   └── error-form-field.component.ts (0.6 KB)
│   │   │       ├── error-input/
│   │   │       │   ├── error-input.component.html (0.5 KB)
│   │   │       │   ├── error-input.component.scss (0.1 KB)
│   │   │       │   ├── error-input.component.spec.ts (0.7 KB)
│   │   │       │   └── error-input.component.ts (1.0 KB)
│   │   │       ├── error-message-input/
│   │   │       │   ├── error-message-input.component.html (0.4 KB)
│   │   │       │   ├── error-message-input.component.scss (0.1 KB)
│   │   │       │   ├── error-message-input.component.spec.ts (0.7 KB)
│   │   │       │   └── error-message-input.component.ts (0.5 KB)
│   │   │       ├── error-select/
│   │   │       │   ├── error-select.component.html (1.2 KB)
│   │   │       │   ├── error-select.component.scss (0.0 KB)
│   │   │       │   ├── error-select.component.spec.ts (0.7 KB)
│   │   │       │   └── error-select.component.ts (1.2 KB)
│   │   │       ├── error-stepper/
│   │   │       │   ├── error-stepper.component.html (1.2 KB)
│   │   │       │   ├── error-stepper.component.scss (0.0 KB)
│   │   │       │   ├── error-stepper.component.spec.ts (0.7 KB)
│   │   │       │   └── error-stepper.component.ts (0.9 KB)
│   │   │       ├── escape-backdrop-sidenav/
│   │   │       │   ├── escape-backdrop-sidenav.component.html (0.4 KB)
│   │   │       │   ├── escape-backdrop-sidenav.component.scss (0.1 KB)
│   │   │       │   ├── escape-backdrop-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── escape-backdrop-sidenav.component.ts (0.6 KB)
│   │   │       ├── event-datepicker/
│   │   │       │   ├── event-datepicker.component.html (0.4 KB)
│   │   │       │   ├── event-datepicker.component.scss (0.1 KB)
│   │   │       │   ├── event-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── event-datepicker.component.ts (0.6 KB)
│   │   │       ├── feature-select/
│   │   │       │   ├── feature-select.component.html (1.0 KB)
│   │   │       │   ├── feature-select.component.scss (0.0 KB)
│   │   │       │   ├── feature-select.component.spec.ts (0.7 KB)
│   │   │       │   └── feature-select.component.ts (0.8 KB)
│   │   │       ├── filter-autocomplete/
│   │   │       │   ├── filter-autocomplete.component.html (0.4 KB)
│   │   │       │   ├── filter-autocomplete.component.scss (0.1 KB)
│   │   │       │   ├── filter-autocomplete.component.spec.ts (1.2 KB)
│   │   │       │   └── filter-autocomplete.component.ts (0.9 KB)
│   │   │       ├── filter-datepicker/
│   │   │       │   ├── filter-datepicker.component.html (0.3 KB)
│   │   │       │   ├── filter-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── filter-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── filter-datepicker.component.ts (0.5 KB)
│   │   │       ├── filter-table/
│   │   │       │   ├── filter-table.component.html (1.1 KB)
│   │   │       │   ├── filter-table.component.scss (0.1 KB)
│   │   │       │   ├── filter-table.component.spec.ts (0.7 KB)
│   │   │       │   └── filter-table.component.ts (1.4 KB)
│   │   │       ├── fixed-sidenav/
│   │   │       │   ├── fixed-sidenav.component.html (1.2 KB)
│   │   │       │   ├── fixed-sidenav.component.scss (0.4 KB)
│   │   │       │   ├── fixed-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── fixed-sidenav.component.ts (0.5 KB)
│   │   │       ├── flat-tree/
│   │   │       │   ├── flat-tree.component.html (0.8 KB)
│   │   │       │   ├── flat-tree.component.scss (0.0 KB)
│   │   │       │   ├── flat-tree.component.spec.ts (0.6 KB)
│   │   │       │   └── flat-tree.component.ts (1.8 KB)
│   │   │       ├── footer-table/
│   │   │       │   ├── footer-table.component.html (0.8 KB)
│   │   │       │   ├── footer-table.component.scss (0.1 KB)
│   │   │       │   ├── footer-table.component.spec.ts (0.7 KB)
│   │   │       │   └── footer-table.component.ts (0.8 KB)
│   │   │       ├── form-input/
│   │   │       │   ├── form-input.component.html (1.4 KB)
│   │   │       │   ├── form-input.component.scss (0.2 KB)
│   │   │       │   ├── form-input.component.spec.ts (0.6 KB)
│   │   │       │   └── form-input.component.ts (0.3 KB)
│   │   │       ├── form-select/
│   │   │       │   ├── form-select.component.html (0.7 KB)
│   │   │       │   ├── form-select.component.scss (0.0 KB)
│   │   │       │   ├── form-select.component.spec.ts (0.7 KB)
│   │   │       │   └── form-select.component.ts (0.8 KB)
│   │   │       ├── highlight-first-autocomplete/
│   │   │       │   ├── highlight-first-autocomplete.component.html (0.4 KB)
│   │   │       │   ├── highlight-first-autocomplete.component.scss (0.1 KB)
│   │   │       │   ├── highlight-first-autocomplete.component.spec.ts (1.3 KB)
│   │   │       │   └── highlight-first-autocomplete.component.ts (0.9 KB)
│   │   │       ├── hints-form-field/
│   │   │       │   ├── hints-form-field.component.html (0.5 KB)
│   │   │       │   ├── hints-form-field.component.scss (0.1 KB)
│   │   │       │   ├── hints-form-field.component.spec.ts (0.7 KB)
│   │   │       │   └── hints-form-field.component.ts (0.3 KB)
│   │   │       ├── hints-input/
│   │   │       │   ├── hints-input.component.html (0.3 KB)
│   │   │       │   ├── hints-input.component.scss (0.1 KB)
│   │   │       │   ├── hints-input.component.spec.ts (0.7 KB)
│   │   │       │   └── hints-input.component.ts (0.3 KB)
│   │   │       ├── icon-menu/
│   │   │       │   ├── icon-menu.component.html (0.5 KB)
│   │   │       │   ├── icon-menu.component.scss (0.0 KB)
│   │   │       │   ├── icon-menu.component.spec.ts (0.9 KB)
│   │   │       │   └── icon-menu.component.ts (0.3 KB)
│   │   │       ├── indeterminate-bar/
│   │   │       │   ├── indeterminate-bar.component.html (0.1 KB)
│   │   │       │   ├── indeterminate-bar.component.scss (0.0 KB)
│   │   │       │   ├── indeterminate-bar.component.spec.ts (0.7 KB)
│   │   │       │   └── indeterminate-bar.component.ts (0.3 KB)
│   │   │       ├── input-chip/
│   │   │       │   ├── input-chip.component.html (0.6 KB)
│   │   │       │   ├── input-chip.component.scss (0.1 KB)
│   │   │       │   ├── input-chip.component.spec.ts (0.6 KB)
│   │   │       │   └── input-chip.component.ts (1.0 KB)
│   │   │       ├── label-form-field/
│   │   │       │   ├── label-form-field.component.html (1.3 KB)
│   │   │       │   ├── label-form-field.component.scss (0.3 KB)
│   │   │       │   ├── label-form-field.component.spec.ts (0.7 KB)
│   │   │       │   └── label-form-field.component.ts (0.5 KB)
│   │   │       ├── manual-hide-tooltip/
│   │   │       │   ├── manual-hide-tooltip.component.html (0.9 KB)
│   │   │       │   ├── manual-hide-tooltip.component.scss (0.1 KB)
│   │   │       │   ├── manual-hide-tooltip.component.spec.ts (1.0 KB)
│   │   │       │   └── manual-hide-tooltip.component.ts (0.3 KB)
│   │   │       ├── min-max-datepicker/
│   │   │       │   ├── min-max-datepicker.component.html (0.3 KB)
│   │   │       │   ├── min-max-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── min-max-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── min-max-datepicker.component.ts (0.4 KB)
│   │   │       ├── moment-js-datepicker/
│   │   │       │   ├── moment-js-datepicker.component.html (0.2 KB)
│   │   │       │   ├── moment-js-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── moment-js-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── moment-js-datepicker.component.ts (1.5 KB)
│   │   │       ├── multi-row-toolbar/
│   │   │       │   ├── multi-row-toolbar.component.html (0.7 KB)
│   │   │       │   ├── multi-row-toolbar.component.scss (0.1 KB)
│   │   │       │   ├── multi-row-toolbar.component.spec.ts (0.7 KB)
│   │   │       │   └── multi-row-toolbar.component.ts (0.3 KB)
│   │   │       ├── multi-section-card/
│   │   │       │   ├── multi-section-card.component.html (0.7 KB)
│   │   │       │   ├── multi-section-card.component.scss (0.2 KB)
│   │   │       │   ├── multi-section-card.component.spec.ts (0.7 KB)
│   │   │       │   └── multi-section-card.component.ts (0.3 KB)
│   │   │       ├── multiple-select/
│   │   │       │   ├── multiple-select.component.html (0.3 KB)
│   │   │       │   ├── multiple-select.component.scss (0.0 KB)
│   │   │       │   ├── multiple-select.component.spec.ts (0.7 KB)
│   │   │       │   └── multiple-select.component.ts (0.5 KB)
│   │   │       ├── nav-tab-group/
│   │   │       │   ├── nav-tab-group.component.html (0.4 KB)
│   │   │       │   ├── nav-tab-group.component.scss (0.1 KB)
│   │   │       │   ├── nav-tab-group.component.spec.ts (0.7 KB)
│   │   │       │   └── nav-tab-group.component.ts (0.5 KB)
│   │   │       ├── nested-menu/
│   │   │       │   ├── nested-menu.component.html (1.8 KB)
│   │   │       │   ├── nested-menu.component.scss (0.0 KB)
│   │   │       │   ├── nested-menu.component.spec.ts (0.9 KB)
│   │   │       │   └── nested-menu.component.ts (0.3 KB)
│   │   │       ├── nested-tree/
│   │   │       │   ├── nested-tree.component.html (1.1 KB)
│   │   │       │   ├── nested-tree.component.scss (0.2 KB)
│   │   │       │   ├── nested-tree.component.spec.ts (0.7 KB)
│   │   │       │   └── nested-tree.component.ts (1.3 KB)
│   │   │       ├── ngmodel-radio/
│   │   │       │   ├── ngmodel-radio.component.html (0.4 KB)
│   │   │       │   ├── ngmodel-radio.component.scss (0.1 KB)
│   │   │       │   ├── ngmodel-radio.component.spec.ts (0.7 KB)
│   │   │       │   └── ngmodel-radio.component.ts (0.4 KB)
│   │   │       ├── open-close-sidenav/
│   │   │       │   ├── open-close-sidenav.component.html (0.6 KB)
│   │   │       │   ├── open-close-sidenav.component.scss (0.2 KB)
│   │   │       │   ├── open-close-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── open-close-sidenav.component.ts (0.4 KB)
│   │   │       ├── open-method-datepicker/
│   │   │       │   ├── open-method-datepicker.component.html (0.2 KB)
│   │   │       │   ├── open-method-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── open-method-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── open-method-datepicker.component.ts (0.4 KB)
│   │   │       ├── option-group-autocomplete/
│   │   │       │   ├── option-group-autocomplete.component.html (0.5 KB)
│   │   │       │   ├── option-group-autocomplete.component.scss (0.0 KB)
│   │   │       │   ├── option-group-autocomplete.component.spec.ts (1.3 KB)
│   │   │       │   └── option-group-autocomplete.component.ts (2.7 KB)
│   │   │       ├── option-group-select/
│   │   │       │   ├── option-group-select.component.html (0.9 KB)
│   │   │       │   ├── option-group-select.component.scss (0.0 KB)
│   │   │       │   ├── option-group-select.component.spec.ts (0.7 KB)
│   │   │       │   └── option-group-select.component.ts (1.4 KB)
│   │   │       ├── pagination-table/
│   │   │       │   ├── pagination-table.component.html (1.1 KB)
│   │   │       │   ├── pagination-table.component.scss (0.0 KB)
│   │   │       │   ├── pagination-table.component.spec.ts (0.7 KB)
│   │   │       │   └── pagination-table.component.ts (2.1 KB)
│   │   │       ├── prefix-suffix-form-field/
│   │   │       │   ├── prefix-suffix-form-field.component.html (0.6 KB)
│   │   │       │   ├── prefix-suffix-form-field.component.scss (0.4 KB)
│   │   │       │   ├── prefix-suffix-form-field.component.spec.ts (0.7 KB)
│   │   │       │   └── prefix-suffix-form-field.component.ts (0.4 KB)
│   │   │       ├── reset-select/
│   │   │       │   ├── reset-select.component.html (0.6 KB)
│   │   │       │   ├── reset-select.component.scss (0.0 KB)
│   │   │       │   ├── reset-select.component.spec.ts (0.7 KB)
│   │   │       │   └── reset-select.component.ts (1.0 KB)
│   │   │       ├── responsive-sidenav/
│   │   │       │   ├── responsive-sidenav.component.html (0.8 KB)
│   │   │       │   ├── responsive-sidenav.component.scss (0.9 KB)
│   │   │       │   ├── responsive-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── responsive-sidenav.component.ts (0.9 KB)
│   │   │       ├── rippleless-select/
│   │   │       │   ├── rippleless-select.component.html (0.3 KB)
│   │   │       │   ├── rippleless-select.component.scss (0.0 KB)
│   │   │       │   ├── rippleless-select.component.spec.ts (0.7 KB)
│   │   │       │   └── rippleless-select.component.ts (0.3 KB)
│   │   │       ├── scrollable-dialog/
│   │   │       │   ├── scrollable-dialog-overview/
│   │   │       │   │   ├── scrollable-dialog-overview.component.html (3.6 KB)
│   │   │       │   │   ├── scrollable-dialog-overview.component.scss (0.0 KB)
│   │   │       │   │   ├── scrollable-dialog-overview.component.spec.ts (0.8 KB)
│   │   │       │   │   └── scrollable-dialog-overview.component.ts (0.4 KB)
│   │   │       │   ├── scrollable-dialog.component.html (0.1 KB)
│   │   │       │   ├── scrollable-dialog.component.scss (0.0 KB)
│   │   │       │   ├── scrollable-dialog.component.spec.ts (0.7 KB)
│   │   │       │   └── scrollable-dialog.component.ts (0.7 KB)
│   │   │       ├── section-list/
│   │   │       │   ├── section-list.component.html (0.5 KB)
│   │   │       │   ├── section-list.component.scss (0.1 KB)
│   │   │       │   ├── section-list.component.spec.ts (0.7 KB)
│   │   │       │   └── section-list.component.ts (0.8 KB)
│   │   │       ├── selected-value-datepicker/
│   │   │       │   ├── selected-value-datepicker.component.html (0.8 KB)
│   │   │       │   ├── selected-value-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── selected-value-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── selected-value-datepicker.component.ts (0.5 KB)
│   │   │       ├── selection-table/
│   │   │       │   ├── selection-table.component.html (1.8 KB)
│   │   │       │   ├── selection-table.component.scss (0.0 KB)
│   │   │       │   ├── selection-table.component.spec.ts (0.7 KB)
│   │   │       │   └── selection-table.component.ts (2.1 KB)
│   │   │       ├── simple-autocomplete/
│   │   │       │   ├── simple-autocomplete.component.html (0.4 KB)
│   │   │       │   ├── simple-autocomplete.component.scss (0.1 KB)
│   │   │       │   ├── simple-autocomplete.component.spec.ts (1.2 KB)
│   │   │       │   └── simple-autocomplete.component.ts (0.5 KB)
│   │   │       ├── simple-form-field/
│   │   │       │   ├── simple-form-field.component.html (0.4 KB)
│   │   │       │   ├── simple-form-field.component.scss (0.1 KB)
│   │   │       │   ├── simple-form-field.component.spec.ts (0.7 KB)
│   │   │       │   └── simple-form-field.component.ts (0.3 KB)
│   │   │       ├── slider/
│   │   │       │   ├── slider.component.html (2.1 KB)
│   │   │       │   ├── slider.component.scss (0.3 KB)
│   │   │       │   ├── slider.component.spec.ts (0.6 KB)
│   │   │       │   └── slider.component.ts (0.8 KB)
│   │   │       ├── sorting-table/
│   │   │       │   ├── sorting-table.component.html (1.1 KB)
│   │   │       │   ├── sorting-table.component.scss (0.1 KB)
│   │   │       │   ├── sorting-table.component.spec.ts (0.7 KB)
│   │   │       │   └── sorting-table.component.ts (1.4 KB)
│   │   │       ├── stacked-chip/
│   │   │       │   ├── stacked-chip.component.html (0.2 KB)
│   │   │       │   ├── stacked-chip.component.scss (0.0 KB)
│   │   │       │   ├── stacked-chip.component.spec.ts (0.7 KB)
│   │   │       │   └── stacked-chip.component.ts (0.6 KB)
│   │   │       ├── start-date-datepicker/
│   │   │       │   ├── start-date-datepicker.component.html (0.3 KB)
│   │   │       │   ├── start-date-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── start-date-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── start-date-datepicker.component.ts (0.4 KB)
│   │   │       ├── sticky-column-table/
│   │   │       │   ├── sticky-column-table.component.html (1.3 KB)
│   │   │       │   ├── sticky-column-table.component.scss (0.4 KB)
│   │   │       │   ├── sticky-column-table.component.spec.ts (0.7 KB)
│   │   │       │   └── sticky-column-table.component.ts (1.3 KB)
│   │   │       ├── sticky-footer-table/
│   │   │       │   ├── sticky-footer-table.component.html (0.9 KB)
│   │   │       │   ├── sticky-footer-table.component.scss (0.2 KB)
│   │   │       │   ├── sticky-footer-table.component.spec.ts (0.7 KB)
│   │   │       │   └── sticky-footer-table.component.ts (0.8 KB)
│   │   │       ├── sticky-header-table/
│   │   │       │   ├── sticky-header-table.component.html (1.1 KB)
│   │   │       │   ├── sticky-header-table.component.scss (0.1 KB)
│   │   │       │   ├── sticky-header-table.component.spec.ts (0.7 KB)
│   │   │       │   └── sticky-header-table.component.ts (1.2 KB)
│   │   │       ├── suffix-prefix-input/
│   │   │       │   ├── suffix-prefix-input.component.html (0.2 KB)
│   │   │       │   ├── suffix-prefix-input.component.scss (0.1 KB)
│   │   │       │   ├── suffix-prefix-input.component.spec.ts (0.7 KB)
│   │   │       │   └── suffix-prefix-input.component.ts (0.3 KB)
│   │   │       ├── svg-icon/
│   │   │       │   ├── svg-icon.component.html (0.1 KB)
│   │   │       │   ├── svg-icon.component.scss (0.0 KB)
│   │   │       │   ├── svg-icon.component.spec.ts (0.6 KB)
│   │   │       │   └── svg-icon.component.ts (0.6 KB)
│   │   │       ├── table-sorting/
│   │   │       │   ├── table-sorting.component.html (1.1 KB)
│   │   │       │   ├── table-sorting.component.scss (0.1 KB)
│   │   │       │   ├── table-sorting.component.spec.ts (0.7 KB)
│   │   │       │   └── table-sorting.component.ts (1.4 KB)
│   │   │       ├── theming-form-field/
│   │   │       │   ├── theming-form-field.component.html (0.6 KB)
│   │   │       │   ├── theming-form-field.component.scss (0.1 KB)
│   │   │       │   ├── theming-form-field.component.spec.ts (0.7 KB)
│   │   │       │   └── theming-form-field.component.ts (0.6 KB)
│   │   │       ├── touch-datepicker/
│   │   │       │   ├── touch-datepicker.component.html (0.3 KB)
│   │   │       │   ├── touch-datepicker.component.scss (0.0 KB)
│   │   │       │   ├── touch-datepicker.component.spec.ts (0.7 KB)
│   │   │       │   └── touch-datepicker.component.ts (0.3 KB)
│   │   │       ├── trigger-select/
│   │   │       │   ├── trigger-select.component.html (0.5 KB)
│   │   │       │   ├── trigger-select.component.scss (0.1 KB)
│   │   │       │   ├── trigger-select.component.spec.ts (0.7 KB)
│   │   │       │   └── trigger-select.component.ts (0.5 KB)
│   │   │       ├── two-sidenav/
│   │   │       │   ├── two-sidenav.component.html (0.2 KB)
│   │   │       │   ├── two-sidenav.component.scss (0.1 KB)
│   │   │       │   ├── two-sidenav.component.spec.ts (0.7 KB)
│   │   │       │   └── two-sidenav.component.ts (0.3 KB)
│   │   │       ├── two-way-binding-select/
│   │   │       │   ├── two-way-binding-select.component.html (0.4 KB)
│   │   │       │   ├── two-way-binding-select.component.scss (0.0 KB)
│   │   │       │   ├── two-way-binding-select.component.spec.ts (0.7 KB)
│   │   │       │   └── two-way-binding-select.component.ts (0.4 KB)
│   │   │       ├── vertical-stepper/
│   │   │       │   ├── vertical-stepper.component.html (1.3 KB)
│   │   │       │   ├── vertical-stepper.component.scss (0.0 KB)
│   │   │       │   ├── vertical-stepper.component.spec.ts (0.7 KB)
│   │   │       │   └── vertical-stepper.component.ts (0.7 KB)
│   │   │       ├── index.ts (34.2 KB)
│   │   │       └── material-examples.module.ts (0.8 KB)
│   │   ├── i18n/
│   │   │   ├── en.json (1.6 KB)
│   │   │   └── es.json (1.7 KB)
│   │   ├── images/
│   │   │   ├── avatars/
│   │   │   │   ├── 001-man.svg (3.6 KB)
│   │   │   │   ├── 002-woman.svg (4.1 KB)
│   │   │   │   ├── 003-man-1.svg (4.8 KB)
│   │   │   │   ├── 004-bald.svg (3.3 KB)
│   │   │   │   ├── 005-man-2.svg (3.8 KB)
│   │   │   │   ├── 006-woman-1.svg (4.2 KB)
│   │   │   │   └── 007-woman-2.svg (3.6 KB)
│   │   │   ├── backgrounds/
│   │   │   │   ├── card-coffee-cup.jpg (116.5 KB)
│   │   │   │   ├── fancy-twilight.jpg (133.0 KB)
│   │   │   │   ├── sea-twilight.jpg (87.6 KB)
│   │   │   │   ├── signin.webp (85.7 KB)
│   │   │   │   ├── trianglify-1.png (62.0 KB)
│   │   │   │   ├── trianglify-2.png (62.3 KB)
│   │   │   │   ├── trianglify-3.png (133.5 KB)
│   │   │   │   ├── trianglify-4.png (138.4 KB)
│   │   │   │   └── waterfall.jpg (206.4 KB)
│   │   │   ├── browsers/
│   │   │   │   ├── license/
│   │   │   │   │   └── license.html (319.5 KB)
│   │   │   │   ├── android.svg (12.3 KB)
│   │   │   │   ├── apple.svg (1.0 KB)
│   │   │   │   ├── chrome.svg (2.2 KB)
│   │   │   │   ├── explorer.svg (1.4 KB)
│   │   │   │   ├── linux.svg (11.4 KB)
│   │   │   │   ├── mozilla.svg (6.4 KB)
│   │   │   │   ├── netscape.svg (1.6 KB)
│   │   │   │   ├── opera.svg (1.4 KB)
│   │   │   │   ├── safari.svg (2.1 KB)
│   │   │   │   └── windows.svg (1.3 KB)
│   │   │   ├── cryptocurrencies/
│   │   │   │   ├── ADA.png (3.4 KB)
│   │   │   │   ├── ADX.png (9.1 KB)
│   │   │   │   ├── AE.png (13.2 KB)
│   │   │   │   ├── ARDR.png (13.5 KB)
│   │   │   │   ├── ARK.png (13.2 KB)
│   │   │   │   ├── BAT.png (13.5 KB)
│   │   │   │   ├── BCC.png (9.1 KB)
│   │   │   │   ├── BCH.png (12.9 KB)
│   │   │   │   ├── BCN.png (8.1 KB)
│   │   │   │   ├── BLOCK.png (9.7 KB)
│   │   │   │   ├── BNB.png (11.5 KB)
│   │   │   │   ├── BNT.png (9.7 KB)
│   │   │   │   ├── BTC.png (12.9 KB)
│   │   │   │   ├── BTCD.png (9.4 KB)
│   │   │   │   ├── BTG.png (21.8 KB)
│   │   │   │   ├── BTM.png (18.3 KB)
│   │   │   │   ├── BTS.png (3.0 KB)
│   │   │   │   ├── CNX.png (14.4 KB)
│   │   │   │   ├── CVC.png (10.5 KB)
│   │   │   │   ├── DASH.png (3.1 KB)
│   │   │   │   ├── DCR.png (9.6 KB)
│   │   │   │   ├── DGB.png (16.9 KB)
│   │   │   │   ├── DGD.png (4.9 KB)
│   │   │   │   ├── DOGE.png (9.9 KB)
│   │   │   │   ├── EDG.png (14.6 KB)
│   │   │   │   ├── EMC2.png (10.7 KB)
│   │   │   │   ├── EOS.png (12.2 KB)
│   │   │   │   ├── ETC.png (14.9 KB)
│   │   │   │   ├── ETH.png (12.5 KB)
│   │   │   │   ├── ETHOS.png (11.3 KB)
│   │   │   │   ├── ETP.png (12.0 KB)
│   │   │   │   ├── FCT.png (27.5 KB)
│   │   │   │   ├── FUN.png (16.3 KB)
│   │   │   │   ├── GAME.png (8.9 KB)
│   │   │   │   ├── GAS.png (9.8 KB)
│   │   │   │   ├── GBYTE.png (9.2 KB)
│   │   │   │   ├── GNO.png (11.2 KB)
│   │   │   │   ├── GNT.png (10.2 KB)
│   │   │   │   ├── GRS.png (14.5 KB)
│   │   │   │   ├── GXS.png (10.1 KB)
│   │   │   │   ├── HSR.png (10.5 KB)
│   │   │   │   ├── ICN.png (6.2 KB)
│   │   │   │   ├── IOT.png (10.2 KB)
│   │   │   │   ├── KMD.png (10.8 KB)
│   │   │   │   ├── KNC.png (14.8 KB)
│   │   │   │   ├── LSK.png (17.0 KB)
│   │   │   │   ├── LTC.png (2.8 KB)
│   │   │   │   ├── MAID.png (9.8 KB)
│   │   │   │   ├── MCO.png (11.4 KB)
│   │   │   │   ├── MNX.png (9.3 KB)
│   │   │   │   ├── MONA.png (8.9 KB)
│   │   │   │   ├── MTL.png (5.6 KB)
│   │   │   │   ├── NAV.png (11.7 KB)
│   │   │   │   ├── NEO.png (3.1 KB)
│   │   │   │   ├── NXS.png (25.2 KB)
│   │   │   │   ├── NXT.png (7.8 KB)
│   │   │   │   ├── OMG.png (10.1 KB)
│   │   │   │   ├── PAY.png (7.3 KB)
│   │   │   │   ├── PIVX.png (11.4 KB)
│   │   │   │   ├── POT.png (8.5 KB)
│   │   │   │   ├── POWER.png (24.9 KB)
│   │   │   │   ├── PPC.png (9.5 KB)
│   │   │   │   ├── PPT.png (8.7 KB)
│   │   │   │   ├── PURA.png (7.7 KB)
│   │   │   │   ├── QASH.png (17.3 KB)
│   │   │   │   ├── QTUM.png (23.0 KB)
│   │   │   │   ├── RDN.png (8.5 KB)
│   │   │   │   ├── REP.png (14.1 KB)
│   │   │   │   ├── SALT.png (8.8 KB)
│   │   │   │   ├── SAN.png (9.4 KB)
│   │   │   │   ├── SC.png (11.6 KB)
│   │   │   │   ├── SKY.png (12.9 KB)
│   │   │   │   ├── SNGLS.png (10.9 KB)
│   │   │   │   ├── SNT.png (8.3 KB)
│   │   │   │   ├── START.png (17.1 KB)
│   │   │   │   ├── STEEM.png (13.6 KB)
│   │   │   │   ├── STORJ.png (13.1 KB)
│   │   │   │   ├── SYS.png (11.0 KB)
│   │   │   │   ├── TRX.png (3.2 KB)
│   │   │   │   ├── UBQ.png (5.6 KB)
│   │   │   │   ├── USDT.png (10.5 KB)
│   │   │   │   ├── VEN.png (13.7 KB)
│   │   │   │   ├── VTC.png (6.6 KB)
│   │   │   │   ├── WAVES.png (10.1 KB)
│   │   │   │   ├── WTC.png (11.6 KB)
│   │   │   │   ├── XEM.png (9.4 KB)
│   │   │   │   ├── XLM.png (3.0 KB)
│   │   │   │   ├── XMR.png (11.0 KB)
│   │   │   │   ├── XRP.png (3.2 KB)
│   │   │   │   ├── XUC.png (31.4 KB)
│   │   │   │   ├── XVG.png (7.9 KB)
│   │   │   │   ├── XZC.png (10.4 KB)
│   │   │   │   ├── ZEC.png (12.1 KB)
│   │   │   │   ├── ZEN.png (10.5 KB)
│   │   │   │   └── ZRX.png (6.4 KB)
│   │   │   ├── faces/
│   │   │   │   ├── 10.jpg (19.3 KB)
│   │   │   │   ├── 12.jpg (28.3 KB)
│   │   │   │   ├── 13.jpg (13.8 KB)
│   │   │   │   ├── 15.jpg (31.1 KB)
│   │   │   │   ├── 16.jpg (23.0 KB)
│   │   │   │   ├── 17.jpg (29.2 KB)
│   │   │   │   ├── 2.jpg (17.1 KB)
│   │   │   │   ├── 3.jpg (22.2 KB)
│   │   │   │   ├── 4.jpg (25.8 KB)
│   │   │   │   ├── 5.jpg (17.0 KB)
│   │   │   │   └── 9.jpg (12.7 KB)
│   │   │   ├── file-types/
│   │   │   │   ├── 001-pdf.svg (1.8 KB)
│   │   │   │   ├── 002-psd.svg (1.8 KB)
│   │   │   │   ├── 003-xls.svg (1.4 KB)
│   │   │   │   ├── 004-xlsx.svg (1.4 KB)
│   │   │   │   ├── 005-documents.svg (1.6 KB)
│   │   │   │   ├── 006-png.svg (2.0 KB)
│   │   │   │   └── 007-jpg.svg (1.4 KB)
│   │   │   ├── illustrations/
│   │   │   │   ├── backgrounds/
│   │   │   │   │   ├── circle-1.svg (0.5 KB)
│   │   │   │   │   ├── cloud-1.svg (2.5 KB)
│   │   │   │   │   ├── icon-bg-1.svg (14.5 KB)
│   │   │   │   │   ├── leaf-1-white.svg (2.7 KB)
│   │   │   │   │   └── leaf-1.svg (2.7 KB)
│   │   │   │   ├── pricing/
│   │   │   │   │   ├── for_business.svg (32.4 KB)
│   │   │   │   │   ├── plan.svg (12.3 KB)
│   │   │   │   │   ├── undraw_analyze.svg (8.0 KB)
│   │   │   │   │   ├── undraw_businessman.svg (23.6 KB)
│   │   │   │   │   ├── undraw_businesswoman.svg (31.2 KB)
│   │   │   │   │   ├── undraw_Graduation.svg (6.4 KB)
│   │   │   │   │   ├── undraw_investing.svg (10.7 KB)
│   │   │   │   │   ├── undraw_map_2.svg (3.6 KB)
│   │   │   │   │   ├── undraw_map.svg (6.4 KB)
│   │   │   │   │   ├── undraw_plans.svg (16.7 KB)
│   │   │   │   │   ├── undraw_setup.svg (3.9 KB)
│   │   │   │   │   ├── undraw_unicorn.svg (5.3 KB)
│   │   │   │   │   └── undraw_world.svg (182.1 KB)
│   │   │   │   ├── 404.svg (4.8 KB)
│   │   │   │   ├── 500_error.svg (5.7 KB)
│   │   │   │   ├── agreement.svg (8.4 KB)
│   │   │   │   ├── all_the_data.svg (10.0 KB)
│   │   │   │   ├── baby.svg (51.9 KB)
│   │   │   │   ├── badge-1.svg (30.2 KB)
│   │   │   │   ├── badge-2.svg (4.0 KB)
│   │   │   │   ├── badge-3.svg (4.6 KB)
│   │   │   │   ├── breaking_barriers.svg (7.5 KB)
│   │   │   │   ├── business_deal.svg (47.1 KB)
│   │   │   │   ├── designer.svg (12.7 KB)
│   │   │   │   ├── done_2.svg (8.9 KB)
│   │   │   │   ├── done.svg (30.9 KB)
│   │   │   │   ├── forgot-password.svg (5.6 KB)
│   │   │   │   ├── happy-cloud.svg (20.0 KB)
│   │   │   │   ├── leaf-1-white.png (0.4 KB)
│   │   │   │   ├── leaf-1-white.svg (2.7 KB)
│   │   │   │   ├── leaf-1.svg (2.7 KB)
│   │   │   │   ├── lighthouse.svg (5.2 KB)
│   │   │   │   ├── lock-and-key.svg (5.5 KB)
│   │   │   │   ├── man-on-skateboard.svg (250.9 KB)
│   │   │   │   ├── meditating_girl.svg (7.8 KB)
│   │   │   │   ├── posting_photo.svg (36.4 KB)
│   │   │   │   ├── rocket.svg (6.9 KB)
│   │   │   │   ├── tick.svg (0.6 KB)
│   │   │   │   ├── undraw_monitor.svg (32.2 KB)
│   │   │   │   └── upgrade.svg (2.7 KB)
│   │   │   ├── logos/
│   │   │   │   ├── 001-spotify.svg (0.7 KB)
│   │   │   │   ├── 002-java.svg (1.5 KB)
│   │   │   │   ├── 003-apple.svg (0.7 KB)
│   │   │   │   ├── 004-windows.svg (0.3 KB)
│   │   │   │   ├── 005-google.svg (1.4 KB)
│   │   │   │   ├── angular.png (22.5 KB)
│   │   │   │   ├── bootstrap.png (25.2 KB)
│   │   │   │   ├── gulp.png (11.2 KB)
│   │   │   │   ├── html.png (10.8 KB)
│   │   │   │   ├── laravel.png (16.6 KB)
│   │   │   │   ├── logo-1.png (2.9 KB)
│   │   │   │   ├── logo-2.png (2.2 KB)
│   │   │   │   ├── logo-3.png (2.6 KB)
│   │   │   │   ├── logo-4.png (1.9 KB)
│   │   │   │   ├── logo-5.png (1.2 KB)
│   │   │   │   ├── logo-6.png (2.5 KB)
│   │   │   │   ├── logo-7.png (1.8 KB)
│   │   │   │   ├── logo-8.png (0.8 KB)
│   │   │   │   ├── logo-9.png (2.1 KB)
│   │   │   │   ├── logo-circle.svg (2.2 KB)
│   │   │   │   ├── npm.png (3.1 KB)
│   │   │   │   ├── ps.png (9.6 KB)
│   │   │   │   ├── react.png (16.9 KB)
│   │   │   │   ├── sass.png (15.5 KB)
│   │   │   │   ├── ui-lib.png (0.8 KB)
│   │   │   │   ├── vue.png (9.4 KB)
│   │   │   │   └── webpack.png (13.0 KB)
│   │   │   ├── products/
│   │   │   │   ├── headphone-1.jpg (48.9 KB)
│   │   │   │   ├── headphone-2.jpg (23.5 KB)
│   │   │   │   ├── headphone-3.jpg (37.7 KB)
│   │   │   │   ├── headphone-4.jpg (31.9 KB)
│   │   │   │   ├── iphone-1.jpg (57.4 KB)
│   │   │   │   ├── iphone-2.jpg (15.5 KB)
│   │   │   │   ├── speaker-1.jpg (40.8 KB)
│   │   │   │   ├── speaker-2.jpg (34.2 KB)
│   │   │   │   ├── watch-1.jpg (56.3 KB)
│   │   │   │   └── watch-2.jpg (16.8 KB)
│   │   │   ├── svg-icons/
│   │   │   │   ├── add_1.svg (1.5 KB)
│   │   │   │   ├── add.svg (1.7 KB)
│   │   │   │   ├── agreement.svg (1.0 KB)
│   │   │   │   ├── apple.svg (1.0 KB)
│   │   │   │   ├── block.svg (1.1 KB)
│   │   │   │   ├── boss.svg (2.4 KB)
│   │   │   │   ├── box.svg (1.0 KB)
│   │   │   │   ├── building.svg (2.6 KB)
│   │   │   │   ├── bullet_list.svg (1.4 KB)
│   │   │   │   ├── business_and_trade.svg (1.9 KB)
│   │   │   │   ├── business_card_of_a_man_with_contact_info.svg (2.3 KB)
│   │   │   │   ├── casino_chips.svg (3.0 KB)
│   │   │   │   ├── chat_1.svg (1.1 KB)
│   │   │   │   ├── chat_box.svg (1.1 KB)
│   │   │   │   ├── chat.svg (0.8 KB)
│   │   │   │   ├── checklist.svg (1.5 KB)
│   │   │   │   ├── close.svg (1.1 KB)
│   │   │   │   ├── cloud_computing_1.svg (1.8 KB)
│   │   │   │   ├── cloud_computing_2.svg (1.8 KB)
│   │   │   │   ├── cloud_computing.svg (2.2 KB)
│   │   │   │   ├── creativity.svg (2.0 KB)
│   │   │   │   ├── database_1.svg (2.3 KB)
│   │   │   │   ├── database.svg (2.4 KB)
│   │   │   │   ├── date.svg (1.5 KB)
│   │   │   │   ├── delete.svg (1.2 KB)
│   │   │   │   ├── documents.svg (1.3 KB)
│   │   │   │   ├── drag.svg (1.4 KB)
│   │   │   │   ├── edit_table.svg (1.4 KB)
│   │   │   │   ├── edit.svg (1.3 KB)
│   │   │   │   ├── enterprise.svg (5.3 KB)
│   │   │   │   ├── facebook.svg (0.3 KB)
│   │   │   │   ├── google.svg (1.0 KB)
│   │   │   │   ├── help.svg (1.0 KB)
│   │   │   │   ├── home_security.svg (2.2 KB)
│   │   │   │   ├── home.svg (1.1 KB)
│   │   │   │   ├── inbox_1.svg (1.0 KB)
│   │   │   │   ├── inbox.svg (0.3 KB)
│   │   │   │   ├── invoices.svg (1.7 KB)
│   │   │   │   ├── link_1.svg (1.4 KB)
│   │   │   │   ├── link.svg (1.0 KB)
│   │   │   │   ├── linkedin.svg (0.5 KB)
│   │   │   │   ├── list_1.svg (1.0 KB)
│   │   │   │   ├── list_text.svg (3.1 KB)
│   │   │   │   ├── list.svg (1.0 KB)
│   │   │   │   ├── location.svg (0.9 KB)
│   │   │   │   ├── magnifying_glass.svg (1.1 KB)
│   │   │   │   ├── map.svg (0.4 KB)
│   │   │   │   ├── menu_1.svg (0.7 KB)
│   │   │   │   ├── menu.svg (0.9 KB)
│   │   │   │   ├── message.svg (0.5 KB)
│   │   │   │   ├── meta.svg (2.9 KB)
│   │   │   │   ├── money.svg (4.3 KB)
│   │   │   │   ├── monitor.svg (2.6 KB)
│   │   │   │   ├── notification.svg (1.5 KB)
│   │   │   │   ├── paint_palette.svg (1.6 KB)
│   │   │   │   ├── paper_plane.svg (3.0 KB)
│   │   │   │   ├── partnership_1.svg (3.0 KB)
│   │   │   │   ├── partnership.svg (2.3 KB)
│   │   │   │   ├── person.svg (0.5 KB)
│   │   │   │   ├── pie_chart.svg (0.4 KB)
│   │   │   │   ├── receipt.svg (1.1 KB)
│   │   │   │   ├── rocket_launch.svg (2.5 KB)
│   │   │   │   ├── rocket.svg (2.1 KB)
│   │   │   │   ├── search.svg (0.9 KB)
│   │   │   │   ├── send.svg (0.6 KB)
│   │   │   │   ├── server.svg (2.0 KB)
│   │   │   │   ├── settings.svg (2.4 KB)
│   │   │   │   ├── shopping_basket.svg (2.6 KB)
│   │   │   │   ├── shopping_cart_1.svg (1.4 KB)
│   │   │   │   ├── shopping_cart.svg (0.7 KB)
│   │   │   │   ├── shopping_list.svg (1.7 KB)
│   │   │   │   ├── success.svg (3.2 KB)
│   │   │   │   ├── table.svg (1.0 KB)
│   │   │   │   ├── twitter.svg (1.3 KB)
│   │   │   │   ├── user.svg (1.9 KB)
│   │   │   │   └── users.svg (0.8 KB)
│   │   │   ├── 5-star.png (2.2 KB)
│   │   │   ├── android-chrome-192x192.png (24.5 KB)
│   │   │   ├── android-chrome-512x512.png (121.7 KB)
│   │   │   ├── apple-touch-icon.png (22.6 KB)
│   │   │   ├── bg-2.jpg (114.1 KB)
│   │   │   ├── cancel.png (1.2 KB)
│   │   │   ├── edit.svg (1.0 KB)
│   │   │   ├── face-1.jpg (14.9 KB)
│   │   │   ├── face-2.jpg (17.6 KB)
│   │   │   ├── face-3.jpg (15.5 KB)
│   │   │   ├── face-4.jpg (18.0 KB)
│   │   │   ├── face-5.jpg (16.4 KB)
│   │   │   ├── face-6.jpg (19.2 KB)
│   │   │   ├── face-7.jpg (16.0 KB)
│   │   │   ├── favicon-16x16.png (0.8 KB)
│   │   │   ├── favicon-32x32.png (2.0 KB)
│   │   │   ├── favicon.svg (2.7 KB)
│   │   │   ├── gr.png (5.1 KB)
│   │   │   ├── logo-full-200px.png (3.7 KB)
│   │   │   ├── logo-full-strong.png (2.7 KB)
│   │   │   ├── logo-full-white.png (2.6 KB)
│   │   │   ├── logo-full.png (2.7 KB)
│   │   │   ├── logo-lg.png (23.6 KB)
│   │   │   ├── logo-text-white.png (3.8 KB)
│   │   │   ├── logo-text.png (3.8 KB)
│   │   │   ├── logo.png (23.6 KB)
│   │   │   ├── ltemplate-screen.jpg (52.9 KB)
│   │   │   ├── ltemplate-screen.png (80.9 KB)
│   │   │   ├── ltemplate.png (22.3 KB)
│   │   │   ├── ltemplate.svg (3.8 KB)
│   │   │   ├── mock-logo-1.png (3.4 KB)
│   │   │   ├── mock-logo-2.png (4.9 KB)
│   │   │   ├── mock-logo-3.png (3.9 KB)
│   │   │   ├── mock-logo-4.png (4.1 KB)
│   │   │   ├── oc.png (3.5 KB)
│   │   │   ├── photo-1.jpg (79.7 KB)
│   │   │   ├── photo-2.jpg (117.6 KB)
│   │   │   ├── photo-3.jpg (97.4 KB)
│   │   │   ├── photo-600_220.jpg (33.5 KB)
│   │   │   ├── sidebar-bg-dark.jpg (24.1 KB)
│   │   │   ├── sidebar-bg.jpg (14.0 KB)
│   │   │   ├── social-dribble.png (1.6 KB)
│   │   │   ├── social-facebook.png (0.5 KB)
│   │   │   ├── social-linkedin.png (0.6 KB)
│   │   │   ├── social-twitter.png (0.9 KB)
│   │   │   ├── sq-1.jpg (173.3 KB)
│   │   │   ├── sq-10.jpg (173.3 KB)
│   │   │   ├── sq-11.jpg (138.8 KB)
│   │   │   ├── sq-12.jpg (113.4 KB)
│   │   │   ├── sq-13.jpg (99.4 KB)
│   │   │   ├── sq-15.jpg (126.9 KB)
│   │   │   ├── sq-16.jpg (205.8 KB)
│   │   │   ├── sq-17.jpg (184.2 KB)
│   │   │   ├── sq-2.jpg (205.8 KB)
│   │   │   ├── sq-3.jpg (169.6 KB)
│   │   │   ├── sq-4.jpg (184.9 KB)
│   │   │   ├── sq-5.jpg (182.2 KB)
│   │   │   ├── sq-6.jpg (104.4 KB)
│   │   │   ├── sq-7.jpg (139.4 KB)
│   │   │   ├── sq-8.jpg (52.1 KB)
│   │   │   ├── sq-9.jpg (110.1 KB)
│   │   │   ├── sq-face-220.jpg (21.0 KB)
│   │   │   ├── star-rating.icons.svg (1.4 KB)
│   │   │   ├── svgIconExample.svg (1.0 KB)
│   │   │   ├── tf.png (4.3 KB)
│   │   │   └── wide-1.jpg (195.6 KB)
│   │   ├── scripts/
│   │   │   └── analytics.js (1.1 KB)
│   │   ├── styles/
│   │   │   ├── scss/
│   │   │   │   ├── components/
│   │   │   │   │   ├── _button.scss (0.2 KB)
│   │   │   │   │   ├── _card.scss (0.3 KB)
│   │   │   │   │   ├── _components.scss (0.2 KB)
│   │   │   │   │   ├── _example-viewer.scss (0.5 KB)
│   │   │   │   │   ├── _ltemplate-sidebar.scss (1.3 KB)
│   │   │   │   │   ├── _mat-table.scss (0.1 KB)
│   │   │   │   │   ├── _menu.scss (4.4 KB)
│   │   │   │   │   ├── _ngx-pagination.scss (0.6 KB)
│   │   │   │   │   ├── _notifications.scss (2.0 KB)
│   │   │   │   │   ├── _others.scss (0.1 KB)
│   │   │   │   │   └── _perfect-scrollbar.scss (0.1 KB)
│   │   │   │   ├── main/
│   │   │   │   │   ├── _breadcrumb.scss (1.3 KB)
│   │   │   │   │   ├── _footer.scss (0.0 KB)
│   │   │   │   │   ├── _header-side.scss (1.1 KB)
│   │   │   │   │   ├── _header-top.scss (0.8 KB)
│   │   │   │   │   ├── _header.scss (0.7 KB)
│   │   │   │   │   ├── _layout.scss (3.8 KB)
│   │   │   │   │   ├── _main.scss (0.5 KB)
│   │   │   │   │   ├── _notifications.scss (0.0 KB)
│   │   │   │   │   ├── _scaffolding.scss (8.9 KB)
│   │   │   │   │   ├── _sidebar.scss (2.1 KB)
│   │   │   │   │   ├── _sidenav.scss (6.5 KB)
│   │   │   │   │   └── _topnav.scss (3.4 KB)
│   │   │   │   ├── mixins/
│   │   │   │   │   ├── _gradients.scss (0.8 KB)
│   │   │   │   │   └── _mixins.scss (0.0 KB)
│   │   │   │   ├── themes/
│   │   │   │   │   ├── _driverjs-tour.theme.scss (1.2 KB)
│   │   │   │   │   ├── _header-top.theme.scss (0.2 KB)
│   │   │   │   │   ├── _init.scss (14.0 KB)
│   │   │   │   │   ├── _ltemplate-calendar.theme.scss (0.5 KB)
│   │   │   │   │   └── _ltemplate.theme.scss (0.1 KB)
│   │   │   │   ├── views/
│   │   │   │   │   ├── sessions/
│   │   │   │   │   │   ├── _sessions.scss (0.7 KB)
│   │   │   │   │   │   ├── _signup-2.scss (0.0 KB)
│   │   │   │   │   │   ├── _signup-3.scss (0.5 KB)
│   │   │   │   │   │   └── _signup-4.scss (0.8 KB)
│   │   │   │   │   ├── todo/
│   │   │   │   │   │   ├── _todo-details.scss (0.4 KB)
│   │   │   │   │   │   ├── _todo-list.scss (1.1 KB)
│   │   │   │   │   │   └── _todo.scss (0.3 KB)
│   │   │   │   │   ├── _calendar.scss (0.5 KB)
│   │   │   │   │   ├── _chats.scss (1.7 KB)
│   │   │   │   │   ├── _gallery.scss (0.8 KB)
│   │   │   │   │   ├── _inbox.scss (1.4 KB)
│   │   │   │   │   ├── _invoice.scss (1.7 KB)
│   │   │   │   │   ├── _landing.scss (2.9 KB)
│   │   │   │   │   ├── _pricings.scss (0.2 KB)
│   │   │   │   │   ├── _profile.scss (1.0 KB)
│   │   │   │   │   ├── _shop.scss (6.8 KB)
│   │   │   │   │   ├── _users.scss (0.2 KB)
│   │   │   │   │   ├── _views.scss (0.5 KB)
│   │   │   │   │   └── invoice-list.scss (0.0 KB)
│   │   │   │   ├── _animations.scss (0.1 KB)
│   │   │   │   ├── _color-tokens.scss (2.9 KB)
│   │   │   │   ├── _css-vars.scss (4.1 KB)
│   │   │   │   ├── _page-layouts.scss (1.0 KB)
│   │   │   │   ├── _typography.scss (2.6 KB)
│   │   │   │   └── _variables.scss (1.9 KB)
│   │   │   ├── app.scss (0.7 KB)
│   │   │   └── tailwind.scss (2.4 KB)
│   │   ├── utils/
│   │   │   └── generate-palette.js (3.8 KB)
│   │   └── .gitkeep (0.0 KB)
│   ├── environments/
│   │   ├── environment.prod.ts (0.1 KB)
│   │   └── environment.ts (0.4 KB)
│   ├── vendor/
│   │   ├── pace/
│   │   │   ├── pace-green.css (0.3 KB)
│   │   │   ├── pace-theme-min.css (0.3 KB)
│   │   │   └── pace.min.js (12.0 KB)
│   │   └── Chart.min.js (136.1 KB)
│   ├── config.ts (0.5 KB)
│   ├── favicon.ico (6.1 KB)
│   ├── index.html (2.8 KB)
│   ├── main.ts (2.3 KB)
│   ├── polyfills.ts (2.1 KB)
│   ├── styles.css (0.1 KB)
│   ├── styles.scss (0.1 KB)
│   ├── test.ts (0.3 KB)
│   └── typings.d.ts (0.1 KB)
├── .gitignore (0.6 KB)
├── angular.json (4.4 KB)
├── karma.conf.js (2.3 KB)
├── package-lock.json (594.1 KB)
├── package.json (2.3 KB)
├── README.md (20.3 KB)
├── tailwind.config.js (2.5 KB)
├── tsconfig.app.json (0.3 KB)
├── tsconfig.json (0.4 KB)
└── tsconfig.spec.json (0.3 KB)

```

---

## 📄 Лицензия

Проект распространяется по стандартной коммерческой/проектной лицензии шаблона Ltemplate. Все права защищены.
