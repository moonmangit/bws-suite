export default (context, inject) => {
  //TODO make it reactive using sub-pattern by subscribe to $route.path

  inject("routeInfo", {
    "/cms": {
      title: "dashboard",
      icon: "dashboard",
      about: "dashboard about",
    },
    "/cms/payload": {
      title: "payload",
      icon: "local_shipping",
      about: "payload about",
    },
    //collections
    "/cms/navigation": {
      title: "site navigation",
      icon: "share",
      about: "site navigation about",
    },
    "/cms/highlight": {
      title: "highlight",
      icon: "emoji_events",
      about: "highlight about",
    },
    "/cms/event": {
      title: "event",
      icon: "sports_handball",
      about: "event about",
    },
    "/cms/news": {
      title: "news",
      icon: "newspaper",
      about: "news about",
    },
    "/cms/asset": {
      title: "asset",
      icon: "folder",
      about: "asset about",
    },
  });
};
