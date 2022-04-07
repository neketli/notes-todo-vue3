<template>
  <div class="page__404">
    <h2>Ой!<span>А такой страницы у нас нет!</span></h2>
  </div>
</template>

<style lang="scss" scoped>
.page {
  &__404 {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 250px);

    & h2 {
      color: gray;
      font-size: 70px;
      text-align: center;

      & span {
        display: block;
        font-size: 30px;
        margin-top: 20px;
      }
    }
  }
}
</style>
