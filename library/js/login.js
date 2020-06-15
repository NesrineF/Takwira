function verifyuser(){
    var t = JSON.parse(localStorage.getItem("users")) || [];
    var obj = new Object();
    x=document.getElementById("emailLog").value;
    y=document.getElementById("pwdLog").value;
    var z=t.find( users => users.email == x && users.pwd == y);

    
     
    if (z.switch == false){
        localStorage.setItem("con", JSON.stringify(z));
        
        console.log("client");
        window.location.href="home-3.html";


        

    }
    else if(z.switch == true)
    {localStorage.setItem("con", JSON.stringify(z));
  
    window.location.href="home-2.html";
}
    else { alert("verify")
        window.location.href="register.html";}
}
