import { createImage, getEnabledTargetSelectors } from "./utils";

const mutationObserverOptions: MutationObserverInit = {
  childList: true,
  subtree: true,
};

const intersectionObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

function observe(selectors: string[]): {
  getActiveSelectors: () => string[];
  update: (newSelectors: string[]) => void;
} {
  let mutationObserver: MutationObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;

  function updateSelectors(newSelectors: string[]) {
    // Disconnect existing observers
    if (mutationObserver) {
      mutationObserver.disconnect();
    }

    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }

    // Create a new MutationObserver
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            const shouldReplace =
              // Element type
              node.nodeType === Node.ELEMENT_NODE &&
              // Selector
              newSelectors.some((selector) =>
                (node as Element).matches(selector)
              );

            if (shouldReplace) {
              replaceImage(node);
            }
          });
        }
      });
    });

    mutationObserver.observe(document.body, mutationObserverOptions);

    // Create a new IntersectionObserver
    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          replaceImage(entry.target);
        }
      });
    }, intersectionObserverOptions);

    const nodes = document.querySelectorAll(selectors.join(","));
    nodes.forEach((node) => intersectionObserver?.observe(node));
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

function replaceImage(node: Node) {
  if (!node.parentElement) {
    return;
  }

  if ((node as Element).hasAttribute("data-is-image-replaced")) {
    return;
  }

  // Keep and add to the styling of the container
  node.parentElement.style.cssText +=
    "display: flex; align-items: center; justify-content: center;";

  // Replace old image element with new image element
  const newImage = createImage();
  node.parentElement.replaceChild(newImage, node);
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
