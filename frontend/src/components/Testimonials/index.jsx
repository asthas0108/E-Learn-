import React from 'react';
import styles from "./styles.module.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
  ];

  return (
    <section className={styles.test}>
      <h2 className={styles.heading}>What Our Students Say</h2>
      <div className={styles.test_cards}>
        {testimonialsData.map((e) => (
          <div className={styles.test_card} key={e.id}>
            <div className={styles.image}>
              <img src={e.image} alt={e.name} />
            </div>
            <FaQuoteLeft className={styles.quoteIcon} />
            <p className={styles.message}>{e.message}</p>
            <div className={styles.info}>
              <p className={styles.name}>{e.name}</p>
              <p className={styles.position}>{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;


