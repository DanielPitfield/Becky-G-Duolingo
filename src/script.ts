import { getEnabledTargetSelectors, createImage } from "./utils";

const selectors = (await getEnabledTargetSelectors()).flatMap(({ selectors }) => selectors);
const CHECK_INTERVAL_MS = 500;

// Periodically look for any image elements that need replacing
setInterval(replaceImages, CHECK_INTERVAL_MS);

// Periodically look for any speaker icons that when clicked should speak the question text using Becky G's voice!
setInterval(speakQuestion, CHECK_INTERVAL_MS);

// Hide all image elements that match an enabled CSS selector (until they are replaced)
selectors.forEach((selector) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `${selector}:not([data-is-image-replaced="true"]) { visibility: hidden; }`;
  document.head.appendChild(styleElement);
});

async function replaceImages() {
  // Get all the elements that match an enabled CSS selector
  const targetImages: NodeListOf<Element> = document.querySelectorAll(selectors.join(","));

  // Only the image elements which haven't already been replaced and have a container
  const filteredTargetImages: Element[] = Array.from(targetImages).filter(
    (image) => !image.getAttribute("data-is-image-replaced") && image.parentElement
  );

  filteredTargetImages.forEach((image) => {
    // Keep and add to the styling of the container
    image.parentElement!.style.cssText += "display: flex; align-items: center; justify-content: center;";

    // Replace old image element with new image element
    const newImage = createImage();
    image.parentElement!.replaceChild(newImage, image);
    newImage.setAttribute("data-is-image-replaced", "true");
  });
}

async function speakQuestion() {
  const speakerIcon: Element | null = document.querySelector('[style*="--animated-speaker-icon-color"]');
  console.log("Speaker icon: ", speakerIcon);

  if (!speakerIcon) {
    return;
  }

  const questionText = document.querySelector('span[lang="es"]')?.textContent;
  console.log("Question text: ", questionText);

  if (!questionText) {
    return;
  }

  // Remove existing listeners to prevent duplicates
  speakerIcon.removeEventListener("click", (e) => handleSpeakerClick(e, questionText));
  speakerIcon.addEventListener("click", (e) => handleSpeakerClick(e, questionText));
}

function handleSpeakerClick(event: Event, text: string) {
  if (!text) {
    return;
  }

  // Prevent default behavior (stops Duolingo's TTS)
  event.preventDefault();
  event.stopPropagation();

  // Call custom TTS
  chrome.runtime.sendMessage({
    action: "speak",
    text,
  });
}
