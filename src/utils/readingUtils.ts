/**
 * Calculates words per minute based on word count and time
 */
export const calculateWPM = (wordCount: number, timeInSeconds: number): number => {
  if (timeInSeconds <= 0) return 0;
  return Math.round((wordCount / timeInSeconds) * 60);
};

/**
 * Breaks text into chunks for RSVP (Rapid Serial Visual Presentation)
 */
export const chunkText = (text: string, chunkSize: number = 1): string[] => {
  const words = text.split(/\s+/);
  if (chunkSize <= 1) return words;
  
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  return chunks;
};

/**
 * Calculates the estimated reading time
 */
export const estimateReadingTime = (text: string, wpm: number = 200): number => {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wpm);
};

/**
 * Gets appropriate delay in milliseconds for a given WPM
 */
export const getDelayFromWPM = (wpm: number): number => {
  if (wpm <= 0) return 1000;
  return Math.round(60000 / wpm);
};

/**
 * Finds optimal focus point (slightly left of center) in a word
 */
export const findFocusPoint = (word: string): number => {
  // For short words, focus on the beginning
  if (word.length <= 3) return 0;
  
  // For medium words, focus 1/3 into the word
  if (word.length <= 6) return Math.floor(word.length / 3);
  
  // For longer words, focus 2/5 into the word
  return Math.floor(word.length * 0.4);
};