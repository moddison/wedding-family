export const surveyConfig = {
  storageKey: 'danil-natalia-rsvp-answers',
  googleScriptUrl: '',
  intro: {
    label: 'RSVP',
    title: 'Подтвердите присутствие',
    deadline: 'до 7 июля 2026 г.',
    text:
      'Введите имя и фамилию, ответьте на вопросы, а мы всё аккуратно сохраним для подготовки праздника.',
    buttonText: 'Отправить анкету',
    successText: 'Спасибо! Ответ сохранён.',
    errorText:
      'Не удалось отправить ответ в таблицу, но мы сохранили его в локальном админ-разделе этого браузера.',
  },
  guestFields: [
    {
      id: 'firstName',
      label: 'Имя',
      type: 'text',
      placeholder: 'Например, Иван',
      required: true,
    },
    {
      id: 'lastName',
      label: 'Фамилия',
      type: 'text',
      placeholder: 'Например, Петров',
      required: true,
    },
  ],
  questions: [
    {
      id: 'attendance',
      title: 'Вы сможете прийти?',
      type: 'radio',
      required: true,
      options: ['Да, буду', 'Пока не уверен(а)', 'Не смогу прийти'],
    },
    {
      id: 'drink',
      title: 'Что будете пить?',
      type: 'checkbox',
      required: true,
      options: ['Вино', 'Шампанское', 'Безалкогольные напитки', 'Крепкий алкоголь'],
    },
    {
      id: 'comment',
      title: 'Комментарий или пожелания',
      type: 'textarea',
      required: false,
      placeholder: 'Аллергии, особенности питания или просто тёплые слова',
    },
  ],
};
