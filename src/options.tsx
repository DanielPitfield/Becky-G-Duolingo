import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { defaultTargetSelectorOptions, targetSelectors } from "./data";

const Options = () => {
  const [targetSelectorOptions, setTargetSelectorOptions] = useState<
    { label: string; isEnabled: boolean }[]
  >(defaultTargetSelectorOptions);

  const [status, setStatus] = useState<string>("");

  // Restores the state of the selected options (using the preferences stored in chrome.storage)
  useEffect(() => {
    chrome.storage.sync.get("targetSelectorOptions", (item) => {
      // If a storage entry exists
      if (item.targetSelectorOptions) {
        // Deserialise the JSON and set the options
        setTargetSelectorOptions(JSON.parse(item.targetSelectorOptions));
      }
    });
  }, []);

  // Update status message to show options have been saved
  function showConfirmation() {
    setStatus("Options saved.");

    // Clear status message
    const id = setTimeout(() => {
      setStatus("");
    }, 1000);

    return () => clearTimeout(id);
  }

  // Saves options to chrome.storage
  function saveOptions() {
    chrome.storage.sync.set(
      { targetSelectorOptions: JSON.stringify(targetSelectorOptions) },
      showConfirmation
    );
  }

  function toggleOption(label: string) {
    // Find the option being changed in targetSelectorOptions
    const changedOption = targetSelectorOptions.find(
      (option) => option.label === label
    );

    // Toggle enabled status
    if (changedOption) {
      changedOption.isEnabled = !changedOption.isEnabled;

      // Update state with the new option
      setTargetSelectorOptions([
        ...targetSelectorOptions.filter(
          (option) => option.label !== label
        ),
        changedOption,
      ]);
    }
  }

  return (
    <div>
      <div className="options">
        {targetSelectors.map(({ label }) => (
          <label key={label} className="option">
            {label}
            <input
              type="checkbox"
              className="option-checkbox"
              checked={targetSelectorOptions?.some(
                (option) => option.label === label && option.isEnabled
              )}
              onChange={() => toggleOption(label)}
            />
          </label>
        ))}
      </div>

      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
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
