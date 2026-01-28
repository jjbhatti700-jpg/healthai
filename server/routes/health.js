const express = require('express');
const router = express.Router();
const { analyzeSymptoms, getHealthInfo, chat } = require('../controllers/healthController');
const { protect } = require('../middleware/auth');

router.post('/analyze', protect, analyzeSymptoms);
router.post('/info', protect, getHealthInfo);
router.post('/chat', protect, chat);

module.exports = router;