import axios from 'axios';

async function generateText() {
  const apiUrl = 'YOUR_DEEPSEEK_API_URL';  // Replace with the correct URL
  const generateEndpoint = '/api/generate';
  const url = apiUrl + generateEndpoint;

  try {
    const response = await axios.post(url, {
      model: 'llama2',
      prompt: 'What color is the sky at different times of the day? Respond using JSON',
      format: 'json',
      stream: false,
    });

    // Handle the response data here
    console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error('Error making API request:', error);
  }
}

// Call the function
generateText();
