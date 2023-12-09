import express from 'express';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const port=3000;
//Template Engine
app.set("view engine", "ejs");
//middleware
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render('index');
});
app.get("/about",(req,res)=>{
    res.render('about');
});
app.get("/add_post",(req,res)=>{
    res.render('add_post');
});
app.get("/post",(req,res)=>{
    res.render('post');
});


app.listen(port,(req,res)=>{
    console.log(`server ${port} portunda baslatildi`);

});