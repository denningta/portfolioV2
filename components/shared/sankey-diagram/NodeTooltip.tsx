import { SankeyLinkCustom, SankeyNodeCustom } from "types"
import { SankeyNode } from "d3-sankey"
import { useMediaQuery } from "react-responsive"

interface NodeTooltipProps {
  node: SankeyNode<SankeyNodeCustom, SankeyLinkCustom> | undefined
}

const formatDate = (input: string) => {
  return new Date(input).toLocaleDateString('en-us', { month: 'long', year: 'numeric' }).toString()
}

const NodeTooltip = ({ node }: NodeTooltipProps) => {
  // const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

  const isMobile = false

  return (
    <div
      className={`px-2 py-1 max-w-[400px] rounded text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-70 bg-opacity-70 backdrop-blur drop-shadow`}
    >
      {node &&
        <div>
          <div className="flex">
            <div className="text-lg font-bold">{node.name}</div>
          </div>

          {node.start && node.end &&
            <div className="mt-2">
              {formatDate(node.start)} to {formatDate(node.end)}
            </div>
          }

          {node.shortDesc &&
            <div className="mt-2">
              {node.shortDesc}
            </div>
          }

          {isMobile &&
            <button>More</button>
          }
        </div>
      }
    </div>
  )

}

export default NodeTooltip
