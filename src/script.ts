import { createImage, getEnabledTargetSelectors } from "./utils";

function observe(selectors: string[]) {
  let observer: MutationObserver | null = null;

  function updateSelectors(newSelectors: string[]) {
    // Disconnect existing observer if any
    if (observer) {
      observer.disconnect();
    }

    // Create a new observer or reuse the existing one
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
    observer.observe(document.body, { childList: true, subtree: true });
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
