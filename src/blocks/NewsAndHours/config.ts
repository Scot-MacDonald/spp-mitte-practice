import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const NewsAndHours: Block = {
  slug: 'newsAndHours',
  interfaceName: 'NewsAndHoursBlock',
  fields: [
    {
      name: 'latestInfosTitle',
      type: 'text',
      localized: true,
      required: false,
      defaultValue: 'Latest Infos',
    },
    {
      name: 'news',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: 'date',
          label: 'Date',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'summary',
          label: 'Summary',
          type: 'richText',
          localized: true,
          required: false,
          editor: lexicalEditor({
            features: [HeadingFeature(), InlineToolbarFeature(), FixedToolbarFeature()],
          }),
        },
        {
          name: 'link',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'openingHours',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: false,
          defaultValue: 'Opening Hours',
        },
        {
          name: 'hours',
          type: 'array',
          required: true,
          localized: true,
          fields: [
            {
              name: 'dayKey',
              label: 'Day',
              type: 'select',
              required: true,
              options: [
                { label: { en: 'Monday', de: 'Montag' }, value: 'monday' },
                { label: { en: 'Tuesday', de: 'Dienstag' }, value: 'tuesday' },
                {
                  label: { en: 'Wednesday', de: 'Mittwoch' },
                  value: 'wednesday',
                },
                {
                  label: { en: 'Thursday', de: 'Donnerstag' },
                  value: 'thursday',
                },
                { label: { en: 'Friday', de: 'Freitag' }, value: 'friday' },
                { label: { en: 'Saturday', de: 'Samstag' }, value: 'saturday' },
                { label: { en: 'Sunday', de: 'Sonntag' }, value: 'sunday' },
              ],
            },
            {
              name: 'morning',
              label: 'Morning (e.g. 08:00 - 13:00)',
              type: 'text',
              required: false,
            },
            {
              name: 'afternoon',
              label: 'Afternoon (e.g. 14:30 - 18:00)',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
  ],
}
