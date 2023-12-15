import Post from "../models/Post.js";
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-dateCreated");
    res.render("index", { posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.render("post", { post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createPost = async (req, res) => {
  console.log("Received POST request for /add_post");
  try {
    const { title, detail } = req.body;
    await Post.create({ title, detail });
    console.log("Post created successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      // Post not found
      return res.status(404).send("Post not found");
    }

    post.title = req.body.title;
    post.detail = req.body.detail;

    await post.save();

    res.redirect(`/post/${req.params.id}`);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    console.log("deleted");
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Internal Server Error");
  }
};
