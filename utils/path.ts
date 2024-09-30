const path = {
  watch: (id: string, epId: string) => {
    if (epId[0] === '/') epId = epId.slice(1)
    return `/anime/watch/${id}?ep=${epId}`;
  },
  anime: (id: string) => {
    return `/anime/${id}`;
  },
  home: "/",
  search: "/search",
  results: (query: string) => `/results?q=${query}`,
  signIn: "/sign-in",
  list: "/list",
  genres: (genres: string) => `/anime/genres/${genres}`,
  characters: (id: string) => `/characters/${id}`,
};

export default path;