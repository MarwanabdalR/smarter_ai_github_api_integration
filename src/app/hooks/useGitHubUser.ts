import { useQuery } from '@tanstack/react-query';
import { fetchGitHubUser, fetchGitHubUserRepos, GitHubUser, GitHubRepo } from '../services/githubApi';

export function useGitHubUser(username: string | null) {
  const userQuery = useQuery({
    queryKey: ['github-user', username],
    queryFn: () => fetchGitHubUser(username!),
    enabled: !!username && username.trim() !== '',
    retry: 1,
  });

  const reposQuery = useQuery({
    queryKey: ['github-repos', username],
    queryFn: () => fetchGitHubUserRepos(username!),
    enabled: !!username && username.trim() !== '',
    retry: 1,
  });

  return {
    user: userQuery.data,
    repos: reposQuery.data,
    isLoading: userQuery.isLoading || reposQuery.isLoading,
    isError: userQuery.isError || reposQuery.isError,
    error: userQuery.error || reposQuery.error,
    refetch: () => {
      userQuery.refetch();
      reposQuery.refetch();
    }
  };
}
