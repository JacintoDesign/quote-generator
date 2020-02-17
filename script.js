const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get quote from API
function getQuote() {
    loading();
    fetch('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Check if Author field is blank and replace it with 'Unknown'
        if (data.quoteAuthor === '') {
            authorEl.innerHTML = 'Unknown';
        } else {
            authorEl.innerHTML = data.quoteAuthor;
        }
        // Dynamically reduce font size for long quotes
        console.log(data.quoteText.length);
        if (data.quoteText.length > 120) {
            quoteEl.classList.add('long-quote');
        } else {
            quoteEl.classList.remove('long-quote');
        }
        quoteEl.innerHTML = data.quoteText;
    })
    .catch(err => {
        getQuote();
    });
    setTimeout(complete, 500);
}

// Tweet the quote
function tweetQuote() {
    let quote = quoteEl.innerHTML;
    let author = authorEl.innerHTML;
    let twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank'); 
}

// Loading spinner shown
function loading() {
    quoteEl.style.visibility = 'hidden';
    authorEl.style.visibility = 'hidden';
    loader.style.visibility = 'visible';
}

// Remove loading spinner
function complete() {
    if (loader.style.visibility === 'visible') {
        quoteEl.style.visibility = 'visible';
        authorEl.style.visibility = 'visible';
        loader.style.visibility = 'hidden';
    } 
}

// Startup, get a new quote
getQuote();

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);