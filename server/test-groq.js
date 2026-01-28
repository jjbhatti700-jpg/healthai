require('dotenv').config();

async function test() {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: 'Say hello' }]
      })
    });

    const data = await response.json();
    
    if (data.choices) {
      console.log('SUCCESS:', data.choices[0].message.content);
    } else {
      console.log('ERROR:', data);
    }
  } catch (error) {
    console.log('ERROR:', error.message);
  }
}

test();