import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string
}

const ServerSidebar: React.FC<ServerSidebarProps> = async (props) => { 
  //  由于在移动端不加载layout函数，我们需要在layout和当前组件中同时获取server，则需要传入serverId
  const { serverId } = props;

  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createAr: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        }
      }
    }
  });

  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
  const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
  const members = server?.members.filter((member) => member.profileId !== profile.id);

  if (!server) return redirect("/");

  //  查询当前profile的角色（权限）
  const role = server.members.find((member) => member.profileId === profile.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]" >
      <ServerHeader
        server={server}
        role={role} 
      />
    </div>
  )
 } 

 export default ServerSidebar;