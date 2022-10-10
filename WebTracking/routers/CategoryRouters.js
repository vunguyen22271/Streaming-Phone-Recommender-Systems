const router = require('express').Router()
const CategoryControl = require('../controllers/CategoryControl');
const Auth = require('../middleware/Auth');
const AuthAdmin = require('../middleware/AuthAdmin');

router.route('/category')
    .get(CategoryControl.getCategories)
    .post(Auth, AuthAdmin, CategoryControl.createCategory)

router.route('/category/:id')
    .delete(Auth, AuthAdmin, CategoryControl.deleteCategory)
    .put(Auth, AuthAdmin, CategoryControl.updateCategory)

module.exports = router
