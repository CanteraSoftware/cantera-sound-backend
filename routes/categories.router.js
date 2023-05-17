// Import framework for Node.js
const express = require("express");
// Import the logic of manipulate of categories
const CategoriesService = require("../services/categories.services");
// Import validators of datas
const { createCategoriesSchema, getCategoriesSchema } = require("../schemas/categories.schema");
// Import middleware for validate dates in rutes
const validatorHandler = require("../middlewares/validator.handler");
// Import object for consult to DB
const { pool } = require("./../config/config");
// Create new instance enruter
const router = express.Router();
// Create a instance for use metteds
const service = new CategoriesService();
// Get all categories date of db
router.get("/", async (req, res, next) => {
  try {
    const category = await service.find();
    // Call all category and transform to JSON
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get("/:id",
// Validate send datas
  validatorHandler(getCategoriesSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      // Call specific category by ID and transform to JSON
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  // Validate send datas
  validatorHandler(createCategoriesSchema, "body"),
  async (req, res, next) => {
    try {
      // Require body of the user
      const body = req.body;
      // Select a category name and find if this name be repite
      const results = await pool.query('SELECT "nameCategory" FROM categories');
      // Find any same values
      const validatorConcidences = (rowFilter, nameFilter) =>
        rowFilter.some((row) => row.nameCategory === nameFilter);
        // If there is a match return error
      if (validatorConcidences(results.rows, body.nameCategory)) {
        return res.status(409).json({
          statusCode: 409,
          error: "Conflict",
          message: "Conflict with same name rows",
        });
      }
      // Create new category
      const newCategory = await service.create(body);
      // Set status "created" in JSON
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/file",
// Validate send datas
  validatorHandler(createCategoriesSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new category
      const newCategory = await service.create(body);
      // Set status "created" in JSON
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

// router.patch('/:id',
//   validatorHandler(getCategoriesSchema, 'params'),
//   validatorHandler(updateCategoriesSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       // Update category by ID
//       const category = await service.update(id, body);
//       res.json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// )

router.delete("/:id",
// Validate send datas
  validatorHandler(getCategoriesSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete category by ID
      await service.delete(id);
      // Set status "ok" in JSON
      res.status(200).json({ id });
    } catch (error) {
      next(error);
      return res.status(404).json({
        statusCode: 404,
        error: "Not Found",
        message: "Error, the id is invalidate. Send again id of a different",
      });
    }
  }
);

// Export router for used elsewhere
module.exports = router;
