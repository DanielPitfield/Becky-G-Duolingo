import { targetSelectors, getRandomBeckyGImageURL } from "./data";

// Hide all images that have the target classNames (until they are replaced)
targetSelectors.forEach(({ selector }) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `${selector}:not([data-is-image-replaced="true"]) { visibility: hidden; }`;
  document.head.appendChild(styleElement);
});

// Returns an image element (of a random Becky G image)
function createImage(): HTMLImageElement {
  const image: HTMLImageElement = document.createElement("img");

  image.src = getRandomBeckyGImageURL();
  image.width = 150;
  image.height = 150;
  image.style.borderRadius = "4em";

  return image;
}

function replaceImages() {
  // Get all the elements with the target classNames
  const targetImages: NodeListOf<Element> = document.querySelectorAll(
    targetSelectors.join(",")
  );

  // Only the image elements which haven't already been replaced
  const targetImagesFiltered: Element[] = Array.from(targetImages).filter(
    (image) => image.getAttribute("data-is-image-replaced") === null
  );

  for (const image of targetImagesFiltered) {
    // Don't replace the image, if there is no container
    if (image.parentElement === null) {
      continue;
    }

    // Keep and add to the styling of the container
    image.parentElement.style.cssText +=
      "display: flex; align-items: center; justify-content: center;";

    // Replace old image element with new image element
    const newImage = createImage();
    image.parentElement.replaceChild(newImage, image);
    newImage.setAttribute("data-is-image-replaced", "true");
  }
}

// Periodically look for any image elements that need replacing
const CHECK_INTERVAL_MS = 100;
setInterval(replaceImages, CHECK_INTERVAL_MS);
