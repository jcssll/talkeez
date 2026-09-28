// Web Speech API helper for Talkeez AAC
window.TalkeezSpeech = (function() {
  let voicesCache = [];
  let preferredVoice = null;

  function loadVoices() {
    if (!('speechSynthesis' in window)) return [];
    voicesCache = window.speechSynthesis.getVoices() || [];
    // Prefer an English female-ish or child-friendly voice
    preferredVoice =
      voicesCache.find(v => /en(-|_)?US/i.test(v.lang) && /female|samantha|google US|zira/i.test(v.name)) ||
      voicesCache.find(v => /^en/i.test(v.lang)) ||
      voicesCache[0] || null;
    return voicesCache;
  }

  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function speak(text, opts) {
    if (!text || !('speechSynthesis' in window)) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      u.rate = (opts && opts.rate) || 0.95;
      u.pitch = (opts && opts.pitch) || 1.05;
      u.volume = (opts && opts.volume) || 1;
      if (preferredVoice) u.voice = preferredVoice;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      console.warn('Speech error', e);
      return false;
    }
  }

  function cancel() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function supported() {
    return 'speechSynthesis' in window;
  }

  return { speak: speak, cancel: cancel, supported: supported, loadVoices: loadVoices };
})();
