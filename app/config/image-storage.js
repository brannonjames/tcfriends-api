const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

let storage;

// if(process.env.NODE_ENV === 'production'){
  // console.log('production');
  storage = cloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png'],
    filename: function(req, file, cb){
      cb(null, file.fieldname + '.jpg');
      console.log(file);
    }
  });
// } else {

// }




module.exports = multer({ storage });