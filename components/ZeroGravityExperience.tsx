'use client';

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from 'react';

const IMG = {
 hero1: '/assets/zg-5.webp', hero2: '/assets/zg-6.webp', hero3: '/assets/zg-4.webp',
 bride: '/assets/zg-7.webp', couple: '/assets/zg-8.webp', rings: '/assets/stock-bride.jpg',
 ritual: '/assets/zg-10.webp', editorial: '/assets/zg-9.webp', family: '/assets/stock-family.jpg',
 baby: '/assets/stock-baby.jpg', destination: '/assets/stock-destination.jpg',
};
const heroFrames = [IMG.hero1, IMG.hero2, IMG.hero3];
const stories = [
 {place:'THE WEDDING EDIT',couple:'A little closer.',note:'The quiet looks. The shared laughter. Everything that makes a celebration yours.',image:IMG.hero1,detail:'/assets/stock-rings.jpg'},
 {place:'THE EVENING EDIT',couple:'When time stands still.',note:'Warm light, an unspoken promise, and a moment held just a little longer.',image:IMG.hero2,detail:'/assets/stock-ritual.jpg'},
 {place:'THE COUPLE EDIT',couple:'Only us.',note:'A portrait of connection, in all its beautiful simplicity.',image:IMG.couple,detail:IMG.rings},
 {place:'THE CELEBRATION EDIT',couple:'Joy, unposed.',note:'The small, spontaneous moments that become the ones you remember.',image:IMG.hero3,detail:'/assets/stock-hero3.jpg'},
];
const cultures = [
 {title:'Brahmin',kicker:'Tradition · rhythm · meaning',image:'/assets/zg-10.webp'},
 {title:'Christian',kicker:'Vows · light · stillness',image:IMG.bride},
 {title:'Muslim',kicker:'Grace · detail · celebration',image:'/assets/zg-11.webp'},
 {title:'Telugu',kicker:'Colour · ritual · family',image:'/assets/zg-12.webp'},
 {title:'Malayali',kicker:'Warmth · gold · joy',image:'/assets/zg-13.webp'},
];
const destinations = [
 {city:'India',code:'IND',image:IMG.destination,note:'Architecture, light and a sense of wonder.'},
 {city:'By the sea',code:'SEA',image:'/assets/stock-couple.jpg',note:'A celebration with room to breathe.'},
 {city:'In the city',code:'CITY',image:'/assets/zg-2.webp',note:'A little adventure, together.'},
 {city:'Somewhere timeless',code:'LOVE',image:IMG.editorial,note:'The place is only the beginning.'},
];
const films = [
 {title:'The Wedding Prelude',note:'Sample playback · placeholder footage',poster:'/assets/zg-3.webp',src:'/media/sample.mp4'},
 {title:'Candid Vows',note:'Sample playback · placeholder footage',poster:'/assets/zg-14.webp',src:'/media/sample.mp4'},
 {title:'Afterglow',note:'Sample playback · placeholder footage',poster:IMG.editorial,src:'/media/sample.mp4'},
];

const testimonials = [
  { quote: 'The photographs did not just show the wedding. They brought the whole day back to us.', name: 'A wedding story' },
  { quote: 'Every time we open the album, we notice a moment we completely missed on the day.', name: 'A family story' },
  { quote: 'The team made us forget the cameras were there. That changed everything.', name: 'A couple story' },
];

const weddingTypes = cultures.map(item => `${item.title} Wedding`);

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={back ? 'M19 12H6m5-6-6 6 6 6' : 'M5 12h13M13 6l6 6-6 6'} /></svg>;
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export default function ZeroGravityExperience() {
  const [intro, setIntro] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const storyRail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const drag = useRef<{x:number;left:number} | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const [hero, setHero] = useState(0);
  const [story, setStory] = useState(0);
  const [culture, setCulture] = useState(0);
  const [destination, setDestination] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [bookingStep, setBookingStep] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFilm, setSelectedFilm] = useState<number | null>(null);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorDot = useRef<HTMLDivElement | null>(null);
  useReveal();

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(motion.matches);
    const changed = () => setReduced(motion.matches);
    motion.addEventListener('change', changed);
    const timer = window.setTimeout(() => setIntro(false), motion.matches ? 0 : 1800);
    const onScroll = () => {
      setScrolled(window.scrollY > 42);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, window.scrollY / max));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearTimeout(timer); motion.removeEventListener('change', changed); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    if (paused || reduced || intro) return;
    const timer = window.setInterval(() => { if (!document.hidden) setHero(v => (v + 1) % heroFrames.length); }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduced, intro]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorVisible(true);
      if (cursor.current) cursor.current.style.transform = `translate3d(${e.clientX - 18}px,${e.clientY - 18}px,0)`;
      if (cursorDot.current) cursorDot.current.style.transform = `translate3d(${e.clientX - 3}px,${e.clientY - 3}px,0)`;
    };
    const onLeave = () => setCursorVisible(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelectedFilm(null); setSelectedStory(null); setMega(false); setMenu(false); }
    };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    const open = selectedFilm !== null || selectedStory !== null;
    const previous = document.activeElement as HTMLElement | null;
    if (open) dialog.current?.showModal(); else dialog.current?.close();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; previous?.focus(); };
  }, [selectedFilm, selectedStory]);

  const goStory = (index: number) => {
    const rail = storyRail.current;
    if (!rail) return;
    const card = rail.children[index] as HTMLElement;
    rail.scrollTo({left: card.offsetLeft - (rail.children[0] as HTMLElement).offsetLeft, behavior: reduced ? 'instant' : 'smooth'});
  };
  const nextStep = (step:number, target:HTMLButtonElement) => {
    if (target.form?.reportValidity()) setBookingStep(step);
  };

  const submitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldsets = e.currentTarget.querySelectorAll('fieldset');
    fieldsets.forEach(el => el.disabled = false);
    const fd = new FormData(e.currentTarget);
    fieldsets.forEach((el,i) => el.disabled = i !== bookingStep);
    const message = [
      'Hi Zero Gravity Photography, I would like to check availability.',
      '',
      `Name: ${String(fd.get('name') || '')}`,
      `Phone: ${String(fd.get('phone') || '')}`,
      `Date: ${String(fd.get('date') || '')}`,
      `City: ${String(fd.get('city') || '')}`,
      `Coverage: ${String(fd.get('coverage') || '')}`,
    ].join('\n');
    window.open(`https://wa.me/919840767566?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main>
      <a className="skip-link" href="#stories">Skip to stories</a>
      <div ref={cursor} className={`cursor-ring ${cursorVisible ? 'cursor-visible' : ''}`} />
      <div ref={cursorDot} className={`cursor-dot ${cursorVisible ? 'cursor-visible' : ''}`} />
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <div className={`cinematic-intro ${intro ? '' : 'cinematic-intro-out'}`} aria-hidden={!intro}>
        <div className="intro-panel intro-panel-left" />
        <div className="intro-panel intro-panel-right" />
        <button className="intro-skip" onClick={() => setIntro(false)} tabIndex={intro ? 0 : -1}>Skip intro ↗</button>
        <div className="intro-center">
          <img src="/zg-logo.png" alt="" />
          <span>ZERO GRAVITY</span>
          <small>PHOTOGRAPHY</small>
          <i />
          <p>EVERY LOVE STORY HAS ITS OWN GRAVITY</p>
        </div>
      </div>

      <header className={`topbar ${scrolled ? 'topbar-solid' : ''}`}>
        <a href="#top" className="logo-lockup" aria-label="Zero Gravity Photography concept home">
          <img src="/zg-logo.png" alt="Zero Gravity logo" />
          <span><b>ZERO GRAVITY</b><small>PHOTOGRAPHY</small></span>
        </a>
        <nav id="main-nav" className={menu ? 'nav-mobile-open' : ''}>
          <button className="nav-button" aria-expanded={mega} onClick={() => { if (window.innerWidth <= 820) {setMenu(false); document.getElementById("cultures")?.scrollIntoView();} else setMega(v => !v); }}>Weddings <span>+</span></button>
          <a href="#stories" onClick={() => setMenu(false)}>Stories</a>
          <a href="#films" onClick={() => setMenu(false)}>Films</a>
          <a href="#destinations" onClick={() => setMenu(false)}>Destinations</a>
          <a href="#baby" onClick={() => setMenu(false)}>Baby</a>
          <a href="#studio" onClick={() => setMenu(false)}>Studio</a>
        </nav>
        <a href="#booking" className="book-pill">Check your date <Arrow /></a>
        <button className="menu-toggle" onClick={() => setMenu(v => !v)} aria-label="Toggle menu" aria-expanded={menu} aria-controls="main-nav"><span/><span/></button>
      </header>

      <div className={`mega-menu ${mega ? 'mega-open' : ''}`} inert={!mega} onMouseLeave={() => setMega(false)}>
        <div className="mega-head"><span>WEDDINGS ACROSS CULTURES</span><button onClick={() => setMega(false)}>Close ×</button></div>
        <div className="mega-grid">
          <div className="mega-list">
            {weddingTypes.map((item, idx) => <button key={item} onMouseEnter={() => setCulture(idx % cultures.length)} onClick={() => { setCulture(idx % cultures.length); setMega(false); document.getElementById('cultures')?.scrollIntoView({ behavior: 'smooth' }); }}>{item}<span>↗</span></button>)}
          </div>
          <div className="mega-image"><img loading="lazy" src={cultures[culture].image} alt="Wedding culture concept"/><div><span>{cultures[culture].title}</span><small>{cultures[culture].kicker}</small></div></div>
          <div className="mega-copy"><p>From intimate rituals to thousand-person celebrations, the experience changes. The visual language should too.</p><a href="#cultures" onClick={() => setMega(false)}>Explore all stories <Arrow /></a></div>
        </div>
      </div>

      <section id="top" className="hero-v2">
        <div className="hero-stage">
          {heroFrames.map((src, idx) => <div key={src} className={`hero-frame ${idx === hero ? 'hero-frame-active' : ''}`} style={{ backgroundImage: `url(${src})` }} />)}
          <div className="hero-shade" />
          <div className="hero-noise" />
          <div className="hero-copy-v2">
            <p className="micro-label">WEDDING STORIES · INDIA + WORLDWIDE</p>
            <h1><span>Some moments.</span><em>Forever.</em></h1>
            <div className="hero-deck"><p>For the fleeting glances, the overflowing joy, and everything you never want to forget.</p><a href="#stories">Enter the stories <Arrow /></a></div>
          </div>
          <div className="hero-counter"><button onClick={() => setHero(v => (v + 2) % 3)} aria-label="Previous hero image">←</button><button onClick={() => setPaused(v => !v)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? "Play" : "Pause"}</button><button onClick={() => setHero(v => (v + 1) % 3)} aria-label="Next hero image">→</button><b>0{hero + 1}</b><i><span style={{ width: `${((hero + 1) / heroFrames.length) * 100}%` }} /></i><span>0{heroFrames.length}</span></div>
          <div className="hero-sideword">STORYTELLING SINCE 2012</div>
        </div>
      </section>

      <section className="intro-statement section-pad">
        <p className="micro-label" data-reveal>ZERO GRAVITY / A DIGITAL CONCEPT</p>
        <div className="statement-row" data-reveal><h2>YOUR WEDDING</h2><span>should feel like<br/>your wedding.</span></div>
        <div className="statement-row statement-row-offset" data-reveal><span>Not a template.<br/>Not a checklist.</span><h2>NOT A SHOOT.</h2></div>
        <p className="statement-body" data-reveal>A celebration belongs to the people in it. The photographs should hold onto that feeling—honest, intimate, and entirely yours.</p>
      </section>

      <section id="stories" className="featured-stories">
        <div className="section-kicker section-pad-x" data-reveal><span>01 / FEATURED STORIES</span><div><h2>Love stories,<br/><em>one frame at a time.</em></h2><p>Drag through celebrations that each get their own visual rhythm.</p></div></div>
        <div className="story-window" ref={storyRail} role="region" aria-label="Featured story carousel" tabIndex={0}
          onKeyDown={e => {if(e.key==='ArrowRight'){e.preventDefault();goStory(Math.min(3,story+1));} if(e.key==='ArrowLeft'){e.preventDefault();goStory(Math.max(0,story-1));}}}
          onScroll={e => {const rail=e.currentTarget; const step=(rail.children[1] as HTMLElement).offsetLeft-(rail.children[0] as HTMLElement).offsetLeft;setStory(Math.round(rail.scrollLeft/step));}}
          onPointerDown={e => {if(e.pointerType==='mouse' && !(e.target as HTMLElement).closest('button')){e.currentTarget.style.scrollSnapType="none";drag.current={x:e.clientX,left:e.currentTarget.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);}}}
          onPointerMove={e => {if(drag.current)e.currentTarget.scrollLeft=drag.current.left+drag.current.x-e.clientX;}}
          onPointerUp={e => {drag.current=null;e.currentTarget.style.scrollSnapType="";goStory(story);}} onPointerCancel={e => {drag.current=null;e.currentTarget.style.scrollSnapType="";}}>
          {stories.map((item,idx) => <article className="editorial-story" key={item.couple} aria-label={`Story ${idx+1} of 4`}>
            <div className="story-photo"><img loading="lazy" src={item.image} alt="Couple portrait from Zero Gravity’s public portfolio" draggable={false}/><span>ZERO GRAVITY / PORTFOLIO SELECTION</span></div>
            <div className="story-editorial"><span className="micro-label">0{idx+1} / {item.place}</span><h3>{item.couple}</h3><p>{item.note}</p><img loading="lazy" src={item.detail} alt="Wedding details · supporting stock image" draggable={false}/><button onClick={() => setSelectedStory(idx)}>Open the frame <Arrow/></button></div>
          </article>)}
        </div>
        <div className="carousel-controls section-pad-x"><div><button aria-label="Previous story" onClick={() => goStory(story-1)} disabled={story===0}><Arrow back/></button><button aria-label="Next story" onClick={() => goStory(story+1)} disabled={story===3}><Arrow/></button></div><div className="story-dots">{stories.map((_,idx)=><button key={idx} aria-label={`Go to story ${idx+1}`} aria-current={story===idx} className={story===idx?'dot-active':''} onClick={()=>goStory(idx)}/>)}</div><span aria-live="polite">0{story+1} / 04</span></div>
      </section>

      <section id="cultures" className="culture-section">
        <div className="culture-bg">{cultures.map((item,idx)=><img key={item.title} className={idx===culture?"active":""} src={item.image} alt="" loading="lazy"/>)}</div>
        <div className="culture-overlay"/>
        <div className="culture-content section-pad">
          <div className="culture-heading"><p className="micro-label">02 / WEDDINGS ACROSS CULTURES</p><h2>Every tradition<br/>has its own <em>tempo.</em></h2></div>
          <div className="culture-selector">
            {cultures.map((item, idx) => <button key={item.title} className={idx === culture ? 'culture-active' : ''} aria-pressed={idx===culture} onClick={() => setCulture(idx)}><span>0{idx + 1}</span><b>{item.title}</b><small>{item.kicker}</small></button>)}
          </div>
        </div>
      </section>

      <section id="films" className="film-section section-pad">
        <div className="film-heading" data-reveal><p className="micro-label">03 / WEDDING FILMS</p><h2>MEMORIES<br/><em>IN MOTION.</em></h2><p>A glance becomes a scene. A day becomes a film. Explore the playback experience with clearly labelled sample footage.</p></div>
        <div className="film-strip" data-reveal>
          {films.map((film, idx) => <button key={film.title} className={`film-card film-card-${idx + 1}`} type="button" onClick={() => setSelectedFilm(idx)}>
            <img loading="lazy" src={film.poster} alt={`${film.title} poster`} />
            <div className="film-badge"><span>▶</span><small>PLAY FILM</small></div>
            <div className="film-time">0{idx + 1} / FILM</div>
            <div className="film-copy"><strong>{film.title}</strong><p>{film.note}</p></div>
          </button>)}
        </div>
      </section>

      <section id="destinations" className="destination-section">
        <div className="destination-head section-pad-x" data-reveal><p className="micro-label">04 / DESTINATION STORIES</p><h2>WHERE WILL<br/><em>YOUR STORY TAKE US?</em></h2></div>
        <div className="postcard-stage">
          {destinations.map((item, idx) => {
            const offset = idx - destination;
            return <article key={item.city} className={`postcard ${idx === destination ? 'postcard-active' : ''}`} style={{ '--offset': offset, '--abs': Math.abs(offset) } as CSSProperties} role="button" tabIndex={0} aria-label={`Select ${item.city}`} onKeyDown={e => {if(e.key === "Enter" || e.key === " "){e.preventDefault();setDestination(idx);}}} onClick={() => setDestination(idx)}><img loading="lazy" src={item.image} alt={`${item.city} wedding concept`}/><div className="postcard-stamp">{item.code}</div><div className="postcard-copy"><span>{String(idx + 1).padStart(2, '0')}</span><h3>{item.city}</h3><p>{item.note}</p></div></article>;
          })}
        </div>
        <div className="destination-nav"><button aria-label="Previous destination" onClick={() => setDestination(v => (v - 1 + destinations.length) % destinations.length)}><Arrow back /></button><span>{destinations[destination].city} · {destination + 1}/{destinations.length}</span><button aria-label="Next destination" onClick={() => setDestination(v => (v + 1) % destinations.length)}><Arrow /></button></div>
      </section>

      <section id="baby" className="life-story">
        <div className="life-copy section-pad" data-reveal><p className="micro-label">05 / THE STORY KEEPS GROWING</p><h2>LOVE.<br/>WEDDING.<br/><em>FAMILY.</em></h2><p>The wedding is one chapter. Zero Gravity also photographs maternity, baby showers and growing families—so the visual story can keep moving with you.</p><a href="https://zerogravity.photography/baby-photography/" target="_blank" rel="noreferrer">Explore baby photography <Arrow /></a></div>
        <div className="life-collage"><div className="life-card life-card-one"><img loading="lazy" src={IMG.hero2} alt="Wedding couple concept"/><span>01 / LOVE</span></div><div className="life-card life-card-two"><img loading="lazy" src={IMG.family} alt="Family concept"/><span>02 / FAMILY</span></div><div className="life-card life-card-three"><img loading="lazy" src={IMG.baby} alt="Baby photography concept"/><span>03 / BEGIN AGAIN</span></div></div>
      </section>

      <section id="studio" className="studio-section section-pad">
        <div className="studio-title" data-reveal><p className="micro-label">06 / ZERO GRAVITY</p><h2>BUILT FOR<br/><em>REAL EMOTION.</em></h2></div>
        <div className="studio-grid" data-reveal><div><strong>2012</strong><span>STORYTELLING SINCE</span></div><div><strong>12+</strong><span>WEDDING + DESTINATION MARKETS</span></div><div><strong>1</strong><span>TEAM ACROSS EVERY CHAPTER</span></div></div>
        <div className="studio-manifesto" data-reveal><p>From the first nervous glance to the last dance, the most meaningful frames are the ones that feel like you.</p></div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-polaroids"><div className="polaroid polaroid-a"><img loading="lazy" src={IMG.bride} alt="Bride concept"/></div><div className="polaroid polaroid-b"><img loading="lazy" src={IMG.rings} alt="Wedding detail concept"/></div></div>
        <div className="testimonial-copy" data-reveal><p className="micro-label">07 / SAMPLE TESTIMONIAL COPY</p><span className="quote-mark">“</span><blockquote key={testimonial}>{testimonials[testimonial].quote}</blockquote><small>{testimonials[testimonial].name}</small><div className="testimonial-nav"><button aria-label="Previous testimonial" onClick={() => setTestimonial(v => (v - 1 + testimonials.length) % testimonials.length)}><Arrow back /></button><div className="testimonial-dots">{testimonials.map((_, idx) => <button key={idx} className={testimonial === idx ? 'dot-active' : ''} onClick={() => setTestimonial(idx)} aria-label={`Go to testimonial ${idx + 1}`} />)}</div><span>0{testimonial + 1} / 0{testimonials.length}</span><button aria-label="Next testimonial" onClick={() => setTestimonial(v => (v + 1) % testimonials.length)}><Arrow /></button></div></div>
      </section>

      <section id="booking" className="booking-section section-pad">
        <div className="booking-intro" data-reveal><p className="micro-label">08 / CHECK YOUR DATE</p><h2>LET'S START<br/><em>WITH WHEN.</em></h2><p>Tell us when, where, and what you have in mind. Then continue the conversation on WhatsApp.</p><div className="booking-contact"><span>CALL</span><a href="tel:+919840767566">+91 98407 67566</a><span>INSTAGRAM</span><a href="https://www.instagram.com/zerogravityphotography/" target="_blank" rel="noreferrer">@zerogravityphotography ↗</a></div></div>
        <form onSubmit={submitBooking} className="booking-card" data-reveal>
          <div className="booking-progress"><span style={{ width: `${((bookingStep + 1) / 3) * 100}%` }}/></div>
          <fieldset disabled={bookingStep !== 0} hidden={bookingStep !== 0} className="booking-step"><span>STEP 01 / 03</span><h3>When is your big day?</h3><label><small>EVENT DATE</small><input name="date" type="date" required/></label><label><small>CITY / DESTINATION</small><select name="city" required defaultValue=""><option value="" disabled>Select a location</option><option>Hyderabad</option><option>Chennai</option><option>Bangalore</option><option>Mumbai</option><option>Destination wedding</option><option>Other</option></select></label><button type="button" onClick={e => nextStep(1,e.currentTarget)}>Continue <Arrow /></button></fieldset>
          <fieldset disabled={bookingStep !== 1} hidden={bookingStep !== 1} className="booking-step"><span>STEP 02 / 03</span><h3>What should we capture?</h3><div className="coverage-options">{['Photography','Wedding film','Photography + film','Pre-wedding'].map(v => <label key={v}><input type="radio" name="coverage" value={v} required/><b>{v}</b><i>+</i></label>)}</div><div className="step-actions"><button type="button" className="back" onClick={() => setBookingStep(0)}><Arrow back/> Back</button><button type="button" onClick={e => nextStep(2,e.currentTarget)}>Continue <Arrow /></button></div></fieldset>
          <fieldset disabled={bookingStep !== 2} hidden={bookingStep !== 2} className="booking-step"><span>STEP 03 / 03</span><h3>Who are we talking to?</h3><label><small>YOUR NAME</small><input name="name" placeholder="Name" required/></label><label><small>PHONE / WHATSAPP</small><input name="phone" type="tel" placeholder="Phone number" required/></label><div className="step-actions"><button type="button" className="back" onClick={() => setBookingStep(1)}><Arrow back/> Back</button><button type="submit">Open WhatsApp <Arrow /></button></div></fieldset>
        </form>
      </section>

      <footer>
        <div className="footer-logo"><img src="/zg-logo.png" alt="Zero Gravity logo"/><div><b>ZERO GRAVITY</b><small>PHOTOGRAPHY</small></div></div>
        <div className="footer-big">STAY IN<br/><em>THE MOMENT.</em></div>
        <div className="footer-links"><a href="#stories">Stories</a><a href="#films">Films</a><a href="#destinations">Destinations</a><a href="#baby">Baby</a><a href="https://www.instagram.com/zerogravityphotography/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
        <div className="footer-bottom"><p>Website redesign concept prepared for Zero Gravity Photography.</p><span>Private V4 concept · Portfolio © Zero Gravity · Supporting stock imagery · Sample video and testimonial copy</span><a href="#top">Back to top ↑</a></div>
      </footer>

      <dialog ref={dialog} className="media-dialog" onCancel={() => {setSelectedFilm(null);setSelectedStory(null);}} onClick={e => {if(e.target===e.currentTarget){setSelectedFilm(null);setSelectedStory(null);}}}>
        <button autoFocus className="dialog-close" aria-label="Close preview" onClick={()=>{setSelectedFilm(null);setSelectedStory(null);}}>Close ×</button>
        {selectedFilm !== null && <><p className="micro-label">SAMPLE VIDEO / NOT A ZERO GRAVITY FILM</p><h3>{films[selectedFilm].title}</h3><video key={selectedFilm} controls autoPlay playsInline preload="metadata" src={films[selectedFilm].src}/><p>Placeholder nature footage demonstrating in-page playback.</p></>}
        {selectedStory !== null && <><p className="micro-label">ZERO GRAVITY / PUBLIC PORTFOLIO</p><h3>{stories[selectedStory].couple}</h3><img loading="lazy" src={stories[selectedStory].image} alt="Full uncropped Zero Gravity couple portrait"/><p>Private editorial concept. Photograph © Zero Gravity Photography.</p></>}
      </dialog>
    </main>
  );
}

