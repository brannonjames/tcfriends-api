const db = require('../config/database');
const {Photo} = db;


module.exports = {
	getPhotos: async function(req, res){
		try {
			let photos = await Friend.find()
			if (!photos) throw new Error("No photos found");
			res.json(photos);
		} catch(err){
			console.log(err);
		}
	},
	addPhoto: async function(req, res){
		try {
			let newPhoto = await Photo.create(req.body);
			res.json(newPhoto);
		} catch(err){
			res.send(err.message);
		}
	},

	getPhoto: async function(req, res){
		try {
			let photo = await Photo.findById(req.params.photo_id);
			res.json(photo);
		} catch(err) {
			err.name === "CastError" ? 
				res.send("Couldn't find that particular page...") :
				res.send("Something went wrong...");
		}
	}
}