import { useEffect, useRef, useState } from 'react';
import { inviteConfig } from './config/site';
import { assetUrl } from './lib/assets';

function App() {
  const audioRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [formState, setFormState] = useState({ name: '', attendance: '', drinks: [] });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollClick = () => {
    scrollTo('invite');
    if (audioRef.current && !musicStarted) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setMusicStarted(true);
        setShowToggle(true);
      }).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setMusicStarted(true);
        setShowToggle(true);
      }).catch(() => {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const payload = {
      id: crypto.randomUUID(),
      guest: { firstName: formState.name, lastName: '' },
      questions: [
        { id: 'attendance', title: 'Сможете ли вы присутствовать?' },
        { id: 'drinks', title: 'Предпочтения по напиткам' }
      ],
      answers: {
        attendance: formState.attendance,
        drinks: formState.drinks.join(', ')
      }
    };
    try {
      await fetch('https://script.google.com/macros/s/AKfycbz9LsS1K6ZlYwarAeuy7RCzZEP8vk0tHTxL2oPZpSUm8zSedry-hZJTrCyjBR4OQUeq/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
    } catch (_) {}
    setSubmitted(true);
    setSending(false);
  };

  const groom = inviteConfig.couple.groom;
  const bride = inviteConfig.couple.bride;
  const phone = '+7 (917) 621-31-53';
  const phoneClean = '79176213153';
  const icons = {
    group: assetUrl('group.svg'),
    rings: assetUrl('rings.svg'),
    eat: assetUrl('eat.svg'),
    firework: assetUrl('firework.svg'),
    whatsapp: assetUrl('whatsapp.svg'),
  };
  const programItems = [
    { time: '13:45', label: 'Сбор гостей', desc: 'Подарите нам свою улыбку и возьмите с собой хорошее настроение', icon: icons.group },
    { time: '14:00', label: 'Церемония', desc: 'Может быть трогательно, разрешается всплакнуть', icon: icons.rings },
    { time: '14:30', label: 'Фуршет', desc: 'Самое время для поздравлений, фотографий, вкусной еды и бокала игристого', icon: icons.eat },
  ];

  return (
    <>
      <header className="hero" id="top">
        <div className="hero__bg" style={{ backgroundImage: `url(${assetUrl(inviteConfig.images.hero)})` }}></div>
        <div className="hero__overlay"></div>
        <div className="hero__names">
          <span className="hero__name">{groom}</span>
          <span className="hero__name hero__name--and">и</span>
          <span className="hero__name">{bride}</span>
        </div>
        <button className="hero__scroll" onClick={handleScrollClick}>
          НАЖМИТЕ ДЛЯ МУЗЫКАЛЬНОГО СОПРОВОЖДЕНИЯ И ЛИСТАЙТЕ ВНИЗ
        </button>
      </header>

      <section className="invite-text" id="invite">
        <p>Дорогие родные и близкие!<br />Приглашаем вас на нашу камерную свадьбу!</p>
      </section>

      <hr className="divider" />

      <section className="section program" id="program">
        <div className="section__title">Программа</div>
        <div className="program__date">Суббота, {inviteConfig.date.full}</div>
        <div className="program__grid">
          {programItems.map((item, i) => (
            <div className="program__item" key={item.label}>
              <div className="program__item-inner">
                <div className="program__center">
                  <div className="program__icon"><img src={item.icon} alt="" /></div>
                  {i < programItems.length - 1 && <div className="program__line"></div>}
                </div>
                <div className="program__info">
                  <div className="program__time">{item.time}</div>
                  <div className="program__label">{item.label}</div>
                  <div className="program__desc">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section className="section location" id="location">
        <div className="section__title">Локация</div>
        <div className="location__grid">
          <div className="location__card">
            <p className="location__text">Церемония пройдет в усадьбе «{inviteConfig.location.name}»</p>
            <p className="location__address">{inviteConfig.location.address}</p>
            <a className="btn" href={inviteConfig.location.mapUrl} target="_blank" rel="noreferrer">ПЕРЕЙТИ НА КАРТУ</a>
          </div>

        </div>
      </section>

      <section className="photo-section">
        <div className="photo-section__image">
          <img src={assetUrl('photo-22.jpg')} alt="" />
        </div>
      </section>

      <section className="section dress-code" id="dress-code">
        <div className="section__title">Дресс-код</div>
        <p className="dress-code__desc">Мы трепетно относимся к подготовке, просим чтобы ваш образ был подобран в соответствии с палитрой свадьбы</p>
        <div className="dress-code__gender">Девушки</div>
        <div className="dress-code__palette">
          {['#503020', '#D0C0B0', '#90A080', '#F0F0B0'].map(c => (
            <div className="dress-code__swatch" key={c} style={{ backgroundColor: c }}></div>
          ))}
        </div>
        <p className="dress-code__text">{inviteConfig.dressCode.women}</p>
        <div className="dress-code__gender">Мужчины</div>
        <div className="dress-code__palette">
          {['#ffffff', '#000000', '#503020', '#D0C0B0', '#90A080', '#F0F0B0'].map(c => (
            <div className="dress-code__swatch" key={c} style={{ backgroundColor: c }}></div>
          ))}
        </div>
        <p className="dress-code__text">{inviteConfig.dressCode.men}</p>
      </section>

      <hr className="divider" />

      <section className="section survey" id="survey">
        <div className="section__title">Анкета гостя</div>
        <p className="survey__desc">Подтвердите свое присутствие и ответьте на несколько вопросов.<br />Это поможет в организации торжества!</p>
        {submitted ? (
          <p style={{ fontWeight: 600 }}>Спасибо! Ваш ответ отправлен.</p>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label">Фамилия Имя</label>
              <input className="form__input" required placeholder="Антон и Анна – Ивановы" value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
            </div>
            <div className="form__group">
              <label className="form__label">Сможете ли Вы присутствовать?</label>
              <div className="form__radio-group">
                {['Смогу / сможем присутствовать', 'Затрудняюсь ответить, сообщу позже', 'Не смогу прийти'].map(o => (
                  <label className="form__option" key={o}>
                    <input type="radio" name="attendance" value={o} checked={formState.attendance === o} onChange={e => setFormState({ ...formState, attendance: e.target.value })} />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="form__submit" type="submit" disabled={sending}>
              {sending ? <span className="spinner"></span> : 'Отправить'}
            </button>
          </form>
        )}
      </section>

      <section className="closing" id="closing">
        <div className="closing__text">С нетерпением<br />ждём Вас!</div>
      </section>

      <section className="photo-section" id="photo-section">
        <div className="photo-section__image">
          <img src={assetUrl('wedding-hero1.jpg')} alt="" />
        </div>
      </section>

      <section className="calendar" id="calendar">
        <div className="calendar__title">АВГУСТ 2026</div>
        <div className="calendar__grid">
          {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(d => (
            <div className="calendar__weekday" key={d}>{d}</div>
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <div className="calendar__day calendar__day--empty" key={`e${i}`}></div>
          ))}
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            return (
              <div className={`calendar__day${day === 1 ? ' calendar__day--highlighted' : ''}`} key={day}>
                <span className="calendar__day-number">{day}</span>
                {day === 1 && <span className="calendar__heart">♥</span>}
              </div>
            );
          })}
        </div>
      </section>

      <hr className="divider" />

      <section className="contacts" id="contacts">
        <div className="section__title">Контакты</div>
        <p className="contacts__desc">По всем интересующим вас вопросам<br />вы можете связаться с женихом</p>
        <div className="contacts__name">{groom}</div>
        <a className="contacts__phone" href={`tel:${phoneClean}`}>{phone}</a>
        <div className="contacts__social">
          <a href={`https://wa.me/${phoneClean}`} target="_blank" rel="noreferrer">
            <img src={icons.whatsapp} alt="WhatsApp" />
          </a>
        </div>
      </section>

      <audio ref={audioRef} src={assetUrl('background.mp3')} loop preload="auto"></audio>
      {showToggle && (
        <button
          className={`music-toggle${isPlaying ? ' music-toggle--playing' : ''}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isPlaying ? (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 010 14.14" />
                <path d="M15.54 8.46a5 5 0 010 7.07" />
              </>
            ) : (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            )}
          </svg>
        </button>
      )}
    </>
  );
}

export default App;
