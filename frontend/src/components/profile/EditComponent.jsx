import React from "react";
import BasicProfile from "./BasicProfile";
import SocialLinks from "./SocialLinks";
import Button from "../utils/ui/Button";
const EditComponent = () => {
  return (
    <div className="mt-14 flex flex-col gap-20 border-r border-gray-300 pb-14">
      <BasicProfile />
      <SocialLinks />
      <div className="fixed max-w-[640px] w-full sm:bottom-0 bottom-16 flex items-center justify-end px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <Button
          title="Save"
          className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
        />
      </div>
    </div>
  );
};

export default EditComponent;
