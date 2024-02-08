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
  const { _id, name, image, price, quantity, balance } = item;

  const id = _id;
  const stock = balance;

  return {
    id,
    name,
    price,
    stock,
    image: item?.image?.cover,
  };
}

// type Item = {
//   id: string | number;
//   name: string;
//   image?: {
//     cover: string;
//     [key: string]: unknown;
//   };
//   price: number;
//   stock: number;
//   sale_price?: number;
//   quantity?: number;
// };

// export function generateCartItem(item: Item) {
//   const { _id, name, image, price, quantity, balance } = item;
//   const id = _id;
//   const stock = balance;
//   return {
//     id,
//     name,
//     price,
//     stock,
//     image: item?.image?.cover,
//   };
// }
