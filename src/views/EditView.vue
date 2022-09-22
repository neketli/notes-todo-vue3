<template>
  <div class="page-edit">
    <form @submit.prevent="saveNote" class="note">
      <!-- Заголовок заметки -->
      <div class="note__header">
        <label class="note__title">
          <h2>Заголовок заметки</h2>

          <Input
            @change="editNoteTitle"
            ref="noteTitleEl"
            v-model="noteTitle"
            id="title"
            >Что будем делать?</Input
          >
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
          <Input id="todo" v-model="newTaskDescription">Новая задачка?</Input>

          <Button
            title="Добавить задачу"
            class="btn"
            :disabled="!newTaskDescription"
            :icon="'add'"
          />
        </form>
        <!-- Кнопки управления -->
        <div class="note__controls">
          <span
            v-if="!modeNew"
            :class="{ 'is-visible': isNoteSaved }"
            class="note__save-notification"
            >Сохранено</span
          >
          <Button type="primary">
            {{ modeNew ? "Добавить заметку" : "Сохранить" }}
          </Button>

          <Button type="danger" @click="dialogShowDeleteNote" v-if="!modeNew">
            Удалить
          </Button>
          <Button
            title="Закрыть"
            type="controls"
            @click="dialogShowCancelNote"
            icon="close"
          />
          <Button
            title="Отменить действие"
            :disabled="historyCurrent < 1 ? true : false"
            @click="undo"
            type="controls"
            icon="undo"
          />

          <Button
            title="Вернуть действие"
            :disabled="historyCurrent > historyCount ? true : false"
            @click="redo"
            type="controls"
            icon="redo"
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
      text="Точно хотите удалить заметку?"
      apply="Удалить"
      cancel="Отмена"
    />
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Task from "@/components/Task";
import Button from "@/components/Button";
import { v4 as uuidv4 } from "uuid";
import Input from "@/components/Input.vue";

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
    Button,
    Input,
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

<style lang="scss">
@import "@/assets/_vars.scss";

.page-edit {
  align-items: flex-start;
  display: flex;
  left: 25px;
  margin: 50px auto;
  position: relative;
  max-width: 500px;
}

.note {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px $gray;
  max-width: 450px;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title {
    display: flex;
    flex-direction: column;
    position: relative;
    & h2 {
      text-align: center;
    }
  }

  &__input {
    margin-top: 30px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__new-task {
    position: relative;
    display: flex;
    gap: 15px;
    align-items: flex-end;

    .button {
      max-height: 50px;
    }
  }

  &__controls {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
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

.button:disabled {
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
</style>
