import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

type Message = {
  role: "user" | "model";
  text: string;
};

const history: Message[] = [];

async function askQuestion(): Promise<void> {
  rl.question("\nYou: ", async (prompt: string) => {
    if (prompt.toLowerCase() === "exit") {
      console.log("\nGoodbye 👋");
      rl.close();
      return;
    }

    try {
      // Save user message
      history.push({
        role: "user",
        text: prompt,
      });

      // Convert history into Gemini format
      const contents = history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });

      const aiResponse = response.text ?? "No response received.";

      console.log(`\nGemini: ${aiResponse}`);

      // Save AI response
      history.push({
        role: "model",
        text: aiResponse,
      });

      // Optional: prevent history becoming too large
      if (history.length > 20) {
        history.splice(0, 2);
      }
    } catch (error) {
      console.error("\nError:", error);
    }

    askQuestion();
  });
}

console.log("=================================");
console.log("     Gemini AI Terminal Chat");
console.log("=================================");
console.log("Type 'exit' to quit.\n");

askQuestion();
// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";

// dotenv.config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain JavaScript in simple words",
//   });

//   console.log(response.text);
// }

// main();