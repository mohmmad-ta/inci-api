const {Router} = require('express');
const router = Router();
const { createNews, deleteNews, getAllNews, resizeTourImages, getOneNews, uploadProductPhoto, updateNews} = require('../controllers/newsController')
const {protect, restrictTo} = require('../controllers/authController')


router.route('/')
    .get(getAllNews)
    .post(protect, restrictTo('admin'), uploadProductPhoto, resizeTourImages, createNews)

router.route('/:id')
    .get(getOneNews)
    .patch(protect, restrictTo('admin'), updateNews)
    .delete(protect, restrictTo('admin'), deleteNews)

module.exports = router;