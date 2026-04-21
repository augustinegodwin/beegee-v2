import { LogIn, UserRound } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export default function AuthRequiredPage() {
  return (
    <div className="text-center py-10">
      <div className="mb-6">
        {/* Using your warning color variable for consistency */}
        <UserRound size={48} className="text-(--warning) mx-auto" />
      </div>
      
      <h1 className="text-xl tracking-body custom3 text-black mb-2">
        Authentication Required
      </h1>
      
      <p className="text-(--secondary) tracking-body title-font2 mb-6 max-w-xs mx-auto">
        You need to be logged in to access this feature. Please sign in to your account.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Link href="/sign-in">
          <button className="flex items-center space-x-2 px-6 py-2 bg-black hover:opacity-80 rounded-xl transition-all active:scale-95">
            
            <span className="text-white tracking-body title-font2">Sign In</span>
          </button>
        </Link>
        
        <Link href="/sign-up">
          <button className="flex items-center space-x-2 px-6 py-2 bg-gray-200 hover:bg-gray-100 rounded-xl transition-colors">
            <span className="text-(--secondary) tracking-body title-font2">Create Account</span>
          </button>
        </Link>
      </div>
    </div>
  )
}