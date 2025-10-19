import { useQuery } from '@tanstack/react-query';
import { analyzeGitHubProfile } from '../services/aiAnalysisService';
import { GitHubUser, GitHubRepo } from '../services/githubApi';

export function useProfileAnalysis(user: GitHubUser | null, repos: GitHubRepo[]) {
  return useQuery({
    queryKey: ['profile-analysis', user?.login],
    queryFn: () => analyzeGitHubProfile({ user: user!, repos }),
    enabled: !!user && !!repos && repos.length > 0,
    retry: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
