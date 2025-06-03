import React, { useState } from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';

const Verify = () => {

  const router = useRouter();

  const { verifyOTP, btnLoading } = useUser();

  const [otp, setOtp] = useState("");

  const submitHandler = async(e) => {
    e.preventDefault();
    await verifyOTP(Number(otp));
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 style={{textAlign: "center"}}>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <div>
            <input type='number' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} required/>
          </div>
          <button type='submit' disabled={btnLoading} className={styles.btn}>
            {btnLoading ? "Please Wait..." : "Verify"}
          </button>
        </form>
        <p className={styles.line} onClick={() => {
          router.push("/login");
        }} style={{cursor: "pointer", color: "blue"}}>Go to Login page</p>
      </div>
    </div>
  )
}

export default Verify;