import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "../../data/nav";
import { MagneticButton } from "../../animations/MagneticButton";
import { gsap } from "../../lib/gsap";
import { useMotionPrefs } from "../../lib/SmoothScrollProvider";
import { trackEvent } from "../../lib/analytics";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { lenis, reducedMotion } = useMotionPrefs();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastScrollY.current;
      if (y < 120) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileRef.current) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        mobileRef.current.querySelectorAll(".nav__mobile-link"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActiveHref(`#${topMost.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    event.preventDefault();
    setOpen(false);
    if (lenis && !reducedMotion) {
      lenis.scrollTo(target, { duration: 1.3 });
    } else {
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
        <a href="#top" className="nav__logo" onClick={(e) => handleNavClick(e, "#top")}>
          <img src="/brand/opnexusNewLogo.png" alt="" className="nav__logo-mark" />
          OP<span>.</span>NEXUS
        </a>

        <nav className="nav__links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__link ${activeHref === link.href ? "is-active" : ""}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <MagneticButton className="nav__cta">
            <a
              href="#cta"
              className="btn btn--primary"
              onClick={(e) => {
                handleNavClick(e, "#cta");
                trackEvent("cta_click", { location: "nav" });
              }}
            >
              Start a Project
              <ArrowUpRight />
            </a>
          </MagneticButton>
          <button
            className={`nav__toggle ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className="nav__mobile" ref={mobileRef}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__mobile-link ${activeHref === link.href ? "is-active" : ""}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="nav__mobile-link nav__mobile-link--accent"
            onClick={(e) => handleNavClick(e, "#cta")}
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  );
}
