# Booking Flow Documentation

## Overview
This document describes the booking flow for the Sumiran Resort booking system.

## Flow Diagram

```
/booking (Overview Page)
    ↓
    ├─→ /booking/visit?type=full  (Full Day Visit)
    │       ↓
    │       └─→ /booking/booked?type=full  (Confirmation)
    │
    ├─→ /booking/visit?type=half  (Half Day Visit)
    │       ↓
    │       └─→ /booking/booked?type=half  (Confirmation)
    │
    └─→ /booking/stay  (Resort Stay)
            ↓
            └─→ /booking/booked?type=stay&room={roomId}  (Confirmation)
```

## Pages

### 1. Overview Page (`/booking`)
**Component:** `OverviewPage`
**File:** `src/components/booking/overview-page.tsx`

**Features:**
- Displays all available booking options
- Shows resort ratings and reviews
- Lists available activities
- Provides booking cards for:
  - Full Day Visit (₹2,999/person)
  - Half Day Visit (₹1,499/person)
  - Resort Stay (4 room types)

**User Actions:**
- Click "Book now" on Full Day Visit → redirects to `/booking/visit?type=full`
- Click "Book now" on Half Day Visit → redirects to `/booking/visit?type=half`
- Click "Book Your Stay" → redirects to `/booking/stay`

### 2. Day Visit Booking Page (`/booking/visit`)
**Component:** `DayVisitBooking`
**File:** `src/components/booking/day-visit-booking.tsx`

**Features:**
- Reads `type` query parameter (full | half)
- Activity selection (2 for full day, 1 for half day)
- Date picker for visit date
- Guest count selection
- Price calculation with taxes and service fee
- Login/signup section

**User Actions:**
- Select activities (required)
- Choose visit date (required)
- Enter number of guests
- Click "Confirm Booking" → redirects to `/booking/booked?type={type}`

### 3. Stay Booking Page (`/booking/stay`)
**Component:** `StayBooking`
**File:** `src/components/booking/stay-booking.tsx`

**Features:**
- Room type selection:
  - Deluxe Room (₹4,999/night)
  - Executive Rooms (₹7,999/night)
  - Tower Room (₹12,999/night)
  - Dorm Bed (₹18,999/night)
- Check-in/check-out date selection
- Guest count (limited by room capacity)
- 2 complimentary activities (required)
- Additional paid activities
- Price breakdown with taxes

**User Actions:**
- Select a room type (required)
- Choose check-in and check-out dates (required)
- Select 2 complimentary activities (required)
- Optionally add paid activities
- Click "Confirm Booking" → redirects to `/booking/booked?type=stay&room={roomId}`

### 4. Booking Confirmation Page (`/booking/booked`)
**Component:** `BookedContent`
**File:** `src/app/booking/booked/page.tsx`

**Features:**
- Reads query parameters: `type` and optional `room`
- Displays success message
- Shows booking details:
  - Booking type/room name
  - Booking reference number
  - Booking date
  - Location information
  - Contact information
- Next steps checklist
- Action buttons to book again or return home

**User Actions:**
- Click "Book Another Experience" → redirects to `/booking`
- Click "Return to Home" → redirects to `/`

## Technical Details

### State Management
Each booking component uses React hooks (`useState`) for local state management:
- Selected activities
- Dates
- Guest counts
- Room selection
- Additional activities

### Navigation
- Uses Next.js `useRouter` from `next/navigation`
- Query parameters for passing data between pages
- Programmatic navigation on form submission

### Form Validation
Booking confirmation buttons are disabled until:
- **Day Visit:** Required number of activities selected + valid date
- **Stay:** Room selected + 2 activities selected + valid dates

### Dummy Payment
Currently, clicking "Confirm Booking" immediately redirects to the confirmation page.
In a production app, this would:
1. Validate all form data
2. Integrate with a payment gateway (Stripe, Razorpay, etc.)
3. Process payment
4. Create booking in database
5. Send confirmation email
6. Then redirect to confirmation page

## Future Enhancements
1. Add payment gateway integration
2. Implement user authentication
3. Store bookings in database
4. Send email confirmations
5. Add booking management (view/cancel bookings)
6. Implement availability calendar
7. Add real-time pricing
8. Include discount codes/coupons

## Conclusion
