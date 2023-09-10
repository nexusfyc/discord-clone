import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ServerSidebarProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
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
      <ScrollArea className="flex-1 px-3" >
        <div className="mt-2" >
          <ServerSearch 
          data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannels?.map((channel) => ({ 
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type]
               }))
            },
            {
              label: "Voice Channels",
              type: "channel",
              data: audioChannels?.map((channel) => ({ 
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type]
               }))
            },
            {
              label: "Video Channels",
              type: "channel",
              data: audioChannels?.map((channel) => ({ 
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type]
               }))
            },
            {
              label: "Members",
              type: "member",
              data: members?.map((member) => ({ 
                id: member.id,
                name: member.profile.name,
                icon: roleIconMap[member.role],
               }))
            }
          ]}
          />
        </div>
        <Separator  className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      </ScrollArea>
    </div>
  )
 } 

 export default ServerSidebar;