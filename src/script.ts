import { targetClassNames, getRandomBeckyGImage } from "./data";

// Hide all images that have the target classNames (until they are replaced)
targetClassNames.forEach((className) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `.${className}:not([data-is-image-replaced="true"]) { visibility: hidden; }`;
  document.head.appendChild(styleElement);
});

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
    // Create an image element
    const newImage: HTMLImageElement = document.createElement("img");
    // Using a random Becky G image
    newImage.src = getRandomBeckyGImage();
    // Style the image
    newImage.width = 150;
    newImage.height = 150;
    newImage.style.borderRadius = "4em";

    // If the image being replaced had a container
    if (image.parentElement) {
      // Keep and add to that styling
      image.parentElement.style.cssText +=
        "display: flex; align-items: center; justify-content: center;";
      // Replace old image element with new image element
      image.parentElement.replaceChild(newImage, image);
      newImage.setAttribute("data-is-image-replaced", "true");
    }
  });
}

// Periodically look for any image elements that need replacing
const CHECK_INTERVAL_MS = 100;
setInterval(replaceImages, CHECK_INTERVAL_MS);
