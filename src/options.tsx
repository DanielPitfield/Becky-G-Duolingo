import React from "react";
import { createRoot } from "react-dom/client";
import { targetSelectors } from "./data";

const Options = () => {
  return (
    <div className="options">
      {targetSelectors.map(({ label }) => (
        <label key={label} className="option">
          {label}
          <input type="checkbox" className="option-checkbox" />
        </label>
      ))}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
