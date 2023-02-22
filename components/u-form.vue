<template>
  <form class="u-form" @submit.prevent="$emit('submit')">
    <header class="u-form__header">
      <div class="heading-container">
        <div class="heading">
          <div class="text" v-for="(text, i) in heading">
            {{ i > 0 ? "/" : "" }}{{ text }}
          </div>
        </div>
        <button for="toggle-info" class="button--icon" v-if="info">
          <u-icon>info</u-icon>
        </button>
      </div>
      <div class="info" v-if="info">
        {{ info }}
      </div>
    </header>
    <hr />
    <main class="u-form__main">
      <slot name="main"> </slot>
    </main>
    <hr />
    <footer class="u-form__footer">
      <slot name="footer"><button class="button">confirm</button></slot>
    </footer>
  </form>
</template>

<script lang="ts">
export default {
  props: {
    heading: {
      type: Array,
    },
    info: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.u-form {
  $this-primary: $black;
  $this-accent: $accent-1;

  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;

  &__header {
    text-transform: capitalize;
    font-size: 1.25rem;
    .heading-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .heading {
        display: flex;
        .text:first-child {
          color: $this-accent;
          font-weight: bold;
        }
      }
      button[for="toggle-info"] {
        color: $this-accent;
      }
    }
    .info {
      font-size: 1rem;
    }
  }
  &__main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
