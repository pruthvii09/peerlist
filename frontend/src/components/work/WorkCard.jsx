import { ChevronDown, Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const WorkCard = ({ work }) => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.user);
  const isOwnProfile = user?.username === id;
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="group cursor-pointer">
      <div className="flex  justify-between gap-2 ">
        <div className="flex items-center gap-2">
          <img
            className="w-6 h-6"
            height={24}
            width={24}
            src="https://d26c7l40gvbbg2.cloudfront.net/media/companyempty.png"
            alt=""
          />
          <span className="text-sm py-1">{work?.company_name}</span>
        </div>
        {isOwnProfile && (
          <div className="group-hover:flex hidden items-center px-2 py-1 rounded-full gap-1 border border-gray-300">
            <Plus size={16} />
            <span className="text-xs">New Role</span>
          </div>
        )}
      </div>
      <div>
        <div className="pl-8">
          <h1 className="font-semibold text-sm ">{work?.title}</h1>
          <div className="flex items-center justify-between">
            <span className="text-xs py-1">
              {work?.start_date} - {work?.end_date} • Remote
            </span>
            <div className="group-hover:flex hidden items-center gap-2">
              {isOwnProfile && (
                <div className=" ">
                  <Pencil size={16} />
                </div>
              )}
              <div onClick={toggleAccordion} className="cursor-pointer ">
                <ChevronDown
                  size={18}
                  className="text-gray-600 hover:text-black"
                />
              </div>
            </div>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {work?.skills && (
              <div className="flex items-start justify-start gap-1 flex-wrap">
                {work?.skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-start text-xs gap-1 px-3 py-1 border border-gray-200 rounded-full"
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
