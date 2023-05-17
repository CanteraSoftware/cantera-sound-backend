// Import framework for Node.js
const express = require("express");
// Import the configuration of the db
const { config, pool } = require("../config/config");
// Import the logic of manipulate of files
const FilesService = require("../services/files.services");

// Import validators of datas
const { createFilesSchema, getFilesSchema } = require("../schemas/files.schema");

// Import middleware for validate dates in rutes
const validatorHandler = require("../middlewares/validator.handler");
// Create new instance enruter
const router = express.Router();
// Create a instance for use metteds
const service = new FilesService();

// Get all files
router.get("/upload", async (req, res) => {
  const result = await service.getFiles();
  // result.Contents.forEach(e => {
  //   console.log(e.Key)
  // });
  res.json(result.Contents);
});

// Get all files date of db
router.get("/", async (req, res, next) => {
  try {
    const file = await service.find();
    // Call all file and transform to JSON
    res.json(file);
  } catch (error) {
    next(error);
  }
});

router.get("/:id",
// Validate send datas
  validatorHandler(getFilesSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = await service.findOne(id);
      // Call specific file by ID and transform to JSON
      res.json(file);
    } catch (error) {
      next(error);
    }
  }
);

// Handler of post files
router.post(
  "/upload",
  // Validate send datas
  validatorHandler(createFilesSchema, "body"),
  async (req, res, next) => {
    try {
      // Default image formats
      const imageFormat = ["jpeg", "png"];
      // Default video formats
      const musicFormat = ["mpeg", "mp4", "aac", "ogg"];
      
      // Format error images to format files
      const commaSeparator = (format) => `${format.slice(0, format.length - 1).join(", ")} or ${format[format.length - 1]}`;
      // Set name status of simple acces
      const errorStatus = {
        conflict: "Conflict",
        notAcceptable: "Not Acceptable",
        notFound: "Not Found",
      };
      // Set name messges of simple acces
      const errorMessage = {
        conflictRows: "Conflict with same name rows",
        urlTooLong: "Url longer than expected",
        fileTooBig: "File is very big. Send a smaller image or compress the file",
        invalidImageType: `This file must be of type ${commaSeparator(imageFormat)}`,
        invalidVideoType: `This file must be of type ${commaSeparator(musicFormat)}`,
        unknownFileType: "Unknown file type. Send a file of a different type",
        notFound: "File not found",
      };
      // Create a JSON from data sent
      const returnError = (statusCode, error, message) => {
        return res.status(statusCode).json({
          statusCode,
          error,
          message,
        });
      };

      // Require body of the user
      const body = req.body;
      // Select name and url of file and find if this name be repite
      const results = await pool.query(
        'SELECT "nameFile", "fileUrl" FROM files;'
      );
      // Find any same values
      const validatorConcidences = (rowFilter, nameFilter, key) =>
        rowFilter.some((row) => row[key] === nameFilter);
      // If there is a match return error
      if (validatorConcidences(results.rows, body.nameFile, "nameFile") ||
        validatorConcidences(results.rows, body.fileUrl, "fileUrl")) {
        return returnError(
          409,
          errorStatus.conflict,
          errorMessage.conflictRows
        );
      }

      // Get data and convert to JSON
      const files = JSON.parse(JSON.stringify(req.files));
      // Unpacking values
      const { name, size, mimetype } = files.file || files.fileUrl;
      // Create a temporal URL for advoid errors
      const url = `https://${config.bucketName}.s3.${config.bucketRegion}.amazonaws.com/${name}`;

      // Define the limit of size in Kilobytes
      const sizeLimit = 9000;
      // Return if a object is valid
      const fileFilter = (file) => {
        // Get type file
        const format = file.split("/");

        // If is valid return true, else return unknown
        return format[0] === "image"
          ? { image: imageFormat.includes(format[1]) }
          : format[0] === "video"
          ? { video: musicFormat.includes(format[1]) }
          : { unknown: true };
      };

      // Verificate if the URL long is valid
      if (url.length > 95) {
        return returnError(
          406,
          errorStatus.notAcceptable,
          errorMessage.urlTooLong
        );
      }
      // Verificate if the file size is valid
      if ((size / 1024).toFixed(2) > sizeLimit) {
        return returnError(
          406,
          errorStatus.notAcceptable,
          errorMessage.fileTooBig
        );
      }

      // Verificate if file tupe is valid, else send error
      const filterResult = fileFilter(mimetype);
      if (filterResult.image !== undefined && !filterResult.image) {
        return returnError(
          406,
          errorStatus.notAcceptable,
          errorMessage.invalidImageType
        );
      } else if (filterResult.video !== undefined && !filterResult.video) {
        return returnError(406, errorStatus.notAcceptable, errorMessage.video);
      } else if (filterResult.unknown) {
        return returnError(
          406,
          errorStatus.notAcceptable,
          errorMessage.unknownFileType
        );
      }

      const downloadFile = async (fileName) => {
        try {
          // Verificate if the file upload correctly
          const file = await service.getFile(fileName);
          if (!file) {
            // If not do, return error
            return returnError(
              404,
              errorStatus.notFound,
              errorMessage.notFound
            );
          }
          // Download file for get data and send to DB
          const fileUrl = await service.downloadFile(fileName);
          return fileUrl;
        } catch (error) {
          next(error);
        }
      };
      // Upload file to AWS
      const fileUpload = await service.uploadFile(tempFilePath, name);
      // fileUpload.$metadata.requestId have a innuque Id, possible finale of url
      // Get URL
      const signedUrl = await downloadFile(name);

      // Create new file
      const file = await service.create({
        ...body,
        fileUrl: url,
      });
      // Set status "created" in JSON
      res.status(201).json(file);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id",
// Validate send datas
  validatorHandler(getFilesSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete file by ID
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
