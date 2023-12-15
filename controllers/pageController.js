import Post from "../models/Post.js";

export const getAboutPage = (req, res) => {
  res.render("about");
};

export const getAddPage = (req, res) => {
  res.render("add_post");
};

export const getEditPage = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.render("edit", {
      post,
    });
  } catch (error) {
    console.error("Error fetching post for editing:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const getPostPage = (req, res) => {
  res.render("post");
};
