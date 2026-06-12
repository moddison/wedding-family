export const surveyConfig = {
  googleScriptUrl: '',
  intro: {
    label: 'RSVP',
    title: 'Подтвердите присутствие',
    deadline: 'до 7 июля 2026 г.',
    text:
      'Мы подготовили короткую анкету, чтобы учесть гостей, напитки и важные пожелания.',
    openButtonText: 'Заполнить анкету',
    modalTitle: 'Анкета гостя',
    modalText:
      'Ответьте на несколько вопросов по очереди. Это займёт меньше минуты и поможет нам всё красиво организовать.',
    startButtonText: 'Начать',
    submitButtonText: 'Отправить ответ',
    successText:
      'Ваш ответ отправлен. Спасибо, что помогаете нам подготовить праздник с заботой.',
    errorText:
      'Ответ не отправился. Проверьте интернет и попробуйте ещё раз.',
    notConfiguredText:
      'Таблица для ответов ещё не подключена. Добавьте ссылку Apps Script в googleScriptUrl файла survey.config.js.',
  },
  guestFields: [
    {
      id: 'firstName',
      label: 'Ваше имя',
      type: 'text',
      placeholder: 'Например, Иван',
      required: true,
    },
    {
      id: 'lastName',
      label: 'Ваша фамилия',
      type: 'text',
      placeholder: 'Например, Петров',
      required: true,
    },
  ],
  questions: [
    {
      id: 'attendance',
      title: 'Вы сможете быть с нами?',
      description: 'Нам важно заранее понимать количество гостей.',
      type: 'radio',
      required: true,
      options: ['Да, с радостью буду', 'Пока не уверен(а)', 'К сожалению, не смогу'],
    },
    {
      id: 'drink',
      title: 'Что подготовить для вас из напитков?',
      description: 'Можно выбрать несколько вариантов.',
      type: 'checkbox',
      required: true,
      options: ['Шампанское', 'Вино', 'Безалкогольные напитки', 'Крепкий алкоголь'],
    },
    {
      id: 'plusOne',
      title: 'Будете ли вы с парой?',
      type: 'radio',
      required: true,
      options: ['Буду один/одна', 'Буду с парой', 'Пока не знаю'],
    },
    {
      id: 'comment',
      title: 'Есть ли особенности питания или пожелания?',
      type: 'textarea',
      required: false,
      placeholder: 'Аллергии, особенности питания или просто тёплые слова',
    },
  ],
};
