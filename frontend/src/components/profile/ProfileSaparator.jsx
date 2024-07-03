import React from "react";

const ProfileSaparator = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center gap-6 pb-4">
      <span className="border-b border-gray-300 flex-1"></span>
      <div className="flex items-center gap-2">
        <Icon size={16} />
        <p className="text-xs font-semibold">{title}</p>
      </div>
      <span className="border-b border-gray-300 flex-1"></span>
    </div>
  );
};

export default ProfileSaparator;
