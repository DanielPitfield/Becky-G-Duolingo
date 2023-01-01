import { allTargetSelectors, beckyImages } from "./data";

// Get the target selectors which are enabled in the options
export async function getEnabledTargetSelectors() {
  const item = await chrome.storage.sync.get("targetSelectorOptions");

  // If a storage entry exists
  if (item.targetSelectorOptions) {
    // Deserialise the JSON
    const targetSelectorOptions: { label: string; isEnabled: boolean }[] =
      JSON.parse(item.targetSelectorOptions);

    // The target selectors of the enabled options
    const enabledTargetSelectors = allTargetSelectors.filter((selector) => {
      return targetSelectorOptions.find(
        (option) => option.label === selector.label
      )?.isEnabled;
    });

    return enabledTargetSelectors;
  }

  // Otherwise, all selectors are enabled
  return allTargetSelectors;
}

export function getRandomBeckyGImageURL(): string {
  const randomIndex: number = Math.floor(Math.random() * beckyImages.length);
  return beckyImages[randomIndex];
}

// Returns an image element (of a random Becky G image)
export function createImage(): HTMLImageElement {
  const image: HTMLImageElement = document.createElement("img");

  image.src = getRandomBeckyGImageURL();
  image.width = 150;
  image.height = 150;
  image.style.borderRadius = "4em";

  return image;
}
