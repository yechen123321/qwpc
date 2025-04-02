import axios from "axios";

// 文本分析
export async function analyzeText(text: string) {
  try {
    const response = await axios.post('/ai/analyze', {
      text: text
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
}

// 自然语言处理 - 情感分析
export async function sentimentAnalysis(text: string) {
  try {
    const response = await axios.post('/ai/sentiment', {
      text: text
    });
    return response.data;
  } catch (error) {
    console.error("Error performing sentiment analysis:", error);
    throw error;
  }
}

// 自然语言处理 - 语言翻译
export async function translateText(text: string, targetLanguage: string) {
  try {
    const response = await axios.post('/ai/translate', {
      text: text,
      targetLanguage: targetLanguage
    });
    return response.data;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
}

// 自然语言处理 - 生成文本
export async function generateText(prompt: string) {
  try {
    const response = await axios.post('/ai/generate', {
      prompt: prompt
    });
    return response.data;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}