"use client"

import { useSocket } from "@/components/providers/socket-provider"
import { Badge } from "@/components/ui/badge"

import React from "react";

interface IProps {
  name?: string
}

const SocketIndicator: React.FC<IProps> = (props) => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none" >
        Fallback: Polling every 1s
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none" >
      Live: Real-time updates
    </Badge>
  )

}

export default SocketIndicator;