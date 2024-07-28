import React, { useState } from "react";
import ProfileSaparator from "../profile/ProfileSaparator";
import { AtSign, Lock, Mail, TriangleAlert } from "lucide-react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdatePassword } from "../../hooks/profile/useChnagePassword";
import { useSendMail } from "../../hooks/profile/useSendMail";

const AccountDetails = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const updatePassword = useUpdatePassword();
  const handlePassword = async () => {
    if (passwords.password !== passwords.confirmPassword) {
      return toast.error("Password and confirm password does not match");
    }
    updatePassword.mutate({ password: passwords.password });
    setPasswords({
      password: "",
      confirmPassword: "",
    });
  };
  const { user } = useSelector((store) => store.user);
  const sendVerifyMail = useSendMail();
  const handleMail = async () => {
    if (!user?.emailVerified) {
      sendVerifyMail.mutate();
    }
  };
  return (
    <div className="mt-[52px] border-r flex flex-col md:gap-20 gap-10 border-gray-300 ">
      <div className="pt-8 px-4">
        <ProfileSaparator icon={Mail} title="EMAIL INFO" />
        <p className="text-xs mt-4 mb-4">
          On PeerHub, verified emails get a badge. Users with verified emails
          can also start inbox conversations, making communication easier on the
          PeerHub.
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            placeholder="Account Email"
            value={user?.email}
            label="Account Email"
            readOnly={true}
          />
        </div>
        {user?.emailVerified ? (
          <p className="text-[10px] text-green-600">Email Verified</p>
        ) : (
          <p className="text-[10px] text-red-600">Email Not Verified</p>
        )}
        <div className="mt-6 flex items-center justify-end mr-4">
          <Button
            loading={sendVerifyMail.isPending}
            onClick={handleMail}
            title={user?.emailVerified ? "Verified" : "Verify"}
            className={`text-sm ${
              user?.emailVerified
                ? "bg-black/70 cursor-not-allowed"
                : "bg-black"
            } text-white px-3 py-1 rounded-full`}
          />
        </div>
      </div>
      <div className="pt-4 px-4">
        <ProfileSaparator icon={Lock} title="CHANGE PASSWORD" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input
            value={passwords.password}
            onChange={(e) =>
              setPasswords({ ...passwords, password: e.target.value })
            }
            placeholder="Min 8 characters"
            label="New Password"
          />
          <Input
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            label="Confirm Password"
          />
        </div>
        <div className="mt-6 flex items-center justify-end mr-4">
          <Button
            title="Save"
            loading={updatePassword.isPending}
            onClick={handlePassword}
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
