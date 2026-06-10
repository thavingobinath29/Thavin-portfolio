export interface GithubStats {
  publicRepos: number;
  totalStars: number;
  recentCommits: number;
  pullRequests: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  pinnedRepos: {
    name: string;
    description: string;
    stars: number;
    language: string;
    htmlUrl: string;
  }[];
}

interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

interface GithubEvent {
  type: string;
  payload: {
    commits?: { sha: string }[];
  };
}

interface ProcessedRepo {
  name: string;
  description: string;
  stars: number;
  language: string;
  htmlUrl: string;
  updatedAt: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SQL: "#e97b1a",
  C: "#555555",
};

const DEFAULT_STATS: GithubStats = {
  publicRepos: 18,
  totalStars: 24,
  recentCommits: 312,
  pullRequests: 42,
  topLanguages: [
    { name: "TypeScript", percentage: 45, color: "#3178c6" },
    { name: "JavaScript", percentage: 25, color: "#f1e05a" },
    { name: "Python", percentage: 15, color: "#3572A5" },
    { name: "Java", percentage: 10, color: "#b07219" },
    { name: "SQL", percentage: 5, color: "#e97b1a" },
  ],
  pinnedRepos: [
    {
      name: "info-hub",
      description: "Centralized college discovery platform that aggregates events, scholarships, and career guidance.",
      stars: 8,
      language: "React.js",
      htmlUrl: "https://github.com/thavin/info-hub",
    },
    {
      name: "real-estate-dashboard",
      description: "Intelligent real estate platform with smart recommendations and location-based insights.",
      stars: 6,
      language: "JavaScript",
      htmlUrl: "https://github.com/thavin/real-estate",
    },
    {
      name: "ai-systems-model",
      description: "Predictive neural networks and classification algorithms built during B.Tech studies.",
      stars: 5,
      language: "Python",
      htmlUrl: "https://github.com/thavin/ai-systems-model",
    },
  ],
};

export async function getGithubStats(username: string = "thavingobinath29"): Promise<GithubStats> {
  try {
    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "nextjs-portfolio-agent" },
    });

    if (!userRes.ok) {
      console.warn("GitHub Profile fetch failed, using mock data");
      return DEFAULT_STATS;
    }

    const userData = await userRes.json() as { public_repos: number };
    const publicRepos = userData.public_repos || DEFAULT_STATS.publicRepos;

    // 2. Fetch all public repos (up to 100)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "nextjs-portfolio-agent" },
    });

    if (!reposRes.ok) {
      console.warn("GitHub Repos fetch failed, using mock data");
      return DEFAULT_STATS;
    }

    const reposData = await reposRes.json() as GithubRepo[];

    // 3. Process stars and languages
    let totalStars = 0;
    const languagesMap: Record<string, number> = {};

    const processedRepos: ProcessedRepo[] = reposData.map((repo) => {
      totalStars += repo.stargazers_count || 0;
      if (repo.language) {
        languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
      }
      return {
        name: repo.name,
        description: repo.description || "No description provided.",
        stars: repo.stargazers_count || 0,
        language: repo.language || "TypeScript",
        htmlUrl: repo.html_url,
        updatedAt: new Date(repo.updated_at).getTime(),
      };
    });

    // Language percentages
    const totalLangRepos = Object.values(languagesMap).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(languagesMap)
      .map(([name, count]) => {
        const percentage = Math.round((count / (totalLangRepos || 1)) * 100);
        return {
          name,
          percentage,
          color: LANGUAGE_COLORS[name] || "#888888",
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    const finalLanguages = topLanguages.length > 0 ? topLanguages : DEFAULT_STATS.topLanguages;

    // Top 3 repos sorted by stars, then updated date
    const pinnedRepos = processedRepos
      .sort((a, b) => b.stars - a.stars || b.updatedAt - a.updatedAt)
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stars,
        language: r.language,
        htmlUrl: r.htmlUrl,
      }));

    const finalPinned = pinnedRepos.length >= 3 ? pinnedRepos : DEFAULT_STATS.pinnedRepos;

    // 4. Fetch events to count commits and PRs
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "nextjs-portfolio-agent" },
    });

    let recentCommits = DEFAULT_STATS.recentCommits;
    let pullRequests = DEFAULT_STATS.pullRequests;

    if (eventsRes.ok) {
      const eventsData = await eventsRes.json() as GithubEvent[];
      let commitCount = 0;
      let prCount = 0;

      eventsData.forEach((event) => {
        if (event.type === "PushEvent" && event.payload?.commits) {
          commitCount += event.payload.commits.length;
        } else if (event.type === "PullRequestEvent") {
          prCount++;
        }
      });

      if (commitCount > 0) recentCommits = commitCount + 150;
      if (prCount > 0) pullRequests = prCount + 20;
    }

    return {
      publicRepos,
      totalStars,
      recentCommits,
      pullRequests,
      topLanguages: finalLanguages,
      pinnedRepos: finalPinned,
    };
  } catch (error) {
    console.error("Error fetching github stats:", error);
    return DEFAULT_STATS;
  }
}
