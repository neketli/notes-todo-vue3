<template>
  <div id="app">
    <h1 class="logo">
      <router-link to="/"
        >Заметочки
        <svg viewBox="0 0 512 512">
          <path
            class="cls-1"
            d="M326.82,71.53a11.79,11.79,0,0,0-1.69.14,24.79,24.79,0,0,0-24.62-22.14H128.2a24.79,24.79,0,0,0-24.6,22c-27.76.75-50.09,20.91-50.09,45.62V419c0,25.17,23.18,45.65,51.67,45.65H326.82c28.49,0,51.67-20.48,51.67-45.65V117.18C378.49,92,355.31,71.53,326.82,71.53Zm-200.7,2.75a2.08,2.08,0,0,1,2.08-2.08H300.51a2.08,2.08,0,0,1,2.08,2.08V93.43a2.08,2.08,0,0,1-2.08,2.08H128.2a2.08,2.08,0,0,1-2.08-2.08ZM355.81,419c0,12.66-13,23-29,23H105.18c-16,0-29-10.31-29-23V117.18C76.19,105,88.28,95,103.47,94.25a24.77,24.77,0,0,0,24.73,23.94H300.51a24.77,24.77,0,0,0,24.74-24.1,11.73,11.73,0,0,0,1.57.12c16,0,29,10.3,29,23Z"
          />
          <path
            class="cls-1"
            d="M449.87,82.21H402.15a11.34,11.34,0,0,0-11.34,11.33V326.35a205,205,0,0,0,23.31,94.73L416,424.6a11.34,11.34,0,0,0,20.09,0l1.85-3.52a205,205,0,0,0,23.31-94.73V93.54A11.34,11.34,0,0,0,449.87,82.21ZM426,392.56a182.47,182.47,0,0,1-12.07-53.5h24.14A182.79,182.79,0,0,1,426,392.56Zm12.52-76.18h-25V104.88h25Z"
          />
          <path
            class="cls-1"
            d="M191.59,133.75H132.5a11.34,11.34,0,0,0-11.34,11.33v59.1a11.34,11.34,0,0,0,11.34,11.34h59.09a11.34,11.34,0,0,0,11.34-11.34v-59.1A11.33,11.33,0,0,0,191.59,133.75Zm-11.33,59.09H143.84V156.42h36.42Z"
          />
          <path
            class="cls-1"
            d="M191.59,239.83H132.5a11.34,11.34,0,0,0-11.34,11.34v59.09A11.34,11.34,0,0,0,132.5,321.6h59.09a11.33,11.33,0,0,0,11.34-11.34V251.17A11.34,11.34,0,0,0,191.59,239.83Zm-11.33,59.1H143.84V262.51h36.42Z"
          />
          <path
            class="cls-1"
            d="M298.22,163.81H240a11.34,11.34,0,1,0,0,22.67h58.21a11.34,11.34,0,1,0,0-22.67Z"
          />
          <path
            class="cls-1"
            d="M298.22,269.38H240a11.34,11.34,0,1,0,0,22.68h58.21a11.34,11.34,0,0,0,0-22.68Z"
          />
          <path
            class="cls-1"
            d="M191.59,345.92H132.5a11.34,11.34,0,0,0-11.34,11.33v59.1a11.34,11.34,0,0,0,11.34,11.34h59.09a11.34,11.34,0,0,0,11.34-11.34v-59.1A11.33,11.33,0,0,0,191.59,345.92ZM180.26,405H143.84V368.59h36.42Z"
          />
          <path
            class="cls-1"
            d="M298.22,375.46H240a11.34,11.34,0,0,0,0,22.68h58.21a11.34,11.34,0,0,0,0-22.68Z"
          />
        </svg>
      </router-link>
    </h1>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "@/assets/_vars.scss";
#app {
  margin: 0 25px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-size: cover;
  perspective: 1000px;
  background: linear-gradient(250deg, $gradientFrom, $gradientTo);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  font-family: "Open Sans";
}

svg {
  max-width: 6vw;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.logo {
  font-size: 3rem;
  font-weight: 600;
  margin: 30px 0;
  text-align: center;
  text-shadow: 0 0 5px white;

  & a {
    color: currentColor;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.btn {
  appearance: none;
  background: none;
  border: none;
  text-decoration: none;
  color: black;
  border-radius: 16px;
  cursor: pointer;
  font-size: 1.5rem;
  outline: 0;
  padding: 5px;
  opacity: 0.8;
  transition: 0.1s ease-out;

  &-controls {
    background-color: $gray;
    border-radius: 32px;
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
    transform: scale(1.05);
    box-shadow: 0 0 6px white;
  }
}
</style>
