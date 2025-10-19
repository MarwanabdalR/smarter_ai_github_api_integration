"use client"
import Image from "next/image";
import DarkAndLightButton from "./components/DarkAndLightButton";
import SearchInput from "./components/SearchInput";
import {
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
  HiOutlineExternalLink
} from "react-icons/hi";
import { FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { useGitHubUser } from "./hooks/useGitHubUser";
import { formatDate } from "./services/githubApi";
import NotesDisplay from "./components/NotesDisplay";
import CompareUsersButton from "./components/CompareUsersButton";
import ProfileAnalysis from "./components/ProfileAnalysis";
import { HiUsers, HiSparkles } from "react-icons/hi";
import LoadingUserData from "./components/LoadingUserData";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);

  const { user, repos, isLoading, isError, error } = useGitHubUser(searchQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      setSearchQuery(username.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <>
      <div className="flex w-full min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 pt-6 sm:pt-10 transition-all">
        <div className="flex mx-auto w-full max-w-[600px] flex-col gap-4 sm:gap-6 md:gap-8 rounded">
          {/* Head */}
          <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-mono gap-4 sm:gap-0">
            <p className="font-semibold text-lg sm:text-xl md:text-2xl leading-tight">GitHub API Integration Challenge</p>
            <div className="flex items-center gap-3">
              <CompareUsersButton />
              <DarkAndLightButton />
            </div>
          </section>
          {/* Main */}
          <SearchInput
            onSubmit={handleSubmit}
            onChange={handleInputChange}
            value={username}
          />

          {/* Loading State */}
          {isLoading && searchQuery && (
            <LoadingUserData />
          )}

          {/* Error State */}
          {isError && searchQuery && (
            <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="text-red-600 dark:text-red-400 text-center">
                <p className="font-semibold text-lg mb-2">User Not Found</p>
                <p className="text-sm">The username &quot;{searchQuery}&quot; does not exist on GitHub.</p>
                <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                  {error?.message || 'Please check the username and try again.'}
                </p>
              </div>
            </div>
          )}

          {/* User Data */}
          {user && !isLoading && !isError && (
            <main className="flex flex-col gap-3 sm:gap-4 font-mono w-full mx-auto rounded bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 sm:p-4 md:p-6">
              {/* user name */}
              <section className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-4">
                <Image
                  width={120}
                  height={120}
                  src={user.avatar_url}
                  alt={`${user.login} profile picture`}
                  className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover self-center sm:self-start"
                  priority
                />
                <section className="flex flex-col gap-1 sm:gap-2 text-sm sm:text-base">
                  <p className="font-medium">Name: {user.name || user.login}</p>
                  <p>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      @{user.login}
                    </a>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Joined {formatDate(user.created_at)}
                  </p>
                </section>
              </section>
              {/* bio */}
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-2">Bio:</p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {user.bio || "No bio"}
                </p>
              </div>
              {/* user info */}
              <section className="flex gap-2 sm:gap-4 justify-between items-center bg-gray-100/50 dark:bg-black/40 p-3 sm:p-4 rounded-lg">
                <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Repos</p>
                  <span className="text-sm sm:text-base font-semibold dark:text-gray-200">{user.public_repos}</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Followers</p>
                  <span className="text-sm sm:text-base font-semibold dark:text-gray-200">{user.followers}</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Following</p>
                  <span className="text-sm sm:text-base font-semibold dark:text-gray-200">{user.following}</span>
                </div>
              </section>
              {/* user social media */}
              <section className="flex flex-col gap-3 sm:gap-4 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <HiOutlineLocationMarker className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {user.location || "No location"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineGlobeAlt className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <p>
                    {user.blog ? (
                      <a
                        href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                      >
                        {user.blog}
                        <HiOutlineExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">No website</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FaTwitter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <p>
                    {user.twitter_username ? (
                      <a
                        href={`https://twitter.com/${user.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                      >
                        @{user.twitter_username}
                        <HiOutlineExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">No Twitter</span>
                    )}
                  </p>
                </div>
              </section>

              {/* User Notes Section */}
              <NotesDisplay
                type="user"
                username={user.login}
              />

              {/* AI Analysis Section */}
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HiSparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">AI Profile Analysis</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get intelligent insights about this developer</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAnalysisOpen(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <HiSparkles className="w-4 h-4" />
                    Analyze
                  </button>
                </div>
              </div>

              {/* Repositories Section */}
              <section className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Repositories ({repos?.length || 0})
                </h3>
                {repos && repos.length > 0 ? (
                  <div className="grid gap-3 max-h-96 overflow-y-auto">
                    {repos.map((repo) => (
                      <div
                        key={repo.id}
                        className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                              >
                                {repo.name}
                                <HiOutlineExternalLink className="w-3 h-3" />
                              </a>
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                              {repo.language && (
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                ⭐ {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1">
                                🍴 {repo.forks_count}
                              </span>
                            </div>
                          </div>
                          {repo.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {repo.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Updated {formatDate(repo.updated_at)}</span>
                            <span>Created {formatDate(repo.created_at)}</span>
                          </div>
                        </div>

                        {/* Repository Notes */}
                        <NotesDisplay
                          type="repo"
                          username={user.login}
                          repoName={repo.name}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No repositories found</p>
                  </div>
                )}
              </section>
            </main>
          )}
        </div>
      </div>

      {/* Profile Analysis Modal */}
      {user && repos && (
        <ProfileAnalysis
          isOpen={isAnalysisOpen}
          onClose={() => setIsAnalysisOpen(false)}
          user={user}
          repos={repos}
        />
      )}
    </>
  );
}