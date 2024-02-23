export const api_search = () => {
  return request.get("7066/search/users", {
    params: {
      q: "7066",
    },
  });
};

export const api_search2 = () => {
  return request.get("7066/search/users2", {
    params: {
      q: "7066",
    },
  });
};
