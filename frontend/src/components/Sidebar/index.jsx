// import React from 'react';
// import styles from "./styles.module.css";
// import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
// import { FaBook, FaUserAlt } from 'react-icons/fa';

// const Sidebar = () => {
//   return(
//     <div className={styles.sidebar}>
//       <ul>
//         <li>
//           <a href={'/admin'}>
//             <div className={styles.icon}>
//               <AiFillHome/>
//             </div>
//             <span>Home</span>
//           </a>
//         </li>

//         <li>
//           <a href={'/admin/courses'}>
//             <div className={styles.icon}>
//               <FaBook/>
//             </div>
//             <span>Courses</span>
//           </a>
//         </li>

//         <li>
//           <a href={'/admin/users'}>
//             <div className={styles.icon}>
//               <FaUserAlt/>
//             </div>
//             <span>Users</span>
//           </a>
//         </li>

//         <li>
//           <a href={'/account'}>
//             <div className={styles.icon}>
//               <AiOutlineLogout/>
//             </div>
//             <span>Logout</span>
//           </a>
//         </li>
//       </ul>
//     </div>
//   )
// }

// export default Sidebar;

import React from 'react';
import styles from "./styles.module.css";
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaBook, FaUserAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <a href="/admin">
            <div className={styles.icon}><AiFillHome /></div>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/admin/courses">
            <div className={styles.icon}><FaBook /></div>
            <span>Courses</span>
          </a>
        </li>
        <li>
          <a href="/admin/users">
            <div className={styles.icon}><FaUserAlt /></div>
            <span>Users</span>
          </a>
        </li>
        <li>
          <a href="/account">
            <div className={styles.icon}><AiOutlineLogout /></div>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
