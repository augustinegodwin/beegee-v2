type inputProp = {
    type: string,
    placeholder: string,
}
export default function Input({ type, placeholder }: inputProp) {
  return (
    <input
        type={type}
        placeholder={placeholder}
        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
    />
  )
}
