import { z } from 'zod';

// Phone number regex - supports various formats
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

// Zip code regex - US format
const zipCodeRegex = /^\d{5}(-\d{4})?$/;

// Step 1: Location validation
export const locationSchema = z.object({
  zipCode: z
    .string()
    .min(1, 'Zip code is required')
    .regex(zipCodeRegex, 'Please enter a valid US zip code (e.g., 12345 or 12345-6789)'),
  cityId: z.string().optional(),
});

// Step 2: Project details validation
export const projectDetailsSchema = z.object({
  dumpsterSize: z
    .string()
    .min(1, 'Please select a dumpster size'),
  projectType: z
    .string()
    .min(1, 'Please select a project type'),
  serviceType: z
    .string()
    .min(1, 'Please select a service type'),
  rentalDuration: z
    .string()
    .min(1, 'Please select rental duration'),
});

// Step 3: Contact info validation
export const contactInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number (e.g., (555) 123-4567)'),
  deliveryDate: z
    .string()
    .min(1, 'Please select a delivery date'),
  address: z
    .string()
    .min(5, 'Please enter a delivery address')
    .max(200, 'Address must be less than 200 characters'),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

// Combined full quote form schema
export const quoteFormSchema = z.object({
  // Location
  zipCode: z
    .string()
    .min(1, 'Zip code is required')
    .regex(zipCodeRegex, 'Please enter a valid US zip code'),
  cityId: z.string().optional(),

  // Project details
  dumpsterSize: z
    .string()
    .min(1, 'Please select a dumpster size'),
  projectType: z
    .string()
    .min(1, 'Please select a project type'),
  serviceType: z
    .string()
    .min(1, 'Please select a service type'),
  rentalDuration: z
    .string()
    .min(1, 'Please select rental duration'),

  // Contact info
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number'),
  deliveryDate: z
    .string()
    .min(1, 'Please select a delivery date'),
  address: z
    .string()
    .min(5, 'Please enter a delivery address')
    .max(200, 'Address must be less than 200 characters'),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

// Contact form schema (simpler form)
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

// TypeScript types derived from schemas
export type LocationFormData = z.infer<typeof locationSchema>;
export type ProjectDetailsFormData = z.infer<typeof projectDetailsSchema>;
export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

// API request/response types
export interface QuoteApiRequest {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  cityId?: string;
  dumpsterSize: string;
  serviceType: string;
  projectType: string;
  rentalDuration: string;
  deliveryDate: string;
  address: string;
  message?: string;
}

export interface QuoteApiResponse {
  success: boolean;
  message: string;
  quoteId?: string;
  error?: string;
}

export interface ContactApiRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  error?: string;
}
