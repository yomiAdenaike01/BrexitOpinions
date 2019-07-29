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

# Future Content
- Resume twitter stream after pause.
- Add notifications for pausing and resuming the stream. 
- Updating the semantic values file. 
- Publish on AWS EC2 Server.
- Re-develop using TDD, CI & CD.
- ✅ Add more controls (stream speed).
- Publish report after a certain amount of time to display the most found words and overall opinion.

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
