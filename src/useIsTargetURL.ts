import { useState, useEffect } from "react";
import { TARGET_URL } from "./data";

// Is there a tab in the currentWindow which has a Duolingo URL?
function useIsTargetURL() {
  const [isTargetURL, setIsTargetURL] = useState<boolean>(false);

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      setIsTargetURL(
        tabs.some((tab) => (tab.url ?? "-").startsWith(TARGET_URL))
      );
    });
  }, []);

  return isTargetURL;
}

export default useIsTargetURL;
