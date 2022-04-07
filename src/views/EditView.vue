<template>
  <div class="page__edit">
    <form @submit.prevent="saveNote" class="note">
      <!-- Заголовок заметки -->
      <div class="note__header">
        <label class="note__header-label">
          <h2>Заголовок заметки</h2>
          <input
            id="title"
            @change="editNoteTitle"
            ref="noteTitleEl"
            type="text"
            v-model="noteTitle"
            placeholder=" "
          />
          <label for="title">Что будем делать?</label>
        </label>
      </div>
      <!-- Список задач и кнопки -->
      <div class="note__body">
        <h2>Список задач</h2>
        <!-- Список тудусов -->
        <ul class="note__tasks">
          <Task
            @deleteTask="dialogShowDeleteTask"
            v-for="task in tasks"
            :task-id="task.id"
            :key="task.id"
          />
        </ul>
        <!-- Добавить задачу-->
        <form @submit.prevent="addNewTask" class="note__new-task">
          <input
            id="todo"
            type="text"
            v-model="newTaskDescription"
            placeholder=" "
          />
          <label for="todo">Новая задачка?</label>

          <Controls
            title="Добавить задачу"
            class="btn"
            :disabled="!newTaskDescription"
            :icon="'add'"
          />
        </form>
        <!-- Кнопки управления -->
        <div class="note__controls controls">
          <div class="controls">
            <span
              v-if="!modeNew"
              :class="{ 'is-visible': isNoteSaved }"
              class="note__save-notification"
              >Сохранено</span
            >
            <button class="btn btn-primary" type="submit">
              {{ modeNew ? "Добавить заметку" : "Сохранить" }}
            </button>
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="dialogShowDeleteNote"
            v-if="!modeNew"
          >
            Удалить
          </button>
          <Controls
            title="Закрыть"
            type="button"
            class="btn btn-controls"
            @click="dialogShowCancelNote"
            icon="close"
          />
          <Controls
            title="Отменить действие"
            type="button"
            :disabled="historyCurrent < 1 ? true : false"
            @click="undo"
            class="btn btn-controls"
            :icon="'undo'"
          />

          <Controls
            title="Вернуть действие"
            type="button"
            :disabled="historyCurrent > historyCount ? true : false"
            @click="redo"
            class="btn btn-controls"
            :icon="'redo'"
          />
        </div>
      </div>
    </form>

    <!-- Диалоговые окна -->
    <Dialog
      @closeDialog="dialogHideDeleteTask"
      @confirm="deleteTask"
      @reject="dialogHideDeleteTask"
      v-show="isDialogDeleteTaskActive"
      text="Вам не нужен этот пункт?"
      apply="Удалить"
      cancel="Я предумал"
    />

    <Dialog
      @closeDialog="dialogHideCancelNote"
      @confirm="cancelNote"
      @reject="dialogHideCancelNote"
      v-show="isDialogCancelNoteActive"
      text="Отменить изменения?"
      apply="Отменить"
      cancel="Остаться"
    />
    <Dialog
      @closeDialog="dialogHideDeleteNote"
      @confirm="deleteNote"
      @reject="dialogHideDeleteNote"
      v-show="isDialogDeleteNoteActive"
      :text="'Точно хотите удалить заметку?'"
      apply="Удалить"
      cancel="Отмена"
    />
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Task from "@/components/Task";
import Controls from "@/components/Controls";
import { v4 as uuidv4 } from "uuid";

export default {
  created() {
    if (this.id) {
      this.modeNew = false;
      this.$store.dispatch("setNote", this.id);
    } else {
      this.modeNew = true;
      this.newNoteId = uuidv4();
      this.$store.dispatch("newNote", this.newNoteId);
    }
  },
  data() {
    return {
      newTaskDescription: null,
      isDialogDeleteTaskActive: false,
      isDialogCancelNoteActive: false,
      isDialogDeleteNoteActive: false,
    };
  },
  props: ["id"],
  computed: {
    noteId() {
      return this.id ? this.id : this.newNoteId;
    },
    isNoteModified() {
      return this.$store.state.noteModified;
    },
    isNoteSaved() {
      return this.$store.state.noteSaved;
    },
    noteTitle: {
      get() {
        this.isNoteTitleEmpty = false;
        return this.$store.state.note.title;
      },
      set(value) {
        this.$store.dispatch("updateTitle", value);
      },
    },
    tasks() {
      return this.$store.state.note.tasks;
    },
    historyCurrent() {
      return this.$store.state.noteHistoryCurrent;
    },
    historyCount() {
      return this.$store.state.noteHistory.length;
    },
  },
  components: {
    Task,
    Dialog,
    Controls,
  },
  methods: {
    dialogShowDeleteTask(taskId) {
      this.isDialogDeleteTaskActive = true;
      this.deleteTaskId = taskId;
    },
    dialogHideDeleteTask() {
      this.isDialogDeleteTaskActive = false;
      this.deleteTaskId = null;
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.deleteTaskId);
      this.dialogHideDeleteTask();
    },
    dialogShowCancelNote() {
      if (this.isNoteModified) {
        this.isDialogCancelNoteActive = true;
      } else {
        this.cancelNote();
      }
    },
    dialogHideCancelNote() {
      this.isDialogCancelNoteActive = false;
    },
    editNoteTitle() {
      this.$store.dispatch("pushHistory");
    },
    saveNote() {
      if (!this.noteTitle) {
        this.$refs.noteTitleEl.focus();
        return;
      }
      this.$store.dispatch("saveNote", this.noteId);
      if (this.modeNew) {
        this.$router.push({ name: "home" });
      }
    },
    cancelNote() {
      this.dialogHideCancelNote();
      this.$router.push({ name: "home" });
    },
    dialogShowDeleteNote() {
      this.isDialogDeleteNoteActive = true;
    },
    dialogHideDeleteNote() {
      this.isDialogDeleteNoteActive = false;
    },
    deleteNote() {
      this.$store.dispatch("deleteNote", this.noteId);
      this.$router.push({ name: "home" });
      this.dialogHideDeleteNote();
    },
    addNewTask() {
      this.$store.dispatch("addNewTask", {
        noteId: this.noteId,
        description: this.newTaskDescription,
      });
      this.newTaskDescription = null;
    },
    undo() {
      this.$store.dispatch("undoHistory");
    },
    redo() {
      this.$store.dispatch("redoHistory");
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("cancelNote");
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_vars.scss";

.page {
  &__edit {
    align-items: flex-start;
    display: flex;
    left: 25px;
    margin: 50px auto;
    position: relative;
    max-width: 500px;
  }
}

.note {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px $gray;
  max-width: 450px;
  width: 100%;
  &__header {
    padding: 30px;

    &-label {
      display: flex;
      flex-direction: column;
      position: relative;
      & h2 {
        text-align: center;
      }

      & input {
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 700;
        padding: 20px;
        margin-top: 30px;
        border-bottom: 0.1rem solid #16213e;
        outline: none;
      }

      & label {
        position: absolute;
        font-size: 1.5rem;
        padding-left: 1rem;
        color: #bdbdbd;
        transform: translateY(4rem);
        transform-origin: left top;
        cursor: text;
        transition: all 0.3s;
      }

      & input:focus,
      & input:not(:placeholder-shown) {
        transition: all 0.2s linear;
        border-bottom: 0.2rem solid $green;
      }

      & input:focus ~ label,
      & input:not(:placeholder-shown) ~ label {
        padding: 0;
        color: $green;
        transform: translateY(2.5rem) scale(0.8);
      }
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__tasks {
    width: 80%;
  }

  &__new-task {
    position: relative;
    & input {
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 700;
      padding: 20px;
      margin-top: 30px;
      border-bottom: 0.1rem solid #16213e;
      outline: none;
    }

    & label {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 1.5rem;
      padding-left: 1rem;
      width: 100%;
      color: #bdbdbd;
      transform: translateY(3rem);
      transform-origin: left top;
      cursor: text;
      transition: all 0.3s;
    }

    & input:focus,
    & input:not(:placeholder-shown) {
      transition: all 0.2s linear;
      border-bottom: 0.2rem solid $green;
    }

    & input:focus ~ label,
    & input:not(:placeholder-shown) ~ label {
      padding: 0;
      color: $green;
      transform: translateY(1rem) scale(0.8);
    }
  }

  &__controls {
    margin: 30px auto;
    width: 100%;
    display: flex;
    display: flex;
    justify-content: space-around;
    align-items: center;
	flex-wrap: wrap;
  }

  &__save-notification {
    display: block !important;
    color: $green;
    background-color: white;
    border-radius: 32px;
    line-height: 25px;
    opacity: 0;
    position: absolute;
    text-align: center;
    top: 0;
    left: 45%;
    transform: translate(-50%);
    visibility: hidden;
    width: 30%;
    box-shadow: 0 0 10px $gray;
    z-index: 100;

    &.is-visible {
      animation: savedNote 2s forwards;
      visibility: visible;
    }
  }
}

.btn:disabled {
  cursor: default;
  opacity: 0.5;
}

@keyframes savedNote {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
    transform: translate(-50%, -100%);
  }
  75% {
    opacity: 1;
    transform: translate(-50%, -100%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
}

.btn {
  margin: 10px;
}
</style>
