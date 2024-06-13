import mongoose from "mongoose";
import Post, { Comment } from "../models/Post.js";
import { v4 as uuidv4 } from "uuid";

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post." });
  }
};

export const editPost = async (req, res) => {
  const uid = req.user.uid;

  const { title, body, _id } = req.body;

  try {
    const updatedPost = await Post.findById(_id);

    if (!updatedPost)
      return res
        .status(404)
        .json({ message: "Failed to update post: Post not found." });
    if (uid !== updatedPost.author) {
      return res
        .status(500)
        .json({ message: "Failed to update post: User is not the author." });
    }

    updatedPost.title = title;
    updatedPost.body = body;
    updatedPost.updated = new Date();

    await updatedPost.save();

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: "Failed to update post: Internal error." });
  }
};

export const deletePost = async (req, res) => {
  const uid = req.user.uid;
  req.params.id;

  const _id = req.params.id;

  try {
    const updatedPost = await Post.findById(_id);

    if (!updatedPost)
      return res
        .status(404)
        .json({ message: "Failed to delete post: Post not found." });
    if (uid !== updatedPost.author) {
      return res
        .status(500)
        .json({ message: "Failed to delete post: User is not the author." });
    }

    await Post.findByIdAndDelete(_id);

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: "Failed to update post: Internal error." });
  }
};

export const addPost = async (req, res) => {
  const uid = req.user.uid;
  try {
    const { title, body } = req.body;
    const newPost = new Post({ author: uid, title, body });
    const result = await newPost.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

export const addComment = async (req, res) => {
  const uid = req.user.uid;
  const id = req.params.id;
  const { body } = req.body;

  const newComment: Comment = {
    _id: uuidv4(),
    body,
    author: uid,
    date: new Date(),
  };

  try {
    const updatedPost = await Post.findById(id);

    if (!updatedPost)
      return res
        .status(404)
        .json({ message: "Failed to add comment: Post not found." });
    updatedPost.comments.push(newComment);

    await updatedPost.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment: Internal error." });
  }
};

export const editComment = async (req, res) => {
  const uid = req.user.uid;
  const postID = req.params.id;
  const _id = req.params.commentID;
  const { body } = req.body;

  try {
    const updatedPost = await Post.findById(postID);

    if (!updatedPost)
      return res
        .status(404)
        .json({ message: "Failed to edit comment: Post not found." });
    const editedComment = updatedPost.comments.find((c) => c._id === _id);
    if (!editedComment)
      return res
        .status(404)
        .json({ message: "Failed to edit comment: Comment not found." });
    if (editedComment.author !== uid)
      return res
        .status(500)
        .json({ message: "Failed to edit comment: User is not the author." });

    editedComment.body = body;
    editedComment.updated = new Date();

    const response = await Post.updateOne(
      { _id: postID, "comments._id": _id },
      { $set: { "comments.$": editedComment } }
    );

    const newPost = await Post.findById(postID);

    res.status(200).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to edit comment: Internal error." });
  }
};
export const deleteComment = async (req, res) => {
  const uid = req.user.uid;
  const postID = req.params.id;
  const _id = req.params.commentID;

  try {
    const updatedPost = await Post.findById(postID);

    if (!updatedPost)
      return res
        .status(404)
        .json({ message: "Failed to delete comment: Post not found." });
    const editedComment = updatedPost.comments.find((c) => c._id === _id);
    if (!editedComment)
      return res
        .status(404)
        .json({ message: "Failed to edit comment: Comment not found." });
    if (editedComment.author !== uid)
      return res
        .status(500)
        .json({ message: "Failed to edit comment: User is not the author." });

    const response = await Post.updateOne(
      { _id: postID },
      { $pull: { comments: { _id } } }
    );

    const newPost = await Post.findById(postID);

    res.status(200).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to edit comment: Internal error." });
  }
};
