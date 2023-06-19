'use client'

import Sankey, { SankeyData } from "./Sankey"
import { Group } from "@visx/group"
import SankeyLinkComponent from "./SankeyLink"
import SankeyNodeComponent from "./SankeyNodeComponent"
import useSankeyHover from "hooks/useSankeyHover"
import { defaultStyles, TooltipWithBounds } from "@visx/tooltip"
import { useContext } from "react"
import NodeTooltip from "./NodeTooltip"
import { tailwindColors } from "lib/tailwind-config"
import Heading from "components/global/Heading"
import { ParentSize } from "@visx/responsive"
import useCustomTooltip from "hooks/useCustomTooltip"
import { useMediaQuery } from "react-responsive"
import { motion } from "framer-motion"

export interface SankeyChartProps {
  data: SankeyData | undefined
  width: number
  height: number
  margin?: { top: number, left: number, right: number, bottom: number }
}

const SankeyChart = ({
  data,
  width,
  height,
  margin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}: SankeyChartProps) => {
  const darkMode = false // TODO: Dynamic darkMode

  const nodeStyle = {
    default: {
      fill: darkMode ? 'white' : 'black',
      textColor: darkMode ? 'white' : 'black',
      textBackground: darkMode ? 'black' : 'white',
      textBgOpacity: 0.5,
      opacity: 0.7
    },
    hover: {
      fill: darkMode ? 'white' : 'black',
      textColor: darkMode ? 'black' : 'white',
      textBackground: darkMode ? 'white' : 'black',
      textBgOpacity: 0.5,
      opacity: 1
    }
  }

  const linkStyle = {
    default: {
      fill: darkMode ? 'white' : 'black',
      opacity: darkMode ? 0.2 : 0.5
    },
    hover: {
      fill: darkMode ? tailwindColors.blue['500'] : 'lightblue',
      opacity: 1
    }
  }

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

  const {
    handleNodeHoverChange,
    handleLinkHoverChange,
    handleLinkStyle,
    handleNodeStyle,
    activeNode
  } = useSankeyHover({
    nodeStyle: nodeStyle,
    linkStyle: linkStyle
  })

  const {
    tooltipTop,
    tooltipLeft,
    containerRef,
    handlePointerMove
  } = useCustomTooltip({ container: { width: width, height: height } })

  return (
    <>
      <div className="grid grid-cols-3 w-full">
        <Heading>Work</Heading>
        <Heading className="flex justify-center">Projects</Heading>
        <Heading className="flex justify-end">Skills</Heading>
      </div>

      <motion.div
        className="relative select-none h-[600px]" ref={containerRef} onPointerMove={handlePointerMove}
      >
        {isMobile && data && data.nodes.map((node, i) =>
          <motion.div
            key={`tooltip-${i}`}
            className="fixed bottom-5 right-5 m-0 text-black z-50 px-3 py-1 text-xs w-[300px] mt-[30px]"
            animate={activeNode && activeNode.id === node.id ? 'open' : 'closed'}
            variants={{
              open: {
                display: 'block',
                y: 0,
                transition: { delay: 0.2 }
              },
              closed: {
                y: 150,
                transition: { delay: 0.2 }
              }
            }}
          >
            <NodeTooltip node={node} />
          </motion.div>
        )}

        {!isMobile && activeNode &&
          <TooltipWithBounds
            key={Math.random()}
            left={tooltipLeft}
            top={tooltipTop + 40}
            style={{ ...defaultStyles, padding: 0, background: 'none', boxShadow: 'none' }}
          >
            <NodeTooltip node={activeNode} />
          </TooltipWithBounds>
        }


        <ParentSize debounceTime={10}>
          {(parent) => {
            if (!parent) return
            return (
              <svg
                width={parent.width + margin.left + margin.right}
                height={parent.height + margin.top + margin.bottom}
              >
                {data &&
                  <Sankey
                    top={margin.top}
                    left={margin.left}
                    data={data}
                    size={[parent.width, parent.height]}
                    nodeWidth={15}
                    nodePadding={10}
                    extent={[
                      [1, 1],
                      [parent.width - 1, parent.height - 6]
                    ]}
                    nodeId={(d) => d.id}
                    nodeSort={() => undefined}
                  >
                    {(data) => (
                      <Group>
                        {data.links.map((link, i) =>
                          <SankeyLinkComponent
                            key={`link-${i}`}
                            link={link as any}
                            onHoverChange={handleLinkHoverChange}
                            fill={handleLinkStyle(link).fill}
                            opacity={handleLinkStyle(link).opacity}
                            darkMode={darkMode}
                          />
                        )}

                        {data.nodes.map((node, i) =>
                          <SankeyNodeComponent
                            key={`node-${i}`}
                            node={node}
                            containerWidth={parent.width}
                            onHoverChange={handleNodeHoverChange}
                            fill={handleNodeStyle(node).fill}
                            textColor={handleNodeStyle(node).textColor}
                            textBackground={handleNodeStyle(node).textBackground}
                            textBgOpacity={handleNodeStyle(node).textBgOpacity}
                            opacity={handleNodeStyle(node).opacity}
                          />
                        )}
                      </Group>
                    )}
                  </Sankey>
                }
              </svg>
            )
          }}
        </ParentSize>
      </motion.div>
    </>
  )
}

export default SankeyChart
