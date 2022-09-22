<template>
  <section class="notes__item note">
    <!-- Заголовок -->
    <div class="note__header">
      <h2>{{ note.title }}</h2>
    </div>

    <!-- Список задач -->
    <div class="note__content">
      <ul class="note__tasks tasks">
        <li
          class="tasks__item"
          :class="{ 'is-completed': item.completed }"
          v-for="item in tasks"
          :key="item.id"
        >
          <span>{{ item.description }}</span>
        </li>
      </ul>
      <router-link class="note__remain" :to="notePath" v-if="tasksRemain > 0">
        и ещё {{ tasksRemain }} задач{{ tasksRemain < 5 ? "и" : "" }}
      </router-link>

      <div class="note__controls">
        <router-link :to="notePath">
          <Button type="controls" icon="edit" />
        </router-link>
        <Button @click="deleteNote" type="controls" icon="delete" />
      </div>
    </div>
  </section>
</template>

<script>
import Button from "./Button.vue";

export default {
  data() {
    return {
      tasksPreviewLimit: 3,
      tasksRemain: 0,
      notePath: {
        name: "note",
        params: {
          id: this.note.id,
        },
      },
    };
  },
  props: ["note"],
  computed: {
    tasks() {
      const tasks = this.note.tasks;
      const tasksPreview = [];
      const countTasks = tasks.length;
      for (let i = 0; i < countTasks; i++) {
        if (i >= this.tasksPreviewLimit) {
          break;
        }
        tasksPreview.push(tasks[i]);
      }

      this.tasksRemain = countTasks - this.tasksPreviewLimit;
      return tasksPreview;
    },
  },
  methods: {
    deleteNote() {
      this.$emit("deleteNote", this.note.id);
    },
  },
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_vars.scss";

.note {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px $gray;
  max-width: 450px;
  width: 100%;
  padding: 15px;
  transition: 0.5s ease;

  &__header {
    margin: 15px;
    & h2 {
      font-size: 2rem;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  }

  &__remain {
    color: $green;
    text-align: center;
    margin: 0 auto;
  }

  &:hover {
    transform: scale(1.02);
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}

.tasks {
  list-style-type: none;
  font-size: 1.5rem;
  margin: 20px;

  &__item:before {
    content: "•";
    color: $green;
    padding-right: 10px;
  }

  &__item.is-completed {
    opacity: 0.35;
    span {
      text-decoration: line-through;
    }
  }
}
</style>
