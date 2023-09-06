import React from "react";

interface IProps {
  name?: string
}

const MainLayout = async ({ children }: {children: React.ReactNode}) => { 
  return (
    <div>
      {children}
    </div>
  )
 }

 export default MainLayout;