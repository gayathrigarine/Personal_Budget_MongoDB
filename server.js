const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/personal_budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));
const express = require('express');
const ChartData = require('./models/ChartData');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.use(express.json());
app.use('/', express.static('public'));
app.get('/api/chart-data', async (req, res) => {
  try {
    const data = await ChartData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.post('/api/chart-data', async (req, res) => {
  const { title, value, color } = req.body;

  try {
    const newEntry = new ChartData({ title, value, color });
    await newEntry.save();
    res
      .status(201)
      .json({ message: 'Data added successfully', data: newEntry });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error adding data', error: error.message });
  }
});
