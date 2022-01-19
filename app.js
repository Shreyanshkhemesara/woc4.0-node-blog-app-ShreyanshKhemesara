const { render } = require('ejs');
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const multer = require('multer');
const URL = 'mongodb+srv://Anshu:1234@dejablogs.bksps.mongodb.net/DejaBlogs?retryWrites=true&w=majority'
const Blog = require('./models/blog');
//express app
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));
//setting view engine
app.set('view engine', 'ejs');
//listening for request:
app.get('/', (req, res)=>{
    res.redirect('/allBlogs');
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
 
var upload = multer({ storage: storage })

app.get('/allBlogs',(req, res)=>{
    console.log(__dirname)
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        // res.send(result);
        res.render('./index', {reports: result});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/allBlogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details', {report: result});
    })
    .catch(err=>{
        console.log(err);
    })
})

app.delete('/allBlogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/allBlogs'})
        // console.log('deleted')
    })
    .catch(err=>{console.log(err)})
})

app.get('/create-blog', (req, res)=>{
    res.render('create-blog')
})
/* post request ka 14 */
app.post('/blogs',upload.single('myImage'), (req, res) => {
    console.log(req.myImage.filename);
    var obj = {
        title: req.body.title,
        img: {
            data: fs.readFileSync(path.join(__dirname, '/public/uploads/' + req.myImage.filename)),
            contentType: 'image/png'
        },
        content: req.body.content,
    }
        console.log(obj.img.data);
        Blog.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
})

app.get('/technical', (req, res)=>{
    res.render('contact');
})