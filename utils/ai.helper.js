// utils/aiHelper.js
import axios from 'axios';

export const getSuggestedTitle = async (taskDescription) => {
    try {
        const prompt = `You are a task manager assistant. Read the task description and generate a short, clear title for it.Task Description: ${taskDescription}`
        const response = await axios.post(
            'https://api.cohere.ai/v1/generate',
            {
                model: "command-light",
                prompt,
                max_tokens: 20,
                temperature: 0.6,
                stop_sequences: ["\n"]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const generatedText = response.data.generations[0].text.trim();

        return generatedText || "Untitled Task";
    } catch (error) {
        console.error("Cohere AI Error:", error.response?.data || error.message);
        return "Untitled Task";
    }
};
