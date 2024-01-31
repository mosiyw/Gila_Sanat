export type ProductType = {
  response: {
    price: {
      original: number;
      discount: number;
    };
    image: {
      images: any[];
      cover: string;
    };
    dates: {
      createdAt: string;
      updatedAt: string;
    };
    _id: string;
    code: string;
    name: string;
    balance: number;
    isActive: boolean;
    category: any[];
    Specifications: any[];
    description: string;
    brand: string;
    totalSell: number;
  };
};

export type AddFavoriteProductType = {
  payload: { productId: string };
  response: {
    productId: string;
  };
};
