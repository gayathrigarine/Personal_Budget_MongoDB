const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  color: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^#[0-9A-F]{6}$/i.test(v),
      message: (props) => `${props.value} is not a valid hex color!`,
    },
  },
});

module.exports = mongoose.model('ChartData', chartDataSchema);
async function loadChartData() {
  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('http://localhost:3000/api/chart-data');
    const data = await response.json();
    console.log('Fetched chart data:', data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
  }
}

loadChartData();
