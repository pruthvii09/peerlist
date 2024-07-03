import React from "react";
import ProfileSaparator from "./ProfileSaparator";
import { Link } from "lucide-react";
import Instagram from "../../assets/instagram.svg";
const SocialLinks = () => {
  return (
    <div className="p-6">
      <ProfileSaparator icon={Link} title="PROFILE TAGS" />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Instagram} alt="" />
            <span className="text-[#444d56] text-sm">instagram.com/</span>
          </label>
          <input
            type="text"
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Instagram} alt="" />
            <span className="text-[#444d56] text-sm">instagram.com/</span>
          </label>
          <input
            type="text"
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Instagram} alt="" />
            <span className="text-[#444d56] text-sm">instagram.com/</span>
          </label>
          <input
            type="text"
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Instagram} alt="" />
            <span className="text-[#444d56] text-sm">instagram.com/</span>
          </label>
          <input
            type="text"
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Instagram} alt="" />
            <span className="text-[#444d56] text-sm">instagram.com/</span>
          </label>
          <input
            type="text"
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Instagram} alt="" />
            <span className="text-[#444d56] text-sm">instagram.com/</span>
          </label>
          <input
            type="text"
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
