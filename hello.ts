import OpenAI from "npm:openai";

console.log("hello");

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "元気？" }],
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion);
}

main();
