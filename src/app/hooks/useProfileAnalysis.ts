import { useQuery } from '@tanstack/react-query';
import { analyzeGitHubProfile } from '../services/aiAnalysisService';
import { AnalysisRequest } from '../types/analysis';

export function useProfileAnalysis(user: any, repos: any[]) {
  return useQuery({
    queryKey: ['profile-analysis', user?.login],
    queryFn: () => analyzeGitHubProfile({ user, repos }),
    enabled: !!user && !!repos && repos.length > 0,
    retry: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
