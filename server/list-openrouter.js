require('dotenv').config();

async function listModels() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      }
    });

    const data = await response.json();
    
    console.log('Free Models:\n');
    data.data
      .filter(model => model.id.includes(':free'))
      .forEach(model => {
        console.log('- ' + model.id);
      });
  } catch (error) {
    console.log('ERROR:', error.message);
  }
}

listModels();