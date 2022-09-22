<template>
  <button class="conrols__btn">
    <i :class="currentIcon" aria-hidden="true"></i>
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
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.controls__btn {
  padding: 10px 15px;
  border-radius: 10px;

  & i {
    font-size: 1.5rem;
  }
}
</style>
