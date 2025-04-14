chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "speak") {
    // Get list of available voices
    chrome.tts.getVoices(function (voices) {
      // Find a Spanish voice that sounds most feminine
      const spanishVoice = voices.find(
        (voice) => voice.lang === "es-ES" && voice.voiceName?.toLowerCase().includes("female")
      );

      // Use the voice if found, otherwise use default Spanish
      chrome.tts.speak(request.text, {
        voiceName: spanishVoice?.voiceName,
        lang: "es-ES",
        rate: 1.0,
        pitch: 1.2, // Slightly higher pitch
        volume: 1.0,
        onEvent: function (event) {
          if (event.type === "error") {
            console.error("Error speaking text:", event.errorMessage);
          }
        },
      });
    });
  }
});
