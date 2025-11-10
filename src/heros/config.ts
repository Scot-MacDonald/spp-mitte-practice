import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type !== 'highImpact',
      },
      validate: (_, { siblingData }) => {
        if (siblingData?.type !== 'highImpact') return true
        return 'This field is required'
      },
    },
    {
      name: 'mediaDay',
      type: 'upload',
      label: 'Day Image',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      validate: (_, { siblingData }) => {
        if (siblingData?.type === 'highImpact') return true
        return 'This field is required'
      },
    },
    {
      name: 'mediaNight',
      type: 'upload',
      label: 'Night Image (after 20:00)',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      validate: (_, { siblingData }) => {
        if (siblingData?.type === 'highImpact') return true
        return 'This field is required'
      },
    },
  ],
  label: false,
}
