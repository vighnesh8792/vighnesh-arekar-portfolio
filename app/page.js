'use client';

import { useEffect, useRef, useState } from 'react';
import './globals.css';

const skills = [
  'HTML5','CSS3','JavaScript','Bootstrap','React.js','Node.js','Express.js','REST APIs',
  'Python','Java','C','C++','SQL','MySQL','MongoDB','Git','GitHub','Regex',
  'AST Parsing','Static Analysis','Code Complexity Analysis','DSA'
];

const projects = [
  {
    num: '01',
    date: 'MAY 2026',
    title: 'Advanced Code Quality & Security Linter',
    stack: 'PYTHON · REGEX · AST PARSING · CLI',
    text: 'A Python CLI scanner that combines regex and AST-based rules to detect hardcoded API keys and secrets, SQL-injection risk patterns, and code-complexity issues.',
    image: '/projects/linter.png',
    tone: 'amber'
  },
  {
    num: '02',
    date: 'APRIL 2026',
    title: 'AI-Powered Resume Analyzer',
    stack: 'NODE.JS · JAVASCRIPT · REST APIs · GROQ API',
    text: 'A web application that accepts DOCX resumes and job descriptions, analyzes them with Groq API, and presents missing-keyword recommendations.',
    image: '/projects/resume.png',
    tone: 'violet'
  }
];

const preloadLetters = (word) => word.split('').map((letter, index) => ({
  letter,
  key: `${word}-${index}`,
  delay: index * 65
}));

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [heroPhase, setHeroPhase] = useState('intro');
  const videoRef = useRef(null);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 2600);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (isLoading) return undefined;

    const introTimer = window.setTimeout(() => {
      setHeroPhase('video');
      videoRef.current?.play().catch(() => {});
    }, 3600);

    return () => window.clearTimeout(introTimer);
  }, [isLoading]);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));

    const cursor = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const onMove = (event) => {
      if (!cursor || !cursorRing) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorRing.animate(
        { transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)` },
        { duration: 280, fill: 'forwards' }
      );
    };
    window.addEventListener('mousemove', onMove);

    const interactive = document.querySelectorAll('a, button, .project-card, .photo-card');
    const addCursorState = () => document.body.classList.add('cursor-active');
    const removeCursorState = () => document.body.classList.remove('cursor-active');
    interactive.forEach((element) => {
      element.addEventListener('mouseenter', addCursorState);
      element.addEventListener('mouseleave', removeCursorState);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMove);
      interactive.forEach((element) => {
        element.removeEventListener('mouseenter', addCursorState);
        element.removeEventListener('mouseleave', removeCursorState);
      });
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('page-loading', isLoading);
    return () => document.body.classList.remove('page-loading');
  }, [isLoading]);

  const closeMenu = () => setOpen(false);
  const firstWord = preloadLetters('VIGHNESH');
  const secondWord = preloadLetters('PORTFOLIO');

  return (
    <main>
      <div className={`preloader ${isLoading ? '' : 'preloader--done'}`} aria-hidden={!isLoading}>
        <div className="preloader-inner">
          <p className="preloader-kicker">PERSONAL PORTFOLIO · 2026</p>
          <div className="preloader-word">
            {firstWord.map(({ letter, key, delay }) => <span key={key} style={{ animationDelay: `${delay}ms` }}>{letter}</span>)}
          </div>
          <div className="preloader-word preloader-word-muted">
            {secondWord.map(({ letter, key, delay }) => <span key={key} style={{ animationDelay: `${150 + delay}ms` }}>{letter}</span>)}
          </div>
          <div className="preloader-line"><span /></div>
          <div className="preloader-meta"><span>VIGHNESH PORTFOLIO</span><span>LOADING</span></div>
        </div>
      </div>

      <div className="site-grain" />
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}>VA<span>.</span></a>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          <span className={open ? 'line rotate-one' : 'line'} />
          <span className={open ? 'line rotate-two' : 'line'} />
        </button>
        <nav className={open ? 'nav open' : 'nav'}>
          {['About','Skills','Projects','Experience','Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
        </nav>
        <a className="header-cta" href="https://www.linkedin.com/in/vighnesh-arekar" target="_blank" rel="noreferrer">LET&apos;S TALK ↗</a>
      </header>

      <section id="home" className={`hero ${heroPhase === 'video' ? 'hero--video' : 'hero--intro'}`}>
        <div className="hero-viewport">
          <article className="hero-slide hero-intro-slide">
            <img
              className="hero-poster"
              src="/hero-poster.png"
              alt="Vighnesh Arekar"
              fetchPriority="high"
            />
            <div className="hero-poster-focus" />
            <div className="hero-intro-shade" />
            <div className="hero-intro-grid" />
            <div className="hero-intro-content">
              <p className="eyebrow"><span /> WEB DEVELOPER · FRONTEND · SOFTWARE ENGINEERING</p>
              <h1>VIGHNESH <span>AREKAR</span></h1>
              <p className="hero-copy">Final-year Computer Science Engineering student building responsive interfaces, practical web applications and developer-focused tools.</p>
              <div className="hero-actions">
                <a className="pill-button magnetic" href="#projects">EXPLORE MY WORK <span>↗</span></a>
                <a className="minimal-link" href="https://github.com/vighnesh8792" target="_blank" rel="noreferrer">GITHUB ↗</a>
              </div>
            </div>
            <div className="hero-bottom">
              <div><span className="mini-dot" /> KOLHAPUR · MAHARASHTRA</div>
              <div>SCROLL TO EXPLORE <span className="arrow-down">↓</span></div>
            </div>
          </article>

          <article className="hero-slide hero-video-slide" aria-label="Vighnesh portfolio background video">
            <video
              ref={videoRef}
              className="hero-video"
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.png"
              aria-hidden="true"
            >
              <source src="/hero-loop.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-shade" />
            <div className="hero-video-glow" />
          </article>
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>WEB DEVELOPMENT</span><b>✦</b><span>FRONTEND</span><b>✦</b><span>SOFTWARE ENGINEERING</span><b>✦</b>
          <span>WEB DEVELOPMENT</span><b>✦</b><span>FRONTEND</span><b>✦</b><span>SOFTWARE ENGINEERING</span><b>✦</b>
        </div>
      </section>

      <section id="about" className="section section-split">
        <div className="side-label">01 / ABOUT</div>
        <div className="section-main">
          <Reveal>
            <p className="kicker">PROFILE / 2026</p>
            <h2>Building for the web with <em>curiosity, detail and code.</em></h2>
          </Reveal>
          <Reveal className="about-layout delay-1">
            <div>
              <p>I&apos;m Vighnesh Arekar, a final-year B.E. Computer Science Engineering student based in Kolhapur, Maharashtra. I have hands-on web development experience through my internship at Anvistar ITS Pvt. Ltd., Pune.</p>
              <p>My work combines frontend development, backend APIs, programming, databases, and practical developer tools.</p>
            </div>
            <div className="profile-card">
              <div className="profile-photo">
                <img src="/hero-poster.png" alt="Vighnesh Arekar portrait" />
                <div className="profile-photo-overlay"><span>VIGHNESH AREKAR</span><small>WEB DEVELOPER</small></div>
              </div>
              <div className="profile-card-footer">
                <span>B.E. CSE</span><span>2027</span><span>CGPA 8.2</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="section section-split muted-section">
        <div className="side-label">02 / SKILLS</div>
        <div className="section-main">
          <Reveal>
            <p className="kicker">TOOLS / TECHNOLOGIES</p>
            <h2>The stack I use to <em>build.</em></h2>
          </Reveal>
          <Reveal className="skill-wrap delay-1">
            {skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section section-split">
        <div className="side-label">03 / PROJECTS</div>
        <div className="section-main">
          <Reveal>
            <p className="kicker">SELECTED WORK / 2026</p>
            <h2>Built with purpose, not just <em>for show.</em></h2>
          </Reveal>

          <div className="project-stack">
            {projects.map((project, index) => (
              <Reveal className={`project-card-wrap ${index === 1 ? 'delay-1' : ''}`} key={project.title}>
                <article className={`project-card ${project.tone}`}>
                  <div className="project-visual">
                    <img src={project.image} alt={`${project.title} visual`} loading="eager" decoding="async" />
                    <div className="visual-overlay"><span>PROJECT VISUAL</span><span>0{index + 1} / 02</span></div>
                  </div>
                  <div className="project-info">
                    <div className="project-meta"><span>{project.num} / {project.date}</span><span>{project.stack}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                    <div className="project-bottom"><span>PROJECT VISUAL</span><span className="project-arrow">↗</span></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="visual-section">
        <div className="visual-inner">
          <Reveal>
            <div className="visual-heading">
              <div><p className="kicker">04 / VISUAL MOTION</p><h2>Bring the portfolio to <em>life.</em></h2></div>
              <p>Motion is used as a layer — slow video, hover depth, reveal transitions and moving detail keep the page feeling alive.</p>
            </div>
          </Reveal>
          <div className="photo-grid">
            <Reveal className="photo-card photo-large">
              <img src="/hero-poster.png" alt="Vighnesh Arekar portfolio visual" />
              <div className="photo-caption"><span>01</span><strong>VIGHNESH / PORTFOLIO</strong></div>
            </Reveal>
            <Reveal className="photo-card photo-small delay-1">
              <img src="/projects/linter.png" alt="Advanced Code Quality and Security Linter" />
              <div className="photo-caption"><span>02</span><strong>BUILD / SHIP / LEARN</strong></div>
            </Reveal>
            <Reveal className="photo-card photo-small delay-2">
              <img src="/projects/resume.png" alt="AI Powered Resume Analyzer" />
              <div className="photo-caption"><span>03</span><strong>CODE WITH INTENT</strong></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="experience" className="section section-split">
        <div className="side-label">05 / EXPERIENCE</div>
        <div className="section-main">
          <Reveal>
            <p className="kicker">INTERNSHIP / JULY 2026</p>
            <h2>Hands-on experience at <em>Anvistar.</em></h2>
          </Reveal>
          <Reveal className="experience-card delay-1">
            <div className="experience-top">
              <div><span className="status-dot" /> WEB DEVELOPMENT / SOFTWARE INTERN</div>
              <span>PUNE · JULY 2026</span>
            </div>
            <div className="experience-body">
              <div><h3>Anvistar ITS Pvt. Ltd.</h3><p>ViJeera HR – Professional HR Academy</p></div>
              <div><p>Built and refined responsive UI components including header, footer, navigation, login, courses and certification pages.</p><strong>HTML · CSS · JavaScript · jQuery · Bootstrap</strong></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-glow" />
        <Reveal>
          <p className="eyebrow centered"><span /> OPEN TO OPPORTUNITIES</p>
          <h2>LET&apos;S BUILD<br /><em>SOMETHING.</em></h2>
          <p>Open to entry-level opportunities in Web Development, Frontend Development and Software Engineering.</p>
          <div className="hero-actions center-actions">
            <a className="pill-button magnetic" href="https://www.linkedin.com/in/vighnesh-arekar" target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a>
            <a className="minimal-link" href="https://github.com/vighnesh8792" target="_blank" rel="noreferrer">GITHUB ↗</a>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div><strong>VIGHNESH AREKAR<span>.</span></strong><p>Web Developer · Frontend Developer · Software Engineering</p></div>
        <div className="footer-links"><a href="#about">ABOUT</a><a href="#projects">PROJECTS</a><a href="#experience">EXPERIENCE</a><a href="#contact">CONTACT</a></div>
        <small>© 2026 Vighnesh Arekar</small>
      </footer>
    </main>
  );
}
