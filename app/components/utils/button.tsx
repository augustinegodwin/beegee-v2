import Link from 'next/link'
import React from 'react'
type buttonProp={
    LinkTo:string,
    title:string
}
export default function Button(data:buttonProp) {
  return (
    <Link href={data.LinkTo} className='px-5 justify-center flex py-3 custom3 hover:bg-green-600 transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm text-white bg-(--green)'>
        {data.title}
    </Link>
  )
}
