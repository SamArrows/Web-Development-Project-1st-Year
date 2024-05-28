<?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // $_SESSION["name"] = $_POST["fname"];    // collect values from the input fields
        // $_SESSION["scores"] = $_POST["fscore"];
        // [
        //     'expires' => time() + $exp,
        //     'path' => $path,
        //     //'secure' => true,
        //     'samesite' => 'None',
        // ]

        // $cookie_name = "username";
        // $cookie_value = $_POST["fname"];
        // $exp = 60 * 60 * 24 * 30;
        // $path = "/";
        // setcookie(
        //     $cookie_name,
        //     $cookie_value,
            // time() + $exp,
            // $path,
            // 'None'
        // // );
        // setcookie(
        //     "scores",
        //     $_POST["fscore"],
        //     time() + $exp,
        //     $path,
        // );
        $new_message = array(
            "name" => $_POST["fname"],
            "total" => $_POST["ftotal"],
            "scores" => $_POST["fscore"],
        );
        if(filesize("messages.json") == 0){
            $first_record = array($new_message);
            $data_to_save = $first_record;
        }
        else{
            $old_records = json_decode(file_get_contents("messages.json"));
            array_push($old_records, $new_message);
            $data_to_save = $old_records;
        }
        if(!file_put_contents("messages.json", json_encode($data_to_save, JSON_PRETTY_PRINT), LOCK_EX)){
            $error = "Error storing message, please try again";
        } else {
            $success = "Message is stored successfully";
        }
    }
?>
<html>
    <head>
        <link rel="stylesheet" href="background.css" />
        <meta>
        </meta>
        <style lang="css">
            #leaderboard {
                background-color: gray;
                box-shadow: 5px 5px rgba(0,0,0,0.2);
                position: relative;
                padding: 1%;
            }
            th {
                background-color: blue;
            }
            table, th, td {
                border-spacing: 2px;
                border: 1px solid black;
            }
        </style>
    </head>
    <body>
        <?php
            include "navbar.php";
        ?>
        <div id="main">
            <div id="leaderboard">
                
                <table id="tbl">
                    <tr>
                        <th>Name</th>
                        <th>Total</th>
                        <th>Level Scores</th>
                    </tr>
                </table>
            </div>
        </div>
    </body>
    <script src="leaderboard.js">
    </script>
</html>
