const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    const allQuotes = await response.json();
    // Pick a random quote from array
    let quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    // Set Author
    authorText.textContent = quote.author;
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    // Set Quote
    quoteText.textContent = quote.text;
    // Hide Loader
    complete();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
