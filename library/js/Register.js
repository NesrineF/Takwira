function setusers(){
    var t = JSON.parse(localStorage.getItem("users")) || [];
    console.log("register" + t);
    
    var obj = new Object();
    obj.id=Math.floor(Math.random()*1000);
    obj.nom=document.getElementById("username").value;
    obj.pwd=document.getElementById("pwd").value ;
    obj.pwd1=document.getElementById("pwd1").value ;
    obj.email=document.getElementById("email").value;
    obj.switch=document.getElementById("switch-1").checked;
    console.log('switch'+ obj.switch);
    
    t.push(obj);
    localStorage.setItem("users",JSON.stringify(t));
    alert("you have succefully registred")
    }