'use client'

import { useState } from 'react';
import { ArrowLeft, Calendar, Users, CheckCircle2, Clock, TreePine, Facebook, Apple } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DayVisitBookingProps {
  type?: 'full' | 'half';
}

const activities = [
  { id: 'bird-watching', name: 'Bird Watching', duration: '2 hours', price: 500 },
  { id: 'jungle-trek', name: 'Jungle Trek', duration: '3 hours', price: 800 },
  { id: 'wildlife-safari', name: 'Wildlife Safari', duration: '2.5 hours', price: 1200 },
  { id: 'river-rafting', name: 'River Rafting', duration: '2 hours', price: 1500 },
  { id: 'kayaking', name: 'Kayaking', duration: '1.5 hours', price: 800 },
  { id: 'rock-climbing', name: 'Rock Climbing', duration: '2 hours', price: 1000 },
  { id: 'nature-photography', name: 'Nature Photography', duration: '3 hours', price: 700 },
  { id: 'campfire', name: 'Campfire Experience', duration: '1.5 hours', price: 600 },
];

export function DayVisitBooking({ type = 'full' }: DayVisitBookingProps) {
  const router = useRouter();
  const maxActivities = type === 'full' ? 2 : 1;
  const basePrice = type === 'full' ? 2999 : 1499;
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [visitDate, setVisitDate] = useState('');
  const [numGuests, setNumGuests] = useState(2);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleBack = () => {
    router.push('/booking');
  };

  // TODO: Re-enable when booking functionality is restored
  // const handleConfirmBooking = () => {
  //   // Dummy payment - in real app, integrate payment gateway
  //   router.push('/booking/booked?type=' + type);
  // };

  const toggleActivity = (activityId: string) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    } else if (selectedActivities.length < maxActivities) {
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  const totalPrice = basePrice * numGuests;
  const taxes = Math.floor(totalPrice * 0.05);
  const serviceFee = 100;
  const grandTotal = totalPrice + taxes + serviceFee;

  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1751931817996-368c9ee352ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwZm9yZXN0fGVufDF8fHx8MTc2MzY5ODIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Day visit"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/70 to-transparent">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div>
              <button onClick={handleBack} className="flex items-center gap-2 text-white mb-2 hover:text-green-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to offerings
              </button>
              <h1 className="text-white mb-2">{type === 'full' ? 'Full Day Visit' : 'Half Day Visit'} Booking</h1>
              <div className="w-12 h-1 bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Info */}
            <div>
              <h2 className="text-gray-900 mb-4">{type === 'full' ? 'Full Day Visit at Sumiran' : 'Half Day Visit at Sumiran'}</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Clock className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="text-gray-900">{type === 'full' ? '8-10 hours' : '4-5 hours'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-gray-600">Activities</p>
                    <p className="text-gray-900">{maxActivities} included</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <TreePine className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-gray-600">Guide</p>
                    <p className="text-gray-900">Included</p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-gray-900 mb-3">What&apos;s Included</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {type === 'full' ? (
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Choose {maxActivities} activities</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Dedicated forest guide</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Full forest safari</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Meals & refreshments</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Choose {maxActivities} activity</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Activity guide</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Light refreshments</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Safety equipment</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Activity Selection */}
            <div>
              <h2 className="text-gray-900 mb-2">Select Your Activities</h2>
              <p className="text-gray-600 mb-4">
                Choose {maxActivities} {maxActivities === 1 ? 'activity' : 'activities'} ({selectedActivities.length}/{maxActivities} selected)
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {activities.map((activity) => {
                  const isSelected = selectedActivities.includes(activity.id);
                  const isDisabled = !isSelected && selectedActivities.length >= maxActivities;
                  
                  return (
                    <div
                      key={activity.id}
                      onClick={() => !isDisabled && toggleActivity(activity.id)}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-green-600 bg-green-50'
                          : isDisabled
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-900">{activity.name}</h4>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visit Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-gray-600 mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Visit Date
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full text-gray-900 focus:outline-none"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="text-gray-600 mb-2 block">
                  <Users className="w-4 h-4 inline mr-2" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  value={numGuests}
                  onChange={(e) => setNumGuests(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="20"
                  className="w-full text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Login Section */}
            <div className="border-t pt-6">
              <h2 className="text-gray-900 mb-4">Login or Sign up to book</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    We&apos;ll call or text you to confirm your number. Standard message and data rates apply.
                  </p>
                </div>

                <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Continue
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-gray-500">Or</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Apple className="w-5 h-5" />
                  </button>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#EA4335"/>
                    <path d="M18 12h-6v6h-1v-6H5v-1h6V5h1v6h6v1z" fill="white"/>
                  </svg>
                  Continue with email
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 sticky top-4">
              <div className="mb-4">
                <div className="relative w-full h-32 mb-3">
                  <Image 
                    src="https://images.unsplash.com/photo-1751931817996-368c9ee352ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwZm9yZXN0fGVufDF8fHx8MTc2MzY5ODIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Day visit"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-gray-900 mb-1">{type === 'full' ? 'Full Day Visit' : 'Half Day Visit'}</h3>
                <p className="text-gray-600">Sumiran Jungle Resort</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-gray-900">4.8</span>
                  <span className="text-gray-600">Excellent</span>
                  <span className="text-gray-500 ml-1">286 reviews</span>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-blue-200">
                <p className="text-gray-600 mb-1">Your booking is protected by <span className="text-gray-900">Sumiran</span></p>
              </div>

              <div className="mb-4 pb-4 border-b border-blue-200">
                <h4 className="text-gray-900 mb-3">Price Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Base Fare ({numGuests} {numGuests === 1 ? 'guest' : 'guests'})</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes (5%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Service Fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-gray-900 mb-4">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              {/* TODO: Re-enable booking functionality */}
              {/* <button 
                disabled={selectedActivities.length !== maxActivities || !visitDate}
                onClick={handleConfirmBooking}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button> */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
