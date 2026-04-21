type testiprop={
  message:string, 
  user:string,
  status:string
}

export default function FeedbackCard({ message, user, status }: testiprop) {
  return (
    <div className="w-full bg-(--card) flex flex-col p-4 sm:p-5 rounded-[20px] gap-6">
        <div className="w-full">
            <p className="leading-body title-font track-body font-medium text-(--secondary)">{message}</p>
        </div>
        <div className='flex flex-col'>
            <p className='text-sm leading-5 text-(--primary) font-medium custom3 '>{user}</p>
            <p className='text-sm leading-5 text-(--secondary) title-font'>{status}</p>
        </div>
    </div>
  )
}
