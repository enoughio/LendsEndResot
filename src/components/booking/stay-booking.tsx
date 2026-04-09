'use client'

// TODO : overfetching here in /api/booking 

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Calendar, Users, CheckCircle2, Plus, Minus, ShieldCheck, CreditCard, PhoneCall, Sparkles } from 'lucide-react';
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
        setImgSrc('/night sky.png');
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
  const checkInInputRef = useRef<HTMLInputElement>(null);
  const checkOutInputRef = useRef<HTMLInputElement>(null);
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
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleBack = () => {
    router.push('/booking');
  };

  const openCheckInPicker = () => {
    const input = checkInInputRef.current;
    if (!input) return;
    input.focus();
    (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
  };

  const openCheckOutPicker = () => {
    const input = checkOutInputRef.current;
    if (!input) return;
    input.focus();
    (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
  };


  // get all rooms information
  useEffect(() => {
    const loadCatalog = async () => {  
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to load booking data');
        const json = (await res.json()) as BookingCatalogResponse;
        setRoomTypes(json.data.rooms || []);
        setActivities((json.data.activities || []));
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
          freeActivityIds: freeActivities,
        }),
      });

      const availabilityJson = await availabilityRes.json();
      if (!availabilityRes.ok) {
        throw new Error(availabilityJson?.error?.message || 'Availability check failed');
      }

      if (!availabilityJson?.data?.available) {
        setAvailabilityChecked(true);
        setIsAvailable(false);
        throw new Error('Selected room is not available for the selected dates.');
      }

      if (!availabilityChecked || !isAvailable) {
        setAvailabilityChecked(true);
        setIsAvailable(true);
        notifySuccess('Room is available', 'Click the button again to continue booking.');
        return;
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
          freeActivityIds: freeActivities,
        }),
      });
      const createJson = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createJson?.error?.message || 'Failed to create booking');
      }

      const bookingId = createJson?.data?.bookingId;
      notifySuccess('Stay booking created', 'Redirecting you to details and payment.');
      router.push(`/booking/${bookingId}/bill`);
    } catch (err) {
      const message = notifyError(err, 'Failed to confirm booking');
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedRoomData = roomTypes.find(r => r.id === selectedRoom);
  const selectedActivityKey = selectedActivityIds.join(',');
  const freeActivityKey = freeActivities.join(',');

  useEffect(() => {
    setAvailabilityChecked(false);
    setIsAvailable(false);
  }, [selectedRoom, checkInDate, checkOutDate, numGuests, selectedActivityKey, freeActivityKey]);

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
  const occupancyLimit = selectedRoomData?.maxOccupancy || 6;
  const basePrice = selectedRoomData && nights ? selectedRoomData.basePrice * nights : 0;
  const additionalActivitiesTotal = Object.entries(additionalActivities).reduce((sum, [activityId, count]) => {
    const activity = activities.find(a => a.id === activityId);
    return sum + (activity?.price || 0) * count;
  }, 0);
  const taxes = Math.floor((basePrice + additionalActivitiesTotal) * 0.05);
  const serviceFee = 200;
  const grandTotal = basePrice + additionalActivitiesTotal + taxes + serviceFee;
  const bookingSteps = [
    { id: '1', label: 'Choose room' },
    { id: '2', label: 'Select dates & guests' },
    { id: '3', label: 'Pick activities' },
    { id: '4', label: 'Review and pay' },
  ];
  const roomSkeletons = [1, 2, 3];

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-sky-50/40">


      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1630823070635-5fe15b1a7c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjByZXNvcnR8ZW58MXx8fHwxNzYzNjk4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Resort stay"
          width={1920}
          height={192}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-linear-to-r from-slate-900/80 via-slate-900/40 to-transparent">
          <div className="max-w-7xl mx-auto ml-25 mt-5 px-6 h-full flex items-center">
            <div>
              <button onClick={handleBack} className="flex items-center gap-2 text-white mb-2 hover:text-green-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to offerings
              </button>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Nature stay booking
              </p>
              <h1 className="mt-2 text-white mb-2">Stay at Sumiran</h1>
              <p className="text-sm text-white/85">Pick your room, dates, guests, and activities in one flow.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto  md:px-16 py-8 ">
        <div className="mb-6 rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm">
          <p className="mb-3 text-sm font-medium text-gray-700">Booking steps</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {bookingSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2 text-sm text-gray-700">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">{step.id}</span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}

            {/* Room Selection */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-gray-900 mb-1 text-2xl font-bold">Choose Your Room</h2>
              <p className="mb-4 text-sm text-gray-600">Select the stay option that matches your group size and comfort preference.</p>
              {loading ? (
                <div className="space-y-4">
                  {roomSkeletons.map((item) => (
                    <div key={item} className="rounded-xl border border-gray-200 p-4">
                      <div className="animate-pulse flex items-start gap-4">
                        <div className="h-20 w-20 rounded bg-gray-200" />
                        <div className="flex-1 space-y-3">
                          <div className="h-4 w-2/5 rounded bg-gray-200" />
                          <div className="h-3 w-full rounded bg-gray-100" />
                          <div className="h-3 w-4/5 rounded bg-gray-100" />
                          <div className="flex gap-2">
                            <div className="h-6 w-16 rounded-full bg-gray-100" />
                            <div className="h-6 w-20 rounded-full bg-gray-100" />
                            <div className="h-6 w-14 rounded-full bg-gray-100" />
                          </div>
                          <div className="h-4 w-1/3 rounded bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {roomTypes.map((room) => {
                    const isSelected = selectedRoom === room.id;
                    
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-green-600 bg-green-50 shadow-sm'
                            : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
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
                            <div className="flex items-start justify-between mb-2 gap-3">
                              <h3 className="text-gray-900 font-semibold">{room.name}</h3>
                              {isSelected && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Selected
                                </span>
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
                              <span className="text-gray-900 font-semibold">₹{room.basePrice.toLocaleString()}/night</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {selectedRoom && (
              <>
                {/* Stay Details */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-gray-900 mb-1 text-xl font-semibold">Stay Details</h2>
                  <p className="mb-4 text-sm text-gray-600">Click anywhere on a date card to open the calendar quickly.</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={openCheckInPicker}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openCheckInPicker();
                      }
                    }}
                    className="rounded-xl border border-gray-200 bg-linear-to-br from-white to-green-50 p-4 shadow-xs transition-all hover:border-green-400 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Check-In</p>
                      <Calendar className="w-4 h-4 text-green-700" />
                    </div>
                    <p className="mt-2 text-gray-900">
                      {checkInDate ? new Date(checkInDate).toLocaleDateString() : 'Select arrival date'}
                    </p>
                    <input
                      ref={checkInInputRef}
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={openCheckOutPicker}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openCheckOutPicker();
                      }
                    }}
                    className="rounded-xl border border-gray-200 bg-linear-to-br from-white to-emerald-50 p-4 shadow-xs transition-all hover:border-emerald-400 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Check-Out</p>
                      <Calendar className="w-4 h-4 text-emerald-700" />
                    </div>
                    <p className="mt-2 text-gray-900">
                      {checkOutDate ? new Date(checkOutDate).toLocaleDateString() : 'Select departure date'}
                    </p>
                    <input
                      ref={checkOutInputRef}
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1 rounded-xl border border-gray-200 bg-linear-to-br from-white to-blue-50 p-4 shadow-xs">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Guests</p>
                      <Users className="w-4 h-4 text-blue-700" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{numGuests}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setNumGuests((prev) => Math.max(1, prev - 1))}
                        className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-gray-700 transition-colors hover:bg-gray-100"
                        aria-label="Decrease guests"
                      >
                        -
                      </button>
                      <div className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-gray-700">
                        {numGuests === 1 ? '1 guest' : `${numGuests} guests`}
                      </div>
                      <button
                        type="button"
                        onClick={() => setNumGuests((prev) => Math.min(occupancyLimit, prev + 1))}
                        className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-gray-700 transition-colors hover:bg-gray-100"
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Max {occupancyLimit} guests for this room</p>
                  </div>
                </div>
                </section>

                {/* Free Activities */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-gray-900 mb-2 text-xl font-semibold">Select 2 Complimentary Activities</h2>
                  <p className="text-gray-600 mb-4">
                    Choose 2 activities included with your stay ({freeActivities.length}/2 selected)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {activities.map((activity) => {
                      const isSelected = freeActivities.includes(activity.id);
                      const isDisabled = !isSelected && freeActivities.length >= 2;
                      
                      return (
                        <div
                          key={activity.id}
                          onClick={() => !isDisabled && toggleFreeActivity(activity.id)}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
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
                </section>

                {/* Additional Activities */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-gray-900 mb-2 text-xl font-semibold">Add More Activities</h2>
                  <p className="text-gray-600 mb-4">
                    Book additional activities for an extra charge
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {activities.map((activity) => {
                      const count = additionalActivities[activity.id] || 0;
                      const isFree = freeActivities.includes(activity.id);
                      
                      return (
                        <div
                          key={activity.id}
                          className={`p-3 rounded-xl border-2 ${
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
                </section>



          



              </>
            )}
          </div>

          {/* Right Column - Price Summary */}
          {selectedRoom && (  
            <div className="lg:col-span-1">
              <div className="sticky top-4 rounded-2xl border border-blue-200 bg-linear-to-b from-blue-50 to-white p-6 shadow-sm">
                <div className="mb-4">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1630823070635-5fe15b1a7c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjByZXNvcnR8ZW58MXx8fHwxNzYzNjk4MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Stay"
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-900 mb-1">{selectedRoomData?.name}</h3>
                  <p className="text-gray-600">Land&apos;s End The Last Resort</p>
                  {checkInDate && checkOutDate && (
                    <p className="mt-2 rounded-lg bg-blue-100 px-3 py-2 text-xs text-blue-800">
                      {nights} {nights === 1 ? 'night' : 'nights'} stay selected
                    </p>
                  )}
                  {/* <div className="flex items-center gap-1 mt-2">
                    <span className="text-gray-900">4.8</span>
                    <span className="text-gray-600">Excellent</span>
                    <span className="text-gray-500 ml-1">286 reviews</span>
                  </div> */}
                </div>

                <div className="mb-4 border-b border-blue-200">
                  {/* <p className="text-gray-600 mb-1">Your booking is protected by <span className="text-gray-900">Sumiran</span></p> */}
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
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? 'Checking...'
                    : availabilityChecked && isAvailable
                    ? 'Available - Continue Booking'
                    : availabilityChecked && !isAvailable
                    ? 'Not Available - Try Different Dates'
                    : 'Check Availability'}
                </button>
                {/* <button 
                  disabled={submitting}
                  onClick={handleConfirmBooking}
                  className="w-full py-3 mt-3  border-green-500 border-2 rounded-lg hover:bg-green-200 transition-colors hover:scale-104 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Confirming...' : 'Confirm Booking (pay now)'}
                </button> */}
                {missingRequirements.length > 0 && (
                  <p className="mt-3 text-sm text-amber-700">
                    Please complete: {missingRequirements.join(', ')}.
                  </p>
                )}

                <div className="mt-4 border-t border-blue-200 pt-4 space-y-2 text-xs text-gray-600">
                  <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Secure booking and payment flow</p>
                  <p className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-blue-600" /> Instant confirmation after successful payment</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-gray-900 text-xl font-semibold mb-1">Important Booking Information</h2>
          <p className="text-gray-600 text-sm mb-5">Please review these details before confirming your stay.</p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <h3 className="text-sm font-semibold text-emerald-800 mb-2">Check-In / Check-Out</h3>
              <p className="text-sm text-emerald-900/90">Check-in starts at 1:00 PM and check-out is by 11:00 AM. Early check-in depends on room availability.</p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Cancellation Policy</h3>
              <p className="text-sm text-blue-900/90">Free cancellation up to 72 hours before check-in. After that, cancellation charges may apply.</p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">Activities and Safety</h3>
              <p className="text-sm text-amber-900/90">Guided activities are weather dependent. Follow guide instructions and use provided safety equipment.</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Need Help?</h3>
              <p className="text-sm text-slate-700 mb-2">Our team can help with room selection and custom group requests.</p>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                <PhoneCall className="h-4 w-4" />
                +91 98765 43210
              </p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
