// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()

  const pages = [
    { de: '/de/', en: '/en/' },
    { de: '/de/aerztinnen', en: '/en/doctors' },
    { de: '/de/infektiologie', en: '/en/infectiology' },
    { de: '/de/hiv', en: '/en/hiv' },
    { de: '/de/sti', en: '/en/stis' },
    { de: '/de/hepatitis-lebererkrankungen', en: '/en/hepatitis/liver-diseases' },
    { de: '/de/allgemeinmedizin', en: '/en/general-medicine' },
    { de: '/de/impressum', en: '/en/legal-notice' },
    { de: '/de/datenschutzerklaerung', en: '/en/data-protection' },
  ]

  const doctors = [
    { de: '/de/doctors/dr-med-isabel-wagner', en: '/en/doctors/dr-med-isabel-wagner' },
    { de: '/de/doctors/dr-med-gerd-klausen', en: '/en/doctors/dr-med-gerd-klausen' },
    { de: '/de/doctors/dr-med-roland-grimm', en: '/en/doctors/dr-med-roland-grimm' },
    { de: '/de/doctors/mara-sluka', en: '/en/doctors/mara-sluka' },
  ]

  const allUrls = [...pages, ...doctors]

  return allUrls.flatMap(({ de, en }) => [
    {
      url: `https://www.schwerpunktpraxis-berlin-mitte.de${de}`,
      lastModified: today,
      alternates: {
        languages: {
          de: `https://www.schwerpunktpraxis-berlin-mitte.de${de}`,
          en: `https://www.schwerpunktpraxis-berlin-mitte.de${en}`,
        },
      },
    },
    {
      url: `https://www.schwerpunktpraxis-berlin-mitte.de${en}`,
      lastModified: today,
      alternates: {
        languages: {
          de: `https://www.schwerpunktpraxis-berlin-mitte.de${de}`,
          en: `https://www.schwerpunktpraxis-berlin-mitte.de${en}`,
        },
      },
    },
  ])
}
