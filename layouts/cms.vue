<template>
  <div id="layout-cms">
    <nav class="site-nav">
      <div class="side-nav__top">profile</div>
      <div class="side-nav__center">links</div>
      <div class="side-nav__footer">
        <button class="button" @click="logout">
          <span>logout</span>
          <u-icon>logout</u-icon>
        </button>
      </div>
    </nav>
    <nav class="top-nav">top nav</nav>
    <div class="page-container">
      <nuxt class="page"></nuxt>
    </div>
  </div>
</template>

<script>
export default {
  middleware({ redirect, store }) {
    if (!store.getters["user/isAuthorized"]) redirect("/login");
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("user/logout");
        this.$router.push("/login");
        alert("complete");
      } catch (error) {
        alert("error");
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
