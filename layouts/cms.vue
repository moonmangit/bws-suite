<template>
  <div id="layout-cms" class="about-minimized side-minimized" ref="this">
    <div class="profile">
      <div class="profile__image">
        <div class="filter"></div>
        <img :src="user.image" />
      </div>
      <div class="profile__detail">
        <div class="name">{{ user.name }}</div>
        <div class="role">{{ user.role }}</div>
      </div>
      <div class="profile__control">
        <button
          class="button--icon"
          @click="$refs.this.classList.toggle('side-minimized')"
        >
          <u-icon>menu_open</u-icon>
        </button>
      </div>
    </div>
    <nav class="side-nav">
      <div class="side-nav__links">
        <!-- system -->
        <label>
          <hr />
          <span class="text">System</span>
        </label>

        <nuxt-link
          v-for="path in ['', '/payload']"
          :to="'/cms' + path"
          :data-tips="$routeInfo['/cms' + path].title"
        >
          <span class="text">{{ $routeInfo["/cms" + path].title }}</span>
          <u-icon>{{ $routeInfo["/cms" + path].icon }}</u-icon>
        </nuxt-link>
        <!-- collection -->
        <label>
          <hr />
          <span class="text">Collections</span>
        </label>
        <nuxt-link
          v-for="path in [
            '/navigation',
            '/highlight',
            '/event',
            '/news',
            '/asset',
          ]"
          :to="'/cms' + path"
          :data-tips="$routeInfo['/cms' + path].title"
        >
          <span class="text">{{ $routeInfo["/cms" + path].title }}</span>
          <u-icon>{{ $routeInfo["/cms" + path].icon }}</u-icon>
        </nuxt-link>
      </div>
      <div class="side-nav__footer">
        <button for="logout" class="button" @click="logout">
          <span class="text">logout</span>
          <u-icon>logout</u-icon>
        </button>
      </div>
    </nav>
    <nav class="top-nav">
      <u-icon class="page-icon">{{ routeInfo.icon }}</u-icon>
      <div class="page-title">{{ routeInfo.title }}</div>
    </nav>
    <nuxt class="page" />
    <div class="about">
      <button
        for="toggle"
        class="button tips--left"
        @click="$refs.this.classList.toggle('about-minimized')"
        data-tips="help"
      >
        <u-icon>help</u-icon>
      </button>
      <div class="about">
        <div class="title">About "{{ routeInfo.title }}"</div>
        <hr />
        <div class="detail">
          {{ routeInfo.about }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: this.capitalized(this.routeInfo.title),
      titleTemplate: `%s as ${this.user.role}`,
    };
  },
  middleware({ redirect, store }) {
    if (!store.getters["user/isAuthorized"]) redirect("/login");
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    routeInfo() {
      return this.$routeInfo[this.$route.path];
    },
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
    capitalized(text = "") {
      return text[0].toUpperCase() + text.slice(1);
    },
  },
};
</script>

<style lang="scss"></style>
