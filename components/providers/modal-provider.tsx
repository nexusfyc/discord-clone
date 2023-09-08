"use client"

import CreateServerModal from "@/components/modals/create-server-modal"

import React, { useEffect, useState } from "react";
import InviteModal from "@/components/modals/invite-modal";

interface IProps {
  name?: string
}

const ModalProvider: React.FC<IProps> = (props) => { 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { 
    setIsMounted(true);
   }, [])

   if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
    </>
  )
 }

 export default ModalProvider;