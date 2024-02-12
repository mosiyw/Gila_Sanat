const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    balance: Number,
    description: String,
    category: Array,
    brand: String,
    labels: Array,
    price: {
      original: Number,
      discount: Number,
    },
    image: {
      cover: String,
      images: Array,
    },
    isActive: Boolean,
    totalSell: Number,
    Specifications: Array,
  },
  {
    timestamps: true, // Add this line
  }
);

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
