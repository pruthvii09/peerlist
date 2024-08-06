import prisma from "../prisma/prisma.js";
import { refreshGithubToken } from "./refreshToken.js";

const GITHUB_API_URL = "https://api.github.com/graphql";

const query = `query ($username: String!) {
    user(login: $username) {
      id
      login
      pinnedItems(first: 6, types: [REPOSITORY]) {
        totalCount
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
          }
        }
      }
      repositories {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export const fetchGithubData = async (username, userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { githubAccount: true },
    });
    if (!user) {
      throw new Error("User not found");
    }
    console.log("user => ", user);

    // Check if the token is expired
    console.log("username => ", username);
    let access_token = user.githubAccount.githubToken;
    // const username
    console.log(
      "user.githubAccount.githubTokenExpiresAt => ",
      user.githubAccount.githubTokenExpiresAt
    );
    console.log(
      "Math.floor(Date.now() / 1000) => ",
      Math.floor(Date.now() / 1000)
    );
    if (
      user.githubAccount.githubTokenExpiresAt &&
      user.githubAccount.githubTokenExpiresAt <= Math.floor(Date.now() / 1000)
    ) {
      // Token is expired, refresh it
      access_token = await refreshGithubToken(userId);
    }
    const response = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.user;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
