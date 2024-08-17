Ubiquitous navbar has customised emoji; all pages complex. Stylesheets used to standardise the background on all pages, define how to line up the customisable traits for the emoji so that it can be generated on cards and navbar in a regular style with traits aligned.
Landing page 
-displays welcome message with the user’s name if using registered session with the link for pairs; if not registered, a hyperlink to register is shown.
Registration page
-allows user to pick avatar traits and name. Clicking the check if valid button will reveal the submit button if valid and will prompt user to enter valid data if not;
-posts the data to form_submit.php to sort sessions/cookies for user;
-.js file is used to allow getting and setting of cookies across the site. 
-Returns to index/landing page to display the welcome message and the button to play pairs.
Pairs 
-follows complex; 
-levels get harder by increasing cards in the game, changing number of cards to match, changing the timer (explained in comments of pairs.js lines 73-91); 
-card flipping shown; turn green if matched; if all attempts are used or if timer reaches 0, cards not matched are flipped and turned red. Cards have spontaneous random emojis;
-emojiGeneration.js used to randomly create emojis using filepaths
-Option to reset game or submit score is offered if in a registered session
Leaderboard 
-shows all games played with usernames, totals and individual level scores in comma-separated lists. 
-Scores calculation explained in comments of lines 9-12 in pairs.js
