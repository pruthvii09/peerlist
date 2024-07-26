import { fetchGithubData } from "../helpers/githubHelper.js";
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

    if (Object.keys(updateData).length > 0) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
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
    const access_token = req.headers["accesstoken"];
    // Fetch user data by username
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        gitUsername: true,
        githubToken: true,
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
        followers: {
          select: {
            followeeId: true,
            followerId: true,
          },
        },
        following: {
          select: {
            followeeId: true,
            followerId: true,
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
    let githubData;
    if (user.gitUsername) {
      githubData = await fetchGithubData(user.gitUsername, user.githubToken);
    } else {
      githubData = [];
    }
    const responseData = {
      ...user,
      github: githubData,
    };

    res.status(200).json({
      status: "success",
      data: responseData,
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
    const users = await prisma.user.findMany({
      select: {
        firstname: true,
        lastname: true,
        id: true,
        username: true,
        bio: true,
        followers: true,
        following: true,
        profileImageUrl: true,
      },
    });
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

export const addFollower = async (req, res) => {
  const { followerId } = req.params;
  const userId = req.user.id;
  const followeeId = userId;

  try {
    // Ensure that both users exist
    const follower = await prisma.user.findUnique({
      where: { id: followerId },
    });
    const followee = await prisma.user.findUnique({
      where: { id: followeeId },
    });

    if (!follower || !followee) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the follow relationship
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followeeId,
      },
    });

    return res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFollower = async (req, res) => {
  const { followerId } = req.params;
  const userId = req.user.id;
  const followeeId = userId;

  try {
    // Ensure that the follow relationship exists
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followeeId: { followerId, followeeId },
      },
    });

    if (!follow) {
      return res.status(404).json({ message: "Follow relationship not found" });
    }

    // Delete the follow relationship
    await prisma.follow.delete({
      where: {
        followerId_followeeId: { followerId, followeeId },
      },
    });

    res
      .status(200)
      .json({ message: "Follow relationship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFollowerFollowing = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch followers
    const followers = await prisma.follow.findMany({
      where: { followeeId: user.id },
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            bio: true,
            firstname: true,
            lastname: true,
            profileImageUrl: true,
          },
        },
      },
    });

    // Fetch following (followees)
    const following = await prisma.follow.findMany({
      where: { followerId: user.id },
      select: {
        followee: {
          select: {
            id: true,
            bio: true,
            username: true,
            firstname: true,
            lastname: true,
            profileImageUrl: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: {
        followers: followers,
        following: following,
        followersCount: followers.length,
        followingCount: following.length,
      },
    });
  } catch (error) {
    console.error("Error in getAllFollowerFollowing:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAccessTokenGithub = async (req, res) => {
  try {
    const { code } = req.query;
    console.log("code => ", code);
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    });
    console.log("params => ", params);

    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data);
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    const userData = await userResponse.json();
    console.log(userData);
    const id = userData?.id?.toString();
    const userId = req.user.id;
    console.log("userId => ", userId);
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        gitUsername: userData.login,
        githubId: id,
        githubToken: data.access_token,
      },
    });
    console.log(user);
    console.log("accessToken send.. => ");
    res.status(200).json({ access_token: user.githubToken });
  } catch (error) {
    console.error("Error in getAccessTokenGithub:", error);
    res.status(500).json({ error: error });
  }
};

export const deleteGithub = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        githubId: null,
        gitUsername: null,
        githubToken: null,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("git user => ", user);
    res.status(200).json({ message: "Deleted success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
