const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

console.log('API Key:', process.env.GEMINI_API_KEY ? 'Found' : 'NOT FOUND');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
    const result = await model.generateContent('Say hello');
    const response = await result.response;
    console.log('SUCCESS:', response.text());
  } catch (error) {
    console.log('ERROR:', error.message);
  }
}

test();