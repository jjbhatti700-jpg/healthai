const Conversation = require('../models/Conversation');

const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      user: req.user.id,
      title: req.body.title || 'New Conversation',
      messages: []
    });

    res.status(201).json({
      success: true,
      conversation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user: req.user.id })
      .sort({ updatedAt: -1 })
      .select('title createdAt updatedAt');

    res.json({
      success: true,
      count: conversations.length,
      conversations
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      success: true,
      conversation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addMessage = async (req, res) => {
  try {
    const { role, content } = req.body;

    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    conversation.messages.push({ role, content });
    await conversation.save();

    res.json({
      success: true,
      conversation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      success: true,
      message: 'Conversation deleted'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversation,
  addMessage,
  deleteConversation
};

