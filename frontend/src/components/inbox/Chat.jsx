import { ArrowUp, Loader2, MoreHorizontal, Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSendMessage } from "../../hooks/inbox/useSendMessage";
import useGetMessages from "../../hooks/inbox/useGetMessages";
import ChatContent from "./ChatContent";
import ChatSkeleton from "../skeleton/ChatSkeleton";

const Chat = ({ recept, setRecept }) => {
  const [content, setContent] = useState("");
  const chatContainerRef = useRef(null);
  const { data, isLoading } = useGetMessages(recept?.conversationId);
  const sendMessage = useSendMessage();
  const handleSend = () => {
    sendMessage.mutate(
      { content: content, senderId: recept?.id },
      {
        onSuccess: (data) => {
          console.log("data => ", data);
          // setRecept((prevRecept) => ({
          //   ...prevRecept,
          //   conversationId: data.conversationId,
          // }));
          console.log("recept on message => ", recept);
          setRecept(recept.conversationId);
        },
      }
    );
    setContent("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        const lastChild = chatContainerRef.current.lastElementChild;
        if (lastChild) {
          lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    };
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [data]);
  if (isLoading) {
    return <ChatSkeleton />;
  }
  return (
    <div className="mt-[52px] relative z-[20] bg-white max-h-full min-h-screen border-r border-gray-300 pb-24">
      <div className="sticky top-[56px] bg-white px-4 py-3 border-b border-gray-300 flex items-center justify-between">
        <div className="flex gap-2 cursor-pointer group">
          <div>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={recept.profileImageUrl}
              alt=""
            />
          </div>
          <div>
            <h1 className="text-sm font-normal group-hover:underline">
              {recept.firstname} {recept.lastname}
            </h1>
            <p className="text-xs text-gray-600">{recept.bio}</p>
          </div>
        </div>
        <div className="h-6 w-6 flex items-center justify-center cursor-pointer border border-gray-300 rounded-full">
          <MoreHorizontal strokeWidth={1} className="rotate-90 size-4" />
        </div>
      </div>
      <div className="hi" ref={chatContainerRef}>
        {data?.map((chat) => (
          <div key={chat.id}>
            <ChatContent chat={chat} />
          </div>
        ))}
      </div>
      <div className="fixed max-w-[640px] w-full md:bottom-0 bottom-16 flex items-center px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <div className="w-full py-1.5 pl-4 pr-2 border border-gray-300 rounded-full bg-white flex items-center justify-between">
          <input
            type="text"
            value={content}
            onKeyDown={handleKeyPress}
            onChange={(e) => setContent(e.target.value)}
            className="outline-none flex-1 text-sm"
            placeholder="Write a message..."
          />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full">
              <Smile size={16} />
            </div>
            <div
              onClick={handleSend}
              className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full"
            >
              {sendMessage.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <ArrowUp size={16} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
