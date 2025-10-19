import { useQuery } from '@tanstack/react-query';
import { fetchGitHubUser, fetchGitHubUserRepos } from '../services/githubApi';
import { calculateUserMetrics } from '../utils/comparisonUtils';
import { UserComparisonData } from '../types/comparison';

export function useUserComparison(username: string | null) {
  const userQuery = useQuery({
    queryKey: ['github-user-comparison', username],
    queryFn: () => fetchGitHubUser(username!),
    enabled: !!username && username.trim() !== '',
    retry: 1,
  });

  const reposQuery = useQuery({
    queryKey: ['github-repos-comparison', username],
    queryFn: () => fetchGitHubUserRepos(username!),
    enabled: !!username && username.trim() !== '',
    retry: 1,
  });

  const isLoading = userQuery.isLoading || reposQuery.isLoading;
  const isError = userQuery.isError || reposQuery.isError;
  const error = userQuery.error || reposQuery.error;

  let comparisonData: UserComparisonData | null = null;
  
  if (userQuery.data && reposQuery.data) {
    const metrics = calculateUserMetrics(userQuery.data, reposQuery.data);
    comparisonData = {
      user: userQuery.data,
      repos: reposQuery.data,
      metrics,
    };
  }

  return {
    data: comparisonData,
    isLoading,
    isError,
    error,
    refetch: () => {
      userQuery.refetch();
      reposQuery.refetch();
    }
  };
}
