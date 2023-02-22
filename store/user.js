import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const state = () => ({
  uid: "",
  name: "",
  image: "",
  role: "",
});

export const getters = {
  isAuthorized(state) {
    return state.uid !== "" && state.role === "admin";
  },
};

export const mutations = {
  set(state, { uid, name, image, role }) {
    state.uid = uid;
    state.name = name;
    state.image = image;
    state.role = role;
  },
};

export const actions = {
  async login(store, { email, password }) {
    await signInWithEmailAndPassword(this.$fire.auth, email, password);
  },
  async logout(store) {
    await signOut(this.$fire.auth);
  },
};
