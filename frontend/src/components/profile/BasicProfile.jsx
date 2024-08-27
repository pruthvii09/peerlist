import React from "react";
import Input from "../utils/ui/Input";
import Select from "react-select";
import ProfileSaparator from "./ProfileSaparator";
import { CircleUserRound, Tag } from "lucide-react";
import TagInput from "../utils/ui/TagInput";
import { city, country } from "../../utils/data";

const BasicProfile = ({ basicProfile, setBasicProfile }) => {
  console.log("basicProfile => ", basicProfile);
  return (
    <div className="p-6">
      <ProfileSaparator icon={CircleUserRound} title="BASIC PROFILE" />
      <div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
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

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-10">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="flex justify-between items-center pb-0.5 text-xs">
                Country
              </span>
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                    borderColor: state.isFocused
                      ? "none"
                      : provided.borderColor,
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "none"
                        : provided.borderColor,
                    },
                  }),
                }}
                onChange={(selectedOption) =>
                  setBasicProfile({
                    ...basicProfile,
                    country: selectedOption.value,
                  })
                }
                className="text-sm"
                options={country}
                value={country.find(
                  (option) => option.value === basicProfile.country
                )}
              />
            </div>
            <div>
              <span className="flex justify-between items-center pb-0.5 text-xs">
                City
              </span>
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                    borderColor: state.isFocused
                      ? "none"
                      : provided.borderColor,
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "none"
                        : provided.borderColor,
                    },
                  }),
                }}
                label="City"
                onChange={(e) =>
                  setBasicProfile({ ...basicProfile, city: e.value })
                }
                value={city.find(
                  (option) => option.value === basicProfile.city
                )} // Set default selected value
                className="text-sm"
                options={city}
              />
            </div>
          </div>
          <div>
            <span className="flex justify-between items-center pb-0.5 text-xs">
              Gender
            </span>
            <Select
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  borderColor: state.isFocused ? "none" : provided.borderColor,
                  "&:hover": {
                    borderColor: state.isFocused
                      ? "none"
                      : provided.borderColor,
                  },
                }),
              }}
              onChange={(e) =>
                setBasicProfile({ ...basicProfile, gender: e.value })
              }
              className="text-sm"
              value={basicProfile.gender}
              options={[
                { value: "he/him", label: "he/him" },
                { value: "she/her", label: "she/her" },
                { value: "they/them", label: "they/them" },
              ]}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
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
