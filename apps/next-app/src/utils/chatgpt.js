import OpenAI from 'openai';

const openAi = new OpenAI({
    apiKey: process?.env?.['NEXT_PUBLIC_OPENAI_API_KEY'],
    dangerouslyAllowBrowser: true,
});

async function generateTopic(topic, sentenceCount, locale = 'en-US') {
    const openChat = await openAi.chat.completions.create({
        messages: [{ role: 'user', content: `Write about "${topic}" within ${sentenceCount} sentences using this locale language "${locale}"` }],
        model: 'gpt-3.5-turbo',
        temperature: 0.3
    });

    return openChat?.choices?.[0]?.message?.content ?? "Error: cannot generate content";
}

export { generateTopic }