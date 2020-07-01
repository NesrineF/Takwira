function testb(){
    var p=JSON.parse(localStorage.getItem("profil")); 
    var p1=JSON.parse(localStorage.getItem("con")); 
    var t = JSON.parse(localStorage.getItem("reserved")) || [];
    var obj = new Object();
    x =document.getElementById("appt1").value;
    y =document.getElementById("appt2").value;
    console.log(x);
    console.log(y);
    if ((x=="") || (y=="")){
        alert("veuillez indiquez le jour et l'horaire")

    }
    else{ 
 obj.id =p.id;
obj.idc=p1.idc;
obj.temp=x;
obj.jour=y;
t.push(obj);
localStorage.setItem("reserved",JSON.stringify(t));

    }
    
    
}