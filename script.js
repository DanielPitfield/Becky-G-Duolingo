const beckyURL =
  "http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRmdUSBTYpAWbhsIYZB2ljhdlWmaBX-7bcUGqmf_Ri0Yhg_5Kucfm4YEDhiehMNJFf4qmPAvh1JKDQaA_w";

setInterval(() => {
  const cartoonImageClassNames = ["_1_6GB", "_1cRje", "F2B9m > div"];

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

      newImage.setAttribute("data-is-image-replaced", "true");
      image.parentNode.replaceChild(newImage, image);
      console.log("image replaced");
    });
}, 100);
