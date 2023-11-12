// ref: https://dev.classmethod.jp/articles/function_calling_nodejs/
import OpenAI from "npm:openai";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

const prompt: ChatCompletionRequestMessage = {
  role: "user",
  content:
    "くらにゃんの住んでいる国の有名なイベントについて日本語で教えてください",
};

const getLivingCountry = (userName: string) => {
  return userName === "くらにゃん" ? "日本" : "アメリカ";
};

const getStrongestSportsCountry = (sport: string) => {
  switch (sport) {
    case "サッカー":
      return "アルゼンチン";
    case "レスリング":
      return "日本";
    case "卓球":
      return "中国";
    default:
      return "アメリカ";
  }
};

const functions = {
  getLivingCountry,
  getStrongestSportsCountry,
} as const;

async function main() {
  const res = await openai.chat.completions.create({
    messages: [prompt],
    model: "gpt-3.5-turbo",
    function_call: "auto",
    functions: [
      {
        name: "getLivingCountry",
        description: "住んでいる国を取得",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "ユーザー名",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "getStrongestSportsCountry",
        description: "スポーツの強い国を取得",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "sport",
            },
          },
          required: ["name"],
        },
      },
    ],
  });

  const message = res.choices[0].message;
  console.log("message:", message);
  const functionCall = message?.function_call;

  if (functionCall) {
    const args = JSON.parse(functionCall.arguments || "{}");

    const funcRes = functions[functionCall.name!](args.name);

    const res2 = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        message,
        {
          role: "function",
          content: funcRes,
          name: functionCall.name,
        },
      ],
    });
    console.log("answer", res2.choices[0].message);
  }
}

main();
