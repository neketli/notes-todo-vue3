<template>
  <button class="conrols__btn">
    <i :class="icons[this.icon]" aria-hidden="true"></i>
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
  props: ["icon"],
};
</script>

<style lang="scss" scoped>
.controls__btn {
  border-radius: 50%;

  & i {
    font-size: 32px;
  }
}
</style>