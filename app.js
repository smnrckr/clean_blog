import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import {
    getAllPosts,
    getPost,
    createPost,
    editPost,
    deletePost,
  } from "./controllers/postController.js";
import { 
    getAboutPage,
    getAddPage,
    getEditPage,
    getPostPage,

} from "./controllers/pageController.js";

const app = express();
const port = 3000;

//conect database
mongoose.connect("mongodb://localhost/cleanblog-test-db");
//Template Engine
app.set("view engine", "ejs");
//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//routes
app.get("/", getAllPosts);
app.get("/post/:id", getPost);
app.post("/add_post", createPost);
app.put("/posts/:id", editPost);
app.delete("/posts/:id", deletePost);
app.get("/about", getAboutPage);
app.get("/add_post", getAddPage);
app.get("/posts/edit/:id", getEditPage);
app.get("/post", getPostPage);

app.listen(port, (req, res) => {
  console.log(`server ${port} portunda baslatildi`);
});
