const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer');

require('dotenv').config();
//APP CONFIG
//connect to local mongoDB database
// mongoose.connect('mongodb://localhost/simple_blog', { useNewUrlParser: true, useUnifiedTopology: true });

//connect to mongoDB atlas
mongoose
	.connect(
		'mongodb+srv://' +
			process.env.DB_USER +
			':' +
			process.env.DB_PASS +
			'@cluster0.h6euj.mongodb.net/' +
			process.env.DB_NAME +
			'?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		}
	)
	.then(() => {
		console.log('Connected to DB!');
	})
	.catch((err) => {
		console.log(err.message);
	});

mongoose.set('useFindAndModify', false);

app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	dateCreated: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

//RESTFUL ROUTES
app.get('/', function(req, res) {
	res.redirect('/blogs');
});

//INDEX Route
app.get('/blogs', function(req, res) {
	//get all blogs from DB
	Blog.find({}, function(err, allBlogsFromDB) {
		if (err) {
			console.log('Error');
		} else {
			res.render('index', { blogs: allBlogsFromDB });
		}
	});
});

//NEW ROUTE
app.get('/blogs/new', function(req, res) {
	res.render('new');
});

//CREATE ROUTE
app.post('/blogs', function(req, res) {
	//create blog, sanitize input
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) {
			res.render('new');
		} else {
			//then, redirect to the index
			res.redirect('/blogs');
		}
	});
});

//SHOW ROUTE
app.get('/blogs/:id', function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			//render show template with that blog
			res.render('show', { blog: foundBlog });
		}
	});
});

//EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			//render edit template with that blog
			res.render('edit', { blog: foundBlog });
		}
	});
});

//UPDATE ROUTE
app.put('/blogs/:id', function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// Blog.findByIdAndUpdate(id, newData, callback)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

//DELETE ROUTE
app.delete('/blogs/:id', function(req, res) {
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
	//redirect somewhere
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Our app is running on port ${PORT}`);
});
