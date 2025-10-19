"use client"
import React, { useState, useEffect } from 'react';
import { HiX, HiPencil, HiTrash } from 'react-icons/hi';
import { UserNote, RepoNote } from '../types/notes';
import {
    addUserNote,
    addRepoNote,
    updateUserNote,
    updateRepoNote,
    deleteUserNote,
    deleteRepoNote
} from '../utils/notesStorage';

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'user' | 'repo';
    username: string;
    repoName?: string;
    existingNotes: (UserNote | RepoNote)[];
    onNotesChange: () => void;
}

export default function NotesModal({
    isOpen,
    onClose,
    type,
    username,
    repoName,
    existingNotes,
    onNotesChange
}: NotesModalProps) {
    const [newNote, setNewNote] = useState('');
    const [editingNote, setEditingNote] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNewNote('');
            setEditingNote(null);
            setEditText('');
        }
    }, [isOpen]);

    const handleAddNote = () => {
        if (newNote.trim()) {
            if (type === 'user') {
                addUserNote(username, newNote.trim());
            } else if (type === 'repo' && repoName) {
                addRepoNote(username, repoName, newNote.trim());
            }
            setNewNote('');
            onNotesChange();
        }
    };

    const handleEditNote = (note: UserNote | RepoNote) => {
        setEditingNote(note.id);
        setEditText(note.note);
    };

    const handleSaveEdit = () => {
        if (editText.trim() && editingNote) {
            if (type === 'user') {
                updateUserNote(editingNote, editText.trim());
            } else if (type === 'repo') {
                updateRepoNote(editingNote, editText.trim());
            }
            setEditingNote(null);
            setEditText('');
            onNotesChange();
        }
    };

    const handleDeleteNote = (id: string) => {
        if (type === 'user') {
            deleteUserNote(id);
        } else if (type === 'repo') {
            deleteRepoNote(id);
        }
        onNotesChange();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Notes for {type === 'user' ? `@${username}` : `${username}/${repoName}`}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {/* Add new note */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Add New Note
                        </label>
                        <div className="flex gap-2">
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Write your note here..."
                                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows={3}
                            />
                            <button
                                onClick={handleAddNote}
                                disabled={!newNote.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Existing notes */}
                    <div>
                        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Existing Notes ({existingNotes.length})
                        </h3>
                        {existingNotes.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                No notes yet. Add your first note above!
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {existingNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                                    >
                                        {editingNote === note.id ? (
                                            <div className="space-y-3">
                                                <textarea
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                                                    rows={3}
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingNote(null)}
                                                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-gray-900 dark:text-gray-100 mb-2 whitespace-pre-wrap">
                                                    {note.note}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                    <span>Created: {formatDate(note.createdAt)}</span>
                                                    {note.updatedAt !== note.createdAt && (
                                                        <span>Updated: {formatDate(note.updatedAt)}</span>
                                                    )}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEditNote(note)}
                                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                                        >
                                                            <HiPencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteNote(note.id)}
                                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                                        >
                                                            <HiTrash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
