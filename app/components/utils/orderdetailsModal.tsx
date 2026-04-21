"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancel from '@/app/assets/images/cancel.svg';
import bootle from '@/app/assets/images/bottle.jpg';
import { Check, Dot, Gift, Minus, Phone, Plus, ShoppingBag, X } from "lucide-react";
import Image from 'next/image';
import { useProductStore } from "@/app/store/products.store";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/store/auth.store";
import { OrderStateButton } from "./orderStateButton";
import OrderTimeline from "./timeline";
import { formatPrice } from "./formatPrice";
import { StatusBadge } from "./statusBadge";

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderDetails: OrderDetails;
}
const OrderState = (user: User, order: OrderDetails) => {
  const status = order.status;
  const isSale = order.forSale;
  const isSeller = user._id === order.user._id;
  const isCustomer = user._id === order.renter._id;

  let buttonText = "";
  let isDisabled = false;
  let onClickAction = () => {}; // Hook this up to your update functions

  // --- FOR SALE FLOW ---
  if (isSale) {
    if (isSeller) {
      if (status === "paid") buttonText = "Mark as Delivered";
      else if (status === "delivered") { buttonText = "Awaiting Confirmation"; isDisabled = true; }
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    } 
    else if (isCustomer) {
      if (status === "paid") { buttonText = "Awaiting Delivery"; isDisabled = true; }
      else if (status === "delivered") buttonText = "Confirm Receipt";
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    }
  } 

  // --- FOR RENT FLOW ---
  else {
    if (isSeller) {
      if (status === "paid") buttonText = "Mark as Delivered";
      else if (status === "delivered") { buttonText = "Awaiting Customer Receipt"; isDisabled = true; }
      else if (status === "return") buttonText = "Confirm Return & Complete";
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    } 
    else if (isCustomer) {
      if (status === "paid") { buttonText = "Awaiting Delivery"; isDisabled = true; }
      else if (status === "delivered") buttonText = "Mark as Received";
      else if (status === "return") { buttonText = "Awaiting Seller Confirmation"; isDisabled = true; }
      else if (status === "completed") { buttonText = "Order Completed"; isDisabled = true; }
    }
  }

  // Fallback if no state matches
  if (!buttonText) return null;

  return (
    <button 
      disabled={isDisabled}
      onClick={onClickAction}
      className="flex-1 flex gap-2 disabled:opacity-60 justify-center items-center px-5 h-10 title-font2 text-white cursor-pointer bg-black transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm"
    >
      {buttonText}
    </button>
  );
};
export function OrderDetailsModal({ isOpen, onClose, orderDetails }: OrderDetailsModalProps) {
    const [quantity, setQuantity] = useState(1);
    const { user,getCookie } = useAuthStore()
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>

                {/* Backdrop Animation */}
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

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center ">
                        <div className="w-full h-[40px] hidden lg:flex justify-center absolute top-0 left-0">
                            <div className="w-full flex justify-end items-center cursor-pointer" onClick={onClose} >
                                <div className="size-10 flex items-center justify-center"><X className="size-6 cursor-pointer text-white" /></div>

                            </div>
                        </div>
                        {/* Modal Pop-in Animation */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-10"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-10"
                        >
                            <Dialog.Panel className="relative w-full px-4 sm:px-10 bg-white flex justify-center h-[calc(100vh-40px)] overflow-y-scroll">

                                {/* YOUR ORIGINAL UI START */}
                                <div className="relative max-w-[550px] lg:max-w-[1200px] w-full h-fit py-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                                        <div className="flex flex-col gap-5">
                                            <div className="relative hidden lg:flex w-full aspect-square lg:aspect-[0.92/1] bg-gray-200 rounded-2xl overflow-hidden">
                                                <Image
                                                        src={orderDetails.item.image[0].url}
                                                        alt={orderDetails.item.title}
                                sizes="100vw"
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-full rounded-2xl object-cover"
                                                        />
                                            </div>
                                            <div className='w-full h-30 py-2'>
                                                <div className="h-full rounded-2xl flex justify-center outline-2 outline-green-600 aspect-square">
                                                    <Image
                            src={orderDetails.item.image[0].url}
                             alt={orderDetails.item.title}
                             sizes="100vw"           
                            width={100}
                            height={100}
                            className="w-full h-full border-3 border-transparent rounded-2xl object-cover"
                          />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <div className='flex flex-col gap-1'>
                                                <div className="w-full flex justify-between gap-5">
                                                    <p className="text-black text-lg leading-body tracking-body custom3 ">
                                                        Order #{orderDetails._id}
                                                    </p>
                                                    <StatusBadge status={orderDetails.status} />
                                                </div>
                                                <p className="text-(--secondary) inline-flex text-sm leading-body tracking-body title-font ">
                                                    Oct 29,2026 <Dot size={14} /> {formatPrice(orderDetails.subtotal)}
                                                </p>
                                            </div>
                                            <div className='flex flex-col gap-4'>
                                                <span className="text-(--secondary) leading-body tracking-body title-font ">
                                                    Order Summary
                                                </span>
                                                <div className="w-full flex gap-5 flex-col">
                                                    <div className="w-full flex gap-5 items-center">
                                                        <div className="aspect-square overflow-hidden h-15 rounded-2xl bg-gray-100">
                                                             <Image
                            src={orderDetails.item.image[0].url}
                             alt={orderDetails.item.title}
                             sizes="100vw"           
                            width={100}
                            height={100}
                            className="w-full h-full border-3 border-transparent rounded-2xl object-cover"
                          />
                                                        </div>
                                                        <div className="flex-1 flex flex-col gap-1">
                                                            <span className="text-black line-clamp-2 leading-body tracking-body title-font ">
                                                                {orderDetails.item.title}

                                                            </span>
                                                            <p className="text-(--secondary) inline-flex items-center text-sm leading-body tracking-body title-font ">
                                                                Category <Dot size={14} /> {orderDetails.item.category}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full border-t border-dashed border-gray-200 flex flex-col gap-4 pt-5">
                                                        <div className="w-full flex justify-between">
                                                            <span className="text-(--secondary) inline-flex text-sm leading-body tracking-body title-font ">
                                                                Subtotal
                                                            </span>
                                                            <span className="text-black inline-flex text-sm leading-body tracking-body title-font ">
                                                                {formatPrice(orderDetails.subtotal)}
                                                            </span>

                                                        </div>
                                                        <div className="w-full flex justify-between">
                                                            <span className="text-(--secondary) inline-flex text-sm leading-body tracking-body title-font ">
                                                                Shipping fee
                                                            </span>
                                                            <span className="text-black inline-flex text-sm leading-body tracking-body title-font ">
                                                                {formatPrice(350.00)}
                                                            </span>

                                                        </div>
                                                        <div className="w-full flex justify-between">
                                                            <span className="text-(--secondary) inline-flex text-sm leading-body tracking-body title-font ">
                                                                Total
                                                            </span>
                                                            <span className="text-black inline-flex text-sm leading-body tracking-body title-font ">
                                                                {formatPrice(orderDetails.subtotal + 350)}
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                orderDetails.user._id === user?.user._id ?<div className='flex flex-col gap-4 border-t border-dashed border-gray-200 pt-5'>
                                                <span className="text-(--secondary) leading-body tracking-body title-font ">
                                                    Customer / Buyer
                                                </span>
                                                <div className="w-full">
                                                    <div className="w-full flex gap-5 items-center">
                                                        <div className="aspect-square h-12 rounded-lg overflow-hidden bg-gray-100">
                                                            <Image
                                                                src={orderDetails.renter.profileImage}
                                                                alt="Sellers icon"
                                                                width={100}
                                                                height={100}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 flex flex-col gap-1">
                                                            <span className="text-black line-clamp-1 leading-body tracking-body title-font ">{orderDetails.renter.name} </span>
                                                            <p className="text-(--secondary) inline-flex text-sm leading-body tracking-body title-font ">
                                                                {orderDetails.renter.phoneNumber}
                                                            </p>
                                                        </div>
                                                        <Link href={`tel:${orderDetails.renter.phoneNumber}`} className="aspect-square h-10 rounded-xl bg-blue-100 flex justify-center items-center">
                                                            <Phone
                                                                size={20}
                                                                className="text-blue-600"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>:<div className='flex flex-col gap-4 border-t border-dashed border-gray-200 pt-5'>
                                                <span className="text-(--secondary) leading-body tracking-body title-font ">
                                                    Seller / Renter
                                                </span>
                                                <div className="w-full">
                                                    <div className="w-full flex gap-5 items-center">
                                                        <div className="aspect-square h-12 rounded-lg overflow-hidden bg-gray-100">
                                                            <Image
                                                                src={orderDetails.user.profileImage}
                                                                alt="Sellers icon"
                                                                width={100}
                                                                height={100}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 flex flex-col gap-1">
                                                            <span className="text-black line-clamp-1 leading-body tracking-body title-font ">{orderDetails.user.name} </span>
                                                            <p className="text-(--secondary) inline-flex text-sm leading-body tracking-body title-font ">
                                                                {orderDetails.user.phoneNumber}
                                                            </p>
                                                        </div>
                                                        <Link href={`tel:${orderDetails.renter.phoneNumber}`} className="aspect-square h-10 rounded-xl bg-blue-100 flex justify-center items-center">
                                                            <Phone
                                                                size={20}
                                                                className="text-blue-600"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            {user?.user && orderDetails && <OrderTimeline user={user.user} order={orderDetails}/>}
                                        </div>
                                    </div>
                                </div>
                                {/* YOUR ORIGINAL UI END */}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

}