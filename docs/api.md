# Lendsend Booking API Documentation (Draft v1)

Base URL: `/api`

## 1. Conventions

### 1.1 Auth
- Public routes: no auth required
- Admin routes: `Authorization: Bearer <token>` with `role=ADMIN`

### 1.2 Content type
- `Content-Type: application/json`

### 1.3 Response format

Success (single):

```json
{ "data": {} }
```

Success (list):

```json
{ "data": [], "meta": { "page": 1, "pageSize": 20, "total": 120 } }
```

Error:

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Validation failed",
    "details": {}
  }
}
```

### 1.4 Status codes
- `200` OK
- `201` Created
- `204` No Content
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `409` Conflict
- `422` Unprocessable Entity
- `500` Internal Server Error

### 1.5 Domain enums
- `BookingType`: `STAY | VISIT`
- `BookingStatus`: `PENDING | CONFIRMED | CANCELLED | REFUNDED | FAILED`
- `PaymentStatus`: `PENDING | PAID | FAILED | REFUNDED`
- `RoomStatus`: `AVAILABLE | INACTIVE | MAINTENANCE`

---

## 2. User Flow (Current Frontend Flow)

1. User selects `roomType`, `checkIn/checkOut`, `guests`, and `activities` in the same step.
2. User clicks **Check Availability**.
3. Backend validates and checks availability.
4. If available, user proceeds to Guest Details page.
5. User submits guest details.
6. User starts payment.
7. On successful payment callback/webhook, booking is marked `CONFIRMED`.

---

## 3. Public/User APIs

## 3.1 Booking page data (cacheable)

### GET `/booking`
Returns room types and visit packages for booking UI.

Response:

```json
{
  "data": {
    "rooms": [
      {
        "id": "rt_1",
        "name": "Royal Cottage",
        "description": "Garden-facing",
        "basePrice": 9999,
        "capacity": 4,
        "amenities": ["wifi", "food", "pool"],
        "totalRooms": 8
      }
    ],
    "visitPackages": [
      {
        "id": "vp_1",
        "name": "Short Visit",
        "description": "3 hours package",
        "durationHours": 3,
        "basePrice": 6000,
        "maxGroupSize": 3,
        "status": "ACTIVE"
      }
    ]
  }
}
```

Caching:
- `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`

## 3.2 Check stay availability

### POST `/availability/stay`
Checks availability after room type, date, guests, and activities are selected.

Request:

```json
{
  "roomTypeId": "rt_1",
  "checkIn": "2026-04-12T12:00:00.000Z",
  "checkOut": "2026-04-14T10:00:00.000Z",
  "guests": 2,
  "activityIds": ["act_1", "act_3"]
}
```

Response (available):

```json
{
  "data": {
    "available": true,
    "availableCount": 3,
    "priceBreakdown": {
      "roomBaseAmount": 19998,
      "activitiesAmount": 2500,
      "taxAmount": 4050,
      "totalAmount": 26548,
      "currency": "INR"
    }
  }
}
```

Response (not available):

```json
{
  "data": {
    "available": false,
    "availableCount": 0,
    "alternatives": [
      {
        "roomTypeId": "rt_2",
        "name": "Deluxe Room",
        "availableCount": 2
      }
    ]
  }
}
```

Rules:
- `activityIds.length >= 1` (enforced in backend logic)
- `checkOut > checkIn`

Caching:
- `Cache-Control: no-store`

## 3.3 Create stay booking (PENDING)

### POST `/bookings/stay`
Creates a tentative stay booking.

Request:

```json
{
  "roomTypeId": "rt_1",
  "checkIn": "2026-04-12T12:00:00.000Z",
  "checkOut": "2026-04-14T10:00:00.000Z",
  "guests": 2,
  "activityIds": ["act_1", "act_3"]
}
```

Response:

```json
{
  "data": {
    "bookingId": "bk_123",
    "type": "STAY",
    "status": "PENDING",
    "paymentStatus": "PENDING",
    "totalAmount": 26548,
    "currency": "INR",
    "expiresAt": "2026-04-12T12:15:00.000Z"
  }
}
```

## 3.4 Create visit booking (PENDING)

### POST `/bookings/visit`

Request:

```json
{
  "visitPackageId": "vp_1",
  "visitDate": "2026-04-20T09:00:00.000Z",
  "guests": 3,
  "activityIds": ["act_2"]
}
```

Response:

```json
{
  "data": {
    "bookingId": "bk_456",
    "type": "VISIT",
    "status": "PENDING",
    "totalAmount": 9200,
    "currency": "INR"
  }
}
```

## 3.5 Save guest details

### POST `/bookings/:id/details`

Request:

```json
{
  "name": "Shreya Kapoor",
  "email": "shreya@example.com",
  "phone": "9999999999",
  "specialRequest": "Late check-in"
}
```

Response:

```json
{ "data": { "bookingId": "bk_123", "detailsSaved": true } }
```

## 3.6 Start payment

### POST `/bookings/:id/pay`

Request:

```json
{
  "provider": "razorpay",
  "returnUrl": "https://yourapp.com/booking/booked?bookingId=bk_123"
}
```

Response:

```json
{
  "data": {
    "orderId": "order_xyz",
    "gateway": "razorpay",
    "amount": 26548,
    "currency": "INR",
    "bookingId": "bk_123"
  }
}
```

## 3.7 Payment webhook

### POST `/webhooks/payments/razorpay`
- Verifies gateway signature
- Updates payment and booking status

Response:

```json
{ "data": { "received": true } }
```

## 3.8 Booking details

### GET `/bookings/:id`

Response:

```json
{
  "data": {
    "bookingId": "bk_123",
    "type": "STAY",
    "status": "CONFIRMED",
    "paymentStatus": "PAID",
    "guestDetails": {
      "name": "Shreya Kapoor",
      "email": "shreya@example.com",
      "phone": "9999999999"
    },
    "stayDetails": {
      "roomType": "Royal Cottage",
      "roomNo": "A124",
      "checkIn": "2026-04-12T12:00:00.000Z",
      "checkOut": "2026-04-14T10:00:00.000Z"
    },
    "activities": [
      { "id": "act_1", "name": "Kayaking" },
      { "id": "act_3", "name": "Nature Walk" }
    ],
    "paymentDetails": {
      "totalAmount": 26548,
      "paidAmount": 26548,
      "paymentStatus": "PAID",
      "paymentMethod": "CARD"
    }
  }
}
```

---

## 4. Admin APIs (Protected)

## 4.1 Dashboard

### GET `/admin/dashboard/stats`

```json
{
  "data": {
    "activeStay": 12,
    "activeVisit": 8,
    "upcomingBookings": 20,
    "availableRooms": 18
  }
}
```

### GET `/admin/dashboard/recent-bookings?limit=10`

```json
{
  "data": [
    {
      "bookingId": "bk_1",
      "name": "Amit",
      "type": "STAY",
      "status": "CONFIRMED"
    }
  ]
}
```

### GET `/admin/dashboard/room-status`

```json
{
  "data": [
    {
      "roomType": "Royal Cottage",
      "basePrice": 9999,
      "availableRoom": 5,
      "allocatedRoom": 2,
      "maintenance": 1
    }
  ]
}
```

### GET `/admin/dashboard/visit-summary`

```json
{
  "data": {
    "shortVisit": { "total": 20, "avail": 8 },
    "halfDay": { "total": 10, "avail": 4 },
    "fullDay": { "total": 6, "avail": 2 }
  }
}
```

## 4.2 Room types
- `GET /admin/room-types`
- `POST /admin/room-types`
- `PATCH /admin/room-types/:id`
- `DELETE /admin/room-types/:id`

POST body example:

```json
{
  "name": "Royal Cottage",
  "description": "Garden facing",
  "basePrice": 9999,
  "capacity": 4,
  "amenities": ["wifi", "food", "pool"],
  "totalRooms": 8
}
```

## 4.3 Rooms
- `GET /admin/rooms`
- `POST /admin/rooms`
- `PATCH /admin/rooms/:id`
- `DELETE /admin/rooms/:id`

POST body example:

```json
{
  "roomNo": "R101",
  "roomTypeId": "rt_1",
  "floor": "Ground",
  "view": "Garden",
  "status": "AVAILABLE"
}
```

## 4.4 Visit packages
- `GET /admin/packages`
- `POST /admin/packages`
- `PATCH /admin/packages/:id`
- `DELETE /admin/packages/:id`

POST body example:

```json
{
  "name": "Short Visit",
  "packageType": "SHORT",
  "description": "3 hours",
  "durationHours": 3,
  "maxActivity": 2,
  "basePrice": 6000,
  "maxGroupSize": 3,
  "status": "ACTIVE"
}
```

## 4.5 Bookings (admin)
- `GET /admin/bookings?page=1&pageSize=20&status=CONFIRMED&type=STAY`
- `GET /admin/bookings/:id`
- `PUT /admin/bookings/:id`

PUT example:

```json
{
  "status": "CONFIRMED",
  "notes": "Verified by admin"
}
```

---

## 5. Business Rules

- Every booking must include at least one activity.
- STAY booking requires: `roomTypeId`, `checkIn`, `checkOut`, `guests`, `activityIds`.
- VISIT booking requires: `visitPackageId`, `visitDate`, `guests`, `activityIds`.
- `totalAmount` is stored as integer in smallest currency unit.
- Availability must check date overlap and room status.

Date overlap conflict logic:
- Conflict when NOT (`existing.checkOut <= new.checkIn` OR `existing.checkIn >= new.checkOut`)

---

## 6. Caching Strategy

- `GET /booking`: cache 7 days (`public, max-age=604800, stale-while-revalidate=86400`)
- `POST /availability/stay`: `no-store`
- `GET /bookings/:id`: private/no-cache
- Admin endpoints: no public cache; optional short server cache for dashboard widgets only

---

## 7. Security, Validation, Operations

- Enforce auth + role checks for admin routes.
- Validate request bodies (Zod/Joi).
- Use `Idempotency-Key` on booking creation/payment.
- Rate-limit public booking/payment endpoints.
- Verify payment webhook signatures.
- Record audit logs for admin actions and booking status transitions.
- Expire stale `PENDING` bookings via cron/background job.
