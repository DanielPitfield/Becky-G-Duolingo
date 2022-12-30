import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { targetSelectors } from "./data";

const Options = () => {
  // All target selectors are enabled by default
  const defaultTargetSelectorOptions = targetSelectors.map((x) => {
    return { selectorLabel: x.label, isEnabled: true };
  });

  const [targetSelectorOptions, setTargetSelectorOptions] = useState<
    { selectorLabel: string; isEnabled: boolean }[]
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

  // Saves options to chrome.storage
  function saveOptions() {
    chrome.storage.sync.set(
      { targetSelectorOptions: JSON.stringify(targetSelectorOptions) },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");

        // Clear status message
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);

        return () => clearTimeout(id);
      }
    );
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
                (option) => option.selectorLabel === label && option.isEnabled
              )}
              onChange={() => {
                // Find the option being changed in targetSelectorOptions
                const changedOption = targetSelectorOptions.find(
                  (option) => option.selectorLabel === label
                );

                // Toggle enabled status
                if (changedOption) {
                  changedOption.isEnabled = !changedOption.isEnabled;

                  // Update state with the new option
                  setTargetSelectorOptions([
                    ...targetSelectorOptions.filter(
                      (item) => item.selectorLabel !== label
                    ),
                    changedOption,
                  ]);
                }
              }}
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
