import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { IntroSection } from '@/components/home/IntroSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { DoctorsPreview } from '@/components/home/DoctorsPreview';
import { BeforeAfterPreview } from '@/components/home/BeforeAfterPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { AppointmentCTA } from '@/components/home/AppointmentCTA';
import { ContactPreview } from '@/components/home/ContactPreview';
import {
  getClinic,
  getFeaturedBeforeAfterCases,
  getFeaturedDoctors,
  getFeaturedServices,
  getFeaturedTestimonials,
  getFaqs,
  getHomepage,
} from '@/src/sanity/queries';
import { cloudinaryUrl } from '@/src/sanity/image';
import { siteConfig } from '@/src/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const [homepage, clinic] = await Promise.all([getHomepage(), getClinic()]);

  const title = homepage?.seo?.title || clinic?.name || siteConfig.defaultTitle;
  const description =
    homepage?.seo?.description || clinic?.description || siteConfig.defaultDescription;
  const ogImage = homepage?.seo?.ogImage ?? homepage?.heroImage;

  return {
    title,
    description,
    alternates: { canonical: siteConfig.siteUrl },
    openGraph: {
      title,
      description,
      images: ogImage?.publicId ? [cloudinaryUrl(ogImage.publicId, { width: 1200, height: 630 })] : [],
    },
  };
}

export default async function HomePage() {
  const [clinic, homepage, services, doctors, cases, testimonials, faqs] =
    await Promise.all([
      getClinic(),
      getHomepage(),
      getFeaturedServices(6),
      getFeaturedDoctors(3),
      getFeaturedBeforeAfterCases(4),
      getFeaturedTestimonials(6),
      getFaqs(),
    ]);

  return (
    <>
      <Hero homepage={homepage} />
      <IntroSection homepage={homepage} clinic={clinic} />
      <WhyChooseUs homepage={homepage} />
      <ServicesPreview services={services} />
      <DoctorsPreview doctors={doctors} />
      <BeforeAfterPreview cases={cases} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs.slice(0, 6)} />
      <AppointmentCTA homepage={homepage} />
      <ContactPreview clinic={clinic} />
    </>
  );
}
