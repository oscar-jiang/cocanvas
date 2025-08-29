export function formatMessageTime(date:string) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatMonthDay(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', // or 'short' for Jan, Feb, etc.
    day: 'numeric',
  });
}

export function formatYear(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', // or 'short' for Jan, Feb, etc.
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatMonthYear(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long', // or 'short' for Jan, Feb, etc.
    year: 'numeric',
  });
}

export function truncateText(text: string, limit: number) {
  return text.length > limit ? text.slice(0, limit) + '…' : text;
}

export const emojiCategories: {label: string, emojis: string[]}[]  = [
  {
    label: "Commonly Used",
    emojis: ["🚀","🎨","📊","📖","🧪","🌐","🎉","💡","🔒"]
  },
  {
    label: "Faces & People",
    emojis: [
      "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
      "🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚",
      "😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩",
      "🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣",
      "😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬"
    ]
  },
  {
    label: "Animals & Nature",
    emojis: [
      "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
      "🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒",
      "🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇",
      "🐺","🐗","🐴","🦄","🐝","🐛","🦋","🐌","🐚","🐞"
    ]
  },
  {
    label: "Food & Drink",
    emojis: [
      "🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐",
      "🥝","🍈","🍒","🍑","🥭","🍍","🥥","🥑","🍆","🥔",
      "🥕","🌽","🌶️","🥒","🥬","🥦","🧄","🧅","🍄","🥜",
      "🌰","🍞","🥐","🥖","🥨","🥯","🧇","🥞","🧈","🧂"
    ]
  },
  {
    label: "Activities & Sports",
    emojis: [
      "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱",
      "🪀","🏓","🏸","🥅","⛳","🪁","🏹","🎣","🤿","🥊",
      "🥋","🎽","🛷","🛹","🎿","⛷️","🏂","🏋️","🤸","🤾"
    ]
  },
  {
    label: "Objects",
    emojis: [
      "⌚","📱","📲","💻","🖥️","🖨️","⌨️","🖱️","🖲️","💽",
      "💾","💿","📀","🎥","🎬","📷","📸","📹","📼","🔍",
      "🔎","🕯️","💡","🔦","🏮","📔","📕","📖","📗","📘",
      "📙","📚","📓","📒","📃","📰","🗞️","📑","🔖","🏷️",
      "💰","💳","💎","⚖️","🧰","🧲","🔧","🔨","⚒️","🛠️",
      "⛏️","🔩","⚙️","🗜️","🪛","🪚","🪝","🧪","🧫","🧬",
      "🧹","🧺","🪣","🛋️","🪑","🛏️","🛌","🪟","🪞","🚪",
      "🛎️","🧳","🛍️"
    ]
  }
];

export const randomEmoji = (): string => {
  const category = emojiCategories[Math.floor(Math.random() * emojiCategories.length)];
  return category.emojis[Math.floor(Math.random() * category.emojis.length)];
};