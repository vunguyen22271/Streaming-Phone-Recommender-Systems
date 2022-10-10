const router = require('express').Router()
const Auth = require('../middleware/Auth')
const AuthAdmin = require('../middleware/AuthAdmin')
const ProductControl = require('../controllers/ProductControl');
router.route('/products')
        .get(ProductControl.getProducts)
        .post(Auth, AuthAdmin, ProductControl.createProduct)

router.route('/products/:id')
        .delete(Auth, AuthAdmin, ProductControl.deleteProduct)
        .put(Auth, AuthAdmin, ProductControl.updateProduct)

router.route('/all_products').get(ProductControl.getAllProducts)
module.exports = router;