const mongoose = require('mongoose')

const SimilaritySchema = new mongoose.Schema({
    idProduct:{
        type: String,
        required: true
    },
    listId:{
        type: Array,
        required: true
    }
},{ timestamps: true})

module.exports = mongoose.model('Similarity', SimilaritySchema)