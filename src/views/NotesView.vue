<template>
  <div class="page__notes">
    <div class="page__controls">
      <router-link
        class="btn btn-primary page__btn-add"
        :to="{ name: 'noteAdd' }"
      >
        Новая заметка
      </router-link>
      <h2 class="page__count-notes">
        Текущих задач: {{ notes.length }} <br />
        Из них:
        {{ tasks.filter((item) => item.completed === false).length }} пунктов
      </h2>
    </div>

    <div class="notes" v-if="notes.length">
      <Note
        @deleteNote="dialogShowDeleteNote"
        v-for="note in notes"
        :key="note.id"
        :note="note"
      />
    </div>
    <div class="notes empty" v-else>
      <p>Как-то пусто :(</p>
      <p>Заведём новую заметочку?</p>
    </div>
    <Dialog
      @closeDialog="dialogHideDeleteNote"
      @confirm="deleteNote"
      @reject="dialogHideDeleteNote"
      v-show="isDialogDeleteNoteActive"
      text="Удалить заметку?"
      apply="Да"
      cancel="Отмена"
    />
  </div>
</template>

<script>
import Note from "@/components/Note";
import Dialog from "@/components/Dialog";
import Controls from "@/components/Controls";

export default {
  data() {
    return {
      isDialogDeleteNoteActive: false,
    };
  },
  computed: {
    notes() {
      return this.$store.state.notes.map((note) => {
        return {
          ...note,
          tasks: [
            ...this.$store.state.tasks.filter((task) => note.id == task.noteId),
          ],
        };
      });
    },
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    dialogShowDeleteNote(noteId) {
      this.isDialogDeleteNoteActive = true;
      this.deleteNoteId = noteId;
    },
    dialogHideDeleteNote() {
      this.isDialogDeleteNoteActive = false;
      this.deleteNoteId = null;
    },
    deleteNote() {
      this.$store.dispatch("deleteNote", this.deleteNoteId);
      this.DialogHideDeleteNote();
    },
  },
  components: {
    Note,
    Controls,
    Dialog,
  },
};
</script>

<style lang="scss" scoped>
.page {
  &__notes {
    margin: 0 auto;
    max-width: 650px;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__count-notes {
    text-align: right;
    font-size: 1.5rem;
  }

  &__btn-add {
    display: flex;
    padding: 10px;
  }
}

.notes {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px 0;
  border-radius: 8px;
  padding: 15px;

  background-color: rgba(157, 157, 157, 0.6);
  box-shadow: 0 0 5px rgba(128, 128, 128, 1);

  &.empty {
    color: hsla(0, 0%, 0%, 0.35);
    display: block;
    font-size: 2rem;
    margin: 100px 0;
    position: relative;
    text-align: center;
  }
}
</style>
