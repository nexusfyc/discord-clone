import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";

interface IProps {
  serverId: string;
}

const MobileToggle: React.FC<IProps> = (props) => { 
  const { serverId } = props;
  
  return (
    <Sheet>
      <SheetTrigger asChild >
        <Button variant="ghost" size="icon" className="md:hidden" >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 flex gap-0" side="left" >
        <div className="w-[72px]" >
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
 }

 export default MobileToggle;