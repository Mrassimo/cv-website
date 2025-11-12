import { useState, useRef, useCallback } from 'react';
import { getFullPortfolioText } from '../constants';
import { searchSkillsSemantic, isSkillQuery, buildSkillContext } from '../utils/skillSearch';

// Define message structure
interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
}

export const useGemini = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const aiClient = useRef<any | null>(null);

  const initializeAi = useCallback(async () => {
    // Already initialized
    if (aiClient.current) return;

    try {
      // Dynamically import the library on first use
      const module = await import('@google/genai');
      
      // The CDN may wrap the library, making the constructor the `default` export.
      const GoogleGenAI = module.default || module.GoogleGenAI;

      if (typeof GoogleGenAI !== 'function') {
        console.error("Could not find a valid GoogleGenAI constructor.", module);
        throw new Error("Invalid AI library structure loaded.");
      }

      if (!process.env.GEMINI_API_KEY) {
        throw new Error("API key is not configured.");
      }
      aiClient.current = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e: any) {
      console.error("Failed to initialize GoogleGenAI:", e);
      setError("Could not initialize the AI assistant. Please ensure the API key is correctly configured in the environment.");
      // Add a system message to inform the user in the chat
      setMessages(prev => [...prev, { role: 'system', text: "AI assistant is offline." }]);
    }
  }, []);

  const generateResponse = useCallback(async (prompt: string) => {
    await initializeAi();
    if (!aiClient.current) {
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    setError(null);
    
    const userMessage: ChatMessage = { role: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);

    try {
      const portfolioContext = getFullPortfolioText();

      // Check if query is skill-related and add skill context if needed
      let skillContext = '';
      if (isSkillQuery(prompt)) {
        try {
          const skillResults = await searchSkillsSemantic(prompt, 5);
          if (skillResults.length > 0) {
            skillContext = buildSkillContext(skillResults);
          }
        } catch (skillError) {
          console.warn('Failed to search skills:', skillError);
          // Continue without skill context if search fails
        }
      }

      const fullPrompt = `You are a helpful and professional AI assistant for Massimo Raso's portfolio. Your goal is to answer questions based *only* on the provided context about his skills, experience, and projects. Do not invent information. If a question cannot be answered from the context, politely state that the information is not in the portfolio. Keep your answers concise and relevant.

      --- PORTFOLIO CONTEXT ---
      ${portfolioContext}
      ${skillContext ? `\n${skillContext}` : ''}

      --- USER QUESTION ---
      ${prompt}`;

      const response = await aiClient.current.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      const text = response.text?.trim();
      
      if (!text) {
        throw new Error("Received an empty response from the model.");
      }
      
      const modelMessage: ChatMessage = { role: 'model', text };
      setMessages(prev => [...prev, modelMessage]);

    } catch (e: any) {
      console.error("Error generating response:", e);
      const errorMessage = "Sorry, I encountered an error. Please try asking in a different way.";
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'system', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [initializeAi]);

  return { messages, isLoading, error, generateResponse, setMessages };
};