import { sankey as d3Sankey, SankeyLayout, SankeyGraph } from "d3-sankey"
import { HierarchyDefaultNode as DefaultNode } from "@visx/hierarchy"
import { Group } from "@visx/group"
import { SankeyLinkCustom, SankeyNodeCustom } from "types"



export type SankeyData = SankeyGraph<SankeyNodeCustom, SankeyLinkCustom>
type D3SankeyProps = SankeyLayout<SankeyData, SankeyNodeCustom, SankeyLinkCustom>

export interface SankeyProps {
  data: SankeyData
  children?: (data: SankeyData) => JSX.Element | undefined
  top?: number
  left?: number
  className?: string
  size?: [number, number]
  nodeId?: Parameters<D3SankeyProps['nodeId']>[0]
  nodeAlign?: Parameters<D3SankeyProps['nodeAlign']>[0]
  nodeWidth?: Parameters<D3SankeyProps['nodeWidth']>[0]
  nodePadding?: Parameters<D3SankeyProps['nodePadding']>[0]
  nodeSort?: Parameters<D3SankeyProps['nodeSort']>[0]
  extent?: Parameters<D3SankeyProps['extent']>[0]
  iterations?: Parameters<D3SankeyProps['iterations']>[0]
  circularLinkGap?: any
  nodeComponent?: typeof DefaultNode
}

const Sankey = ({
  top,
  left,
  className = '',
  data,
  size,
  nodeId,
  nodeAlign,
  nodeWidth,
  nodePadding,
  nodeSort,
  extent,
  iterations,
  children,
}: SankeyProps) => {

  const sankey = d3Sankey<SankeyNodeCustom, SankeyLinkCustom>()

  if (size) sankey.size(size);
  if (nodeId) sankey.nodeId(nodeId);
  if (nodeAlign) sankey.nodeAlign(nodeAlign);
  if (nodeWidth) sankey.nodeWidth(nodeWidth);
  if (nodePadding) sankey.nodePadding(nodePadding);
  if (nodeSort) sankey.nodeSort(nodeSort)
  if (extent) sankey.extent(extent);
  if (iterations) sankey.iterations(iterations);

  const sankeyData = sankey(data)

  if (!!children) {
    return (
      <Group top={top} left={left} className={className}>
        {children(sankeyData)}
      </Group>
    );
  }

  return <div>error: no children</div>
}

export default Sankey
