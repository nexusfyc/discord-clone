"use client"

import { format } from 'date-fns'
import { Member, Message, Profile } from "@prisma/client";
import { Divide, Hash, Loader2, ServerCrash } from "lucide-react";
import React, { ElementRef, Fragment, useRef } from "react";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import ChatItem from "./chat-item";
import { useChatSocket } from '@/hooks/use-chat-socket';
import { useChatScroll } from '@/hooks/use-chat-scoll';
import { db } from '@/lib/db';

const DATE_FORMAT = "d MMM yyyy, HH:mm"

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation"
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}

const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const { name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type } = props;
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);



  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
  });

  useChatSocket({ addKey, queryKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items.length ?? 0,
  });


  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center" >
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400" >
          loading messages...
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center" >
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400" >
          something wrong~~
        </p>
      </div>
    )
  }




  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto" >
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome
        type={type}
        name={name}
      />}
      {hasNextPage && (
        <div className='flex justify-center' >
          {isFetchingNextPage ? (
            <Loader2 className='h-6 w-6 text-zinc-500 animate-spin my-4' />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition' >
              load previous messages
            </button>
          )}
        </div>)}
      <div className="flex flex-col-reverse mt-auto" >
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items.map((message: MessageWithMemberWithProfile) => {
              return (<ChatItem
                key={message.id}
                id={message.id}
                member={message.member}
                currentMember={member}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createAt), DATE_FORMAT)}
                isUpdated={message.updateAt !== message.createAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />)

            })}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatMessages;