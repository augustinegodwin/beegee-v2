import cancel from '@/app/assets/images/cancel.svg';
import SectionHeader from "../utils/sectionHeader";
import Image from 'next/image';
import bottle from "../../assets/images/bottle.jpg"
export default function Hero() {
  return (
    <div className="w-full flex justify-center h-screen max-h-250 py-4 px-4 min-h-150 ">
      <div className="w-full bri relative bg-(--card) px-4 h-full max-w-[1920px] rounded-4xl border border-gray-200 flex justify-center items-center">
        {/* <video
          src={"../../assets/images/bg.mp4"}
          className='w-full h-full'  
          autoPlay
        /> */}
        {/* <div className="absolute inset-0 ">
          <div className="card w-[150px] rounded-2xl absolute left-10 h-[200px] border-5 border-white"></div>
        </div> */}
      <SectionHeader
        title="The Largest Campus Marketplace"
        body="Select a category to find textbooks, electronics, fashion, and more from your fellow students"
        buttonAction="/store"
        buttonValue="Shop Now"
      />
     
      {/* <div className="w-50 h-65 rounded-3xl bg-orange-600 -bottom-20 shadow-xl -rotate-20 border-6 border-white absolute"></div>
      <div className="w-50 h-65 rounded-3xl bg-orange-600 -top-20 shadow-xl rotate-20 border-6 border-white absolute"></div> */}
      {/* <div className="fixed z-10 bg-black/75 w-full h-full p-0 lg:p-10">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full max-w-250 bg-(--card) lg:rounded-[30px] h-fulllg:h-auto border border-gray-100 p-1.5">
             <div className="p-3 flex items-center justify-between">
                <p className="leading-body text-lg title-font track-body font-medium text-(--secondary)">
                  Product details
                </p>
                <div className="size-10 rounded-full bg-(--card) flex items-center justify-center border-gray-200 overflow-hidden border p-0.5">
                <Image src={cancel} alt="cancel" className="size-6" />
            </div>
              </div>
            <div className="w-full flex flex-col items-center bg-[#fcfcfc] border border-gray-100 rounded-3xl p-4">
              <div className="w-full flex flex-col lg:flex-row gap-10 ">
                <div className="w-full lg:flex-1 h-100 rounded-2xl bg-black"></div>
                <div className="flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </div>
  );
}
