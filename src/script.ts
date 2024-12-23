import { createImage, getEnabledTargetSelectors } from "./utils";

function observe(selectors: string[]): {
  getActiveSelectors: () => string[];
  update: (newSelectors: string[]) => void;
} & {
  imageObserver?: IntersectionObserver;
} {
  let observer: MutationObserver | null = null;
  let imageObserver: IntersectionObserver | undefined;

  function updateSelectors(newSelectors: string[]) {
    // Disconnect existing observers if any
    if (observer) {
      observer.disconnect();
    }
    if (imageObserver) {
      imageObserver.disconnect();
    }

    // Create a new MutationObserver
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            const shouldReplace =
              // Element type
              node.nodeType === Node.ELEMENT_NODE &&
              // Selector
              newSelectors.some((selector) =>
                (node as Element).matches(selector)
              ) &&
              // Attribute
              (node as Element).getAttribute("data-is-image-replaced") ===
                null &&
              // Container
              node.parentElement;

            if (shouldReplace) {
              // Keep and add to the styling of the container
              node.parentElement.style.cssText +=
                "display: flex; align-items: center; justify-content: center;";

              // Replace old image element with new image element
              const newImage = createImage();
              node.parentElement.replaceChild(newImage, node);
              newImage.setAttribute("data-is-image-replaced", "true");
            }
          });
        }
      });
    });

    // Start observing with the new selectors
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Create and start IntersectionObserver for images
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1,
    };

    imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.hasAttribute("data-is-image-replaced") &&
          entry.target.parentElement
        ) {
          // Keep and add to the styling of the container
          entry.target.parentElement.style.cssText +=
            "display: flex; align-items: center; justify-content: center;";

          // Replace old image element with new image element
          const newImage = createImage();
          entry.target.parentElement.replaceChild(newImage, entry.target);
          newImage.setAttribute("data-is-image-replaced", "true");
        }
      });
    }, options);

    // Observe all images with the selector
    document.querySelectorAll(selectors.join(",")).forEach((element) => {
      if (!(element instanceof HTMLImageElement)) {
        throw new Error(`Expected an image element, got ${element.tagName}`);
      }
      imageObserver?.observe(element);
    });
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

(async () => {
  const selectors = await getEnabledTargetSelectors();
  const imageObserver = observe(selectors.map((x) => x.selector));

  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    const selectors = await getEnabledTargetSelectors();
    imageObserver.update(selectors.map((x) => x.selector));
  });
})();
