"use client";
import Image from "next/image";
import Link from "next/link";
import bot from "../../assets/images/Loader.png";
import user from "../../assets/images/user.jpg";
import Input from "../utils/input";
import userSvg from "../../assets/images/user.svg"
import search from "../../assets/images/search.svg"
import { useAuthStore } from "@/app/store/auth.store";
import { useEffect } from "react";
import { useProductStore } from "@/app/store/products.store";

export default function Navigation() {
  const { isAuthenticated,user } = useAuthStore();
  const { setSearchQuery } =useProductStore()
  return (
    <div className="w-full flex z-20 fixed  justify-center px-4 bg-white sm:px-10 py-4 items-center">
      <div className="w-full  max-w-150 lg:max-w-[1300px] ">
        <div className="flex justify-between">
          <Link href={"/"} className="flex gap-1 w-fit items-center">
            <Image src={bot} alt="logo" className="w-auto h-7" />
            <span className="text-3xl custom8  hidden lg:block text-black leading-[1.1] tracking-body">
              Beegee
            </span>
          </Link>
          <div className="max-w-100 w-full hidden lg:flex flex-1 h-full" onClick={()=>setSearchQuery(true)}>
            <div
                // placeholder=""
                className='w-full flex justify-start items-center text-(--secondary) bg-(--card) cursor-pointer title-font  border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                
            >
              Search Products on beegee
            </div>
          </div>
          <div className="flex gap-2.5 items-center">
            <div onClick={()=>setSearchQuery(true)} className="size-10 cursor-pointer rounded-full bg-(--card) flex lg:hidden items-center justify-center border-gray-200 overflow-hidden border p-0.5">
                <Image src={search} alt="search" className="size-6" />
            </div>
            <div className="size-10 flex rounded-full bg-(--card) justify-center items-center border-gray-200 border ">
                <Link href={"/account"} className="flex relative justify-center items-center size-full">
                    {isAuthenticated && user?.user ? (
                        user.user.profileImage ? (
                          <>
                           <div className="size-full overflow-hidden rounded-full">
                                <Image src={user.user.profileImage} width={100} height={100} alt="profile" className="size-full object-cover" />
                            </div>
                            {
                              user.orderCount && <div className="size-2 absolute bg-red-600 top-0 right-0 rounded-full"></div>
                            }
                            </>
                        ) : (
                          <>
                            <div className="size-full flex items-center justify-center bg-gray-300">
                                <h2 className="text-xl text-(--primary) atwtts">
                                    {user.user.name.slice(0,1).toUpperCase() }
                                </h2>
                            </div>
                            {
                              user.orderCount && <div className="size-2 absolute bg-red-600 top-0 right-0 rounded-full"></div>
                            }
                            </>
                        )
                        
                    ) : (
                      <>
                        <Image src={userSvg} alt="profile" className="size-6" />
                        
                      </>
                    )}
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
