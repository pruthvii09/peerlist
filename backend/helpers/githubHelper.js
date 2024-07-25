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

export const fetchGithubData = async (username, access_token) => {
  try {
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
