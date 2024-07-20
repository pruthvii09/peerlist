import React from "react";
import ProfileSaparator from "./ProfileSaparator";
import { Link } from "lucide-react";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import Leetcode from "../../assets/leetcode.svg";
import Linkedin from "../../assets/linkedin.svg";

const SocialLinks = ({ socialLinks, setSocialLinks }) => {
  return (
    <div className="p-6">
      <ProfileSaparator icon={Link} title="SOCIAL LINKS" />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Instagram} alt="" />
            <span className="text-[#444d56] text-sm">instagram.com/</span>
          </label>
          <input
            type="text"
            value={socialLinks.instagram}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, instagram: e.target.value })
            }
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Twitter} alt="" />
            <span className="text-[#444d56] text-sm">twitter.com/</span>
          </label>
          <input
            type="text"
            value={socialLinks.twitter}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, twitter: e.target.value })
            }
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Linkedin} alt="" />
            <span className="text-[#444d56] text-sm">linkedin.com/</span>
          </label>
          <input
            type="text"
            value={socialLinks.linkedin}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, linkedin: e.target.value })
            }
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
          <label className="flex items-center">
            <img className="w-4 h-4 mr-2" src={Leetcode} alt="" />
            <span className="text-[#444d56] text-sm">leetcode.com/</span>
          </label>
          <input
            type="text"
            value={socialLinks.leetcode}
            onChange={(e) =>
              setSocialLinks({ ...socialLinks, leetcode: e.target.value })
            }
            className="outline-none font-medium text-sm w-[100px]"
          />
        </div>
        {/* <div className="border rounded tex-sm border-gray-300 transition-none duration-150 ease-in-out p-2 flex items-center overflow-hidden hover:border-gray-500">
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
        </div> */}
      </div>
    </div>
  );
};

export default SocialLinks;
