export const api_search = () => {
  return request.get("nrgtproxy/search/users", {
    params: {
      q: "7066",
    },
  });
};

export const api_search2 = () => {
  return request.get("nrgtproxy/search/users2", {
    params: {
      q: "7066",
    },
  });
};
