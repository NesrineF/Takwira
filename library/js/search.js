function searcht(){
        var t = JSON.parse(localStorage.getItem("addt")) || [];
        var obj = new Object();
        x=document.getElementById("villes").value;
        y=document.getElementById("pwdLog").value;
        var z=t.find( addt => addt.villes == x);
    
        
         
        if (z.switch == false){
            localStorage.setItem("con", JSON.stringify(z));
            
            console.log("client");
            window.location.href="./../home-Client.html";
            
    
        }
        else if(z.switch == true)
        {localStorage.setItem("con", JSON.stringify(z));
        // alert("you're loged in")
        window.location.href="./../home-owner.html";
        console.log("propPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");}
        else { alert("verify")
            window.location.href="register.html";}
    
    
}