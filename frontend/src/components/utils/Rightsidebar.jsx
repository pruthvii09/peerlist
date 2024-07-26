import React, { useEffect, useRef, useState } from "react";
import RightComponentHeader from "./RightComponentHeader";
import useSearchProfile from "../../hooks/profile/useSearchProfile";
import useDebounce from "../../hooks/useDebounce";
import SearchCard from "../profile/SearchCard";
import RightSheet from "./RightSheet";
const Rightsidebar = ({ children }) => {
  const [showSheet, setShowSheet] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Add focus state

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data } = useSearchProfile(debouncedQuery);

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
    <div ref={sidebarRef} className="md:h-screen hidden md:flex md:flex-col">
      <div className="fixed z-20">
        <RightComponentHeader
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          query={query}
          setQuery={setQuery}
          debouncedQuery={debouncedQuery}
          showSheet={showSheet}
          setShowSheet={setShowSheet}
          setIsInputFocused={setIsInputFocused}
          isInputFocused={isInputFocused}
        />
        <div
          className="flex-1 overflow-y-auto w-[348px] border-r border-gray-300 scrollbar-hide"
          style={{ height: "calc(100vh - 64px)" }}
        >
          {showSheet ? (
            <RightSheet showSheet={showSheet} setShowSheet={setShowSheet} />
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
