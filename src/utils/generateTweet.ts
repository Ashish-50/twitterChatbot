import axios from 'axios';

export async function generateText(word:string) {
  const apiUrl = 'http://localhost:11434';  // Replace with the correct URL
  const generateEndpoint = '/api/generate';
  const url = apiUrl + generateEndpoint;

  try {
    const response = await axios.post(url, {
      model: 'llama2',
      prompt: `give me a tweet of 20 words about ${word}`,
      stream: false,
    });
    return response.data.response
  } catch (error) {
    // Handle errors here
    console.error('Error making API request:', error);
  }
}


// async function pullModel(name: string) {
//   const apiUrl = 'http://localhost:11434/api/pull';

//   try {
//     const response = await axios.post(apiUrl, {
//       name: name,
//     });

//     // Handle the response data here
//     console.log(response.data);
//   } catch (error) {
//     // Handle errors here
//     console.error('Error making API request:', error);
//   }
// }

// Call the function with the model name
// pullModel('llama2');

// Call the function
