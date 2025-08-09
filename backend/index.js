import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { clerkMiddleware } from "@clerk/express";
import { requireAuth } from "@clerk/express";
import { getAuth } from "@clerk/express";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get("/api/test",requireAuth(), (req, res) => {
  try {
    const auth = getAuth(req);

    if (auth.userId) {
      console.log("✅ User is authenticated:", auth.userId);
      res.json({
        message: "Authenticated user",
        userId: auth.userId,
        sessionId: auth.sessionId,
      });
    } else {
      console.log("ℹ️ User is not authenticated - anonymous access");
      res.json({ message: "Anonymous user - backend connection working!" });
    }
  } catch (error) {
    console.error("❌ Auth check error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.post("/api/chats", async (req, res) => {
  const { userId, text } = req.body;

  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });

    const savedChat = await newChat.save();

    // CHECK IF USERCHATS EXISTS
    const userChats = await UserChats.find({ userId: userId });
    if (!userChats.length) {
      // CREATE USERCHATS IF NOT EXISTS
      const newUserChats = new UserChats({
        userId: userId,
        chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
      });
      await newUserChats.save();
    } else {
      // IF EXISTS, ADD CHAT TO USERCHATS
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: { _id: savedChat._id, title: text.substring(0, 40) },
          },
        }
      );

      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.error("Error in /api/chats:", error);
    res.status(500).send("Internal Server Error|Error in /api/chats");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
