<?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
                
        $_SESSION["name"] = $_POST["fname"];    // collect values from the input fields
        
        $cookie_name = "LoggedIn";
        $cookie_value = "true";
        $exp = 60 * 60 * 24 * 30;
        $path = "/";
        setcookie(
            $cookie_name,
            $cookie_value,
            time() + $exp,
            $path
        );
        setcookie(
            "username",
            $_POST["fname"],
            time() + $exp,
            $path
        );
        setcookie(
            "eyes",
            $_POST["eyeInput"],
            time() + $exp,
            $path
        );
        setcookie(
            "mouth",
            $_POST["mouthInput"],
            time() + $exp,
            $path
        );
        setcookie(
            "skin",
            $_POST["skinInput"],
            time() + $exp,
            $path
        );
    }
?>
<html>
    <head>
        <link rel="stylesheet" href="background.css" />
        <style lang="css">
            body{
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }
            h1{
                color: white;
                text-shadow: 2px 4px 4px /*rgba(46,91,173,0.6)*/ rgba(200, 255, 200, 0.6);
            }
            .pad {
                margin: 5%;
            }
            #pairs {
                align-items: center;
                font-size : 12px; 
                font-family : Verdana; 
                font-weight: bold; 
                background-color: blueviolet; 
                border-radius: 1px; 
                padding-top: 10px;
                padding-left: 10px;
                padding-bottom: 10px;
            }
        </style>
        <meta>
        </meta>
        <script src="cookieHandler.js">
        </script>
    </head>
    
    <body>
        <div id="main">
            <?php 
                include "navbar.php"; 
                //session_start();
            ?>
            <h1 id="title" class="pad">
                <a id="registration"></a>
            </h1>
        </div>
    </body>
    <script src="index.js">        
    </script>
</html>