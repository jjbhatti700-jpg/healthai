require('dotenv').config();
const mongoose = require('mongoose');

console.log('Connecting to MongoDB...');
console.log('URI:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('ERROR:', err.message);
    process.exit(1);
  });