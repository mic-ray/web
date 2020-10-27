import api from "@/utils/api";

/**
 * Return auth headers
 * @param {*} token Token to be included in the header
 */
const getHeaders = token => {
  return { headers: { Authorization: "Bearer " + token } };
};
class NoteService {
  // Add provided note for given user
  addNote(noteData, authData) {
    return api.post(
      `/users/${authData.username}/notes`,
      { note: noteData },
      getHeaders(authData.token)
    );
  }
  // Get notes for given user
  getNotes(authData) {
    return api.get(
      `/users/${authData.username}/notes`,
      getHeaders(authData.token)
    );
  }
  // Delete note
  deleteNote(noteId, authToken) {
    return api.delete(`/notes/${noteId}`, getHeaders(authToken));
  }

  // Edit note
  editNote(note, authToken) {
    return api.patch(
      `/notes/${note.id}`,
      {
        note: {
          title: note.title,
          description: note.description
        }
      },
      getHeaders(authToken)
    );
  }
}

export default new NoteService();
