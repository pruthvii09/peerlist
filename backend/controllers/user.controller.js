import { createToken } from "../helpers/jwtHelper.js";
import prisma from "../prisma/prisma.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", error: "All Fields Required" });
    }
    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exist) {
      return res
        .status(400)
        .json({ status: "error", error: "Already Registred" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    const token = createToken(user.id);
    res.status(201).json({
      status: "success",
      message: "User Created",
      data: { ...user, token },
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", error: "Please Enter Correct Email Id" });
    }
    const match = user.password === password;
    if (!match) {
      return res
        .status(400)
        .json({ status: "error", error: "Please Enter Correct Password" });
    }
    const token = createToken(user.id);
    res.status(200).json({
      status: "success",
      message: "User Logged",
      data: { ...user, token },
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const primaryDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { firstname, lastname, bio, username } = req.body;
    // const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    // if (currentUser.username && currentUser.username !== username) {
    //   return res.status(400).json({
    //     status: "error",
    //     error: "Username cannot be changed once set",
    //   });
    // }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: req.body,
    });
    if (!updatedUser) {
      return res.status(500).json({ status: "error", error: "Error Occoured" });
    }
    res.status(200).json({
      status: "success",
      message: "Updated Success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the auth middleware adds user info to req
    const updateData = {};

    // Only include fields that are present in req.body
    const allowedFields = [
      "firstname",
      "lastname",
      "bio",
      "country",
      "city",
      "gender",
      "website",
      "calendar",
    ];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }
    if (req.body.socialMedia) {
      updateData.socialMedia = req.body.socialMedia;
    }
    console.log(Object.keys(updateData).length);

    if (Object.keys(updateData).length > 0) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
      console.log(updatedUser);
      // Remove sensitive information before sending response
      const { password, ...userWithoutPassword } = updatedUser;

      res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        data: userWithoutPassword,
      });
    } else {
      res.status(400).json({
        status: "error",
        error: "No valid fields to update",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch user data by username
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        firstname: true,
        lastname: true,
        bio: true,
        website: true,
        gender: true,
        calendar: true,
        country: true,
        city: true,
        profileImageUrl: true,
        createdAt: true,
        projects: {
          select: {
            id: true,
            title: true,
            tagline: true,
            description: true,
            projectLink: true,
            opensource: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user by username:", error);
    res.status(500).json({
      status: "error",
      error:
        "An error occurred while fetching the user profile. Please try again later.",
    });
  }
};
