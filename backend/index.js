import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const port = process.env.PORT || 3000;
const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }
));

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.get("/api/upload", (req, res) => {
  const result=imagekit.getAuthenticationParameters();
  res.send(result);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
