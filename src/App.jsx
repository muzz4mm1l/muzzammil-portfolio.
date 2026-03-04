import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
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
  Menu
} from 'lucide-react';
import Scene from './components/Scene';

function FadeIn({ children, delay = 0, className = '', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const skills = [
  { category: "Engineering & AI", items: ["AI-Driven Apps", "UI/UX Design", "Deployment (iOS/Android)"], icon: <Cpu /> },
  { category: "Web Stacks", items: ["React.js", "Next.js", "HTML5/CSS3"], icon: <Layout /> },
  { category: "Mobile Apps", items: ["React Native", "iOS", "Android Native"], icon: <Smartphone /> },
  { category: "Languages", items: ["Python", "C/C++", "Java", "JavaScript", "PHP"], icon: <Code2 /> },
  { category: "Database & Tools", items: ["MySQL", "XAMPP", "WordPress"], icon: <Database /> },
  { category: "Design", items: ["Canva", "VS Code", "Problem Solving"], icon: <Monitor /> },
];

const projects = [
  {
    title: "Energy Monitoring (EMS)",
    desc: "Professional-grade mobile app built with React Native and Expo to monitor real-time energy consumption visually.",
    tags: ["React Native", "Expo", "Real-Time APIs"]
  },
  {
    title: "SaaS Complaint Portal",
    desc: "Cross-platform SaaS solution for grievance management with a secure backend architecture and real-time updates.",
    tags: ["Web", "iOS", "Android", "Backend"]
  },
  {
    title: "Face Detection AI",
    desc: "AI system capable of detecting and categorizing real-time facial expressions (joy, anger, sadness) via image processing.",
    tags: ["Python", "Computer Vision", "AI"]
  },
  {
    title: "Pac-Man Engine",
    desc: "Fully functional game using Pygame featuring ghost AI pathfinding, scoring systems, and custom logic.",
    tags: ["Python", "Pygame", "AI"]
  },
  {
    title: "Smart Security IoT",
    desc: "Integrated hardware/software with Laser Security and Password Door Lock managed via an Arduino custom interface.",
    tags: ["IoT", "Arduino", "C++"]
  },
  {
    title: "Car Rental Platform",
    desc: "Full-stack web app featuring a dynamic booking module and personalized, secure user authentication.",
    tags: ["Full Stack", "Authentication"]
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div className="bg-mesh" />
      <nav className="navbar">
        <div className="container nav-container">
          <div className="nav-logo" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code2 size={32} color="var(--primary)" />
            Muzzammil
          </div>

          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <Scene />
        <div className="container hero-container">
          <div className="hero-text">
            <FadeIn>
              <h1 className="hero-title">
                Hi, I'm <span className="text-gradient">Muzzammil</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="hero-subtitle">
                I develop AI-driven applications, 3D user interfaces, and robust cross-platform software.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="hero-actions">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
            </FadeIn>
          </div>

          <FadeIn delay={0.6} className="float-animation hero-img">
            <img src="/hero_desktop.png" alt="3D Setup" style={{ width: '100%', maxWidth: '450px', filter: 'drop-shadow(0 0 40px rgba(157, 78, 221, 0.4))', borderRadius: '1rem' }} />
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <FadeIn>
            <h2 className="section-title">
              Computer <span className="text-gradient">Engineer</span>
            </h2>
          </FadeIn>
          <div className="about-grid">
            <FadeIn className="glass-card">
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                Computer Engineer with a foundation in software engineering and smart technology solutions, focused on building AI-driven web and mobile applications. Adept at engineering scalable software and designing intuitive interfaces, while actively learning IoT systems.
                <br /><br />
                Continually adapting to new AI tools to deliver efficient, real-world solutions. Combines technical proficiency with sharp problem-solving skills to meet the demands of an evolving tech landscape.
              </p>
            </FadeIn>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <FadeIn key={skill.category} delay={index * 0.1} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{skill.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{skill.category}</h3>
                  <ul style={{ listStyle: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {skill.items.map(item => <li key={item} style={{ marginBottom: '0.3rem' }}>• {item}</li>)}
                  </ul>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: '4rem' }}>
              Work & <span className="text-gradient">Education</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <FadeIn className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Briefcase color="var(--primary)" />
                <h3 style={{ fontSize: '1.5rem' }}>Mobile App Developer (Internship)</h3>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Dreams Network & Tech | Jul 2025 – Feb 2026</p>
              <p style={{ color: 'var(--text-muted)' }}>
                Engineered and deployed Live Energy Monitoring and SaaS Complaint Portal apps for iOS/Android/Web.
                Integrated real-time data APIs and embedded custom AI chatbots for automated user support.
                Maintained production-grade architecture focusing on high-performance UI/UX.
              </p>
            </FadeIn>

            <FadeIn className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Briefcase color="var(--secondary)" />
                <h3 style={{ fontSize: '1.5rem' }}>Software Programmer (Internship)</h3>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Stanify | Sep 2025 – Jan 2026</p>
              <p style={{ color: 'var(--text-muted)' }}>
                Developed Python/Selenium automation scripts for social media interaction management.
                Conducted QA and performance testing for STANIFY Co-Pilot AI to ensure response reliability.
              </p>
            </FadeIn>

            <FadeIn className="glass-card" style={{ borderLeft: '4px solid #fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <GraduationCap color="#fff" />
                <h3 style={{ fontSize: '1.5rem' }}>Computer Engineering (Ongoing)</h3>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>2023 – 2027 | Sir Syed University of Engineering & Technology</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div className="container">
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: '4rem' }}>
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {projects.map((project, index) => (
              <FadeIn key={project.title} delay={index * 0.1} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{project.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ background: 'rgba(157, 78, 221, 0.2)', color: '#e0aaff', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, transparent, rgba(60, 9, 108, 0.2))' }}>
        <div className="container">
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Ready to collaborate?</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              I'm always open to discussing product design work or partnership opportunities. Let's create something extraordinary together.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                <Mail size={20} />
                Get In Touch
              </button>
              <a href="https://linkedin.com/in/khawaja-muzzammil-hussain-343273324" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>

            <div style={{ marginTop: '4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <p>&copy; {new Date().getFullYear()} Khawaja Muzzammil Hussain. All rights reserved.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="modal-content glass-card"
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>

              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Contact Info</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Feel free to reach out through any of these platforms.</p>

              <a href="mailto:khawajamuzzammil.hussain@gmail.com" className="contact-item">
                <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Email</div>
                  <div className="contact-info-text">khawajamuzzammil.hussain@gmail.com</div>
                </div>
              </a>

              <a href="tel:+923128911722" className="contact-item">
                <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Phone</div>
                  <div className="contact-info-text">+92-3128911722</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/khawaja-muzzammil-hussain-343273324" target="_blank" rel="noreferrer" className="contact-item">
                <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <Linkedin size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>LinkedIn</div>
                  <div className="contact-info-text">khawaja-muzzammil-hussain</div>
                </div>
              </a>

              <div className="contact-item">
                <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Location</div>
                  <div className="contact-info-text">Karachi, Pakistan</div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
