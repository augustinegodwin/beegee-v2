import cancel from '@/app/assets/images/cancel.svg';
// import SectionHeader from "../utils/sectionHeader";
import Image from 'next/image';
import bottle from "../../assets/images/bottle.jpg"
import shoe from "../../assets/images/shoe.jpg"
import bingham from "../../assets/images/bingham.jpg" 
import Button from '../utils/button';
import airpod from "../../assets/images/short.jpg"
const SectionHeader =(data:any) =>{
  return (
    <div className="w-full flex justify-center">
      <div className="w-full items-center justify-center max-w-180 flex flex-col gap-5">
        
        <div className="w-fit flex flex-col items-center">
          <div className="w-fit flex gap-1 items-center max-w-100 h-auto rounded-xl ">
            <div className="h-6 sm:h-8 w-fit flex ">
              <div className="aspect-square h-full border-2 overflow-hidden border-(--card) bg-white rounded-2xl">
                 <Image
              src={bottle}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               
            />
              </div>
              <div className="aspect-square h-full overflow-hidden border-2 border-(--card) bg-white rounded-2xl -mx-3 z-[1]">
                <Image
              src={shoe}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               
            />
              </div>
              <div className="aspect-square h-full overflow-hidden border-2 border-(--card) bg-white rounded-2xl z-[2]">
                <Image
              src={airpod}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               
            />
              </div>
            </div>
            <span className="tracking-body text-base custom6 text-(--secondary)">Over 250+ Products Uploaded</span>
          </div>
        <h2 className="text-center custom5 text-5xl sm:text-6xl lg:text-[75px] text-(--primary) leading-none tracking-[-0.06em]">
          The Largest <span className='text-green-600'>Campus</span> Marketplace
          </h2>
        </div>
        <div className="w-full max-w-100 flex flex-col justify-center items-center gap-5">
          <p className="text-center text-lg text-(--secondary) leading-body custom3 font-medium tracking-body">
            {data.body}
          </p>
          {data.buttonValue ? (
            <Button title={data.buttonValue} LinkTo={data.buttonAction} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default function Hero() {
  return (
    <div className="w-full flex justify-center  max-h-250 py-4 px-4 min-h-150 ">
      <div className="overflow-hidden w-full bri relative bg-(--card) px-4 h-full pt-50 pb-75 max-w-[1920px] rounded-4xl border  border-gray-200 flex justify-center items-start">
       
        
      <SectionHeader
        title="The Largest Campus Marketplace"
        body="Select a category to find textbooks, electronics, fashion, and more from your fellow students"
        buttonAction="/store"
        buttonValue="Join the Shopping"
      />
     
      <div className="w-50 h-65 lg:w-60 lg:h-75 -top-20 lg:top-20 rounded-3xl -left-10 xl:left-40 shadow-xl -rotate-20 border-5 bg-(--card) border-black overflow-hidden absolute ">
            <Image
              src={bottle}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               sizes="100vw"
            />
            
      </div>
      <div className="w-50 h-65 lg:w-60  lg:h-75 -bottom-20 lg:bottom-20 rounded-3xl bg-(--card) -right-10 xl:right-40  shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] rotate-20 border-5 border-black absolute overflow-hidden">
        <Image
              src={shoe}
              alt='shoe'
              className='w-full  h-full object-cover '
              width={100}
              height={100}
               sizes="100vw"
            />
            <div className="w-full h-10 bg-green-600 z-10">
              <p>For Sale</p>
            </div>
      </div>
      <div className="w-50 h-65 lg:w-60  lg:h-75 -left-20 sm:left-20 xl:left-100 -bottom-20 rounded-3xl bg-(--card) -shadow-offset-x-10 shadow-xl rotate-10 border-5 border-black absolute overflow-hidden">
        <Image
              src={airpod}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               sizes="100vw"
            />
      </div>
      
    </div>
    </div>
  );
}
