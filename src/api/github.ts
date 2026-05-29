const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_USERNAME = 'sahilcodexx';
const REPO_OWNER = 'sahilcodexx';
const REPO_NAME = 'sahilcodex';

interface GitHubResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
}

interface RepoResponse {
  stargazers_count?: number;
}

export const fetchGitHubContributions = async (): Promise<number> => {
  if (!GITHUB_TOKEN) {
    return 0;
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
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

    const data: GitHubResponse = await response.json();

    if (data.errors) {
      return 0;
    }

    return data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
  } catch {
    return 0;
  }
};

export const fetchRepoStars = async (): Promise<number> => {
  if (!GITHUB_TOKEN) {
    return 0;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return 0;
    }

    const data: RepoResponse = await response.json();
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
};
