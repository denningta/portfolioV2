import { SankeyLinkCustom, SankeyNodeCustom } from "types"
import { SankeyNode } from "d3-sankey"
import useMediaQuery from "hooks/useMediaQuery"
import { Button } from "@mui/material"
import getNodeRoute from "./get-node-route"
import Link from "next/link"

interface NodeTooltipProps {
  node: SankeyNode<SankeyNodeCustom, SankeyLinkCustom> | undefined
}

const formatDate = (input: string) => {
  return new Date(input).toLocaleDateString('en-us', { month: 'long', year: 'numeric' }).toString()
}

const NodeTooltip = ({ node }: NodeTooltipProps) => {
  const isMobile = useMediaQuery(`(max-width: 760px)`)

  const href = getNodeRoute(node) ?? ''

  return (
    <div
      className={`px-2 py-1 max-w-[300px] rounded text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 dark:bg-opacity-70 bg-opacity-70 backdrop-blur drop-shadow`}
    >
      {node &&
        <div className="flex flex-col space-y-3">
          <div className="flex">
            <div className="text-lg font-bold">{node.name}</div>
          </div>

          {node.start && node.end &&
            <div className="">
              {formatDate(node.start)} to {formatDate(node.end)}
            </div>
          }

          {node.shortDesc &&
            <div className="">
              {node.shortDesc}
            </div>
          }

          {isMobile &&
            <div className="flex items-center justify-center">
              <Link href={href}>
                <Button disableRipple>Read more</Button>
              </Link>
            </div>
          }
        </div>
      }
    </div>
  )

}

export default NodeTooltip
