export const calculateReadingTime = (text: string, wordsPerMinute: number = 250): number => {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
};
