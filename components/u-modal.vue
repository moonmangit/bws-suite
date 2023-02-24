<template>
  <div class="u-modal" ref="this">
    <button
      for="close"
      class="button button--icon"
      v-if="!noClose"
      @click="close"
    >
      <u-icon>close</u-icon>
    </button>
    <slot v-bind="{ close }"></slot>
  </div>
</template>

<script>
export default {
  props: {
    noClose: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$refs.this.classList.remove("active");
    },
  },
};
</script>

<style lang="scss" scoped>
.u-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(black, 0.5);
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  opacity: 0;
  pointer-events: none;

  button[for="close"] {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }

  &.active {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
