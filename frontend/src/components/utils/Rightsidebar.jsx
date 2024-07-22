import React, { useEffect, useRef, useState } from "react";
import RightComponentHeader from "./RightComponentHeader";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import useSearchProfile from "../../hooks/profile/useSearchProfile";
import useDebounce from "../../hooks/useDebounce";
import SearchCard from "../profile/SearchCard";
const Rightsidebar = ({ children }) => {
  const [showSheet, setShowSheet] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Add focus state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    navigate("/scroll");
    setShowSheet(!showSheet);
  };

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, isError } = useSearchProfile(debouncedQuery);
  console.log(data);

  const sidebarRef = useRef(null);
  const handleFocus = () => setIsInputFocused(true);

  const handleBlur = (e) => {
    // Check if the new focused element is within the RightSidebar
    if (!sidebarRef.current.contains(e.relatedTarget)) {
      setIsInputFocused(false);
    }
  };
  useEffect(() => {
    // Add event listener to handle clicks outside of RightSidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsInputFocused]);
  return (
    <div ref={sidebarRef} className="sm:h-screen hidden sm:flex sm:flex-col">
      <div className="fixed z-50">
        <RightComponentHeader
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          query={query}
          setQuery={setQuery}
          debouncedQuery={debouncedQuery}
          showSheet={showSheet}
          setShowSheet={setShowSheet}
          setIsInputFocused={setIsInputFocused} // Pass setFocus handler
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
            <>
              {isInputFocused ? (
                <div>
                  {data?.length > 0 ? (
                    <div className="mt-4">
                      {data?.map((user) => (
                        <SearchCard user={user} />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-2 text-xs font-medium text-gray-600 text-center">
                      Try searching for people, or keyword
                    </div>
                  )}
                </div>
              ) : (
                children
              )}
            </> // Conditionally render "Search"
          )}
        </div>
      </div>
    </div>
  );
};

export default Rightsidebar;
