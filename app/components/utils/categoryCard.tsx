import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type CategoryProp={
    image:any
    title:string
    linkTo:string
}
export default function CategoryCard(data:CategoryProp) {
  return (
    <Link href={data.linkTo} className="py-4 rounded-[20px] bg-(--card) flex flex-col w-full gap-6">
        <Image
            className='w-full h-auto'
            src={data.image}
            alt={data.title}
        />
        <div className="w-full flex justify-center pb-2.5">
            <h3 className='font-medium custom3 text-(--primary) text-lg tracking-body leading-5'>{data.title}</h3>
        </div>
    </Link>
  )
}
