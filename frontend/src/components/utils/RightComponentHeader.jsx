import React from "react";
import Button from "./ui/Button";
import { Bell, Gift, Search } from "lucide-react";

const RightComponentHeader = () => {
  const auth = true;
  return (
    <div>
      {auth ? (
        <div className="border-r border-b py-2.5 px-4 border-gray-300 fixed top-0 w-[348px] justify-around flex items-center gap-4">
          <div className="relative">
            <input
              className="outline-none hover:border-black text-sm border border-gray-200 py-1 rounded-md pl-6 w-[150px]"
              placeholder="Search Peerlist"
              type="text"
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
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/101882373?v=4"
            alt=""
          />
        </div>
      ) : (
        <div className="border-r border-b py-3 px-4 border-gray-300 fixed top-0 w-[348px] flex items-center justify-end gap-4">
          <Button
            title="Log in"
            className="bg-[#24292e] text-sm border-2 border-[#24292e] px-4 py-1 text-white rounded-full"
          />
          <Button
            title="Join Peerlist"
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653]"
          />
        </div>
      )}
    </div>
  );
};

export default RightComponentHeader;
