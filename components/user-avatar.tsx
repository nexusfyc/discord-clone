import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import React from "react";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => { 
  const {src, className} = props;


  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)} >
      <AvatarImage src={src} />
    </Avatar>
  )
 }

 export default UserAvatar;