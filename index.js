require('dotenv').config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

const friendRoutes = require('./app/friends');
const userRoutes = require('./app/users');
const photoRoutes = require('./app/photos');
const shelterRoutes = require('./app/shelters');
const {errorHandler} = require('./app/error');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production'){
	app.use(express.static('public'));
}


app.use('/api/users/', userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/shelters', shelterRoutes);

app.use(function(req, res, next){
	let error = new Error('Page not found');
	error.state = 404;
	next(error);
});

app.use(errorHandler);


app.listen(process.env.PORT || 3001, () => {
	console.log(`server is running on port ${PORT}`);
});
