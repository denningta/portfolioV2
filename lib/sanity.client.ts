import 'server-only'

import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  homePageQuery,
  homePageTitleQuery,
  pagesBySlugQuery,
  projectBySlugQuery,
  sankeyDataQuery,
  settingsQuery,
  skillBySlugQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'
import type {
  HomePagePayload,
  PagePayload,
  ProjectPayload,
  SankeyDataPayload,
  SettingsPayload,
  SkillPayload,
} from 'types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = (token?: string | null) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token: token! })
    : null
}

export async function getHomePage({
  token,
}: {
  token?: string | null
}): Promise<HomePagePayload | undefined> {
  return await sanityClient(token)?.fetch(homePageQuery)
}

export async function getHomePageTitle({
  token,
}: {
  token?: string | null
}): Promise<string | undefined> {
  return await sanityClient(token)?.fetch(homePageTitleQuery)
}

export async function getPageBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string | null
}): Promise<PagePayload | undefined> {
  return await sanityClient(token)?.fetch(pagesBySlugQuery, { slug })
}

export async function getProjectBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string | null
}): Promise<ProjectPayload | undefined> {
  return await sanityClient(token)?.fetch(projectBySlugQuery, { slug })
}

export async function getSkillBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string | null
}): Promise<SkillPayload | undefined> {
  return await sanityClient(token)?.fetch(skillBySlugQuery, { slug })
}

export async function getSettings({
  token,
}: {
  token?: string | null
}): Promise<SettingsPayload | undefined> {
  return await sanityClient(token)?.fetch(settingsQuery)
}

export async function getSankeyData({
  token,
}: {
  token?: string | null
}): Promise<SankeyDataPayload | undefined> {
  return await sanityClient(token)?.fetch(sankeyDataQuery)

}
