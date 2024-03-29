export interface Item {
  id: string;
  price: number;
  quantity?: number;
  stock?: number;
  [key: string]: any;
}

export interface UpdateItemInput extends Partial<Omit<Item, 'id'>> {}

export function addItemWithQuantity(
  items: Item[],
  itemToAdd: Item,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id === itemToAdd.id
  );

  if (existingItemIndex > -1) {
    return items.reduce((acc: Item[], currentItem) => {
      if (currentItem.id === itemToAdd.id) {
        const newQuantity = currentItem.quantity! + quantity;

        return newQuantity > 0
          ? [...acc, { ...currentItem, quantity: newQuantity }]
          : [...acc];
      }
      return [...acc, currentItem];
    }, []);
  }

  return [...items, { ...itemToAdd, quantity }];
}

export function removeItemOrQuantity(
  items: Item[],
  id: Item['id'],
  quantity: number
) {
  return items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}

export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], id: Item['id']) {
  return items.find((item) => item.id === id);
}

export function updateItem(
  items: Item[],
  id: Item['id'],
  item: UpdateItemInput
) {
  return items.map((existingItem) =>
    existingItem.id === id ? { ...existingItem, ...item } : existingItem
  );
}

export function removeItem(items: Item[], id: Item['id']) {
  return items.filter((existingItem) => existingItem.id !== id);
}

export function inStock(items: Item[], id: Item['id']) {
  const item = getItem(items, id);
  if (item) return item['quantity']! < item['stock']!;
  return false;
}

export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: ((item.price ?? item.price) * item.quantity!) / 10,
  }));

export const calculateTotal = (items: Item[]) =>
  items.reduce(
    (total, item) => total + (item.quantity! * (item.price ?? item.price)) / 10,
    0
  );

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
