'use client'

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, Users, CheckCircle2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { notifyError, notifyInfo, notifySuccess } from '@/lib/client-notify';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StayBookingProps {}

// Simple image component with error handling
function ImageWithFallback({ src, alt, className, width, height }: { src: string; alt: string; className?: string; width?: number; height?: number }) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image 
      src={imgSrc} 
      alt={alt} 
      width={width || 400}
      height={height || 300}
      className={className}
      onError={() => {
        setImgSrc('/placeholder.png');
      }}
    />
  );
}
type RoomTypeApi = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  amenities: string[];
};

type ActivityApi = {
  id: string;
  name: string;
  duration: number;
  price: number;
  status: string;
};

type BookingCatalogResponse = {
  data: {
    rooms: RoomTypeApi[];
    activities: ActivityApi[];
  };
};

export function StayBooking({ }: StayBookingProps) {
  const router = useRouter();
  const [roomTypes, setRoomTypes] = useState<RoomTypeApi[]>([]);
  const [activities, setActivities] = useState<ActivityApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [freeActivities, setFreeActivities] = useState<string[]>([]);
  const [additionalActivities, setAdditionalActivities] = useState<Record<string, number>>({});
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numGuests, setNumGuests] = useState(2);

  const handleBack = () => {
    router.push('/booking');
  };

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/booking');
        if (!res.ok) throw new Error('Failed to load booking data');
        const json = (await res.json()) as BookingCatalogResponse;
        setRoomTypes(json.data.rooms || []);
        setActivities((json.data.activities || []).filter((activity) => activity.status.toUpperCase() !== 'INACTIVE'));
      } catch (err) {
        const message = notifyError(err, 'Failed to load booking data');
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    void loadCatalog();
  }, []);

  const selectedActivityIds = useMemo(() => {
    const extras = Object.entries(additionalActivities)
      .filter(([, count]) => count > 0)
      .map(([id]) => id)
      .filter((id) => !freeActivities.includes(id));
    return [...freeActivities, ...extras];
  }, [additionalActivities, freeActivities]);

  const missingRequirements = useMemo(() => {
    const missing: string[] = [];
    if (!checkInDate) missing.push('Select check-in date');
    if (!checkOutDate) missing.push('Select check-out date');
    if (freeActivities.length !== 2) missing.push('Select 2 complimentary activities');
    return missing;
  }, [checkInDate, checkOutDate, freeActivities.length]);

  const handleConfirmBooking = async () => {
    if (!selectedRoom) {
      notifyInfo('Please select a room before continuing.');
      return;
    }

    if (missingRequirements.length > 0) {
      notifyInfo(`Please complete: ${missingRequirements.join(', ')}.`);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const availabilityRes = await fetch('/api/availability/stay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomTypeId: selectedRoom,
          checkIn: new Date(checkInDate).toISOString(),
          checkOut: new Date(checkOutDate).toISOString(),
          guests: numGuests,
          activityIds: selectedActivityIds,
        }),
      });

      const availabilityJson = await availabilityRes.json();
      if (!availabilityRes.ok) {
        throw new Error(availabilityJson?.error?.message || 'Availability check failed');
      }

      if (!availabilityJson?.data?.available) {
        throw new Error('Selected room is not available for the selected dates.');
      }

      const createRes = await fetch('/api/bookings/stay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomTypeId: selectedRoom,
          checkIn: new Date(checkInDate).toISOString(),
          checkOut: new Date(checkOutDate).toISOString(),
          guests: numGuests,
          activityIds: selectedActivityIds,
        }),
      });
      const createJson = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createJson?.error?.message || 'Failed to create booking');
      }

      const bookingId = createJson?.data?.bookingId;
      notifySuccess('Stay booking created', 'Redirecting you to confirmation.');
      router.push(`/booking/booked?id=${bookingId}&type=stay`);
    } catch (err) {
      const message = notifyError(err, 'Failed to confirm booking');
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedRoomData = roomTypes.find(r => r.id === selectedRoom);

  const toggleFreeActivity = (activityId: string) => {
    if (freeActivities.includes(activityId)) {
      setFreeActivities(freeActivities.filter(id => id !== activityId));
    } else if (freeActivities.length < 2) {
      setFreeActivities([...freeActivities, activityId]);
    }
  };

  const updateAdditionalActivity = (activityId: string, change: number) => {
    const current = additionalActivities[activityId] || 0;
    const newValue = Math.max(0, current + change);
    
    if (newValue === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [activityId]: _removed, ...rest } = additionalActivities;
      setAdditionalActivities(rest);
    } else {
      setAdditionalActivities({ ...additionalActivities, [activityId]: newValue });
    }
  };

  const nights = checkInDate && checkOutDate ? Math.max(1, Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const basePrice = selectedRoomData && nights ? selectedRoomData.basePrice * nights : 0;
  const additionalActivitiesTotal = Object.entries(additionalActivities).reduce((sum, [activityId, count]) => {
    const activity = activities.find(a => a.id === activityId);
    return sum + (activity?.price || 0) * count;
  }, 0);
  const taxes = Math.floor((basePrice + additionalActivitiesTotal) * 0.05);
  const serviceFee = 200;
  const grandTotal = basePrice + additionalActivitiesTotal + taxes + serviceFee;

  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1630823070635-5fe15b1a7c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjByZXNvcnR8ZW58MXx8fHwxNzYzNjk4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Resort stay"
          width={1920}
          height={192}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-l-to-r from-slate-900/70 to-transparent">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div>
              <button onClick={handleBack} className="flex items-center gap-2 text-white mb-2 hover:text-green-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to offerings
              </button>
              <h1 className="text-white mb-2">Stay at Sumiran</h1>
              <div className="w-12 h-1 bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto  md:px-16 py-8 ">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {loading && <p className="text-gray-600">Loading booking options...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {/* Room Selection */}
            <div>
              <h2 className="text-gray-900 mb-4">Choose Your Room</h2>
              <div className="space-y-4">
                {roomTypes.map((room) => {
                  const isSelected = selectedRoom === room.id;
                  
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1614506660579-c6c478e2f349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjByb29tfGVufDF8fHx8MTc2MzU3NTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt={room.name}
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-gray-900">{room.name}</h3>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{room.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {room.amenities.map((amenity) => (
                              <span key={amenity} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                {amenity}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Up to {room.maxOccupancy} guests</span>
                            <span className="text-gray-900">₹{room.basePrice.toLocaleString()}/night</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedRoom && (
              <>
                {/* Stay Details */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="text-gray-600 mb-2 block">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-gray-900 focus:outline-none"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="text-gray-600 mb-2 block">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="w-full text-gray-900 focus:outline-none"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="text-gray-600 mb-2 block">
                      <Users className="w-4 h-4 inline mr-2" />
                      Guests
                    </label>
                    <input
                      type="number"
                      value={numGuests}
                      onChange={(e) => setNumGuests(Math.max(1, Math.min(selectedRoomData?.maxOccupancy || 6, parseInt(e.target.value) || 1)))}
                      min="1"
                      max={selectedRoomData?.maxOccupancy || 6}
                      className="w-full text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Free Activities */}
                <div>
                  <h2 className="text-gray-900 mb-2">Select 2 Complimentary Activities</h2>
                  <p className="text-gray-600 mb-4">
                    Choose 2 activities included with your stay ({freeActivities.length}/2 selected)
                  </p>
                  <div className="grid md:grid-cols-4 gap-3">
                    {activities.map((activity) => {
                      const isSelected = freeActivities.includes(activity.id);
                      const isDisabled = !isSelected && freeActivities.length >= 2;
                      
                      return (
                        <div
                          key={activity.id}
                          onClick={() => !isDisabled && toggleFreeActivity(activity.id)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-green-600 bg-green-50'
                              : isDisabled
                              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-gray-900 text-sm">{activity.name}</p>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-gray-500 text-xs">{activity.duration}h</p>
                          <p className="text-green-700 text-sm mt-1">Free</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Activities */}
                <div>
                  <h2 className="text-gray-900 mb-2">Add More Activities</h2>
                  <p className="text-gray-600 mb-4">
                    Book additional activities for an extra charge
                  </p>
                  <div className="grid md:grid-cols-4 gap-3">
                    {activities.map((activity) => {
                      const count = additionalActivities[activity.id] || 0;
                      const isFree = freeActivities.includes(activity.id);
                      
                      return (
                        <div
                          key={activity.id}
                          className={`p-3 rounded-lg border-2 ${
                            isFree ? 'border-gray-200 bg-gray-50 opacity-50' : 'border-gray-200'
                          }`}
                        >
                          <p className="text-gray-900 text-sm mb-1">{activity.name}</p>
                          <p className="text-gray-500 text-xs mb-1">{activity.duration}h</p>
                          <p className="text-gray-900 text-sm mb-2">₹{activity.price}</p>
                          
                          {!isFree && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateAdditionalActivity(activity.id, -1)}
                                className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
                                disabled={count === 0}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="flex-1 text-center text-sm">{count}</span>
                              <button
                                onClick={() => updateAdditionalActivity(activity.id, 1)}
                                className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                          {isFree && (
                            <p className="text-gray-500 text-xs text-center">Selected as free</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>



                {/* Login Section */}
                {/* <div className="border-t pt-6">
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
                        We&apos;ll call or text you to confirm your number.
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
                </div> */}



              </>
            )}
          </div>

          {/* Right Column - Price Summary */}
          {selectedRoom && (  
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 sticky top-4">
                <div className="mb-4">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1630823070635-5fe15b1a7c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjByZXNvcnR8ZW58MXx8fHwxNzYzNjk4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Stay"
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-900 mb-1">{selectedRoomData?.name}</h3>
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

                {checkInDate && checkOutDate && (
                  <>
                    <div className="mb-4 pb-4 border-b border-blue-200">
                      <h4 className="text-gray-900 mb-3">Price Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-700">
                          <span>Room ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                          <span>₹{basePrice.toLocaleString()}</span>
                        </div>
                        {Object.entries(additionalActivities).map(([activityId, count]) => {
                          const activity = activities.find(a => a.id === activityId);
                          if (!activity || count === 0) return null;
                          return (
                            <div key={activityId} className="flex justify-between text-gray-700">
                              <span>{activity.name} × {count}</span>
                              <span>₹{(activity.price * count).toLocaleString()}</span>
                            </div>
                          );
                        })}
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
                  </>
                )}

                {/* TODO: Re-enable booking functionality */}
                <button 
                  disabled={submitting}
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-200 hover:border-green-400 hover:border-2 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Confirming...' : 'Confirm Booking (pay at property)'}
                </button>
                <button 
                  disabled={submitting}
                  onClick={handleConfirmBooking}
                  className="w-full py-3 mt-3  border-green-500 border-2 rounded-lg hover:bg-green-200 transition-colors hover:scale-104 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Confirming...' : 'Confirm Booking (pay now)'}
                </button>
                {missingRequirements.length > 0 && (
                  <p className="mt-3 text-sm text-amber-700">
                    Please complete: {missingRequirements.join(', ')}.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
