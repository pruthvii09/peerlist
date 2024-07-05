import React from "react";
import Input from "../utils/ui/Input";
import Select from "../utils/ui/Select";
import ProfileSaparator from "./ProfileSaparator";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";

const BasicProfile = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="p-6">
      <ProfileSaparator icon={CircleUserRound} title="BASIC PROFILE" />
      <div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          <Input
            value={user.firstname}
            type="text"
            label="First name"
            placeholder="John"
          />
          <Input
            value={user.lastname}
            type="text"
            label="Last Name"
            placeholder="Doe"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="pb-0.5 text-xs">Brief Bio</label>
            <span className="text-[10px] font-light text-[#6a737d]">
              20/200
            </span>
          </div>
          <textarea
            name=""
            id=""
            value={user.bio}
            placeholder="Ex: Product Designer @ PeerHub •  Angel Investor"
            className="outline-none w-full max-h-[144px] px-2 py-1 rounded-md text-sm resize-y border border-gray-300 hover:border-gray-500"
          ></textarea>
          <span className="text-[#6a737d] font-normal text-[10px]">
            This is the very first thing peers read about you after your name.
          </span>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-10">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Country"
              value={user.country}
              options={[
                { id: 1, name: "India" },
                { id: 2, name: "Australia" },
                { id: 3, name: "USA" },
                { id: 4, name: "England" },
                { id: 5, name: "Nepal" },
              ]}
            />
            <Select
              label="City"
              options={[
                { id: 1, name: "Pune" },
                { id: 2, name: "Mumbai" },
                { id: 3, name: "Banglore" },
                { id: 4, name: "Delhi" },
                { id: 5, name: "Hydrabad" },
              ]}
            />
          </div>
          <Select
            label="Country"
            options={[
              { id: 1, name: "he/him" },
              { id: 2, name: "she/her" },
              { id: 3, name: "they/them" },
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          <Input type="text" label="Website" placeholder="" />
          <Input type="text" label="Calendar Link" placeholder="" />
        </div>
      </div>
    </div>
  );
};

export default BasicProfile;
