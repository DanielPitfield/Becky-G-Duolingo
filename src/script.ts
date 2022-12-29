import { targetClassNames, getRandomBeckyGImageURL } from "./data";

// Hide all images that have the target classNames (until they are replaced)
targetClassNames.forEach((className) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `.${className}:not([data-is-image-replaced="true"]) { visibility: hidden; }`;
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
  const cartoonImages: NodeListOf<Element> = document.querySelectorAll(
    targetClassNames.map((name) => `.${name}`).join(",")
  );

  // Only the image elements which haven't already been replaced
  const cartoonImagesFiltered: Element[] = Array.from(cartoonImages).filter(
    (image) => image.getAttribute("data-is-image-replaced") === null
  );

  cartoonImagesFiltered.forEach((image) => {
    if (image.parentElement) {
      // Keep and add to the styling of the container
      image.parentElement.style.cssText +=
        "display: flex; align-items: center; justify-content: center;";

      // Replace old image element with new image element
      const newImage = createImage();
      image.parentElement.replaceChild(newImage, image);
      newImage.setAttribute("data-is-image-replaced", "true");
    }
  });
}

// Periodically look for any image elements that need replacing
const CHECK_INTERVAL_MS = 100;
setInterval(replaceImages, CHECK_INTERVAL_MS);
