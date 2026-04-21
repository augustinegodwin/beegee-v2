import { ShoppingBag, ArrowLeft } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className="text-center py-10">
      <div className="mb-6">
        {/* Keeping the warning color for consistency with your other states */}
        <ShoppingBag size={48} className="text-(--warning) mx-auto" />
      </div>
      
      <h1 className="text-xl tracking-body custom3 text-black mb-2 ">
        No Products to Checkout
      </h1>
      
      <p className="text-(--secondary) tracking-body title-font2 mb-6 max-w-xs mx-auto">
        You haven't added any products to your checkout yet. Start exploring the marketplace!
      </p>

      <div className="flex items-center justify-center">
        <Link href="/store" className="cursor-pointer">
          <button className="flex items-center space-x-2 px-8 py-2 bg-black hover:opacity-80 rounded-xl transition-all active:scale-95">
            <ArrowLeft size={16} className="text-white" />
            <span className="text-white tracking-body title-font2">Back to Store</span>
          </button>
        </Link>
      </div>
    </div>
  )
}