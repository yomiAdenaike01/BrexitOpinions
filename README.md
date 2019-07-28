# Brexit Opinons
>A web app that streams tweets that are about Brexit. Semantic analysis is run on each tweet to determine whether they are positive, negative or nuetral. These are represented with emojis. These are the emojis you should expect to see:

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

At times some words are not present in the AFINN-111 the database used to match the words therefore those tweets are represented with a question mark "❔"

# To Complete
- ✅ Connect to Twitter via APIs.
- ✅ Search for UK Tweets posted in the last day which are about Brexit.
- (Optional: Store these Tweets in a SQL database for efficiency.  On each recheck, just new Tweets should be added to the database.)
- ✅ Read the text of each Tweet and decide whether their sentiment is positive, negative or neutral.  We don’t want to see use of third-party sentiment libraries for this – it should be the candidate’s own code.
- ✅ Display the Tweets on a web page with a smiley next to each Tweet to indicate the sentiment choice your application has made.

- ✅ Update the page in real-time, via AJAX (jQuery is acceptable), with new Tweets.
- ✅ Control the speed of the Tweets coming in.
- ✅ Display the overall sentiment for the Tweets.
- ✅ Host this on your personal web space and provide us with a link and the source.
- ✅ Pause Tweet Stream.
- ✅ Refactor Code.


