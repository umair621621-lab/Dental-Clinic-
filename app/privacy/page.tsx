import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { getClinic } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use, and protect your personal information.',
  alternates: { canonical: `${siteConfig.siteUrl}/privacy` },
};

export default async function PrivacyPage() {
  const clinic = await getClinic();
  const clinicName = clinic?.name ?? 'our clinic';

  return (
    <>
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-clinic-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-clinic-500">Last updated: {new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-clinic mt-8 max-w-none space-y-6 text-sm leading-relaxed text-clinic-700">
          <p>
            This Privacy Policy explains how {clinicName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, and
            protects the personal information you share with us through this website, including
            appointment requests and contact forms.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Information We Collect</h2>
          <p>
            When you submit an appointment request or contact form, we collect the information you
            provide directly, such as your name, phone number, email address, and preferred
            appointment details. We do not collect sensitive medical records through this website.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">How We Use Your Information</h2>
          <p>
            We use the information you submit solely to respond to your inquiry, confirm and manage
            appointment requests, and communicate with you by phone, WhatsApp, or email regarding
            your visit.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Data Sharing</h2>
          <p>
            We do not sell or rent your personal information. Information may be shared with
            trusted service providers strictly to operate this website and communicate with you
            (for example, our email delivery provider).
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of the personal information we
            hold about you at any time by contacting us using the details on our{' '}
            <a href="/contact" className="text-clinic-600 underline">Contact page</a>.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please reach out via the contact
            details listed on this website.
          </p>

          <p className="rounded-lg bg-clinic-50 p-4 text-xs text-clinic-500">
            Note to clinic owner: this is a general-purpose privacy policy template. Please review
            it with a qualified legal professional to ensure it fully complies with applicable
            Pakistani data protection regulations before publishing.
          </p>
        </div>
      </article>
    </>
  );
}
