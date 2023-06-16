import { defineField, defineType } from "sanity";

export default defineType({
  name: 'sankey',
  title: 'Sankey Diagram',
  type: 'document',
  fields: [
    defineField({
      name: 'employment',
      title: 'Employment',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'employment' }]
      }],
      validation: Rule => Rule.unique()
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'project' }]
      }],
      validation: Rule => Rule.unique()
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'skill' }]
      }],
      validation: Rule => Rule.unique()
    }),
  ]
})
