const API_KEY_STORAGE_KEY = 'geminiApiKey';

export const getApiKey = (): string | null => {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to retrieve API key from localStorage", error);
    return null;
  }
};

export const setApiKey = (apiKey: string): void => {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  } catch (error) {
    console.error("Failed to save API key to localStorage", error);
  }
};
