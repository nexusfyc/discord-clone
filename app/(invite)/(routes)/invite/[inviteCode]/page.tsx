import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface IProps {
  params: {
    inviteCode: string;
  }
}

const InviteCodePage: React.FC<IProps> = async (props) => { 
  const {params} = props;
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!params.inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  //  如果成员已经加入服务，则直接重定向至服务
  if (existingServer) return redirect(`/servers/${existingServer.id}`)
    
  //  没有当前成员，则将该成员添加至当前服务
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          }
        ]
      }
    }
  });

  if (server) return redirect(`/servers/${server.id}`);

  return null;
 }

 export default InviteCodePage;