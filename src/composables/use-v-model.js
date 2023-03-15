import { computed, getCurrentInstance } from 'vue';

// export default function useVModel(key, { type } = {}) {
//   const { props, emit } = getCurrentInstance();
//   return computed({
//     get: () => props[key],
//     set(value) {
//       const newValue = type === Number ? Number(value) : value;
//       emit(`update:${key}`, newValue);
//     }
//   });
// }

export default function useVModel(key, setter) {
  const { props, emit } = getCurrentInstance();
  return computed({
    get: () => props[key],
    set(value) {
      const newValue = setter(value);
      emit(`update:${key}`, newValue);
    }
  });
}

useVModel.number = key => {
  return useVModel(key, value => Number(value));
};
