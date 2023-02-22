import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

export default ({ store }, app) => {
  const instance = getAuth(app);
  if (process.env.NUXT_ENV_VAR == "development") {
    console.log("✅ [auth.module]  connect auth emulator");
    connectAuthEmulator(instance, "http://localhost:9099", {
      disableWarnings: true,
    });
  }

  return {
    instance,
    watcher: new Promise((resolve, reject) => {
      onAuthStateChanged(instance, async (user) => {
        if (user) {
          const { claims } = await user.getIdTokenResult();
          store.commit("user/set", {
            uid: user.uid,
            name: user.displayName,
            image: user.photoURL,
            role: claims.role || "",
          });
        } else {
          store.commit("user/set", {
            uid: "",
            name: "",
            image: "",
            role: "",
          });
        }
        resolve();
      });
    }),
  };
};
