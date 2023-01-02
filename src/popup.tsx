import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { TARGET_URL } from "./data";
import useIsTargetURL from "./useIsTargetURL";
import { getRandomBeckyGImageURL } from "./utils";

const Popup = () => {
  const isTargetURL = useIsTargetURL();
  const beckyImageURL = useRef<string>(getRandomBeckyGImageURL());

  function getContent(): {
    status: string;
    description: string;
    quote: string;
  } {
    if (isTargetURL) {
      return {
        status: "Active",
        description: "Replacing images with Becky G!",
        quote: "Vamos! Yo creo en ti!",
      };
    }

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

      <img src={beckyImageURL.current} width={300} />
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
