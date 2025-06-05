import React from 'react';
import styles from "./styles.module.css";
import { useParams } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';

const PaymentSuccess = () => {

    const params = useParams();
    const router = useRouter()
    const {user} = useUser();

  return (
    <div className={styles.page}>
        { user && <div className={styles.msg}>
            <h2>Payment Successfull !</h2>
            <p>Your course subscription has been activated.</p>
            <p>Reference No:- {params.id}</p>
            <button onClick={() => router.push(`/dashboard/${user._id}`)} className={styles.btn}>Go to Dashboard</button>
        </div> }
    </div>
  )
} 

export default PaymentSuccess;