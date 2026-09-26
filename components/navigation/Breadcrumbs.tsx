import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { siteConfig } from '@/src/config/site';

interface Crumb {
  label: string;
  href?: string;
}

/**
 * Builds a schema.org BreadcrumbList matching the visible trail
 * (Home + each crumb). The final, current-page crumb has no `href`
 * for display purposes, so per Google's structured-data guidance we
 * omit its `item` URL rather than guessing one.
 */
function buildBreadcrumbJsonLd(items: Crumb[]) {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.siteUrl,
    },
    ...items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.siteUrl}${item.href}` } : {}),
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="border-b border-clinic-100 bg-clinic-50/60">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3 text-sm text-clinic-600 sm:px-6">
          <li className="flex items-center gap-1">
            <Link href="/" className="flex items-center gap-1 hover:text-clinic-900" aria-label="Home">
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 text-clinic-300" aria-hidden="true" />
              {item.href ? (
                <Link href={item.href} className="hover:text-clinic-900">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-clinic-900">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
