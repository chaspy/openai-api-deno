import OpenAI from "openai";

console.log("hello");

const openai = new OpenAI({}); // Load API Key from env by default

async function main(){
    const chatComplete = await openai.completions.create({
        messages: [(role: 'user', content: '元気？')],
        model: 'gpt-3.5-turbo',
    }(
}

main()