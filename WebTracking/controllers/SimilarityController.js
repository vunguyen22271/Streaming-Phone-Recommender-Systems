const Similarities = require('../models/SimilarityModel')

const SimilarityControl = {
    getListProducts: async (req,res) =>{
        try {
            //const idProduct = req.body.idProduct;
            const lists =  await Similarities.findOne({idProduct: req.params.id})
            res.json(lists)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    
    },
    getAll: async (req,res) =>{
        try {
            const lists =  await Similarities.find()
            res.json(lists)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    postList: async (req, res) =>{
        try {
            const{idProduct, listId} = req.body
            const newTrackings = new Similarities({idProduct, listId})
            await newTrackings.save()
            res.json({msg: "Save python success"})

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = SimilarityControl;