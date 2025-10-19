import { GitHubUser, GitHubRepo } from '../services/githubApi';
import { UserComparisonData, ComparisonResult } from '../types/comparison';

export function calculateUserMetrics(user: GitHubUser, repos: GitHubRepo[]): UserComparisonData['metrics'] {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  // Calculate language usage
  const languages: { [key: string]: number } = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  
  const mostUsedLanguage = Object.keys(languages).reduce((a, b) => 
    languages[a] > languages[b] ? a : b, 'None'
  );
  
  // Calculate account age in days
  const accountAge = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Calculate recent activity (repos updated in last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentActivity = repos.filter(repo => 
    new Date(repo.updated_at) > thirtyDaysAgo
  ).length;
  
  // Calculate followers to following ratio
  const followersToFollowingRatio = user.following > 0 
    ? user.followers / user.following 
    : user.followers;
  
  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    averageRepoSize: repos.length > 0 ? totalStars / repos.length : 0,
    mostUsedLanguage,
    languages,
    accountAge,
    recentActivity,
    publicGists: 0, // GitHub API doesn't provide this in the basic user endpoint
    followersToFollowingRatio,
  };
}

export function compareUsers(user1Data: UserComparisonData, user2Data: UserComparisonData): ComparisonResult {
  const winner = {
    totalRepos: compareMetric(user1Data.metrics.totalRepos, user2Data.metrics.totalRepos),
    totalStars: compareMetric(user1Data.metrics.totalStars, user2Data.metrics.totalStars),
    totalForks: compareMetric(user1Data.metrics.totalForks, user2Data.metrics.totalForks),
    accountAge: compareMetric(user1Data.metrics.accountAge, user2Data.metrics.accountAge),
    recentActivity: compareMetric(user1Data.metrics.recentActivity, user2Data.metrics.recentActivity),
    followersToFollowingRatio: compareMetric(
      user1Data.metrics.followersToFollowingRatio, 
      user2Data.metrics.followersToFollowingRatio
    ),
  };
  
  return {
    user1: user1Data,
    user2: user2Data,
    winner,
  };
}

function compareMetric(value1: number, value2: number): 'user1' | 'user2' | 'tie' {
  if (value1 > value2) return 'user1';
  if (value2 > value1) return 'user2';
  return 'tie';
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatDays(days: number): string {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    return `${years}y ${Math.floor(remainingDays / 30)}mo`;
  }
  if (days >= 30) {
    const months = Math.floor(days / 30);
    return `${months}mo`;
  }
  return `${days}d`;
}
