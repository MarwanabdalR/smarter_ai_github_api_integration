import React from 'react'


export default function LoadingUserData() {
    return (
        <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading user data...</span>
        </div>
    )
}