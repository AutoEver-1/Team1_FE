import { computed } from "vue";

export const getTotalPages = (listRef, itemsPerPage) => {
  return computed(() => {
    return listRef.value
      ? Math.ceil(listRef.value.length / itemsPerPage.value)
      : 1;
  });
};

export const getPaginatedList = (listRef, pageRef, itemsPerPage) => {
  return computed(() => {
    if (!listRef.value) return [];
    const start = (pageRef.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return listRef.value.slice(start, end);
  });
};
