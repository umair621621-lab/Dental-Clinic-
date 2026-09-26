'use client';

import { useState, useRef, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { trackEvent } from '@/src/lib/analytics';
import type { Doctor, Service } from '@/src/types';

interface AppointmentFormProps {
  services: Service[];
  doctors: Doctor[];
  clinicPhone?: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function AppointmentForm({ services, doctors, clinicPhone }: AppointmentFormProps) {
  const [state, setState] = useState<SubmitState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(true);
  const hasTrackedStart = useRef(false);

  function handleFormStart() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent('appointment_form_start');
  }

  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setErrors({});
    setServerError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
        }
        setServerError(data?.message ?? 'Something went wrong. Please try again.');
        setState('error');
        return;
      }

      setEmailSent(Boolean(data?.emailSent));
      setState('success');
      trackEvent('appointment_form_submit', { emailSent: Boolean(data?.emailSent) });
      (e.target as HTMLFormElement).reset();
    } catch {
      setServerError(
        'We could not reach the server. Please try again, or contact us directly via WhatsApp or phone.'
      );
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-clinic-100 bg-white p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-clinic-600" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-clinic-900">
          Request received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-clinic-700">
          {emailSent ? (
            <>Your appointment request has been sent to our team. </>
          ) : (
            <>
              We&apos;ve logged your request, but couldn&apos;t confirm email delivery to our team just now.
              To be safe, please also reach us directly below. </>
          )}
          This is a <strong>request</strong>, not a confirmed booking — we will contact you by
          phone or WhatsApp shortly to confirm your exact time slot.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton
            label="Book Appointment"
            message="Hello, I just submitted an appointment request on your website. Could you please confirm my slot?"
          />
          {clinicPhone && (
            <a
              href={`tel:${clinicPhone}`}
              className="rounded-full bg-clinic-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-clinic-700"
            >
              Call the Clinic
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={handleFormStart}
      noValidate
      className="space-y-5 rounded-2xl border border-clinic-100 bg-white p-6 shadow-card sm:p-8"
    >
      {serverError && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot — hidden from real users, catches basic bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="03XXXXXXXXX"
            autoComplete="tel"
            className={inputClass(errors.phone)}
          />
        </Field>
      </div>

      <Field label="Email (optional)" htmlFor="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={120}
          autoComplete="email"
          className={inputClass(errors.email)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service" htmlFor="serviceId" error={errors.serviceId}>
          <select id="serviceId" name="serviceId" className={inputClass(errors.serviceId)}>
            <option value="">Select a service (optional)</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Doctor" htmlFor="doctorId" error={errors.doctorId}>
          <select id="doctorId" name="doctorId" className={inputClass(errors.doctorId)}>
            <option value="">No preference</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred Date" htmlFor="preferredDate" error={errors.preferredDate} required>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={today}
            className={inputClass(errors.preferredDate)}
          />
        </Field>

        <Field label="Preferred Time" htmlFor="preferredTime" error={errors.preferredTime} required>
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            required
            className={inputClass(errors.preferredTime)}
          />
        </Field>
      </div>

      <Field label="Message (optional)" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={600}
          className={inputClass(errors.message)}
        />
      </Field>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {state === 'submitting' ? 'Sending request…' : 'Request Appointment'}
      </button>

      <p className="text-center text-xs text-clinic-500">
        Submitting sends your request to our team — it does not automatically confirm a time slot.
      </p>
    </form>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-lg border px-4 py-2.5 text-sm text-clinic-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-500 ${
    error ? 'border-red-400' : 'border-clinic-200'
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-clinic-800">
        {label} {required && <span aria-hidden="true" className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
