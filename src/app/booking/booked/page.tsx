// 'use client'

// import { useSearchParams } from 'next/navigation'
// import { Suspense } from 'react'
// import { CheckCircle2, Calendar, MapPin, Phone, Mail, TreePine } from 'lucide-react'
// import Link from 'next/link'

// function BookedContent() {
//   const searchParams = useSearchParams()
//   const type = searchParams.get('type')
//   const room = searchParams.get('room')

//   const getBookingDetails = () => {
//     if (type === 'full' || type === 'half') {
//       return {
//         title: type === 'full' ? 'Full Day Visit' : 'Half Day Visit',
//         subtitle: 'Day Visit Booking',
//         description: `Your ${type === 'full' ? 'full' : 'half'} day visit to Sumiran Jungle Resort has been confirmed.`,
//       }
//     } else if (type === 'stay') {
//       const roomNames: Record<string, string> = {
//         'deluxe': 'Deluxe Room',
//         'Executive': 'Executive Rooms',
//         'Tower': 'Tower Room',
//         'Dorm': 'Dorm Bed',
//       }
//       return {
//         title: roomNames[room || 'deluxe'] || 'Resort Stay',
//         subtitle: 'Stay Booking',
//         description: 'Your stay at Sumiran Jungle Resort has been confirmed.',
//       }
//     }
//     return {
//       title: 'Booking Confirmed',
//       subtitle: 'Thank you for booking',
//       description: 'Your booking has been confirmed.',
//     }
//   }

//   const details = getBookingDetails()

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-slate-800 text-white px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-8">
//             <Link href="/" className="flex items-center gap-2 text-white hover:text-green-400 transition-colors">
//               <TreePine className="w-6 h-6" />
//               <h1 className="text-white">Sumiran Resort</h1>
//             </Link>
//             <nav className="flex items-center gap-6">
//               <Link href="/booking" className="text-white hover:text-green-400 transition-colors">Bookings</Link>
//             </nav>
//           </div>
//           <div className="flex items-center gap-4">
//             <Link href="/booking" className="px-4 py-2 border border-white rounded-lg hover:bg-white/10 transition-colors">
//               Book Again
//             </Link>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
//               <span className="text-sm">Guest</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Success Content */}
//       <div className="max-w-4xl mx-auto px-6 py-16">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
//             <CheckCircle2 className="w-12 h-12 text-green-600" />
//           </div>
//           <h1 className="text-4xl text-gray-900 mb-4">Booking Confirmed!</h1>
//           <p className="text-xl text-gray-600">{details.description}</p>
//         </div>

//         {/* Booking Details Card */}
//         <div className="bg-white border-2 border-green-500 rounded-lg p-8 mb-8">
//           <div className="mb-6">
//             <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm mb-2">
//               {details.subtitle}
//             </span>
//             <h2 className="text-2xl text-gray-900">{details.title}</h2>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <Calendar className="w-5 h-5 text-gray-600 mt-1" />
//                 <div>
//                   <p className="text-gray-600 text-sm">Booking Date</p>
//                   <p className="text-gray-900">
//                     {new Date().toLocaleDateString('en-US', { 
//                       weekday: 'long', 
//                       year: 'numeric', 
//                       month: 'long', 
//                       day: 'numeric' 
//                     })}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-gray-600 mt-1" />
//                 <div>
//                   <p className="text-gray-600 text-sm">Location</p>
//                   <p className="text-gray-900">Sumiran Jungle Resort</p>
//                   <p className="text-gray-600 text-sm">Deep in the forest reserve</p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <Mail className="w-5 h-5 text-gray-600 mt-1" />
//                 <div>
//                   <p className="text-gray-600 text-sm">Confirmation Email</p>
//                   <p className="text-gray-900">Sent to your email address</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Phone className="w-5 h-5 text-gray-600 mt-1" />
//                 <div>
//                   <p className="text-gray-600 text-sm">Contact Support</p>
//                   <p className="text-gray-900">+1 234 567 8900</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <p className="text-gray-600 text-sm">
//               <strong>Booking Reference:</strong> SR{Date.now().toString().slice(-8)}
//             </p>
//           </div>
//         </div>

//         {/* Next Steps */}
//         <div className="bg-blue-50 rounded-lg p-6 mb-8">
//           <h3 className="text-gray-900 mb-4">What&apos;s Next?</h3>
//           <ul className="space-y-3">
//             <li className="flex items-start gap-3">
//               <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
//               <span className="text-gray-700">Check your email for booking confirmation and details</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
//               <span className="text-gray-700">We&apos;ll contact you 24 hours before your visit with final instructions</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
//               <span className="text-gray-700">Save our contact number for any questions or changes</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
//               <span className="text-gray-700">Prepare for an amazing jungle experience!</span>
//             </li>
//           </ul>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link 
//             href="/booking"
//             className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
//           >
//             Book Another Experience
//           </Link>
//           <Link 
//             href="/"
//             className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
//           >
//             Return to Home
//           </Link>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-white mt-16">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <div className="grid grid-cols-4 gap-8">
//             <div>
//               <div className="flex gap-4">
//                 <a href="#" className="hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
//                 </a>
//                 <a href="#" className="hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
//                 </a>
//                 <a href="#" className="hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
//                 </a>
//                 <a href="#" className="hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-white mb-4">Our Activities</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-green-400 transition-colors">Wildlife Safari</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition-colors">Jungle Trek</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition-colors">Bird Watching</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition-colors">River Activities</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white mb-4">About Us</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-green-400 transition-colors">Our Story</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition-colors">Work with us</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white mb-4">Contact Us</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-green-400 transition-colors">Contact Support</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// const Page = () => {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div>Loading...</div></div>}>
//       <BookedContent />
//     </Suspense>
//   )
// }

// export default Page

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page