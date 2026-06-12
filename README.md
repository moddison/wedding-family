# Свадебное приглашение Данила и Натальи

Финальная статическая версия свадебного сайта на Vite + React. Сайт можно бесплатно разместить на GitHub Pages, а ответы RSVP писать в Google Sheets через Apps Script.

## Быстрый запуск

Самый простой запуск на Windows:

```bat
start-site.bat
```

Команды вручную:

```powershell
rtk powershell -NoProfile -Command "npm install"
rtk powershell -NoProfile -Command "npm run dev -- --port 5173"
rtk powershell -NoProfile -Command "npm run build"
```

`npm run test` запускает production-сборку.

## Что менять заказчику

- `invite.config.js` - имена, дата, тексты, программа, адрес, дресс-код, контакты, список картинок.
- `survey.config.js` - вопросы RSVP, типы ответов, варианты, текст формы, URL для Google Sheets.
- `img/wedding-hero.png` - главный фон.
- `img/photo-1.jpg`, `img/photo-2.jpg`, `img/photo-3.jpg` - фотографии в блоке галереи.

Чтобы заменить фото, достаточно положить новый файл с тем же именем в `img`.
В `invite.config.js` эти файлы указываются как `/wedding-hero.png`, `/photo-1.jpg` и так далее, потому что Vite публикует папку `img` в корень сайта.

## RSVP и ответы

Форма спрашивает имя, фамилию и вопросы из `survey.config.js`.

Поддерживаемые типы вопросов:

- `radio` - один вариант.
- `checkbox` - несколько вариантов.
- `select` - выпадающий список.
- `textarea` - свободный текст.

Ответы всегда сохраняются локально в браузере в админ-блоке `Админ: ответы гостей`. Их можно скачать JSON-файлом.

Для настоящего сбора ответов от гостей нужен `googleScriptUrl` в `survey.config.js`. Бесплатная инструкция и код лежат в `deploy/README.md` и `deploy/google-sheets-apps-script.js`.

## Структура

- `src/App.jsx` - секции сайта и RSVP-форма.
- `src/styles.css` - внешний вид.
- `src/components/Aurora.jsx` - WebGL-фон, адаптирован из React Bits Aurora.
- `src/config/site.js` - импортирует корневые конфиги.
- `src/lib/rsvpStorage.js` - сохранение локально и отправка в Google Sheets.
- `.github/workflows/pages.yml` - бесплатный деплой на GitHub Pages.
- `start-site.bat` - локальный запуск с остановкой старого процесса на порту `5173`.

## Деплой бесплатно

Основной вариант: GitHub Pages.

1. Запушить проект в GitHub в ветку `master`.
2. Открыть `Settings -> Pages`.
3. Выбрать `Source: GitHub Actions`.
4. Workflow сам соберёт `dist` и опубликует сайт.

Подробности по Google Sheets для RSVP: `deploy/README.md`.

## Заметки

- Старый `CNAME` шаблона удалён.
- Старые Gulp/jQuery-интеграции исходного шаблона больше не используются.
- Кнопка RSVP теперь обычная стабильная кнопка без магнитного движения.
- `dist/`, `node_modules/` и `logs/` не коммитятся.
