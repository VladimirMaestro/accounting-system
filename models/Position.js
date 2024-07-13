const mongoose = require('mongoose')    // connect mongoose
const Schema = mongoose.Schema          // Schema method in mongoose
const positionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('positions', positionSchema)