const router = require('express').Router()
const Auth = require('../middleware/Auth')
const SimilarityControl = require('../controllers/SimilarityController');
router.route('/detail/:id').get(SimilarityControl.getListProducts)

router.route('/detail').post(SimilarityControl.postList)

router.route('/details').get(SimilarityControl.getAll)
module.exports = router;