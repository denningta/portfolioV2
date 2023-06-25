import { defineField, defineType } from "sanity";

export default defineType({
  type: 'document',
  name: 'externalLink',
  title: 'External Link',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url'
    }),

  ]

})
