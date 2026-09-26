// ────────────────────────────────────────────────────────────────
// Seeds a starter set of CMS content so the site isn't empty on
// first run. Idempotent — safe to run more than once.
//
// Deliberately NOT seeded (per project rules — never fabricate):
//   • Doctors        — real staff, real photos, real credentials.
//   • Testimonials   — real patient names/reviews only.
//   • Before & After — real, clinic-authorized patient cases only.
// Add those for real in Sanity Studio (/studio) once the clinic
// provides them.
//
// What IS seeded, and why it's safe to:
//   • Clinic info & Homepage copy — obvious bracketed placeholders
//     ("[Clinic Name]", etc.) that must be edited before launch.
//   • The 6 initial services — short, generic, factual descriptions
//     of the treatments themselves (not clinic-specific claims).
//   • A handful of general patient FAQs — generic dental knowledge,
//     not claims about this specific clinic's staff/awards/results.
//
// Usage:
//   1. Fill in .env.local (needs SANITY_API_TOKEN with write access).
//   2. npm run seed
// ────────────────────────────────────────────────────────────────

import { config as loadEnv } from 'dotenv';
import { createClient } from '@sanity/client';

// Load .env.local the same way Next.js does, so this standalone
// script sees the same SANITY_API_TOKEN etc. without duplicating config.
loadEnv({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    '\n[seed] Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.\n' +
      'Fill in .env.local first, then run: npm run seed\n'
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function upsertSingleton(id, type, fields) {
  const doc = { _id: id, _type: type, ...fields };
  await client.createIfNotExists(doc);
  console.log(`  ✓ ${type} (singleton, id: ${id}) ready — edit it in Studio.`);
}

async function upsertDoc(id, type, fields) {
  const doc = { _id: id, _type: type, ...fields };
  await client.createIfNotExists(doc);
  console.log(`  ✓ ${type}: "${fields.name ?? fields.question ?? id}"`);
}

async function run() {
  console.log('\n[seed] Seeding starter content into Sanity…\n');

  console.log('Clinic Information & Homepage:');
  await upsertSingleton('clinic', 'clinic', {
    name: '[Clinic Name]',
    description: 'A short, honest description of your clinic — edit this in Studio.',
    phone: '+92 300 0000000',
    whatsapp: '923000000000',
    email: 'info@example.com',
    address: '[Street Address]',
    area: '[Area]',
    city: '[City]',
    province: '[Province]',
    openingHours: [
      { day: 'Monday – Saturday', hours: '10:00 AM – 8:00 PM', closed: false },
      { day: 'Sunday', hours: '', closed: true },
    ],
    googleMapsUrl: 'https://maps.google.com',
  });

  await upsertSingleton('homepage', 'homepage', {
    heroHeadline: 'Confident Smiles Start Here',
    heroSubheadline:
      'Modern, gentle dental care for the whole family — edit this in Studio to match your clinic\u2019s voice.',
    introHeading: 'Welcome to [Clinic Name]',
    introBody:
      'Replace this with a short, honest introduction to your clinic — who you are and what patients can expect.',
    whyChooseUs: [
      { icon: 'ShieldCheck', title: 'Experienced Team', description: 'Replace with a real, specific reason patients choose you.' },
      { icon: 'Sparkles', title: 'Modern Technology', description: 'Replace with real details about your equipment/techniques.' },
      { icon: 'Smile', title: 'Patient Comfort', description: 'Replace with what makes visits comfortable at your clinic.' },
      { icon: 'Clock', title: 'Convenient Hours', description: 'Replace with your real scheduling flexibility.' },
    ],
    ctaHeading: 'Ready for your next visit?',
    ctaBody: 'Book an appointment in minutes, or message us on WhatsApp with any questions.',
  });

  console.log('\nServices (generic, edit descriptions to match your clinic):');
  const services = [
    {
      slug: 'dental-implants',
      name: 'Dental Implants',
      shortDescription: 'Permanent, natural-looking replacements for missing teeth.',
      fullDescription:
        'Dental implants are titanium posts surgically placed into the jawbone to act as artificial tooth roots, topped with a custom crown. They are a long-term option for replacing one or more missing teeth.',
      benefits: [
        'Looks and functions like a natural tooth',
        'Helps preserve jawbone structure',
        'Does not rely on neighboring teeth for support',
        'Built to last with proper care',
      ],
      process: [
        { step: 'Consultation & Assessment', description: 'Examination, imaging, and a discussion of your treatment plan.' },
        { step: 'Implant Placement', description: 'The implant post is placed into the jawbone under local anesthesia.' },
        { step: 'Healing Period', description: 'The implant fuses with the bone over several weeks.' },
        { step: 'Crown Placement', description: 'A custom crown is attached to complete the restoration.' },
      ],
      faqs: [
        { question: 'Is the procedure painful?', answer: 'It is performed under local anesthesia, so discomfort during the procedure is minimal; some soreness afterward is normal and manageable.' },
        { question: 'How long do implants last?', answer: 'With good oral hygiene and regular checkups, implants can last many years — often decades.' },
      ],
    },
    {
      slug: 'cosmetic-dentistry',
      name: 'Cosmetic Dentistry',
      shortDescription: 'Treatments focused on improving the appearance of your smile.',
      fullDescription:
        'Cosmetic dentistry covers a range of treatments — from veneers to bonding and contouring — designed to improve the shape, color, and alignment of your teeth.',
      benefits: [
        'Improves smile appearance and symmetry',
        'Can correct chips, gaps, or discoloration',
        'Treatments tailored to your goals',
      ],
      process: [
        { step: 'Smile Consultation', description: 'Discuss your goals and review suitable treatment options.' },
        { step: 'Treatment Planning', description: 'A personalized plan is prepared based on your needs.' },
        { step: 'Treatment', description: 'Procedures are carried out over one or more visits.' },
      ],
      faqs: [
        { question: 'How do I know which treatment is right for me?', answer: 'A consultation with your dentist will help identify the best option based on your goals and dental health.' },
      ],
    },
    {
      slug: 'teeth-whitening',
      name: 'Teeth Whitening',
      shortDescription: 'Professional whitening for a brighter, more confident smile.',
      fullDescription:
        'Professional teeth whitening uses dentist-supervised techniques to safely lighten tooth discoloration caused by food, drink, or age.',
      benefits: [
        'Faster, more even results than over-the-counter kits',
        'Supervised for safety and comfort',
        'Long-lasting results with good habits',
      ],
      process: [
        { step: 'Shade Assessment', description: 'Your current tooth shade is assessed and goals discussed.' },
        { step: 'Whitening Session', description: 'A whitening agent is applied under professional supervision.' },
        { step: 'Aftercare Guidance', description: 'Tips are shared to help maintain your results.' },
      ],
      faqs: [
        { question: 'Is teeth whitening safe?', answer: 'When performed or supervised by a dental professional, teeth whitening is considered safe for most patients.' },
        { question: 'How long do results last?', answer: 'Results vary by lifestyle, but avoiding staining foods/drinks and good oral hygiene help them last longer.' },
      ],
    },
    {
      slug: 'invisalign-aligners',
      name: 'Invisalign / Aligners',
      shortDescription: 'Clear, removable aligners to gradually straighten teeth.',
      fullDescription:
        'Clear aligners are a discreet alternative to traditional braces, using a series of custom, removable trays to gradually move teeth into place.',
      benefits: [
        'Nearly invisible compared to metal braces',
        'Removable for eating and cleaning',
        'Custom-fitted treatment plan',
      ],
      process: [
        { step: 'Scan & Planning', description: 'Impressions or digital scans are used to map your treatment plan.' },
        { step: 'Aligner Series', description: 'You wear a series of custom aligners, changing them periodically.' },
        { step: 'Progress Checkups', description: 'Regular visits track progress and fit.' },
      ],
      faqs: [
        { question: 'How long does treatment take?', answer: 'Treatment length varies by case, typically ranging from several months to over a year.' },
      ],
    },
    {
      slug: 'root-canal-treatment',
      name: 'Root Canal Treatment',
      shortDescription: 'Relieves pain and saves a tooth affected by infection or decay.',
      fullDescription:
        'Root canal treatment removes infected or damaged pulp from inside a tooth, then cleans, seals, and restores it — relieving pain and preserving the natural tooth.',
      benefits: [
        'Relieves pain from infected tooth pulp',
        'Preserves your natural tooth',
        'Prevents further spread of infection',
      ],
      process: [
        { step: 'Diagnosis', description: 'X-rays and examination confirm the need for treatment.' },
        { step: 'Cleaning', description: 'Infected pulp is removed and the canal is cleaned and shaped.' },
        { step: 'Sealing', description: 'The canal is filled and sealed to prevent reinfection.' },
        { step: 'Restoration', description: 'A crown or filling restores the tooth\u2019s strength and function.' },
      ],
      faqs: [
        { question: 'Does a root canal hurt?', answer: 'The procedure is performed under local anesthesia; most patients report feeling similar to having a filling placed.' },
      ],
    },
    {
      slug: 'general-dentistry',
      name: 'General Dentistry',
      shortDescription: 'Routine checkups, cleanings, and preventive care for the whole family.',
      fullDescription:
        'General dentistry covers the everyday care that keeps your teeth and gums healthy — checkups, professional cleanings, fillings, and preventive guidance.',
      benefits: [
        'Catches issues early through regular checkups',
        'Professional cleaning beyond daily brushing',
        'Personalized preventive care guidance',
      ],
      process: [
        { step: 'Checkup & X-rays', description: 'A routine exam and imaging as needed to assess oral health.' },
        { step: 'Professional Cleaning', description: 'Removal of plaque and tartar buildup.' },
        { step: 'Personalized Advice', description: 'Guidance tailored to your specific oral health needs.' },
      ],
      faqs: [
        { question: 'How often should I visit the dentist?', answer: 'Most dentists recommend a checkup and cleaning every six months, though your dentist may suggest a different schedule based on your needs.' },
      ],
    },
  ];

  for (const [index, service] of services.entries()) {
    await upsertDoc(`service-${service.slug}`, 'service', {
      name: service.name,
      slug: { _type: 'slug', current: service.slug },
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      benefits: service.benefits,
      process: service.process,
      faqs: service.faqs,
      featured: true,
      order: index,
    });
  }

  console.log('\nGeneral FAQs:');
  const faqs = [
    { q: 'How often should I visit the dentist?', a: 'Most people should have a checkup and cleaning every six months, though your dentist may recommend a different interval.' },
    { q: 'Do you accept walk-in patients?', a: 'Please contact us by phone or WhatsApp to check current availability — booking ahead helps us serve you faster.' },
    { q: 'What should I bring to my first appointment?', a: 'Please bring a valid ID, any previous dental records or X-rays you have, and a list of any medications you take.' },
    { q: 'Is teeth whitening safe for everyone?', a: 'Professional whitening is safe for most adults, but your dentist will assess your specific dental history first.' },
    { q: 'How can I book an appointment?', a: 'You can request an appointment through our website, WhatsApp, or by calling the clinic directly.' },
  ];

  for (const [index, faq] of faqs.entries()) {
    await upsertDoc(`faq-${index + 1}`, 'faq', {
      question: faq.q,
      answer: faq.a,
      order: index,
      published: true,
    });
  }

  console.log(
    '\n[seed] Done. Now go to /studio and:\n' +
      '  1. Replace every bracketed [placeholder] in Clinic Information & Homepage.\n' +
      '  2. Add real photos (Cloudinary public IDs) to each service.\n' +
      '  3. Add real Doctors, Testimonials, and Before & After cases — never fake ones.\n'
  );
}

run().catch((err) => {
  console.error('\n[seed] Failed:', err.message ?? err);
  process.exit(1);
});
