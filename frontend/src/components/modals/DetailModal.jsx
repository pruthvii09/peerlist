import React, { useEffect, useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import { ArrowRight } from "lucide-react";
import { useUpdateProfileMutation } from "../../hooks/profile/useUpdateProfileMutation";
import useImageUpload from "../../hooks/useImageUpload.js";
const DetailModal = () => {
  const [updateData, setUpdateData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    username: "",
    profileImageUrl: "https://dqy38fnwh4fqs.cloudfront.net/website/emptyDP.png",
  });

  const updateMutation = useUpdateProfileMutation();
  const { imageUrl, uploading, error, uploadImage, getImage } =
    useImageUpload();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  useEffect(() => {
    if (imageUrl) {
      const img = getImage(imageUrl);
      if (img?.publicID) {
        setUpdateData((prevData) => ({
          ...prevData,
          profileImageUrl: img.publicID,
        }));
      }
    }
  }, [imageUrl]);

  const onSubmit = () => {
    updateMutation.mutate(updateData);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (error) {
    console.log(error);
  }

  if (uploading) {
    console.log(uploading);
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white sm:w-[380px] w-[350px] py-6 px-6 rounded-lg shadow-lg flex flex-col relative">
        <h1 className="text-center text-xl font-medium mb-1">
          Welcome to PeerHub
        </h1>
        <p className="text-[#6a737d] font-normal text-sm text-center mb-6">
          First things first, tell us a bit about yourself!
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <input
              type="file"
              id="file_input"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file_input"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                id="image_preview"
                height="40"
                width="40"
                className="rounded-full h-12 w-12 object-cover"
                src={updateData.profileImageUrl}
                alt="Profile Picture"
              />
              <span className="text-sm font-semibold">Upload Image</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              onChange={(e) =>
                setUpdateData({ ...updateData, firstname: e.target.value })
              }
              value={updateData.firstname}
              type="text"
              label="First name"
              placeholder="John"
            />
            <Input
              onChange={(e) =>
                setUpdateData({ ...updateData, lastname: e.target.value })
              }
              value={updateData.lastname}
              type="text"
              label="Last Name"
              placeholder="Doe"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="pb-0.5 text-xs">Brief Bio</label>
              <span className="text-[10px] font-light text-[#6a737d]">
                20/200
              </span>
            </div>
            <textarea
              name=""
              id=""
              onChange={(e) =>
                setUpdateData({ ...updateData, bio: e.target.value })
              }
              value={updateData.bio}
              placeholder="Ex: Product Designer @ PeerHub •  Angel Investor"
              className="outline-none w-full max-h-[144px] px-2 py-1 rounded-md text-sm resize-y border border-gray-300 hover:border-gray-500"
            ></textarea>
            <span className="text-[#6a737d] font-normal text-[10px]">
              This is the very first thing peers read about you after your name.
            </span>
          </div>
          <div>
            <Input
              onChange={(e) =>
                setUpdateData({ ...updateData, username: e.target.value })
              }
              value={updateData.username}
              type="text"
              label="Username"
              placeholder="username"
            />
            <span className="text-[#6a737d] font-normal text-[10px]">
              peerhub.io/<b>username</b>
            </span>
          </div>

          <Button
            title="Create Profile"
            onClick={onSubmit}
            loading={updateMutation.isPending}
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] w-fit"
            iconConfig={{ icon: ArrowRight }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
