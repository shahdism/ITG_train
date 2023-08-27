const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const fs = require('fs'); // file system
const validationUtils = require('../utils/validation');
const upload = require('../utils/addimg.js'); // Adjust the path based on your project structure


// Upload to database
router.post('/add', upload, async (req, res) => {
  try {
    const errors = validationUtils.validateUserInput(req.body); // Validate the user input data that was sent in the request's body
    if (Object.keys(errors).length > 0) {
      // Render the view with errors and form data
      return res.status(400).json({ 
        message: 'Validation failed. Please check the form for errors.',
        errors: errors 
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    await user.save();
    
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

// form page
router.get('/add', (req, res) => {
  res.render('add_users', {
    title: 'Add User',
    errors: {}, // Pass an empty errors object
  });
});

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndRemove(id);

    if (user) {
      if (user.image !== '') {
        try {
          fs.unlinkSync('./uplodes/' + user.image); 
          //console.log(`Deleted image: ${user.image}`);
        } catch (err) {
          console.error(`Error deleting image: ${err}`);
        }
      }
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error(`Error deleting user: ${err}`);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});


module.exports = router; // Fix the typo in "exports"


