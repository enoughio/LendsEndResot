'use client'
 
import { useEffect } from 'react'
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertCircle size={64} className="text-red-600" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Something Went Wrong
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          We&apos;re sorry, but something unexpected happened. Please try again.
        </p>
        
        {error.digest && (
          <p className="text-sm text-gray-500 mb-6 font-mono bg-gray-100 p-3 rounded">
            Error ID: {error.digest}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#067C0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#055a08] transition-colors"
          >
            <RefreshCcw size={20} />
            Try Again
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 border-2 border-[#067C0B] text-[#067C0B] px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            <Home size={20} />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
