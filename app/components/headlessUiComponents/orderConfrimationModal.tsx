"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Check, X, Info } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "failed";
  data: {
    email: string;
    orderNumber: string;
    date: string;
    paymentMethod: string;
    cartItems: {product: Product,quantity: number,subtotal: number;}[];
    total: string | number;
  };
}

export default function PaymentConfirmation({ isOpen, onClose, status, data }: PaymentModalProps) {
  const isSuccess = status === "success";

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center md:p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full h-full md:h-auto md:w-full md:max-w-md md:rounded-3xl bg-white flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-8 flex flex-col">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`${isSuccess ? 'bg-green-500' : 'bg-red-500'} rounded-full p-4`}>
                      {isSuccess ? (
                        <Check className="w-8 h-8 text-white" />
                      ) : (
                        <X className="w-8 h-8 text-white" />
                      )}
                    </div>
                  </div>
                  <h1 className="text-2xl custom3 tracking-header text-black">
                    {isSuccess ? "Payment Completed" : "Payment Failed"}
                  </h1>
                  <p className="text-sm text-(--secondary) tracking-body title-font2  mt-2">
                    {isSuccess 
                      ? "Your order has been placed successfully! A confirmation email has been sent." 
                      : "Something went wrong with your transaction. Please try again or contact support."}
                  </p>
                </div>

                {/* Details Section */}
                <div className="space-y-4 mb-8 border-t border-gray-200 pt-6 flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-(--secondary) tracking-body title-font2 ">Date</span>
                    <span className="text-sm text-black title-font2 tracking-body">{data.date}</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-(--secondary) tracking-body title-font2 ">Payment Method</span>
                    <span className="text-sm text-black title-font2 tracking-body">{data.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-(--secondary) tracking-body title-font2 ">Email Address</span>
                    <span className="text-sm text-black title-font2 tracking-body">{data.email}</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-(--secondary) tracking-body title-font2 ">Order Number</span>
                    <span className="text-sm text-black title-font2 tracking-body">{isSuccess ? data.orderNumber : "N/A"}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs font-medium text-(--secondary) tracking-body title-font2  mb-3">Purchased Items</p>
                    <ul className="space-y-2">
                      {data.cartItems.map((item, idx) => (
                        <li key={idx} className="text-sm text-black title-font2 tracking-body truncate">
                          {item.product.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <span className=" text-black title-font2 tracking-body">Total</span>
                    <span className="text-lg tt text-black tracking-body">
                       {data.total}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={onClose}
                  className={`w-full h-10 px-4 py-2 ${isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-black hover:opacity-80'} text-white text-sm tracking-body title-font2 cursor-pointer rounded-lg transition-all`}
                >
                  {isSuccess ? "Continue Shopping" : "Try Again"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}