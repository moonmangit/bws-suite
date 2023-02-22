<template>
  <div class="u-select input-group" ref="this">
    <label class="u-select__label input-group__label">
      <div class="text">{{ label }}</div>
      <u-icon class="icon" v-if="icon">{{ icon }}</u-icon>
    </label>
    <div class="u-select__input input-group__input">
      <input
        class="input"
        type="text"
        :value="content"
        @click.stop="open"
        v-bind="inputProps"
        @keydown.prevent
      />
      <u-icon class="icon">arrow_drop_down</u-icon>
      <ul ref="options">
        <li v-for="option in options" @click="select(option)">
          <slot name="option" v-bind="{ option }">{{ option }}</slot>
        </li>
      </ul>
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
    inputProps: {
      type: Object,
      default: {
        type: "text",
        required: true,
      },
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    open() {
      this.$refs.this.classList.add("active");
      document.addEventListener("click", this.handleClickOutside);
    },
    select(option) {
      this.content = option;
      this.$refs.this.classList.remove("active");
      document.removeEventListener("click", this.handleClickOutside);
    },
    handleClickOutside(e) {
      if (!this.$refs.options.contains(e.target)) {
        this.$refs.this.classList.remove("active");
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
  },
  watch: {
    content(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.u-select {
  color: $black;

  &__label {
  }
  &__input {
    position: relative;
    input {
      width: 100%;
      cursor: pointer;
      caret-color: transparent;
    }
    .icon {
      position: absolute;
      top: 0;
      right: 0.5rem;
      height: 100%;
      display: flex;
      align-items: center;
    }
    ul {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transform: translateY(100%);
      list-style-type: none;
      background-color: white;
      border-radius: 0 0 10px 10px;
      max-height: 20rem;
      overflow-y: scroll;
      padding-bottom: 0.5rem;
      border: 1px solid $accent-1;

      opacity: 0;
      pointer-events: none;
      li {
        padding: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: capitalize;
        &:hover {
          background-color: rgba($accent-1, 0.1);
          color: $accent-1;
        }
      }
    }
  }

  &.active & {
    opacity: 1;
    pointer-events: all;
    &__input {
      .input {
        border-radius: 5px 5px 0 0;
        border-bottom: none;
      }
      ul {
        opacity: 1;
        pointer-events: all;
        border-top: none;
      }
      .icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
