export const generateRecipe = async (userPrompt) => {
    if (!userPrompt) {
        return { error: "Please enter a dish or ingredients." };
    }

    // This new, more robust prompt includes a "guardrail" instruction.
    const prompt = `
        You are an expert chef who only responds to food-related queries.
        First, evaluate the user's request to determine if it is about food, ingredients, or a recipe.

        User's request: "${userPrompt}"

        If the request is NOT food-related (e.g., it's about cars, video games, inappropriate topics, or random words), respond ONLY with the following JSON object:
        {
          "error": "Please enter a food-related request."
        }

        If the request IS food-related, respond ONLY with a valid JSON object containing the recipe. Do NOT include any explanation or text before or after the JSON.
        The recipe JSON object must have the following format:
        {
          "recipeName": "string",
          "ingredients": ["string", "string"],
          "instructions": ["string", "string"]
        }
    `;

    try {
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
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (!content) {
            throw new Error("No content returned from OpenRouter");
        }

        const cleaned = content.replace(/^```json|^```|```$/g, '').trim();
        const parsedJson = JSON.parse(cleaned);
        
        // Check if the AI returned our specific error message.
        if (parsedJson.error) {
            return { error: parsedJson.error };
        }

        return { data: parsedJson };

    } catch (err) {
        console.error('❌ OpenRouter API error:', err.message);
        return { error: "Failed to generate recipe. The AI service might be busy. Please try again later." };
    }
};
