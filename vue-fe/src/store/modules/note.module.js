import NoteService from "@/services/note.service";

const note = {
  state: {
    notes: []
  },

  getters: {
    getNotes: state => state.notes
  },
  mutations: {
    addNote: (state, note) => {
      state.notes = [...state.notes, note];
    },
    setNotes: (state, notes) => {
      state.notes = notes;
    },
    deleteNote: (state, noteId) => {
      // Find index of note to be deleted
      var index = state.notes.findIndex(x => x.id === noteId);
      // If index was found delete
      if (index !== -1) state.notes.splice(index, 1);
    }
  },

  actions: {
    addNote({ commit, rootState }, noteData) {
      // Get auth data from auth module
      const authData = {
        token: rootState.auth.token,
        username: rootState.auth.username
      };

      return new Promise((resolve, reject) => {
        NoteService.addNote(noteData, authData).then(
          response => {
            commit("addNote", response.data.note);
            resolve("Note added");
          },
          err => {
            // If the request contains badly formatted data
            if (err.response.status === 400) {
              // Reject with the data errors
              reject(err.response.data.dataErrors);
            } else {
              // Else reject with other error message
              reject(err.response.data.error.message);
            }
          }
        );
      });
    },
    getNotes({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        // Get auth data from auth module
        const authData = {
          token: rootState.auth.token,
          username: rootState.auth.username
        };
        NoteService.getNotes(authData).then(
          response => {
            // Commit received notes
            commit("setNotes", response.data.notes);
            resolve();
          },
          err => {
            // If the request contains badly formatted data
            if (err.response.status === 400) {
              // Reject with the data errors
              reject(err.response.data.dataErrors);
            } else {
              // Reject with error message
              reject(err.response.data.error.message);
            }
          }
        );
      });
    },
    deleteNote({ commit, rootState }, noteId) {
      return new Promise((resolve, reject) => {
        // Get auth data from auth module
        const authToken = rootState.auth.token;

        NoteService.deleteNote(noteId, authToken).then(
          () => {
            // Commit note deletion
            commit("deleteNote", noteId);
            resolve("Note deleted");
          },
          err => {
            // Reject with error message
            reject(err.response.data.error.message);
          }
        );
      });
    },
    editNote({ commit, rootState }, note) {
      return new Promise((resolve, reject) => {
        // Get auth data from auth module
        const authToken = rootState.auth.token;

        NoteService.editNote(note, authToken).then(
          response => {
            // Commit deletion of old note
            commit("deleteNote", response.data.note.id);
            // And addition of updated note
            commit("addNote", response.data.note);
            resolve("Note updated");
          },
          err => {
            // If the request contains badly formatted data
            if (err.response.status === 400) {
              // Reject with the data errors
              reject(err.response.data.dataErrors);
            } else {
              // Reject with error message
              reject(err.response.data.error.message);
            }
          }
        );
      });
    }
  }
};

export default note;
