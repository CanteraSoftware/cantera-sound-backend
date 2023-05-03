import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const { config } = require("./config/config");

const client = new S3Client({
  region: config.bucketRegion,
  credentials: {
    accessKeyId: config.publicKey,
    secretAccessKey: config.secretKey,
  },
});

export async function uploadFile(file) {
  const stream = fs.createReadStream(file);
  const uploadParams = {
    Bucket: config.bucketName,
    Key: "hola.png",
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  const result = await client.send(command);
  console.log(result);
}
