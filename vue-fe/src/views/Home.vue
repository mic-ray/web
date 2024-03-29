<template>
  <div>
    <h1>Hello {{ username }}!</h1>
    <h3>Your {{ notes.length }} notes:</h3>
    <v-card
      ><v-data-table
        :headers="noteHeaders"
        :items="notes"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:[`item.createdAt`]="{ item }">
          <span>{{ new Date(item.createdAt).toLocaleString() }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon button @click="editNote(item)">mdi-pencil</v-icon>
          <v-icon class="ml-2" button @click="deleteNote(item)"
            >mdi-delete</v-icon
          >
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog.active" max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-2" v-bind="attrs" v-on="on" @click="resetDialog">
          <v-icon class="mr-2">mdi-plus</v-icon>New note
        </v-btn>
      </template>
      <v-card>
        <ValidationObserver ref="form">
          <v-form @submit.prevent="handleSave">
            <v-card-title>
              {{ dialog.editMode ? "Edit note" : "Create new note" }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    name="Title"
                    :vid="dialog.noteTitle"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="dialog.noteTitle"
                      label="Note title"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="description"
                    :vid="dialog.noteDescription"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="dialog.noteDescription"
                      label="Note description"
                      hint="A note description is optional"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <v-alert
                    v-if="errorAlert.active"
                    dismissible
                    outlined
                    @input="resetAlert"
                    type="error"
                  >
                    {{ errorAlert.message }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue" text @click="resetDialog">
                Close
              </v-btn>
              <v-btn color="blue" text type="submit">
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ToastService from "@/services/toast.service.js";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  name: "Home",
  data: () => ({
    username: "User",
    dialog: {
      active: false,
      noteTitle: "",
      noteDescription: "",
      noteId: null,
      editMode: false
    },
    noteHeaders: [
      { text: "Title", value: "title", width: 200 },
      { text: "Created at", value: "createdAt" },
      { text: "Assigned", value: "assigned" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    errorAlert: {
      active: false,
      message: ""
    },
    sortBy: "createdAt",
    sortDesc: true
  }),
  methods: {
    handleSave() {
      this.$refs.form.validate().then(success => {
        if (!success) return;
        this.errorAlert.active = false;
        // Create note data object
        let noteData = {
          title: this.dialog.noteTitle
        };

        // If description is not empty
        if (this.dialog.noteDescription.trim()) {
          // Add it to note data
          noteData.description = this.dialog.noteDescription;
        } else {
          // Else add default
          noteData.description = "No description provided";
        }
        // If a note is being edited
        if (this.dialog.editMode) {
          // Add edited ID to note data
          noteData.id = this.dialog.noteId;
          // Call store action to edit note
          this.$store.dispatch("editNote", noteData).then(
            res => {
              this.resetDialog();
              ToastService.showToast(res, true);
            },
            err => {
              if (typeof err === "object") this.$refs.form.setErrors(err);
              else
                this.errorAlert = {
                  active: true,
                  message: err
                };
            }
          );
        } else {
          // Call store action to save note
          this.$store.dispatch("addNote", noteData).then(
            res => {
              this.resetDialog();
              ToastService.showToast(res, true);
            },
            // Display error alert if an error occured
            err => {
              this.errorAlert = {
                active: true,
                message: err
              };
            }
          );
        }
      });
    },
    /**
     * Resets the dialog
     */
    resetDialog() {
      this.dialog = {
        active: false,
        noteTitle: "",
        noteDescription: "",
        noteId: null,
        editMode: false
      };
      this.resetAlert();
    },
    /**
     * Resets the error alert
     */
    resetAlert() {
      this.errorAlert = {
        active: false,
        message: ""
      };
    },
    editNote(note) {
      this.dialog = {
        active: true,
        noteTitle: note.title,
        noteDescription: note.description,
        noteId: note.id,
        editMode: true
      };
    },
    deleteNote(note) {
      // Call store action to delete note
      this.$store.dispatch("deleteNote", note.id).then(
        // Log result
        res => ToastService.showToast(res, true),
        err => ToastService.showToast(err, false)
      );
    }
  },
  computed: {
    notes: function() {
      return this.$store.getters.getNotes.map(x => {
        return {
          id: x.id,
          title: x.title,
          description: x.description,
          createdAt: +new Date(x.createdAt),
          assigned: x.createdBy
        };
      });
    }
  },

  // When component is created
  created() {
    // Retreive username from the store
    this.username = this.$store.getters.getUsername;
    // Call store to get notes
    this.$store.dispatch("getNotes");
  }
};
</script>
