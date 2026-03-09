import { GoogleGenAI, SchemaType } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface FactCheckResult {
  claim: string;
  verdict: "True" | "False" | "Misleading" | "Unverified" | "Partially True";
  confidence: "High" | "Medium" | "Low";
  category: string;
  explanation: string;
  relatedChecks?: Array<{
    claim: string;
    verdict: string;
  }>;
  groundingChunks?: Array<{
    web?: {
      uri: string;
      title: string;
    };
  }>;
}

export async function checkFact(statement: string): Promise<FactCheckResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following claim and provide a structured fact-check report.
      
      Claim: "${statement}"
      
      Return the response in JSON format with the following schema:
      {
        "claim": "The specific claim being checked",
        "verdict": "One of: True, False, Misleading, Unverified, Partially True",
        "confidence": "One of: High, Medium, Low",
        "category": "The topic (e.g., Politics, Health, Science, History)",
        "explanation": "A detailed explanation of the findings, citing evidence.",
        "relatedChecks": [
          {
            "claim": "A related claim or topic that has been fact-checked or is relevant",
            "verdict": "The verdict for this related claim (e.g. True, False)"
          }
        ]
      }
      
      Provide 3-5 related checks.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);

    return {
      ...data,
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks,
    };
  } catch (error) {
    console.error("Error checking fact:", error);
    throw error;
  }
}
