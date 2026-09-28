// Free Talkeez AAC — vocabulary grid + sentence builder
(function() {
  const state = {
    categoryIndex: 0,
    sentence: []  // array of words
  };

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(k => {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.startsWith('data-')) e.setAttribute(k, attrs[k]);
      else e[k] = attrs[k];
    });
    (children || []).forEach(c => e.appendChild(c));
    return e;
  }

  function renderCategories() {
    const bar = document.querySelector('[data-testid=\"aac-categories\"]');
    if (!bar) return;
    bar.innerHTML = '';
    window.TALKEEZ_AAC_CATEGORIES.forEach((cat, i) => {
      const b = el('button', {
        class: 'cat-btn' + (i === state.categoryIndex ? ' active' : ''),
        'data-testid': 'aac-category-' + cat.id,
        type: 'button'
      });
      b.innerHTML = '<i class=\"fa-solid ' + cat.icon + '\"></i> ' + cat.label;
      b.addEventListener('click', () => {
        state.categoryIndex = i;
        renderCategories();
        renderGrid();
      });
      bar.appendChild(b);
    });
  }

  function renderGrid() {
    const grid = document.querySelector('[data-testid=\"aac-grid\"]');
    if (!grid) return;
    grid.innerHTML = '';
    const cat = window.TALKEEZ_AAC_CATEGORIES[state.categoryIndex];
    cat.tiles.forEach((t, idx) => {
      const tile = el('button', {
        class: 'aac-tile color-' + (t.color || 'blue'),
        'data-testid': 'aac-tile-' + cat.id + '-' + idx,
        type: 'button',
        'aria-label': t.word
      });
      tile.innerHTML = '<span class=\"emoji\" aria-hidden=\"true\">' + t.emoji + '</span><span>' + t.word + '</span>';
      tile.addEventListener('click', () => onTileTap(t, tile));
      grid.appendChild(tile);
    });
  }

  function onTileTap(t, tile) {
    // Add to sentence and speak the single word
    state.sentence.push(t.word);
    renderSentence();
    tile.classList.add('speaking');
    window.TalkeezSpeech && window.TalkeezSpeech.speak(t.word);
    setTimeout(() => tile.classList.remove('speaking'), 700);
  }

  function renderSentence() {
    const strip = document.querySelector('[data-testid=\"sentence-strip\"]');
    if (!strip) return;
    strip.innerHTML = '';
    state.sentence.forEach((w, i) => {
      const token = el('button', {
        class: 'sentence-token',
        type: 'button',
        'data-testid': 'sentence-token-' + i,
        'aria-label': 'Remove ' + w
      });
      token.innerHTML = w + ' <i class=\"fa-solid fa-xmark\"></i>';
      token.addEventListener('click', () => {
        state.sentence.splice(i, 1);
        renderSentence();
      });
      strip.appendChild(token);
    });
  }

  function speakSentence() {
    if (!state.sentence.length) return;
    window.TalkeezSpeech && window.TalkeezSpeech.speak(state.sentence.join(' '));
  }

  function clearSentence() {
    state.sentence = [];
    renderSentence();
    window.TalkeezSpeech && window.TalkeezSpeech.cancel();
  }

  function backspace() {
    state.sentence.pop();
    renderSentence();
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderCategories();
    renderGrid();
    renderSentence();

    const speakBtn = document.querySelector('[data-testid=\"aac-speak-sentence\"]');
    if (speakBtn) speakBtn.addEventListener('click', speakSentence);

    const clearBtn = document.querySelector('[data-testid=\"aac-clear\"]');
    if (clearBtn) clearBtn.addEventListener('click', clearSentence);

    const backBtn = document.querySelector('[data-testid=\"aac-backspace\"]');
    if (backBtn) backBtn.addEventListener('click', backspace);

    const fsBtn = document.querySelector('[data-testid=\"aac-fullscreen\"]');
    if (fsBtn) fsBtn.addEventListener('click', function() {
      const docEl = document.documentElement;
      if (!document.fullscreenElement) {
        if (docEl.requestFullscreen) docEl.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });
  });
})();