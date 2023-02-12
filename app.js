const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { rawListeners } = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
//express app
const app = express();

//connection to db
const dbURI = 'mongodb+srv://net-ninja:test1234@cluster0.lawq5cp.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(result=> app.listen(3000))
    .catch(err => console.log(err));




//register for view engine
app.set('view engine','ejs');

//listen of request
//moved to mongoose.connect


//middleware
// app.use( (req,res,next) => {
//     console.log('new request made');
//     console.log('host :',req.hostname);
//     console.log('path :', req.path);
//     console.log('method :',req.method);
//     next();
// });

//middleware and static files css code is moved to styles.css in public folder
app.use(express.static('public'));
//req to get form data
app.use(express.urlencoded({extended:true}));
//third party middleware
app.use(morgan('dev'));
/*
//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res) =>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body:'more about my new blog'
    });
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err) => {
        console.log(err);   
    })
})

//to find all saved blogs
app.get('/all-blogs',(req,res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})

//to find single blog
app.get('/single-blog',(req,res) => {
    Blog.findById('63e362d16f831a227d2df167')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})
*/


app.get('/',(req,res) => {
    res.redirect('/blogs');
    /*const blogs = [
        {title : 'blog1', snippet : 'this is the blog 1'},
        {title : 'blog2', snippet : 'this is the blog 2'},
        {title : 'blog3', snippet : 'this is the blog 3'},
    ];
    res.render('index',{title : "Home",blogs});*/
})

app.get('/about',(req,res) => {
    res.render('about',{title : "About Page"})
})

//blog routes
app.use('/blogs',blogRoutes);
//redirects
// app.get('/about-us',(req,res) => {
//     res.redirect('./about');
// });

//404 error page
app.use((req,res) => {
    res.status(404).render('404', {title : "404"})
});