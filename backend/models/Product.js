const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
  name: String,
  code: String, // Added "code" field
  balance: Number, // Added "balance" field
  description: String,
  category: Array, // Corrected "category" field name
  brand: String,
  price: {
    original: Number,
    discount: Number,
  },
  image: {
    cover: String,
    images: Array,
  },
  isActive: Boolean,
  totalSell: Number, // Added "totalsell" field
  Specifications: Array, // Note: Consider renaming "Specifications" to "specifications" for consistency
  dates: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
