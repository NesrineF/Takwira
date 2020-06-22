function logout(){
    var t = JSON.parse(localStorage.getItem("con")) || [];
    var obj = new Object();
    localStorage.removeItem("con");
    window.location.href="./../index.html";
}