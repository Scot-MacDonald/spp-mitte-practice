import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from 'payload-lexical-typography'

const SliderBlock: Block = {
  slug: 'contentSlider',
  interfaceName: 'SliderBlock',
  labels: {
    singular: 'Content w/ Slider',
    plural: 'Content w/ Sliders',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Title',
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
      name: 'images',
      type: 'array',
      label: 'Slider Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ],
    },
  ],
}

export default SliderBlock
