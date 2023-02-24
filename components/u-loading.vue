<template>
  <u-modal class="u-loading" no-close>
    <div class="wrapper">
      <u-icon>hourglass_full</u-icon>
      <div class="text">{{ text }}</div>
    </div>
  </u-modal>
</template>

<script>
export default {
  props: {
    text: {
      default: "loading...",
    },
  },
};
</script>

<style lang="scss">
.u-loading {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: white;
    .u-icon {
      font-size: 2rem;
      animation-name: rotateIn;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
  }
}
</style>
