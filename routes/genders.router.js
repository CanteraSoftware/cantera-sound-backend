// Import framework for Node.js
const express = require("express");
// Import the logic of manipulate of genders
const GendersService = require("../services/genders.services");
// Import validators of datas
const { createGendersSchema, getGendersSchema } = require("../schemas/genders.schema");
// Import middleware for validate dates in rutes
const validatorHandler = require("../middlewares/validator.handler");
// Import object for consult to DB
const { pool } = require("./../config/config");
// Create new instance enruter
const router = express.Router();
// Create a instance for use metteds
const service = new GendersService();
// Get all genders date of db
router.get("/", async (req, res, next) => {
  try {
    const gender = await service.find();
    // Call all gender and transform to JSON
    res.json(gender);
  } catch (error) {
    next(error);
  }
});

router.get("/:id",
// Validate send datas
  validatorHandler(getGendersSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const gender = await service.findOne(id);
      // Call specific gender by ID and transform to JSON
      res.json(gender);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  // Validate send datas
  validatorHandler(createGendersSchema, "body"),
  async (req, res, next) => {
    try {
      // Require body of the user
      const body = req.body;
      // Select a gender name and find if this name be repite
      const results = await pool.query('SELECT "nameGender" FROM genders');
      // Find any same values
      const validatorConcidences = (rowFilter, nameFilter) =>
        rowFilter.some((row) => row.nameGender === nameFilter);
        // If there is a match return error
      if (validatorConcidences(results.rows, body.nameGender)) {
        return res.status(409).json({
          statusCode: 409,
          error: "Conflict",
          message: "Conflict with same name rows",
        });
      }
      // Create new gender
      const newGender = await service.create(body);
      // Set status "created" in JSON
      res.status(201).json(newGender);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/file",
// Validate send datas
  validatorHandler(createGendersSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new gender
      const newCategory = await service.create(body);
      // Set status "created" in JSON
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

// router.patch('/:id',
//   validatorHandler(getGendersSchema, 'params'),
//   validatorHandler(updateGendersSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       // Update gender by ID
//       const gender = await service.update(id, body);
//       res.json(gender);
//     } catch (error) {
//       next(error);
//     }
//   }
// )

router.delete("/:id",
// Validate send datas
  validatorHandler(getGendersSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete gender by ID
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
