<?php
    session_start();
    if(isset($_SESSION["name"])){
        $_COOKIE["username"] = $_SESSION["name"];
    }
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="emoji.css" />
        <style lang="css">
            .navbar_element { 
                align-items: center;
                font-size : 12px; 
                font-family : Verdana; 
                font-weight: bold; 
                background-color: blueviolet; 
                border-radius: 1px; 
                padding-top: 10px;
                padding-left: 10px;
                padding-bottom: 10px;
                padding-right: 100px;
                text-align: center;
            }
            .left {
                float : left;
            }
            .right {
                float : right;
            }
            nav[name="menu"] { 
                background-color: blue; 
                height : 15%;
                padding-top: 10px;
                padding-left: 10px;
                padding-bottom: 10px;
                padding-right: 10px;
            }
            .center {
                left: 0;
                right: 0;
                margin: auto;
                position: absolute;
                width: 15%;
                height: 15%;
                /* transform: translateY(-50%); */
                top: 5%;
            }
            
        </style>
        <script src="cookieHandler.js"></script>
        <script src="emojiGeneration.js"></script>
    </head>
    <body>
        <nav name="menu">
            <button id="home" name="home" class="navbar_element left" >Home</button>
            <button id="pairs" name="memory" class="navbar_element right" >Play Pairs</button>
            <button id="1" name="register" class="navbar_element right">Register</button>
        </nav> 
        
        <script src="navbar.js">
        </script>
    </body>
</html>