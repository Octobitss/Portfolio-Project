import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "../../data/nav";
import { MagneticButton } from "../../animations/MagneticButton";
import { gsap } from "../../lib/gsap";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#top" className="nav__logo">
          SASS<span>.</span>SYSTEMS
        </a>

        <nav className="nav__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <MagneticButton className="nav__cta">
            <a href="#cta" className="btn btn--primary">
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
              className="nav__mobile-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="nav__mobile-link nav__mobile-link--accent"
            onClick={() => setOpen(false)}
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  );
}
