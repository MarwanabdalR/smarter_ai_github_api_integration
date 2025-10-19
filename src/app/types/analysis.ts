import { GitHubUser, GitHubRepo } from '../services/githubApi';

export interface ProfileAnalysis {
  summary: string;
  strengths: string[];
  areasOfExpertise: string[];
  activityLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  contributionStyle: string;
  notableProjects: {
    name: string;
    description: string;
    stars: number;
    language: string;
  }[];
  recommendations: string[];
  overallScore: number; // 1-10
  analysisDate: string;
}

export interface AnalysisRequest {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export interface AnalysisResponse {
  analysis: ProfileAnalysis;
  success: boolean;
  error?: string;
}
