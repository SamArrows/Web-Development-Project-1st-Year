if(getCookie("LoggedIn") == "true"){
    title.textContent = "Welcome to pairs, " + getCookie("username") + "\n";
    var pairsBtn = document.createElement('button');
    pairsBtn.classList.add("pad");
    pairsBtn.textContent = "Click here to play";
    pairsBtn.id = "pairs";
    pairsBtn.addEventListener("click", function(){
        location.href='pairs.php';
    });
    document.getElementById("main").appendChild(pairsBtn);
}
else{
    title.textContent = "You're not using a registered session?";
    var registrationLink = document.createElement('a');
    registrationLink.classList.add("pad");
    registrationLink.textContent = "Register now!";
    registrationLink.href = "registration.php";
    document.getElementById("title").appendChild(registrationLink);
}