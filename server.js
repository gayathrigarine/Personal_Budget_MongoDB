const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const ChartData = require('./models/ChartData');
const app = express();
const port = 3000;

mongoose
  .connect('mongodb://localhost:27017/personal_budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));



app.get('/budget', async (req, res) => {
  try {
    const data = await ChartData.find();
    res.json({ myBudget: data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.post('/budget', async (req, res) => {
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
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

