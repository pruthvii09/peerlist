import React from "react";
import useGetConversations from "../../hooks/inbox/useGetConversation";
import Skeleton from "react-loading-skeleton";
import { timeAgo } from "../../utils/functions";
import { useSelector } from "react-redux";

const Conversations = ({ setRecept }) => {
  const { data, isLoading } = useGetConversations();
  const { user: loggedUser } = useSelector((store) => store.user);

  const truncateMessage = (message, wordLimit) => {
    const words = message.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return message;
  };
  if (isLoading) {
    return (
      <div className="fixed md:static right-0 top-[56px] z-10 w-full h-full bg-white md:pt-0 pt-4 border-l md:border-none border-gray-300">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start justify-between hover:bg-gray-100 px-4 py-3 cursor-pointer"
          >
            <div className="flex items-start gap-2 ">
              <div>
                <Skeleton circle={true} height={20} width={20} />
              </div>
              <div>
                <h1 className="text-sm font-normal">
                  <Skeleton width={100} />
                </h1>
                <p className="text-xs text-gray-600 truncate">
                  <Skeleton width={200} />
                </p>
              </div>
            </div>
            <p className="text-[10px] text-gray-600">
              <Skeleton width={20} />
            </p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="fixed md:static right-0 top-[56px] z-10 w-full h-full bg-white md:pt-0 pt-4 border-l md:border-none border-gray-300">
      {data?.map((user) => {
        const isSenderYou =
          user?.lastMessage.senderUsername === loggedUser?.username;
        const truncatedContent = truncateMessage(user.lastMessage.content, 3);
        return (
          <div
            key={user.id}
            onClick={() => setRecept(user)}
            className="flex items-start justify-between hover:bg-gray-100 px-4 py-3 cursor-pointer"
          >
            <div className="flex items-start gap-2 ">
              <div className="">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.profileImageUrl}
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-sm font-normal">
                  {user.firstname} {user.lastname}
                </h1>
                {isSenderYou ? (
                  <p className="text-xs text-gray-600">
                    You: {truncatedContent}
                  </p>
                ) : (
                  <p className="text-xs text-gray-600">{truncatedContent}</p>
                )}
              </div>
            </div>
            <p className="text-[10px] text-gray-600">
              {timeAgo(user.lastMessage.createdAt)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Conversations;
