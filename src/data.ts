const beckyImages: string[] = [
  chrome.runtime.getURL("images/becky1.jpg"),
  chrome.runtime.getURL("images/becky2.jpg"),
  chrome.runtime.getURL("images/becky3.jpg"),
  chrome.runtime.getURL("images/becky4.jpg"),
  chrome.runtime.getURL("images/becky5.jpg"),
  chrome.runtime.getURL("images/becky6.jpg"),
  chrome.runtime.getURL("images/becky7.jpg"),
  chrome.runtime.getURL("images/becky8.jpg"),
];

export function getRandomBeckyGImageURL(): string {
  const randomIndex: number = Math.floor(Math.random() * beckyImages.length);
  return beckyImages[randomIndex];
}

export const targetCssSelectors: { cssSelector: string; label: string }[] = [
  { cssSelector: "._3a8EI._1cRje", label: "Right-side on path of level" },
  { cssSelector: "._1cRje", label: "Left-side on path of level" },
  { cssSelector: ".F2B9m > div", label: "Questions" },
  { cssSelector: "._3a8EI._1S4zC", label: "Loading level" },
  { cssSelector: "._3a8EI._2IFQ2", label: "Review reminders" },
];
