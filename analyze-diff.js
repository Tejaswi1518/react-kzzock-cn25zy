const axios = require('axios');
const fs = require('fs');

// Function to send code to OpenAI and get suggestions
async function getSuggestions(file, code) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/completions';

  if (!apiKey) {
    console.error('API key is missing.');
    return `API key is missing for file: ${file}.`;
  }

  try {
    const response = await axios.post(url, {
      model: 'text-davinci-003',
      prompt: `Please review the following JavaScript/JSX code and provide suggestions for improvement:\n\n${code}`,
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return { file, suggestions: response.data.choices[0].text.trim() };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { file, suggestions: 'Error fetching suggestions from OpenAI.' };
  }
}

// Main function to process files in parallel
async function reviewFiles() {
  const files = process.argv.slice(2); // Get file names passed as arguments
  const promises = files.map(async (file) => {
    const codeToReview = fs.readFileSync(file, 'utf8');
    return await getSuggestions(file, codeToReview);
  });

  // Wait for all reviews to complete
  const results = await Promise.all(promises);

  // Save the review suggestions to a markdown file
  results.forEach(result => {
    fs.appendFileSync('pr_comments.md', `## Code Review Suggestions for ${result.file}\n`);
    fs.appendFileSync('pr_comments.md', "```txt\n" + result.suggestions + "\n```\n\n");
  });
}

// Run the review
reviewFiles();
