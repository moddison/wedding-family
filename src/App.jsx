import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Download,
  ExternalLink,
  Heart,
  MapPin,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import Aurora from './components/Aurora';
import { inviteConfig, surveyConfig } from './config/site';
import { assetUrl } from './lib/assets';
import {
  clearStoredResponses,
  downloadResponses,
  readStoredResponses,
  saveStoredResponse,
  sendResponseToGoogleSheets,
} from './lib/rsvpStorage';

function SectionLabel({ children }) {
  return <span className="section-label">{children}</span>;
}

function SplitTitle({ text, as: Tag = 'h1', className = '' }) {
  const words = text.split(' ');

  return (
    <Tag className={`split-title ${className}`}>
      {words.map((word, index) => (
        <span
          className="split-title__word"
          style={{ '--delay': `${index * 90}ms` }}
          key={`${word}-${index}`}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}

function Hero() {
  const { hero, couple, date, images } = inviteConfig;

  return (
    <header className="hero" id="top">
      <div
        className="hero__photo"
        style={{ backgroundImage: `url(${assetUrl(images.hero)})` }}
        aria-hidden="true"
      />
      <Aurora
        amplitude={0.95}
        blend={0.5}
        colorStops={['#f4ddbf', '#9dac92', '#f7efe3']}
      />
      <nav className="nav" aria-label="Основная навигация">
        <a href="#top" className="nav__mark" aria-label="В начало">
          {couple.short}
        </a>
        <div className="nav__links">
          <a href="#program">Программа</a>
          <a href="#dress-code">Дресс-код</a>
          <a href="#location">Локация</a>
          <a href="#rsvp">RSVP</a>
        </div>
      </nav>

      <div className="hero__content">
        <p className="eyebrow">{hero.eyebrow}</p>
        <SplitTitle text={hero.title} />
        <p className="hero__subtitle">{hero.subtitle}</p>
        <div className="hero__meta" aria-label="Дата свадьбы">
          <span>{date.full}</span>
          <i />
          <span>WEDDING DAY</span>
        </div>
        <div className="hero__actions">
          <a className="button button--dark" href="#rsvp">
            Заполнить анкету
          </a>
          <a className="button button--ghost" href="#invitation">
            {hero.scrollLabel}
            <ChevronDown aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <section className="intro" id="invitation">
      <div className="intro__date" aria-label={inviteConfig.date.full}>
        <span>{inviteConfig.date.day}</span>
        <div>
          <strong>{inviteConfig.date.month}</strong>
          <small>{inviteConfig.date.year}</small>
        </div>
      </div>
      <div className="intro__text">
        <SectionLabel>WEDDING</SectionLabel>
        <h2>Дорогие гости</h2>
        <p>{inviteConfig.invitationText}</p>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery" aria-label="Фотографии для замены заказчиком">
      {inviteConfig.images.gallery.map((image, index) => (
        <figure className="gallery__item" key={image}>
          <img src={assetUrl(image)} alt={`Фото для приглашения ${index + 1}`} />
        </figure>
      ))}
    </section>
  );
}

function Program() {
  return (
    <section className="program page-section" id="program">
      <div className="section-heading">
        <SectionLabel>{inviteConfig.program.label}</SectionLabel>
        <h2>{inviteConfig.program.title}</h2>
      </div>
      <div className="timeline">
        {inviteConfig.program.items.map((item) => (
          <article className="timeline__item" key={`${item.time}-${item.title}`}>
            <time>{item.time}</time>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DressCode() {
  const { dressCode } = inviteConfig;

  return (
    <section className="dress page-section" id="dress-code">
      <div className="section-heading">
        <SectionLabel>{dressCode.label}</SectionLabel>
        <h2>{dressCode.title}</h2>
      </div>
      <div className="dress__palette" aria-label="Палитра дресс-кода">
        {dressCode.palette.map((color) => (
          <span key={color} style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="dress__notes">
        <p>{dressCode.women}</p>
        <p>{dressCode.men}</p>
      </div>
    </section>
  );
}

function Location() {
  const { location } = inviteConfig;

  return (
    <section className="location page-section" id="location">
      <div>
        <SectionLabel>{location.label}</SectionLabel>
        <h2>{location.title}</h2>
      </div>
      <div className="location__body">
        <div className="location__pin" aria-hidden="true">
          <MapPin size={34} />
        </div>
        <div>
          <h3>{location.name}</h3>
          <p>{location.address}</p>
          <p className="muted">{location.note}</p>
          <a className="text-link" href={location.mapUrl} target="_blank" rel="noreferrer">
            Открыть карту
            <ExternalLink aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Notes() {
  const icons = [Sparkles, Heart, CalendarDays];

  return (
    <section className="notes page-section" aria-label="Важные детали">
      {inviteConfig.notes.map((note, index) => {
        const Icon = icons[index] ?? Sparkles;

        return (
          <article className="note" key={note.label}>
            <Icon aria-hidden="true" size={24} />
            <SectionLabel>{note.label}</SectionLabel>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
          </article>
        );
      })}
    </section>
  );
}

function getInitialFormState() {
  const guestFields = Object.fromEntries(
    surveyConfig.guestFields.map((field) => [field.id, '']),
  );
  const answers = Object.fromEntries(
    surveyConfig.questions.map((question) => [
      question.id,
      question.type === 'checkbox' ? [] : '',
    ]),
  );

  return { guest: guestFields, answers };
}

function QuestionField({ question, value, onChange }) {
  if (question.type === 'textarea') {
    return (
      <textarea
        value={value}
        placeholder={question.placeholder}
        required={question.required}
        onChange={(event) => onChange(question.id, event.target.value)}
      />
    );
  }

  if (question.type === 'select') {
    return (
      <select
        value={value}
        required={question.required}
        onChange={(event) => onChange(question.id, event.target.value)}
      >
        <option value="">Выберите ответ</option>
        {question.options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (question.type === 'checkbox') {
    return (
      <div className="choice-list">
        {question.options.map((option) => (
          <label className="choice" key={option}>
            <input
              checked={value.includes(option)}
              type="checkbox"
              onChange={(event) => {
                const nextValue = event.target.checked
                  ? [...value, option]
                  : value.filter((item) => item !== option);
                onChange(question.id, nextValue);
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="choice-list">
      {question.options.map((option) => (
        <label className="choice" key={option}>
          <input
            checked={value === option}
            name={question.id}
            required={question.required}
            type="radio"
            value={option}
            onChange={(event) => onChange(question.id, event.target.value)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function Rsvp() {
  const [formState, setFormState] = useState(getInitialFormState);
  const [responses, setResponses] = useState([]);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const { intro, storageKey, googleScriptUrl } = surveyConfig;

  useEffect(() => {
    setResponses(readStoredResponses(storageKey));
  }, [storageKey]);

  const updateGuest = (fieldId, value) => {
    setFormState((current) => ({
      ...current,
      guest: { ...current.guest, [fieldId]: value },
    }));
  };

  const updateAnswer = (questionId, value) => {
    setFormState((current) => ({
      ...current,
      answers: { ...current.answers, [questionId]: value },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const response = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      guest: formState.guest,
      answers: formState.answers,
    };

    const nextResponses = saveStoredResponse(storageKey, response);
    setResponses(nextResponses);

    try {
      await sendResponseToGoogleSheets(googleScriptUrl, response);
      setStatus('success');
      setMessage(intro.successText);
    } catch {
      setStatus('warning');
      setMessage(intro.errorText);
    }

    setFormState(getInitialFormState());
  };

  const clearResponses = () => {
    clearStoredResponses(storageKey);
    setResponses([]);
  };

  return (
    <section
      className="rsvp page-section"
      id="rsvp"
      style={{ '--rsvp-bg': `url(${assetUrl(inviteConfig.images.hero)})` }}
    >
      <div className="rsvp__copy">
        <SectionLabel>{intro.label}</SectionLabel>
        <h2>{intro.title}</h2>
        <p>
          Просим подтвердить ваше присутствие <strong>{intro.deadline}</strong>{' '}
          {intro.text}
        </p>
      </div>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {surveyConfig.guestFields.map((field) => (
            <label className="field" key={field.id}>
              <span>{field.label}</span>
              <input
                placeholder={field.placeholder}
                required={field.required}
                type={field.type}
                value={formState.guest[field.id]}
                onChange={(event) => updateGuest(field.id, event.target.value)}
              />
            </label>
          ))}
        </div>

        <div className="question-list">
          {surveyConfig.questions.map((question) => (
            <fieldset className="question" key={question.id}>
              <legend>
                {question.title}
                {question.required ? <span>*</span> : null}
              </legend>
              <QuestionField
                question={question}
                value={formState.answers[question.id]}
                onChange={updateAnswer}
              />
            </fieldset>
          ))}
        </div>

        <button className="button button--light" disabled={status === 'sending'} type="submit">
          {status === 'sending' ? 'Отправляем...' : intro.buttonText}
        </button>

        {message ? <p className={`form-status form-status--${status}`}>{message}</p> : null}
      </form>

      <AdminResponses
        responses={responses}
        onClear={clearResponses}
        onDownload={() => downloadResponses('rsvp-answers.json', responses)}
      />

      <div className="rsvp__signature">
        <Clock3 aria-hidden="true" size={18} />
        <span>{inviteConfig.closing}</span>
      </div>
    </section>
  );
}

function AdminResponses({ responses, onClear, onDownload }) {
  return (
    <details className="admin-panel">
      <summary>Админ: ответы гостей ({responses.length})</summary>
      <div className="admin-panel__actions">
        <button type="button" onClick={onDownload} disabled={!responses.length}>
          <Download size={16} />
          Скачать JSON
        </button>
        <button type="button" onClick={onClear} disabled={!responses.length}>
          <Trash2 size={16} />
          Очистить локально
        </button>
      </div>
      {responses.length ? (
        <div className="responses-table">
          {responses.map((response) => (
            <article className="response" key={response.id}>
              <strong>
                {response.guest.firstName} {response.guest.lastName}
              </strong>
              <small>{new Date(response.createdAt).toLocaleString('ru-RU')}</small>
              {surveyConfig.questions.map((question) => (
                <p key={question.id}>
                  <span>{question.title}</span>
                  {Array.isArray(response.answers[question.id])
                    ? response.answers[question.id].join(', ')
                    : response.answers[question.id] || 'нет ответа'}
                </p>
              ))}
            </article>
          ))}
        </div>
      ) : (
        <p className="muted">Пока нет сохранённых ответов в этом браузере.</p>
      )}
    </details>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <Gallery />
        <Program />
        <DressCode />
        <Location />
        <Notes />
        <Rsvp />
      </main>
    </>
  );
}
