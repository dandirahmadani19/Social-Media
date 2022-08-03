import express from "express";
import {
  getPostMessage,
  createPostMessage,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postController.js";
const postRouter = express.Router();

postRouter.get("/", getPostMessage);
postRouter.post("/", createPostMessage);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.patch("/:id/likePost", likePost);

export default postRouter;
