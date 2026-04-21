"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axiosInstance from '@/app/lib/axios';
import { updateOrder } from '@/app/lib/async_data';
import { useAuthStore } from '@/app/store/auth.store';
import { NetworkErrorModal } from '../headlessUiComponents/networkErrorModal';
import { SuccessModal } from '../headlessUiComponents/successModal';

export const OrderStateButton = ({ 
  user, 
  order 
}: { 
  user: User, 
  order: OrderDetails 
}) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
    const { getCookie } = useAuthStore()
  const status = order.status;
  const isSale = order.forSale;
  const isSeller = user._id === order.user._id;
  const isCustomer = user._id === order.renter._id;

  let buttonText = "";
  let isDisabled = false;
  let nextStatus: "delivered" | "return" | "completed" | null = null;

  // --- FOR SALE FLOW ---
  if (isSale) {
    if (isSeller) {
      if (status === "paid") { buttonText = "Mark as Delivered"; nextStatus = "delivered"; }
      else if (status === "delivered") { buttonText = "Awaiting Confirmation"; isDisabled = true; }
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    } 
    else if (isCustomer) {
      if (status === "paid") { buttonText = "Awaiting Delivery"; isDisabled = true; }
      else if (status === "delivered") { buttonText = "Confirm Receipt"; nextStatus = "completed"; }
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    }
  } 

  // --- FOR RENT FLOW ---
  else {
    if (isSeller) {
      if (status === "paid") { buttonText = "Mark as Delivered"; nextStatus = "delivered"; }
      else if (status === "delivered") { buttonText = "Awaiting Customer Receipt"; isDisabled = true; }
      else if (status === "return") { buttonText = "Confirm Return & Complete"; nextStatus = "completed"; }
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    } 
    else if (isCustomer) {
      if (status === "paid") { buttonText = "Awaiting Delivery"; isDisabled = true; }
      else if (status === "delivered") { buttonText = "Mark as Received"; nextStatus = "return"; }
      else if (status === "return") { buttonText = "Awaiting Seller Confirmation"; isDisabled = true; }
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    }
  }
    const handleContinue = () => {
        // Force Next.js to re-fetch the server component data
        window.location.reload();
        
        // Sync the router cache
        router.push(window.location.pathname);
    };
  const handleUpdateStatus = async () => {
     const rfToken=getCookie("RFTFL")
    const acToken=getCookie("ACTFL")
    const signedCookies1={
      "accessToken":acToken,
      "refreshToken":rfToken
    }
  const signedCookies=JSON.stringify(signedCookies1)
    if (!nextStatus || isUpdating) return;
    const data ={
        orderId:order._id,
        status:nextStatus,
     signedCookies
    }
    setIsUpdating(true);
    try {
      const response =await updateOrder(order._id, data)
        if (response){
            setSuccess(true)
        }
    } catch (error) {
      setError(true)
    } finally {
      setIsUpdating(false);
    }
  };

  if (!buttonText) return null;
  return (
    <>
        <button 
            disabled={isDisabled || isUpdating}
            onClick={handleUpdateStatus}
            className="flex-1 w-full flex gap-2 disabled:opacity-60 justify-center items-center px-5 h-10 title-font2 text-white cursor-pointer bg-black transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm"
        >
        {isUpdating ? (
            <div className="flex items-center justify-center space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
        ) : (
            buttonText
        )}
        </button>
        <SuccessModal
            isOpen={success}
            onClose={handleContinue}
            title="Order updated successfully"
            message="The order progress has been saved. The timeline has been updated for both parties to see"
            onContinue={handleContinue}
            buttonData="Continue"
        />
        <NetworkErrorModal
            isOpen={error}
            onClose={()=>setError(false)}
            errorMessage="Unable to update order status. Please check your network connection and try again."
            errorTitle="Update Failed"onRetry={handleUpdateStatus}
        />
    </>
  );
};