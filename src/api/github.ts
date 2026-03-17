const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = "sahilcodexx";
const REPO_OWNER = "sahilcodexx";
const REPO_NAME = "minimal_portfolio";

export const fetchGitHubContributions = async () => {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query {
          user(login: "${GITHUB_USERNAME}") {
          
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API errors:", data.errors);
      return 0;
    }

    return data.data.user.contributionsCollection.contributionCalendar
      .totalContributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return 0;
  }
};

export const fetchRepoStars = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      console.error("GitHub API error:", response.status);
      return 0;
    }

    const data = await response.json();
    return data.stargazers_count || 0;
  } catch (error) {
    console.error("Error fetching repo stars:", error);
    return 0;
  }
};

// for fetching data of this year
// contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-12-31T23:59:59Z") {
//               contributionCalendar {
//                 totalContributions
//               }
//             }
