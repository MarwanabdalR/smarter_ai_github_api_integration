import { AnalysisRequest, AnalysisResponse, ProfileAnalysis } from '../types/analysis';
import { GitHubUser, GitHubRepo } from './githubApi';
import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT: You need to set up your Gemini API key as an environment variable.
// For example, create a .env.local file in the root of your project with:
// NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

async function getAIAnalysis(user: GitHubUser, repos: GitHubRepo[]): Promise<ProfileAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are a GitHub profile analysis expert. I will provide you with a GitHub user's profile information and their repositories in JSON format.
    Your task is to perform a comprehensive analysis and return a JSON object with the following structure:

    {
      "summary": "A concise summary of the developer's profile, activity, and expertise.",
      "strengths": ["A list of key strengths and notable achievements."],
      "areasOfExpertise": ["A list of the developer's primary areas of expertise (e.g., 'Web Development', 'Data Science & AI')."],
      "activityLevel": "'Low' | 'Medium' | 'High' | 'Very High'",
      "contributionStyle": "A description of the developer's contribution style (e.g., 'Highly active contributor', 'Maintainer of established projects').",
      "notableProjects": [
        {
          "name": "project-name",
          "description": "A brief description of the project.",
          "stars": 123,
          "language": "TypeScript"
        }
      ],
      "recommendations": ["A list of actionable recommendations for the developer to improve their profile."],
      "overallScore": "A score from 0 to 10 representing the overall quality of the developer's profile.",
      "analysisDate": "The date of the analysis in ISO format."
    }

    Here is the user's profile information:
    ${JSON.stringify(user)}

    Here are the user's repositories:
    ${JSON.stringify(repos)}

    Please provide the analysis in a single JSON object. Do not include any other text or markdown formatting.
    The output should be a raw JSON object that can be parsed directly.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // The response from the AI might be wrapped in ```json ... ```, so we need to clean it.
  const cleanedText = text.replace(/^```json\s*|```$/g, '');
  
  const analysis: ProfileAnalysis = JSON.parse(cleanedText);
  
  // The AI might not return the analysisDate, so we set it here.
  analysis.analysisDate = new Date().toISOString();

  return analysis;
}


export async function analyzeGitHubProfile(request: AnalysisRequest): Promise<AnalysisResponse> {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return {
      analysis: {} as ProfileAnalysis,
      success: false,
      error: 'Gemini API key is not configured. Please set the NEXT_PUBLIC_GEMINI_API_KEY environment variable.'
    };
  }

  try {
    const { user, repos } = request;
    
    const analysis = await getAIAnalysis(user, repos);
    
    return {
      analysis,
      success: true
    };
  } catch (error) {
    console.error("Error analyzing GitHub profile with AI:", error);
    return {
      analysis: {} as ProfileAnalysis,
      success: false,
      error: error instanceof Error ? error.message : 'AI analysis failed'
    };
  }
}
