import React from 'react'
import MaxWidthContainer from '../utils/maxWidthContainer'
import Button from '../utils/button'

export default function Joinus() {
  return (
    <MaxWidthContainer>
        <div className="py-25 flex flex-col justify-center gap-25">
        <div className="w-full flex justify-center">
              <div className="w-full items-center justify-center max-w-180 flex flex-col gap-5">
                <div className="w-fit">
                <h2 className="text-center custom5 text-5xl sm:text-6xl lg:text-[75px] text-(--primary) leading-none tracking-body">
                  Join The Market Today
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
