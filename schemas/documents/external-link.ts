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
      name: 'icon',
      title: 'Icon',
      type: 'iconPicker',
      options: {
        storeSvg: true
      }
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url'
    }),

  ]

})
