"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancel from '@/app/assets/images/cancel.svg';
import bootle from '@/app/assets/images/bottle.jpg';
import { Minus, Plus, X } from "lucide-react";
import Image from 'next/image';
import { useProductStore } from "@/app/store/products.store";
import { redirect, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/auth.store";
import { sign } from "crypto";
import { formatPrice } from "./formatPrice";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void
}

export function ProductModal() {
  const [quantity, setQuantity] = useState(1);
  
  const { setSelectedProduct,selectedProduct,addToCart,clearCart } = useProductStore();
  const selected=selectedProduct?.title ? true:false
  const close=()=>{
    clearCart()
    setSelectedProduct(null)
    setQuantity(1)
  }
  const [total,setTotal]=useState(0)
  useEffect(()=>{
      setTotal(quantity * Number(selectedProduct?.price || 0))
  },[selectedProduct,quantity])
  const {user,getCookie}=useAuthStore()
  const rfToken=getCookie("RFTFL")
  const acToken=getCookie("ACTFL")
  const signedCookies1={
    "accessToken":acToken,
    "refreshToken":rfToken
  }
  const signedCookies=JSON.stringify(signedCookies1)
  function getExpectedReturnTime(rentHours:number) {
  const now = new Date();

  // Add rent hours + 1 hour saving grace
  return new Date(
    now.getTime() + (rentHours + 1) * 60 * 60 * 1000
  );

}
  const router=useRouter()
  // const makePayment =(subtotal, phoneNumber, name, orderData,email)=>{

  // }
  // const preparePayment=()=>{
  //   const orderdata={
  //   signedCookies,
  //   item:selectedProduct?._id,
  //   user:user?.user._id,
  //   phoneNumber: user?.user.phoneNumber,
  //       name: user?.user.name,
  //       address: user?.user.address,
  //       appartment: user?.user.appartment,
  //       rentHours:quantity,
  //       pricePerHour:selectedProduct?.price,
  //       subtotal:total,
  //       expectedReturnTime: getExpectedReturnTime(quantity),
  // }
  // makePayment(
  //     orderdata.subtotal,
  //     orderdata.phoneNumber,
  //     orderdata.name,
  //     orderdata,
  //     // email
  //   );
  // }
  if (selectedProduct) return (
    <Transition show={selected} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        
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
                <div className="w-full flex justify-end items-center cursor-pointer" onClick={close} >
                  <div className="size-10 flex items-center justify-center"><X  className="size-6 cursor-pointer text-white" /></div>
                  
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
              <Dialog.Panel className="relative w-full px-4 sm:px-10 bg-white flex justify-center h-screen lg:h-[calc(100vh-40px)] overflow-y-scroll">
                
                {/* YOUR ORIGINAL UI START */}
                <div className="relative max-w-[550px] lg:max-w-[1200px] w-full h-fit pt-0 lg:pt-10 pb-10">
                  <div className="w-full flex lg:hidden h-10 my-2 justify-end items-center cursor-pointer" onClick={close} >
                  <div className="size-10 hover:bg-gray-200 rounded-full flex items-center justify-center"><X  className="size-6 cursor-pointer text-gray-700" /></div>
                  
                </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    <div className="flex flex-col gap-5">
                      <div className="relative w-full aspect-square lg:aspect-[0.92/1] bg-gray-200 rounded-2xl overflow-hidden">
                        <Image
                          src={selectedProduct.image[0].url}
                          alt={selectedProduct.title}
 sizes="100vw"
                          width={100}
                          height={100}
                          className="w-full h-full rounded-2xl object-cover"
                        />
                      </div>
                      <div className='w-full h-30 py-2'>
                        <div className="h-full rounded-2xl flex justify-center outline-2 outline-green-600 aspect-square">
                          <Image
                            src={selectedProduct.image[0].url}
                            alt={selectedProduct.title}
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
                        <p className="text-(--secondary) leading-body tracking-body title-font ">
                          {selectedProduct.category}
                        </p>
                        <h2 className="text-3xl tracking-[-0.02em] text-black tt">
                          {selectedProduct.title}
                        </h2>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <span className="text-(--secondary) leading-body tracking-body title-font ">
                          Description
                        </span>
                        <p className="text-(--secondary) p-4 bg-(--card) rounded-xl leading-body tracking-body title-font ">
                          {selectedProduct.description}
                        </p>
                      </div>

                      <div className=" flex gap-3 flex-col">
                        <span className="text-(--secondary) leading-body tracking-body title-font ">
                          Price
                        </span>
                        <div className="flex items-baseline gap-4">
                          <span className="text-4xl tracking-body tt text-black">
                            {formatPrice(total)}
                          </span>
                          {!selectedProduct.forSale && (
                            <span className="text-lg title-font2 title-font text-(--secondary)">
                              {formatPrice(Number(selectedProduct.price))} Per Hour
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm title-font font-medium text-(--secondary) mb-3">
                          {selectedProduct.forSale ?"Quantity":"Hours"}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-100 rounded-lg">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Minus className="w-4 h-4 text-black" />
                            </button>
                            <span className="w-12 text-black text-center font-medium title-font tracking-body leading-body">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Plus className="w-4 h-4 text-black" />
                            </button>
                          </div>
                          <span className={`text-sm title-font2  font-medium ${selectedProduct.availabilityStatus ? "text-(--success)" : "text-(--warning)"}`}>
                            {selectedProduct.availabilityStatus ? "Available" : "Out of Stock"}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-border flex flex-row gap-3">
                        <button
                          disabled={!selectedProduct.availabilityStatus}
                          onClick={()=>{
                            router.push("/checkout")
                            setSelectedProduct(null)
                            addToCart(selectedProduct,quantity)
                            setQuantity(1)
                          }}
                          className="w-full bg-black py-2 cursor-pointer rounded-lg tracking-body leading-body transition-all custom3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {selectedProduct.forSale ? "Buy Now" :"Rent Now"}
                        </button>
                        <button
                          onClick={()=>{
                            close()
                          }}
                          className="w-full text-(--secondary) cursor-pointer bg-(--card) py-2 rounded-lg tracking-body leading-body custom3 font-medium transition-opacity "
                        >
                          Close
                        </button>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <span className="text-(--secondary) leading-body tracking-body title-font ">
                          Notice
                        </span>
                        <p className="text-(--secondary) p-4 bg-(--card) rounded-xl leading-body tracking-body title-font ">
                          Make payment to Teatflash Flw (Verified).Please note that once you proceed with payment, the lister’s phone number will be shared with you. Do not share any sensitive information such as your BVN. Your funds will not be released until the item has been collected and safely returned. Any late hour after the 1hr saving grace will incur a penalty of ₦500 per hour. For enquiries or complaints, contact us at +234 810 189 2870 or +234 904 364 7942.
                        </p>
                      </div>

                      <div className="border-t border-border pt-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-(--secondary) title-font">Shipping</span>
                          <span className="font-medium title-font text-(--secondary)">
                            Free delivery
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-(--secondary) title-font">Returns</span>
                          <span className="font-medium text-(--secondary) title-font">
                            30-day guarantee  
                          </span>
                        </div>
                      </div>
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
  );
}
