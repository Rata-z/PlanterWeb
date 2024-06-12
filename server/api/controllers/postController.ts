import Post from "../models/Post.js";

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

export const addPost = async (req, res) => {
  try {
    const { title, body, author } = req.body;
    const newPost = new Post({ author, title, body });
    const result = await newPost.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
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
