// Legacy config file - kept for reference but not actively used
// The chat functionality now uses Groq AI directly

export const WORKFLOW_ID =
    process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const PLACEHOLDER_INPUT = "Ask anything...";

export const GREETING = "How can I help you today?";