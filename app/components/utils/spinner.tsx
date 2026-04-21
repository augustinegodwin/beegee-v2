import './spinner.css'
import Loader from '../../assets/images/Loader.png'
import Image from 'next/image';
export default function Spinner() {
  return (
    <div className='animate-pulse animate-bounce'>
     <Image src={Loader} alt="spinner" className='opacity-30  w-[50px] h-auto' />
    </div>
  );
}
