const Products = require('../models/ProductModel');
// Filter, sort and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; // queryString = req.query
    //console.log({ before: queryObj });
    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,(match) => "$" + match);
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// create, get, delete, update product
const ProductControl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating();
      const products = await features.query;
      res.json({status: 'success',
                result: products.length,
                products: products});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllProducts: async (req, res)=>{
    try {
      const products = await Products.find()
      res.json(products)
    } catch (err) {
      return res.status(500).json({msg:err.message})
    }
  },
  createProduct: async (req, res) => {
    try {
      const {product_id, title, price, images, category, screenSize,ram,camera,memory,pin,status, color, description, content} = req.body;
      if (!images) return res.status(400).json({ msg: "No photos have been uploaded" });

      const product = await Products.findOne({product_id})

      if (product)
        return res.status(400).json({ msg: "Product already exists" });

      const newProduct = new Products({
          product_id, title: title.toLowerCase(), price, images, category, screenSize,ram,camera,memory,pin,status, color, description, content
      })

      await newProduct.save();
      res.json({ msg: "Create success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {title, price, images, category, screenSize,ram,camera,memory,pin, status, color, description, content} = req.body;
      if(!images) return res.status(400).json({msg: "No photos have been uploaded"})

      await Products.findOneAndUpdate({_id: req.params.id}, {
        title: title.toLowerCase(), price, images, category,screenSize, ram, camera, memory, pin, status, color, description, content
      })

      res.json({ msg: "Update success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = ProductControl;
