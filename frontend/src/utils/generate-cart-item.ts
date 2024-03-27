type Item = {
  _id: string | number; // Change 'id' to '_id'
  name: string;
  image?: {
    cover: string;
    [key: string]: unknown;
  };
  price: {
    // Change 'price' to an object with 'original' and 'discount' properties
    original: number;
    discount: number;
  };
  balance: number; // Change 'stock' to 'balance'
  discount_price?: number;
  quantity?: number;
};

export function generateCartItem(item: Item) {
  const { _id, name, image, quantity, balance, price } = item;

  const id = _id;
  const stock = balance;

  return {
    id,
    name,
    price: Number(price.original),
    discount_price: Number(price.discount),
    stock,
    image: item?.image?.cover,
  };
}
