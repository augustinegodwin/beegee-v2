"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import bot from '../../assets/images/bot.png'
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import { PaymentForm } from "../../components/utils/payment-form";
import { useProductStore } from "@/app/store/products.store";
import { useAuthStore } from "@/app/store/auth.store";
import AuthRequiredPage from "@/app/components/utils/authpage";
import EmptyCart from "@/app/components/utils/nocartIems";
import { formatPrice } from "@/app/components/utils/formatPrice";



export default function CheckoutPage() {
  const router = useRouter();
  const {selectedProduct,setSelectedProduct,cartItems}=useProductStore()
  const {user,isLoading}=useAuthStore()
  const [showOrderSummary, setShowOrderSummary] = useState(false);

 
   if (!cartItems.length && user) {
       return (
        <div className="w-full min-h-[90vh] max-h-[900px] py-25 px-5 flex justify-center items-center">
          <EmptyCart/>
        </div>
       )
    }
    if (!user) {
       return (
        <div className="w-full min-h-[90vh] max-h-[900px] py-25 px-5 flex justify-center items-center">
          <AuthRequiredPage/>
        </div>
       )
    }
  if(user && cartItems.length) return (
   <div className="w-full lg:px-10 bg-white">
     <div className=" pt-18.75 max-w-[1200px] m-auto w-full ">
      {/* Header */}
      {/* <header className="w-full p-5  lg:hidden border-b border-gray-200">
          <div className="max-w-[1200px] m-auto w-full">
            <Link href="/" className="flex items-center w-fit gap-2 text-black tracking-body title-font2 bg-gray-100 px-3 py-2 rounded-[12px]">
             
                  <div className="bg-(--card)  flex size-6 items-center justify-center rounded-md">
                    
                    <Image
                      className="w-full h-full"
                      alt="Logo"
                      title="Skiilink Ventures Limited."
                      src={bot}
                      />
                  </div>
                  Beegee.
                
            </Link>
            </div>
      </header> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Form */}
        <div className="order-2 lg:order-1 px-4 sm:px-10 lg:px-0  py-8 lg:py-12 min-h-screen">
          <div className="max-w-xl lg:max-w-full mx-auto lg:ml-auto lg:mr-0">
           
      {/* <Link href="/" className="mb-5 hidden lg:flex items-center w-fit gap-2  text-black tracking-body title-font2 bg-gray-100 px-3 py-2 rounded-[12px]">
             
                  <div className="bg-(--card) flex size-6 items-center justify-center rounded-md">
                    
                    <Image
                      className="w-full h-full"
                      alt="Logo"
                      title="Skiilink Ventures Limited."
                      src={bot}
                      />
                  </div>
                  beegee.
                
            </Link> */}
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm mb-8">
              
              
              <span
                className="text-(--secondary) title-font2 text-base" >
                Payment
              </span>
            </nav>

            {/* Form Content */}
            <div>
              
               <PaymentForm />
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t tracking-body title-font2 border-gray-200 text-center text-sm text-(--secondary)">
              All rights reserved beegee.com.ng. &copy; 2026
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-1  lg:order-2 lg:min-h-screen h-full -b lg:border-b-0-l border-gray-200">
          {/* Mobile: Collapsible Summary */}
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className={`lg:hidden w-full px-4 py-4 flex items-center ${showOrderSummary?"border-b":""} border-gray-200 justify-between bg-gray-50`}
          >
          <div className="w-full max-w-xl m-auto flex items-center justify-between">
              <div className="flex items-center space-x-2 max-w-xl">
              <span className="text-sm text-(--secondary) tracking-body title-font2">
                {showOrderSummary ? "Hide" : "Show"} order summary
              </span>
              {showOrderSummary ? (
                <ChevronUp className="w-4 h-4  text-(--secondary)" />
              ) : (
                <ChevronDown className="w-4 h-4  text-(--secondary)" />
              )}
            </div>
            <div className="text-lg text-black tt tracking-body">{formatPrice(cartItems[0].subtotal + 350)}</div>
          </div>
          </button>

          {/* Order Summary Content */}
          <div
            className={`${
              showOrderSummary ? "block" : "hidden"
            } lg:block px-4  sticky top-0 sm:px-6 lg:pl-12 xl:pl-16 py-8 lg:py-12`}
          >
            <div className="max-w-xl  mx-auto lg:mr-auto lg:ml-0">
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => {
                  const productId =
                    item.product._id.toString();
                  const productName =item.product.title ;
                  const productdesc =item.product.description ;
                  const productImage =item.product.image[0]?.url ;

                  return (
                    <div key={productId} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src={productImage}
                          alt={productName}
                          width={100}
                          height={100}
                          className="object-cover size-full  "
                        />
                        
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm tracking-body title-font2 text-black line-clamp-2">
                          {productName}
                        </p>
                        {cartItems[0].product.description && (
                          <p className="text-sm tracking-body title-font2 text-(--secondary) line-clamp-1">
                            {productdesc}
                          </p>
                        )}
                      </div>
                      <div className="text-sm tracking-body tt text-black">
                        {formatPrice(cartItems[0].subtotal)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-(--secondary) tracking-body title-font2">
                    Subtotal · {cartItems[0].quantity} {cartItems[0].product.forSale ? "items" :"hours"}
                  </span>
                  <span className="text-black tracking-body tt">{formatPrice(cartItems[0].subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-(--secondary) tracking-body title-font2">Shipping</span>
                  <span className="text-black tracking-body tt ">{formatPrice(350)}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="text-lg text-black title-font2 ">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-xs text-(--secondary) title-font2 mr-2">NGN</span>
                  <span className="text-2xl text-black tt tracking-body">
                    {formatPrice(cartItems[0].subtotal + 350)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
