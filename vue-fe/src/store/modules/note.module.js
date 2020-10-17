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
            resolve();
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
            // Reject with error message
            reject(err.response.data.error.message);
          }
        );
      });
    }
  }
};

export default note;
