import React from "react";
import { timeAgo } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import {
  renderDescription,
  renderIcon,
  renderMessage,
} from "./notificationHelper";
const NotificationCard = ({ notification }) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 flex gap-3 items-start border-b border-gray-300">
      <div>{renderIcon(notification)}</div>
      <div className="flex gap-2 items-start w-full">
        <div className="flex-shrink-0">
          <div className="">
            <img
              src={notification?.relatedUser?.profileImageUrl}
              className="h-8 w-8 rounded-full object-cover"
              alt=""
            />
          </div>
          <div></div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between h-max">
            <h1 className="text-sm">{renderMessage(notification)}</h1>
            <span className="text-[10px] text-gray-500 font-medium">
              {timeAgo(notification?.createdAt)}
            </span>
          </div>
          {renderDescription(notification)}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
