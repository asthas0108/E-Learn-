// import React from 'react';
// import styles from "./styles.module.css";
// import { useCourse } from '@/context/CourseContext';
// import CourseCard from '@/components/CourseCard/CourseCard';
// import { UserLayout } from '@/layout/UserLayout';

// const Dashboard = () => { 

//     const {myCourse} = useCourse();

//   return (
//     <UserLayout>
//         <div className={styles.dashboard}>
//             <h2>All Enrolled Courses</h2>
//             <div className={styles.content}>
//                 {
//                     myCourse && myCourse.length > 0 ?
//                     myCourse.map((e) => {
//                         return <CourseCard key={e._id} course={e}/>
//                     })
//                     :
//                     <p>No Courses Enrolled</p>
//                 }
//             </div>
//         </div>
//     </UserLayout>
//   )
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import { useCourse } from '@/context/CourseContext';
import CourseCard from '@/components/CourseCard/CourseCard';
import Recommendation from '../../components/Recommendation/Recommendation';
import { UserLayout } from '@/layout/UserLayout';

const Dashboard = () => {
  const { myCourse, courses } = useCourse();  // ⬅️ use `courses` instead of `allCourses`
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(() => {
    if (myCourse?.length) {
      const ids = myCourse.map(course => course._id || course.id);
      setCompletedIds(ids);
    }
  }, [myCourse]);

  return (
    <UserLayout>
      <div className={styles.dashboard}>
        <h2>Your Enrolled Courses</h2>
        <div className={styles.content}>
          {myCourse && myCourse.length > 0 ? (
            myCourse.map((e) => (
              <CourseCard key={e._id} course={e} />
            ))
          ) : (
            <p>No Courses Enrolled</p>
          )}
        </div>

        {/* 🔽 Recommendations Section */}
        <div className={styles.recommendationSection}>
          <Recommendation allCourses={courses} completedCourseIds={completedIds} />
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
