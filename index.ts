import express from 'express';
import path from 'path';
import multer from 'multer';
import { Response } from 'express-serve-static-core';
import fs from 'fs';
import { JadiAnime } from 'jadianime-ts';
import axios from 'axios';

const app = express();
const port = 3000;
const upload = multer({
  dest: "./uploads"
});
const upload2 = multer()

app.get("/", express.static(path.join(__dirname, "./public")));
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post(
  "/jadianime",
  upload.single("image"),
  async (req, res) => {
    const tempPath = req?.file?.path ? req.file.path : "";
    const output = `./uploads/${Math.floor(Math.random() * 1000) + 1}.jpg`
    const targetPath = path.join(__dirname, output);
    const oriName = req?.file?.originalname ? req.file.originalname : "";
    if (path.extname(oriName).toLowerCase() === ".png" || path.extname(oriName).toLowerCase() === ".jpg" || path.extname(oriName).toLowerCase() === ".jpeg") {
      fs.rename(tempPath, targetPath, async (err: any) => {
        if (err) return handleError(err, res);
        try {
          let image = await JadiAnime(targetPath)
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
          if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath)
          let url: string = image.img;

          const response = await axios.request({
            url,
            timeout: 7000,
            responseType: 'arraybuffer',
          });

          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': response.data.length
          });

          res.end(response.data)
        } catch (e: any) {
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
          if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath)
          res.send(e.toString())
        }
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
)


app.listen(8080, () => {
  console.log(`Server started...`);
});

function handleError(err: any, res: Response<any, Record<string, any>, number>) {
  throw new Error('Function not implemented.');
}
