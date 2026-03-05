import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Database,
  Smartphone,
  Cpu,
  Monitor,
  Layout,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  X,
  Menu,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import Scene from './components/Scene';
import ParticleGrid from './components/ParticleGrid';
import MagneticCursor from './components/MagneticCursor';
import ScrollProgress from './components/ScrollProgress';
import TiltCard from './components/TiltCard';
import TypewriterText from './components/TypewriterText';

/* ─── Animation Variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ─── FadeIn Wrapper ─────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '', style = {}, direction = 'up' }) {
  const variant = direction === 'left' ? slideLeft : direction === 'right' ? slideRight : fadeUp;
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: '-80px' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ───────────────────────────────────────────────── */
const skills = [
  { category: 'Engineering & AI', items: ['AI-Driven Apps', 'UI/UX Design', 'Deployment (iOS/Android)'], icon: <Cpu /> },
  { category: 'Web Stacks', items: ['React.js', 'Next.js', 'HTML5/CSS3'], icon: <Layout /> },
  { category: 'Mobile Apps', items: ['React Native', 'iOS', 'Android Native'], icon: <Smartphone /> },
  { category: 'Languages', items: ['Python', 'C/C++', 'Java', 'JavaScript', 'PHP'], icon: <Code2 /> },
  { category: 'Database & Tools', items: ['MySQL', 'XAMPP', 'WordPress'], icon: <Database /> },
  { category: 'Design', items: ['Canva', 'VS Code', 'Problem Solving'], icon: <Monitor /> },
];

const projects = [
  {
    title: 'Energy Monitoring (EMS)',
    desc: 'Professional-grade mobile app built with React Native and Expo to monitor real-time energy consumption visually.',
    tags: ['React Native', 'Expo', 'Real-Time APIs'],
    color: '#00d4ff',
  },
  {
    title: 'SaaS Complaint Portal',
    desc: 'Cross-platform SaaS solution for grievance management with a secure backend architecture and real-time updates.',
    tags: ['Web', 'iOS', 'Android', 'Backend'],
    color: '#00b4d8',
  },
  {
    title: 'Face Detection AI',
    desc: 'AI system capable of detecting and categorizing real-time facial expressions (joy, anger, sadness) via image processing.',
    tags: ['Python', 'Computer Vision', 'AI'],
    color: '#48cae4',
  },
  {
    title: 'Pac-Man Engine',
    desc: 'Fully functional game using Pygame featuring ghost AI pathfinding, scoring systems, and custom logic.',
    tags: ['Python', 'Pygame', 'AI'],
    color: '#67e8f9',
  },
  {
    title: 'Smart Security IoT',
    desc: 'Integrated hardware/software with Laser Security and Password Door Lock managed via an Arduino custom interface.',
    tags: ['IoT', 'Arduino', 'C++'],
    color: '#0096c7',
  },
  {
    title: 'Car Rental Platform',
    desc: 'Full-stack web app featuring a dynamic booking module and personalized, secure user authentication.',
    tags: ['Full Stack', 'Authentication'],
    color: '#90e0ef',
  },
];

/* ─── Glowing Border Card ───────────────────────────────── */
function GlowCard({ children, color = '#9d4edd', delay = 0, className = '', style = {} }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      custom={delay}
      viewport={{ once: true, margin: '-60px' }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card glow-card ${className}`}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          background: isHovered
            ? `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${color}22, transparent 65%)`
            : 'transparent',
          transition: 'background 0.15s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Glow border */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: '17px',
          border: `1px solid ${color}`,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

/* ─── Counter ───────────────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Nav Link ──────────────────────────────────────────── */
function NavLink({ href, children, onClick }) {
  return (
    <a href={href} onClick={onClick} className="nav-link-animated">
      {children}
      <span className="nav-link-underline" />
    </a>
  );
}

/* ─── App ───────────────────────────────────────────────── */
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);
  const springY = useSpring(heroY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* ── Global FX ─────────────────────────────── */}
      <div className="bg-mesh" />
      <ParticleGrid />
      <MagneticCursor />
      <ScrollProgress />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* ── Navbar ────────────────────────────────── */}
      <motion.nav
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container nav-container">
          <motion.div
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-flex' }}
            >
              <Code2 size={28} color="var(--primary)" />
            </motion.div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem' }}>
              Muzzammil
            </span>
          </motion.div>

          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {['about', 'experience', 'projects', 'contact'].map((section) => (
              <NavLink
                key={section}
                href={`#${section}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {section === 'projects' ? 'Work' : section.charAt(0).toUpperCase() + section.slice(1)}
              </NavLink>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ──────────────────────────────────── */}
      <section id="hero" ref={heroRef}>
        <Scene />
        <motion.div
          className="container hero-container"
          style={{ opacity: heroOpacity, y: springY }}
        >
          <div className="hero-text">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                style={{
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Sparkles size={16} />
                Portfolio 2025
              </motion.p>

              <motion.h1 className="hero-title" variants={fadeUp} custom={0.1}>
                Hi, I'm{' '}
                <span className="text-gradient">Muzzammil</span>
              </motion.h1>

              <motion.div
                variants={fadeUp}
                custom={0.2}
                style={{
                  fontSize: '1.8rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  minHeight: '2.4rem',
                }}
              >
                <TypewriterText />
              </motion.div>

              <motion.p
                className="hero-subtitle"
                variants={fadeUp}
                custom={0.3}
              >
                I develop AI-driven applications, 3D user interfaces, and robust cross-platform software.
              </motion.p>

              <motion.div className="hero-actions" variants={fadeUp} custom={0.4}>
                <motion.a
                  href="#projects"
                  className="btn-primary"
                  whileHover={{ scale: 1.07, boxShadow: '0 0 25px rgba(157,78,221,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  className="btn-secondary"
                  whileHover={{ scale: 1.07, borderColor: 'var(--primary)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={fadeUp}
                custom={0.55}
                className="hero-stats"
              >
                {[
                  { label: 'Projects Built', value: 12, suffix: '+' },
                  { label: 'Months Experience', value: 9, suffix: 'mo' },
                  { label: 'Tech Stacks', value: 15, suffix: '+' },
                ].map((s) => (
                  <div key={s.label} className="hero-stat">
                    <span className="hero-stat-num text-gradient">
                      <Counter target={s.value} suffix={s.suffix} />
                    </span>
                    <span className="hero-stat-label">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 80, filter: 'blur(12px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="float-animation hero-img"
          >
            <img
              src="/hero_desktop.png"
              alt="3D Setup"
              style={{
                width: '100%',
                maxWidth: '450px',
                filter: 'drop-shadow(0 0 50px rgba(0, 212, 255, 0.55))',
                borderRadius: '1rem',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} color="var(--text-muted)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ─────────────────────────────────── */}
      <section id="about">
        <div className="container">
          <FadeIn>
            <h2 className="section-title">
              Computer <span className="text-gradient">Engineer</span>
            </h2>
          </FadeIn>
          <div className="about-grid">
            <FadeIn direction="left">
              <TiltCard className="glass-card">
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  Computer Engineer with a foundation in software engineering and smart technology solutions,
                  focused on building AI-driven web and mobile applications. Adept at engineering scalable
                  software and designing intuitive interfaces, while actively learning IoT systems.
                  <br /><br />
                  Continually adapting to new AI tools to deliver efficient, real-world solutions. Combines
                  technical proficiency with sharp problem-solving skills to meet the demands of an evolving
                  tech landscape.
                </p>
              </TiltCard>
            </FadeIn>
            <motion.div
              className="skills-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {skills.map((skill, index) => (
                <motion.div key={skill.category} variants={scaleIn} custom={index * 0.08}>
                  <TiltCard className="glass-card" style={{ padding: '1.5rem' }}>
                    <motion.div
                      style={{ color: 'var(--primary)', marginBottom: '1rem' }}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                      transition={{ duration: 0.4 }}
                    >
                      {skill.icon}
                    </motion.div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{skill.category}</h3>
                    <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {skill.items.map((item) => (
                        <li key={item} style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>◆</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────── */}
      <section id="experience" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: '4rem' }}>
              Work & <span className="text-gradient">Education</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                icon: <Briefcase />,
                color: 'var(--primary)',
                title: 'Mobile App Developer (Internship)',
                company: 'Dreams Network & Tech',
                period: 'Jul 2025 – Feb 2026',
                desc: 'Engineered and deployed Live Energy Monitoring and SaaS Complaint Portal apps for iOS/Android/Web. Integrated real-time data APIs and embedded custom AI chatbots for automated user support. Maintained production-grade architecture focusing on high-performance UI/UX.',
              },
              {
                icon: <Briefcase />,
                color: 'var(--primary)',
                title: 'Software Programmer (Internship)',
                company: 'Stanify',
                period: 'Sep 2025 – Jan 2026',
                desc: 'Developed Python/Selenium automation scripts for social media interaction management. Conducted QA and performance testing for STANIFY Co-Pilot AI to ensure response reliability.',
              },
              {
                icon: <GraduationCap />,
                color: '#67e8f9',
                title: 'Computer Engineering (Ongoing)',
                company: 'Sir Syed University of Engineering & Technology',
                period: '2023 – 2027',
                desc: null,
              },
            ].map((item, i) => (
              <GlowCard key={i} color={item.color} delay={i * 0.15} style={{ borderLeft: `4px solid ${item.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <motion.div
                    style={{ color: item.color }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 style={{ fontSize: '1.4rem' }}>{item.title}</h3>
                </div>
                <p style={{ fontWeight: 600, color: item.color, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                  {item.company} | {item.period}
                </p>
                {item.desc && <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>}
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────── */}
      <section id="projects">
        <div className="container">
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: '4rem' }}>
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </FadeIn>
          <motion.div
            className="projects-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {projects.map((project, index) => (
              <GlowCard
                key={project.title}
                color={project.color}
                delay={index * 0.1}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: project.color,
                      boxShadow: `0 0 10px ${project.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <h3 style={{ fontSize: '1.3rem' }}>{project.title}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.7 }}>
                  {project.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.08 }}
                      style={{
                        background: `${project.color}22`,
                        color: project.color,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        border: `1px solid ${project.color}44`,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </GlowCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────── */}
      <section
        id="contact"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 80, 120, 0.25))',
        }}
      >
        <div className="container">
          <FadeIn>
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(157, 78, 221, 0.12)',
                border: '1px solid rgba(157, 78, 221, 0.3)',
                borderRadius: '2rem',
                padding: '0.4rem 1.2rem',
                fontSize: '0.85rem',
                color: 'var(--primary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                marginBottom: '2rem',
                letterSpacing: '0.05em',
              }}
            >
              <Sparkles size={14} />
              Open to opportunities
            </motion.div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              Ready to collaborate?
            </h2>
            <p
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-muted)',
                marginBottom: '3rem',
                maxWidth: '600px',
                margin: '0 auto 3rem auto',
              }}
            >
              I'm always open to discussing product design work or partnership opportunities. Let's create
              something extraordinary together.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                whileHover={{ scale: 1.07, boxShadow: '0 0 30px rgba(157,78,221,0.6)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={20} />
                Get In Touch
              </motion.button>
              <motion.a
                href="https://linkedin.com/in/khawaja-muzzammil-hussain-343273324"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                whileHover={{ scale: 1.07, borderColor: 'var(--primary)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Linkedin size={20} />
                LinkedIn
              </motion.a>
            </div>

            <div style={{ marginTop: '5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <p>© {new Date().getFullYear()} Khawaja Muzzammil Hussain. All rights reserved.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact Modal ─────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.85, y: 30, filter: 'blur(8px)' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="modal-content glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <X size={24} />
              </motion.button>

              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                Contact Info
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Feel free to reach out through any of these platforms.
              </p>

              {[
                { href: 'mailto:khawajamuzzammil.hussain@gmail.com', icon: <Mail size={24} />, label: 'Email', value: 'khawajamuzzammil.hussain@gmail.com' },
                { href: 'tel:+923128911722', icon: <Phone size={24} />, label: 'Phone', value: '+92-3128911722' },
                { href: 'https://linkedin.com/in/khawaja-muzzammil-hussain-343273324', icon: <Linkedin size={24} />, label: 'LinkedIn', value: 'khawaja-muzzammil-hussain', external: true },
                { icon: <MapPin size={24} />, label: 'Location', value: 'Karachi, Pakistan' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="contact-item"
                      {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.label}</div>
                        <div className="contact-info-text">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="contact-item">
                      <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.label}</div>
                        <div className="contact-info-text">{item.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
