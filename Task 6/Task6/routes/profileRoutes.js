const express = require('express');
const router = express.Router();
const profile = require('../controllers/zakirController');

router.get("/profile", profile.render_profile);
// router.get("/profile/:id", profile.)

// for Signup Form submission: 
router.post("/profile", profile.create_profile);

module.exports = router;