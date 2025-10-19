"use client"
import { useState } from "react";
import UserComparison from "./UserComparison";
import { HiUsers } from "react-icons/hi";

export default function CompareUsersButton() {
    const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);

    return (
        <>
            <button
                onClick={() => setIsComparisonOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
                <HiUsers className="w-4 h-4" />
                Compare Users
            </button>
            <UserComparison
                isOpen={isComparisonOpen}
                onClose={() => setIsComparisonOpen(false)}
            />
        </>
    );
}
