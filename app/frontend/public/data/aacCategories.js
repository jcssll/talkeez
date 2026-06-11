
// Each tile has: word (spoken text), emoji (visual), color (tile style)
window.TALKEEZ_AAC_CATEGORIES = [
  {
    id: 'core',
    label: 'Core Words',
    icon: 'fa-star',
    tiles: [
      { word: 'I',     emoji: '🙋', color: 'blue' },
      { word: 'You',   emoji: '👉', color: 'blue' },
      { word: 'want',  emoji: '🙏', color: 'green' },
      { word: 'need',  emoji: '✋', color: 'green' },
      { word: 'like',  emoji: '👍', color: 'green' },
      { word: 'don\'t like', emoji: '👎', color: 'red' },
      { word: 'help',  emoji: '🆘', color: 'red' },
      { word: 'more',  emoji: '➕', color: 'yellow' },
      { word: 'all done', emoji: '✅', color: 'green' },
      { word: 'stop',  emoji: '🛑', color: 'red' },
      { word: 'go',    emoji: '🟢', color: 'green' },
      { word: 'yes',   emoji: '✔️', color: 'green' },
      { word: 'no',    emoji: '❌', color: 'red' },
      { word: 'please',emoji: '🤲', color: 'yellow' },
      { word: 'thank you', emoji: '💛', color: 'yellow' },
      { word: 'mine',  emoji: '🫴', color: 'purple' }
    ]
  },
  {
    id: 'feelings',
    label: 'Feelings',
    icon: 'fa-heart',
    tiles: [
      { word: 'happy', emoji: '😊', color: 'yellow' },
      { word: 'sad',   emoji: '😢', color: 'blue' },
      { word: 'angry', emoji: '😠', color: 'red' },
      { word: 'scared',emoji: '😨', color: 'purple' },
      { word: 'tired', emoji: '😴', color: 'blue' },
      { word: 'sick',  emoji: '🤒', color: 'green' },
      { word: 'hurt',  emoji: '🤕', color: 'red' },
      { word: 'silly', emoji: '🤪', color: 'orange' },
      { word: 'calm',  emoji: '😌', color: 'teal' },
      { word: 'excited', emoji: '🤩', color: 'orange' },
      { word: 'love',  emoji: '❤️', color: 'pink' },
      { word: 'proud', emoji: '🥳', color: 'yellow' }
    ]
  },
  {
    id: 'food',
    label: 'Food & Drink',
    icon: 'fa-utensils',
    tiles: [
      { word: 'water', emoji: '💧', color: 'blue' },
      { word: 'milk',  emoji: '🥛', color: 'blue' },
      { word: 'juice', emoji: '🧃', color: 'orange' },
      { word: 'apple', emoji: '🍎', color: 'red' },
      { word: 'banana',emoji: '🍌', color: 'yellow' },
      { word: 'bread', emoji: '🍞', color: 'yellow' },
      { word: 'pizza', emoji: '🍕', color: 'red' },
      { word: 'cookie',emoji: '🍪', color: 'orange' },
      { word: 'cheese',emoji: '🧀', color: 'yellow' },
      { word: 'pasta', emoji: '🍝', color: 'orange' },
      { word: 'hungry',emoji: '🍽️', color: 'red' },
      { word: 'thirsty', emoji: '🥤', color: 'blue' },
      { word: 'snack', emoji: '🥨', color: 'orange' },
      { word: 'ice cream', emoji: '🍦', color: 'pink' }
    ]
  },
  {
    id: 'actions',
    label: 'Actions',
    icon: 'fa-person-running',
    tiles: [
      { word: 'play',  emoji: '🎲', color: 'green' },
      { word: 'eat',   emoji: '🍴', color: 'orange' },
      { word: 'drink', emoji: '🥤', color: 'blue' },
      { word: 'sleep', emoji: '🛌', color: 'purple' },
      { word: 'read',  emoji: '📖', color: 'blue' },
      { word: 'sing',  emoji: '🎤', color: 'pink' },
      { word: 'dance', emoji: '💃', color: 'pink' },
      { word: 'run',   emoji: '🏃', color: 'green' },
      { word: 'walk',  emoji: '🚶', color: 'teal' },
      { word: 'jump',  emoji: '⤴️', color: 'orange' },
      { word: 'hug',   emoji: '🤗', color: 'pink' },
      { word: 'open',  emoji: '🔓', color: 'yellow' },
      { word: 'close', emoji: '🔒', color: 'red' },
      { word: 'wash',  emoji: '🧼', color: 'blue' }
    ]
  },
  {
    id: 'places',
    label: 'Places',
    icon: 'fa-location-dot',
    tiles: [
      { word: 'home',   emoji: '🏠', color: 'green' },
      { word: 'school', emoji: '🏫', color: 'blue' },
      { word: 'park',   emoji: '🌳', color: 'green' },
      { word: 'store',  emoji: '🏬', color: 'orange' },
      { word: 'car',    emoji: '🚗', color: 'red' },
      { word: 'bus',    emoji: '🚌', color: 'yellow' },
      { word: 'bedroom',emoji: '🛏️', color: 'purple' },
      { word: 'bathroom', emoji: '🚽', color: 'teal' },
      { word: 'kitchen',emoji: '🍳', color: 'orange' },
      { word: 'outside',emoji: '🌤️', color: 'blue' },
      { word: 'inside', emoji: '🚪', color: 'yellow' },
      { word: 'doctor', emoji: '🩺', color: 'red' }
    ]
  },
  {
    id: 'people',
    label: 'People',
    icon: 'fa-user-group',
    tiles: [
      { word: 'mom',     emoji: '👩', color: 'pink' },
      { word: 'dad',     emoji: '👨', color: 'blue' },
      { word: 'brother', emoji: '👦', color: 'green' },
      { word: 'sister',  emoji: '👧', color: 'pink' },
      { word: 'grandma', emoji: '👵', color: 'purple' },
      { word: 'grandpa', emoji: '👴', color: 'purple' },
      { word: 'teacher', emoji: '🧑‍🏫', color: 'blue' },
      { word: 'friend',  emoji: '🧑‍🤝‍🧑', color: 'green' },
      { word: 'baby',    emoji: '👶', color: 'yellow' },
      { word: 'doctor',  emoji: '👨‍⚕️', color: 'red' },
      { word: 'me',      emoji: '🙋', color: 'orange' },
      { word: 'they',    emoji: '👥', color: 'teal' }
    ]
  },
  {
    id: 'school',
    label: 'School',
    icon: 'fa-graduation-cap',
    tiles: [
      { word: 'book',    emoji: '📚', color: 'blue' },
      { word: 'pencil',  emoji: '✏️', color: 'yellow' },
      { word: 'paper',   emoji: '📄', color: 'yellow' },
      { word: 'crayon',  emoji: '🖍️', color: 'red' },
      { word: 'computer',emoji: '💻', color: 'teal' },
      { word: 'math',    emoji: '➗', color: 'purple' },
      { word: 'recess',  emoji: '🛝', color: 'orange' },
      { word: 'lunch',   emoji: '🥪', color: 'green' },
      { word: 'circle time', emoji: '⭕', color: 'blue' },
      { word: 'art',     emoji: '🎨', color: 'pink' },
      { word: 'music',   emoji: '🎵', color: 'pink' },
      { word: 'gym',     emoji: '🏀', color: 'orange' }
    ]
  },
  {
    id: 'time',
    label: 'Time',
    icon: 'fa-clock',
    tiles: [
      { word: 'now',     emoji: '⏰', color: 'red' },
      { word: 'later',   emoji: '⏳', color: 'yellow' },
      { word: 'today',   emoji: '📅', color: 'blue' },
      { word: 'tomorrow',emoji: '🌅', color: 'orange' },
      { word: 'morning', emoji: '🌄', color: 'yellow' },
      { word: 'night',   emoji: '🌙', color: 'purple' },
      { word: 'first',   emoji: '1️⃣', color: 'green' },
      { word: 'next',    emoji: '➡️', color: 'blue' },
      { word: 'last',    emoji: '🏁', color: 'red' },
      { word: 'wait',    emoji: '✋', color: 'yellow' }
    ]
  }
];
