import { cartoonImageClassNames, beckyImages } from "./data";

// Hide all images that have the target classNames (until they are replaced)
cartoonImageClassNames.forEach((className) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `.${className}:not([data-is-image-replaced="true"]) { visibility: hidden; }`;
  document.head.appendChild(styleElement);
});

function replaceImages() {
  // Get all the elements with the target classNames
  const cartoonImages = document.querySelectorAll(
    cartoonImageClassNames.map((name) => `.${name}`).join(",")
  );

  // Only the image elements which haven't already been replaced
  const cartoonImagesFiltered = Array.from(cartoonImages).filter(
    (image) => image.getAttribute("data-is-image-replaced") === null
  );

  cartoonImagesFiltered.forEach((image) => {
    // Create an image element
    const newImage = document.createElement("img");   
    // Using a random Becky G image 
    newImage.src = beckyImages[Math.floor(Math.random() * beckyImages.length)];
    // Style the image
    newImage.width = 150;
    newImage.height = 150;
    newImage.style.borderRadius = "4em";

    // Keep the container styling
    if (image.parentElement) {
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
