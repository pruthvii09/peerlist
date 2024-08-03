import React from "react";
import Button from "../utils/ui/Button";
import Select from "../utils/ui/Select";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import TagInput from "../utils/ui/TagInput";
const SearchFilter = ({ searchFilter, setSearchFilter }) => {
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <div className="px-4 py-4">
      <motion.div
        initial={isMediumOrLarger ? {} : { opacity: 0, x: 100 }}
        animate={isMediumOrLarger ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed md:static flex flex-col right-0 top-[56px] z-10 w-80 md:w-full h-full bg-white md:pt-0 pt-10 px-4 border-l md:border-none border-gray-300"
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-6">
            <h1 className="text-sm font-semibold">Filter By</h1>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Country"
                onChange={(e) =>
                  setSearchFilter({ ...searchFilter, country: e.target.value })
                }
                options={[
                  { id: 0, name: "Select" },
                  { id: 1, name: "India" },
                  { id: 2, name: "Australia" },
                  { id: 3, name: "USA" },
                  { id: 4, name: "England" },
                  { id: 5, name: "Nepal" },
                ]}
              />
              <Select
                label="City"
                onChange={(e) =>
                  setSearchFilter({ ...searchFilter, city: e.target.value })
                }
                options={[
                  { id: 0, name: "Select" },
                  { id: 1, name: "Pune" },
                  { id: 2, name: "Mumbai" },
                  { id: 3, name: "Banglore" },
                  { id: 4, name: "Delhi" },
                  { id: 5, name: "Hydrabad" },
                ]}
              />
            </div>
            <div>
              <TagInput
                onChange={(newSkills) =>
                  setSearchFilter((prevskill) => ({
                    ...prevskill,
                    skills: newSkills,
                  }))
                }
                skills={searchFilter.skills}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            title="Clear"
            onClick={() =>
              setSearchFilter({
                country: "",
                city: "",
                skills: [],
              })
            }
            className="text-gray-700 border border-gray-300  mt-4 font-medium w-fit rounded-full text-xs px-3 py-1"
          />
          <Button
            title="Apply"
            className="text-white mt-4 font-medium w-fit bg-black rounded-full text-xs px-3 py-1"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SearchFilter;
