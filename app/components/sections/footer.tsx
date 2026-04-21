import React from "react";
import MaxWidthContainer from "../utils/maxWidthContainer";
import Image from "next/image";
import beegee from "../../assets/images/Beegee.png";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full bg-foreground border-t border-gray-100">
      <MaxWidthContainer>
        <div className="py-25 w-full flex gap-10 flex-col lg:flex-row items-center">
          <div className="flex-1 gap-4  sm:w-fit w-full">
            <div className="w-full w-full sm:max-w-100">
              <p className="text-lg  text-center title-font lg:text-left text-(--secondary) leading-body font-medium tracking-body">
                Buy ,Sell, Rent your perfect marketplace
              </p>
              
            </div>
            <Link href={"/"} className="w-fit">
              <Image src={beegee} alt="BeeGee" className="wifull h-auto sm:w-auto sm:h-[130px]" />
            </Link>
          </div>
          <div className="w-fit grid grid-cols-3 gap-[34px]">
            <div className="flex flex-col gap-4">
              <Link href={"/"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                Home
              </Link>
              <Link href={"/store"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                Store
              </Link>
              <Link href={"/store"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                Acount
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link href={"/store"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                Support
              </Link>
              <Link href={"/sign"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                Sign in
              </Link>
              <Link href={"/store"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                Terms
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link href={"https://x.com"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                X&nbsp;(Twitter)
              </Link>
              <Link href={"/store"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                FaceBook
              </Link>
              <Link href={"/store"} className="text-(--secondary) text-sm title-font font-medium leading-body tracking-body">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}
