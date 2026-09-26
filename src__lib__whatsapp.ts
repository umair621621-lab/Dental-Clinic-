const RAW_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

/** Strips everything except digits so wa.me links are always valid. */
function normalizeNumber(number: string) {
  return number.replace(/[^\d]/g, '');
}

/**
 * Builds a wa.me deep link with a contextual, pre-filled message.
 * Falls back to a generic greeting when no context is supplied.
 */
export function buildWhatsAppLink(context?: string) {
  const number = normalizeNumber(RAW_NUMBER);
  const message = context
    ? context
    : 'Hello, I would like to know more about your dental clinic.';
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildServiceWhatsAppLink(serviceName: string) {
  return buildWhatsAppLink(
    `Hello, I would like to ask about "${serviceName}". Could you please share more details and availability?`
  );
}

export function buildAppointmentWhatsAppLink() {
  return buildWhatsAppLink(
    'Hello, I would like to book an appointment. Could you please help me with available slots?'
  );
}
