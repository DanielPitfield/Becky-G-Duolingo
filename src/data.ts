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
  { selectors: ["._3vn2U"], label: "Loading level" },
  { selectors: ["._2qg6J > div", "._2rgPQ", "._1CuPQ", "._2Zqm-"], label: "Questions" },
  { selectors: ["._1UGd5", "._1JaQ9", "._3V6my"], label: "Responses" },
  { selectors: ["._2IFQ2", ".CX0-j"], label: "Review reminders" },
  { selectors: ["._3SXFk > div", "._3BHJN", "._3-GFU", "._2AWAc", "._5PDF2"], label: "Section test" },
];
