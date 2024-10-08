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
      return { url: data?.secure_url, id: data?.public_id };
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
  const removeImage = async (publicId) => {
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/projects/remove-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove image");
      }

      await response.json();
      setImageUrl(null); // Clear the image URL after successful removal
    } catch (err) {
      console.error("Error removing image:", err);
      setError(err.message);
    }
  };

  return { imageUrl, uploading, error, uploadImage, getImage, removeImage };
};

export default useImageUpload;
