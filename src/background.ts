chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "speak") {
    // Get list of available voices
    chrome.tts.getVoices(function (voices) {
      // Find a female Spanish voice
      const spanishFemaleVoice = voices.find((voice) => voice.lang === "es-ES" && voice.gender === "female");

      // Use the female Spanish voice if found, otherwise use default Spanish
      chrome.tts.speak(request.text, {
        voiceName: spanishFemaleVoice?.voiceName,
        lang: "es-ES",
        rate: 1.0,
        pitch: 1.5,
        onEvent: function (event) {
          if (event.type === "error") {
            console.error("Error speaking text:", event.errorMessage);
          }
        },
      });
    });
  }
});
