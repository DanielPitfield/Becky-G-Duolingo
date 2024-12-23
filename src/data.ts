export type TargetSelector = { selectors: string[]; label: string };

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
  { selectors: ["._1bppN"], label: "Level path" },
  { selectors: ["._2qg6J > div"], label: "Questions" },
  { selectors: ["._3vn2U"], label: "Loading level" },
  { selectors: ["._2IFQ2"], label: "Review reminders" },
  { selectors: ["._2WUmd"], label: "Section test (start)" },
  { selectors: ["._2AWAc"], label: "Section test (end)" },
];
