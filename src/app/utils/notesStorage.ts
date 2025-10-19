import { UserNote, RepoNote, NotesStorage } from '../types/notes';

const STORAGE_KEY = 'github-notes';

// Get all notes from localStorage
export function getAllNotes(): NotesStorage {
  if (typeof window === 'undefined') {
    return { userNotes: [], repoNotes: [] };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { userNotes: [], repoNotes: [] };
  } catch (error) {
    console.error('Error loading notes:', error);
    return { userNotes: [], repoNotes: [] };
  }
}

// Save all notes to localStorage
export function saveAllNotes(notes: NotesStorage): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
}

// Get user notes
export function getUserNotes(username: string): UserNote[] {
  const { userNotes } = getAllNotes();
  return userNotes.filter(note => note.username === username);
}

// Get repo notes
export function getRepoNotes(username: string, repoName: string): RepoNote[] {
  const { repoNotes } = getAllNotes();
  return repoNotes.filter(note => note.username === username && note.repoName === repoName);
}

// Add user note
export function addUserNote(username: string, note: string): UserNote {
  const notes = getAllNotes();
  const newNote: UserNote = {
    id: Date.now().toString(),
    username,
    note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  notes.userNotes.push(newNote);
  saveAllNotes(notes);
  return newNote;
}

// Add repo note
export function addRepoNote(username: string, repoName: string, note: string): RepoNote {
  const notes = getAllNotes();
  const newNote: RepoNote = {
    id: Date.now().toString(),
    username,
    repoName,
    note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  notes.repoNotes.push(newNote);
  saveAllNotes(notes);
  return newNote;
}

// Update user note
export function updateUserNote(id: string, note: string): void {
  const notes = getAllNotes();
  const noteIndex = notes.userNotes.findIndex(n => n.id === id);
  if (noteIndex !== -1) {
    notes.userNotes[noteIndex].note = note;
    notes.userNotes[noteIndex].updatedAt = new Date().toISOString();
    saveAllNotes(notes);
  }
}

// Update repo note
export function updateRepoNote(id: string, note: string): void {
  const notes = getAllNotes();
  const noteIndex = notes.repoNotes.findIndex(n => n.id === id);
  if (noteIndex !== -1) {
    notes.repoNotes[noteIndex].note = note;
    notes.repoNotes[noteIndex].updatedAt = new Date().toISOString();
    saveAllNotes(notes);
  }
}

// Delete user note
export function deleteUserNote(id: string): void {
  const notes = getAllNotes();
  notes.userNotes = notes.userNotes.filter(n => n.id !== id);
  saveAllNotes(notes);
}

// Delete repo note
export function deleteRepoNote(id: string): void {
  const notes = getAllNotes();
  notes.repoNotes = notes.repoNotes.filter(n => n.id !== id);
  saveAllNotes(notes);
}
