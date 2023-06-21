import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id, 
    footer,
    overview, 
    showcaseProjects[]->{
      _type,
      coverImage, 
      overview, 
      "slug": slug.current,
      tags, 
      title, 
    }, 
    title, 
    image
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    slug,
    title,
    referenceList[]->{
      ...,
      references[] {
        skill->
      }
    },
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client, 
    coverImage,
    description[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    duration, 
    overview,
    site, 
    "slug": slug.current,
    tags,
    title,
    references[] {
      skill->
    },
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`

export const sankeyDataQuery = groq`
  {
    "nodes": 
      *[_type == "sankey"].employment[]-> 
      + *[_type == "sankey"].projects[]-> 
      + *[_type == "sankey"].skills[]->,
    "linkdata": *[_type == "sankey"].employment[]-> {
      "links": references[] {
        "source": ^.slug.current,
        "sourceColor": ^.color,
        "target": project->slug.current,
        "targetColor": project->color,
        "value": ^.years * (percent / 100),
      },
      "sublinks": references[] {
        "source": project->slug.current,
        "sourceColor": project->color,
        "skills": project->references[],
        "value": ^.years * (percent / 100)
      } | {
        "links": skills[] {
          "source": ^.source,
          "sourceColor": ^.sourceColor,
          "target": skill->slug.current,
          "targetColor": skill->color,
          "value": ^.value * (percent / 100)
        }
      }
    },
  } | {
    "nodes": nodes[] | {
      "name": title,
      "id": slug.current,
      "color": color,
      start,
      end,
      shortDesc,
      icon,
      "href": post->slug.current
    },
    "links": linkdata[].links[] + linkdata[].sublinks[].links[],
  }
`
