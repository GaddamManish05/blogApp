import React from "react";

import {
  footerClass,
  footerContainer,
  footerGrid,
  footerBrand,
  footerText,
  footerHeading,
  footerLinks,
  footerLink,
  footerContact,
  footerBottom,
  footerSmallText
} from "../styles/Common";

function Footer() {
  return (
    <footer className={footerClass}>

      <div className={footerContainer}>

        {/* Top */}
        <div className={footerGrid}>

          {/* Brand */}
          <div>
            <h2 className={footerBrand}>BlogSpace</h2>
            <p className={footerText}>
              A modern platform for developers and creators to share knowledge,
              ideas, and experiences with the world.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <h3 className={footerHeading}>Quick Links</h3>
            <div className="flex flex-col gap-2 relative left-37">
              <a href="/" className={footerLink}>Home</a>
              <a href="/register" className={footerLink}>Register</a>
              <a href="/login" className={footerLink}>Login</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className={footerHeading}>Contact</h3>
            <div className={footerLinks}>
              <p className={footerContact}>support@blogspace.com</p>
              <p className={footerContact}>Hyderabad, India</p>
              <p className={footerContact}>+91 98765 43210</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className={footerBottom}>
          <p className={footerSmallText}>
            © 2026 BlogSpace. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className={footerLink}>Privacy</a>
            <a href="#" className={footerLink}>Terms</a>
            <a href="#" className={footerLink}>Support</a>
          </div>
        </div>

      </div>

    </footer>
  );
}

export default Footer;