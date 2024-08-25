const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

// Helper function to identify lowercase alphabets
const isLowerCase = (char) => char >= 'a' && char <= 'z';

// Helper function to identify uppercase alphabets
const isUpperCase = (char) => char >= 'A' && char <= 'Z';

// Helper function to identify numbers
const isNumber = (char) => !isNaN(char);

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid input, please provide an array of data.',
    });
  }

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = '';

  data.forEach((item) => {
    if (isNumber(item)) {
      numbers.push(item);
    } else if (isLowerCase(item) || isUpperCase(item)) {
      alphabets.push(item);
      if (isLowerCase(item)) {
        if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = item;
        }
      }
    }
  });

  res.json({
    is_success: true,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

// GET route to return hardcoded JSON response
app.get('/bfhl', (req, res) => {
  try {
    return res.status(200).json({
      operation_code: 1,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      message: 'Server error, please try again later.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
