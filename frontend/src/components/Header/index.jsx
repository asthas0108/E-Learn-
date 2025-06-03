import React from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';


export default function Header() {

  const router = useRouter();
  const {isAuth} = useUser();

  return (
    <header className={styles.header}>
        <div className={styles.logo} onClick={() => {
          router.push("/")
        }}>ElevateU</div>

        <div className={styles.link}>
          <p onClick={() => {
            router.push("/")
          }} style={{cursor: "pointer"}}>Home</p>

          <p onClick={() => {
            router.push("/courses")
          }} style={{cursor: "pointer"}}>Courses</p>

          <p onClick={() => {
            router.push("/about")
          }} style={{cursor: "pointer"}}>About</p>

          {
            isAuth ? 
            <p onClick={() => {
              router.push("/account")
            }} style={{cursor: "pointer"}}>Account</p>
            :
            <p onClick={() => {
              router.push("/login")
            }} style={{cursor: "pointer"}}>Login</p>
          }
        </div>
    </header>
  )
};





// import React, { useState, useRef, useEffect } from 'react';
// import styles from "./styles.module.css";
// import { useRouter } from 'next/router';
// import { useUser } from '@/context/UserContext';
// import {
//   FaHome,
//   FaBook,
//   FaInfoCircle,
//   FaUserCircle,
//   FaSignInAlt,
//   FaPhone,
//   FaBars,
//   FaTimes,
//   FaChevronDown
// } from 'react-icons/fa';

// export default function Header() {
//   const router = useRouter();
//   const { user, isAuth } = useUser(); // you can expand this to include user name/image
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [courseDropdown, setCourseDropdown] = useState(false);
//   const [avatarDropdown, setAvatarDropdown] = useState(false);
//   const avatarRef = useRef(null);

//   const handleRoute = (path) => {
//     router.push(path);
//     setMenuOpen(false);
//     setCourseDropdown(false);
//     setAvatarDropdown(false);
//   };

//   // Close avatar dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setAvatarDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <header className={styles.header}>
//       <div className={styles.logo} onClick={() => handleRoute("/")}>
//         Elevate<span className={styles.highlight}>U</span>
//       </div>

//       <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </div>

//       <nav className={`${styles.link} ${menuOpen ? styles.open : ""}`}>
//         <p onClick={() => handleRoute("/")}>
//           <FaHome /> Home
//         </p>

//         <div
//           className={styles.dropdownWrapper}
//           onMouseEnter={() => setCourseDropdown(true)}
//           onMouseLeave={() => setCourseDropdown(false)}
//         >
//           <p style={{ cursor: "pointer" }}>
//             <FaBook /> Courses <FaChevronDown size={12} />
//           </p>
//           {courseDropdown && (
//             <div className={styles.dropdown}>
//               <p onClick={() => handleRoute("/courses")}>All Courses</p>
//               {isAuth && <p onClick={() => handleRoute(`/dashboard/${user._id}`)}>My Courses</p>}
//               {/* <p onClick={() => handleRoute("/categories")}>Categories</p> */}
//             </div>
//           )}
//         </div>

//         <p onClick={() => handleRoute("/about")}>
//           <FaInfoCircle /> About
//         </p>

//         <p onClick={() => handleRoute("/contact")}>
//           <FaPhone /> Contact
//         </p>

//         {isAuth ? (
//           <div className={styles.avatarWrapper} ref={avatarRef}>
//             <div className={styles.avatar} onClick={() => setAvatarDropdown(!avatarDropdown)}>
              
//               <p >
//                 <FaUserCircle size={22} />{" "}Profile
//               </p>
//             </div>
//             {avatarDropdown && (
//               <div className={styles.avatarDropdown}>
//                 <p onClick={() => handleRoute("/account")}>Account</p>
//                 {/* <p onClick={() => handleRoute("/settings")}>Settings</p>
//                 <p onClick={() => handleRoute("/logout")}>Logout</p> */}
//               </div>
//             )}
//           </div>
//         ) : (
//           <p onClick={() => handleRoute("/login")}>
//             <FaSignInAlt /> Login
//           </p>
//         )}
//       </nav>
//     </header>
//   );
// }


