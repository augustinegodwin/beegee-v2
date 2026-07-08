type testiprop={
  message:string, 
  user:string,
  status:string
}

export default function FeedbackCard({ message, user, status }: testiprop) {
  return (
    <div className="w-full bg-green-500   flex flex-col px-[2px] py-[2px] rounded-[24px]  "> 
    <div className="py-2.5 px-4 sm:px-5"><p className='text-sm  text-white font-medium custom3 '>{user}</p></div>
        <div className="flex flex-col p-4 gap-4 sm:p-5 bg-gray-50 h-full rounded-[22px]">
         <div className="w-full h-full">
            <p className="leading-body text-sm custom3 track-body font-medium text-(--secondary)">{message}</p>
        </div>
        <div className='flex flex-col'>
            
            <p className='text-sm leading-5 text-right text-(--primary) title-font'>-{status}</p>
        </div>
        </div>
    </div>
  )
}
