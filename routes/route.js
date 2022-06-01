const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const eventController = require('../controller/event.controller');

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.post('/event', eventController.createEvent);

router.get('/shedules', eventController.getSchedules); 

module.exports = router; 