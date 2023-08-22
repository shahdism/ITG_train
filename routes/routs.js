const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');// middleware store image in server
const fs = require('fs'); // file system
const validationUtils = require('../utils/validation');


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


// Upload to database
router.post('/add', upload, async (req, res) => {
  try {
    const errors = validationUtils.validateUserInput(req.body); // Validate the user input data that was sent in the request's body
    if (Object.keys(errors).length > 0) {
      // Render the view with errors and form data
      return res.render('add_users', {
        title: 'Add User',
        errors: errors,
        formData: req.body,
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    await user.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).json({message: 'An error occurred while processing your request.'});
  }
});



// get users from the database
router.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.render('index', {
      title: 'Home',
      users: users,
    });
  } catch (err) {
    res.json({message: err.message});
  }
});
router.get('/add', (req, res) => {
  res.render('add_users', {
    title: 'Add User',
    errors: {}, // Pass an empty errors object
  });
});


router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndRemove(id);

    if (result.image !== '') {
      try {
        fs.unlinkSync('./uplodes/' + result.image);
      } catch (err) { // if there is an image , delete it from uplodes
        console.log(err);
      }
    }

    req.session.message = {
      type: 'info',
      message: 'User deleted successfully',
    };
    res.redirect('/');
  } catch (err) {
    res.json({message: err.message});
  }
});


module.exports = router; // Fix the typo in "exports"


