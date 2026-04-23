import React from 'react'
import MaxWidthContainer from '../utils/maxWidthContainer'
import Button from '../utils/button'
import Short from '../../assets/images/short.jpg'
import Shoe from '../../assets/images/shoe.jpg'
import Image from 'next/image'
export default function Joinus() {
  return (
    <MaxWidthContainer>
        <div className="py-25 flex overflow-hidden relative border border-gray-200 bg-(--card) rounded-4xl mb-25 flex-col justify-center gap-25">
          <div className="w-45 h-65 lg:w-60 lg:h-75 -top-40 sm:-top-20  rounded-3xl -left-10  shadow-xl -rotate-20 border-5 bg-(--card) border-gray-400 overflow-hidden absolute ">
                      <Image
                        src={Short}
                        alt='Short'
                        className='w-full h-full object-cover '
                        width={100}
                        height={100}
                         sizes="100vw"
                      />
                </div>
                <div className="w-45 h-65 lg:w-60  lg:h-75 -bottom-40 sm:-bottom-20  rounded-3xl bg-(--card) -right-10   shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] rotate-20 border-5 border-gray-400 absolute overflow-hidden">
                        <Image
                              src={Shoe}
                              alt='Shoe'
                              className='w-full  h-full object-cover '
                              width={100}
                              height={100}
                               sizes="100vw"
                            />
                      </div>
        <div className="w-full flex justify-center">
              <div className="w-full px-4 items-center justify-center max-w-180 flex flex-col gap-5">
                <div className="w-fit ">
                <h2 className="text-center custom5 text-5xl sm:text-6xl lg:text-[75px] text-(--primary) leading-none tracking-body">
                  Join The <span className='text-green-600'>Market</span> Today
                  </h2>
                </div>
                <div className="w-full max-w-100 flex flex-col justify-center items-center gap-5">
                  <p className="text-center text-lg text-(--secondary) leading-body custom3 font-medium tracking-body">
                                  Select a category to find textbooks, electronics, fashion, and more from your fellow students

                  </p>
                 
                    <Button title={"Join the Market"} LinkTo={"/store"} />
                  
                </div>
              </div>
            </div>
            </div>
    </MaxWidthContainer>
  )
}
