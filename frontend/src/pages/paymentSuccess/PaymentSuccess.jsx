import React from 'react';
import styles from "./styles.module.css";
import { useParams } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const PaymentSuccess = () => {

    const params = useParams();

    const {user} = useUser();

  return (
    <div className={styles.page}>
        { user && <div className={styles.msg}>
            <h2>Payment Successfull !</h2>
            <p>Your course subscription has been activated.</p>
            <p>Reference No:- {params.id}</p>
            <a href={`${user._id}/dashboard`} className={styles.btn}>Go to Dashboard</a>
        </div> }
    </div>
  )
}

export default PaymentSuccess;