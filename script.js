const myquoteContainer=document.getElementById("quote-container");
const myquoteText=document.getElementById("quote");
const myauthorText=document.getElementById("author");
const mytwitterBtn=document.getElementById("twitter");
const mynewQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById("loader");

function showLoadingSpinner(){
  loader.hidden=false;
  myquoteContainer.hidden=true;
}

function removeLoadingSpinner(){
  if(!loader.hidden){
    loader.hidden=true;
    myquoteContainer.hidden=false;
  }
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  // we uneed to use a proxy URl to make our API call in order to avoid the CORS policy:'Access-Control-Allow-Origin'issue
  const proxyURL = "https://immense-mesa-24895.herokuapp.com/";//"https://cors-anywhere.herokuapp.com/";
  const apiURL ="http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  try {
    //'proxyURL+apiURL':This will allow use to add the headers from proxyURL
    const response = await fetch(proxyURL + apiURL);
    if (response.ok) {
      let data = await response.json();
      // If Author is blank, add "Unknown"
      if(data.quoteAuthor===""){
        myauthorText.innerText="Unknown";
      }else{
      myauthorText.innerText=data.quoteAuthor;
      }
      //Reduce font size for long quotes
      if(data.quoteText.length>120){
        myquoteText.classList.add("long-quote");
      }else{
        myquoteText.classList.remove("long-quote");
      }
      // console.log(data);
      myquoteText.innerText=data.quoteText;
      // Show quote,Stop loader
      removeLoadingSpinner();
    } else {
      alert("HTTP-Error: " + response.status);
    }
  } catch (error) {
    
    getQuote();
  }
}

//Tweet Quote
function tweetQuote(){
  const quote=myquoteText.innerText;
  const author=myauthorText.innerText;
  const twitter_url=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitter_url,"_blank");
}

// Event Listeners
mynewQuoteBtn.addEventListener("click",getQuote);
mytwitterBtn.addEventListener("click",tweetQuote);

//On Load
getQuote();
