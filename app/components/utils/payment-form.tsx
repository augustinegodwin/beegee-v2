"use client";
import Link from "next/link";
// import { Card } from "./ui/card2";


import { ArrowLeft } from "lucide-react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useContext, useEffect, useState } from "react";
import { Separator } from "./seperator";
import Button from "./button";
import { useAuthStore } from "@/app/store/auth.store";
import { useProductStore } from "@/app/store/products.store";
import PaymentConfirmation from "../headlessUiComponents/orderConfrimationModal";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/lib/async_data";

// import PaymentConfirmation from "./paymentConfrimModal";
export function PaymentForm() {
  const [orderItems, setOrderItems] = useState<
    { id: string | number; quantity: number }[] | []
  >([]);
  const [email,setEmail]=useState("")
  const [modal,setModal]=useState(false)
  const [status,setStatus]=useState<"success" | "failed">("failed")
  const [loading,setloading]=useState(false)
  const router =useRouter()
  const [paymentObj, setPaymentObj] = useState<
    | {
        items: any[];
        shippingFee: number;
        phoneNumber: string;
        name: string;
        states: string;
        address: string;
        appartment: string;
        shippingMethod: string;
        paymentIntentId: string;
        tx_ref: string;
        flw_ref: string;
      }
    | {}
  >({});
  
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
  // if (!isOpen) return null;
  useEffect(() => {
    // console.log({...paymentObj});
  }, [paymentObj]);
  

const validateEmail = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const {user,getCookie}=useAuthStore()
const {cartItems,clearCart}=useProductStore()
  const rfToken=getCookie("RFTFL")
  const acToken=getCookie("ACTFL")
  const signedCookies1={
    "accessToken":acToken,
    "refreshToken":rfToken
  }
  const signedCookies=JSON.stringify(signedCookies1)
  const cartitem=cartItems[0]
  function getExpectedReturnTime(rentHours:number) {
  const now = new Date();

  // Add rent hours + 1 hour saving grace
  return new Date(
    now.getTime() + (rentHours + 1) * 60 * 60 * 1000
  );

}

  const preparePayment=()=>{
    const orderdata={
    signedCookies,
    item:cartitem.product._id,
    user:user?.user._id,
    phoneNumber: user?.user.phoneNumber,
    name: user?.user.name,
    address: user?.user.address,
    appartment: user?.user.appartment,
    rentHours:cartitem.quantity,
    pricePerHour:cartitem.product.price,
    subtotal:cartitem.subtotal + 350,
    expectedReturnTime: getExpectedReturnTime(cartitem.quantity),
  }
  return orderdata
  }
  const handleCreateOrder = async (
    transaction_id: any,
    tx_ref: any,
    flw_ref: any
  ) => {

    const payObj = {
      ...preparePayment(),
      paymentIntentId: transaction_id,
      tx_ref,
      flw_ref,
    };
    try {
    const response:any = await createOrder(payObj);
    const main : (undefined | {order:OrderDetails})=await response
    if (main?.order){
         setStatus("success")
                setOrderData({email,
                orderNumber:main.order._id,
                date:main.order.createdAt,
                paymentMethod:"flutterwave",
                cartItems:cartItems,
                total:cartItems[0].subtotal
            })
            setModal(true)
    }
    } catch (error) {
        setStatus("failed")
                setOrderData({email,
                orderNumber:"",
                date:"",
                paymentMethod:"flutterwave",
                cartItems:cartItems,
                total:cartItems[0].subtotal
            })
            setModal(true)
    
    }finally{
        setloading(false)
    }
    
  };
    const config = {
    public_key: "FLWPUBK-780dbda3013f6c7d0b3056746f40d8b7-X",
    tx_ref: Date.now().toString(),
    amount: preparePayment().subtotal,
    currency: "NGN",
    country: "NG",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: preparePayment().phoneNumber || "",
      name: preparePayment().name || "",
    },
    customizations: {
      title: "Teatflash Flw",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const [orderdata,setOrderData]=useState<{
    email: string;
    orderNumber: string;
    date: string;
    paymentMethod: string;
    cartItems: any[];
    total: string | number;
  }>({email:email,
    orderNumber:"",
    date:"",
    paymentMethod:"",
    cartItems:cartItems,
    total:formatPrice(cartitem.subtotal + 350)
  })
  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response: any) => {
      const { transaction_id, tx_ref, flw_ref,status ,charged_amount} = response;
      if (response.status==="completed"){
        handleCreateOrder(transaction_id,tx_ref,flw_ref)
        setloading(true)
      }else{
        setStatus("failed")
                setOrderData({email,
                orderNumber:"",
                date:"",
                paymentMethod:"",
                cartItems:cartItems,
                total:formatPrice(cartitem.subtotal + 350)
            })
            setModal(true)
      }
      
    },
    onClose: () => {
        if (status=="failed"){
            
            setStatus("failed")
                setOrderData({email,
                orderNumber:"",
                date:"",
                paymentMethod:"",
                cartItems:cartItems,
                total:formatPrice(cartitem.subtotal + 350)
            })
            setModal(true)
        }
        // if (status==="completed"){
        //      setModal(true)
        //     setStatus("success")
        
        // }
    },
  };
  return (
    <>
      <div className="space-y-10">
        <div className="border-gray-200 flex flex-col p-4 bg-(--card) rounded-2xl gap-2 shadow-none">
          <div className="flex justify-between">
            <div className="flex-1 flex flex-wrap">
              <div className="basis-[6em]">
                <span className="text-black title-font2">Contact</span>
              </div>
              <div className="flex-1 pr-3 text-base tracking-body title-font2 text-(--secondary)">{user?.user.phoneNumber}</div>
            </div>
            <div className="">
              <Link
                href={"account"}
                className="text-sm text-(--green) title-font2 tracking-body hover:underline"
              >
                {" "}
                <span>Change</span>
              </Link>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="flex-1 flex flex-wrap">
              <div className="basis-[6em]">
                <span className="text-black title-font2">Ship to</span>
              </div>
              <div className="flex-1 min-w-56 w-full pr-3">
                <span className="w-full break-keep text-base tracking-body text-(--secondary) title-font2">
                  {user?.user.address} , {user?.user.appartment}
                </span>
              </div>
            </div>
            <div className="">
              <Link
                href={"/account"}
                className="text-sm text-(--green) title-font2 tracking-body hover:underline"
              >
                {" "}
                <span>Change</span>
              </Link>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <div className="flex-1 flex flex-wrap">
              <div className="basis-[6em] pr-3">
                <span className="text-black title-font2">Shipping </span>
              </div>
              <div className="flex-1 min-w-56 w-full pr-3">
                <span className="w-full break-keep text-base tracking-body text-(--secondary) title-font2">
                  Contact Delivery
                </span>
              </div>
            </div>
            <div className="">
              <Link
                href={"/account"}
                className="text-sm text-(--green) title-font2 tracking-body hover:underline"
              >
                {" "}
                <span>Change</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
                        <label className="text-sm title-font tracking-body text-black font-medium ">Email Address (to send your recipt after payment)</label>
                        <input
                            type={"text"}
                            placeholder="example@gmail.com"
                            value={email}
                            className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                            // value={phoneNumber}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
        <div className="flex justify-between flex-wrap gap-4">
          <button
           className="flex-1 flex gap-2 justify-center items-center px-5 h-10 title-font2 text-(--secondary) bg-gray-100 transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm cursor-pointer"
            onClick={()=>router.push("/store")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          {false ? (
            <button
              disabled
            className="flex-1 flex gap-2 justify-center items-center px-5 h-10 title-font hover:opacity-80 disabled:opacity-60  bg-black transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm text-white "
            >
              <div className="flex items-center justify-center space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </button>
          ) : (
            <FlutterWaveButton
            disabled={!email || !validateEmail(email)}
              className="flex-1 flex gap-2 disabled:opacity-60 justify-center items-center px-5 h-10 title-font2 text-white cursor-pointer bg-black transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm"
              {...fwConfig}
            />
            
          )}
        </div>
        
      </div>
      <PaymentConfirmation
      
          isOpen={modal}
          onClose={()=>setModal(false)}
          status={status}
          data={orderdata}
      />
    </>
  );
}
