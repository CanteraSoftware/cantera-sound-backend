const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductServices {
  // Create new product
  async create(data) {
    const newProduct = await models.Product.create({
      ...data,
    })
    return newProduct;
  }

  // Find all products
  async find() {
    const products = await models.Product.findAll();
    return products;
  }

  // Find product by ID
  async findOne(id) {
    const product = await models.Product.findByPk(id)
    return product;
  }

  // Update product by ID whit new changes
  async update(id, changes) {
    const product = await this.findOne(id)
    const rta = await product.update(changes)
    return rta;
  }

  // Delete product by ID
  // ATTENTION
  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductServices;