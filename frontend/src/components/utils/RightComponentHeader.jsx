import React, { useState } from "react";
import Button from "./ui/Button";
import { Bell, Gift, Search, X } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useModal } from "../../context/ModalContext";
const RightComponentHeader = ({
  showSheet,
  setShowSheet,
  handleFocus,
  handleBlur,
  setQuery,
}) => {
  const { user } = useSelector((store) => store.user);
  // const handleFocus = () => setIsInputFocused(true);
  // const handleBlur = () => setIsInputFocused(false);
  const { showModal } = useModal();

  return (
    <div className="w-[348px] h-[56px] border-r border-b border-gray-300">
      {user ? (
        showSheet ? (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="py-2.5 px-4 flex items-center gap-4 justify-end"
          >
            <div
              onClick={() => setShowSheet(!showSheet)}
              className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1"
            >
              <X size={18} />
            </div>
          </motion.div>
        ) : (
          <div className="py-2.5 px-4 flex items-center gap-4 justify-around">
            <div className="relative">
              <input
                className="outline-none hover:border-black text-sm border border-gray-200 py-1 rounded-md pl-6 w-[150px]"
                placeholder="Search PeerHub"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name=""
                id=""
              />
              <Search
                size={16}
                className="absolute top-1.5 left-1 text-gray-600"
              />
            </div>
            <div className="flex gap-3">
              <div className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1">
                <Gift size={18} />
              </div>
              <div className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1">
                <Bell size={18} />
              </div>
            </div>
            <img
              height={32}
              width={32}
              className="rounded-full h-8 w-8 object-cover cursor-pointer"
              src={user?.profileImageUrl}
              alt=""
              onClick={() => setShowSheet(!showSheet)}
            />
          </div>
        )
      ) : (
        <div className="py-3 px-4 flex items-center justify-end gap-4">
          <Button
            title="Log in"
            onClick={() => showModal("login")}
            className="bg-[#24292e] text-sm border-2 border-[#24292e] px-4 py-1 text-white rounded-full"
          />
          <Button
            title="Join PeerHub"
            onClick={() => showModal("signup")}
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653]"
          />
        </div>
      )}
    </div>
  );
};

export default RightComponentHeader;
