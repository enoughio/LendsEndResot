'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#067C0B] mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you&apos;re looking for seems to have wandered off into the forest.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#067C0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#055a08] transition-colors"
          >
            <Home size={20} />
            Go to Homepage
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border-2 border-[#067C0B] text-[#067C0B] px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-[#067C0B] hover:underline">Contact us</Link></p>
        </div>
      </div>
    </div>
  )
}
