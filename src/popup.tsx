import React from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  return <div>Replace cartoony images on Duolingo with Becky G!</div>;
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
