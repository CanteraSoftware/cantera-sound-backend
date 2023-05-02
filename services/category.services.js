const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryServices {
  // Create new category
  async create(data) {
    const newCategory = await models.category.create({
      ...data,
    })
    return newCategory;
  }

  // Find all categories
  async find() {
    const categories = await models.category.findAll();
    return categories;
  }

  // Find category by ID
  async findOne(id) {
    const category = await models.category.findByPk(id)
    return category;
  }

  // Update category by ID whit new changes
  async update(id, changes) {
    const category = await this.findOne(id)
    const rta = await category.update(changes)
    return rta;
  }

  // Delete category by ID
  // ATTENTION
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryServices;