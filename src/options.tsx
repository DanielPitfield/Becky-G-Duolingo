import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { allTargetSelectors } from "./data";
import useIsTargetURL from "./useIsTargetURL";
import { getEnabledTargetSelectors } from "./utils";

const Options = () => {
  const isTargetURL = useIsTargetURL();

  // All target selectors are enabled by default
  const defaultTargetSelectorOptions = allTargetSelectors.map(({ label }) => {
    return { label, isEnabled: true };
  });

  const [targetSelectorOptions, setTargetSelectorOptions] = useState<
    { label: string; isEnabled: boolean }[]
  >(defaultTargetSelectorOptions);

  const [status, setStatus] = useState<string>("");

  // Restores the state of the selected options (using the preferences stored in chrome.storage)
  useEffect(() => {
    getEnabledTargetSelectors().then((selectors) =>
      setTargetSelectorOptions(
        selectors.map((x) => ({ ...x, isEnabled: true }))
      )
    );
  }, []);

  // Update status message to show options have been saved
  function showConfirmation() {
    setStatus(`Options saved. ${isTargetURL ? "Refresh Duolingo." : ""}`);

    // Clear status message
    const id = setTimeout(() => {
      setStatus("");
    }, 5000);

    return () => clearTimeout(id);
  }

  // Saves options to chrome.storage
  async function saveOptions() {
    await chrome.storage.sync.set({
      targetSelectorOptions: JSON.stringify(targetSelectorOptions),
    });

    showConfirmation();
  }

  function toggleOption(label: string) {
    // Find the option being changed in targetSelectorOptions
    const changedOption = targetSelectorOptions.find(
      (option) => option.label === label
    ) || {
      label,
      isEnabled: false,
    };

    // Toggle enabled status
    if (changedOption) {
      changedOption.isEnabled = !changedOption.isEnabled;

      // Update state with the new option
      setTargetSelectorOptions([
        ...targetSelectorOptions.filter((option) => option.label !== label),
        changedOption,
      ]);
    }
  }

  return (
    <div>
      <p>Select which images to be replaced</p>
      <div className="options">
        <h3 className="title">Images</h3>
        {allTargetSelectors.map(({ label }) => (
          <label key={label} className="option">
            <input
              type="checkbox"
              className="option-checkbox"
              checked={targetSelectorOptions?.some(
                (option) => option.label === label && option.isEnabled
              )}
              onClick={() => toggleOption(label)}
            />
            <span className="option-text">{label}</span>
          </label>
        ))}
      </div>

      {status && <div className="status">{status}</div>}
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
