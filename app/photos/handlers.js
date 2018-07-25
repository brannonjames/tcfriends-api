const { Photo, Friend } = require('../config/database');

exports.addPhoto = async function(req, res, next){
	try {
		const friend = await Friend.findById(req.params.friend_id);

		const photo = {
			...req.file,
			friend: friend._id,
			creator: res.locals.user._id,
		} 
		
		if(process.env.NODE_ENV !== 'production'){
			photo.url = `http://localhost:3069/images/${req.file.originalname}`
		}

		console.log(photo);	
		const newPhoto = await Photo.create(photo);
		friend.media.photos.push(newPhoto);
		await friend.save();

		res.sendStatus(200);

	} catch(err) {
		next(err);
	}
}
