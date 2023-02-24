<template>
  <div class="u-input input-group" ref="this">
    <label class="u-input__label input-group__label">
      <div class="text">{{ label }}</div>
      <u-icon class="icon" v-if="icon">{{ icon }}</u-icon>
    </label>
    <div class="u-input__input input-group__input">
      <input
        class="input"
        v-bind="inputProps"
        v-model="content"
        @focusin="$refs.this.classList.add('active')"
        @focusout="$refs.this.classList.remove('active')"
      />
      <div class="unit">{{ unit || inputProps.type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String | Number,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    unit: {
      type: String,
    },
    inputProps: {
      type: Object,
      default: () => ({
        type: "text",
        required: true,
      }),
    },
  },
  data() {
    return {
      content: this.value,
    };
  },
  watch: {
    content(value) {
      this.$emit("input", value);
    },
    value(value) {
      if (value !== this.content) {
        this.content = value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.u-input {
  $this-primary: $black;
  $this-accent: $accent-1;

  &__input {
    position: relative;
    color: $this-primary;
    input {
      width: 100%;
    }
    .unit {
      position: absolute;
      right: 1rem;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      opacity: 0.5;
    }
  }
  &.active & {
    &__input {
      color: $this-accent;
    }
  }
}
</style>
