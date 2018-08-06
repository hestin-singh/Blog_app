const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/restful_blog_app")
 //App Config
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//Mongo config
const blogSchema = new mongoose.Schema({
    title : String,
    image: String,
    body : String,
    created:  {type :Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title:"Rocky",
//     image:"https://www.photosforclass.com/download/flickr-323073628",
//     body:"Hey buddy this is Rocky. An amazing friend with whom yo can have lots of fun",
   
// })

// RESTFUL ROUTES
app.get('/',(req,res)=>{
    res.redirect('/blogs');
})
app.get('/blogs', (req, res)=>{
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('index.ejs',{blogs:blogs})
        }
    })
    
});
app.get('/blogs/new',(req,res)=>{
 res.render('new.ejs')
});

app.post('/blogs',(req,res)=>{
    // var title = req.body.title;
    // var image = req.body.image;
    // var body = req.body.body;
    // var newB ={ title:title, image:image, body:body}
     Blog.create(req.body.blog,(err,newBlog)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/blogs');
        }
    })
})

app.get('/blogs/:id',(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            res.redirect('/blogs')
        }
        else{
            res.render("show.ejs",{blog: foundBlog})
        }
    })
})

app.get('/blogs/:id/edit',(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("edit.ejs",{blog:foundBlog});
        }
    })
})

app.put('/blogs/:id',(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog,(err,updateBlog)=>{
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/"+ req.params.id );
        }
    })
     
})
app.delete('/blogs/:id',(req,res)=>{
    Blog.findByIdAndRemove(req.params.id,(err,update)=>{
        if(err){
            res.redirect('/blogs');
        }
        else{
            res.redirect('/blogs')
        }
    })
    // res.send("deleted");
})
app.listen(8080,()=>{
    console.log('App is running at port http://localhost/8080');
})