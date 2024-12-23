export type TargetSelector = { selector: string; label: string };

export const TARGET_URL = "https://www.duolingo.com";

export const beckyImages: string[] = [
  chrome.runtime.getURL("images/becky1.jpg"),
  chrome.runtime.getURL("images/becky2.jpg"),
  chrome.runtime.getURL("images/becky3.jpg"),
  chrome.runtime.getURL("images/becky4.jpg"),
  chrome.runtime.getURL("images/becky5.jpg"),
  chrome.runtime.getURL("images/becky6.jpg"),
  chrome.runtime.getURL("images/becky7.jpg"),
  chrome.runtime.getURL("images/becky8.jpg"),
];

export const allTargetSelectors: TargetSelector[] = [
  { selector: "._1bppN", label: "Level path" },
  { selector: "._2qg6J > div", label: "Questions" },
  { selector: "._3vn2U", label: "Loading level" },
  { selector: "._2IFQ2", label: "Review reminders" },
  { selector: "._2WUmd", label: "Section test (start)" },
  { selector: "._2AWAc", label: "Section test (end)" },
];
