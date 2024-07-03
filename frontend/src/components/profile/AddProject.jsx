import { Box, Plus } from "lucide-react";
import React from "react";
import Button from "../utils/ui/Button";

const AddProject = () => {
  return (
    <div className="pb-16">
      <div className="flex py-10 px-4 items-center justify-between">
        <h1 className="flex items-center font-semibold gap-2">
          <Box strokeWidth={1.25} size={35} />
          My Projects
        </h1>
        <Button
          title="Add project"
          className="text-white font-medium bg-black rounded-full text-xs px-2 py-1"
          iconConfig={{ icon: Plus, size: 16 }}
        />
      </div>
      <div></div>
    </div>
  );
};

export default AddProject;
