export const setItem = (key, value, store = localStorage) =>
  store.setItem(key, JSON.stringify(value));

export const getItem = (key, store = localStorage) => {
  return JSON.parse(store.getItem(key)) || {};
};
