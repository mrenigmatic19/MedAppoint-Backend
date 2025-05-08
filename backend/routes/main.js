const express = require('express');
const router = express.Router();
const { authToken } = require('../middleware/authMiddleware');


router.use('/user',authToken, require('./userRoutes'));
router.use('/hospital',authToken, require('./hospitalRoutes'));
router.use('/doctor',authToken, require('./doctorRoutes'));
router.use('/product',authToken, require('./productRoutes'));
router.use('/subscription',authToken, require('./subscriptionRoutes'));
router.use('/service', authToken,require('./serviceRoutes'));
router.use('/order',authToken, require('./orderRoutes'));
router.use('/payment',authToken, require('./paymentRoutes'));
router.use('/search', require('./searchRoutes'));

module.exports = router;
 