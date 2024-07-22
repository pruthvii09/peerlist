import { createToken } from "../helpers/jwtHelper.js";
import prisma from "../prisma/prisma.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "All Fields Required" });
    }
    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exist) {
      return res
        .status(400)
        .json({ status: "error", message: "Already Registred" });
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
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const match = user.password === password;
    if (!match) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const token = createToken(user.id);
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { ...user, token },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
export const primaryDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: req.body,
    });
    console.log(req.body);
    if (!updatedUser) {
      return res
        .status(500)
        .json({ status: "error", message: "Error Occoured" });
    }
    res.status(200).json({
      status: "success",
      message: "Updated Success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
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
    res.status(500).json({ status: "error", message: error.message });
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
        skills: true,
        profileImageUrl: true,
        createdAt: true,
        _count: { select: { posts: true } },
        work: {
          select: {
            title: true,
            company_name: true,
            end_date: true,
          },
        },
        education: {
          select: {
            degree: true,
            study: true,
            institute_name: true,
          },
        },
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
        message: "User not found",
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
      message:
        "An error occurred while fetching the user profile. Please try again later.",
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return res.status(404).json({
        status: "error",
        messaeg: "Users not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching user by username:", error);
    res.status(500).json({
      status: "error",
      message:
        "An error occurred while fetching the user profile. Please try again later.",
    });
  }
};
export const searchUsersByUsername = async (req, res) => {
  const { query } = req.query; // Assume query parameter is named `query`

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            firstname: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            lastname: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        profileImageUrl: true,
        firstname: true,
        lastname: true,
        bio: true,
        username: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Error in searchUsersByUsername:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};
