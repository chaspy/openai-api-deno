import OpenAI from "openai";

console.log("hello");

const openai = new OpenAI({}); // Load API Key from env by default

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
}

main();
