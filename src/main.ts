const searchPhrases: string[] = [
  'how to appear funny',
  'why are my thumbs uneven',
  'am i lack toast and tolerant',
  'your youre difference',
  'why doesnt my poo float',
  'midget google images',
  'tall midgets??',
  'homemade lube?',
  'i hate my boss',
  'what counts as fat',
  'how to tell partner they fat',
  'is it normal to still love my ex',
  'how to get back with ex',
  'penis remove dog how to',
  'romantic ways to propose',
  'engagement rings',
  'sex shop in my city',
  'how to tell if partner cheating',
  'ways to kill someone hypothetically',
  'undetectable poisons',
  'how to delete search history in browser',
  'ashley madison hack',
  'view ashley madison list',
  'ashley madison list my city',
  'paternity test',
  'mail order paternity test',
  'attracted to mother why',
  'is incest illegal in this country',
  'latest laws incest',
  'seduction guide',
  'rohypnol safe dosage',
  'smelly penis cure urgent',
  'common STIs',
  'STI test in my city',
  'average penis size this country',
  'do penis pumps work',
  'best budget penis pumps',
  'does liking men mean im gay',
  'signs of being gay',
  'how to come out as gay to dad',
  'age of consent here',
  'why is age of consent so old here',
  'country low age of consent',
  'flights philippines',
  'isis application form',
  'how to join isis',
  'cheap syria flights from here',
  'syria hotels with pool',
  'bing',
  'donald trump'
];

const startButton = document.getElementById('start-button') as HTMLButtonElement;
const progressText = document.getElementById('progress-text') as HTMLDivElement;
const progressBar = document.getElementById('progress-bar') as HTMLDivElement;
const googleWindowName = "googleRuinHistoryWindow";

// Simple state management
let currentSearchIndex = 0;
let isSearching = false;
let searchWindow: Window | null = null;
let searchTimeout: number | null = null;
const SEARCH_DELAY = 1500; // 1.5 seconds in milliseconds

// Create the Google search URL
const createSearchUrl = (phrase: string): string => {
  return `https://www.google.com/search?q=${encodeURIComponent(phrase)}`;
};

// Update progress indicators
const updateProgress = (): void => {
  if (progressText) {
    progressText.textContent = `${currentSearchIndex}/${searchPhrases.length} searches completed`;
  }
  if (progressBar) {
    const progress = (currentSearchIndex / searchPhrases.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
};

// Perform a search with the given phrase
const performSearch = (phrase: string): void => {
  if (!isSearching) return;

  const searchUrl = createSearchUrl(phrase);

  try {
    if (searchWindow && !searchWindow.closed) {
      searchWindow.location.href = searchUrl;
    } else {
      searchWindow = window.open(searchUrl, googleWindowName, 'width=800,height=600');
    }
  } catch (e) {
    console.error("Error performing search:", e);
    try {
      window.open(searchUrl, googleWindowName);
    } catch (e2) {
      console.error("Second attempt failed:", e2);
    }
  }

  // Update progress
  currentSearchIndex++;
  updateProgress();

  // Check if we're done
  if (currentSearchIndex >= searchPhrases.length) {
    stopSearching();
    return;
  }

  // Schedule the next search with fixed delay
  startNextSearch();
};

// Start the next search after delay
const startNextSearch = (): void => {
  if (!isSearching) return;

  // Clear any existing timeout
  if (searchTimeout !== null) {
    clearTimeout(searchTimeout);
  }

  // Schedule the next search with a fixed delay
  searchTimeout = window.setTimeout(() => {
    if (isSearching && currentSearchIndex < searchPhrases.length) {
      performSearch(searchPhrases[currentSearchIndex]);
    }
  }, SEARCH_DELAY);
};

// Start the search process
const startSearching = (): void => {
  isSearching = true;
  currentSearchIndex = 0;

  // Disable start button while searching
  if (startButton) {
    startButton.disabled = true;
  }

  // Perform the first search immediately
  performSearch(searchPhrases[currentSearchIndex]);
};

// Stop the search process (internal use only - no user-initiated stopping)
const stopSearching = (): void => {
  isSearching = false;

  // Enable start button when done
  if (startButton) {
    startButton.disabled = false;
  }

  // Clear any active timers
  if (searchTimeout !== null) {
    clearTimeout(searchTimeout);
    searchTimeout = null;
  }
};

// Event listeners
if (startButton) {
  startButton.addEventListener('click', () => {
    startSearching();
  });
}

// Initialize the UI on page load
document.addEventListener('DOMContentLoaded', () => {
  updateProgress();
});
