import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payload-lexical-typography'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import Categories from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Doctors } from './collections/Doctors'
import Users from './collections/Users'

import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page, Post } from 'src/payload-types'

import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import localization from './i18n/localization'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/* ---------------- SEO ---------------- */

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title || ''
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `https://schwerpunktpraxis-berlin-mitte.de/${doc.slug}`
    : 'https://schwerpunktpraxis-berlin-mitte.de'
}

/* ---------------- CONFIG ---------------- */

export default buildConfig({
  /* ✅ CRITICAL: hardcoded public URL */
  serverURL: 'https://schwerpunktpraxis-berlin-mitte.de',

  /* ✅ CRITICAL: explicit CORS + CSRF */
  cors: [
    'https://schwerpunktpraxis-berlin-mitte.de',
    'https://www.schwerpunktpraxis-berlin-mitte.de',
  ],
  csrf: [
    'https://schwerpunktpraxis-berlin-mitte.de',
    'https://www.schwerpunktpraxis-berlin-mitte.de',
  ],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  i18n: {
    supportedLanguages: { en, de },
  },

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      TextColorFeature({
        colors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#7eb36a'],
      }),
    ],
  }),

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  collections: [Pages, Posts, Media, Categories, Users, Doctors],

  globals: [Header, Footer],

  plugins: [
    redirectsPlugin({
      collections: ['pages', 'posts', 'doctors'],
      hooks: {
        afterChange: [revalidateRedirects],
      },
    }),

    nestedDocsPlugin({
      collections: ['categories'],
    }),

    seoPlugin({
      generateTitle,
      generateURL,
    }),

    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) =>
          defaultFields.map((field) =>
            'name' in field && field.name === 'confirmationMessage'
              ? {
                  ...field,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({
                        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
                      }),
                    ],
                  }),
                }
              : field,
          ),
      },
    }),

    searchPlugin({
      collections: ['posts'],
      beforeSync: beforeSyncWithSearch,
      searchOverrides: {
        fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
      },
    }),

    payloadCloudPlugin(),
  ],

  localization,

  email: resendAdapter({
    defaultFromAddress: process.env.DEFAULT_FROM_ADDRESS || 'dev@payloadcms.com',
    defaultFromName: process.env.DEFAULT_FROM_NAME || 'Payload CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  secret: process.env.PAYLOAD_SECRET!,
  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
