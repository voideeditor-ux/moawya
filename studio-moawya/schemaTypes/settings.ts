import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  // Single-instance document — only one settings doc should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Displayed in the hero and navbar',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "Video Editor · Motion Designer"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
      description: 'About section paragraphs',
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Cairo, Egypt · Available worldwide"',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
      description: 'e.g. "6+ Years of Experience"',
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Software',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g. Adobe Premiere Pro, After Effects…',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),
    defineField({
      name: 'showreelUrl',
      title: 'Showreel Vimeo URL',
      type: 'url',
      description: 'Optional — the main reel shown in the Hero section',
    }),
  ],
  preview: {
    select: {title: 'name'},
    prepare: () => ({title: 'Site Settings'}),
  },
})
