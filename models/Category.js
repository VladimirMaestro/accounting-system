const mongoose = require('mongoose')    // connect mongoose
const Schema = mongoose.Schema          // Schema method in mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
        //  unique: true
    },
    imageSrc: {
        type: String,
        //  required: true,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('categories', categorySchema);