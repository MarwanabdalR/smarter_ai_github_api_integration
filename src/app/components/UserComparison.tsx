"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { HiX, HiUser, HiCode, HiStar, HiClock } from 'react-icons/hi';
import { useUserComparison } from '../hooks/useUserComparison';
import { compareUsers, formatNumber, formatDays } from '../utils/comparisonUtils';
import { ComparisonResult } from '../types/comparison';
import { formatDate } from '../services/githubApi';

interface UserComparisonProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserComparison({ isOpen, onClose }: UserComparisonProps) {
    const [username1, setUsername1] = useState('');
    const [username2, setUsername2] = useState('');
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

    const user1Data = useUserComparison(username1);
    const user2Data = useUserComparison(username2);

    const handleCompare = () => {
        if (user1Data.data && user2Data.data) {
            const result = compareUsers(user1Data.data, user2Data.data);
            setComparisonResult(result);
        }
    };

    const canCompare = user1Data.data && user2Data.data && !user1Data.isLoading && !user2Data.isLoading;

    const getWinnerIcon = (winner: 'user1' | 'user2' | 'tie') => {
        if (winner === 'tie') return <span className="text-gray-500">🤝</span>;
        if (winner === 'user1') return <span className="text-yellow-500">👑</span>;
        return <span className="text-yellow-500">👑</span>;
    };

    const getWinnerText = (winner: 'user1' | 'user2' | 'tie', user1Name: string, user2Name: string) => {
        if (winner === 'tie') return 'Tie';
        if (winner === 'user1') return user1Name;
        return user2Name;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Compare GitHub Users
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[80vh]">
                    {/* Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                User 1
                            </label>
                            <input
                                type="text"
                                value={username1}
                                onChange={(e) => setUsername1(e.target.value)}
                                placeholder="Enter GitHub username"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {user1Data.isLoading && (
                                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Loading...</p>
                            )}
                            {user1Data.isError && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                    User not found
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                User 2
                            </label>
                            <input
                                type="text"
                                value={username2}
                                onChange={(e) => setUsername2(e.target.value)}
                                placeholder="Enter GitHub username"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {user2Data.isLoading && (
                                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Loading...</p>
                            )}
                            {user2Data.isError && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                    User not found
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleCompare}
                            disabled={!canCompare}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            Compare Users
                        </button>
                    </div>

                    {/* Comparison Results */}
                    {comparisonResult && (
                        <div className="space-y-6">
                            {/* User Profiles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* User 1 */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image
                                            src={comparisonResult.user1.user.avatar_url}
                                            alt={`${comparisonResult.user1.user.login} avatar`}
                                            width={60}
                                            height={60}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                {comparisonResult.user1.user.name || comparisonResult.user1.user.login}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                @{comparisonResult.user1.user.login}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <p>Joined: {formatDate(comparisonResult.user1.user.created_at)}</p>
                                        <p>Followers: {formatNumber(comparisonResult.user1.user.followers)}</p>
                                        <p>Following: {formatNumber(comparisonResult.user1.user.following)}</p>
                                    </div>
                                </div>

                                {/* User 2 */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image
                                            src={comparisonResult.user2.user.avatar_url}
                                            alt={`${comparisonResult.user2.user.login} avatar`}
                                            width={60}
                                            height={60}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                {comparisonResult.user2.user.name || comparisonResult.user2.user.login}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                @{comparisonResult.user2.user.login}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <p>Joined: {formatDate(comparisonResult.user2.user.created_at)}</p>
                                        <p>Followers: {formatNumber(comparisonResult.user2.user.followers)}</p>
                                        <p>Following: {formatNumber(comparisonResult.user2.user.following)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Metrics Comparison */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Metrics Comparison
                                </h3>

                                {/* Total Repositories */}
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <HiCode className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Total Repositories</span>
                                        </div>
                                        {getWinnerIcon(comparisonResult.winner.totalRepos)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {comparisonResult.user1.metrics.totalRepos}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username1}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {comparisonResult.user2.metrics.totalRepos}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username2}</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Winner: {getWinnerText(comparisonResult.winner.totalRepos, username1, username2)}
                                    </p>
                                </div>

                                {/* Total Stars */}
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <HiStar className="w-5 h-5 text-yellow-500" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Total Stars</span>
                                        </div>
                                        {getWinnerIcon(comparisonResult.winner.totalStars)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {formatNumber(comparisonResult.user1.metrics.totalStars)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username1}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {formatNumber(comparisonResult.user2.metrics.totalStars)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username2}</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Winner: {getWinnerText(comparisonResult.winner.totalStars, username1, username2)}
                                    </p>
                                </div>

                                {/* Total Forks */}
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <HiUser className="w-5 h-5 text-blue-500" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Total Forks</span>
                                        </div>
                                        {getWinnerIcon(comparisonResult.winner.totalForks)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {formatNumber(comparisonResult.user1.metrics.totalForks)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username1}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {formatNumber(comparisonResult.user2.metrics.totalForks)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username2}</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Winner: {getWinnerText(comparisonResult.winner.totalForks, username1, username2)}
                                    </p>
                                </div>

                                {/* Account Age */}
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <HiClock className="w-5 h-5 text-green-500" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Account Age</span>
                                        </div>
                                        {getWinnerIcon(comparisonResult.winner.accountAge)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {formatDays(comparisonResult.user1.metrics.accountAge)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username1}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {formatDays(comparisonResult.user2.metrics.accountAge)}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username2}</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Winner: {getWinnerText(comparisonResult.winner.accountAge, username1, username2)}
                                    </p>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Recent Activity (30 days)</span>
                                        </div>
                                        {getWinnerIcon(comparisonResult.winner.recentActivity)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {comparisonResult.user1.metrics.recentActivity}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username1}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {comparisonResult.user2.metrics.recentActivity}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{username2}</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Winner: {getWinnerText(comparisonResult.winner.recentActivity, username1, username2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}