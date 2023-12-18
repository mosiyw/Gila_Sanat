const Category = require("../models/Category");

class CategoryService {
  async getAllCategories() {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      console.error("Error in getAllCategories:", error.message); // Log the error message
      throw error; // Re-throw the error to propagate it
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await Category.findById(categoryId);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      const category = new Category(categoryData);
      await category.save();
      return category;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(categoryId, updatedData) {
    try {
      const category = await Category.findByIdAndUpdate(
        categoryId,
        updatedData,
        {
          new: true,
        }
      );
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(categoryId) {
    try {
      await Category.findByIdAndDelete(categoryId);
    } catch (error) {
      throw error;
    }
  }

  // Add more methods as needed for category search, filtering, etc.
}

module.exports = new CategoryService();
