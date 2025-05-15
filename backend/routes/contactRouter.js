const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route for submitting contact form
router.post('/submit', contactController.submitContact);

module.exports = router;