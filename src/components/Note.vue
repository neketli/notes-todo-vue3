<template>
  <section class="notes__item note">
    <!-- Заголовок -->
    <div class="note__header">
      <h2>{{ note.title }}</h2>
    </div>

    <!-- Список задач -->
    <div class="note__body">
      <ul class="note__tasks tasks">
        <li
          class="tasks__item"
          :class="{ 'is-completed': item.completed }"
          v-for="item in tasks"
          :key="item.id"
        >
          {{ item.description }}
        </li>
      </ul>
      <router-link class="note__ramain" :to="notePath" v-if="tasksRemain > 0">
        и ещё {{ tasksRemain }} задач{{ tasksRemain < 5 ? "и" : "" }}
      </router-link>

      <div class="controls">
        <router-link :to="notePath">
          <Controls class="btn note__btn-edit" :icon="'edit'" />
        </router-link>
        <Controls
          @click="deleteNote"
          class="btn note__btn-remove"
          :icon="'delete'"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Controls from "@/components/Controls";

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
    Controls,
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
  margin: 15px 0;
  transition: 0.5s ease;

  &__header {
    margin: 15px;
    & h2 {
      font-size: 2rem;
    }
  }

  &__body {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__btn-remove:hover {
    color: $red;
  }

  &__ramain {
    color: $green;
    text-align: center;
    margin: 0 auto;
  }

  &:hover {
    transform: scale(1.05);
  }
}

.tasks {
  list-style-type: none;
  font-size: 1.5rem;
  margin: 20px;

  & li:before {
    content: "•";
    color: $green;
    padding-right: 10px;
  }

  &__item.is-completed {
    opacity: 0.35;
    text-decoration: line-through;
  }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
}
</style>
