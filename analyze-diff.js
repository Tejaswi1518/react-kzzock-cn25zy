const fs = require('fs');
const axios = require('axios');

// Function to send code to OpenAI and get suggestions
async function getSuggestions(code) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/completions';

  try {
    const response = await axios.post(url, {
      model: 'text-davinci-003', // You can use a different model if preferred
      prompt: `Please review the following JavaScript/JSX code and provide suggestions for improvement:\n\n${code}`,
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'Error fetching suggestions from OpenAI.';
  }
}

// Read the code content from the file
const codeToReview = fs.readFileSync('file_to_review.txt', 'utf8');

// Get suggestions from OpenAI
getSuggestions(codeToReview).then(suggestions => {
  // Save the suggestions to a file
  fs.writeFileSync('code-review-suggestions.txt', suggestions);
  console.log('Suggestions saved to code-review-suggestions.txt');
});
