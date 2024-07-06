import React, { useState } from "react";
import RightComponentHeader from "./RightComponentHeader";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
const Rightsidebar = ({ children }) => {
  const [showSheet, setShowSheet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    navigate("/scroll");
    setShowSheet(!showSheet);
  };
  return (
    <div className="sm:h-screen hidden sm:flex sm:flex-col">
      <div className="fixed z-50">
        <RightComponentHeader
          showSheet={showSheet}
          setShowSheet={setShowSheet}
        />
        <div
          className="flex-1 overflow-y-auto w-[348px] px-6 border-r border-gray-300 scrollbar-hide"
          style={{ height: "calc(100vh - 64px)" }}
        >
          {showSheet ? (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              onClick={handleLogout}
              className="flex mt-2 sm:flex-row flex-col group items-center gap-2 py-3 hover:cursor-pointer"
            >
              <LogOut strokeWidth={1.5} className="text-[#eb5757]" />
              <span className="group-hover:translate-x-1 text-[#eb5757] sm:text-base text-xs transition-all ease-in-out">
                Logout
              </span>
            </motion.div>
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rightsidebar;
