type GroupedMap<I, K extends keyof I> = Record<
  I[K] & (string | number | symbol),
  I[]
>;

export const groupBy = <Item, Key extends keyof Item>(
  array: Item[],
  key: Key
): GroupedMap<Item, Key> => {
  return array.reduce((acc, item) => {
    const groupName = item[key];

    if (
      typeof groupName === "string" ||
      typeof groupName === "number" ||
      typeof groupName === "symbol"
    ) {
      return {
        ...acc,
        [groupName]: [...(acc[groupName] || []), item],
      };
    }

    return acc;
  }, {} as GroupedMap<Item, Key>);
};
