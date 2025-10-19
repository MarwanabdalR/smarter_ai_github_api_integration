export interface UserNote {
  id: string;
  username: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepoNote {
  id: string;
  username: string;
  repoName: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export type Note = UserNote | RepoNote;

export interface NotesStorage {
  userNotes: UserNote[];
  repoNotes: RepoNote[];
}
