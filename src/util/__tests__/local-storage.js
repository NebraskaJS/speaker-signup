import { getItem, setItem } from '../local-storage';

const getStore = (seed = {}) => {
  const getItem = key => seed[key] || null;
  const setItem = (key, value) => (seed[key] = value);

  return {
    getItem,
    setItem,
  };
};

test('it can get an item', () => {
  const store = getStore({ test: true });

  expect(getItem('test', store)).toBe(true);
});

test('it can set an item', () => {
  const store = getStore();

  setItem('test', true, store);

  expect(getItem('test', store)).toBe(true);
});
