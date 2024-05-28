function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for(var i=0 ; i < cookies.length ; ++i) {
        var pair = cookies[i].trim().split('=');
        console.log(i + " ==================");
        console.log(pair[0] + " ========== " + pair[1]);
        console.log("cookie to search for: " + name);
        console.log("================= " + i);
        if(pair[0] == name)
            return pair[1];
    }
    return false;
};