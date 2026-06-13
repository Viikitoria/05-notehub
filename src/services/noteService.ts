import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";

// ТІЛЬКИ ОДИН headers (не два!)
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
};

// Додайте console.log для перевірки (можна видалити пізніше)
console.log('Token being used:', import.meta.env.VITE_NOTEHUB_TOKEN);

export const fetchNotes = async (
  page: number,
  search?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = {
    page,
    perPage: 12,
  };

  if (search?.trim()) {
    params.search = search;
  }

  const { data } = await axios.get<FetchNotesResponse>(BASE_URL, {
    params,
    headers,
  });

  return data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const { data } = await axios.post<Note>(BASE_URL, payload, {
    headers,
  });

  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${BASE_URL}/${noteId}`, {
    headers,
  });

  return data;
};

console.log('=== DEBUG NOTE SERVICE ===');
console.log('Token:', import.meta.env.VITE_NOTEHUB_TOKEN);
console.log('Token length:', import.meta.env.VITE_NOTEHUB_TOKEN?.length);
console.log('Base URL:', "https://notehub-public.goit.study/api/notes");