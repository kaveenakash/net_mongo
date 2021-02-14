const express = require("express");
const mongoose = require("mongoose");
const Blog = require('./models/blog')

//express app
const app = express();

//register view engine
app.set('view engine','ejs')



//connect to mongodb
const dbURI =
  "mongodb+srv://netninja:test1234@nodetuts.pbcpl.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
    const blogs = [
        {title:'Yoshi finds eggs',snippet:'Lorem ipsum dolor sit amet consectrir'},
        {title:'Mario find stars',snippet:'Lorem ipsum dolor sit amet consectrir'},
        {title:'How to defeat browser',snippet:'Lorem ipsum dolor sit amet consectrir'}
    ]
  res.render('index',{title:'Home',blogs});
});

app.get("/about", (req, res) => {
  res.render('about',{title:'About'});
});

app.get('/blogs/create',(req,res) =>{
    res.render('create',{title:'Create'})
})

// 404 page
app.use((req,res) =>{
    res.status(404).render('404',{title:404});
})






 
app.get('/add-blog',(req,res) =>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) => console.log(err)) 
})

app.get('/all-blogs',(req,res) =>{
    Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

app.get('/single-blog',(req,res) =>{
    Blog.findById('60295012ca16cb5cce9a6e5e')
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})



app.get('/blogs',(req,res) =>{
    Blog.find().sort({createdAt:-1})
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})