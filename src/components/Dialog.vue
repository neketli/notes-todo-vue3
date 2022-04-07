<template>
  <div class="dialog">
    <div class="dialog__overlay" @click="closeDialog">
      
      </div>
	  <div class="dialog__content">
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
      this.$emit("closeDialog");
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
  background-color: hsla(0, 0%, 0%, .7);
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  }
  &__content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
