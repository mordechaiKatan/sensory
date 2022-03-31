require('dotenv').config({ encoding: 'utf8' });

module.exports = {
    mongoUri: process.env.MONGO_URL || 'mongodb://localhost:27017/sensory',
    port: process.env.PORT || 8000
  }