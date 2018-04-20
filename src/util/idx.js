export const idx = (obj, accessor, fallback) => {
  try {
    return accessor(obj);
  } catch (e) {
    return fallback;
  }
};
