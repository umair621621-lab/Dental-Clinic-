import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ } from '@/components/ui/FAQ';
import type { Faq } from '@/src/types';

export function FAQSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-clinic-50/60 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="Questions & Answers" title="Frequently asked questions" />
        <div className="mt-10">
          <FAQ items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </div>
    </section>
  );
}
