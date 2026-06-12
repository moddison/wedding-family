import {
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Heart,
  MapPin,
  Sparkles,
} from 'lucide-react';

import Aurora from './components/Aurora';
import Magnet from './components/Magnet';
import { invitation } from './invitation.config';

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
  const { hero, couple, date, rsvp } = invitation;
  const rsvpHref = rsvp.formUrl || '#rsvp';

  return (
    <header className="hero" id="top">
      <div
        className="hero__photo"
        style={{ backgroundImage: `url(${hero.image})` }}
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
          <Magnet>
            <a className="button button--dark" href={rsvpHref}>
              {rsvp.buttonText}
            </a>
          </Magnet>
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
      <div className="intro__date" aria-label={invitation.date.full}>
        <span>{invitation.date.day}</span>
        <div>
          <strong>{invitation.date.month}</strong>
          <small>{invitation.date.year}</small>
        </div>
      </div>
      <div className="intro__text">
        <SectionLabel>WEDDING</SectionLabel>
        <h2>Дорогие гости</h2>
        <p>{invitation.invitationText}</p>
      </div>
    </section>
  );
}

function Program() {
  return (
    <section className="program page-section" id="program">
      <div className="section-heading">
        <SectionLabel>{invitation.program.label}</SectionLabel>
        <h2>{invitation.program.title}</h2>
      </div>
      <div className="timeline">
        {invitation.program.items.map((item) => (
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
  const { dressCode } = invitation;

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
  const { location } = invitation;

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
      {invitation.notes.map((note, index) => {
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

function Rsvp() {
  const { rsvp, closing } = invitation;
  const isExternal = Boolean(rsvp.formUrl);
  const buttonHref = isExternal ? rsvp.formUrl : 'mailto:?subject=RSVP свадьба';

  return (
    <section className="rsvp page-section" id="rsvp">
      <SectionLabel>{rsvp.label}</SectionLabel>
      <h2>{rsvp.title}</h2>
      <p>
        Просим подтвердить ваше присутствие <strong>{rsvp.deadline}</strong>
        {' '}
        {rsvp.text}
      </p>
      <Magnet magnetStrength={7}>
        <a
          className="button button--light"
          href={buttonHref}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
        >
          {rsvp.buttonText}
        </a>
      </Magnet>
      <div className="rsvp__signature">
        <Clock3 aria-hidden="true" size={18} />
        <span>{closing}</span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <Program />
        <DressCode />
        <Location />
        <Notes />
        <Rsvp />
      </main>
    </>
  );
}
