import { collection, getDocs, query, setDoc, doc } from "firebase/firestore";

export const state = () => ({
  Highlights: [],
  NavigatorGroups: [],
  Navigators: [],
  NewsGroups: [],
  Newses: [],
  Events: [],
  Assets: [],
});

export const mutations = {
  set(state, { name, items }) {
    state[name] = items;
  },
  create(state, { name, item }) {
    state[name].push(item);
  },
};

export const actions = {
  async create(store, { name = "", item }) {
    await setDoc(doc(this.$fire.store, name, item.id), item);
    store.commit("create", { name, item });
  },
  async get(store, { name = "", conditions = [] }) {
    let querySnap = await getDocs(
      query(collection(this.$fire.store, name), ...conditions)
    );
    let items = [];
    querySnap.forEach((doc) => items.push(doc.data()));
    store.commit("set", {
      name,
      items,
    });
  },
  async gets(store, collections) {
    for (const { name, conditions } of collections) {
      await store.dispatch("get", {
        name,
        conditions,
      });
    }
  },
};
