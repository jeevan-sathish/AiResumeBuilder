
type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
};

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const API_KEY = "AIzaSyDfre4670HNfsJcpQe039hdZ43roymvbag";
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected response format from Gemini API");
    }
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    throw error;
  }
}

export function preprocessGeminiResponse(text: string): { 
  points: string[]; 
  highlights: string[]; 
} {
  // Extract bullet points
  const pointsRegex = /(?:^|\n)[-•*](.+?)(?=\n[-•*]|\n\n|$)/g;
  const extractedPoints = [...text.matchAll(pointsRegex)].map(match => match[1].trim());
  
  // Extract highlighted parts (anything within ** or __ or ## markers)
  const highlightsRegex = /(\*\*|__|##)(.+?)(\*\*|__|##)/g;
  const extractedHighlights = [...text.matchAll(highlightsRegex)].map(match => match[2].trim());
  
  return {
    points: extractedPoints.length > 0 ? extractedPoints : [text],
    highlights: extractedHighlights
  };
}
