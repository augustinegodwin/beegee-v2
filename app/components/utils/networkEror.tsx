import { RefreshCcw, WifiOffIcon } from 'lucide-react'
import React from 'react'

export default function NetworkEror() {
  return (
    <div className="text-center">
  <div className="mb-6">
    <WifiOffIcon size={48} className="text-(--warning) mx-auto" />
  </div>
  <h1 className="text-xl tracking-body custom3 text-black mb-2">Network Error</h1>
  <p className="text-(--secondary) tracking-body title-font2 mb-6">
    Unable to get products. Please check your connection.
  </p>
  <div className="flex items-center justify-center">
    <button className="flex  items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-100 rounded-xl transition-colors">
        <RefreshCcw size={16} className="text-(--secondary)" />
      <span className="text-(--secondary) tracking-body title-font2">Try Again</span>
    </button>
  </div>
</div>

  )
}
