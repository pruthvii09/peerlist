import { AtSign, ThumbsUp, MessageSquare, Repeat, Eye } from "lucide-react";
import React from "react";
import { timeAgo } from "../../utils/functions";
import { Link } from "react-router-dom";
const NotificationCard = ({ notification }) => {
  const renderIcon = () => {
    switch (notification.type) {
      case "POST_TAG":
        return <AtSign className="mt-1 text-gray-600" size={18} />;
      case "POST_LIKE":
        return <ThumbsUp className="mt-1 text-gray-600" size={18} />;
      case "COMMENT_TAG":
        return <MessageSquare className="mt-1 text-gray-600" size={18} />;
      case "COMMENT_REPLY":
        return <Repeat className="mt-1 text-gray-600" size={18} />;
      case "PROFILE_VIEW":
        return <Eye className="mt-1 text-gray-600" size={18} />;
      default:
        return <AtSign className="mt-1 text-gray-600" size={18} />;
    }
  };

  const renderMessage = () => {
    switch (notification.type) {
      case "POST_TAG":
        return (
          <>
            <Link
              to={`/user/${notification.relatedUser.username}`}
              className="text-[#008000] font-medium"
            >
              {notification.relatedUser.firstname}
            </Link>{" "}
            mentioned you in a post
          </>
        );
      case "POST_LIKE":
        return (
          <>
            <Link
              to={`/user/${notification.relatedUser.username}`}
              className="text-[#008000] font-medium"
            >
              {notification.relatedUser.firstname}
            </Link>{" "}
            liked your post
          </>
        );
      case "COMMENT_TAG":
        return (
          <>
            <Link
              to={`/user/${notification.relatedUser.username}`}
              className="text-[#008000] font-medium"
            >
              {notification.relatedUser.firstname}
            </Link>{" "}
            mentioned you in comment
          </>
        );
      case "COMMENT_REPLY":
        return "Someone replied to your comment";
      case "PROFILE_VIEW":
        return (
          <>
            <Link
              to={`/user/${notification.relatedUser.username}`}
              className="text-[#008000] font-medium"
            >
              {notification.relatedUser.firstname}
            </Link>{" "}
            viwed your profile
          </>
        );
      default:
        return "You have a new notification";
    }
  };

  const renderDescription = () => {
    console.log("notification.type => ", notification.type);
    switch (notification.type) {
      case "PROFILE_VIEW":
        return (
          <div className="mt-2 text-sm border-l-2 border-gray-300 pl-4">
            You have a new notification. Check it out!
          </div>
        );
      case "COMMENT_TAG":
        return (
          <div
            className="mt-2 text-sm border-l-2 border-gray-300 pl-4"
            dangerouslySetInnerHTML={{ __html: notification.comment.content }}
          />
        );
      case "POST_LIKE":
        return (
          <div
            className="mt-2 text-sm border-l-2 border-gray-300 pl-4"
            dangerouslySetInnerHTML={{ __html: notification.post.content }}
          />
        );
      case "POST_TAG":
        return (
          <div
            className="mt-2 text-sm border-l-2 border-gray-300 pl-4"
            dangerouslySetInnerHTML={{ __html: notification.post.content }}
          />
        );
      default:
        return (
          <p className="mt-2 text-sm border-l-2 border-gray-300 pl-4 h">
            You have a new notification. Check it out!
          </p>
        );
    }
  };

  return (
    <div className="px-4 py-4 flex gap-3 items-start border-b border-gray-300">
      <div>{renderIcon()}</div>
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
            <h1 className="text-sm">{renderMessage()}</h1>
            <span className="text-[10px] text-gray-500 font-medium">
              {timeAgo(notification?.createdAt)}
            </span>
          </div>
          {renderDescription()}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
