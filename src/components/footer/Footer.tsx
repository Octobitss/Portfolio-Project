import { navLinks, footerServiceLinks } from "../../data/nav";
import { CONTACT_EMAIL, CONTACT_PHONE, gmailComposeUrl } from "../../lib/email";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="nav__logo">
            OP<span>.</span>NEXUS
          </span>
          <p className="text-body footer__tagline">We build the systems behind modern business.</p>
          <a href={gmailComposeUrl()} target="_blank" rel="noreferrer" className="footer__link">
            {CONTACT_EMAIL}
          </a>
          <a href={`tel:${CONTACT_PHONE}`} className="footer__link">
            {CONTACT_PHONE}
          </a>
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
        <span>© {new Date().getFullYear()} OPNexus.</span>
        <span>Designed &amp; engineered in-house.</span>
      </div>
    </footer>
  );
}
