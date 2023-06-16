import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'projectReference',
    title: 'Project Reference',
    type: 'object',
    fields: [
        defineField({
            name: 'project',
            title: 'Project',
            type: 'reference',
            to: [{ type: 'project' }]
        }),
        defineField({
            name: 'percent',
            title: 'Percent Effort',
            type: 'number'
        }),
    ],
    preview: {
        select: {
            title: 'project.title',
            subtitle: 'percent'
        },
        prepare: ({ title, subtitle }) => {
            return {
                title: title,
                subtitle: `${subtitle}% effort`,
            } 
        }
    }
})
