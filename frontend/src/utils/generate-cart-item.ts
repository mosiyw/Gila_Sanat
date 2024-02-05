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
  const { id, name, image, price, quantity, stock } = item;

  return {
    id,
    name,
    price,
    stock,
    image: item?.image?.cover,
  };
}
