function verifyuser(){
    var t = JSON.parse(localStorage.getItem("users")) || [];
    var obj = new Object();
    x=document.getElementById("emailLog").value;
    y=document.getElementById("pwdLog").value;
    var z=t.find( user => user.nom == x && user.pwd == y);
    if (z){
        localStorage.setItem("con", JSON.stringify(z));
        alert("you're loged in")
    }
    else { alert("verify")
        window.location.href="register.html";}
}