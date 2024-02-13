import { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";

function ProductList({ products, multiSelect }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductClick = (product) => {
    if (multiSelect) {
      if (selectedProducts.includes(product._id)) {
        setSelectedProducts(selectedProducts.filter((id) => id !== product._id));
      } else {
        setSelectedProducts([...selectedProducts, product._id]);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      {products?.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={4} xl={3}>
          <ShopProductCard
            product={product}
            selected={multiSelect && selectedProducts.includes(product._id)}
            onClick={() => handleProductClick(product)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
  multiSelect: PropTypes.bool,
};

export default ProductList;
