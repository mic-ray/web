import api from "@/utils/api";

class NoteService {
  addNote(noteData) {
    return api.post("/notes", { note: noteData });
  }
}

export default new NoteService();
