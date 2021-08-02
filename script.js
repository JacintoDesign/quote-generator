// Get all the elements by their ID in other to manipulate them
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const quoteContainer = document.getElementById("quote__container");
const loader = document.getElementById("loader");
const tweetButton = document.getElementById("tweet");
const newQuotButton = document.getElementById("newQuote");

let apiQuotes = [];
// Show Loader
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader
function hideLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Display a random quote from array of quote object gotten from the quote API
function newQuote() {
  // At the beginning of getting the quote, the loader shows to indicate fetching the quote
  showLoading();

  // Choose a random quote from the list of quote and store in a quote binding variable
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Change quote text dynamically when new quote is clicked
  // Change the font-size of quote text based on how long the quote is
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  // Stop showingloading after getting random quote from  the quote API
  hideLoading();

  // Change the author of the quote dynamically when there is a new quote or the new quote button is clicked
  // Changing the author to Unknown, if it returns null from quote API
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
}

function tweetQuote() {
  // Tweet this quote at this twitter address
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  // Open this twitter address in a new tab to tweet this quote
  window.open(twitterUrl, "_blank");
}

// get Quote from API asynchronously
async function getQuotes() {
  showLoading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch the Error Here and do something when an error occurs
  }
}

// Add EventListner to the button in order to tweet and also to get a new quote
tweetButton.addEventListener("click", tweetQuote);
newQuotButton.addEventListener("click", newQuote);

// On Load

getQuotes();
