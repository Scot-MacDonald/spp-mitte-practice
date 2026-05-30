// import { withPayload } from '@payloadcms/next/withPayload'
// import createNextIntlPlugin from 'next-intl/plugin'

// const withNextIntl = createNextIntlPlugin()

// import redirects from './redirects.js'

// const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
//         const url = new URL(item)

//         return {
//           hostname: url.hostname,
//           protocol: url.protocol.replace(':', ''),
//         }
//       }),
//     ],
//   },
//   reactStrictMode: true,
//   redirects,
// }

// export default withNextIntl(withPayload(nextConfig))

import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION === 'true',

    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: 'https',
        hostname: 'schwerpunktpraxis-berlin-mitte.de',
      },
    ],

    qualities: [55, 70],
  },
  reactStrictMode: true,

  // All redirects in one place
  async redirects() {
    return [
      // Domain-level redirects
      {
        source: '/',
        has: [{ type: 'host', value: 'www.schwerpunktpraxis-berlin-mitte.de' }],
        destination: '/de',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'host', value: 'schwerpunktpraxis-berlin-mitte.de' }],
        destination: '/de',
        permanent: true,
      },

      // Old pages → new pages
      { source: '/team', destination: '/de/aerzt-innen', permanent: true },
      { source: '/hiv', destination: '/de/hiv-aids', permanent: true },
      { source: '/sti', destination: '/de/sexuell-ubertragbare-infektionen', permanent: true },
      { source: '/hepatologie', destination: '/de/hepatitis-lebererkrankungen', permanent: true },
      { source: '/node/43', destination: '/de/infektiologie', permanent: true },
      { source: '/allgemeinmedizin', destination: '/de/allgemeinmedizin', permanent: true },
      { source: '/impressum', destination: '/de/impressum', permanent: true },
      { source: '/datenschutz', destination: '/de/datenschutz', permanent: true },

      // Pages no longer used → redirect to new home
      { source: '/contact', destination: '/de', permanent: true },
      { source: '/wegweiser', destination: '/de', permanent: true },

      // Doctor pages
      {
        source: '/praxisteam/grimm',
        destination: '/de/doctors/dr-med-roland-grimm',
        permanent: true,
      },
      {
        source: '/praxisteam/schoor',
        destination: '/de/doctors/dr-med-isabel-wagner',
        permanent: true,
      },
      {
        source: '/praxisteam/klausen',
        destination: '/de/doctors/dr-med-gerd-klausen',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(withPayload(nextConfig))
