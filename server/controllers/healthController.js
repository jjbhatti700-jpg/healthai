const Conversation = require('../models/Conversation');

const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, conversationId } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: 'Please provide symptoms' });
    }

    const prompt = `You are a helpful health information assistant. You are NOT a doctor and cannot diagnose conditions.

IMPORTANT DISCLAIMER: Always remind users that this is general health information only, NOT medical advice. They should consult a healthcare professional for proper diagnosis and treatment.

User's symptoms: ${symptoms}

Please provide:
1. Possible conditions that MAY be associated with these symptoms (emphasize these are possibilities, not diagnoses)
2. General self-care tips that might help
3. Warning signs that would require immediate medical attention
4. Recommendation to see a healthcare provider

Keep the response helpful but clear that this is informational only.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      const aiResponse = data.choices[0].message.content;

      // Save to database if user is logged in
      if (req.user && conversationId) {
        const conversation = await Conversation.findOne({
          _id: conversationId,
          user: req.user.id
        });

        if (conversation) {
          conversation.messages.push(
            { role: 'user', content: symptoms },
            { role: 'assistant', content: aiResponse }
          );
          await conversation.save();
        }
      }

      res.json({
        success: true,
        response: aiResponse,
        disclaimer: 'This is general health information only and NOT medical advice.'
      });
    } else {
      throw new Error('Invalid response from AI');
    }
  } catch (error) {
    console.error('Groq API Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze symptoms' });
  }
};

const getHealthInfo = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Please provide a health topic' });
    }

    const prompt = `You are a helpful health information assistant. Provide accurate, general health information about: ${topic}

Include:
1. Overview of the topic
2. Key facts
3. Prevention tips (if applicable)
4. When to see a doctor

IMPORTANT: Remind the user this is general information only and not medical advice.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      res.json({
        success: true,
        response: data.choices[0].message.content,
        disclaimer: 'This is general health information only and NOT medical advice.'
      });
    } else {
      throw new Error('Invalid response from AI');
    }
  } catch (error) {
    console.error('Groq API Error:', error.message);
    res.status(500).json({ error: 'Failed to get health information' });
  }
};

const chat = async (req, res) => {
  try {
    const { message, history, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Please provide a message' });
    }

    const chatHistory = history || [];
    
    const systemPrompt = `You are a friendly health information assistant. You provide helpful, accurate health information while always reminding users that you are not a doctor and cannot provide medical diagnoses or treatment advice. Always encourage users to consult healthcare professionals for medical concerns.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      const aiResponse = data.choices[0].message.content;

      // Save to database if user is logged in
      if (req.user && conversationId) {
        const conversation = await Conversation.findOne({
          _id: conversationId,
          user: req.user.id
        });

        if (conversation) {
          conversation.messages.push(
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse }
          );
          await conversation.save();
        }
      }

      res.json({
        success: true,
        response: aiResponse
      });
    } else {
      throw new Error('Invalid response from AI');
    }
  } catch (error) {
    console.error('Groq API Error:', error.message);
    res.status(500).json({ error: 'Failed to process message' });
  }
};

module.exports = { analyzeSymptoms, getHealthInfo, chat };