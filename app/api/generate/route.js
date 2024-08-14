import OpenAI from 'openai'; // Import the OpenAI library
import dotenv from 'dotenv'; // Managing environment variables

dotenv.config({ path: './.env' }); // Loading environment variables from .env file

// Create an instance of the OpenAI API client using the API key from the environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Asynchronous function to send a prompt to the OpenAI API and retrieve the response
export async function queryOpenAI(prompt, context = [], model = 'gpt-4o-mini') {
    try {
        // Prepare messages array with context and user prompt
        const messages = context.map((ctx) => ({ role: 'user', content: ctx }))
            .concat({ role: 'user', content: prompt });

        // Send a request to the OpenAI API to create a chat completion using the specified model
        const response = await openai.chat.completions.create({
            model: model,
            messages: messages,
            max_tokens: 500,
        });

        // Return the text content of the first choice in the response
        return response.choices[0].message.content.trim(); 
    } 
    catch (error) {
        console.error('Error querying OpenAI:', error);
        return 'Sorry, I couldn’t process that. Can you please try again?';
    }
}