export type TargetSelector = { selector: string; label: string };

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
  { selector: "._3a8EI._1cRje", label: "Right-side on path of level" },
  { selector: "._1cRje", label: "Left-side on path of level" },
  { selector: ".F2B9m > div", label: "Questions" },
  { selector: "._3a8EI._1S4zC", label: "Loading level" },
  { selector: "._3a8EI._2IFQ2", label: "Review reminders" },
  { selector: "._145Ci._2WUmd", label: "Section test (start)" },
  { selector: "._1ualb._2AWAc", label: "Section test (end)" },
];
