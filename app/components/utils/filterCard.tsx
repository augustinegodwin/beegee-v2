type buttonProp ={
    title:string
    active:boolean
}

export default function FilterCard(data:buttonProp) {
  return (
    data.active ?<button className=' bg-(--primary) cursor-pointer whitespace-nowrap text-white rounded-xl px-5 py-1 title-font tracking-header'>
        {data.title}
    </button>:
    <button className='border border-gray-100 cursor-pointer whitespace-nowrap text-(--secondary) rounded-xl px-5 py-1 title-font tracking-header'>
        {data.title}
    </button>
  )
}
