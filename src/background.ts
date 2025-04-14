chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "speak") {
    // Get list of available voices
    chrome.tts.getVoices(function (voices) {
      // Filter Spanish voices
      const spanishVoices = voices.filter((voice) => voice.lang === "es-ES");
      console.log("Voices: ", spanishVoices);

      // TODO: Use the voice that sounds most feminine (only seems to be one default voice named 'Google espanol')
      const selectedVoice = spanishVoices?.[0];
      console.log("Selected voice: ", selectedVoice);

      // Use the voice if found, otherwise use default Spanish
      chrome.tts.speak(request.text, {
        voiceName: selectedVoice?.voiceName,
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
