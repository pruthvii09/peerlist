import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Select from "../utils/ui/Select";
import ProfileSaparator from "./ProfileSaparator";
import { CircleUserRound, Tag } from "lucide-react";
import TagInput from "../utils/ui/TagInput";

const BasicProfile = ({ basicProfile, setBasicProfile }) => {
  return (
    <div className="p-6">
      <ProfileSaparator icon={CircleUserRound} title="BASIC PROFILE" />
      <div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          <Input
            value={basicProfile.firstname}
            onChange={(e) =>
              setBasicProfile({ ...basicProfile, firstname: e.target.value })
            }
            type="text"
            label="First name"
            placeholder="John"
          />
          <Input
            value={basicProfile.lastname}
            onChange={(e) =>
              setBasicProfile({ ...basicProfile, lastname: e.target.value })
            }
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
            value={basicProfile.bio}
            onChange={(e) =>
              setBasicProfile({ ...basicProfile, bio: e.target.value })
            }
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
              value={basicProfile.country}
              onChange={(e) =>
                setBasicProfile({ ...basicProfile, country: e.target.value })
              }
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
              value={basicProfile.city}
              onChange={(e) =>
                setBasicProfile({ ...basicProfile, city: e.target.value })
              }
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
            value={basicProfile.gender}
            onChange={(e) =>
              setBasicProfile({ ...basicProfile, gender: e.target.value })
            }
            options={[
              { id: 1, name: "he/him" },
              { id: 2, name: "she/her" },
              { id: 3, name: "they/them" },
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          <Input
            value={basicProfile.website}
            onChange={(e) =>
              setBasicProfile({ ...basicProfile, website: e.target.value })
            }
            type="text"
            label="Website"
            placeholder=""
          />
          <Input
            value={basicProfile.calendar}
            onChange={(e) =>
              setBasicProfile({ ...basicProfile, calendar: e.target.value })
            }
            type="text"
            label="Calendar Link"
            placeholder=""
          />
        </div>
      </div>
      <div className="mt-16">
        <ProfileSaparator icon={Tag} title="PROFILE TAGS" />
        <TagInput
          label="Skills"
          skills={basicProfile.skills}
          onChange={(newSkills) =>
            setBasicProfile((prevProfile) => ({
              ...prevProfile,
              skills: newSkills,
            }))
          }
        />
      </div>
    </div>
  );
};

export default BasicProfile;
