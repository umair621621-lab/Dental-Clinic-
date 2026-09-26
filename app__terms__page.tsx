import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { getClinic } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using this website and our services.',
  alternates: { canonical: `${siteConfig.siteUrl}/terms` },
};

export default async function TermsPage() {
  const clinic = await getClinic();
  const clinicName = clinic?.name ?? 'our clinic';

  return (
    <>
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-clinic-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-clinic-500">Last updated: {new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-clinic mt-8 max-w-none space-y-6 text-sm leading-relaxed text-clinic-700">
          <p>
            These Terms of Service govern your use of the {clinicName} website. By using this
            website, you agree to these terms.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Appointment Requests</h2>
          <p>
            Submitting an appointment request through this website does not guarantee a confirmed
            booking. All requests are reviewed by our team and confirmed directly with you by
            phone or WhatsApp.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Medical Disclaimer</h2>
          <p>
            Content on this website, including service descriptions, is provided for general
            informational purposes only and does not constitute medical advice. Please consult our
            doctors directly for diagnosis and treatment recommendations specific to your
            condition.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Website Use</h2>
          <p>
            You agree to use this website only for lawful purposes and in a way that does not
            infringe the rights of, or restrict or inhibit the use of, this website by any third
            party.
          </p>

          <h2 className="font-display text-xl font-semibold text-clinic-900">Changes to These Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Continued use of this website
            after changes are posted constitutes acceptance of the updated terms.
          </p>

          <p className="rounded-lg bg-clinic-50 p-4 text-xs text-clinic-500">
            Note to clinic owner: this is a general-purpose terms template. Please review it with a
            qualified legal professional before publishing.
          </p>
        </div>
      </article>
    </>
  );
}
