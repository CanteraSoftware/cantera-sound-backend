const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class FilesServices {
  // Create new file
  async create(data) {
    const newFiles = await models.Files.create({
      ...data,
    })
    return newFiles;
  }

  // Find all files
  async find() {
    const files = await models.Files.findAll();
    return files;
  }

  // Find file by ID
  async findOne(id) {
    const file = await models.Files.findByPk(id)
    return file;
  }

  // Update file by ID whit new changes
  // async update(id, changes) {
  //   const file = await this.findOne(id)
  //   const rta = await file.update(changes)
  //   return rta;
  // }

  // Delete file by ID
  // ATTENTION
  async delete(id) {
    const file = await this.findOne(id);
    await file.destroy();
    return { id };
  }
}

module.exports = FilesServices;