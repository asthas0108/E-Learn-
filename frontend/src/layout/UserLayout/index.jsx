import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import React from 'react'
import Loading from "@/components/Loading";

export const UserLayout = ({children}) => {
  const {loading} = useUser();
  return (
    <>
      { loading ? 
        <Loading/>
        :
        (<div>
          <Header/>
          {children}
        </div>)
      }
    </>
  )
};
