const mongoose = require('mongoose')    // connect mongoose
const Schema = mongoose.Schema          // Schema method in mongoose

// const orderListSchema = new Schema({
//     name: {
//         type: String
//        // required: true,
//     },
//     quantity: {
//         type: Number
//        // reguared: true
//     },
//     cost: {
//         type: Number
//       ///  required: true
//     }
// })


const orderSchema = new Schema({
    date: {
        type: Date,
       // required: true // обязательный
       default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list:[
        {
            name: {
                type: String
            // required: true,
            },
            quantity: {
                type: Number
            // reguared: true
            },
            cost: {
                type: Number
            ///  required: true
            }
        }
    ],
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('order', orderSchema)