import { AnalysisRequest, AnalysisResponse, ProfileAnalysis } from '../types/analysis';
import { GitHubUser, GitHubRepo } from './githubApi';

// Mock AI analysis service - In a real app, this would call an AI API like OpenAI
export async function analyzeGitHubProfile(request: AnalysisRequest): Promise<AnalysisResponse> {
  try {
    const { user, repos } = request;
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = generateProfileAnalysis(user, repos);
    
    return {
      analysis,
      success: true
    };
  } catch (error) {
    return {
      analysis: {} as ProfileAnalysis,
      success: false,
      error: error instanceof Error ? error.message : 'Analysis failed'
    };
  }
}

function generateProfileAnalysis(user: GitHubUser, repos: GitHubRepo[]): ProfileAnalysis {
  // Calculate metrics
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const languages = getLanguageDistribution(repos);
  
  const accountAge = Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24));
  const recentActivity = repos.filter(repo => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return new Date(repo.updated_at) > thirtyDaysAgo;
  }).length;
  
  // Determine activity level
  let activityLevel: 'Low' | 'Medium' | 'High' | 'Very High' = 'Low';
  if (recentActivity >= 10) activityLevel = 'Very High';
  else if (recentActivity >= 5) activityLevel = 'High';
  else if (recentActivity >= 2) activityLevel = 'Medium';
  
  // Generate AI-like analysis
  const summary = generateSummary(user, repos, totalStars, accountAge, activityLevel);
  const strengths = generateStrengths(user, repos, totalStars, languages);
  const areasOfExpertise = generateExpertiseAreas(languages, repos);
  const contributionStyle = generateContributionStyle(user, repos, recentActivity);
  const notableProjects = generateNotableProjects(repos);
  const recommendations = generateRecommendations(user, repos, activityLevel, languages);
  const overallScore = calculateOverallScore(user, repos, totalStars, recentActivity, accountAge);
  
  return {
    summary,
    strengths,
    areasOfExpertise,
    activityLevel,
    contributionStyle,
    notableProjects,
    recommendations,
    overallScore,
    analysisDate: new Date().toISOString()
  };
}

function getLanguageDistribution(repos: GitHubRepo[]): { [key: string]: number } {
  const languages: { [key: string]: number } = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  return languages;
}

function generateSummary(user: GitHubUser, repos: GitHubRepo[], totalStars: number, accountAge: number, activityLevel: string): string {
  const yearsOnGitHub = Math.floor(accountAge / 365);
  const avgStarsPerRepo = repos.length > 0 ? Math.round(totalStars / repos.length) : 0;
  
  let summary = `${user.name || user.login} is a ${activityLevel.toLowerCase()} activity developer `;
  
  if (yearsOnGitHub > 5) {
    summary += `with ${yearsOnGitHub}+ years of experience on GitHub. `;
  } else if (yearsOnGitHub > 2) {
    summary += `with ${yearsOnGitHub} years of experience on GitHub. `;
  } else {
    summary += `who joined GitHub ${Math.floor(accountAge / 30)} months ago. `;
  }
  
  summary += `They have ${repos.length} public repositories with a total of ${totalStars} stars. `;
  
  if (avgStarsPerRepo > 50) {
    summary += `Their repositories show strong community engagement with an average of ${avgStarsPerRepo} stars per repository. `;
  } else if (avgStarsPerRepo > 10) {
    summary += `Their repositories have moderate community interest with ${avgStarsPerRepo} average stars. `;
  }
  
  if (user.followers > 1000) {
    summary += `They have built a significant following of ${user.followers} developers.`;
  } else if (user.followers > 100) {
    summary += `They have a growing community of ${user.followers} followers.`;
  } else {
    summary += `They are building their developer community with ${user.followers} followers.`;
  }
  
  return summary;
}

function generateStrengths(user: GitHubUser, repos: GitHubRepo[], totalStars: number, languages: { [key: string]: number }): string[] {
  const strengths: string[] = [];
  
  if (repos.length > 50) {
    strengths.push('High productivity with extensive repository portfolio');
  } else if (repos.length > 20) {
    strengths.push('Active contributor with substantial project portfolio');
  }
  
  if (totalStars > 1000) {
    strengths.push('Strong community recognition and project quality');
  } else if (totalStars > 100) {
    strengths.push('Good community engagement and project visibility');
  }
  
  const topLanguage = Object.entries(languages).sort(([,a], [,b]) => b - a)[0];
  if (topLanguage && topLanguage[1] > repos.length * 0.4) {
    strengths.push(`Deep expertise in ${topLanguage[0]} development`);
  }
  
  if (user.followers > user.following * 2) {
    strengths.push('Strong influence and thought leadership in the community');
  }
  
  if (repos.some(repo => repo.stargazers_count > 100)) {
    strengths.push('Creator of popular open-source projects');
  }
  
  if (repos.some(repo => repo.language && ['TypeScript', 'Rust', 'Go'].includes(repo.language))) {
    strengths.push('Adopts modern, performant programming languages');
  }
  
  return strengths.length > 0 ? strengths : ['Building their developer profile and expertise'];
}

function generateExpertiseAreas(languages: { [key: string]: number }, repos: GitHubRepo[]): string[] {
  const expertise: string[] = [];
  const sortedLanguages = Object.entries(languages).sort(([,a], [,b]) => b - a);
  
  // Top 3 languages
  sortedLanguages.slice(0, 3).forEach(([lang, count]) => {
    if (count > 0) {
      expertise.push(`${lang} Development`);
    }
  });
  
  // Specialized areas based on languages
  const allLanguages = Object.keys(languages);
  if (allLanguages.includes('JavaScript') || allLanguages.includes('TypeScript')) {
    expertise.push('Web Development');
  }
  if (allLanguages.includes('Python')) {
    expertise.push('Data Science & AI');
  }
  if (allLanguages.includes('Java') || allLanguages.includes('C#')) {
    expertise.push('Enterprise Development');
  }
  if (allLanguages.includes('Go') || allLanguages.includes('Rust')) {
    expertise.push('Systems Programming');
  }
  if (allLanguages.includes('Swift') || allLanguages.includes('Kotlin')) {
    expertise.push('Mobile Development');
  }
  
  return expertise.length > 0 ? expertise : ['General Software Development'];
}

function generateContributionStyle(user: GitHubUser, repos: GitHubRepo[], recentActivity: number): string {
  if (recentActivity > 10) {
    return 'Highly active contributor with frequent updates and new projects';
  } else if (recentActivity > 5) {
    return 'Regular contributor maintaining active development pace';
  } else if (recentActivity > 2) {
    return 'Steady contributor with consistent but moderate activity';
  } else if (recentActivity > 0) {
    return 'Occasional contributor with selective project focus';
  } else {
    return 'Maintainer of established projects with less frequent updates';
  }
}

function generateNotableProjects(repos: GitHubRepo[]): Array<{name: string, description: string, stars: number, language: string}> {
  return repos
    .filter(repo => repo.stargazers_count > 0)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(repo => ({
      name: repo.name,
      description: repo.description || 'No description available',
      stars: repo.stargazers_count,
      language: repo.language || 'Unknown'
    }));
}

function generateRecommendations(user: GitHubUser, repos: GitHubRepo[], activityLevel: string, languages: { [key: string]: number }): string[] {
  const recommendations: string[] = [];
  
  if (repos.length < 5) {
    recommendations.push('Consider creating more public repositories to showcase your work');
  }
  
  if (Object.keys(languages).length < 3) {
    recommendations.push('Explore additional programming languages to broaden your skill set');
  }
  
  if (user.followers < 50 && repos.length > 10) {
    recommendations.push('Engage more with the community to increase your following');
  }
  
  if (activityLevel === 'Low') {
    recommendations.push('Increase activity by contributing to open source projects or creating new ones');
  }
  
  if (!repos.some(repo => repo.description)) {
    recommendations.push('Add descriptions to your repositories to improve discoverability');
  }
  
  if (repos.length > 0 && !repos.some(repo => repo.stargazers_count > 10)) {
    recommendations.push('Focus on creating projects that solve real-world problems to gain more stars');
  }
  
  return recommendations.length > 0 ? recommendations : ['Continue building and sharing great projects!'];
}

function calculateOverallScore(user: GitHubUser, repos: GitHubRepo[], totalStars: number, recentActivity: number, accountAge: number): number {
  let score = 0;
  
  // Repository count (0-2 points)
  if (repos.length > 50) score += 2;
  else if (repos.length > 20) score += 1.5;
  else if (repos.length > 10) score += 1;
  else if (repos.length > 5) score += 0.5;
  
  // Star count (0-2 points)
  if (totalStars > 1000) score += 2;
  else if (totalStars > 500) score += 1.5;
  else if (totalStars > 100) score += 1;
  else if (totalStars > 20) score += 0.5;
  
  // Recent activity (0-2 points)
  if (recentActivity > 10) score += 2;
  else if (recentActivity > 5) score += 1.5;
  else if (recentActivity > 2) score += 1;
  else if (recentActivity > 0) score += 0.5;
  
  // Followers (0-2 points)
  if (user.followers > 1000) score += 2;
  else if (user.followers > 500) score += 1.5;
  else if (user.followers > 100) score += 1;
  else if (user.followers > 20) score += 0.5;
  
  // Account age (0-1 point)
  if (accountAge > 365 * 5) score += 1;
  else if (accountAge > 365 * 2) score += 0.5;
  
  // Language diversity (0-1 point)
  const languageCount = Object.keys(getLanguageDistribution(repos)).length;
  if (languageCount > 5) score += 1;
  else if (languageCount > 3) score += 0.5;
  
  return Math.min(Math.round(score), 10);
}