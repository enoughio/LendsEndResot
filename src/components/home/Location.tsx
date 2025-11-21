import React from 'react'

const Location = () => {
  return (
    <section className="py-8 px-4 md:px-8 mb-14 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-5xl md:text-6xl text-gray-900 mb-2">
              Location
            </h2>
            <div className="h-1 w-32 bg-green-600"></div>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors">
            <span className="text-sm font-medium">View Google maps</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 17L17 7M17 7H7M17 7V17" 
              />
            </svg>
          </button>
        </div>

        {/* Map Container */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.4728784506315!2d77.43139579413382!3d23.18943125061688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43a3169e2dff%3A0xc9ed66152247f1c!2sAura%20Mall!5e0!3m2!1sen!2sin!4v1763614872508!5m2!1sen!2sin" 
            width="100%" 
            height="500" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 mt-6 text-gray-700">
          <svg 
            className="w-5 h-5 mt-1 shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="text-base">Gümüssuyu Mah. İnönü Cad. No:8, Istanbul 34437</p>
        </div>
      </div>
    </section>
  )
}

export default Location