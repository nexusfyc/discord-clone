import React from "react";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member",
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[] | undefined
  }[]
}

const ServerSearch: React.FC<ServerSearchProps> = (props) => { 
  const { data } = props;
  return (
    <div>
      123
    </div>
  )
 }

 export default ServerSearch;