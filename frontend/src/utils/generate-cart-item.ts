type Item = {
  id: string | number;
  name: string;
  image?: {
    cover: string;
    [key: string]: unknown;
  };
  price: number;
  stock: number;
  sale_price?: number;
  quantity?: number;
};

export function generateCartItem(item: Item) {
  console.log(item);
  const { _id, name, image, quantity, balance, price } = item;

  const id = _id;
  const stock = balance;

  return {
    id,
    name,
    price: Number(price.original),
    sale_price: Number(price.discount),
    stock,
    image: item?.image?.cover,
  };
}
