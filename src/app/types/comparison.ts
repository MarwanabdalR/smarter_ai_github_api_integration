import { GitHubUser, GitHubRepo } from '../services/githubApi';

export interface UserComparisonData {
  user: GitHubUser;
  repos: GitHubRepo[];
  metrics: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    averageRepoSize: number;
    mostUsedLanguage: string;
    languages: { [key: string]: number };
    accountAge: number; // in days
    recentActivity: number; // repos updated in last 30 days
    publicGists: number;
    followersToFollowingRatio: number;
  };
}

export interface ComparisonResult {
  user1: UserComparisonData;
  user2: UserComparisonData;
  winner: {
    totalRepos: 'user1' | 'user2' | 'tie';
    totalStars: 'user1' | 'user2' | 'tie';
    totalForks: 'user1' | 'user2' | 'tie';
    accountAge: 'user1' | 'user2' | 'tie';
    recentActivity: 'user1' | 'user2' | 'tie';
    followersToFollowingRatio: 'user1' | 'user2' | 'tie';
  };
}
