const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

let storage;

if(process.env.NODE_ENV === 'PROD'){
  console.log('production');
  storage = cloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png'],
    filename: function(req, file, cb){
      cb(null, file.fieldname + '.jpg');
    }
  });
} else {
  storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'public/images');
    },
    filename: function(req, file, cb){
      cb(null, file.originalname);
    }
  })
}




module.exports = multer({ storage });