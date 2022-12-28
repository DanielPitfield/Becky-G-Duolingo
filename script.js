const beckyURL =
  "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRmdUSBTYpAWbhsIYZB2ljhdlWmaBX-7bcUGqmf_Ri0Yhg_5Kucfm4YEDhiehMNJFf4qmPAvh1JKDQaA_w";

const cartoonImageClassNames = [
  // Right side on path of level
  "_3a8EI._1cRje",
  // Left side on path of level
  "_1cRje",
  // Questions
  "F2B9m > div",
  // Loading level
  "_3a8EI._1S4zC",
];

cartoonImageClassNames.forEach((className) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `.${className}:not([data-is-image-replaced="true"]) { visibility: hidden; }`;
  document.head.appendChild(styleElement);
});

setInterval(() => {
  const cartoonImages = document.querySelectorAll(
    cartoonImageClassNames.map((name) => `.${name}`).join(",")
  );

  Array.from(cartoonImages)
    .filter((image) => image.getAttribute("data-is-image-replaced") === null)
    .forEach((image) => {
      const newImage = document.createElement("img");
      newImage.src = beckyURL;
      newImage.width = 150;
      newImage.height = 150;
      newImage.style.borderRadius = "4em";

      newImage.setAttribute("data-is-image-replaced", "true");
      image.parentElement.style.cssText += "display: flex; align-items: center; justify-content: center;";
      image.parentNode.replaceChild(newImage, image);
    });
}, 100);
