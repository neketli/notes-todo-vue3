<template>
  <button class="button" :class="[`button-${type}`]">
    <slot />
    <i v-if="!!icon" :class="currentIcon" />
  </button>
</template>

<script>
export default {
  data() {
    return {
      icons: {
        edit: "fa fa-pencil",
        delete: "fa fa-trash",
        close: "fa fa-times",
        add: "fa fa-plus",
        undo: "fa fa-undo",
        redo: "fa fa-repeat",
      },
    };
  },
  computed: {
    currentIcon() {
      return this.icons[this.icon];
    },
  },
  props: {
    icon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/_vars.scss";

.button {
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 1.5rem;

  appearance: none;
  background: none;
  border: none;
  text-decoration: none;

  border-radius: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  outline: 0;

  color: black;
  opacity: 0.8;
  transition: 0.2s ease-in-out;

  &-controls {
    background-color: $gray;
  }

  &-primary {
    background-color: $green;
  }

  &-danger {
    background-color: $red;
  }

  &:hover,
  &:focus {
    opacity: 1;
    box-shadow: 0 2px 5px rgba($color: #000000, $alpha: 0.3);
  }
}
</style>
