// This function now uses OpenRouter and the Mistral model
export const generateRecipe = async (userPrompt) => {
    if (!userPrompt) {
        return { error: "Please enter a dish or ingredients." };
    }

    // The prompt is updated to be more direct for the new model
    const prompt = `
        You are a creative chef. Generate a recipe based on the user's request.
        User's request: "${userPrompt}"

        Respond ONLY with a valid JSON object. Do NOT include any explanation or text before or after the JSON.
        The JSON object must have the following format:
        {
          "recipeName": "string",
          "ingredients": ["string", "string"],
          "instructions": ["string", "string"]
        }
    `;

    try {
        // Access the environment variable using import.meta.env
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',
                messages: [
                    { role: 'user', content: prompt }
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Extract the content from the OpenRouter response structure
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (!content) {
            throw new Error("No content returned from OpenRouter");
        }

        // Clean up potential markdown formatting and parse the JSON
        const cleaned = content.replace(/^```json|^```|```$/g, '').trim();
        const parsedJson = JSON.parse(cleaned);
        
        return { data: parsedJson };

    } catch (err) {
        console.error('❌ OpenRouter API error:', err.message);
        return { error: "Failed to generate recipe. The AI service might be busy. Please try again later." };
    }
};
