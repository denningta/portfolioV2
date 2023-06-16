import { SankeyLinkCustom, SankeyNodeCustom } from "types"
import { LinearGradient } from "@visx/gradient"
import { SankeyLink, sankeyLinkHorizontal, SankeyNode } from "d3-sankey"
import pSBCR from "lib/shade-blend-convert"

export interface SankeyLinkComponentProps {
  link: SankeyLink<SankeyNodeCustom, SankeyLinkCustom> & {
    target?: SankeyNode<SankeyNodeCustom, SankeyLinkCustom>
    source?: SankeyNode<SankeyNodeCustom, SankeyLinkCustom>
  }
  fill?: string | undefined
  opacity?: string | number | undefined
  onHoverChange?: (link: SankeyLink<SankeyNodeCustom, SankeyLinkCustom> | undefined) => void
  darkMode?: boolean
}

const SankeyLinkComponent = ({
  link,
  opacity,
  onHoverChange = () => { },
  darkMode = false
}: SankeyLinkComponentProps) => {
  const path = sankeyLinkHorizontal()

  const handleMouseEnterLink = () => {
    onHoverChange(link)
  }

  const handleMouseLeaveLink = () => {
    onHoverChange(undefined)
  }

  const getColor = (hex: string) => {
    const darkModeHex = pSBCR(-0.6, hex)
    if (!darkMode && darkModeHex) return darkModeHex
    return hex
  }

  if (link.index === 0) console.log(link.sourceColor.hex, getColor(link.sourceColor.hex))

  return (
    <>
      <LinearGradient
        id={`${link.index}`}
        from={link.sourceColor && getColor(link.sourceColor.hex)}
        to={link.targetColor && getColor(link.targetColor.hex)}
        vertical={false}
        gradientUnits="userSpaceOnUse" // display gradient for path whose bounding box height === 0
        x2={link.target.x0} // required with userSpaceOnUse
        x1={link.source.x1} // required with userSpaceOnUse
      />
      <path
        d={path(link) ?? undefined}
        stroke={`url(#${link.index})`}
        strokeWidth={Math.max(1, link.width ?? 0)}
        fill="none"
        opacity={opacity}
        onMouseEnter={handleMouseEnterLink}
        onMouseLeave={handleMouseLeaveLink}
      />
    </>
  )

}

export default SankeyLinkComponent
