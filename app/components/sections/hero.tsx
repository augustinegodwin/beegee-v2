import cancel from "@/app/assets/images/cancel.svg";
// import SectionHeader from "../utils/sectionHeader";
import Image from "next/image";
import bottle from "../../assets/images/bottle.jpg";
import shoe from "../../assets/images/shoe.jpg";
import bingham from "../../assets/images/bingham.jpg";
import Button from "../utils/button";
import airpod from "../../assets/images/short.jpg";
import short from "../../assets/images/airpods.webp"
const SectionHeader = (data: any) => {
  return (
    <div className="w-full max-w-150 lg:max-w-[1340px] flex gap-10 flex-col justify-center">
      <div className="w-full flex gap-5 h-70 sm:h-100">
        <div className="flex-1 bg-gray-200 rounded-3xl overflow-hidden">
           <Image
              src={bottle}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               sizes="100vw"
            />
        </div>
       
        <div className="hidden lg:flex flex-1 bg-gray-200 rounded-3xl overflow-hidden">
           <Image
              src={shoe}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               sizes="100vw"
            />
        </div>
       
        <div className="hidden lg:flex flex-1 bg-gray-200 rounded-3xl overflow-hidden">
           <Image
              src={airpod}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               sizes="100vw"
            />
        </div>
       
        <div className="flex-1 bg-gray-200 rounded-3xl overflow-hidden">
           <Image
              src={short}
              alt='bottle'
              className='w-full h-full object-cover '
              width={100}
              height={100}
               sizes="100vw"
            />
        </div>
       
      </div>
      <div className="w-full flex gap-10 flex-col lg:flex-row items-end lg:justify-between">
        <div className="w-full items-start justify-center max-w-180 flex flex-col gap-5">
          <div className="w-fit flex flex-col items-start">
            <h2 className="text-left custom8 text-5xl sm:text-6xl lg:text-[75px] text-(--primary) leading-none tracking-[-0.06em]">
              The Largest <span className="text-green-600">Campus</span>{" "}
              Marketplace
            </h2>
          </div>

          <div className="w-full max-w-100 flex flex-col justify-start items-start gap-5">
            <p className="text-left text-lg text-(--secondary) leading-body custom3 font-medium tracking-body">
              {data.body}
            </p>
            {data.buttonValue ? (
              <Button title={data.buttonValue} LinkTo={data.buttonAction} />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full sm:w-[440px] flex flex-col gap-4 bg-gray-50 border border-gray-100 p-6 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-gray-200 cursor-pointer">
      
      {/* Clean, Single-Line Social Proof Row */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Avatar Stack */}
        <div className="flex -space-x-3 isolate">
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm">
            <Image src={bottle} alt="Gear" className="w-full h-full object-cover" width={40} height={40} />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm">
            <Image src={shoe} alt="Gear" className="w-full h-full object-cover" width={40} height={40} />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm">
            <Image src={airpod} alt="Gear" className="w-full h-full object-cover" width={40} height={40} />
          </div>
        </div>

        {/* Rating & Text Grouped Together */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          {/* Stars */}
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          {/* Count label */}
          <span className="text-xs sm:text-sm text-gray-900">
            250+ student items listed
          </span>
        </div>
      </div>

      {/* Main Copy */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg custom8 text-gray-900 tracking-tight">
          The ultimate campus marketplace.
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
          Designed for durability and built for students. Our platform makes it easy to upload, discover, and sell your gear in seconds.
        </p>
      </div>

    </div>
        
        
      </div>
    </div>
  );
};
export default function Hero() {
  return (
    <div className="w-full flex sm:px-5 justify-center  max-h-250 py-4  min-h-150 ">
      <div className="overflow-hidden w-full bri relative  px-4 h-full pt-10 sm:pb-50 max-w-[1340px] rounded-4xl   border-gray-200 flex justify-center items-start">
  <SectionHeader
          title="The Largest Campus Marketplace"
          body="Select a category to find textbooks, electronics, fashion, and more from your fellow students"
          buttonAction="/store"
          buttonValue="Join the Shopping"
        />

        {/* <div className="w-50 h-65 lg:w-60 lg:h-75 -top-20 lg:top-20 rounded-3xl -left-10 xl:left-40 shadow-xl -rotate-20 border-5 bg-(--card) border-black overflow-hidden absolute ">
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
      </div> */}
      </div>
    </div>
  );
}
