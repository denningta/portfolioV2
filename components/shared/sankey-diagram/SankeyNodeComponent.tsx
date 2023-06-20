import { SankeyLinkCustom, SankeyNodeCustom } from "types"
import { Group } from "@visx/group"
import { Text } from "@visx/text"
import { SankeyNode } from "d3-sankey"
import Link from "next/link"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"

export interface SankeyNodeComponentProps {
  node: SankeyNode<SankeyNodeCustom, SankeyLinkCustom>
  containerWidth: number
  onHoverChange?: (node: SankeyNode<SankeyNodeCustom, SankeyLinkCustom> | undefined) => void
  fill?: string
  textColor?: string
  textBackground?: string
  textBgOpacity?: number
  opacity?: number
}

const SankeyNodeComponent = ({
  node,
  containerWidth,
  onHoverChange = () => { },
  fill,
  textColor,
  textBackground,
  textBgOpacity,
  opacity
}: SankeyNodeComponentProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

  const handleMouseEnter = () => {
    onHoverChange(node)
  }

  const handleMouseLeave = () => {
    onHoverChange(undefined)
  }

  const nodeWidth = node.x1 && node.x0 ? (node.x1 - node.x0) : 0
  const nodeHeight = node.y1 && node.y0 ? (node.y1 - node.y0) : 0

  const textX = (node.x0 ?? 0) > 1 ? -15 : 30
  const textY = nodeHeight / 2
  const textWidth = (node.x0 ?? 0) > (containerWidth - 50) ? 250 : 130

  const textRef = useRef<SVGSVGElement>(null)
  const textBBox = textRef.current?.getBBox()

  const nodeBox =
    <rect
      width={nodeWidth}
      height={nodeHeight}
      fill={node.color ? node.color.hex : fill}
      opacity={opacity}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />

  const nodeText = <>{textBBox &&
    <rect
      fill={textBackground}
      x={textBBox.x - 8}
      y={textBBox.y - 2}
      height={textBBox.height + 4}
      width={textBBox.width + 16}
      rx={4}
      opacity={textBgOpacity}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  }
    <Text
      x={textX}
      y={textY}
      innerRef={textRef}
      verticalAnchor="middle"
      textAnchor={(node.x0 ?? 0) > 1 ? 'end' : 'start'}
      fontSize={isMobile ? 10 : 14}
      fill={textColor}
      opacity={opacity}
      width={textWidth}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {node.name}
    </Text>
  </>


  if (!isMobile)
    return (
      <>
        {nodeWidth > 0 && nodeHeight > 0 &&
          <Group top={node.y0} left={node.x0}>
            <Link
              href={node.href ? `/writing/${node.href}` : ''}
              className={node.href ? 'cursor-pointer' : 'cursor-auto'}
            >
              {nodeBox}
            </Link>

            <Link
              href={node.href ? `/writing/${node.href}` : ''}
              className={node.href ? 'cursor-pointer' : 'cursor-default'}
            >
              {nodeText}
            </Link>

          </Group>
        }
      </>
    )

  return (
    <>
      {nodeWidth > 0 && nodeHeight > 0 &&
        <Group top={node.y0} left={node.x0}>
          {nodeBox}
          {nodeText}
        </Group>
      }
    </>
  )
}

export default SankeyNodeComponent
