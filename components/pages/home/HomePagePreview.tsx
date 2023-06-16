'use client'

import { usePreview } from 'lib/sanity.preview'
import { homePageQuery, sankeyDataQuery } from 'lib/sanity.queries'
import type { HomePagePayload, SankeyDataPayload } from 'types'

import { HomePage } from './HomePage'

export function HomePagePreview({ token }: { token: null | string }) {
  const home: HomePagePayload = usePreview(token, homePageQuery)
  const sankeyData: SankeyDataPayload = usePreview(token, sankeyDataQuery)

  if (!home) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <HomePage data={home} sankeyData={sankeyData} />
}
