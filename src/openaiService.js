import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat with the LLM with user messages and schema for the response
export async function chatWithLLM(messages, schema = null) {
  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages,
    response_format: schema ? { type: "json_schema", json_schema: schema } : undefined,
  });

  return response.choices[0].message.content;
}
