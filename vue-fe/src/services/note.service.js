import api from "@/utils/api";

class NoteService {
  addNote(noteData) {
    return api.post("/users", noteData);
  }
}

export default new NoteService();
