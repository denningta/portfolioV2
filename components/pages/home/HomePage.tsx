import { Header } from 'components/shared/Header'
import ScrollUp from 'components/shared/ScrollUp'
import SankeyChart from 'components/shared/sankey-diagram/SankeyChart'
import type { HomePagePayload, SankeyDataPayload } from 'types'

export function HomePage({
  data,
  sankeyData
}: {
  data: HomePagePayload,
  sankeyData: SankeyDataPayload | undefined
}) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview, showcaseProjects, title, image } = data

  return (
    <div className="space-y-20">

      {/* Header */}
      {title && <Header centered title={title} description={overview} image={image} />}

      <div>
        <SankeyChart data={sankeyData} width={800} height={1000} />
      </div>

      {/* Workaround: scroll to top on route change */}
      <ScrollUp />
    </div>
  )
}
