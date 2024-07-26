import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/userSlice";
import {
  Bookmark,
  LogOut,
  NotepadText,
  Settings,
  LineChart,
} from "lucide-react";
const RightSheet = ({ showSheet, setShowSheet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    dispatch(logoutUser());
    navigate("/scroll");
    setShowSheet(!showSheet);
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed md:static top-0 right-0 h-full md:w-full w-64 bg-white shadow-lg md:shadow-none z-[9999] p-4"
      >
        <div
          onClick={() => navigate(`/user/${user.username}`)}
          className="flex mt-2 group gap-2 py-3 items-center hover:cursor-pointer"
        >
          <img
            src={user.profileImageUrl}
            alt=""
            className="md:h-6 md:w-6 w-4 h-4 rounded-full object-cover"
          />
          <div className="flex items-start flex-col">
            <span className="font-medium">
              {user.firstname} {user.lastname}
            </span>
            <p className="text-xs text-gray-600 paragraph-clamp">
              Manage integrations, resume, collections, etc.
            </p>
          </div>
        </div>
        <div className="flex items-start flex-col gap-3">
          <div
            onClick={() => navigate(`/${user.username}/edit`)}
            className="flex group gap-2 py-1 hover:cursor-pointer group items-center"
          >
            <Settings size={18} />
            <div className="flex items-start flex-col">
              <span className="text-sm group-hover:translate-x-1 transition-all ease-in-out ">
                Settings
              </span>
              <p className="text-xs text-gray-600 paragraph-clamp">
                Manage integrations, resume, collections, etc.
              </p>
            </div>
          </div>
          <div className="flex group  gap-2 py-1 hover:cursor-pointer group items-center">
            <Bookmark size={18} />
            <div className="flex items-start flex-col">
              <span className="text-sm group-hover:translate-x-1 transition-all ease-in-out ">
                Your Upvotes
              </span>
              <p className="text-xs text-gray-600 paragraph-clamp">
                Upvoted projects and posts to visit later.
              </p>
            </div>
          </div>
          <div className="flex group  gap-2 py-1 hover:cursor-pointer group items-center">
            <NotepadText size={18} />
            <div className="flex items-start flex-col">
              <span className="text-sm group-hover:translate-x-1 transition-all ease-in-out ">
                Job Preference
              </span>
              <p className="text-xs text-gray-600 paragraph-clamp">
                Your avaliablity and role preferences.
              </p>
            </div>
          </div>
          <div className="flex group gap-2 py-1 hover:cursor-pointer group items-center">
            <LineChart size={18} />
            <div className="flex items-start flex-col">
              <span className="text-sm group-hover:translate-x-1 transition-all ease-in-out ">
                Analytics
              </span>
              <p className="text-xs text-gray-600 paragraph-clamp">
                Views, clicks and who viewed your profile
              </p>
            </div>
          </div>
        </div>
        <div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          onClick={handleLogout}
          className="flex mt-2 items-center group gap-2 py-3 hover:cursor-pointer"
        >
          <LogOut size={18} strokeWidth={1.5} className="text-[#eb5757]" />
          <span className="group-hover:translate-x-1 text-[#eb5757] md:text-base text-xs transition-all ease-in-out">
            Logout
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default RightSheet;
