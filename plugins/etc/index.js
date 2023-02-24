import { Timestamp } from "firebase/firestore";
import icons from "./src/icons";

export default (context, inject) => {
  inject("etc", {
    icons,
    convertTimestamp({ seconds, nanoseconds }) {
      return new Timestamp(seconds, nanoseconds)
        .toDate()
        .toLocaleString("th-th", {
          dateStyle: "short",
          timeStyle: "short",
        });
    },
  });
};
