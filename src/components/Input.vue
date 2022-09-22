<template>
  <div class="input">
    <input
      :id="id"
      type="text"
      v-model="modelValue"
      @input="updateValue"
      placeholder=" "
    />
    <label :for="id"><slot /></label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      require: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/_vars.scss";

.input {
  width: 100%;
  position: relative;
  & input {
    width: 100%;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    padding: 20px;
    margin-top: 30px;
    border-bottom: 0.1rem solid #16213e;
    outline: none;
  }

  & label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.5rem;
    padding-left: 1rem;
    width: 100%;
    color: #bdbdbd;
    transform: translateY(3rem);
    transform-origin: left top;
    cursor: text;
    transition: all 0.3s;
  }

  & input:focus,
  & input:not(:placeholder-shown) {
    transition: all 0.2s linear;
    border-bottom: 0.2rem solid $green;
  }

  & input:focus ~ label,
  & input:not(:placeholder-shown) ~ label {
    padding: 0;
    color: $green;
    transform: translateY(1rem) scale(0.8);
  }
}
</style>
