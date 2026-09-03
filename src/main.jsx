import React, { useEffect, useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

/* ── Constants ── */
const SITE = "https://lalibelacuisine.com";
const RESERVATION = `${SITE}/book-table-african-food-toronto/`;
const MENU_URL = `${SITE}/best-ethiopian-toronto-menu/`;
const ORDER = "https://order.orderonthego.com/web/Lalibela-Cuisine/main";
const PHONE = "(416) 645-0486";
const PHONE_LINK = `tel:${PHONE.replace(/\D/g, "")}`;
const ADDRESS = "1214 Danforth Ave, Toronto, ON M4J 1M6";
const MAP_QUERY = "1214%20Danforth%20Ave%20Toronto%20ON%20M4J%201M6";
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const FACEBOOK = "https://www.facebook.com/Lalibelacuisine";
const INSTAGRAM = "https://www.instagram.com/";

/* ── Menu Highlights ── */
const menuHighlights = [
  {
    title: "Breakfast",
    text: "Begin with traditional Ethiopian breakfast favorites, freshly prepared each morning.",
    image: "/images/food/breakfast.jpg",
  },
  {
    title: "Lunch & Dinner",
    text: "Rich, comforting dishes made for sharing — lamb, chicken, beef, and combination plates.",
    image: "/images/food/lunch-dinner.jpg",
  },
  {
    title: "Vegetarian",
    text: "A generous selection of flavorful vegetable dishes rooted in Ethiopian tradition.",
    image: "/images/food/vegetarian.jpg",
  },
  {
    title: "Coffee Ceremony",
    text: "Experience Ethiopian coffee roasted and prepared in the traditional way.",
    image: "/images/coffee/ceremony.jpg",
  },
];

/* ── Gallery Data ── */
const galleryImages = [
  { src: "/images/restaurant/interior-dining.jpeg", label: "Dining room" },
  { src: "/images/restaurant/interior-bar.jpeg", label: "Restaurant bar" },
  { src: "/images/restaurant/interior-decor.jpeg", label: "Ethiopian décor" },
  { src: "/images/restaurant/interior-seating.jpeg", label: "Traditional seating" },
  { src: "/images/restaurant/interior-art.jpeg", label: "Cultural artwork" },
  { src: "/images/restaurant/interior-atmosphere.jpeg", label: "Restaurant atmosphere" },
  { src: "/images/food/breakfast.jpg", label: "Ethiopian breakfast" },
  { src: "/images/food/lunch-dinner.jpg", label: "Traditional dishes" },
  { src: "/images/food/vegetarian.jpg", label: "Vegetarian platter" },
  { src: "/images/coffee/ceremony.jpg", label: "Coffee ceremony" },
  { src: "/images/gallery/gallery-interior-1.jpg", label: "Restaurant interior" },
  { src: "/images/gallery/gallery-interior-2.jpg", label: "Dining space" },
  { src: "/images/gallery/gallery-interior-3.jpg", label: "Authentic atmosphere" },
  { src: "/images/gallery/gallery-interior-4.jpg", label: "Warm ambiance" },
  { src: "/images/gallery/gallery-interior-5.jpg", label: "Lalibela Cuisine" },
];

/* ================================================================
   SVG ICONS
   ================================================================ */
function Icon({ name, className }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 6.27 6.27l1.28-1.27a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92Z" />
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    facebook: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    order: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}

/* ================================================================
   SCROLL REVEAL HOOK
   ================================================================ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ================================================================
   MAIN APP
   ================================================================ */
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  /* Scroll listener for header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll for lightbox / mobile nav */
  useEffect(() => {
    document.body.style.overflow =
      lightbox !== null || mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox, mobileOpen]);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i + 1) % galleryImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const scrollTo = useCallback(
    (id) => {
      setMobileOpen(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    },
    []
  );

  return (
    <div className="site">
      {/* ── HEADER ── */}
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container nav-bar">
          <button
            className="brand"
            onClick={() => scrollTo("home")}
            aria-label="Lalibela Cuisine home"
          >
            <img
              src="/images/branding/logo.png"
              alt="Lalibela Cuisine"
              className="brand-logo"
            />
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("story")}>Our Story</button>
            <button onClick={() => scrollTo("menu")}>Menu</button>
            <button onClick={() => scrollTo("coffee")}>Coffee Ceremony</button>
            <button onClick={() => scrollTo("gallery")}>Gallery</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn--outline btn--small"
              href={RESERVATION}
              target="_blank"
              rel="noreferrer"
            >
              Reserve
            </a>
            <a
              className="btn btn--primary btn--small"
              href={ORDER}
              target="_blank"
              rel="noreferrer"
            >
              Order Online
            </a>
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      {/* ── MOBILE NAV ── */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <button
          className="mobile-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <Icon name="close" />
        </button>
        <button onClick={() => scrollTo("home")}>Home</button>
        <button onClick={() => scrollTo("story")}>Our Story</button>
        <button onClick={() => scrollTo("menu")}>Menu</button>
        <button onClick={() => scrollTo("coffee")}>Coffee Ceremony</button>
        <button onClick={() => scrollTo("gallery")}>Gallery</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>
        <div className="mobile-nav-actions">
          <a href={RESERVATION} target="_blank" rel="noreferrer">
            Reserve a Table
          </a>
          <a href={ORDER} target="_blank" rel="noreferrer">
            Order Online
          </a>
        </div>
      </div>

      <main>
        {/* ── HERO ── */}
        <section id="home" className="hero">
          <div
            className="hero-image"
            style={{
              backgroundImage:
                "url(/images/restaurant/interior-dining.jpeg)",
            }}
          />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">
              AUTHENTIC ETHIOPIAN CUISINE · TORONTO
            </p>
            <h1>
              A taste of Ethiopia,
              <br />
              <em>served with warmth.</em>
            </h1>
            <p className="hero-copy">
              Traditional Ethiopian cuisine, authentic décor, and the
              hospitality that makes every visit feel like coming home.
            </p>
            <div className="hero-buttons">
              <a
                className="btn btn--primary"
                href={RESERVATION}
                target="_blank"
                rel="noreferrer"
              >
                Reserve a Table <Icon name="arrow" />
              </a>
              <a
                className="btn btn--light"
                href={MENU_URL}
                target="_blank"
                rel="noreferrer"
              >
                Explore the Menu
              </a>
            </div>
          </div>
          <div className="hero-badge">
            <span className="line" />
            <span>Traditional Ethiopian hospitality</span>
          </div>
        </section>

        {/* ── QUICK ACTIONS ── */}
        <section className="quick-actions">
          <div className="container">
            <div className="quick-grid">
              <a href={RESERVATION} target="_blank" rel="noreferrer" className="quick-card">
                <span className="quick-card__number">01</span>
                <span className="quick-card__icon">
                  <Icon name="calendar" />
                </span>
                <h3 className="quick-card__title">Reserve a Table</h3>
                <p className="quick-card__desc">Book your dining experience and join us for an authentic Ethiopian meal.</p>
                <span className="quick-card__cta">
                  Book Now <Icon name="arrow" />
                </span>
              </a>
              <a href={ORDER} target="_blank" rel="noreferrer" className="quick-card">
                <span className="quick-card__number">02</span>
                <span className="quick-card__icon">
                  <Icon name="order" />
                </span>
                <h3 className="quick-card__title">Order Online</h3>
                <p className="quick-card__desc">Enjoy our traditional dishes from the comfort of your home, delivered fresh.</p>
                <span className="quick-card__cta">
                  Start Order <Icon name="arrow" />
                </span>
              </a>
              <a href={PHONE_LINK} className="quick-card">
                <span className="quick-card__number">03</span>
                <span className="quick-card__icon">
                  <Icon name="phone" />
                </span>
                <h3 className="quick-card__title">Call Us</h3>
                <p className="quick-card__desc">Have questions or need help? Reach us directly at {PHONE}.</p>
                <span className="quick-card__cta">
                  Call Now <Icon name="arrow" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section id="story" className="story">
          <div className="container story-grid">
            <Reveal>
              <div className="story-image-wrap">
                <img
                  src="/images/restaurant/interior-decor.jpeg"
                  alt="Lalibela Cuisine interior with authentic Ethiopian décor"
                  loading="lazy"
                />
                <div className="story-caption">
                  <span>01</span>
                  <span>Our home in Toronto</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="story-text">
                <p className="eyebrow eyebrow--dark">OUR STORY</p>
                <h2>
                  Welcome to
                  <br />
                  <em>Lalibela Cuisine</em>
                </h2>
                <div className="ornament">
                  <span />
                  <i>✦</i>
                  <span />
                </div>
                <p>
                  Lalibela Cuisine is a family-run restaurant serving Ethiopian
                  cuisine with authentic décor. We are proud to serve great
                  dishes with traditional Ethiopian hospitality and to bring the
                  best of Ethiopia to Toronto.
                </p>
                <p>
                  Our menu brings together meat and vegetable dishes, including
                  lamb, chicken, beef, and combination plates. Come share a
                  meal, slow down, and experience Ethiopian food the way it is
                  meant to be enjoyed.
                </p>
                <ul className="checks">
                  <li>Authentic Ethiopian cuisine</li>
                  <li>Traditional hospitality</li>
                  <li>A warm, welcoming atmosphere</li>
                </ul>
                <a
                  className="text-link"
                  href={MENU_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  View our menu <Icon name="arrow" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOD SHOWCASE ── */}
        <section id="menu" className="menu-section">
          <div className="container">
            <Reveal>
              <div className="section-header">
                <div>
                  <p className="eyebrow eyebrow--dark">FROM OUR KITCHEN</p>
                  <h2>
                    Discover the flavors
                    <br />
                    <em>of Ethiopia</em>
                  </h2>
                </div>
                <a
                  className="text-link"
                  href={MENU_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  View full menu <Icon name="arrow" />
                </a>
              </div>
            </Reveal>

            <div className="menu-grid">
              {menuHighlights.map((item, i) => (
                <Reveal key={item.title} delay={i < 4 ? i : 0}>
                  <a
                    className="menu-card"
                    href={MENU_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="menu-card-image">
                      <img
                        src={item.image}
                        alt={`${item.title} at Lalibela Cuisine`}
                        loading="lazy"
                      />
                      <span className="card-number">0{i + 1}</span>
                    </div>
                    <div className="menu-card-body">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <span className="menu-card-link">
                        Explore <Icon name="arrow" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── COFFEE CEREMONY ── */}
        <section id="coffee" className="coffee">
          <div className="coffee-image">
            <img
              src="/images/coffee/ceremony.jpg"
              alt="Ethiopian coffee ceremony at Lalibela Cuisine"
              loading="lazy"
            />
          </div>
          <div className="coffee-content">
            <p className="eyebrow">A TRADITION TO SHARE</p>
            <h2>
              The Ethiopian
              <br />
              <em>Coffee Ceremony</em>
            </h2>
            <div className="gold-rule" />
            <p>
              Coffee is more than a drink in Ethiopia. It is an invitation to
              sit, talk, connect, and enjoy the moment. At Lalibela Cuisine, the
              traditional ceremony includes roasting coffee beans on the spot,
              filling the room with its unmistakable aroma.
            </p>
            <p>
              Take your time and experience Ethiopian hospitality through one of
              its most cherished traditions.
            </p>
            <a
              className="btn btn--light"
              href={MENU_URL}
              target="_blank"
              rel="noreferrer"
            >
              Discover the experience
            </a>
          </div>
        </section>

        {/* ── RESTAURANT EXPERIENCE ── */}
        <section className="experience">
          <div className="container">
            <Reveal>
              <div className="center-heading">
                <p className="eyebrow eyebrow--dark">THE RESTAURANT</p>
                <h2>
                  A place to <em>gather</em>
                </h2>
                <p>
                  Authentic details, warm surroundings, and a table made for
                  sharing.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="experience-grid">
                <div className="exp-tall">
                  <img
                    src="/images/restaurant/interior-entrance.jpeg"
                    alt="Lalibela Cuisine restaurant entrance"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="/images/restaurant/interior-bar.jpeg"
                    alt="Lalibela Cuisine bar area"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img
                    src="/images/restaurant/interior-art.jpeg"
                    alt="Ethiopian cultural artwork at Lalibela Cuisine"
                    loading="lazy"
                  />
                </div>
                <div className="exp-wide">
                  <img
                    src="/images/restaurant/interior-wide.jpeg"
                    alt="Lalibela Cuisine wide dining view"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section id="gallery" className="gallery-section">
          <div className="container">
            <Reveal>
              <div className="gallery-header">
                <div>
                  <p className="eyebrow eyebrow--dark">FROM OUR SPACE</p>
                  <h2>
                    See you at <em>Lalibela</em>
                  </h2>
                </div>
                <p className="gallery-note">
                  Real photographs from the restaurant and its authentic
                  Ethiopian atmosphere.
                </p>
              </div>
            </Reveal>
            <div className="gallery-grid">
              {galleryImages.slice(0, 6).map((item, i) => (
                <button
                  key={item.src}
                  className={`gallery-item ${
                    i === 0
                      ? "gallery-item--tall"
                      : i === 3
                      ? "gallery-item--wide"
                      : ""
                  }`}
                  onClick={() => setLightbox(i)}
                  aria-label={`View ${item.label}`}
                >
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <span className="gallery-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESERVATION CTA ── */}
        <section className="reservation">
          <div className="container reservation-inner">
            <div>
              <p className="eyebrow">YOUR TABLE IS WAITING</p>
              <h2>
                Come hungry.
                <br />
                <em>Leave with a story.</em>
              </h2>
            </div>
            <a
              className="btn btn--light"
              href={RESERVATION}
              target="_blank"
              rel="noreferrer"
            >
              Book a Table <Icon name="arrow" />
            </a>
          </div>
        </section>

        {/* ── CONTACT / LOCATION ── */}
        <section id="contact" className="contact">
          <div className="container contact-grid">
            <div className="contact-info">
              <p className="eyebrow eyebrow--dark">VISIT US</p>
              <h2>
                Find your way
                <br />
                <em>to Lalibela</em>
              </h2>
              <p className="contact-intro">
                We are proud to serve authentic Ethiopian cuisine in Toronto.
                Call us or reserve a table before your visit.
              </p>
              <div className="contact-list">
                <a href={MAP_LINK} target="_blank" rel="noreferrer">
                  <span className="contact-icon">
                    <Icon name="map" />
                  </span>
                  <div>
                    <b>Address</b>
                    <small>
                      1214 Danforth Ave
                      <br />
                      Toronto, ON M4J 1M6
                    </small>
                  </div>
                </a>
                <a href={PHONE_LINK}>
                  <span className="contact-icon">
                    <Icon name="phone" />
                  </span>
                  <div>
                    <b>Phone</b>
                    <small>{PHONE}</small>
                  </div>
                </a>
              </div>
              <div className="contact-buttons">
                <a
                  className="btn btn--primary"
                  href={RESERVATION}
                  target="_blank"
                  rel="noreferrer"
                >
                  Reserve a Table
                </a>
                <a
                  className="btn btn--outline-dark"
                  href={ORDER}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order Online
                </a>
              </div>
            </div>
            <div className="map-wrap">
              <iframe
                title="Lalibela Cuisine location"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="map-label"
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <img
              src="/images/branding/logo.png"
              alt="Lalibela Cuisine"
              className="footer-brand-logo"
            />
            <p>
              Authentic Ethiopian cuisine and traditional hospitality in
              Toronto, on the Danforth.
            </p>
          </div>

          <div className="footer-col">
            <h3>Explore</h3>
            <button onClick={() => scrollTo("story")}>Our Story</button>
            <button onClick={() => scrollTo("menu")}>Menu</button>
            <button onClick={() => scrollTo("coffee")}>Coffee Ceremony</button>
            <button onClick={() => scrollTo("gallery")}>Gallery</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </div>

          <div className="footer-col">
            <h3>Visit</h3>
            <span>1214 Danforth Ave</span>
            <span>Toronto, ON M4J 1M6</span>
            <a href={PHONE_LINK}>{PHONE}</a>
          </div>

          <div className="footer-col">
            <h3>Connect</h3>
            <div className="socials">
              <a
                href={FACEBOOK}
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="facebook" />
              </a>
              <a
                href={INSTAGRAM}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="instagram" />
              </a>
            </div>
            <a
              className="footer-order"
              href={ORDER}
              target="_blank"
              rel="noreferrer"
            >
              Order online <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Lalibela Cuisine</span>
          <span>Authentic Ethiopian cuisine · Toronto</span>
        </div>
      </footer>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={() => setLightbox(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery"
          >
            <Icon name="close" />
          </button>
          <button
            className="lightbox-arrow lightbox-arrow--prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                (lightbox - 1 + galleryImages.length) % galleryImages.length
              );
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].label}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-arrow lightbox-arrow--next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % galleryImages.length);
            }}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="lightbox-counter">
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* ── FLOATING CALL ── */}
      <a
        className="floating-call"
        href={PHONE_LINK}
        aria-label="Call Lalibela Cuisine"
      >
        <Icon name="phone" />
      </a>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);