# Свадебное приглашение Данила и Натальи

Статический свадебный сайт на Vite + React. Размещается бесплатно на GitHub Pages, а ответы RSVP отправляются в Google Таблицу через бесплатный Google Apps Script.

## Быстрый запуск

На Windows:

```bat
start-site.bat
```

Вручную:

```powershell
rtk powershell -NoProfile -Command "npm install"
rtk powershell -NoProfile -Command "npm run dev -- --port 5173"
rtk powershell -NoProfile -Command "npm run build"
```

## Что менять заказчику

Тексты сайта:

- `invite.config.js` - имена, дата, программа, адрес, дресс-код, контакты, тексты секций.

Опросник RSVP:

- `survey.config.js` - текст модалки, вопросы, варианты ответов, ссылка `googleScriptUrl` для записи в Google Таблицу.

Фотографии:

- `img/wedding-hero.png` - главный фон сайта и RSVP-модалки.
- `img/photo-1.jpg`
- `img/photo-2.jpg`
- `img/photo-3.jpg`

Чтобы заменить фото, положите новый файл в `img` с тем же именем. В `invite.config.js` пути пишутся как `/wedding-hero.png`, `/photo-1.jpg`, `/photo-2.jpg`, `/photo-3.jpg`, потому что Vite публикует папку `img` в корень сайта.

## Как менять вопросы

Откройте `survey.config.js` и редактируйте массив `questions`.

Пример вопроса с одним вариантом:

```js
{
  id: 'attendance',
  title: 'Вы сможете быть с нами?',
  type: 'radio',
  required: true,
  options: ['Да, с радостью буду', 'Пока не уверен(а)', 'К сожалению, не смогу'],
}
```

Поддерживаемые типы:

- `radio` - один вариант.
- `checkbox` - несколько вариантов.
- `select` - выпадающий список.
- `textarea` - свободный текст.

При добавлении новых вопросов сайт сам отправит их названия в Google Таблицу, а Apps Script добавит недостающие колонки после первого ответа.

## Как подключить ответы

1. Создайте Google Таблицу.
2. Откройте `Расширения -> Apps Script`.
3. Вставьте код из `deploy/google-sheets-apps-script.js`.
4. Нажмите `Deploy -> New deployment`.
5. Тип: `Web app`.
6. `Execute as`: `Me`.
7. `Who has access`: `Anyone`.
8. Скопируйте Web app URL.
9. Вставьте его в `survey.config.js` в поле `googleScriptUrl`.

После этого ответы гостей будут появляться в листе `RSVP` Google Таблицы. На сайте админки нет.

## Деплой бесплатно

Основной вариант: GitHub Pages.

1. Запушить проект в GitHub в ветку `master`.
2. Открыть `Settings -> Pages`.
3. Выбрать `Source: GitHub Actions`.
4. Workflow `.github/workflows/pages.yml` сам соберёт `dist` и опубликует сайт.

## Структура

- `src/App.jsx` - секции сайта и пошаговая RSVP-модалка.
- `src/styles.css` - внешний вид.
- `src/components/Aurora.jsx` - WebGL-фон, адаптирован из React Bits Aurora.
- `src/config/site.js` - импортирует корневые конфиги.
- `src/lib/rsvpStorage.js` - отправляет ответы в Google Sheets.
- `scripts/check-config.mjs` - проверяет картинки, вопросы и синтаксис Apps Script перед сборкой.
- `deploy/google-sheets-apps-script.js` - бесплатная запись ответов в таблицу.
- `start-site.bat` - локальный запуск с остановкой старого процесса на порту `5173`.

В проекте намеренно оставлены только рабочие файлы Vite/React-сайта. Старые папки исходного шаблона с jQuery, Sass, PSD и неиспользуемыми ассетами удалены, чтобы заказчик не путался.

## Проверка

```powershell
rtk powershell -NoProfile -Command "npm run test"
```

`npm run test` проверяет конфиги и выполняет production-сборку.
