import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payload-lexical-typography'

export const KontaktAnfahrt: Block = {
  slug: 'kontaktAnfahrt',
  labels: {
    singular: 'Kontakt / Anfahrt',
    plural: 'Kontakt / Anfahrt Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
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
      name: 'transports',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'U-Bahn', value: 'u-bahn' },
            { label: 'S-Bahn', value: 's-bahn' },
            { label: 'Bus', value: 'bus' },
            { label: 'Tram', value: 'tram' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'lines',
          type: 'array',
          fields: [{ name: 'line', type: 'text', required: true }],
        },
      ],
    },
    { name: 'lat', type: 'number', required: true },
    { name: 'lng', type: 'number', required: true },
    { name: 'secondIconUrl', type: 'text' },
    { name: 'thirdIconUrl', type: 'text' },
    { name: 'fourthIconUrl', type: 'text' },
    { name: 'fifthIconUrl', type: 'text' },
    { name: 'sixthIconUrl', type: 'text' },
    { name: 'seventhIconUrl', type: 'text' },
  ],
}

export default KontaktAnfahrt
