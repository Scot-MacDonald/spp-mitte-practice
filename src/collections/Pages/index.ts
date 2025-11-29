import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import TextBildBlock from '../../blocks/TextBildBlock/config'
import { NewsAndHours } from '@/blocks/NewsAndHours/config'
import { Mitglied } from '@/blocks/Mitglied/config'
import { KontaktAnfahrt } from '@/blocks/KontaktAnfahrt/config'
import { AccordionBlock } from '@/blocks/Accordion/config'
import { Doctor } from '@/blocks/DoctorBlock/config'
import SliderBlock from '@/blocks/SliderBlock/config'
import { hero } from '@/heros/config'

import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig = {
  slug: 'pages',

  access: {
    create: authenticated,
    delete: authenticated,

    read: () => true,
    update: authenticated,
  },

  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],

    // ✅ Live Preview (Payload v3)
    livePreview: {
      url: ({ data, locale }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : 'home'
        const lang = locale?.code || 'en'

        return `${process.env.NEXT_PUBLIC_SERVER_URL}/${lang}/${slug}`
      },
    },

    // Preview button (same as live preview)
    preview: (data, { locale }) => {
      const slug = typeof data?.slug === 'string' ? data.slug : 'home'
      const lang = locale || 'en'

      return `${process.env.NEXT_PUBLIC_SERVER_URL}/${lang}/${slug}`
    },

    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              localized: true,
              required: true,
              blocks: [
                AccordionBlock,
                CallToAction,
                Content,
                Doctor,
                MediaBlock,
                Mitglied,
                Archive,
                FormBlock,
                TextBildBlock,
                NewsAndHours,
                KontaktAnfahrt,
                SliderBlock,
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),

            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),

            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },

    // Slug (localized)
    ...slugField('title', { slugOverrides: { localized: true } }),
  ],

  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePage],
  },

  versions: {
    drafts: {
      autosave: { interval: 100 }, // required for live preview
    },
    maxPerDoc: 50,
  },
}
