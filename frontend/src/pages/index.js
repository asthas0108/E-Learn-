// import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Testimonial from "@/components/Testimonials";
import { UserLayout } from "@/layout/UserLayout";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const Home = () => {

  const router = useRouter();
return (
    <>
      <UserLayout>
        <HeroSection/>
        <Testimonial />
      </UserLayout>

      <Footer />
    </>
  );

}

export default Home;
