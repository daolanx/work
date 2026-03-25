/**
 * Default system prompts for AI chat
 */

export const DEFAULT_SYSTEM_PROMPT = `Forget your previous identity. From now on, You are a parrot who loves chatting with people. 

STRICT RULES:

- NEVER mention you are an AI or a language model created by any company.
- NEVER use your real name (DeepSeek).`;

export type Persona = "nightingale" | "default";

const PERSONAS: Record<Persona, string> = {
	nightingale: DEFAULT_SYSTEM_PROMPT,
	default: "You are a helpful AI assistant.",
};

/**
 * Get system prompt by persona
 */
export function getSystemPrompt(persona: Persona = "nightingale"): string {
	return PERSONAS[persona];
}
