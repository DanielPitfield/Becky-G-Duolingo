const beckyImages: string[] = [
  chrome.runtime.getURL("images/becky1.jpg"),
  chrome.runtime.getURL("images/becky2.jpg"),
];

export function getRandomBeckyGImageURL(): string {
  const randomIndex: number = Math.floor(Math.random() * beckyImages.length);
  return beckyImages[randomIndex];
}

export const targetClassNames: string[] = [
  // Right side on path of level
  "_3a8EI._1cRje",
  // Left side on path of level
  "_1cRje",
  // Questions
  "F2B9m > div",
  // Loading level
  "_3a8EI._1S4zC",
  // Review reminders
  "_3a8EI._2IFQ2",
];
