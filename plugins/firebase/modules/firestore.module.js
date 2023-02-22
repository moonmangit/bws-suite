import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export default (context, app) => {
  const instance = getFirestore(app);
  if (process.env.NUXT_ENV_VAR == "development") {
    console.log("✅ [firestore.module]  connect firestore emulator");
    connectFirestoreEmulator(instance, "localhost", 8080);
  }

  return {
    instance,
  };
};
