"use client"

import qs from 'query-string'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"


type Props = {}

export default function DeleteMessageModal({ }: Props) {

    const { isOpen, type, onClose, data, onOpen } = useModal();
    const router = useRouter();

    const [copied, setCopied] = useState(false);

    // 提交
    const [isLoading, setIsLoading] = useState(false);


    const isModalOpen = isOpen && type === "deleteMessage"
    const { apiUrl, query } = data;

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            })
            await axios.delete(url);

            onClose();
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="bg-white text-black p-0 overflow-hidden" >
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-center" >
                        Are you sure you want to permanently delete this message?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4" >
                    <div className="flex items-center justify-between w-full" >
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant="primary"
                            onClick={onClick}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}