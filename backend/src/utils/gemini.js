/**
 * Google Gemini API Client
 * Uses Google Generative Language REST API (v1beta)
 */

const GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-pro',
];

/**
 * Generate content using Google Gemini API
 * @param {Object} options
 * @param {string} options.systemPrompt - System instruction/context
 * @param {string} options.userMessage - User input message
 * @param {number} [options.maxTokens=500] - Max output tokens
 * @param {number} [options.temperature=0.7] - Temperature
 * @returns {Promise<string|null>} - Generated text or null if failed/no key
 */
async function generateGeminiContent({ systemPrompt, userMessage, maxTokens = 500, temperature = 0.7 }) {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_AI_KEY ||
    ''
  ).trim();

  if (!apiKey) {
    return null;
  }

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        },
      };

      if (systemPrompt && systemPrompt.trim()) {
        payload.system_instruction = {
          parts: [{ text: systemPrompt.trim() }],
        };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0];
        const contentPart = candidate?.content?.parts?.[0];
        const text = contentPart?.text;
        if (text && text.trim()) {
          return text.trim();
        }
      } else {
        const errorBody = await res.text();
        console.warn(`Gemini (${model}) returned status ${res.status}: ${errorBody.slice(0, 200)}`);
      }
    } catch (err) {
      console.warn(`Gemini (${model}) request failed:`, err.message);
    }
  }

  return null;
}

module.exports = {
  generateGeminiContent,
};
