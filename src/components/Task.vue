<template>
  <!-- Таск - элемент списка имеет чекбокс и описание -->
  <li class="task" :class="{ 'is-completed': isTaskCompleted }">
    <!-- Чекбокс -->
    <label class="task__checkbox">
      <input type="checkbox" v-model="isTaskCompleted" />
      <span></span>
    </label>
    <!-- Описание с возможностью редактирования зависит от editMode -->
    <input
      ref="taskDescriptionInput"
      @keydown.enter.prevent="$event.target.blur()"
      @blur="editMode = false"
      @change="editTaskDescription"
      class="task__desctiption task__input"
      v-show="editMode"
      v-model="taskDescription"
    />
    <span
      class="task__description"
      v-show="!editMode"
      v-text="taskDescription"
    ></span>

    <!-- Кнопки управления -->

    <Controls
      type="button"
      class="btn task__btn-edit"
      @click="turnOnEditMode"
      :icon="'edit'"
    />

    <Controls
      type="button"
      class="btn task__btn-remove"
      @click="deleteTask"
      :icon="'delete'"
    />
  </li>
</template>

<script>
import Controls from "@/components/Controls";

export default {
  props: ["task-id"],
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    task() {
      return this.$store.state.note.tasks.find(
        (task) => task.id === this.taskId
      );
    },
    taskDescription: {
      get() {
        return this.task.description;
      },
      set(value) {
        this.$store.dispatch("updateTaskDescription", {
          id: this.taskId,
          description: value,
        });
      },
    },
    isTaskCompleted: {
      get() {
        return this.task.completed;
      },
      set(value) {
        this.$store.dispatch("updateTaskStatus", {
          id: this.taskId,
          completed: value,
        });
      },
    },
  },
  components: {
    Controls,
  },
  methods: {
    turnOnEditMode() {
      this.editMode = true;
      setTimeout(() => {
        this.$refs.taskDescriptionInput.focus();
      }, 10);
    },
    deleteTask() {
      this.$emit("deleteTask", this.taskId);
    },
    editTaskDescription() {
      this.$store.dispatch("pushHistory");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_vars.scss";

.task {
  display: flex;
  align-items: center;
  padding: 5px 0;

  &__checkbox {
    cursor: pointer;
    flex-shrink: 0;
    margin-right: 15px;

    & input {
      display: none;
    }
    & span {
      border: 2px solid currentColor;
      border-radius: 50%;
      color: hsla(0, 0%, 0%, 0.35);
      display: block;
      height: 20px;
      position: relative;
      transition: 0.075s ease-out;
      width: 20px;
    }
    & span::before,
    & span::after {
      background-color: #fff;
      content: "";
      display: block;
      left: -6px;
      margin: 0 auto;
      position: absolute;
      transform-origin: center bottom;
      transition: 0.15s ease-out;
      right: 0;
      width: 2px;
    }
    & span::before {
      bottom: 6px;
      height: 5px;
      transform: rotate(-45deg) scaleY(0);
    }
    & span::after {
      bottom: 5px;
      height: 13px;
      transform: rotate(45deg) scaleY(0);
    }
    & input:checked + span {
      background-color: currentColor;
      color: $green;
    }
    & input:checked + span::before {
      transform: rotate(-45deg) scaleY(1);
    }
    & input:checked + span::after {
      transform: rotate(45deg) scaleY(1);
    }
  }

  &.is-completed .task__description {
    opacity: 0.35;
    text-decoration: line-through;
  }

  &__description {
    background: none;
    border: none;
    font-size: 1rem;
    line-height: 120%;
    margin-right: auto;
    min-height: 20px;
    outline: none;
    padding: 0;
    width: 100%;
	overflow: hidden;
  }

  &__input {
    width: 100%;
  }
}
</style>
