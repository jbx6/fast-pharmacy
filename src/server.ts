import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Configuration, OpenAI } from "openai";

// Set up OpenAI
const configuration = new Configuration({
  apiKey: "your_openai_api_key", // Replace with your OpenAI API key
});
const openai = new OpenAI(configuration);

// Initialise Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Helper function to call OpenAI API
async function callOpenAI(prompt: string): Promise<string> {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7,
    });
    return response.data.choices[0]?.text?.trim() || "I couldn't find an answer to that.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}

// Routes for different features
app.post("/prescription-info", async (req: Request, res: Response) => {
  const { query } = req.body;
  const prompt = `Explain how to take this prescription safely: ${query}`;
  const response = await callOpenAI(prompt);
  res.json({ response });
});

app.post("/drug-interaction", async (req: Request, res: Response) => {
  const { drugs } = req.body; // Expecting an array of drug names
  const prompt = `Check for potential interactions between these drugs: ${drugs.join(", ")}.`;
  const response = await callOpenAI(prompt);
  res.json({ response });
});

app.post("/otc-suggestions", async (req: Request, res: Response) => {
  const { symptoms } = req.body;
  const prompt = `Suggest over-the-counter medications or remedies for the following symptoms: ${symptoms}.`;
  const response = await callOpenAI(prompt);
  res.json({ response });
});

app.post("/reminders", async (req: Request, res: Response) => {
  const { task, time } = req.body;
  const response = `Reminder set for: "${task}" at ${time}. (This would need to integrate with a real notification service.)`;
  res.json({ response });
});

app.post("/faqs", async (req: Request, res: Response) => {
  const { question } = req.body;
  const prompt = `Provide a helpful response to this FAQ: ${question}.`;
  const response = await callOpenAI(prompt);
  res.json({ response });
});

app.post("/symptom-checker", async (req: Request, res: Response) => {
  const { symptoms } = req.body;
  const prompt = `Evaluate these symptoms and suggest whether the user should visit a pharmacist, GP, or hospital: ${symptoms}.`;
  const response = await callOpenAI(prompt);
  res.json({ response });
});

// Safety disclaimer route
app.get("/disclaimer", (req: Request, res: Response) => {
  res.json({
    disclaimer:
      "This assistant is not a substitute for professional medical advice. Always consult a qualified healthcare provider for any medical concerns.",
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Pharmacy assistant server is running on http://localhost:${PORT}`);
});