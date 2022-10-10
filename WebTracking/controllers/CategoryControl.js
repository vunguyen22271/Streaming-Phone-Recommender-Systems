const Category = require('../models/CategoryModel')
const Products = require('../models/ProductModel')
const CategoryControl = {
    getCategories: async (req,res) =>{
        try {
            const categories =  await Category.find()
            res.json(categories)

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "This category already exists"})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Create success"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please remove all products related to this category."
            })

            await Category.findByIdAndDelete(req.params.id)

            res.json({msg:'Delete Success'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
           const {name} = req.body;
           await Category.findByIdAndUpdate({_id: req.params.id}, {name}) 

           res.json({msg:'Update Success'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = CategoryControl;