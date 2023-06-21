import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { useCallback } from "react";

export interface UseCustomTooltipProps {
  container: {
    width: number
    height: number
  }
}

const useCustomTooltip = ({ container }: UseCustomTooltipProps) => {

  const {
    showTooltip,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<string>({
    tooltipOpen: true,
    tooltipLeft: container.width / 3,
    tooltipTop: container.height / 3,
    tooltipData: 'Move me with your mouse or finger',
  });

  const { containerRef, containerBounds } = useTooltipInPortal({
    scroll: true,
    detectBounds: false,
  });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // coordinates should be relative to the container in which Tooltip is rendered
      const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
      const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top;
      showTooltip({
        tooltipLeft: containerX,
        tooltipTop: containerY,
        tooltipData: 'This is the tooltip'
      });
    },
    [showTooltip, containerBounds],
  );

  return {
    handlePointerMove,
    containerRef,
    tooltipLeft,
    tooltipTop,

  }



}

export default useCustomTooltip
