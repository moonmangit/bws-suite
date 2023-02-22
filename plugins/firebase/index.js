import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import config from "./config";
import authModule from "./modules/auth.module";
import firestoreModule from "./modules/firestore.module";

export default async (context, inject) => {
  const app = initializeApp(config);
  const analytics = getAnalytics(app);

  const { instance: auth, watcher } = authModule(context, app);
  await watcher;
  const { instance: firestore } = firestoreModule(context, app);

  inject("fire", {
    auth,
    store: firestore,
  });
};
