// import React from 'react';
// import styles from "./styles.module.css";

// const Testimonial = () => {

//     const testimonialsData = [
//         {
//           id: 1,
//           name: "John Doe",
//           position: "Student",
//           message:
//             "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
//           image:
//             "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
//         },
//         {
//           id: 2,
//           name: "Jane Smith",
//           position: "Student",
//           message:
//             "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
//           image:
//             "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//         },
//         {
//           id: 3,
//           name: "John Doe",
//           position: "Student",
//           message:
//             "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
//           image:
//             "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
//         },
//         {
//           id: 4,
//           name: "Jane Smith",
//           position: "Student",
//           message:
//             "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
//           image:
//             "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//         },
//       ];

//   return (
//     <section className={styles.test}>
//         <h2>What Our Students Say</h2>
//         <div className={styles.test_cards}>
//             {
//                 testimonialsData.map((e) => {
//                     return(
//                         <div className={styles.test_card} key={e.id}>
//                             <div className={styles.image}>
//                                 <img src={e.image}/>
//                             </div>
//                             <p className={styles.message}>{e.message}</p>
//                             <div className={styles.info}>
//                                 <p className={styles.name}>{e.name}</p>
//                                 <p className={styles.position}>{e.position}</p>
//                             </div>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     </section>
//   )
// }

// export default Testimonial;



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
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
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


// import React from "react";
// import styles from "./styles.module.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// const Testimonial = () => {
//   const testimonialsData = [
//     {
//       id: 1,
//       name: "John Doe",
//       position: "Student",
//       message:
//         "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
//       image:
//         "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       position: "Student",
//       message:
//         "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
//       image:
//         "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//     },
//     {
//       id: 3,
//       name: "Alice Johnson",
//       position: "Student",
//       message:
//         "I absolutely love this platform! It's well-structured and fun to use.",
//       image:
//         "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       id: 4,
//       name: "Michael Brown",
//       position: "Student",
//       message:
//         "The instructors here are very knowledgeable. I always look forward to learning new things!",
//       image:
//         "https://randomuser.me/api/portraits/men/45.jpg",
//     },
//   ];

//   return (
//     <section className={styles.test}>
//       <h2>What Our Students Say</h2>
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop={true}
//         spaceBetween={40}
//         slidesPerView={1}
//         breakpoints={{
//           768: {
//             slidesPerView: 2,
//           },
//           1024: {
//             slidesPerView: 3,        // 3 cards on desktop (1024px+)
//           },
//         }}
//         className={styles.testSwiper}
//       >
//         {testimonialsData.map((e) => (
//           <SwiperSlide key={e.id}>
//             <div className={styles.test_card}>
//               <div className={styles.image}>
//                 <img src={e.image} alt={e.name} />
//               </div>
//               <p className={styles.message}>"{e.message}"</p>
//               <div className={styles.info}>
//                 <p className={styles.name}>{e.name}</p>
//                 <p className={styles.position}>{e.position}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default Testimonial;

