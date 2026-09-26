import { z } from 'zod';

/**
 * Server + client shared validation for the appointment request form.
 * Never trust the client alone — this schema is re-run inside the
 * API route before anything is emailed to the clinic.
 */
export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(80, 'Name is too long.'),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+92|0)?3\d{9}$/,
      'Please enter a valid Pakistani mobile number (e.g. 03XXXXXXXXX).'
    ),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(120)
    .optional()
    .or(z.literal('')),
  serviceId: z.string().trim().max(200).optional().or(z.literal('')),
  doctorId: z.string().trim().max(200).optional().or(z.literal('')),
  preferredDate: z
    .string()
    .trim()
    .refine((val) => {
      if (!val) return false;
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(date.getTime()) && date >= today;
    }, 'Please choose a valid, upcoming date.'),
  preferredTime: z.string().trim().min(1, 'Please choose a preferred time.'),
  message: z.string().trim().max(600).optional().or(z.literal('')),
  // Honeypot field — real users never fill this in.
  company: z.string().max(0).optional().or(z.literal('')),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
