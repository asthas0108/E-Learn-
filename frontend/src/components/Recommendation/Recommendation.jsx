// import { useEffect, useState } from "react";
// import styles from "./styles.module.css";

// const Recommendation = ({ allCourses, completedCourseIds }) => {
//   const [recommended, setRecommended] = useState([]);

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/recommend", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//             body: JSON.stringify({
//             courses: allCourses.map((course) => ({
//                 id: course._id, // ✅ rename `_id` to `id`
//                 title: course.title,
//                 description: course.description,
//                 category: course.category,
//                 image: course.image,
//             })),
//             completedCourseIds,
//             }),
//         });

//         const data = await response.json();
//         if (data?.recommendedCourses) {
//             setRecommended(data.recommendedCourses);
//             }
//             else {
//           console.error(data.error || "Recommendation failed");
//         }
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//       }
//     };

//     if (allCourses.length && completedCourseIds.length) {
//       fetchRecommendations();
//     }
//   }, [allCourses, completedCourseIds]);

//   if (!recommended.length) {
//     return <p className={styles.message}>No recommendations available right now.</p>;
//   }

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Recommended For You</h2>
//       <div className={styles.grid}>
//         {recommended.map((course) => (
//           <div key={course.id} className={styles.card}>
//             <img src={course.image} alt={course.title} className={styles.image} />
//             <h3 className={styles.title}>{course.title}</h3>
//             <p className={styles.description}>{course.description}</p>
//             <span className={styles.category}>{course.category}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Recommendation;


import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Recommendation = ({ allCourses, completedCourseIds }) => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courses: allCourses.map((course) => ({
              id: course._id,
              title: course.title,
              description: course.description,
              category: course.category,
              image: course.image,
            })),
            completedCourseIds,
          }),
        });

        const data = await response.json();
        if (data?.recommendedCourses) {
          setRecommended(data.recommendedCourses);
        } else {
          console.error(data.error || "Recommendation failed");
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (allCourses.length && completedCourseIds.length) {
      fetchRecommendations();
    }
  }, [allCourses, completedCourseIds]);

  if (!recommended.length) {
    return <p className={styles.message}>No recommendations available right now.</p>;
  }

  // ✅ Group by category
  const groupedByCategory = recommended.reduce((acc, course) => {
    if (!acc[course.category]) acc[course.category] = [];
    acc[course.category].push(course);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Course Recommendations For You</h2>
      <p className={styles.para}>Based on your recent learning activity, we’ve handpicked a few courses that align with your interests and goals. These recommendations are tailored to help you build on what you’ve already explored and take your skills to the next level.</p>
      {Object.entries(groupedByCategory).map(([category, courses]) => (
        <div key={category}>
          <h3 className={styles.subheading}>{category}</h3>
          <div className={styles.grid}>
            {courses.map((course) => (
              <div key={course.id} className={styles.card}>
                <img src={course.image} alt={course.title} className={styles.image} />
                <h3 className={styles.title}>{course.title}</h3>
                <p className={styles.description}>{course.description}</p>
                <span className={styles.category}>{course.category}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
