const filePaths = [
    ["green.png", "red.png", "yellow.png"],
    ["closed.png", "laughing.png", "long.png", "normal.png", "rolling.png", "winking.png" ],
    ["open.png", "sad.png", "smiling.png", "straight.png", "surprise.png", "teeth.png" ]
];
var cardsToCheck = [];
var debug = []; //a duplicate array of the cards is needed for the async function(s) 
var scores = []; /*
-each level's score is calculated by attempts remaining, i.e. more attempts left = higher score; 
-the scores are added to the array with scores[0] being level 1, scores[1] being level 2, etc.
-time is also factored into the score calculation, with a level's score being equal to 10 * attemptsLeft + time left;
-total score is the sum of all the scores from COMPLETED LEVELS - unsuccessful levels will warrant a score of 0  */
var totalScore = 0;
var failed = false;
var attemptConstant = 2.5;
var defaultTime = 120;  //2 minutes is the time alloted per level
var cardsPerSet;
var cards = document.querySelectorAll('.card');
var clickCount = 0;
var gameSettings = [2, 4, 1]; //levels 1-5 use pairs, 6-10 threes, 12+ requires 4 cards to be picked
var timer = document.getElementById("timer");
//level 6 adds another card to each row. Level 8 onwards adds another row every 4 levels.

document.getElementById("start").addEventListener("click", function (){
    document.getElementById("start").remove();
    document.getElementById("game").hidden = false;
    instantiateGame(gameSettings[0], gameSettings[1], gameSettings[2]);
    startTimer();
});

function setFailed(){
    failed = true;
    timer.textContent = "";
    var cards = document.querySelectorAll(".flip-card-back");
    for(let i = 0; i < cards.length; i++){
        if(!cards[i].parentNode.parentNode.classList.contains("matched")){
            cards[i].style.background = "red";
            cards[i].parentNode.parentNode.classList.toggle("is-flipped");
        }
    }
    var scoreString = "";
    for(let i = 0; i < scores.length; i++){
        totalScore += scores[i];
        scoreString += scores[i] + ",";
    }
    scoreString = scoreString.substring(0, scoreString.length-1)
    var display = document.getElementById("attemptsLeft");
    display.textContent = "";
    if(scores.length != 0){
        display.textContent += "TOTAL SCORE: " + totalScore + ";       ";
        for(let i = 0; i < scores.length; i++){
            display.textContent += "Level " + (i+1) + " score: " + scores[i] + "; ";
        }
    }
    if(getCookie("LoggedIn") && scores.length > 0){
        document.getElementById("btnSubmit").hidden = false;
        document.getElementById("nameInput").value = getCookie("username");
        document.getElementById("scoreInput").value = scoreString;
        document.getElementById("totalInput").value = totalScore;

        var playAgain = document.createElement("button");
        playAgain.id = "playAgain";
        playAgain.textContent = "Don't submit score and restart game?";
        playAgain.classList.add("btn");
        playAgain.addEventListener("click", function (){
            location.href='pairs.php';
        });
        document.getElementById("main").appendChild(playAgain);
    }
}

/*
Each level has a restriction of the guesses you can use, based on the formula:
max guesses allowed = round(number of cards * 1.8) where max guesses is no. of cards per set * clickCount
1 - 2x4 / 2
2 - 2x5 / 2
3 - 2x6 / 2
4 - 2x7 / 2
5 - 2x8 / 2
6 - 2x9 / 2
7 - 3x4 / 3
8 - 3x5 / 3
9 - 3x6 / 3
10 - 3x7 / 3
11 - 3x8 / 3
12 - 4x9 / 4
13 - 4x10 / 4
14 - 4x11 / 4
15 - 4x12 / 4
16 - timer has 120 seconds before level 16 but onwards, each level removes one second from the start time with 16 having 119; 
the rules regarding attempts allowed still remain
*/

function setMatched(){
    var cards = document.querySelectorAll(".flip-card-back");
    var matchedSoFar = 0;
    for(let i = 0; i < cards.length; i++){
        if(cards[i].parentNode.parentNode.classList.contains("matched")){
            cards[i].style.background = "green";
            matchedSoFar++;
        }
    }
    if(matchedSoFar == document.querySelectorAll(".card").length){
        levelCompleted = true;
        scores.push(10 * (Math.round(gameSettings[0] * gameSettings[1] * attemptConstant) - clickCount) + parseInt(timer.textContent));
        if(gameSettings[2] == 6){
                //upon completion of level 6, the deck is reduced to 12 cards but now the player must match threes (level 7)
                gameSettings = [3, 4, 6];
        }
        else if (gameSettings[2] == 11){
            //upon completion of level 11, the deck is turned into a 4x10 and progressing levels add another card to each row with 4 being needed to match.
            gameSettings = [4, 10, 11];
        }
        else{
            if(gameSettings[2] < 16){
                gameSettings[1]++;  //up to level 10 another card is added per row to the deck, with gameplay involving matching 2 cards up to level 6
            }
            else{
                //level difficulty becomes related to a change in the time allotted to complete the level
            }
            
        }
        gameSettings[2]++;
        instantiateGame(gameSettings[0], gameSettings[1], gameSettings[2]);
    }
}


function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function checkCards(){
    var match = true;
    for(let i = debug.length-1; i > 0; i--){
        if(debug[i].name != debug[i-1].name){
            match = false;
        }
    }
    await delay(400);
    if(match){
        for(let i = 0; i < debug.length; i++){
            debug[i].classList.add("matched");
        }
        setMatched();
    }
    else{
        for(let i = 0; i < debug.length; i++){
            debug[i].classList.toggle("is-flipped");
        }
    }
    if(maxClicksTaken() && document.querySelectorAll(".matched").length != document.querySelectorAll(".cards").length && !failed){
        setFailed();
    }
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function removeAt(indexToRemove, arrayToModify){
    if(indexToRemove == 0){
        arrayToModify.shift();
    }
    else if(indexToRemove == arrayToModify.length-1){
        arrayToModify.pop();
    }
    else{
        if(!(indexToRemove > arrayToModify.length-1)){
            const beforeIndex = arrayToModify.slice(0, indexToRemove);
            const afterIndex = arrayToModify.slice(indexToRemove + 1, arrayToModify.length);
            arrayToModify = beforeIndex.concat(afterIndex);
        }
    }
    return arrayToModify;
}

function instantiateGame(noOfRows, noOfColumns, level){
    defaultTime = 120;
    clickCount = 0;
    let rows = document.getElementsByClassName("Row");
    while(rows.length != 0){
        rows[0].remove();   //clears the table
    }
    //generate pairs, threes, fours, based on number of cards being used in the game
    var noOfSets;
    if(level > 6 && (noOfRows * noOfColumns % 3 == 0)){
        cardsPerSet = 3;
    }
    else{
        if(level > 11){
            cardsPerSet = 4;
            if(level > 15){
                defaultTime = 120 - (level - 15);
            }
        }
        else{
            cardsPerSet = 2;
        }
        
    }
    noOfSets = noOfColumns * noOfRows / cardsPerSet;
    
    document.getElementById("levelInstructions").textContent = "Level " + level + "; grid size: " + noOfRows + "x" + noOfColumns + "; match cards in groups of " + cardsPerSet;
    document.getElementById("attemptsLeft").textContent = "Attempts remaining: " + Math.round(noOfRows * noOfColumns * attemptConstant);
    var array = [];
    while(array.length < noOfSets * cardsPerSet){
        var traits = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)];
        if(array.length < 1){
            for(let i = 0; i < cardsPerSet; i++){
                array.push(traits);
            }
        }
        else{
            let i = 0;
            let addToList = true;
            for(let i = 0; i < array.length; i++){
                if(arrayEquals(array[i], traits)){
                    addToList = false;
                }
            }
            if(addToList){
                for(let i = 0; i < cardsPerSet; i++){
                    array.push(traits);
                }
            }
        }
    }
    for(let i = 0; i < noOfRows; i++){
        var row = document.createElement('div');
        row.classList.add('Row');
        for(let j = 0; j < noOfColumns; j++){
            var col = document.createElement('div');
            col.classList.add('card', 'Column');

            var inner = document.createElement('div');
            inner.classList.add('flip-card-inner');

            var front = document.createElement('div');
            front.classList.add('flip-card-front');

            var back = document.createElement('div');
            back.classList.add('flip-card-back');
            
            var index = Math.floor(Math.random() * array.length);
            var background = generateEmoji(filePaths[0][array[index][0]], filePaths[1][array[index][1]], filePaths[2][array[index][2]]);
            background.classList.add("card-center");
            col.name = array[index][0] + "" + array[index][1] + "" + array[index][2];
            array = removeAt(index, array);
            
            back.appendChild(background);

            inner.appendChild(front);
            inner.appendChild(back);

            col.appendChild(inner);

            row.appendChild(col);
        }
        document.getElementById('game').appendChild(row);
    }
    cards = document.querySelectorAll(".card");
    [...cards].forEach((card)=>{
        card.addEventListener( 'click', function() {
            if(!failed){
                if(!card.classList.contains('is-flipped')){
                    card.classList.toggle('is-flipped');
                    cardsToCheck.push(card);
                    clickCount++;
                    document.getElementById("attemptsLeft").textContent = "Attempts remaining: " + (Math.round(gameSettings[0] * gameSettings[1] * attemptConstant) - clickCount);
                    if(clickCount % cardsPerSet == 0){
                        debug = cardsToCheck;
                        cardsToCheck = [];
                        checkCards();
                    }
                    else{
                        if(maxClicksTaken()){
                            setFailed();
                        }
                    }
                }
            }
        });
    });
    
}
function maxClicksTaken(){
if(clickCount >= Math.round(gameSettings[0] * gameSettings[1] * attemptConstant) || Math.round(gameSettings[0] * gameSettings[1] * attemptConstant) - clickCount == 0){
    return true;
}
else{
    return false;
}
}
async function startTimer(){
if(!failed && defaultTime > 0 && !maxClicksTaken()){
    timer.textContent = defaultTime;
    defaultTime--;
    await delay(1000);
    startTimer();
}
if(defaultTime < 1){
    if(!failed){
        setFailed();
    }
}
else{
    if(maxClicksTaken()){
        if(!failed && document.querySelectorAll(".matched").length != document.querySelectorAll(".cards").length){
            setFailed();
        }
    }
}
}