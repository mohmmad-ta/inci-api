const {Router} = require('express');
const {signup, login, logout} = require('./../controllers/authController');


const router = Router();
//  Authentication Controller
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);


module.exports = router;