import React from 'react';
import styles from "./styles.module.css";
import { UserLayout } from '@/layout/UserLayout';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
        <UserLayout>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 style={{textAlign: "center"}}>WELCOME</h2>
                    <div>
                        <p>We believe that education is the key to unlocking your full potential, and our mission is to make learning accessible, engaging, and impactful for everyone. Whether you're a student, a professional looking to upskill, or someone eager to explore new fields, we offer a diverse range of high-quality courses designed to empower you.</p>
                    </div>
                    <div>
                        <h2>Our Vision</h2>
                        <p>Our vision is to create a global learning community where knowledge is shared freely, learning is personalized, and every learner has the resources they need to thrive in today’s fast-paced world. We aim to bridge the gap between education and real-world application, giving learners the tools they need to succeed in their careers and personal growth.</p>
                    </div>
                </div>
            </div>
        </UserLayout>
        <Footer/>
    </>
  )
} 

export default About;