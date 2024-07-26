import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
const EditRightbar = ({ setShowSheet }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <div>
      {/* <div
        onClick={() => setShowSheet(false)}
        className="fixed md:hidden inset-0 z-[999] bg-black bg-opacity-30"
      ></div> */}
      <motion.div
        initial={isMediumOrLarger ? {} : { opacity: 0, x: 100 }}
        animate={isMediumOrLarger ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed md:static right-0 top-[56px] z-10 w-80 md:w-full h-full bg-white md:pt-0 pt-4 border-l md:border-none border-gray-300"
      >
        <div className="flex items-start gap-2 flex-col">
          <div
            onClick={() => navigate(`/${user.username}/settings/edit`)}
            className={`cursor-pointer w-full px-4 py-2 ${
              lastSegment === "edit"
                ? "bg-gray-100 border-l-4 border-green-600"
                : ""
            }`}
          >
            <div className="flex items-center  justify-between">
              <div
                className={`text-sm ${
                  lastSegment === "edit"
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                Profile
              </div>
              <ChevronRight size={18} className="text-gray-600" />
            </div>
            <p className="text-xs text-gray-600 font-normal">
              Edit your profile information like name, profile picture, skills
            </p>
          </div>
          <div
            onClick={() => navigate(`/${user.username}/settings/account`)}
            className={`cursor-pointer w-full px-4 py-2 ${
              lastSegment === "account"
                ? "bg-gray-100 border-l-4 border-green-600"
                : ""
            }`}
          >
            <div className="flex items-center  justify-between">
              <div
                className={`text-sm ${
                  lastSegment === "account"
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                Account
              </div>
              <ChevronRight size={18} className="text-gray-600" />
            </div>
            <p className="text-xs text-gray-600 font-normal">
              Change your password anytime.
            </p>
          </div>
          <div
            onClick={() =>
              navigate(`/${user.username}/settings/job-preference`)
            }
            className={`cursor-pointer w-full px-4 py-2 ${
              lastSegment === "job-preference"
                ? "bg-gray-100 border-l-4 border-green-600"
                : ""
            }`}
          >
            <div className="flex items-center  justify-between">
              <div
                className={`text-sm ${
                  lastSegment === "job-preference"
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                Job Preference
              </div>
              <ChevronRight size={18} className="text-gray-600" />
            </div>
            <p className="text-xs text-gray-600 font-normal">
              You can see & set your job preferences
            </p>
          </div>
          <div
            className={`cursor-pointer w-full px-4 py-2 ${
              lastSegment === "notification"
                ? "bg-gray-100 border-l-4 border-green-600"
                : ""
            }`}
          >
            <div className="flex items-center  justify-between">
              <div
                className={`text-sm ${
                  lastSegment === "notification"
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                Notifications
              </div>
              <ChevronRight size={18} className="text-gray-600" />
            </div>
            <p className="text-xs text-gray-600 font-normal">
              Select the kinds of notifications you get about your
              recommendations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditRightbar;
