import { defineField, defineType } from 'sanity'


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
        source: 'title'
      }
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
  ]
}) 
