'use client'

import { Star, MapPin, Clock, CheckCircle2 } from 'lucide-react';
// import { BookingType } from '@/lib/types'; 
import Image from 'next/image';
import AboutHero from './AboutHero';


export function OverviewPage() {
  // const router = useRouter();
  
  // TODO: Re-enable when booking functionality is restored
  // const onSelectBooking = (type: BookingType) => {
  //   if (type === 'full-day' || type === 'half-day') {
  //     router.push('/booking/visit?type=' + (type === 'full-day' ? 'full' : 'half'));
  //   } else if (type === 'stay') {
  //     router.push('/booking/stay');
  //   }
  // };

  const activities = [
  'Bird Watching',
  'Jungle Trek',
  'Wildlife Safari',
  'River Rafting',
  'Kayaking',
  'Rock Climbing',
  'Nature Photography',
  'Campfire Experience'
  ];

  const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing experience at Sumiran! The jungle trek was breathtaking and our guide was incredibly knowledgeable. The resort amenities were top-notch. Highly recommend the wildlife safari - we saw so many animals in their natural habitat!'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    rating: 5,
    comment: 'Stayed in the Forest Villa and it was perfect for our family. The complimentary activities were well-organized and the staff was very helpful. The food was delicious and the location is stunning. Will definitely come back!'
  },
  {
    id: 3,
    name: 'Anita Desai',
    rating: 4,
    comment: 'Great day visit package! We chose bird watching and kayaking. Both activities were excellent and our guide made it educational. The only suggestion would be to have more vegetarian meal options. Overall a wonderful experience in nature.'
  }
  ];

  return (
    <div className="min-h-screen bg-white px-16">
      {/* Header */}
      <AboutHero />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-gray-900">Overview</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-8">
            Welcome to Sumiran Jungle Resort, where nature meets luxury. Nestled in the heart of pristine forest reserve, 
            Sumiran offers an unparalleled escape into the wilderness. Our resort features luxurious accommodations, curated 
            jungle experiences, and world-class amenities. Whether you&apos;re seeking a thrilling day adventure or a peaceful 
            multi-day retreat, we offer the perfect blend of excitement and relaxation. Experience wildlife safaris, forest 
            treks, water activities, and more - all guided by our expert naturalists who ensure your safety while maximizing 
            your connection with nature. Our commitment to sustainable tourism means you can enjoy the beauty of the jungle 
            while helping preserve it for future generations.
          </p>

          {/* Rating Cards */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-green-600 text-white p-4 rounded-lg">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl">4.8</span>
              </div>
              <div className="text-sm opacity-90">Excellent</div>
              <div className="text-xs opacity-75 mt-1">286 reviews</div>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Wildlife Rich</span>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Expert Guides</span>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Eco-Friendly</span>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center">
              <Star className="w-6 h-6 text-gray-700 mb-2" />
              <span className="text-gray-700">Scenic Views</span>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-gray-900">Our Offerings</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>

          {/* Day Visits */}
          <div className="mb-8">
            <h3 className="text-gray-900 mb-4">Day Visit at Sumiran</h3>
            <div className="space-y-4">
              {/* Full Day Visit */}
              <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                <Image 
                  src="https://images.unsplash.com/photo-1751931817996-368c9ee352ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwZm9yZXN0fGVufDF8fHx8MTc2MzY5ODIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Full day visit"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2">Full Day Visit at Sumiran</h4>
                  <div className="flex items-center gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>8-10 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>2 Activities</span>
                    </div>
                  </div>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Choose any 2 activities from our list
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Dedicated forest guide included
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Full forest safari experience
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Meals and refreshments included
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="mb-3">
                    <span className="text-2xl text-gray-900">₹2,999</span>
                    <span className="text-gray-600">/person</span>
                  </div>
                  {/* TODO: Re-enable booking functionality */}
                  {/* <button 
                    onClick={() => onSelectBooking('full-day')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book now
                  </button> */}
                </div>
              </div>

              {/* Half Day Visit */}
              <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                <Image 
                  src="https://images.unsplash.com/photo-1537166947947-46e504aa0555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBhZHZlbnR1cmUlMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc2MzY5ODIxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Half day visit"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2">Half Day Visit at Sumiran</h4>
                  <div className="flex items-center gap-6 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>4-5 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>1 Activity</span>
                    </div>
                  </div>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Choose any 1 activity from our list
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Activity guide included
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Light refreshments included
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="mb-3">
                    <span className="text-2xl text-gray-900">₹1,499</span>
                    <span className="text-gray-600">/person</span>
                  </div>
                  {/* TODO: Re-enable booking functionality */}
                  {/* <button 
                    onClick={() => onSelectBooking('half-day')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book now
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Stay at Sumiran */}
          <div>
            <h3 className="text-gray-900 mb-4">Stay at Sumiran</h3>
            <div className="p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1630823070635-5fe15b1a7c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjByZXNvcnR8ZW58MXx8fHwxNzYzNjk4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Resort stay"
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2">Immersive Stay Experience</h4>
                  <p className="text-gray-600 mb-3">
                    Choose from 4 luxury room types. All stays include 2 complimentary activities with the option to add more.
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      2 complimentary activities per stay
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Add additional activities as needed
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      All meals included
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      Access to all resort amenities
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="text-gray-900 mb-1">Deluxe Room</h5>
                  <p className="text-gray-600 mb-2">Cozy room with forest views</p>
                  <span className="text-gray-900">₹4,999/night</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="text-gray-900 mb-1">Premium Suite</h5>
                  <p className="text-gray-600 mb-2">Spacious suite with premium amenities</p>
                  <span className="text-gray-900">₹7,999/night</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="text-gray-900 mb-1">Forest Villa</h5>
                  <p className="text-gray-600 mb-2">Private villa in the forest</p>
                  <span className="text-gray-900">₹12,999/night</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="text-gray-900 mb-1">Royal Cottage</h5>
                  <p className="text-gray-600 mb-2">Luxurious cottage with butler service</p>
                  <span className="text-gray-900">₹18,999/night</span>
                </div>
              </div>

              {/* TODO: Re-enable booking functionality */}
              {/* <button 
                onClick={() => onSelectBooking('stay')}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Your Stay
              </button> */}
            </div>
          </div>
        </section>

        {/* Available Activities */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-gray-900">Available Activities</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {activities.map((activity, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg text-center hover:border-green-500 transition-colors">
                <span className="text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-gray-900">Location</h2>
            <div className="w-12 h-1 bg-green-600 mt-1"></div>
          </div>
          <div className="flex items-start gap-3 text-gray-700">
            <MapPin className="w-5 h-5 mt-1 shrink-0 text-green-600" />
            <div>
              <p className="text-gray-900 mb-1">Sumiran Forest Reserve</p>
              <p className="text-gray-600">Deep in the heart of pristine wilderness, surrounded by diverse flora and fauna. Easily accessible from major cities while maintaining complete seclusion.</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900">Reviews</h2>
              <div className="w-12 h-1 bg-green-600 mt-1"></div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Give your review
            </button>
          </div>

          {/* Overall Rating */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl text-gray-900">4.8</span>
              <span className="text-gray-600">Excellent</span>
            </div>
            <p className="text-gray-500">286 verified reviews</p>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-900">{review.rating}.0</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">{"<"}</button>
            <span className="text-gray-700">1 of 96</span>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">{">"}</button>
          </div>
        </section>
      </div>

    </div>
  );
}
