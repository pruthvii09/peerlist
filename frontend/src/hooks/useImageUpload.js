// hooks/useImageUpload.js
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your upload preset
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dffc92ogy/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
      setUploading(false);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError(err.message);
      setUploading(false);
    }
  };

  const cld = new Cloudinary({ cloud: { cloudName: "dffc92ogy" } });

  const getImage = (publicId) => {
    const img = cld
      .image(publicId)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(500).height(500));

    return img;
  };

  return { imageUrl, uploading, error, uploadImage, getImage };
};

export default useImageUpload;
