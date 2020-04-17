const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteText.hidden = true;
  quoteContainer.hidden = true;
  authorText.hidden = true;
}

// Remove Loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    quoteText.hidden = false;
    authorText.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
function getQuote() {
  loading();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  fetch(proxyUrl + apiUrl)
    .then((res) => res.json())
    .then((data) => {
      if (authorText.innerText !== undefined) {
        // Check if Author field is blank and replace it with 'Unknown'
        if (data.quoteAuthor === '') {
          authorText.innerText = 'Unknown';
        } else {
          authorText.innerText = data.quoteAuthor;
        }
        // Dynamically reduce font size for long quotes
        if (data.quoteText.length > 120) {
          quoteText.classList.add('long-quote');
        } else {
          quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        complete();
      }
    })
    .catch(() => {
      // Can be used to log errors, etc.
    });
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Handlers
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
