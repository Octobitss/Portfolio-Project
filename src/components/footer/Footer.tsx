import { navLinks, footerServiceLinks } from "../../data/nav";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="nav__logo">
            SASS<span>.</span>SYSTEMS
          </span>
          <p className="text-body footer__tagline">We build the systems behind modern business.</p>
        </div>

        <nav className="footer__col">
          <span className="eyebrow">Navigate</span>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <span className="eyebrow">What We Build</span>
          {footerServiceLinks.map((link) => (
            <a key={link.label} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} SASS Systems.</span>
        <span>Designed &amp; engineered in-house.</span>
      </div>
    </footer>
  );
}
