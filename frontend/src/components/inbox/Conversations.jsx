import React from "react";
import useGetConversations from "../../hooks/inbox/useGetConversation";
import { useMediaQuery } from "react-responsive";
import InboxMessage from "./InboxMessage";

const Conversations = ({ recept, setRecept }) => {
  const { data } = useGetConversations();
  return (
    <div className="fixed md:static right-0 top-[56px] z-10 w-full h-full bg-white md:pt-0 pt-4 border-l md:border-none border-gray-300">
      {data?.map((user) => (
        <div
          key={user.id}
          onClick={() => setRecept(user)}
          className="flex items-start justify-between hover:bg-gray-100 px-4 py-3 cursor-pointer"
        >
          <div className="flex items-start gap-2 ">
            <div>
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
              <p className="text-xs text-gray-600 truncate">{user.bio}</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-600">20h</p>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
