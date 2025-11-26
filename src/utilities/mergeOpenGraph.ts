import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'SPP-Mitte: Schwerpunktpraxis in Berlin-Mitte für Infektionskrankheiten, HIV, Hepatitis, STI und hausärztliche Versorgung.',
  images: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/website-template-OG.webp`
        : '/website-template-OG.webp',
    },
  ],
  siteName: 'SPP-Mitte',
  title: 'SPP-Mitte | Infektiologie & Allgemeinmedizin',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
