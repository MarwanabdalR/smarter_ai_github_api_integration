// GitHub API service functions
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}

// Fetch user data from GitHub API
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch user repositories from GitHub API
export async function fetchGitHubUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }
  
  return response.json();
}

// Format date helper function
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
