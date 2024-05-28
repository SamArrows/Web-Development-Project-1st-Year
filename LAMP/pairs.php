<html>
    <head>
        <script src="emojiGeneration.js">
        </script>
        <script src="cookieHandler.js">
        </script>
        <link rel="stylesheet" type="text/css" href="emoji.css"/>
        <link rel="stylesheet" type="text/css" href="background.css" />
        <link rel="stylesheet" type="text/css" href="pairs.css" />
    </head>
    <body>
        <div id="main">
            <?php
                include "navbar.php";
            ?>
            <form action="leaderboard.php" method="post">
                <input id="nameInput" name="fname" type="text" hidden="true">
                <input id="scoreInput" name="fscore" type="text" hidden="true">
                <input id="totalInput" name="ftotal" type="text" hidden="true">
                <input id="btnSubmit" class="btn" type="submit" value="Submit" hidden="true">
            </form>
            <button class="btn" id="start" >Start the game</button>
            <div id="game" hidden="true">
                <p id="levelInstructions" class="info"></p>
                <p id="attemptsLeft" class="info"></p>
                <p id="timer" class="info"></p>
            </div>
        </div>
        <script src="pairs.js">
        </script>
    </body>
</html>