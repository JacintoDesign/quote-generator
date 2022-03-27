const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// to get loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
    
    }
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
    
}
    

// Getting quotes from API
let apiQuotes = [];
//Show new quote
function newQuote(){
    loading();
    //Pick a random quote.
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If author is not present.
    if (!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }
    // Check quote text to determine length.
    if (quote.text.length > 120)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    // Set quote and hide laoding sign
    complete();
    SameSite = Strict;
}
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        // To prevent third party access to cookies.
        SameSite = Strict;

    }
    catch(error){
         //Catch Error here
    }
}

// Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');

}
// Event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On load
getQuotes();
