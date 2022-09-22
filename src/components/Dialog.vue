<template>
  <div class="dialog">
    <div class="dialog__overlay" @click="closeDialog"></div>
    <div class="dialog__content">
      <h3>{{ text }}</h3>
      <div class="dialog__buttons">
        <Button @click="confirm" type="danger">{{ apply }}</Button>
        <Button @click="reject" type="controls">{{ cancel }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  props: ["text", "apply", "cancel"],
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    confirm() {
      this.$emit("confirm");
    },
    reject() {
      this.$emit("reject");
    },
  },
  components: { Button },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_vars.scss";

.dialog {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px;

  &__overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: hsla(0, 0%, 0%, 0.7);
  }

  &__content {
    position: relative;
    width: 100%;
    max-width: 450px;
    padding: 30px;

    background: #fff;
    border-radius: 8px;

    & h3 {
      color: $red;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 30px;
    }
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
}
</style>
