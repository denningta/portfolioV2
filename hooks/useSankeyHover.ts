import { SankeyLinkComponentProps } from "@/components/sankey-diagram/SankeyLink"
import { SankeyNodeComponentProps } from "@/components/sankey-diagram/SankeyNodeComponent"
import { SankeyLinkCustom, SankeyNodeCustom } from "@/sanity-queries/getSankeyData"
import { SankeyNode, SankeyLink } from "d3-sankey"
import { useState } from "react"

export interface UseSankeyHoverProps {
  nodeStyle: {
    default: {
      fill: string
      textColor: string
      textBackground: string
      textBgOpacity: number
      opacity: number
    }
    hover: {
      fill: string
      textColor: string
      textBackground: string
      textBgOpacity: number
      opacity: number
    }
  }
  linkStyle: {
    default: {
      fill: string
      opacity: number
    }
    hover: {
      fill: string
      opacity: number
    }
  }
}

const useSankeyHover = ({ nodeStyle, linkStyle }: UseSankeyHoverProps) => {
  const [activeNodeIds, setActiveNodeIds] = useState<string[] | undefined>(undefined)
  const [activeLinkIds, setActiveLinkIds] = useState<number[] | undefined>(undefined)
  const [activeNode, setActiveNode] = useState<SankeyNode<SankeyNodeCustom, SankeyLinkCustom> | undefined>(undefined)



  const handleNodeHoverChange: SankeyNodeComponentProps['onHoverChange'] = (node) => {
    if (!node) {
      setActiveNodeIds(undefined)
      setActiveLinkIds(undefined)
      setActiveNode(undefined)
      return
    }

    setActiveNode(node)

    const nodeIds = []
    const linkIds = []

    if (node.sourceLinks) {
      nodeIds.push(
        node.id,
        ...node.sourceLinks.map((link: any) => link.target.id),
      )
      linkIds.push(
        ...node.sourceLinks.map((link: any) => link.index)
      )
    }

    if (node.targetLinks) {
      nodeIds.push(
        node.id,
        ...node.targetLinks.map((link: any) => link.source.id)
      )
      linkIds.push(
        ...node.targetLinks.map((link: any) => link.index)
      )
    }

    setActiveNodeIds(nodeIds)
    setActiveLinkIds(linkIds)
  }

  const handleNodeStyle = (node: SankeyNode<SankeyNodeCustom, SankeyLinkCustom>) => {
    if (!activeNodeIds) return nodeStyle.default
    if (!activeNodeIds.length) return nodeStyle.default

    if (activeNodeIds.includes(node.id)) return nodeStyle.hover

    return nodeStyle.default
  }

  const handleLinkHoverChange: SankeyLinkComponentProps['onHoverChange'] = (link) => {
    if (!link) {
      setActiveNodeIds(undefined)
      setActiveLinkIds(undefined)
      return
    }

    const source = link.source as SankeyNode<SankeyNodeCustom, SankeyLinkCustom>
    const target = link.target as SankeyNode<SankeyNodeCustom, SankeyLinkCustom>

    setActiveNodeIds([
      source.id,
      target.id
    ])

    setActiveLinkIds(link.index !== undefined ? [link.index] : undefined)
  }

  const handleLinkStyle = (link: SankeyLink<SankeyNodeCustom, SankeyLinkCustom>) => {
    if (!activeLinkIds) return linkStyle.default
    if (link.index === undefined) return linkStyle.default
    if (activeLinkIds.includes(link.index)) return linkStyle.hover
    return linkStyle.default
  }

  return {
    handleNodeHoverChange,
    handleLinkHoverChange,
    handleNodeStyle,
    handleLinkStyle,
    activeNode
  }

}

export default useSankeyHover
