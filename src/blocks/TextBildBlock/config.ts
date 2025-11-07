import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payload-lexical-typography'

const TextBildBlock: Block = {
  slug: 'textBildBlock',
  interfaceName: 'TextBildBlock',
  labels: {
    singular: 'Text mit Bild',
    plural: 'Texte mit Bildern',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Titel',
    },
    {
      name: 'richText',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Bild',
    },
  ],
}

export default TextBildBlock
