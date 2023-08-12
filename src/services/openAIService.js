import { Configuration, OpenAIApi } from 'openai';


const openAIApiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: openAIApiKey,
});
const openai = new OpenAIApi(configuration);

/**
 * @description This function interfaces with the OpenAI Text Completion API Endpoint to complete a text
 */
export async function completeText(text) {
    console.log(`openAIService.js::completeText(message) | Attemping to complete text using the OpenAI API`);

    let completion;

    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 1000
        });
    } catch(error) {
        console.error(`openAIService.js::completeText(message) | There was an error while attempting to complete text using the OpenAI API: ${error}`);
        throw error;
    }
    console.log(`openAIService.js::completeText(message) | Successfully completed text!`);
    const completionText = completion.data.choices[0].text;

    return completionText;
}