import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import Post from './models/Post.js'; // No need for the file extension


const app=express();
const port=3000;

//conect database
mongoose.connect('mongodb://localhost/cleanblog-test-db');
//Template Engine
app.set("view engine", "ejs");
//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//routes
app.get('/', async (req, res) => {
    try {
      const posts = await Post.find();
      res.render('index', { posts });  
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.get("/post/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('post', { post }); // Pass the 'post' object to the template
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get("/about",(req,res)=>{
    res.render('about');
});
app.get("/add_post", (req, res) => {
    res.render('add_post');
});

app.post("/add_post", async (req, res) => {
    console.log('Received POST request for /add_post');
    try {
        const { title, detail } = req.body;
        await Post.create({ title, detail });
        console.log('Post created successfully');
        res.redirect('/');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get("/post",(req,res)=>{
    res.render('post');
});


app.listen(port,(req,res)=>{
    console.log(`server ${port} portunda baslatildi`);

});