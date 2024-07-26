import React from "react";
import Button from "../utils/ui/Button";
import Input from "../utils/ui/Input";
import Select from "../utils/ui/Select";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
const SearchFilter = ({ setShowSheet }) => {
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <div className="px-4 py-4">
      {/* <div
        onClick={() => setShowSheet(false)}
        className="fixed md:hidden inset-0 z-[999] bg-black bg-opacity-30"
      ></div> */}
      <motion.div
        initial={isMediumOrLarger ? {} : { opacity: 0, x: 100 }}
        animate={isMediumOrLarger ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed md:static flex flex-col right-0 top-[56px] z-10 w-80 md:w-full h-full bg-white md:pt-0 pt-10 px-4 border-l border-gray-300"
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-6">
            <h1 className="text-sm font-semibold">Filter By</h1>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Country" />
              <Select label="City" />
            </div>
            <div>
              <Input label="Roles" />
            </div>
          </div>
        </div>
        <Button
          title="Apply"
          className="text-white mt-4 font-medium w-fit bg-black rounded-full text-xs px-3 py-1"
        />
      </motion.div>
    </div>
  );
};

export default SearchFilter;
