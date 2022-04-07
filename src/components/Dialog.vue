<template>
  <div class="dialog">
    <div class="dialog__overlay" @click="closeDialog"></div>
    <div class="dialog__box">
      <h3>{{ text }}</h3>
      <div class="dialog__btns">
        <button @click="confirm" class="btn btn-danger">{{ apply }}</button>
        <button @click="reject" class="btn btn-controls">{{ cancel }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text", "apply", "cancel"],
  methods: {
    closeDialog() {
      this.$emit("closedialog");
    },
    confirm() {
      this.$emit("confirm");
    },
    reject() {
      this.$emit("reject");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_vars.scss";

.dialog {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: 25px;
  position: fixed;
  top: 0;
  width: 100%;

  &__overlay {
    background-color: hsla(0, 0%, 0%, 0.7);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  &__box {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 25px 1px hsla(0, 0%, 0%, 0.055),
      0 15px 60px 5px hsla(0, 0%, 0%, 0.035);
    box-sizing: border-box;
    max-width: 450px;
    padding: 30px;
    position: relative;
    width: 100%;

    & h3 {
      color: $red;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 30px;
    }
  }
  &__btns {
    display: flex;
    justify-content: flex-end;
  }
}

.btn {
  margin: 15px;
  padding: 10px;
}
</style>
