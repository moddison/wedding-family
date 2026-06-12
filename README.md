# Свадебное приглашение Данила и Натальи

Настраиваемый сайт-приглашение на свадьбу. Основа взята из `rampatra/wedding-website`, но текущая версия переведена на Vite + React и русские тексты.

## Запуск

```powershell
rtk powershell -NoProfile -Command "npm install"
rtk powershell -NoProfile -Command "npm run dev"
rtk powershell -NoProfile -Command "npm run build"
```

`npm run test` сейчас запускает production-сборку, потому что отдельных unit-тестов в проекте нет.

## Структура

- `src/invitation.config.js` - главный файл настройки текста, даты, адреса, программы, дресс-кода и RSVP.
- `src/App.jsx` - секции приглашения.
- `src/styles.css` - визуальный стиль, адаптив и анимации.
- `src/components/Aurora.jsx` - WebGL-фон, адаптирован из React Bits Aurora.
- `src/components/Magnet.jsx` - магнитная кнопка, адаптирована из React Bits Magnet.
- `public/images/wedding-hero.png` - сгенерированный нейтральный hero-фон без людей и текста.
- `dist/` - результат `npm run build`, не редактировать вручную.

## Быстрая настройка

Все основные данные меняются в `src/invitation.config.js`.

Перед отправкой гостям обязательно заменить:

- `location.name`
- `location.address`
- `location.mapUrl`
- `notes[2].text` с контактом организатора или близкого человека
- `rsvp.formUrl`, если будет Google Form / Яндекс Форма / другая анкета

Если `rsvp.formUrl` пустой, кнопка RSVP открывает черновик письма через `mailto:`.

## Архитектура

Проект статический: React собирается в HTML/CSS/JS через Vite. Это удобно для бесплатного размещения на GitHub Pages, Netlify, Vercel или любом статическом хостинге.

GitHub Actions `.github/workflows/pages.yml` собирает `dist` и публикует сайт на GitHub Pages при пуше в `master`. В настройках репозитория нужно включить Pages с источником `GitHub Actions`.

Визуальная идея: премиальное бумажное приглашение с живым WebGL-светом в духе React Bits, крупной типографикой и простым сценарным скроллом: приглашение, программа, дресс-код, локация, важные заметки, RSVP.

## Зависимости

- `react`, `react-dom` - интерфейс.
- `vite`, `@vitejs/plugin-react` - сборка и dev-сервер.
- `ogl` - WebGL для Aurora-фона.
- `lucide-react` - иконки.

React Bits компоненты используются внутри сайта. Их лицензия: MIT + Commons Clause, то есть можно использовать в приложении/сайте, но нельзя продавать или распространять сами компоненты как библиотеку.

## Заметки

- Старый `CNAME` шаблона удалён, чтобы GitHub Pages не указывал на домен автора.
- Чужие фотографии из исходного шаблона не используются как главный фон, чтобы приглашение не выглядело как замена имён на чужой фотосессии.
- Тексты адаптированы по структуре примера `einvited.ru/airat-venera-07-08`: `LOCATION`, `PROGRAM`, `DRESS CODE`, `18+`, `CONTACTS`, `FLOWERS`, `RSVP`.
