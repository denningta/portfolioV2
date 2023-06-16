import {defineField, defineType} from 'sanity'
import { preview } from 'sanity-plugin-icon-picker'

export default defineType({
    name: 'skillReference',
    title: 'Skill Reference',
    type: 'object',
    fields: [
        defineField({
            name: 'skill',
            title: 'Skill',
            type: 'reference',
            to: [{ type: 'skill' }]
        }),
        defineField({
            name: 'percent',
            title: 'Percent Effort',
            type: 'number'
        }),
    ],
    preview: {
        select: {
            title: 'skill.title',
            subtitle: 'percent',
            icon: 'skill.icon'
        },
        prepare: ({ title, subtitle, icon }) => {
            return {
                title: title,
                subtitle: `${subtitle}% effort`,
                media: preview(icon)
            } 
        }
    }
})
