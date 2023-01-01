import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { beckyImages } from "./data";

const Popup = () => {
  const TARGET_URL = "https://www.duolingo.com";
  const [currentURL, setCurrentURL] = useState<string>("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentURL(tabs[0].url ?? "-");
    });
  }, []);

  // Is the active tab Duolingo?
  const isTargetURL = currentURL.startsWith(TARGET_URL);

  function getContent(): {
    status: string;
    description: string;
    quote: string;
  } {
    // Current tab is Duolingo
    if (isTargetURL) {
      return {
        status: "Active",
        description: "Replacing images with Becky G!",
        quote: "Vamos! No hay garantía aqui, pero yo creo en ti!",
      };
    }

    // Otherwise
    return {
      status: "Not Active",
      description: "Go to Duolingo",
      quote: "Quieres aprender español conmigo?",
    };
  }

  const { status, description, quote } = getContent();

  return (
    <div className="wrapper">
      <div className="status" data-is-target-url={isTargetURL}>
        {status}
      </div>

      {isTargetURL ? (
        <div className="description">{description}</div>
      ) : (
        <button
          className="navigate-button"
          onClick={() => chrome.tabs.create({ url: TARGET_URL })}
        >
          {description}
        </button>
      )}

      <img src={beckyImages[0]} width={300} height={300} />
      <div className="becky-quote">{quote}</div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
