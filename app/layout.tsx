import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getClinic } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinic();
  const title = clinic?.seo?.title || clinic?.name || siteConfig.defaultTitle;
  const description =
    clinic?.seo?.description || clinic?.description || siteConfig.defaultDescription;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: title,
      template: `%s | ${clinic?.name ?? siteConfig.defaultTitle}`,
    },
    description,
    openGraph: {
      title,
      description,
      siteName: clinic?.name ?? siteConfig.defaultTitle,
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clinic = await getClinic();

  const jsonLd = clinic
    ? {
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: clinic.name,
        description: clinic.description,
        telephone: clinic.phone,
        email: clinic.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: clinic.address,
          addressLocality: clinic.city,
          addressRegion: clinic.province,
          addressCountry: 'PK',
        },
        url: siteConfig.siteUrl,
        ...(clinic.openingHours?.length
          ? {
              openingHoursSpecification: clinic.openingHours
                .filter((h) => !h.closed)
                .map((h) => ({
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: h.day,
                  opens: h.hours?.split('–')[0]?.trim(),
                  closes: h.hours?.split('–')[1]?.trim(),
                })),
            }
          : {}),
      }
    : null;

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body>
        {/* Google Tag Manager only loads if the clinic has actually
            configured a container — no tracking runs by default. */}
        {gtmId && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}
        {jsonLd && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-clinic-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header clinic={clinic} />
        <main id="main-content">{children}</main>
        <Footer clinic={clinic} />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
