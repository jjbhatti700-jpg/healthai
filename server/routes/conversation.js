const express = require('express');
const router = express.Router();
const { 
  createConversation, 
  getConversations, 
  getConversation, 
  addMessage, 
  deleteConversation 
} = require('../controllers/conversationController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createConversation)
  .get(protect, getConversations);

router.route('/:id')
  .get(protect, getConversation)
  .delete(protect, deleteConversation);

router.post('/:id/message', protect, addMessage);

module.exports = router;