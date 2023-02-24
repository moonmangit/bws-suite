<template>
  <div id="page-login">
    <u-form
      for="login"
      :heading="['เข้าสู่ระบบ', 'ระบบจัดการข้อมูล']"
      @submit="handleLogin"
    >
      <template #main>
        <u-input
          label="อีเมล"
          icon="email"
          :input-props="{
            placeholder: 'example@example.com',
            required: true,
            type: 'email',
          }"
          v-model="form.email"
        />
        <u-input
          label="รหัสผ่าน"
          icon="key"
          :input-props="{
            placeholder: 'รหัสผ่านเจ้าหน้าที่',
            required: true,
            type: 'password',
          }"
          v-model="form.password"
        />
      </template>
      <template #footer>
        <button class="button" type="submit">
          เข้าสู่ระบบ <u-icon>login</u-icon>
        </button>
      </template>
    </u-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch("user/login", {
          email: this.form.email,
          password: this.form.password,
        });
        this.$router.push("/cms");
        alert("complete");
      } catch (error) {
        alert("error");
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
#page-login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  .u-form[for="login"] {
    width: min(25rem, 90vw);
    border: 1px solid rgba(black, 0.1);
    button[type="submit"] {
      margin-left: auto;
    }
  }
}
</style>
