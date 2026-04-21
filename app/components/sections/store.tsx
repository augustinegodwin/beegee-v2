"use client"
import MaxWidthContainer from '../utils/maxWidthContainer'
import SectionHeader from '../utils/sectionHeader'
import ProductCard from '../utils/productCard'
import { useEffect } from 'react'
import useFetch from '@/app/lib/useAsyncFetch'
import { getAllProducts } from '@/app/lib/async_data'
import NetworkEror from '../utils/networkEror'

type pageProps = {
  products: any[]
}
const ProductSkeleton = () => {
  return (
    <div 
      className="w-full flex flex-col gap-4 animate-pulse [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]"
      // Note: 'black' in a mask means 100% visible, 'transparent' means 0% visible.
    >
      {/* Image Placeholder */}
      <div className="w-full overflow-hidden relative aspect-[0.882609/1] bg-gray-200 rounded-2xl" />

      <div className="w-full flex flex-col gap-2.5">
        {/* Title Placeholder */}
        <div className="w-full space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Status and Price Placeholder */}
        <div className="flex w-full justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>

        {/* Buttons Placeholder */}
        <div className="flex gap-2">
          <div className="h-9 w-full bg-black/50 rounded-lg" />
          <div className="h-9 w-full bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default function Store() {
  const {
    data: products,
    loading,
    refetch,
    error
  } = useFetch({
    fn: () => getAllProducts(""),
  });
  return (
    <MaxWidthContainer>
        <div className="py-25 flex flex-col justify-center gap-25">
            <SectionHeader
                title='Explore Top Selling Products'
                body='Discover to buy, sell and rent anything on campus with ease.'
                buttonValue='View All products'
                buttonAction='/store'
            />
             {!error && <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {loading && Array(8).fill(null).map((_, index) => (
                    <ProductSkeleton key={index}  />
                ))}
                {!loading && products.products && products.products.slice(16, 24).map((product: Product) => (
                    <ProductCard
                        key={product._id}
                        {...product}
                    />
                ))}
             </div>}
             {
              error && <div className='p-20'>
                <NetworkEror/>
              </div>
             }
        </div>
    </MaxWidthContainer>
  )
}
