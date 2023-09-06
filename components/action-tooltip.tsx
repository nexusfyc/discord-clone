"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import React from "react";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

const ActionTooltip: React.FC<ActionTooltipProps> = (props) => {
  const { children, side, align, label } = props;


  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} >
          <p className="font-semibold text-sm capitalize" >
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActionTooltip;