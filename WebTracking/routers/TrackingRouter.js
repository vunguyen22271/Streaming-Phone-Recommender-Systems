const router = require('express').Router()
//const Auth = require('../middleware/Auth')
//const AuthAdmin = require('../middleware/AuthAdmin')
const TrackingControl = require('../controllers/TrackingController');
router.route('/tracking')
        .get(TrackingControl.getTrackings)
        .post(TrackingControl.saveTrackings)

module.exports = router;



