const multer = require('multer');// middleware store image in server



// Upload image
const storage = multer.diskStorage({ // where should store the uploded image
    destination: function(req, file, cb) {
      cb(null, './uplodes');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
  });
  const upload = multer({storage: storage}).single('image'); //
  module.exports = upload;
