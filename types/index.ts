import type { PortableTextBlock } from '@portabletext/types'
import { SankeyGraph } from 'd3-sankey'
import { IconType } from 'react-icons'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
  image: Image
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  referenceList?: ProjectPayload[] & {
    references?: {
      title?: string
      icon?: {
        provider?: string
        _type?: string
        name?: string
      }
    }[]
  }
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: {
    current: string
  }
  tags?: string[]
  title?: string
  color?: Color
  references: {
    skill: SkillPayload
  }[]
}

export interface SkillPayload {
  title?: string
  slug?: string
  icon?: {
    svg?: string
    _type?: string
    name?: string
    provider?: string
  }
  description?: string
  color?: Color
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}


export interface SankeyNodeCustom {
  name: string
  id: string
  color: { hex: string, alpha: number },
  shortDesc: string
  start: string
  end: string
  icon: keyof IconType
  href: string
}

export interface SankeyLinkCustom {
  sourceColor: Color
  targetColor: Color
  value: number
}

export type SankeyDataPayload = SankeyGraph<SankeyNodeCustom, SankeyLinkCustom>

export interface Color {
  alpha?: number
  _type?: string
  hex?: string
  hsv?: {
    a?: number
    s?: number
    v?: number
    h?: number
  }
  rgb?: {
    a?: number
    r?: number
    g?: number
    b?: number
  }
  hsl?: {
    a?: number
    h?: number
    s?: number
    l?: number
  }

}
