//Set the score of the value
let semanticData,semanticScore = 0, matchedWords = [],totalScore = 0;

//Create the scoring element 
var scoreElement = document.createElement("p");
scoreElement.classList.add("score-element");

//Create JS Object of emojis to use
const emojis = {
    v_happy: "😃",
    mid_happy: "😀",
    low_happy: "🙂",
    nuetral:"😐",
    low_unhappy:"😕",
    mid_unhappy: "🙁",
    v_unhappy: "☹️",
    angry:"😠",
    hate:"😡",
    v_hate:"🤬"
}


//Fetch the semantic analysis values 
fetch("/text")
.then(res=>res.json())
.then(data=> {
    semanticData = data
});

//Listen for the stream data
var socket = io.connect("/");
socket.on("stream",tweets=>{
    if(tweets != null){
        AnalyzeTweet(tweets);
    }
    //Remove the loader
    document.querySelector(".loader").style.display = "none";        
});


//Button listener to stop the stream
document.querySelector(".stopStream").addEventListener("click",()=>{
    fetch("/pause",{method:"POST"})
})

//Button listener to stop the stream
document.querySelector(".resumeStream").addEventListener("click",()=>{
    location.reload();
})
socket.on("stream:destroy",()=>socket.disconnect())
// socket.on("stream:resume",()=>socket.connect());

/**
 * Runs the sentiment analysis on the tweets
 * 1. Gets the tweets content 
 * 2. Breaks it down by the word
 * 3. Matches the score of the text to the semantic database
 * 4. Once matches will increment the score according to the score 
 * 
 * @param {*} tweets 
 */
var AnalyzeTweet = (tweets) =>{
    console.log(tweets);
    semanticScore = 0;
    const tweetText = tweets.text;
    const words = tweetText.split(/\W/);
    if(semanticData != undefined){
    for(var i = 0 ; i < words.length ; i++){
        const word = words[i];
        //Checking whether the JSON data contains the word
        if(semanticData.hasOwnProperty(word)){
            matchedWords.push(word);
            semanticScore+=parseInt(semanticData[word]);
            totalScore+=parseInt(semanticData[word]);
            //Adds the semantic value to the tweet object
            tweets.semanticValue = semanticScore;
        }
    }
        UpdateScore(totalScore)
        DisplayTweets(tweets);
    }
}
/**
 * 
 * @param {*} score 
 */
    var UpdateScore = (score) => {
        let emojiToDisplay;
        
        if(score <= -50){
            emojiToDisplay = emojis.v_hate;
        }else if(score <= -40){
            emojiToDisplay = emojis.hate
        }else if(score <= -30){
            emojiToDisplay = emojis.angry;
        }else if(score <= -20){
            emojiToDisplay = emojis.v_unhappy;
        }else if(score <= -10){
            emojiToDisplay = emojis.mid_unhappy
        }else if(score <= 0){
            emojiToDisplay = emojis.low_unhappy
        }else if(score >= 0){
            emojiToDisplay = emojis.nuetral
        }else if(score >= 10){
            emojiToDisplay = emojis.low_happy
        }else if(score >= 20){
            emojiToDisplay = emojis.mid_happy
        }else if(score >= 30){
            emojiToDisplay = emojis.v_happy
        }
        scoreElement.textContent = "Overall Sentiment: "+emojiToDisplay+" Total Sentiment Score: "+score;
        document.body.appendChild(scoreElement);
}
/**
 * Display tweets with semantic values
 * @param {*} tweet 
 */
    var DisplayTweets = (tweet) =>{
        let tweetWrapper = document.createElement("div"),
        //Define elements
        tweetNameContainer = document.createElement("p"),
        tweetDateContainer = document.createElement("p"),
        tweetUserNameContainer = document.createElement("p"),
        tweetSemanticValueContainer = document.createElement("p"),
        tweetTextContainer = document.createElement("p"),
        tweetNameAndDateWrapper = document.createElement("div"),
        tweetProfilePictureContainer = document.createElement("div");
        tweetTextAndProfileWrapper = document.createElement("div");


        //Set attributes
        tweetWrapper.classList.add("tweet-wrapper");
        tweetNameContainer.classList.add("tweet-name"),
        tweetDateContainer.classList.add("tweet-date"),
        tweetUserNameContainer.classList.add("tweet-user-name"),
        tweetSemanticValueContainer.classList.add("tweet-semantic-value"),
        tweetSemanticValueContainer.classList.add("hint--bottom"),
        tweetSemanticValueContainer.setAttribute("aria-label","Semantic Score: "+tweet.semanticValue)

        tweetTextContainer.classList.add("tweet-text");
        tweetProfilePictureContainer.classList.add("tweet-profile-picture");
        tweetNameAndDateWrapper.classList.add("tweet-name-date-wrapper");
        tweetTextAndProfileWrapper.classList.add("tweet-text-profile-wrapper");

        //Set content 
        tweetNameContainer.textContent = "@"+tweet.user.screen_name;
        tweetDateContainer.textContent = moment(tweet.created_at,
'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
        tweetSemanticValueContainer.textContent = tweet.semanticValue;
        tweetTextContainer.textContent = tweet.text;

        //Styling the profile pictures
        tweetProfilePictureContainer.style.backgroundImage = `url(${tweet.user.profile_image_url})`;
        tweetProfilePictureContainer.style.backgroundSize="cover";
        tweetProfilePictureContainer.style.backgroundPosition="center";
        
        //Semantic conditionals
        if(tweet.semanticValue != undefined){ 
        if(tweet.semanticValue == 0){
            tweetSemanticValueContainer.textContent = emojis.nuetral;
        }else if(tweet.semanticValue < 0){
            tweetSemanticValueContainer.textContent = emojis.low_unhappy;
        }else if(tweet.semanticValue <= -10){
            tweetSemanticValueContainer.textContent =  emojis.angry;
        }else if(tweet.semanticValue > 0){
            tweetSemanticValueContainer.textContent = emojis.low_happy;
        }else if(tweet.semanticValue > 5){
            tweetSemanticValueContainer.textContent = emojis.v_happy;
        }
    }else{
        tweetSemanticValueContainer.textContent = "❔";
        tweetSemanticValueContainer.setAttribute("aria-label","No Data Found");
    }
        
        
        //Append the elements 
        tweetTextAndProfileWrapper.appendChild(tweetProfilePictureContainer);
        tweetTextAndProfileWrapper.appendChild(tweetTextContainer);

        //The name and date to the date wrapper
        tweetNameAndDateWrapper.appendChild(tweetNameContainer);
        tweetNameAndDateWrapper.appendChild(tweetDateContainer);
        tweetNameAndDateWrapper.appendChild(tweetSemanticValueContainer);

        tweetWrapper.appendChild(tweetTextAndProfileWrapper);
        tweetWrapper.appendChild(tweetNameAndDateWrapper);

        const tweetContainer = document.querySelector(".tweet-container");  
        tweetContainer.append(tweetWrapper);
    }

