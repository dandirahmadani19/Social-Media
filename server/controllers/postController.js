import postMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPostMessage = async (req, res, next) => {
  try {
    const postMessages = await postMessage.find().sort({createdAt: -1});


    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPostMessage = async (req, res, next) => {
    const post = req.body;
    post.createdAt = new Date();
    // console.log(post);
    const newPost = new postMessage(post)
    
    try {
      await newPost.save()
      res.status(201).json(newPost)
  } catch (error) {
    console.log(error);
    res.status(409).json({message: error.message})
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const post = req.body;
  post.createdAt = new Date();

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
  // console.log(id);
  try {
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true })
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(409).json({message: error.message})
    
  }
}

export const deletePost = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

  try {
    await postMessage.findByIdAndRemove(id);
    res.status(200).json({ message: "Delete Post Successfully" })
  } catch (error) {
    res.status(409).json({message: error.message})  
  }
}

export const likePost = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

  try {
    const post = await postMessage.findById(id);
    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(409).json({message: error.message})
    
  }
}
