<?php
    session_start();
?>
<html>
    <head>
        <link rel="stylesheet" href="background.css" />
        <link rel="stylesheet" href="registration.css" />
        <link rel="stylesheet" href="emoji.css" />
        <meta>
        </meta>
        <script src="emojiGeneration.js">
        </script>
        <script src="cookieHandler.js">
        </script>
    </head>
    <body>
        <?php
            include "navbar.php";
        ?>
        <div id="main">
            <br>
            <br>
            <form name="frm1" action="index.php" method="post" >
                <p>Enter a username</p>
                <input type="text" id="username" name="fname" required>
                <p id="errorMessage"></p>
                <p>Select one from each category of eyes, mouth and skin</p>
                <div id="eyesContainer">
                    <button type="button" class="eyes" id="closed" name="closed.png"></button>
                    <button type="button" class="eyes" id="laughing" name="laughing.png"></button>
                    <button type="button" class="eyes" id="long" name="long.png"></button>
                    <button type="button" class="eyes" id="normal" name="normal.png"></button>
                    <button type="button" class="eyes" id="rolling" name="rolling.png"></button>
                    <button type="button" class="eyes" id="winking" name="winking.png"></button>
                </div>
                <br>
                <div id="mouthContainer">
                    <button type="button" class="mouth" id="open" name="open.png"></button>
                    <button type="button" class="mouth" id="sad" name="sad.png"></button>
                    <button type="button" class="mouth" id="smiling" name="smiling.png"></button>
                    <button type="button" class="mouth" id="straight" name="straight.png"></button>
                    <button type="button" class="mouth" id="surprise" name="surprise.png"></button>
                    <button type="button" class="mouth" id="teeth" name="teeth.png"></button>
                </div>
                <br>
                <div id="skinContainer">
                    <button type="button" class="skin" id="green" name="green.png"></button>
                    <button type="button" class="skin" id="red" name="red.png"></button>
                    <button type="button" class="skin" id="yellow" name="yellow.png"></button>
                </div>
                <br>
                <div id="emoji" class="parent">
                    <img id="skinLayer" class="background" />
                    <img id="eyeLayer" class="foreground" />
                    <img id="mouthLayer" class="foreground" />
                </div>
                <button id="validateForm">Check Details are valid</button>
                <input name="eyeInput" type="text" hidden="true">
                <input name="mouthInput" type="text" hidden="true">
                <input name="skinInput" type="text" hidden="true">
                <input id="btnSubmit" type="submit" value="Submit" hidden="true">
            </form>
            
        </div>
    </body>
    <script src="registration.js">
    </script>
</html>
