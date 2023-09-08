"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import React from "react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ChevronDown, UserPlus, Settings, Users, PlusCircle, Trash, LogOut } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  //  这里server需要用到member和profile，在根目录的types中定义新的server类型
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
  tobe?: Server
}

const ServerHeader: React.FC<ServerHeaderProps> = (props) => {
  const { server, role } = props;

  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  //  admin一定是moderator，且两者都可以邀请用户
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover: bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition" >
          {server.name}
          <ChevronDown />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
        onClick={() => onOpen("invite", { server })}
      >
        {isModerator && (
          <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer" >
            邀请用户
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* 当角色为admin，可以配置服务、管理成员 */}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" >
            服务设置
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" >
            管理成员
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* 当角色为admin，可以配置服务、管理成员 */}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer" >
            创建频道
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuSeparator />
        )}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer" >
            删除服务
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* 只有guest和moderator能离开服务，admin只能删除服务 */}
        {!isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer" >
            离开服务
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader;