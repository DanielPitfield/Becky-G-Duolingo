import { createImage, getEnabledTargetSelectors } from "./utils";

const intersectionObserverOptions: IntersectionObserverInit = {
  root: document,
  rootMargin: "0px",
  threshold: 0,
};

function observe(selectors: string[]): {
  getActiveSelectors: () => string[];
  update: (newSelectors: string[]) => void;
} {
  let intersectionObserver: IntersectionObserver | undefined;

  function updateSelectors(newSelectors: string[]) {
    // Disconnect existing observer
    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }

    // Create a new IntersectionObserver
    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          replaceImage(entry.target);
        }
      });
    }, intersectionObserverOptions);

    // Observe all nodes matching the selectors
    const nodes = document.querySelectorAll(newSelectors.join(","));
    Array.from(nodes).forEach((node) => intersectionObserver?.observe(node));
  }

  updateSelectors(selectors);

  return {
    getActiveSelectors: () => selectors,
    update: (newSelectors: string[]) => {
      selectors = newSelectors;
      updateSelectors(newSelectors);
    },
  };
}

function replaceImage(element: Element) {
  if (!element.parentElement) {
    return;
  }

  if (element.hasAttribute("data-is-image-replaced")) {
    return;
  }

  // Keep and add to the styling of the container
  element.parentElement.style.cssText +=
    "display: flex; align-items: center; justify-content: center;";

  // Replace old image element with new image element
  const newImage = createImage();
  element.parentElement.replaceChild(newImage, element);
  newImage.setAttribute("data-is-image-replaced", "true");
}

(async () => {
  const selectors = await getEnabledTargetSelectors();
  const imageObserver = observe(selectors.map((x) => x.selector));

  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    const selectors = await getEnabledTargetSelectors();
    imageObserver.update(selectors.map((x) => x.selector));
  });
})();
