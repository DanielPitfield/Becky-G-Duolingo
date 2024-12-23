import type { TargetSelector } from "./data";
import { getEnabledTargetSelectors, createImage } from "./utils";

const selectors = await (async (): Promise<TargetSelector[]> => {
  return getEnabledTargetSelectors();
})();

(async () => {
  // Hide all image elements that match an enabled CSS selector (until they are replaced)
  selectors.forEach(({ selector }) => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `${selector}:not([data-is-image-replaced="true"]) { visibility: hidden; }`;
    document.head.appendChild(styleElement);
  });
})();

async function replaceImages() {
  // Get all the elements that match an enabled CSS selector
  const targetImages: NodeListOf<Element> = document.querySelectorAll(selectors.map((x) => x.selector).join(","));

  // Only the image elements which haven't already been replaced
  const filteredTargetImages: Element[] = Array.from(targetImages).filter(
    (image) => !image.getAttribute("data-is-image-replaced")
  );

  for (const image of filteredTargetImages) {
    // Don't replace the image, if there is no container
    if (!image.parentElement) {
      continue;
    }

    // Keep and add to the styling of the container
    image.parentElement.style.cssText += "display: flex; align-items: center; justify-content: center;";

    // Replace old image element with new image element
    const newImage = createImage();
    image.parentElement.replaceChild(newImage, image);
    newImage.setAttribute("data-is-image-replaced", "true");
  }
}

// Periodically look for any image elements that need replacing
const CHECK_INTERVAL_MS = 100;
setInterval(replaceImages, CHECK_INTERVAL_MS);
