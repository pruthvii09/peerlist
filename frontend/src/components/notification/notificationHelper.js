import { AtSign, Eye, MessageSquare, Repeat, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
export const renderIcon = (notification) => {
  switch (notification.type) {
    case "POST_TAG":
      return <AtSign className="mt-1 text-gray-600" size={18} />;
    case "POST_LIKE":
      return <ThumbsUp className="mt-1 text-gray-600" size={18} />;
    case "COMMENT_TAG":
      return <MessageSquare className="mt-1 text-gray-600" size={18} />;
    case "POST_COMMENT":
      return <Repeat className="mt-1 text-gray-600" size={18} />;
    case "PROFILE_VIEW":
      return <Eye className="mt-1 text-gray-600" size={18} />;
    default:
      return <AtSign className="mt-1 text-gray-600" size={18} />;
  }
};
export const renderDescription = (notification) => {
  switch (notification.type) {
    case "PROFILE_VIEW":
      return (
        <div className="mt-2 text-sm border-l-2 border-gray-300 pl-4">
          You have a new notification. Check it out!
        </div>
      );
    case "COMMENT_TAG":
      return (
        <Link
          className="mt-2 text-sm border-l-2 border-gray-300 pl-4"
          dangerouslySetInnerHTML={{ __html: notification.comment.content }}
        />
      );
    case "POST_LIKE":
      return (
        <Link
          to={`/scroll/post/${notification?.post?.id}`}
          className="mt-2 text-sm border-l-2 border-gray-300 pl-4"
          dangerouslySetInnerHTML={{ __html: notification?.post?.content }}
        />
      );
    case "POST_TAG":
      return (
        <Link
          to={`/scroll/post/${notification.post.id}`}
          className="mt-2 text-sm border-l-2 border-gray-300 pl-4"
          dangerouslySetInnerHTML={{ __html: notification.post.content }}
        />
      );
    case "POST_COMMENT":
      return (
        <Link
          to={`/scroll/post/${notification.post.id}`}
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

export const renderMessage = (notification) => {
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
    case "POST_COMMENT":
      return (
        <>
          <Link
            to={`/user/${notification.relatedUser.username}`}
            className="text-[#008000] font-medium"
          >
            {notification.relatedUser.firstname}
          </Link>{" "}
          commented on your post
        </>
      );
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
