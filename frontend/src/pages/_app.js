import { CourseContextProvider } from "@/context/CourseContext";
import { UserContextProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import Script from "next/script";




export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <CourseContextProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <Component {...pageProps} />
      </CourseContextProvider>
    </UserContextProvider>
  )
}
