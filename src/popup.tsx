import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { beckyImages } from "./data";

const Popup = () => {
  const TARGET_URL = "duolingo.com";
  const [currentURL, setCurrentURL] = useState<string>("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentURL(tabs[0].url ?? "-");
    });
  }, []);

  function getContent(): {
    status: string;
    description: string;
    quote: string;
  } {
    // Current tab is Duolingo
    if (currentURL.includes(TARGET_URL)) {
      return {
        status: "Active",
        description: "Replacing cartoony images on Duolingo with Becky G!",
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
      <div
        className="status"
        data-is-target-url={currentURL.includes(TARGET_URL)}
      >
        {status}
      </div>
      <div className="description">{description}</div>
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
