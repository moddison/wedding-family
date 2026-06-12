# Бесплатный деплой

## Сайт

1. Создать GitHub-репозиторий.
2. Запушить проект в ветку `master`.
3. В GitHub открыть `Settings -> Pages`.
4. В `Build and deployment` выбрать `Source: GitHub Actions`.
5. После пуша workflow `.github/workflows/pages.yml` сам соберёт сайт и опубликует GitHub Pages.

## RSVP в Google Sheets

1. Создать Google Таблицу.
2. Открыть `Extensions -> Apps Script`.
3. Вставить код из `deploy/google-sheets-apps-script.js`.
4. Нажать `Deploy -> New deployment`.
5. Тип: `Web app`.
6. `Execute as`: `Me`.
7. `Who has access`: `Anyone`.
8. Скопировать Web app URL.
9. Вставить URL в `survey.config.js` в поле `googleScriptUrl`.

Если `googleScriptUrl` пустой, ответы сохраняются только локально в браузере администратора и доступны в блоке `Админ: ответы гостей`.
