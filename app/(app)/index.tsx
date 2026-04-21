"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { NetworkErrorModal } from "../components/headlessUiComponents/networkErrorModal";
import Loading from "./loading";
export default function  AppLayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const {fetchAuthenticatedUser,isLoading,isAuthenticated,networkError,setNetworkError}=useAuthStore()
      useEffect(()=>{
        fetchAuthenticatedUser()
      },[])
    if (isLoading) {
        return (
          <Loading/>
        );
    }else{
      return (
        <>
        {children}
        <NetworkErrorModal isOpen={networkError} onClose={()=>setNetworkError(false)} onRetry={fetchAuthenticatedUser}/>
        </>
      )
    }
  
}
