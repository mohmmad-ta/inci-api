const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'A product must have a name'],
        },
        description: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: [true, 'A product must have a cover image']
        },
        createAt:{
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);



module.exports = mongoose.model('News', newsSchema);