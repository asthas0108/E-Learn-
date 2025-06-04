import React from "react";
import styles from "./styles.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.column}>
          <div className={styles.logo}>Elevate<span className={styles.highlight}>U</span></div>
          <p className={styles.desc}>
            We are not here to sell you products, we sell value through our expertise.
          </p>
          <div className={styles.socialIcons}>
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>

        <div className={styles.column}>
          <p><strong>Address:</strong><br />
            38 opebi Road, Ikeja, Lagos State, Nigeria.</p>
          <p><strong>Phone:</strong><br /> +2349022396389</p>
          <p><strong>Email:</strong><br /> xyz@gmail.com</p>
        </div>

        <div className={styles.column}>
          <p><strong>Company</strong></p>
          <p>About Us</p>
          <p>Features</p>
          <p>Pricing</p>
        </div>
      </div>

      <div className={styles.subscribeSection}>
        <p className={styles.subscribeText}>Subscribe to get latest updates</p>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="Your Email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
