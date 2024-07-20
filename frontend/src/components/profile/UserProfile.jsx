import React from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MapPin, UserRoundCog, Link } from "lucide-react";
import useUserProfile from "../../hooks/profile/useUserProfile";

const UserProfile = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useUserProfile(id);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="py-10 mt-14 px-4 flex flex-col sm:items-center items-start gap-4">
        <Skeleton circle height={80} width={80} />
        <div className="flex sm:items-center items-start flex-col gap-2 mt-4">
          <Skeleton height={24} width={200} />
          <Skeleton height={16} width={300} />
        </div>
        <div className="flex items-center flex-wrap gap-4 mt-4">
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={200} />
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  const user = data?.data;

  return (
    <div className="py-10 mt-14 px-4 flex flex-col sm:items-center items-start gap-4">
      <img
        height={80}
        width={80}
        className="rounded-full h-20 w-20 object-cover"
        src={user?.profileImageUrl}
        alt={user?.username}
      />
      <div className="flex sm:items-center items-start flex-col gap-2">
        <h1 className="font-semibold text-lg">
          {user?.firstname} {user?.lastname}
        </h1>
        <p className="text-sm">{user.bio}</p>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <span className="flex items-center text-xs">
          <UserRoundCog size={16} strokeWidth={1.5} className="mr-1" />
          Member since {formatDate(user.createdAt)}
        </span>
        <span className="flex items-center text-xs">
          <MapPin size={16} strokeWidth={1.5} className="mr-1" />
          {user.city || "Remote"}
        </span>
        {user.website && (
          <a
            href={user.website}
            className="flex items-center text-xs hover:underline cursor-pointer"
          >
            <Link size={16} strokeWidth={1.5} className="mr-1" />
            {user.website}
          </a>
        )}
      </div>
      {user?.skills && (
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {user?.skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center text-xs gap-1 px-3 py-1 border border-gray-200 rounded-full"
            >
              <img
                height={16}
                width={16}
                className="w-4 h-4"
                src={skill.logo}
                alt=""
              />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
