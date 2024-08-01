const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const groupRoutes = require('./routes/groupRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MongoDB connection string
mongoose.connect('mongodb://localhost:27017/notesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.use('/api', groupRoutes);
app.use('/api', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
