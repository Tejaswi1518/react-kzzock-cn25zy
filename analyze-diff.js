const fs = require('fs');
const axios = require('axios');

async function getSuggestions(code) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await axios.post(
      url,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a code reviewer that provides suggestions to improve code quality.',
          },
          {
            role: 'user',
            content: `Please review the following code and provide suggestions for improvement:\n\n${code}`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
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
