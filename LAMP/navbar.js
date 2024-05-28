var leaderboard = self.document.getElementById("1");
            
document.getElementById("home").addEventListener("click", function(){
    location.href='index.php';
});

document.getElementById("pairs").addEventListener("click", function(){
    location.href='pairs.php';
});

if(getCookie("LoggedIn") == "true"){
    leaderboard.setAttribute("name", "leaderboard");
    leaderboard.textContent = "Leaderboard";
    var emoji = generateEmoji(getCookie("skin"), getCookie("eyes"), getCookie("mouth"));
    emoji.classList.add("center");
    document.getElementsByName("menu")[0].appendChild(emoji);
}
leaderboard.addEventListener("click", function() {
    console.log(1);
    if(leaderboard.name == "leaderboard"){
        location.href = "leaderboard.php";
    }
    else{
        location.href = "registration.php";
    }
});