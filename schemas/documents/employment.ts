import { defineField, defineType, defineArrayMember } from 'sanity'
import { preview } from 'sanity-plugin-icon-picker'


export default defineType({
  name: 'employment',
  title: 'Employment',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Company',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and project subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the project. If you choose to add it to the show case projects, this is the image displayed in the list within the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'start',
      title: 'Start Date',
      type: 'date'
    }),
    defineField({
      name: 'end',
      title: 'End Date',
      type: 'date'
    }),
    defineField({
      name: 'years',
      title: 'Years',
      type: 'number'
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'string'
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color'
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }]
    }),
    defineField({
      name: 'references',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'projectReference' }],
    }),
  ],
}) 
