import Image from "next/image";
import Link from "next/link";
import React from "react";
type CategoryProp = {
  image: any;
  title: string;
  linkTo: string;
};
export default function CategoryCard(data: CategoryProp) {
  return (
    <div className="w-full flex flex-col rounded-[24px] bg-green-600 px-[2px] py-[2px]">
      <div className="w-full flex justify-center py-3">
        <h3 className="font-medium custom3 text-white text-lg lg:text-xl tracking-body ">
          {data.title}
        </h3>
      </div>
      <Link
        href={data.linkTo}
        className="py-4  border border-gray-200  rounded-[22px] bg-gray-50 flex flex-col w-full gap-6"
      >
        <Image className="w-full h-auto" src={data.image} alt={data.title} />
      </Link>
    </div>
  );
}
