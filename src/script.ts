const beckyImages = [
  "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRmdUSBTYpAWbhsIYZB2ljhdlWmaBX-7bcUGqmf_Ri0Yhg_5Kucfm4YEDhiehMNJFf4qmPAvh1JKDQaA_w",
  "https://media1.popsugar-assets.com/files/thumbor/j2df4DKTYt_7evD8J3UEvDnZJkA/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2022/08/28/041/n/1922153/9bceaaaf612a51fc_GettyImages-1418876873/i/becky-g-makeup-mtv-vmas.jpg",
  "https://m.media-amazon.com/images/M/MV5BMTUzMjg0MjgxMF5BMl5BanBnXkFtZTgwMzkyNDM5NjE@._V1_.jpg",
  "https://images.squarespace-cdn.com/content/v1/56c346b607eaa09d9189a870/df912aff-284c-4d0d-971b-e45d026ef6da/180_FLAUNT_MAGAZINE_FLAUNT.COM_WEW_COVER_BECKY_G4.jpg?format=1000w",
];

const cartoonImageClassNames = [
  // Right side on path of level
  "_3a8EI._1cRje",
  // Left side on path of level
  "_1cRje",
  // Questions
  "F2B9m > div",
  // Loading level
  "_3a8EI._1S4zC",
  // Review reminders
  "_3a8EI._2IFQ2",
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
      newImage.src =
        beckyImages[Math.floor(Math.random() * beckyImages.length)];
      newImage.width = 150;
      newImage.height = 150;
      newImage.style.borderRadius = "4em";

      if (image.parentElement) {
        newImage.setAttribute("data-is-image-replaced", "true");
        image.parentElement.style.cssText +=
          "display: flex; align-items: center; justify-content: center;";
        image.parentElement.replaceChild(newImage, image);
      }
    });
}, 100);
