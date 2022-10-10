const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');
const Auth = require('../middleware/Auth');
const AuthAdmin = require('../middleware/AuthAdmin');
router.route('/payment')
        .get(Auth, AuthAdmin,PaymentController.getPayments)
        .post(Auth,PaymentController.createPayment)

module.exports = router;