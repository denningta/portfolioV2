import { SankeyNode } from "d3-sankey"
import { SankeyNodeCustom, SankeyLinkCustom } from "types"

export default function getNodeRoute(node: SankeyNode<SankeyNodeCustom, SankeyLinkCustom> | undefined) {
  if (!node) return undefined

  let route: string | undefined = undefined
  if (node.href) {
    if (node._type === 'project') route = `/projects/${node.href}`
    if (node._type === 'skill') route = `/skills/${node.href}`
    if (node._type === 'employment') route = `/employment/${node.href}`
  }

  return route
}
