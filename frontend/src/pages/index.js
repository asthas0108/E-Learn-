// import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Testimonial from "@/components/Testimonials";
import { UserLayout } from "@/layout/UserLayout";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const Home = () => {

  const router = useRouter();

  // return (
  //   <>
  //   <UserLayout>
  //     <div>
  //       <div className={styles.home}>
  //         <div className={styles.home_content}>
  //           <p>Learn, Grow & Excel</p>
  //           <h1>Welcome, to our E-Learning Platform !</h1>
  //           <button className={styles.btn} onClick={() => {
  //             router.push("/courses")
  //           }}>Get Started</button>
  //         </div>
  //         <div className={styles.right}>
  //           <img src="/assets/elearn.png" alt="E-learning illustration" />
  //         </div>
  //       </div>
  //       <Testimonial/>
  //     </div>
  //   </UserLayout>
    
  //   <Footer/>
  //   </>
  // )
return (
    <>
      <UserLayout>
        <main className={styles.home}>
          <section className={styles.homeContent}>
            <p className={styles.tagline}>Learn, Grow & Excel</p>
            <h1 className={styles.title}>Welcome to our E-Learning Platform!</h1>
            <button 
              className={styles.btn} 
              onClick={() => router.push("/courses")}
              aria-label="Get Started with Courses"
            >
              Get Started
            </button>
          </section>
          <aside className={styles.imageContainer}>
            <img
              src="/assets/elearn.png"
              alt="E-learning illustration"
              className={styles.heroImage}
              loading="lazy"
            />
          </aside>
        </main>
        <Testimonial />
      </UserLayout>

      <Footer />
    </>
  );

}

export default Home;
