import prisma from "../prisma/prisma.js";

export const refreshGithubToken = async (userId) => {
  try {
    console.log("Going for refresh token...");
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { githubAccount: true },
    });
    if (!user || !user.githubAccount.githubRefreshToken) {
      throw new Error("User not found or no refresh token available");
    }

    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: user.githubAccount.githubRefreshToken,
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
    console.log("data => ", data);
    const { access_token, refresh_token, expires_in } = data;
    const expiresAt = Math.floor(Date.now() / 1000) + expires_in;
    console.log("userId => ", userId);

    const updatedUser = await prisma.githubAccount.update({
      where: { userId: userId },
      data: {
        githubToken: access_token,
        githubRefreshToken: refresh_token,
        githubTokenExpiresAt: expiresAt,
      },
    });

    return updatedUser.githubToken;
  } catch (error) {
    console.error("Error refreshing GitHub token:", error);
    throw error;
  }
};
