const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoriesServices {
  // Create new category
  async create(data) {
    const newCategories = await models.Categories.create({
      ...data,
    })
    return newCategories;
  }

  // Find all categories
  async find() {
    const categories = await models.Categories.findAll();
    return categories;
  }

  // Find category by ID                                   

  // Update category by ID whit new changes
  // async update(id, changes) {
  //   const category = await this.findOne(id)
  //   const rta = await category.update(changes)
  //   return rta;
  // }

  // Delete category by ID
  // ATTENTION
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoriesServices;