import React from 'react';
import styles from './styles.module.css';
import { FaPlay } from 'react-icons/fa';
import { BsCalendarEvent, BsCheckCircle } from 'react-icons/bs';
import { useRouter } from 'next/router';

const HeroSection = () => {
    const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>
          <span className={styles.highlight}>Studying</span> Online is now<br /> much easier
        </h1>
        <p className={styles.desc}>
          Welcome to ElevateU, where learning knows no bounds. 
          <br/>
          We believe that education is the key to personal and professional growth <br/>We're here to guide you on your journey to success. 
        </p>
        <div className={styles.buttons}>
          <button className={styles.joinBtn} onClick={() => router.push("/courses")}>Get Started</button>
          {/* <button className={styles.playBtn}>
            <FaPlay size={12} /> <span>Watch how it works</span>
          </button> */}
        </div>
      </div>

      <div className={styles.right}>
        <img src="/assets/girl.png" alt="Student Girl" className={styles.heroImg} />

        {/* <div className={`${styles.card} ${styles.card1}`}>
          <BsCalendarEvent size={20} />
          <div>
            <h4>250k</h4>
            <p>Assisted Student</p>
          </div>
        </div> */}

        {/* <div className={`${styles.card} ${styles.card2}`}>
          <div className={styles.avatar}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
            <span className={styles.onlineDot}></span>
          </div>
          <div>
            <h4>User Experience Class</h4>
            <p>Today at 12.00 PM</p>
          </div>
          <button className={styles.joinNowBtn}>Join Now</button>
        </div> */}

        {/* <div className={`${styles.card} ${styles.card3}`}>
          <BsCheckCircle size={20} />
          <div>
            <h4>Congratulations</h4>
            <p>Your admission completed</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
