import React from "react";

interface IProps {
  name?: string
}

const MainLayout = async ({ children }: {children: React.ReactNode}) => { 
  return (
    <div className="h-full">
      {children}
    </div>
  )
 }

 export default MainLayout;