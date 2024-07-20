import React, { useState } from "react";
import BasicProfile from "./BasicProfile";
import SocialLinks from "./SocialLinks";
import Button from "../utils/ui/Button";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../hooks/profile/useUpdateProfileMutation";

const EditComponent = () => {
  const { user } = useSelector((store) => store.user);
  const [basicProfile, setBasicProfile] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    bio: user.bio || "",
    country: user.country || "",
    skills: user.skills || [],
    city: user.city || "",
    gender: user.gender || "",
    website: user.website || "",
    calendar: user.calendar || "",
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: user.socialMedia?.instagram || "",
    twitter: user.socialMedia?.twitter || "",
    linkedin: user.socialMedia?.linkedin || "",
    leetcode: user.socialMedia?.leetcode || "",
  });

  const updateMutation = useUpdateProfileMutation();

  const handleSave = () => {
    const updatedProfile = {
      ...basicProfile,
      socialMedia: socialLinks,
    };
    updateMutation.mutate(updatedProfile);
  };

  return (
    <div className="mt-14 flex flex-col sm:gap-10 gap-8 border-r border-gray-300 pb-24">
      <BasicProfile
        basicProfile={basicProfile}
        setBasicProfile={setBasicProfile}
      />
      <SocialLinks socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
      <div className="fixed max-w-[640px] w-full sm:bottom-0 bottom-16 flex items-center justify-end px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <Button
          title="Save"
          loading={updateMutation.isPending}
          onClick={handleSave}
          className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
        />
      </div>
    </div>
  );
};

export default EditComponent;
