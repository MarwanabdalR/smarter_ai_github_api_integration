"use client"
import React, { useState } from 'react';
import { HiX, HiSparkles, HiStar, HiTrendingUp, HiLightBulb, HiCode } from 'react-icons/hi';
import { useProfileAnalysis } from '../hooks/useProfileAnalysis';
import { GitHubUser, GitHubRepo } from '../services/githubApi';

interface ProfileAnalysisProps {
    isOpen: boolean;
    onClose: () => void;
    user: GitHubUser;
    repos: GitHubRepo[];
}

export default function ProfileAnalysis({ isOpen, onClose, user, repos }: ProfileAnalysisProps) {
    const [shouldAnalyze, setShouldAnalyze] = useState(false);
    const { data: analysisData, isLoading, isError, error } = useProfileAnalysis(
        shouldAnalyze ? user : null,
        shouldAnalyze ? repos : []
    );

    const handleAnalyze = () => {
        setShouldAnalyze(true);
    };

    const getActivityColor = (level: string) => {
        switch (level) {
            case 'Very High': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
            case 'High': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Low': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-green-600 dark:text-green-400';
        if (score >= 6) return 'text-blue-600 dark:text-blue-400';
        if (score >= 4) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <HiSparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            AI Profile Analysis
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[80vh]">
                    {!shouldAnalyze ? (
                        /* Analysis Prompt */
                        <div className="text-center py-12">
                            <div className="mb-6">
                                <HiSparkles className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Analyze {user.name || user.login}&apos;s Profile
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                    Get AI-powered insights about their coding expertise, activity patterns, and development strengths.
                                </p>
                            </div>
                            <button
                                onClick={handleAnalyze}
                                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
                            >
                                <HiSparkles className="w-5 h-5" />
                                Start AI Analysis
                            </button>
                        </div>
                    ) : isLoading ? (
                        /* Loading State */
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Analyzing Profile...
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Our AI is examining {user.login}&apos;s repositories, activity patterns, and contributions.
                            </p>
                        </div>
                    ) : isError ? (
                        /* Error State */
                        <div className="text-center py-12">
                            <div className="text-red-600 dark:text-red-400 mb-4">
                                <HiX className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Analysis Failed
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {error?.message || 'Unable to analyze the profile. Please try again.'}
                            </p>
                            <button
                                onClick={() => setShouldAnalyze(false)}
                                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : analysisData?.success && analysisData.analysis ? (
                        /* Analysis Results */
                        <div className="space-y-6">
                            {/* Overall Score */}
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Overall Profile Score
                                    </h3>
                                    <span className={`text-3xl font-bold ${getScoreColor(analysisData.analysis.overallScore)}`}>
                                        {analysisData.analysis.overallScore}/10
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${(analysisData.analysis.overallScore / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                    <HiLightBulb className="w-5 h-5 text-yellow-500" />
                                    Profile Summary
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {analysisData.analysis.summary}
                                </p>
                            </div>

                            {/* Activity Level & Contribution Style */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                        <HiTrendingUp className="w-5 h-5 text-green-500" />
                                        Activity Level
                                    </h3>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getActivityColor(analysisData.analysis.activityLevel)}`}>
                                        {analysisData.analysis.activityLevel}
                                    </span>
                                </div>
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                        <HiCode className="w-5 h-5 text-blue-500" />
                                        Contribution Style
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        {analysisData.analysis.contributionStyle}
                                    </p>
                                </div>
                            </div>

                            {/* Strengths */}
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <HiStar className="w-5 h-5 text-yellow-500" />
                                    Key Strengths
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {analysisData.analysis.strengths.map((strength, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{strength}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Areas of Expertise */}
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <HiCode className="w-5 h-5 text-purple-500" />
                                    Areas of Expertise
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysisData.analysis.areasOfExpertise.map((area, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Notable Projects */}
                            {analysisData.analysis.notableProjects.length > 0 && (
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                        <HiStar className="w-5 h-5 text-yellow-500" />
                                        Notable Projects
                                    </h3>
                                    <div className="space-y-3">
                                        {analysisData.analysis.notableProjects.map((project, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600/50 rounded-lg">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{project.name}</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{project.description}</p>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{project.language}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                                                    <HiStar className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{project.stars}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommendations */}
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <HiLightBulb className="w-5 h-5 text-blue-500" />
                                    Recommendations
                                </h3>
                                <div className="space-y-3">
                                    {analysisData.analysis.recommendations.map((recommendation, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <span className="text-blue-500 mt-1">💡</span>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{recommendation}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Analysis Date */}
                            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                                Analysis completed on {new Date(analysisData.analysis.analysisDate).toLocaleDateString()}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}