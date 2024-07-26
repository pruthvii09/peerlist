import React from "react";
import ProfileSaparator from "../profile/ProfileSaparator";
import { AtSign, Lock, Mail, TriangleAlert } from "lucide-react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import { useSelector } from "react-redux";

const AccountDetails = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="mt-[52px] border-r flex flex-col md:gap-20 gap-10 border-gray-300 ">
      <div className="pt-8 px-4">
        <ProfileSaparator icon={Mail} title="EMAIL INFO" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            placeholder="Account Email"
            value={user?.email}
            label="Account Email"
          />
        </div>
        <div className="mt-6 flex items-center justify-end mr-4">
          <Button
            title="Save"
            className="text-sm bg-black text-white px-3 py-1 rounded-full"
          />
        </div>
      </div>
      <div className="pt-4 px-4">
        <ProfileSaparator icon={Lock} title="CHANGE PASSWORD" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input placeholder="Min 8 characters" label="New Password" />
          <Input label="Confirm Password" />
        </div>
        <div className="mt-6 flex items-center justify-end mr-4">
          <Button
            title="Save"
            className="text-sm bg-black text-white px-3 py-1 rounded-full"
          />
        </div>
      </div>
      <div className="px-4">
        <ProfileSaparator icon={AtSign} title="CHANGE USERNAME" />
        <p className="text-xs mt-4 mb-4">
          You can change your username to another username that is not currently
          in use. PeerHub cannot set up redirects for links to your PeerHub
          profile that include your old username.
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            placeholder="Min 8 characters"
            label="Username"
            value={user?.username}
          />
        </div>
        <div className="mt-6 flex items-center justify-end mr-4">
          <Button
            title="Save"
            className="text-sm bg-black text-white px-3 py-1 rounded-full"
          />
        </div>
      </div>
      <div className="px-4 pb-24">
        <ProfileSaparator icon={TriangleAlert} title="DANGER ZONE" />
        <p className="text-xs mt-4 mb-4">
          Delete your account and account data. This cant be undone!
        </p>
        <div className="">
          <Button
            title="Delete Account"
            className="text-xs bg-[#eb5757] border border-[#c20d0d] text-white px-3 py-1 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
