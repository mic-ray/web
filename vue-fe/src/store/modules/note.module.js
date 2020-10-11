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
    }
  },

  actions: {
    addNote({ commit }, noteData) {
      return new Promise((resolve, reject) => {
        NoteService.addNote(noteData).then(
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
    }
  }
};

export default note;
