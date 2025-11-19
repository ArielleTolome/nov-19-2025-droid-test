# Quote Form System - Usage Guide

This comprehensive quote form system includes multi-step quote forms and contact forms for the dumpster rental website.

## Files Created

### 1. Validation Schema
- **Location**: `/home/user/nov-19-2025-droid-test/app/lib/validations/quote.ts`
- **Purpose**: Zod validation schemas for both quote and contact forms
- **Exports**:
  - `locationSchema` - Validates Step 1 (Location)
  - `projectDetailsSchema` - Validates Step 2 (Project Details)
  - `contactInfoSchema` - Validates Step 3 (Contact Info)
  - `quoteFormSchema` - Combined schema for full quote form
  - `contactFormSchema` - Schema for contact form
  - TypeScript types for all schemas

### 2. QuoteForm Component
- **Location**: `/home/user/nov-19-2025-droid-test/app/components/forms/QuoteForm.tsx`
- **Purpose**: Multi-step form with progress indicator
- **Features**:
  - 3-step form process (Location → Project Details → Contact Info)
  - Visual progress indicator
  - Step-by-step validation
  - react-hook-form integration
  - Zod validation
  - Success/error messaging
  - Responsive design with Tailwind CSS

### 3. ContactForm Component
- **Location**: `/home/user/nov-19-2025-droid-test/app/components/forms/ContactForm.tsx`
- **Purpose**: Simple single-page contact form
- **Features**:
  - Name, email, phone, message fields
  - react-hook-form integration
  - Zod validation
  - Success/error messaging
  - Loading states
  - Auto-reset on success

### 4. API Routes

#### Quote API
- **Location**: `/home/user/nov-19-2025-droid-test/app/app/api/quote/route.ts`
- **Endpoints**:
  - `POST /api/quote` - Submit a new quote
  - `GET /api/quote` - Retrieve quotes (with pagination and filtering)
- **Features**:
  - Zod validation
  - Prisma database integration
  - Error handling
  - CORS headers
  - Email placeholder (ready for integration)

#### Contact API
- **Location**: `/home/user/nov-19-2025-droid-test/app/app/api/contact/route.ts`
- **Endpoints**:
  - `POST /api/contact` - Submit a contact form
- **Features**:
  - Zod validation
  - Error handling
  - CORS headers
  - Email placeholder (ready for integration)

### 5. Supporting Files
- **Prisma Client**: `/home/user/nov-19-2025-droid-test/app/lib/prisma.ts`
- **Forms Index**: `/home/user/nov-19-2025-droid-test/app/components/forms/index.ts`

## Usage Examples

### Using the QuoteForm Component

```tsx
// In a page or component
import { QuoteForm } from '@/components/forms';

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Get Your Free Quote
        </h1>
        <QuoteForm />
      </div>
    </div>
  );
}
```

### Using the ContactForm Component

```tsx
// In a page or component
import { ContactForm } from '@/components/forms';

export default function ContactPage() {
  const handleSuccess = () => {
    console.log('Form submitted successfully!');
    // Optional: redirect or show custom message
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Contact Us
        </h1>
        <ContactForm
          onSuccess={handleSuccess}
          className="bg-white p-8 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
```

### Embedding Forms in Existing Pages

```tsx
// Example: Adding quote form to homepage
import { QuoteForm } from '@/components/forms';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        {/* Hero content */}
      </section>

      <section id="get-quote" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Get Your Free Quote Today
          </h2>
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
```

## Form Configuration

### Dumpster Sizes
The QuoteForm includes the following dumpster sizes:
- 10 Yard - Small projects (3-4 pickup loads)
- 20 Yard - Medium projects (6-8 pickup loads)
- 30 Yard - Large projects (9-12 pickup loads)
- 40 Yard - Extra large projects (12-16 pickup loads)

### Project Types
- Home Renovation
- Construction
- Demolition
- Roofing
- Landscaping
- Spring Cleaning
- Estate Cleanout
- Other

### Service Types
- Residential
- Commercial
- Industrial
- Roll-off

### Rental Durations
- 3 Days
- 7 Days
- 14 Days
- 30 Days
- Custom Duration

## Database Schema

The Quote model in Prisma (`/home/user/nov-19-2025-droid-test/app/prisma/schema.prisma`):

```prisma
model Quote {
  id             String    @id @default(cuid())
  name           String
  email          String
  phone          String
  city           City?     @relation(fields: [cityId], references: [id])
  cityId         String?
  dumpsterSize   String
  serviceType    String
  projectType    String
  rentalDuration String
  deliveryDate   DateTime?
  address        String?
  zipCode        String
  message        String?   @db.Text
  status         String    @default("pending")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

## API Response Types

### Quote API Response
```typescript
interface QuoteApiResponse {
  success: boolean;
  message: string;
  quoteId?: string;
  error?: string;
}
```

### Contact API Response
```typescript
interface ContactApiResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

## Email Integration (Optional)

Both API routes include placeholders for email functionality. To integrate email:

1. **Install an email service** (choose one):
   ```bash
   npm install @sendgrid/mail
   # or
   npm install resend
   # or
   npm install nodemailer
   ```

2. **Set up environment variables**:
   ```env
   SENDGRID_API_KEY=your_api_key
   # or
   RESEND_API_KEY=your_api_key
   ADMIN_EMAIL=admin@example.com
   ```

3. **Implement email function** in `/home/user/nov-19-2025-droid-test/app/lib/email.ts`:
   ```typescript
   export async function sendQuoteConfirmation(data: any) {
     // Email implementation
   }
   ```

4. **Uncomment email calls** in the API routes.

## Validation Rules

### Quote Form
- **Zip Code**: US format (12345 or 12345-6789)
- **Name**: 2-100 characters
- **Email**: Valid email format
- **Phone**: Various formats supported (e.g., (555) 123-4567)
- **Address**: 5-200 characters
- **Message**: Optional, max 1000 characters

### Contact Form
- **Name**: 2-100 characters
- **Email**: Valid email format
- **Phone**: Various formats supported
- **Message**: 10-1000 characters

## Styling

Both forms use Tailwind CSS for styling. You can customize the appearance by:

1. **Modifying the component** classes directly
2. **Extending Tailwind** config in `/home/user/nov-19-2025-droid-test/app/tailwind.config.js`
3. **Using the className prop** on ContactForm

## Error Handling

Both forms include comprehensive error handling:
- Client-side validation with Zod
- Server-side validation
- Network error handling
- User-friendly error messages
- Success/error status displays

## Next Steps

1. **Test the forms**: Create a page and add the forms to test functionality
2. **Set up email**: Integrate an email service for notifications
3. **Customize styling**: Adjust colors and layouts to match your brand
4. **Add analytics**: Track form submissions with Google Analytics or similar
5. **Set up notifications**: Add Slack/Discord webhooks for instant notifications
6. **Create admin dashboard**: Build a page to view and manage quote submissions

## Support

For issues or questions:
1. Check the validation schema in `/home/user/nov-19-2025-droid-test/app/lib/validations/quote.ts`
2. Review API routes for server-side logic
3. Inspect browser console for client-side errors
4. Check server logs for API errors
