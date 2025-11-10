import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payload-lexical-typography'

export const Mitglied: Block = {
  slug: 'mitglied',
  labels: {
    singular: 'Mitglied Section',
    plural: 'Mitglied Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature({
            colors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#7eb36a'],
          }),
        ],
      }),
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'array',
          fields: [
            {
              name: 'line',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media', // assumes you have a Media collection
          required: false,
        },
      ],
    },
  ],
}
