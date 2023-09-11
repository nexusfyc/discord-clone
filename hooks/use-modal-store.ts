import { ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

//  app中弹窗的类型（创建服务、邀请）
export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer";



interface ModalData {
  server?: Server;
  channelType?: ChannelType
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({ 
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({
    //  当打开弹窗时，将信息保存入store
    isOpen: true,
    type,
    data
  }),
  onClose: () => set({
    type: null,
    isOpen: false
  })
 }))