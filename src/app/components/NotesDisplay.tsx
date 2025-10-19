"use client"
import React, { useState, useEffect } from 'react';
import { HiChatAlt2, HiPlus } from 'react-icons/hi';
import { UserNote, RepoNote } from '../types/notes';
import { getUserNotes, getRepoNotes } from '../utils/notesStorage';
import NotesModal from './NotesModal';

interface NotesDisplayProps {
    type: 'user' | 'repo';
    username: string;
    repoName?: string;
}

export default function NotesDisplay({ type, username, repoName }: NotesDisplayProps) {
    const [notes, setNotes] = useState<(UserNote | RepoNote)[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadNotes = React.useCallback(() => {
        if (type === 'user') {
            setNotes(getUserNotes(username));
        } else if (type === 'repo' && repoName) {
            setNotes(getRepoNotes(username, repoName));
        }
    }, [type, username, repoName]);

    useEffect(() => {
        loadNotes();
    }, [loadNotes]);

    const handleNotesChange = () => {
        loadNotes();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <HiChatAlt2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notes ({notes.length})
                        </span>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        <HiPlus className="w-3 h-3" />
                        Add Note
                    </button>
                </div>

                {notes.length === 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        No notes yet. Click &quot;Add Note&quot; to get started.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {notes.slice(0, 2).map((note) => (
                            <div key={note.id} className="text-xs">
                                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                                    {note.note}
                                </p>
                                <span className="text-gray-500 dark:text-gray-400">
                                    {formatDate(note.createdAt)}
                                </span>
                            </div>
                        ))}
                        {notes.length > 2 && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View all {notes.length} notes
                            </button>
                        )}
                    </div>
                )}
            </div>

            <NotesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={type}
                username={username}
                repoName={repoName}
                existingNotes={notes}
                onNotesChange={handleNotesChange}
            />
        </>
    );
}
