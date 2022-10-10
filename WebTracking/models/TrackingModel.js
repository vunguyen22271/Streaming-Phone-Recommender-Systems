const mongoose = require('mongoose')

const TrackingSchema = new mongoose.Schema({
    id_user:{
        type: String,
        required: true,
    },
    id_product:{
        type: String,
        required: true
    }
},{ timestamps: true})

module.exports = mongoose.model('Tracking', TrackingSchema)