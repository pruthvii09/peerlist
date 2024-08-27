import { ArrowUp, Loader2, MoreHorizontal, Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSendMessage } from "../../hooks/inbox/useSendMessage";
import useGetMessages from "../../hooks/inbox/useGetMessages";
import ChatContent from "./ChatContent";
import ChatSkeleton from "../skeleton/ChatSkeleton";
import socket from "../../socket";
import { useSelector } from "react-redux";
const Chat = ({ recept }) => {
  const chatContainerRef = useRef(null);
  const [content, setContent] = useState("");
  const { user } = useSelector((store) => store.user);
  const { data, isLoading } = useGetMessages(recept?.conversationId);
  const [conversationId, setConversationId] = useState(
    recept?.conversationId || ""
  );
  const [chat, setChat] = useState([]);
  useEffect(() => {
    if (data) {
      setChat(data);
    } else {
      setChat([]);
    }
  }, [data]);
  useEffect(() => {
    console.log("Current chat state:", chat);
  }, [chat]);
  const sendMessage = useSendMessage();
  const handleSend = () => {
    const newMessage = {
      content: content,
      isRead: false,
      createdAt: new Date(),
      senderId: user?.id,
      sender: {
        firstname: user?.firstname,
        lastname: user?.lastname,
        profileImageUrl: user?.profileImageUrl,
        username: user?.username,
      },
    };
    setChat((prevChat) => [...prevChat, newMessage]);
    socket.emit("send_message", {
      conversationId: conversationId,
      message: content,
      senderId: user?.id,
    });
    setContent("");
  };
  useEffect(() => {
    if (!conversationId) {
      socket.emit(
        "create_conversation",
        { userId: user?.id, senderId: recept?.id },
        (response) => {
          if (response.error) {
            console.error("Failed to create conversation:", response.error);
            return;
          }
          const newConversationId = response.conversationId;
          setConversationId(newConversationId);
          socket.emit("join_room", newConversationId);
        }
      );
    } else {
      socket.emit("join_room", conversationId);
    }

    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [recept, conversationId, user?.id]);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    chatContainerRef?.current?.scrollIntoView();
  }, [chat]);
  if (isLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="mt-[52px] relative z-[20] bg-white max-h-full min-h-screen border-r border-gray-300 md:pb-24 pb-40">
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
      {chat?.map((chat, i) => (
        <div key={i}>
          <ChatContent chat={chat} />
        </div>
      ))}
      <div ref={chatContainerRef}></div>
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
          {/* <QuillEditor height="" onChange={(e) => setContent(e.target.value)} /> */}
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
