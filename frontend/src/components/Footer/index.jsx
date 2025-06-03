import React from 'react';
import styles from "./styles.module.css";
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footer_content}>
        <p className={styles.para}>
          &copy; 2025 Your E-Learning Platform. All rights reserved.
          <br/>
          Made with ❤️ by <a href=''>Astha Singh</a>
        </p>
        <div className={styles.social_links}>
          <a href=''><AiFillFacebook/></a>
          <a href=''><AiFillTwitterSquare/></a>
          <a href=''><AiFillInstagram/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;