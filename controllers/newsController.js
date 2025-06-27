const News = require('../models/newsModel');
const factory = require('./handlerFactory');
const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require('./../utils/catchAsync');
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadProductPhoto = upload.fields([
    {name: 'image', maxCount: 1},
])
exports.resizeTourImages = catchAsync(async (req, res, next) => {
    if (!req.files.image ) return next();
    // 1) Cover image
    req.body.image = `${req.protocol}://${req.get('host')}/public/images/news/${Date.now()}-${req.files.image.fieldname}.jpeg`;
    const nameImage = `${Date.now()}-${req.params.id}.jpeg`;
    console.log(req.body.image)
    await sharp(req.files.image[0].buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 100 })
        .toFile(`public/images/news/${nameImage}`);

    next();
});


exports.getAllNews = factory.getAll(News);
exports.getOneNews = factory.getOne(News);
exports.createNews = factory.createOne(News);
exports.updateNews = factory.updateOne(News);
exports.deleteNews = factory.deleteOne(News);

