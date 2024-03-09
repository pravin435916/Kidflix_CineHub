const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAdmin = require('../middleware/admin');
const {getUsers,deleteUserById} = require('../controllers/adminController')

router.get('/users',getUsers)
router.delete('/users/:id',isAdmin,deleteUserById)

module.exports = router;