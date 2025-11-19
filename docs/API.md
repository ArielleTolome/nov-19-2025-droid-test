# API Documentation

## Quote Submission

### POST `/api/quote`

Submit a new quote request.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "zipCode": "90210",
  "dumpsterSize": "20",
  "serviceType": "residential",
  "projectType": "construction",
  "rentalDuration": "7-10 days",
  "deliveryDate": "2024-02-01",
  "address": "123 Main St",
  "message": "Additional details"
}
```

**Response:**
```json
{
  "success": true,
  "quoteId": "clx1234567890"
}
```

**Status Codes:**
- `201`: Quote created successfully
- `500`: Server error

## Database Models

### State
- `id`: String (CUID)
- `name`: String
- `slug`: String (unique)
- `abbreviation`: String
- `cities`: City[] (relation)

### City
- `id`: String (CUID)
- `name`: String
- `slug`: String
- `stateId`: String
- `population`: Int?
- `zipCodes`: String[]
- `latitude`: Float?
- `longitude`: Float?
- `content`: String?

### DumpsterSize
- `id`: String (CUID)
- `size`: Int (10, 20, 30, 40)
- `name`: String
- `slug`: String (unique)
- `dimensions`: String
- `capacity`: String
- `basePrice`: Float
- `description`: String
- `idealFor`: String[]

### ServiceType
- `id`: String (CUID)
- `name`: String
- `slug`: String (unique)
- `description`: String
- `icon`: String?

### Quote
- `id`: String (CUID)
- `name`: String
- `email`: String
- `phone`: String
- `cityId`: String?
- `dumpsterSize`: String
- `serviceType`: String
- `projectType`: String
- `rentalDuration`: String
- `deliveryDate`: DateTime?
- `address`: String?
- `zipCode`: String
- `message`: String?
- `status`: String (default: "pending")
- `createdAt`: DateTime
- `updatedAt`: DateTime
