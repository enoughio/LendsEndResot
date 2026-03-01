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

import Link from 'next/link';

const Page = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
          <span className="text-4xl">✓</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-gray-900">Booking confirmed</h1>
          <p className="text-gray-600">
            Your payment was successful. We&apos;ve locked your dates and will reach out with arrival details and a pre-check-in
            form.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left space-y-3">
          <p className="text-sm text-gray-700">What happens next:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Check your inbox for a confirmation email and receipt.</li>
            <li>Our concierge will contact you 24 hours before arrival.</li>
            <li>Bring a valid ID for all guests for a smooth check-in.</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Book another stay
          </Link>
          <Link href="/" className="px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;